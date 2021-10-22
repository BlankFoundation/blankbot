const notfound = async (interaction) => {
  await interaction.reply({ content: 'Command not found'});
}

export default notfound;