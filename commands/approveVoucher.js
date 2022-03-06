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
      const user = interaction.client.users.cache.find
        (user => user.username == data.discordUserName
      )

      user.send(`Hi ${user.username}, your voucher for ${data.count} Blank NFTs has been approved!\n\nPlease use the command /claim-voucher from anywhere in the Blank discord server to claim your voucher.`);

      await interaction.reply({
        content: `Your approval of voucher #${voucherId} for ${data.discordUserName} for ${data.count} Blank NFTs has been recorded and the member has been notified.`,
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