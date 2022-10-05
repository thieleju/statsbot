const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affirmation")
    .setDescription("Get a random fact affirmation quote."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://www.affirmations.dev/",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.affirmation)
      })
      .catch((error) => {
        interaction.reply("The Affirmation.Dev API did not respond!")
      })
  },
}
