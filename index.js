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
      channel.send(`Applicant ${newMember} has been promoted to Blank member! Welcome! Feel free to look around, ask questions in #no-silly-questions and browse the resources in #links!`);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'regenerate-voucher') {
    await commands['regenerateVoucher'](interaction)
  } else if (interaction.commandName === 'regenerate-all-vouchers') {
    await commands['regenerateAllVouchers'](interaction)
  } else if (interaction.commandName === 'nominate-voucher') {
    await commands['nominateVoucher'](interaction)
  } else if (interaction.commandName === 'approve-voucher') {
    await commands['approveVoucher'](interaction)
  } else if (interaction.commandName === 'list-vouchers') {
    await commands['listVouchers'](interaction)
  } else if (interaction.commandName === 'claim-voucher') {
    await commands['claimVoucher'](interaction)
  } else if (interaction.commandName === 'delete-voucher') {
    await commands['deleteVoucher'](interaction)
  } else if (interaction.commandName === 'redeem-voucher') {
    await commands['redeemVoucher'](interaction)
  } else if (commands[interaction.commandName]) {
   await commands[interaction.commandName](interaction)
  } else {
    await commands['notfound'](interaction)
  }
});
    
// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(config.discordToken);

