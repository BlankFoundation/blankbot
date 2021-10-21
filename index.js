const { 
  network,
  infuraProjectId,
  infuraProjectSecret,
  airtableKey, 
  airtableId, 
  discordToken, 
  foundationPrivateKey
} = require('./config.json');
const { BlankArt } = require('./lib/BlankArt');
const { LazyMinter } = require('./lib/LazyMinter');

const { ethers } = require('ethers')
const { Client, Intents } = require('discord.js')
var Airtable = require('airtable');

const database = new Airtable({apiKey: airtableKey}).base(airtableId);
const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const provider = new ethers.providers.InfuraProvider(network, {
  projectId: infuraProjectId,
  projectSecret: infuraProjectSecret
});
const signer = new ethers.Wallet(foundationPrivateKey, provider)
const contract = new ethers.Contract(BlankArt.address, BlankArt.abi, provider);
const lazyMinter = new LazyMinter({ contract, signer })

    
// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

async function getDiscordUserIdAddresses(value) {
   let matchingRecords = [];
   await database("WhiteList")
  .select({
    filterByFormula: "({DiscordUserId} = '" + value + "')"
  })
  .eachPage(
    function page(records, fetchNextPage) {
     try {
      records.forEach(function(record) {
        matchingRecords.push(record.fields['WalletAddress']);
      });
      } catch(e){ console.log('error inside eachPage => ', e)}
      fetchNextPage();
     }
  );
  return matchingRecords;
}

function addRecord(discordUserName, walletAddress, discordUserId, voucher) {
  database("Whitelist").create([
    {
      "fields": {
        "DiscordUserName": discordUserName,
        "WalletAddress": walletAddress,
        "DiscordUserId": discordUserId,
        "Voucher": voucher
       }
    }], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

APPLICATION_CHANNEL = 'applications';
MODERATOR_CHANNEL = 'application-review';
MODERATOR_CHANNEL_ID = '900553032536842301';

client.on('messageCreate', message => {

  console.log('i heard a messsage');
  if (message.channel.name == APPLICATION_CHANNEL) {
    console.log('i heard a message from my channel');
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.channel.name != APPLICATION_CHANNEL) {
      console.log('ignoring message');
      return;
    }
    console.log("Checking reactions for message");
    let reactionThresholdPassed = async (reaction) => {
        let memberIds = new Set();
        let uniqueMemberReactions = 0;
        allReactions = await reaction.message.reactions.cache.reduce(function(accumulated, newReaction) {
          accumulated.push(newReaction);
          return accumulated;
        }, []);
        for (var i = 0; i < allReactions.length; i++) {
          newReaction = allReactions[i];
          let uniqueReaction = false;
          const newUsers = await newReaction.users.fetch();
          result2 = await newReaction.users.cache.each(async function(user) {
            // only add member reactions
            if (reaction.message.member.roles.cache.some(role => role.name === "member")) {
              if (!memberIds.has(user.id)) {
                uniqueReaction = true;
              }
              memberIds.add(user.id);
            }
            if (uniqueReaction) {
              uniqueMemberReactions++;
            }
          });
        }
        return uniqueMemberReactions;
      }

      let handleApplication = async (reaction) => {
        whetherToHandle = await reactionThresholdPassed(reaction);
        console.log('whether to handle');
        console.log(whetherToHandle);
        if (whetherToHandle >= 5) {
          // send message to #moderators channel with notification to approve application
          console.log('Applicant ' + reaction.message.author.username + ' is ready for review with 5 member votes!');
          const channel = client.channels.cache.find(channel => channel.name === MODERATOR_CHANNEL);
          channel.send('Applicant ' + reaction.message.author.username + ' is ready for review with 5 member votes!');
        }
      }
    if (reaction.message.partial) {
        try {
            let msg = await reaction.message.fetch();
            await handleApplication(reaction);
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        await handleApplication(reaction);
    }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply({ content: 'Pong!'});
  } else if (interaction.commandName === 'whitelist') {
    if (interaction.member.roles.cache.some(role => role.name === "member")) {
      const discordUserName = interaction.user.username;
      const discordUserId = interaction.user.id;
      const walletAddress = interaction.options.getString('address');
      discordUserIdAddresses = await getDiscordUserIdAddresses(discordUserId);
      //console.log(interaction);
      if (!discordUserIdAddresses || (discordUserIdAddresses.length == 0)) {
        try {
          const voucher = await lazyMinter.createVoucher(walletAddress);
          addRecord(discordUserName, walletAddress, discordUserId, JSON.stringify(voucher));
          await interaction.reply(
            { content: 'Wallet address ' + walletAddress + ' added for member ' + discordUserName,
              ephemeral: true});
        } catch (error) {
          console.log(error);
          if (error.code && (error.code == 'INVALID_ARGUMENT')) {
            errorMessage = 'Wallet address ' + walletAddress + ' invalid -- do you have a typo?';
          } else {
            errorMessage = error.message;
          }
          await interaction.reply(
            { content: "Error: " + errorMessage,
              ephemeral: true});
        }
      } else {
        await interaction.reply(
        { content: 'Wallet address ' + discordUserIdAddresses[0] + ' already exists for member ' + discordUserName + '. Please contact a member of our moderation team to handle this issue!',
          ephemeral: true});
      }
    } else {
      await interaction.reply(
        { content: "You must be a member to add your wallet address to the whitelist. Apply in the #applications channel, we'd love to have you!",
          ephemeral: true });
      }
  }
});
    
// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(discordToken);

