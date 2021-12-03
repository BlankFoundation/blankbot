
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


const reviewApplications = async (interaction) => {
    if ((interaction.member.roles.cache.some(role => role.name === "Council")) || (
        interaction.member.roles.cache.some(role => role.name === 'Contributor'))) {
        const channel = interaction.client.channels.fetch(config.applicationChannelId);
        const allMessages = await fetchAllMessages(channel)
        await channel.guild.members.fetch();
        for (var i = 0; i < allMessages.length; i++) {
            let message = allMessages[i];
            var isMember = message.guild.members.resolve(message.author)?.roles?.cache?.some(r => r.name === 'Member');
            if (!isMember) {
                const whetherToHandle = await reactionThresholdPassed(reaction);
                var numDoubles = whetherToHandle['numDoubles'];
                var uniqueMemberReactions = whetherToHandle['uniqueMemberReactions'];
                var councilMemberReaction = whetherToHandle['hasCouncilMemberReaction'];
            }
            if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (councilMemberReaction)) {
                let tableName = "ReadyForPromotion"
                var userNamePresent = await getDiscordUserIdPresent(tableName, message.author.id);
                if (!userNamePresent) {
                    addReviewRecord(tableName, message.author.username,
                        message.author.id, message.url,
                        uniqueMemberReactions, message.timestamp)
                }
            } else if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (!councilMemberReaction)) {
                let tableName = "CouncilContributorVoteNeeded";
                var userNamePresent = await getDiscordUserIdPresent(tableName, message.author.id);
                if (!userNamePresent) {
                    addReviewRecord(tableName, message.author.username,
                        message.author.id, message.url,
                        uniqueMemberReactions, message.timestamp);
                }
            }
        }
    }
}

export default reviewApplications;