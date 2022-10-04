const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("websiteicon")
    .setDescription("Get a website icon of the domain of your choice.")
    .addStringOption((option) =>
      option
        .setName("domain")
        .setDescription("Domain Name (e.g. youtube.com)")
        .setRequired(true)
    ),
  async execute(interaction) {
    // get provided domain name
    const domain = interaction.options.getString("domain")
    // build 'request' url
    const url = `https://icon.horse/icon/${domain}`
    // reply with url
    interaction.reply(url)
  },
}
