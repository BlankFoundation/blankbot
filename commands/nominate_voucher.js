import { supabaseClient } from "../lib/supabaseClient.js";

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
            Math.round(Date.now() / 1000) + (60 * 60 * 24 * 14)  // 2 weeks
          );
          await updateRecordWithNewVoucher(recordId, JSON.stringify(voucher));


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