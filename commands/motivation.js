const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("motivation")
    .setDescription("Get a random motivational quote."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://zenquotes.io/api/random",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(`> *${response.data[0].q}*\n- ${response.data[0].a}`)
      })
      .catch((error) => {
        interaction.reply("The API didn't respond!")
      })
  },
}
