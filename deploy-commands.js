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
  new SlashCommandBuilder()
    .setName('nominate-voucher')
    .setDescription('Nominate a Blank member to receive Blank NFTs for work completed')
    .addStringOption(option =>
      option.setName('username')
        .setDescription('Discord user handle of member who did the work')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('count')
        .setDescription('The number of Blank NFTs to award')
        .setRequired(true)),
  new SlashCommandBuilder()
    .setName('list-vouchers')
    .setDescription('List all open vouchers nominations.'),
  new SlashCommandBuilder()
    .setName('approve-voucher')
    .setDescription('Provide your approval for an existing voucher nomination')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('The id of the voucher to approve')
        .setRequired(true)),
  new SlashCommandBuilder()
    .setName('delete-voucher')
    .setDescription('Delete an existing voucher nomination')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('The id of the voucher to delete')
        .setRequired(true)),
  new SlashCommandBuilder()
    .setName('claim-voucher')
    .setDescription('Claim a voucher by providing your wallet address')
    .addStringOption(option =>
      option.setName('wallet_address')
        .setDescription('Your wallet address')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('voucher_id')
        .setDescription('The ID of the voucher to claim if multiple exist.')
        .setRequired(false)),
  new SlashCommandBuilder()
    .setName('redeem-voucher')
    .setDescription('Mark a voucher as redeemed')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('The id of the voucher to mark as redeemed')
        .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.discordToken);

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
