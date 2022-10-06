const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("techy")
    .setDescription("Get a random tech-savvy phrase."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://techy-api.vercel.app/api/json",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.message)
      })
      .catch((error) => {
        interaction.reply("The Techy API did not respond")
      })
  },
}
