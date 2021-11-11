import { default as config } from './config.js';

import * as commands from './commands/index.js';

import { handleApplication } from './lib/index.js'

import { Client, Intents } from 'discord.js'

const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.id !== config.applicationChannelId) {
      console.log(reaction.message.channel.name);
      console.log('ignoring message');
      return;
    }
    console.log("Checking reactions for message");
    try {
        await handleApplication(client, reaction);
    }
    catch (err) {
        console.log(err);
    }
});

client.on('guildMemberUpdate', async(oldMember, newMember) => {
  // check if the member was updated with the "member" role
  if ((!oldMember.roles.cache.some(role => role.name === "Member")) && (
      newMember.roles.cache.some(role => role.name === "Member"))) {
      const channel = client.channels.cache.find(channel => channel.id === config.welcomeChannelId);
      channel.send(`Applicant ${newMember} has been promoted to Blank member! Welcome! Please head over to #whitelist channel for instructions on how to mint your Blank NFTs.`);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  var commandName = interaction.commandName;
  if (commandName === 'regenerate-voucher') {
    var nameToUse = 'regenerateVoucher';
  } else if (commandName === 'regenerate-all-vouchers') {
    var nameToUse = 'regenerateAllVouchers';
  } else {
    var nameToUse = commands[commandName]
  }
  if (nameToUse) {
    await commands[nameToUse](interaction)
  } else {
    commands['notfound'](interaction)
  }
});
    
// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(config.discordToken);

