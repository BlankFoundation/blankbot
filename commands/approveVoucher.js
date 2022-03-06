import supabaseClient from "../lib/supabaseClient.js";

const approveVoucher = async (interaction) => {
  if (interaction.member.roles.cache.some(role => role.name === "Council")) {
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

    const { info } = data;
    info.approvals[interaction.member.user.username] = true;

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
      await interaction.reply({
        content: `Your approval of ${discordUserName} for ${blankCount} Blank NFTs has been recorded.`,
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

export default approveVoucher;