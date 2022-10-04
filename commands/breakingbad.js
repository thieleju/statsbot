const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("breakingbad")
    .setDescription("Get a random Breaking Bad quote."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://api.breakingbadquotes.xyz/v1/quotes/",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(
          "**> " + response.data[0].quote + "**" + response.data[0].author
        )
      })
      .catch((error) => {
        interaction.reply("The Breaking Bad Quotes API did not respond!")
      })
  },
}
