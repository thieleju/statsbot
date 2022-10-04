const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dogpic")
    .setDescription("Get a random picture of dog."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://random.dog/woof.json",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(response.data.url)
      })
      .catch((error) => {
        interaction.reply("Something went wrong!")
      })
  },
}
