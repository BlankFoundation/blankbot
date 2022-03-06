import supabaseClient from "../lib/supabaseClient.js";

const deleteVoucher = async (interaction) => {
  if (interaction.member.roles.cache.some(role => role.name === "Council")) {
    const voucherId = interaction.options.getString('id');
    
    const { error } = await supabaseClient
      .from('voucher')
      .delete()
      .eq('id', voucherId);

    if (error) {
      await interaction.reply({
        content: `An error occurred: ${error.message}`,
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: `Voucher ${voucherId} has been deleted.`,
        ephemeral: true
      });
    }
  } else {
    await interaction.reply({
      content: "You must be a council member to delete a voucher. Please message one of them to help you out.",
      ephemeral: true
    });
  }
}

export default deleteVoucher;