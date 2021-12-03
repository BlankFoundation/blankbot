
import { default as config } from "../config.js";
import { reactionThresholdPassed } from '../lib/index.js';

import { ethers } from 'ethers'

import Airtable from 'airtable';

const database = new Airtable({apiKey: config.airtableKey}).base(config.airtableId);

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


function addReviewRecord(discordUserName, applicationLink, numUniqueEmojis) {
  database("ApplicationReview").create([
    {
      "fields": {
        "DiscordUserName": discordUserName,
        "ApplicationLink": applicationLink,
        "NumUniqueEmojis": numUniqueEmojis,
       }
    }], function(err, _records) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function addOneMissingRecord(discordUserName, applicationLink, numUniqueEmojis) {
  database("CouncilContributorVoteNeeded").create([
    {
      "fields": {
        "DiscordUserName": discordUserName,
        "ApplicationLink": applicationLink,
        "NumUniqueEmojis": numUniqueEmojis,
       }
    }], function(err, _records) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

async function getDiscordUserNamePresent(tableName, value) {
  let matchingRecords = [];
  await database(tableName)
    .select({
      filterByFormula: "({DiscordUserName} = '" + value + "')"
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
        }
        if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (councilMemberReaction)) {
            var userNamePresent = await getDiscordUserNamePresent('ApplicationReview', reaction.message.author.username);
            if (userNamePresent) {
                addReviewRecord(reaction.message.author.username, reaction.message.url, uniqueMemberReactions)
            }
        } else if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (!councilMemberReaction)) {
            var userNamePresent = await getDiscordUserNamePresent('CouncilContributorVoteNeeded', reaction.message.author.username);
            if (userNamePresent) {
                addOneMissingRecord(reaction.message.author.username, reaction.message.url, uniqueMemberReactions);
            }
        }
    }
}

export default reviewApplications;