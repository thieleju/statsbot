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
        const reply_String =
          "**> " +
          response.data.death +
          "**" +
          "\n**Cause of death:** \n" +
          response.data.cause +
          "\n" +
          "\n**Responsible:** \n" +
          response.data.responsible +
          "\n" +
          "\n**Last words:** \n" +
          response.data.last_words +
          "\n" +
          "\nSeason: " +
          response.data.season +
          " in Episode: " +
          response.data.episode +
          ", Occupation: " +
          response.data.occupation +
          "\n" +
          response.data.img
        interaction.reply(reply_String)
      })
      .catch((error) => {
        console.log(error)
        interaction.reply("The Breaking Bad Death API did not respond!")
      })
  },
}
