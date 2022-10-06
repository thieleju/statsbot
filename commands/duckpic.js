const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("duckpic")
    .setDescription("Get a random picture of a duck."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://random-d.uk/api/quack",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.url)
      })
      .catch((error) => {
        interaction.reply("problem fetching the image!")
      })
  },
}
