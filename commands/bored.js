const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bored")
    .setDescription("You feel bored! get something to do now"),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "http://www.boredapi.com/api/activity/",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.activity)
      })
      .catch((error) => {
        interaction.reply("Something went wrong!")
      })
  },
}
