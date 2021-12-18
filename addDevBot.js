import { default as config } from "./config.js";
const baseOauthURL = "https://discord.com/api/oauth2/authorize?";
console.info(
  `Invite your dev bot to your dev server at\n${baseOauthURL}client_id=${config.clientId}&scope=bot%20applications.commands&permissions=8`
);
