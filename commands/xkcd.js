const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xkcd")
    .setDescription("Get a random xkcd comic."),
  async execute(interaction) {
    num = Math.round(Math.random() * 2683) + 1
    await axios({
      method: "get",
      url: `https://xkcd.com/${num}/info.0.json`,
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.img)
      })
      .catch((error) => {
        interaction.reply("Something went wrong!")
      })
  },
}
