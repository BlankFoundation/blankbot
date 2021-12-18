const ping = async (interaction) => {
  await interaction.reply({ content: "Pong!" });
};

export default ping;
