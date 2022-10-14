const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inspiration")
    .setDescription("Get inspiration in every life situation."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://api.goprogram.ai/inspiration",
      responseType: "json",
    })
      .then((response) => {
        // response.data
        // {
        //   quote: "",
        //   autor: "",
        // }
        const quote = response.data.quote
        const author = response.data.author

        const reply_string = `${author}: ${quote}`

        interaction.reply(reply_string)
      })
      .catch((error) => {
        interaction.reply("The api did not respond!")
      })
  },
}
