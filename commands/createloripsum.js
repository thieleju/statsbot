const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

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
    let textfieldlength = interaction.options.getString("textfieldlength")

    await axios({
      method: "get",
      url: `https://loripsum.net/api/1/${textfieldlength}`,
      responseType: "json",
    })
      .then(async (response) => {
        let answer = response.data
        await interaction.reply(
          `This is a random **${textfieldlength}** Loripsum textfield:`
        )
        await interaction.channel.send(`${answer}`)
      })
      .catch((error) => {
        interaction.reply("Error")
      })
  },
}
