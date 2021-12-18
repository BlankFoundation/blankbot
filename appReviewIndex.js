import { default as config } from "./config.js";

import * as commands from "./commands/index.js";

import { handleApplication } from "./lib/index.js";

import { Client, Intents } from "discord.js";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// Register an event so that when the bot is ready, it will log a messsage to the terminal
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "review-applications") {
    await commands["reviewApplications"](interaction);
  }
});

// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(config.discordToken);
