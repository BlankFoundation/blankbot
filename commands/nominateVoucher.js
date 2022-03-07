import supabaseClient from "../lib/supabaseClient.js";

const nominateVoucher = async (interaction) => {
  if (interaction.member.roles.cache.some(role => role.name === "Council")) {
    const discordUserName = interaction.options.getString('username');
    const count = interaction.options.getString('count');
    const { body, error } = await supabaseClient.from('voucher').insert({
      discordUserName,
      count,
      info: {
        approvals: {
          [interaction.member.user.username]: true
        }
      }
    })

    if (error) {
      await interaction.reply({
        content: `An error occurred: ${error.message}`,
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: `Your nomination of ${discordUserName} for ${count} Blank NFTs has been recorded.
        
Please ask another council member to approve this nomination by running \`approve-voucher ${body.id}\``,
        ephemeral: true
      });
    }
  } else {
    await interaction.reply({
      content: "You must be a council member to nominate a voucher for a user. Please message one of them to help you out.",
      ephemeral: true
    });
  }
}

export default nominateVoucher;