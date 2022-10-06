const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kanye")
    .setDescription("Get a random Kanye West quote."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://api.kanye.rest/",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.quote)
      })
      .catch(() => {
        interaction.reply("Something went wrong!")
      })
  },
}
