const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invitelink")
    .setDescription("Get link to invite the bot to your server"),
  async execute(interaction) {
    const link = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DC_BOT_CLIENT_ID}&permissions=${process.env.DC_BOT_PERMISSIONS}&scope=applications.commands%20bot`
    return interaction.reply("Invite the bot to your server: " + link)
  },
}
