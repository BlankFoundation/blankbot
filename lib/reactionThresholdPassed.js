

const reactionThresholdPassed = async (reaction) => {
  if (reaction.message.partial) {
    await reaction.message.fetch()
  }

  // console.log(reaction.message.guild.members)


  let memberIds = new Set();
  let uniqueMemberReactions = 0;
  let numDoubles = 0;
  let councilMemberReaction = false;
  const allReactions = await reaction.message.reactions.cache.map(r => r);
  await reaction.message.guild.members.fetch()
  for (var i = 0; i < allReactions.length; i++) {
    const newReaction = allReactions[i];
    let uniqueReaction = false;
    const newUsers = await newReaction.users.fetch();
    numDoubles = 0;
    for (const [_key, user] of newUsers) {
      var numUniques = 0;
      const member = reaction.message.guild.members.resolve(user)?.roles?.cache?.find(
        r => r.name === 'Member'
      ) !== undefined;

      const councilMember = reaction.message.guild.members.resolve(user)?.roles?.cache?.find(
        r => r.name === 'Council'
      ) !== undefined;
      const contributor = reaction.message.guild.members.resolve(user)?.roles?.cache?.find(
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

export default reactionThresholdPassed;