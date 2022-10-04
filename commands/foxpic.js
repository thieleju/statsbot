const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("foxpic")
    .setDescription("Get a random picture of fox."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://randomfox.ca/floof/",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.image)
      })
      .catch((error) => {
        interaction.reply("Something went wrong!")
      })
  },
}
