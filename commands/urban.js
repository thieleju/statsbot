const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("urban")
    .setDescription("Get the urban dictionary definition of a give term.")
    .addStringOption((option) =>
      option
        .setName("term")
        .setDescription('The term to search for. For Example: "dog"')
        .setRequired(false)
    ),

  async execute(interaction) {
    let term = interaction.options.getString("term")
    await interaction.deferReply({ ephemeral: false })
    let URL = ""
    if (term == null) {
      // Get a random term
      URL = "https://api.urbandictionary.com/v0/random"
    } else {
      const query = new URLSearchParams({ term })
      URL = `https://api.urbandictionary.com/v0/define?${query}`
    }
    await axios({
      method: "get",
      url: URL,
      responseType: "json",
    })
      .then(async (res) => {
        let myres = res.data.list[0]
        if (myres == null) {
          await interaction.editReply("No results found!")
        }

        const data = `Word: ${myres.word}\nDefinition: ${myres.definition}\nExample: ${myres.example}\nRating: ${myres.thumbs_up} thumbs up. ${myres.thumbs_down} thumbs down.`
        await interaction.editReply(data)
      })
      .catch(async () => {
        await interaction.editReply(
          `No results found for **${term}** or API did not respond.`
        )
      })
  },
}
