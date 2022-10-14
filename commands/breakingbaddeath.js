const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("breakingbaddeath")
    .setDescription(
      "find out some interesting information about a death of breaking bad characters"
    ),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://breakingbadapi.com/api/random-death",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(
          "**> " +
            response.data[0].death +
            "**" +
            response.data[0].cause +
            response.data[0].responsible +
            response.data[0].last_words +
            response.data[0].season +
            response.data[0].episode +
            response.data[0].occupation +
            response.data[0].img +
            response.data[0].nickname +
            response.data[0].appearance
        )
      })
      .catch((error) => {
        interaction.reply("The Breaking Bad Death API did not respond!")
      })
  },
}
