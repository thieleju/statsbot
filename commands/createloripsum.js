const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default
const { htmlToText } = require("html-to-text")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createloripsum")
    .setDescription(
      "Get a random one paragraph Loripsum textfield by setting the length."
    )
    .addStringOption((option) =>
      option
        .setName("textfieldlength")
        .setDescription("Choose length of the textfield.")
        .addChoices(
          { name: "short", value: "short" },
          { name: "medium", value: "medium" },
          { name: "long", value: "long" },
          { name: "verylong ", value: "verylong " }
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    const textfieldlength = interaction.options.getString("textfieldlength")

    await axios({
      method: "get",
      url: `https://loripsum.net/api/1/${textfieldlength}`,
      responseType: "json",
    })
      .then((response) => {
        const text = htmlToText(response.data, { wordwrap: null })
        interaction.reply(text)
      })
      .catch((error) => {
        interaction.reply("Error")
      })
  },
}
