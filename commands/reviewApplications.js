
import { default as config } from "../config.js";
import { reactionThresholdPassed } from '../lib/index.js';

import { ethers } from 'ethers'

import Airtable from 'airtable';

const applicationDatabase = new Airtable({apiKey: config.airtableKey}).base(config.airtableApplicationsId);

const fetchAllMessages = async (channel) => {
    let messages = [];
    let lastID;
    while (true) { // eslint-disable-line no-constant-condition
        const fetchedMessages = await channel.messages.fetch({
            limit: 100,
            ...(lastID && {before: lastID}),
        });
        if (fetchedMessages.size === 0) {
            messages = messages.reverse();
            return messages;
        }
        messages = messages.concat(Array.from(fetchedMessages));
        lastID = fetchedMessages.lastKey();
    }
    return messages
}


function addReviewRecord(
    tableName,
    discordUserName,
    discordUserId,
    applicationLink,
    numUniqueEmojis,
    applicationTime
) {
  applicationDatabase(tableName).create([
    {
      "fields": {
        "DiscordUserName": discordUserName,
        "DiscordUserId": discordUserId,
        "ApplicationLink": applicationLink,
        "NumUniqueEmojis": numUniqueEmojis,
        "ApplicationTime": applicationTime,
       }
    }], function(err, _records) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

async function getDiscordUserIdPresent(tableName, value) {
  let matchingRecords = [];
  await applicationDatabase(tableName)
    .select({
      filterByFormula: "({DiscordUserId} = '" + value + "')"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        try {
        records.forEach(function(record) {
          matchingRecords.push(record);
        });
        } catch(e){ console.log('error inside eachPage => ', e)}
        fetchNextPage();
        }
    );
  if (matchingRecords.length > 0) {
      return true;
  } else {
      return false;
  }
}



const messageThresholdPassed = async (message) => {
  if (message.partial) {
    await message.fetch()
  }

  // console.log(reaction.message.guild.members)


  let memberIds = new Set();
  let uniqueMemberReactions = 0;
  let numDoubles = 0;
  let councilMemberReaction = false;
  //console.log(message);
  const allReactions = await message.reactions.cache.map(r => r);
  await message.guild.members.fetch()
  for (var i = 0; i < allReactions.length; i++) {
      const newReaction = allReactions[i];
      let uniqueReaction = false;
      const newUsers = await newReaction.users.fetch();
      numDoubles = 0;
      for (const [_key, user] of newUsers) {
          var numUniques = 0;
          const member = message.guild.members.resolve(user)?.roles?.cache?.find(
              r => r.name === 'Member'
          ) !== undefined;

          const councilMember = message.guild.members.resolve(user)?.roles?.cache?.find(
              r => r.name === 'Council'
          ) !== undefined;
          const contributor = message.guild.members.resolve(user)?.roles?.cache?.find(
              r => r.name === 'Contributor'
          ) !== undefined;
          if ((councilMember) || (contributor)) {
              councilMemberReaction = true;
          }

          if (!member) continue

          if (!memberIds.has(user.id)) {
              uniqueReaction = true;
              numUniques++;
          }
          memberIds.add(user.id);
      }
      if (uniqueReaction) {
          uniqueMemberReactions++;
      }
      if (numUniques > 1) {
          numDoubles++;
      }
  }
  var results = {
    'numDoubles': numDoubles,
    'uniqueMemberReactions': uniqueMemberReactions,
    'hasCouncilMemberReaction': councilMemberReaction
  }
  console.log(results);

  return results;
}


const reviewApplications = async (interaction) => {
    if ((interaction.member.roles.cache.some(role => role.name === "Council")) || (
        interaction.member.roles.cache.some(role => role.name === 'Contributor'))) {
        const channel = interaction.client.channels.cache.get(config.applicationChannelId);
        const allMessages = await fetchAllMessages(channel)
        await channel.guild.members.fetch();
        for (var i = 0; i < allMessages.length; i++) {
            console.log(i);
            let message = allMessages[i];
            let fetchedMessage = await channel.messages.fetch(message[0]);
            var isMember = await channel.guild.members.resolve(fetchedMessage.author)?.roles?.cache?.some(r => r.name === 'Member');
            if (!isMember) {
                const whetherToHandle = await messageThresholdPassed(fetchedMessage);
                var numDoubles = whetherToHandle['numDoubles'];
                var uniqueMemberReactions = whetherToHandle['uniqueMemberReactions'];
                var councilMemberReaction = whetherToHandle['hasCouncilMemberReaction']
                if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (councilMemberReaction)) {
                    let tableName = "ReadyForPromotion"
                    var userNamePresent = await getDiscordUserIdPresent(tableName, fetchedMessage.author.id);
                    if (!userNamePresent) {
                        addReviewRecord(tableName, fetchedMessage.author.username,
                            fetchedMessage.author.id, fetchedMessage.url,
                            uniqueMemberReactions, fetchedMessage.createdTimestamp)
                    }
                } else if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (!councilMemberReaction)) {
                    let tableName = "CouncilContributorVoteNeeded";
                    var userNamePresent = await getDiscordUserIdPresent(tableName, fetchedMessage.author.id);
                    if (!userNamePresent) {
                        addReviewRecord(tableName, fetchedMessage.author.username,
                            fetchedMessage.author.id, fetchedMessage.url,
                            uniqueMemberReactions, fetchedMessage.createdTimestamp);
                    }
                }
            }
        }
    }
}

export default reviewApplications;