const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chuck")
    .setDescription("Get a random Chuck Norris joke."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://api.chucknorris.io/jokes/random",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.value)
      })
      .catch(() => {
        interaction.reply("The Chuck Norris API did not respond!")
      })
  },
}
