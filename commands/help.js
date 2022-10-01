const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Display commands list"),
  async execute(interaction) {
    const reply = `
    **/help** - Display commands list
    **/invitelink** - Get link to invite the bot to your server
    **/ping** - Pong!
    **/serverinfo** - Display current server info
    **/userinfo** - Display your user info
    `;
    return interaction.reply(reply);
  },
};
