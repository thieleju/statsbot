const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dogfact")
    .setDescription("Get a random fact about dogs."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://dog-api.kinduff.com/api/facts",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.facts[0])
      })
      .catch(() => {
        interaction.reply("The Dog API did not respond!")
      })
  },
}
