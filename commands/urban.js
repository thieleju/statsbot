const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
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
    let query = ""
    if (term != null) {
      query = new URLSearchParams({ term })
    }
    await axios({
      method: "get",
      url: term
        ? `https://api.urbandictionary.com/v0/define?${query}`
        : "https://api.urbandictionary.com/v0/random",
      responseType: "json",
    })
      .then(async (res) => {
        let myres = res.data.list[0]
        if (myres == null) {
          await interaction.editReply("No results found!")
        }

        const embedTerm = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(myres.word)
          .setDescription(`*> ${myres.definition}*`)
          .setFields([
            { name: "Example", value: myres.example },
            {
              name: "Rating",
              value: `${myres.thumbs_up} thumbs up. ${myres.thumbs_down} thumbs down.`,
            },
          ])
          .setFooter({ text: `Author: Urban Dictionary` })
          .setTimestamp()

        interaction.editReply({ embeds: [embedTerm] })
      })
      .catch(async (error) => {
        if (error.response != null && error.response.status == 404) {
          await interaction.editReply(error.response.data.error)
        } else {
          await interaction.editReply(
            `No results found for **${term}** or API did not respond.`
          )
        }
      })
  },
}
