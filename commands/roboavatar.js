const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roboavatar")
    .setDescription("Get a robotor avatar according your Input.")
    .addStringOption((option) =>
      option
        .setName("avatarname")
        .setDescription("enter a Name for your Roboter (e.g. Happyrobo)")
        .setRequired(true)
    ),
  async execute(interaction) {
    // get provided domain name
    const avatarname = interaction.options.getString("avatarname")
    // build 'request' url
    const url = `https://robohash.org/${avatarname}`
    // reply with url
    interaction.reply(url)
  },
}
