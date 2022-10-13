const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shiba")
    .setDescription("Get a random picture of shiba inu."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data[0])
      })
      .catch((error) => {
        interaction.reply("Something went wrong!")
      })
  },
}
