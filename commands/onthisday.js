const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("onthisday")
    .setDescription("Show a random history event happended on this date."),
  async execute(interaction) {
    let today = new Date()
    let month = today.getMonth() + 1
    let date = today.getDay()

    return await axios({
      method: "get",
      url: "https://today.zenquotes.io/api/" + month + "/" + date,
      responseType: "json",
    })
      .then((response) => {
        if (response.data && response.data.data && response.data.data.Events) {
          let data = response.data.data.Events
          let idx = Math.floor(Math.random() * data.length)
          let text = data[idx].text
          text = text
            .replace("&#8211;", "-")
            .replace("&#39;", "'")
            .replace("&#91;", "[")
            .replace("&#93;", "]")
            .replace("&#160;", " ")
          interaction.reply(text)
        } else {
          interaction.reply("The ZenQuotes API has zero entries")
        }
      })
      .catch((error) => {
        interaction.reply("The ZenQuotes API did not respond")
      })
  },
}
