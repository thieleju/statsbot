const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("catfact")
    .setDescription("Get a random fact about cats."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://meowfacts.herokuapp.com/",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.data[0])
      })
      .catch((error) => {
        interaction.reply("The Meowfacts API did not respond!")
      })
  },
}
