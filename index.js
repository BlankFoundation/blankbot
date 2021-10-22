import { default as config } from './config.js';

import * as commands from './commands/index.js';

import { Client, Intents } from 'discord.js'

const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id != config.applicationChannelId) {
      console.log(reaction.message.channel.name);
      console.log('ignoring message');
      return;
    }
    console.log("Checking reactions for message");
    let reactionThresholdPassed = async (reaction) => {
        let memberIds = new Set();
        let uniqueMemberReactions = 0;
        allReactions = await reaction.message.reactions.cache.reduce(
          (accumulated, newReaction) => {
            accumulated.push(newReaction);
            return accumulated;
          }, []
        );
        //allMembers = reaction.message.guild.members.fetch().then(members => filter(member.roles.cache.has(role => role.name == 'member')));
        const memberRole = reaction.message.guild.roles.cache.find(r => r.name === 'member');
        allMemberIds = await memberRole.members.reduce(
          (accumulated, newMember) => {
            accumulated.push(newMember.user.id);
            return accumulated;
          }, []
        );
        for (var i = 0; i < allReactions.length; i++) {
          newReaction = allReactions[i];
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

      let handleApplication = async (reaction) => {
        whetherToHandle = await reactionThresholdPassed(reaction);
        console.log('whether to handle');
        console.log(whetherToHandle);
        if (whetherToHandle == 5) {
          // send message to #moderators channel with notification to approve application
          console.log('Applicant ' + reaction.message.author.username + ' is ready for review with ' + whetherToHandle + ' unique emojis!');
          const channel = client.channels.cache.find(channel => channel.name === config.moderatorChannel);
          channel.send('Applicant ' + reaction.message.author.username + ' is ready for review with ' + whetherToHandle + ' unique emojis!');
        }
      }
    if (reaction.message.partial) {
        try {
            let msg = await reaction.message.fetch();
            await handleApplication(reaction);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        await handleApplication(reaction);
    }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (commands[interaction.commandName]) {
    await commands[interaction.commandName](interaction)
  } else {
    commands.notFound(interaction)
  }
});
    
// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(config.discordToken);

