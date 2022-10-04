const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("excuse")
    .setDescription("Get a random excuse."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://excuser.herokuapp.com/v1/excuse",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data[0].excuse)
      })
      .catch((error) => {
        interaction.reply("The Excuser API did not respond!")
      })
  },
}
