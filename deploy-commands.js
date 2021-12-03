import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { default as config } from './config.js';


const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('whoami').setDescription('Bot will introduce themselves!'),
  new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Adds a wallet address to the whitelist for minting')
    .addStringOption(option =>
      option.setName('address')
        .setDescription('Address of the Metamask wallet to add to the whitelist')
        .setRequired(true)),
  new SlashCommandBuilder().setName('regenerate-all-vouchers').setDescription('Regenerates all vouchers for the whitelist. Admin only.'),
  new SlashCommandBuilder().setName('review-applications').setDescription('Regenerates all applications yet to review for the whitelist. Admin only.'),
  new SlashCommandBuilder()
    .setName('regenerate-voucher')
    .setDescription('Regenerates a voucher for a specific discord username')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Discord user handle for whom to reset voucher')
        .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.discordToken);

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
