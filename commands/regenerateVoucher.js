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

async function getDiscordUserNameRecords(value) {
  let matchingRecords = [];
  await database("WhiteList")
    .select({
      view: 'Grid view',
      filterByFormula: "({DiscordUserName} = '" + value + "')"
    })
    .eachPage(
      function page(records, fetchNextPage) {
        try {
        records.forEach(function(record) {
          matchingRecords.push(record);
        });
        } catch(e){ console.log('error inside eachPage => ', e)}
        fetchNextPage();
        }
    );
 return matchingRecords;
}

function updateRecordWithNewVoucher(recordId, voucher) {
  database("Whitelist").update({"records": [
    {
      "id": recordId,
      "fields": {
        "Voucher": voucher,
      }
    }]}, function(err, _record) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

const regenerateVoucher = async (interaction) => {
  if (interaction.member.roles.cache.some(role => role.name === "Council")) {
    const discordUserName = interaction.options.getString('username');
    const discordUserNameRecords = await getDiscordUserNameRecords(discordUserName);
    if (discordUserNameRecords && (discordUserNameRecords.length > 0)) {
      try {
          const walletAddress = discordUserNameRecords[0]['fields']['WalletAddress']
          const recordId = discordUserNameRecords[0]['id']
          const voucher = await lazyMinter.createVoucher(
            walletAddress,
            Math.round(Date.now() / 1000) + (60 * 10) // 10 minutes for testing //(60 * 60 * 24) // 1 day
          );
          updateRecordWithNewVoucher(recordId, JSON.stringify(voucher));


          await interaction.reply({
            content: 'Voucher reset for member ' + discordUserName,
            ephemeral: true
          });
      } catch (error) {
          console.log(error);
          if (error.code && (error.code == 'INVALID_ARGUMENT')) {
            var errorMessage = 'Wallet address ' + walletAddress + ' invalid -- do you have a typo?';
          } else {
            var errorMessage = error.message;
          }
          await interaction.reply(
            { content: "Error: " + errorMessage,
              ephemeral: true});
      }
    } else {
      await interaction.reply(
      { content: 'Wallet address not yet added to whitelist for member ' + discordUserName + '. Please ask them to run the /whitelist command to add themselves!',
        ephemeral: true});
    }
  } else {
    await interaction.reply({
      content: "You must be a council member to regenerate a voucher for a user. Please message one of them to help you out.",
      ephemeral: true
    });
  }
}

export default regenerateVoucher;