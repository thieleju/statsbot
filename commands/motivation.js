const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("motivation")
    .setDescription("Get a random motivation quote."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://nodejs-quoteapp.herokuapp.com/quote",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply("```" + response.data.quote + "```")
      })
      .catch((error) => {
        interaction.reply("The Motivation API did not respond!")
      })
  },
}
