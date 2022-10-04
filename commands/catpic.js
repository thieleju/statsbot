const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("catpic")
    .setDescription("Get a random picture of cat."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://aws.random.cat/meow",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.file)
      })
      .catch((error) => {
        interaction.reply("Something went wrong!")
      })
  },
}
