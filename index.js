const { airtableKey, airtableId, discordToken } = require('./config.json');

// Import discord.js and create the client
const { Client, Intents } = require('discord.js')
var Airtable = require('airtable');
var database = new Airtable({apiKey: airtableKey}).base(airtableId);
const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS]
 });
    
// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})
    
// Register an event to handle incoming messages
client.on('message', async msg => {
  // This block will prevent the bot from responding to itself and other bots
  if(msg.author.bot) {
    return
  }
    
  // Check if the message starts with '!hello' and respond with 'world!' if it does.
  if(msg.content.startsWith("!hello")) {
    msg.reply("world!")
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply({ content: 'Pong!', ephemeral: true });
  } else if (interaction.commandName === 'whitelist') {
    console.log(interaction);
    const discordUserName = interaction.user.username;
    const discordUserId = interaction.user.id;
    const walletAddress = interaction.options.getString('address');
    database('Whitelist').create([
      {
        "fields": {
          "DiscordUserName": discordUserName,
          "WalletAddress": walletAddress,
          "DiscordUserId": discordUserId
         }
      }], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
  await interaction.reply({ content: 'Wallet address ' + walletAddress + ' added for member ' + discordUserName});}
});
    
// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(discordToken);

