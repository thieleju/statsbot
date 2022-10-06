const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("Get a random joke"),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://v2.jokeapi.dev/joke/Any",
      responseType: "json",
    })
      .then((res) => {
        if (res.data.type == "single") {
          interaction.reply(res.data.joke)
        } else {
          interaction.reply(
            res.data.setup + "\n\n\n||" + res.data.delivery + "||"
          )
        }
      })
      .catch(() => {
        interaction.reply("The Joke API did not respond!")
      })
  },
}
