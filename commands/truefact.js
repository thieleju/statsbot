const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("truefact")
    .setDescription("Get a true fact."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://uselessfacts.jsph.pl/random.json?language=en",
      responseType: "json",
    })
      .then((response) => {
        const text = response.data.text // Get the text from the response

        interaction.reply(text) // Reply with the text
      })
      .catch((error) => {
        interaction.reply("The api did not respond!")
      })
  },
}
