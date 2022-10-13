const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("advice")
    .setDescription("Get a random advice."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://api.adviceslip.com/advice",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.slip.advice)
      })
      .catch(() => {
        interaction.reply("The Advice API did not respond!")
      })
  },
}
