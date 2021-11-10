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
    for (const [_key, user] of newUsers) {
      const member = reaction.message.guild.members.resolve(user)?.roles?.cache?.find(
        r => r.name === 'member'
      ) !== undefined;

      if (!member) continue

      if (!memberIds.has(user.id)) {
        uniqueReaction = true;
      }
      memberIds.add(user.id);
    }
    if (uniqueReaction) {
      uniqueMemberReactions++;
    }
  }

  return uniqueMemberReactions;
}

const handleApplication = async (client, reaction) => {
  const whetherToHandle = await reactionThresholdPassed(reaction);
  if (whetherToHandle === 5) {
    // send message to #moderators channel with notification to approve application
    console.log(`Applicant ${reaction.message.author.username} is ready for review with ${whetherToHandle} unique emojis!`);
    const channel = client.channels.cache.find(channel => channel.name === config.moderatorChannel);
    channel.send(`Applicant ${reaction.message.author.username} is ready for review with ${whetherToHandle} unique emojis!`);
  }
}

export default handleApplication;