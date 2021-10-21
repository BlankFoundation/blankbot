const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, discordToken } = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('whoami').setDescription('Bot will introduce themselves!')
    new SlashCommandBuilder()
      .setName('whitelist')
      .setDescription('Adds a wallet address to the whitelist for minting')
      .addStringOption(option =>
        option.setName('address')
	  .setDescription('Address of the Metamask wallet to add to the whitelist')
          .setRequired(true))
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(discordToken);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
