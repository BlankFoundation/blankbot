import { default as config } from "../config.js";
import supabaseClient from "../lib/supabaseClient.js";
import { BlankArt } from '../contracts/index.js';
import { LazyMinter } from '../lib/index.js';
import { ethers } from 'ethers'

const claimVoucher = async (interaction) => {
  const walletAddress = interaction.options.getString('wallet_address');
  const voucherId = interaction.options.getString('voucher_id');
  const username =interaction.member.user.username
  
  const query = supabaseClient
    .from('voucher')
    .select('*')
    .eq('discordUserName', username)
    .is('voucher', null);

  if (voucherId) query = query.eq('id', voucherId);

  const { data, error } = await query.maybeSingle();

  if (error) {
    await interaction.reply({
      content: `An error occurred: ${error.message}`,
      ephemeral: true
    });
    return;
  }

  if (!data) {
    await interaction.reply({
      content: `Unable to find any relevant vouchers.`,
      ephemeral: true
    });
    return;
  }

  const { info } = data;
  const approvalCount = Object.keys(info.approvals).filter(
    username => info.approvals[username]
  ).length;

  if (data.voucher) {
    await interaction.reply({
      content: `This voucher has already been claimed.`,
      ephemeral: true
    });
    return;
  }

  if (approvalCount >= 2) {
    const provider = new ethers.providers.InfuraProvider(config.network, {
      projectId: config.infuraProjectId,
      projectSecret: config.infuraProjectSecret
    });      
    const signer = new ethers.Wallet(config.signingPrivateKey, provider);
    const contract = new ethers.Contract(BlankArt.address, BlankArt.abi, provider);
    const lazyMinter = new LazyMinter({ contract, signer });

    const voucher = await lazyMinter.createVoucher(
      walletAddress,
      Math.round(Date.now() / 1000) + (60 * 60 * 24 * 14),
      0, 
      data.count  // 2 weeks
    );

    const response = await supabaseClient
      .from('voucher')
      .update({
        voucher: voucher
      })
      .eq('id', data.id)

    if (response.error) {
      await interaction.reply({
        content: `An error occurred: ${response.error.message}`,
        ephemeral: true
      });
    } else {
      const content = `You have claimed voucher #${data.id}.
      
You can use /list-vouchers to verify the information is correct.

Visit ${config.mintingUrl} to mint your NFTs!`;
      
      await interaction.reply({
        content: content,
        ephemeral: true
      });
    }      
  } else {
    await interaction.reply({
      content: `This voucher has not yet been verified.`,
      ephemeral: true
    });
  }
}

export default claimVoucher;