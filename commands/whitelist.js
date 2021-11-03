import { default as config } from "../config.js";

import { BlankArt } from '../contracts/index.js';
import { LazyMinter } from '../lib/index.js';

import { ethers } from 'ethers'

import Airtable from 'airtable';
import { MessageActionRow, MessageButton } from "discord.js";

const database = new Airtable({apiKey: config.airtableKey}).base(config.airtableId);
const provider = new ethers.providers.InfuraProvider(config.network, {
  projectId: config.infuraProjectId,
  projectSecret: config.infuraProjectSecret
});
const signer = new ethers.Wallet(config.foundationPrivateKey, provider);
const contract = new ethers.Contract(BlankArt.address, BlankArt.abi, provider);
const lazyMinter = new LazyMinter({ contract, signer });
const MAX_WHITELIST_MEMBERS = 1000;

async function getDiscordUserIdAddresses(value) {
  let matchingRecords = [];
  await database("WhiteList")
    .select({
      filterByFormula: "({DiscordUserId} = '" + value + "')"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        try {
        records.forEach(function(record) {
          matchingRecords.push(record.fields['WalletAddress']);
        });
        } catch(e){ console.log('error inside eachPage => ', e)}
        fetchNextPage();
        }
    );
 return matchingRecords;
}

async function countWalletAddresses() {
  let count = 0;
  await database("WhiteList")
    .select()
    .eachPage(
      function page(records, fetchNextPage) {
        try {
        records.forEach(function(record) {
          count += 1;
        });
        } catch(e){ console.log('error inside eachPage => ', e)}
        fetchNextPage();
        }
    );
 return count;
}

function addRecord(discordUserName, walletAddress, discordUserId, voucher) {
  database("Whitelist").create([
    {
      "fields": {
        "DiscordUserName": discordUserName,
        "WalletAddress": walletAddress,
        "DiscordUserId": discordUserId,
        "Voucher": voucher
       }
    }], function(err, _records) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

const whitelist = async (interaction) => {
  if (interaction.member.roles.cache.some(role => role.name === "member")) {
    const discordUserName = interaction.user.username;
    const discordUserId = interaction.user.id;
    const walletAddress = interaction.options.getString('address');
    const discordUserIdAddresses = await getDiscordUserIdAddresses(discordUserId);
    //console.log(interaction);
    if (!discordUserIdAddresses || (discordUserIdAddresses.length == 0)) {
      try {
        // check if whitelist already has max members
        const totalAddresses = await countWalletAddresses();
        if (totalAddresses >= MAX_WHITELIST_MEMBERS) {
          await interaction.reply(
          { content: "The whitelist is full with 1,000 addresses. The community treasury will decide what to do with the remaining blank NFTs. Your participation matters!",
            ephemeral: true});
        } else {
          const voucher = await lazyMinter.createVoucher(
            walletAddress,
            Math.round(Date.now() / 1000) + (60 * 60 * 24) // 1 day
          );
          addRecord(discordUserName, walletAddress, discordUserId, JSON.stringify(voucher));
        
          const content = `Wallet address ${walletAddress} added for member ${discordUserName}
          
Now go mint your BlankArt NFT!`

          const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setURL(config.mintingUrl)
                .setLabel('Mint!')
                .setStyle('LINK'),
            );

          await interaction.reply({
            content: content,
            components: [row],
            ephemeral: true
          });
          }
      } catch (error) {
        console.log(error);
        if (error.code && (error.code == 'INVALID_ARGUMENT')) {
          errorMessage = 'Wallet address ' + walletAddress + ' invalid -- do you have a typo?';
        } else {
          errorMessage = error.message;
        }
        await interaction.reply(
          { content: "Error: " + errorMessage,
            ephemeral: true});
      }
    } else {
      await interaction.reply(
      { content: 'Wallet address ' + discordUserIdAddresses[0] + ' already exists for member ' + discordUserName + '. Please contact a member of our moderation team to handle this issue!',
        ephemeral: true});
    }
  } else {
    await interaction.reply({ 
      content: "You must be a member to add your wallet address to the whitelist. Apply in the #applications channel, we'd love to have you!",
      ephemeral: true 
    });
  }
}

export default whitelist;