import supabaseClient from "../lib/supabaseClient.js";

const redeemVoucher = async (interaction) => {
  const voucherId = interaction.options.getString('id');
    
  const { data } = await supabaseClient
    .from('voucher')
    .select('*')
    .eq('id', voucherId)
    .maybeSingle();

  if (!data) {
    await interaction.reply({
      content: `Unable to find that voucher record.`,
      ephemeral: true
    });
    return;
  }

  const { error } = await supabaseClient
    .from('voucher')
    .update({
      redeemed_at: new Date().toUTCString()
    })
    .eq('id', voucherId)

  if (error) {
    await interaction.reply({
      content: `An error occurred: ${error.message}`,
      ephemeral: true
    });
  } else {
    await interaction.reply({
      content: `Voucher #${voucherId} has been marked as redeemed. Thank you!`,
      ephemeral: true
    });
  }
}

export default redeemVoucher;