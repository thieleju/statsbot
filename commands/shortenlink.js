const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shortenlink")
    .setDescription("Shorten the url passed by the user.")
    .addStringOption((option) =>
      option.setName("url").setDescription("URL to input.").setRequired(true)
    ),
  async execute(interaction) {
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "https://gotiny.cc/api",
      data: JSON.stringify({ input: interaction.options.getString("url") }),
      responseType: "json",
    })
      .then((response) => {
        interaction.reply("Shortlink: gotiny.cc/" + response.data.code)
      })
      .catch((error) => {
        interaction.reply("The GoTiny API didn't respond.")
      })
  },
}
