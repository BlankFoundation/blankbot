import supabaseClient from "../lib/supabaseClient.js";
import { BlankArt } from '../contracts/index.js';
import { LazyMinter } from '../lib/index.js';
import { ethers } from 'ethers'

const claimVoucher = async (interaction) => {
  if (interaction.member.roles.cache.some(role => role.name === "Council")) {
    const voucherId = interaction.options.getString('id');
    const walletAddress = interaction.options.getString('walletAddress');
    
    const { data } = await supabaseClient
      .from('voucher')
      .select('*')
      .eq('id', voucherId)
      .maybeSingle();

    if (!data) {
      await interaction.reply({
        content: `An error occurred: ${error.message}`,
        ephemeral: true
      });
      return;
    }

    const { info } = data;
    info.approvals[interaction.member.user.username] = true;

    const approvalCount = Object.keys(info.approvals).filter(
      username => info.approvals[username]
    ).length;

    if (approvalCount >= 2) {
      const signer = new ethers.Wallet(config.signingPrivateKey, provider);
      const contract = new ethers.Contract(BlankArt.address, BlankArt.abi, provider);
      const lazyMinter = new LazyMinter({ contract, signer });

      const voucher = await lazyMinter.createVoucher(
        walletAddress,
        Math.round(Date.now() / 1000) + (60 * 60 * 24 * 14)  // 2 weeks
      );
    }


    const { error } = await supabaseClient
      .from('voucher')
      .update({
        info: info
      })
      .eq('id', voucherId)

    if (error) {
      await interaction.reply({
        content: `An error occurred: ${error.message}`,
        ephemeral: true
      });
    } else {
      const message = `Your approval of ${discordUserName} for ${blankCount} Blank NFTs has been recorded.`;
      
      await interaction.reply({
        content: message,
        ephemeral: true
      });
    }
  } else {
    await interaction.reply({
      content: "You must be a council member to approve a voucher for a user. Please message one of them to help you out.",
      ephemeral: true
    });
  }
}

export default claimVoucher;