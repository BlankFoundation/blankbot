import { default as config } from "./config.js";

import * as commands from "./commands/index.js";

import { handleApplication } from "./lib/index.js";

import { Client, Intents } from "discord.js";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on("ready", () => {
  const guild = client.guilds.cache.first();
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Update config.js with these entries below\n`);
  console.log(`"guildId": ${guild.id},`);
  // TODO Generate other entries as well.
  process.exit();
});

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(config.discordToken);
