import { default as config } from '../config.js';

const reactionThresholdPassed = async (reaction) => {
  if (reaction.message.partial) {
    await reaction.message.fetch()
  }

  // console.log(reaction.message.guild.members)


  let memberIds = new Set();
  let uniqueMemberReactions = 0;
  const allReactions = await reaction.message.reactions.cache.map(r => r);
  await reaction.message.guild.members.fetch()
  for (var i = 0; i < allReactions.length; i++) {
    const newReaction = allReactions[i];
    let uniqueReaction = false;
    const newUsers = await newReaction.users.fetch();
    var numDoubles = 0;
    for (const [_key, user] of newUsers) {
      var numUniques = 0;
      const member = reaction.message.guild.members.resolve(user)?.roles?.cache?.find(
        r => r.name === 'Member'
      ) !== undefined;

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
    'uniqueMemberReactions': uniqueMemberReactions
  }

  return results;
}

const handleApplication = async (client, reaction) => {
  if (reaction.message.partial) {
    await reaction.message.fetch()
  }
  // check first if the application creator is already a member
  console.log(reaction.message.author);
  if (!reaction.message.author.roles.cache.some(role => role.name === "Member")) {
    const whetherToHandle = await reactionThresholdPassed(reaction);
    var numDoubles = whetherToHandle['numDoubles'];
    var uniqueMemberReactions = whetherToHandle['uniqueMemberReactions'];
    // to only message once, we want to avoid double reactions on 5 emojis
    if ((uniqueMemberReactions === 5) && (numDoubles < 5)) {
      // send message to #moderators channel with notification to approve application
      console.log(`Applicant ${reaction.message.author.username} is ready for review with ${whetherToHandle} unique emojis!`);
      const channel = client.channels.cache.find(channel => channel.id === config.moderatorChannelId);
      channel.send(`Applicant ${reaction.message.author.username} is ready for review with ${whetherToHandle} unique emojis!`);
    }
  }
}

export default handleApplication;