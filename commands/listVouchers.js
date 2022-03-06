import supabaseClient from "../lib/supabaseClient.js";

const listVouchers = async (interaction) => {
  const { data, error }  = await supabaseClient.from('voucher').select('*')

  if (error) {
    await interaction.reply({
      content: `Error: ${error.message}`,
      ephemeral: true
    });
  } else {    
    await interaction.reply({
      content: `Vouchers: ${JSON.stringify(data, null, 2)}`,
      ephemeral: true
    });
  }
}

export default listVouchers;