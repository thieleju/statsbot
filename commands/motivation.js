const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("motivation")
    .setDescription("Get a random motivational quote."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://api.goprogram.ai/inspiration",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(`> *${response.data.quote}*\n${response.data.author}`)
      })
      .catch((error) => {
        interaction.reply("The API didn't respond!")
      })
  },
}
