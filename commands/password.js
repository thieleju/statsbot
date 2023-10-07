const { SlashCommandBuilder, Interaction } = require("discord.js")
const axios = require("axios")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("password-gen")
    .setDescription("Generate a random password")
    .addIntegerOption((option) =>
      option
        .setName("length")
        .setDescription("The length of the password to generate")
        .setRequired(false)
    ),
  /**
   *
   * @param {Interaction} interaction
   */
  async execute(interaction) {
    const passwordLength = interaction.options.getInteger("length") || 18

    await interaction.deferReply({ ephemeral: true })

    // The API won't work with lenght less than 6
    if (passwordLength <= 5) {
      interaction.editReply({
        content: "❌️ Minumum password length is 6",
        ephemeral: true,
      })
      return
    }

    const apiUrl = `https://www.random.org/passwords/?num=1&len=${passwordLength}&format=plain&digits=on&upper=on&symbols=on&unique=on&rnd=new`

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          // Trim to remove leading/trailing whitespace
          const password = response.data.trim()

          interaction.editReply({
            content: `✅️ Generated password: \`${password}\``,
            ephemeral: true,
          })
        } else {
          interaction.editReply({
            conent: "⚠️ Unable to generate a password",
            ephemeral: true,
          })
        }
      })
      .catch((error) => {
        interaction.editReply({
          content: `⚠️ The API did not respond`,
          ephemeral: true,
        })
      })
  },
}
