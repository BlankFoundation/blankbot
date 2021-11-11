const notfound = async (interaction) => {
  await interaction.reply({
    content: 'Command not found',
    ephemeral: true
  });
}

export default notfound;