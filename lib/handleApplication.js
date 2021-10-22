import { default as config } from '../config.js';

const reactionThresholdPassed = async (reaction) => {
  if (reaction.message.partial) {
    await reaction.message.fetch()
  }

  let memberIds = new Set();
  let uniqueMemberReactions = 0;
  const allReactions = await reaction.message.reactions.cache.map(r => r);
  //allMembers = reaction.message.guild.members.fetch().then(members => filter(member.roles.cache.has(role => role.name == 'member')));
  const memberRole = reaction.message.guild.roles.cache.find(r => r.name === 'member');
  const allMemberIds = memberRole.members.map(m => m.user.id);
  for (var i = 0; i < allReactions.length; i++) {
    const newReaction = allReactions[i];
    let uniqueReaction = false;
    const newUsers = await newReaction.users.fetch();
    console.log(newUsers);
    for (const [key, user] of newUsers) {
      // todo: only add member reactions
      //if (allMemberIds.includes(user.id)) {
      //  console.log('its a member');
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
  console.log('whether to handle');
  console.log(whetherToHandle);
  if (whetherToHandle === 5) {
    // send message to #moderators channel with notification to approve application
    console.log(`Applicant ${reaction.message.author.username} is ready for review with ${whetherToHandle} unique emojis!`);
    const channel = client.channels.cache.find(channel => channel.name === config.moderatorChannel);
    channel.send(`Applicant ${reaction.message.author.username} is ready for review with ${whetherToHandle} unique emojis!`);
  }
}

export default handleApplication;