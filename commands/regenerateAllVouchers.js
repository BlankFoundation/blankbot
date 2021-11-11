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

async function getAllRecords() {
  let allRecords = [];
  await database("WhiteList")
    .select()
    .eachPage(
      function page(records, fetchNextPage) {
        try {
          records.forEach(function(record) {
            allRecords.push(record);
          });
        } catch(e){ console.log('error inside eachPage => ', e)}
          fetchNextPage();
        }
    );
 return allRecords;
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

const regenerateAllVouchers = async (interaction) => {
  if (interaction.member.roles.cache.some(role => role.name === "Council")) {
    const allRecords = getAllRecords();
    var successfullyUpdated = []
    var errors = []
    for (var i = 0; i < allRecords.length; i++) {
      console.log('made it here');
      try {
          var walletAddress = allRecords[i]['fields']['WalletAddress']
          var recordId = allRecords[i]['id']
          var voucher = await lazyMinter.createVoucher(
            walletAddress,
            Math.round(Date.now() / 1000) + (60 * 10) // 10 minutes for testing //(60 * 60 * 24) // 1 day
          );
          updateRecordWithNewVoucher(recordId, JSON.stringify(voucher));
          successfullyUpdated.push(allRecords[i]['fields']['DiscordUserName']);
        } catch (error) {
          console.log(error);
          errors.push(allRecords[i]['fields']['DiscordUserName'])
      }
    }
    await interaction.reply({
      content: 'Voucher reset for ' + successfullyUpdated.length + ' members. Errors for ' + errors.length + ' members: ' + errors.join(', '),
      ephemeral: true
    });
  } else {
    await interaction.reply({
      content: "You must be a council member to regenerate a voucher for a user. Please message one of them to help you out.",
      ephemeral: true
    });
  }
}

export default regenerateAllVouchers;