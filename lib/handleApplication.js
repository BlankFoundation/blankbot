import { default as config } from '../config.js';
import { reactionThresholdPassed } from './index.js';

import Airtable from 'airtable';

const database = new Airtable({apiKey: config.airtableKey}).base(config.airtableId);

function addReviewRecord(tableName, discordUserName, applicationLink, numUniqueEmojis) {
  database(tableName).create([
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

const handleApplication = async (client, reaction) => {
  if (reaction.message.partial) {
    await reaction.message.fetch()
  }
  // check first if the application creator is already a member
  await reaction.message.guild.members.fetch();
  let user = reaction.message.author;
  const member = reaction.message.guild.members.resolve(user)?.roles?.cache?.some(
    r => r.name === 'Member'
  );
  if (!member) {
    const whetherToHandle = await reactionThresholdPassed(reaction);
    var numDoubles = whetherToHandle['numDoubles'];
    var uniqueMemberReactions = whetherToHandle['uniqueMemberReactions'];
    var councilMemberReaction = whetherToHandle['hasCouncilMemberReaction'];
    if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (councilMemberReaction)) {
      // send message to #moderators channel with notification to approve application
      console.log(`Applicant ${reaction.message.author.username} is ready for review with ${uniqueMemberReactions} unique emojis!`);
      const channel = client.channels.cache.find(channel => channel.id === config.moderatorChannelId);
      channel.send(`Applicant ${reaction.message.author.username} is ready for review with ${uniqueMemberReactions} unique emojis!`);
      let tableName = "ApplicationReview';"
      var userNamePresent = await getDiscordUserNamePresent(tableName, reaction.message.author.username);
      if (!userNamePresent) {
          addReviewRecord(tableName, reaction.message.author.username, reaction.message.url, uniqueMemberReactions)
      }
    } else if ((uniqueMemberReactions >= 5) && (numDoubles < 5) && (!councilMemberReaction)) {
      const channel = client.channels.cache.find(channel => channel.id === config.moderatorChannelId);
      channel.send(`Applicant ${reaction.message.author.username} just needs 1 council member / contributor vote to advance. They have ${uniqueMemberReactions} unique emojis!`);
      let tableName = "CouncilContributorVoteNeeded";
      var userNamePresent = await getDiscordUserNamePresent(tableName, reaction.message.author.username);
      if (!userNamePresent) {
          addReviewRecord(tableName, reaction.message.author.username, reaction.message.url, uniqueMemberReactions);
      }
    }
  }
}

export default handleApplication;