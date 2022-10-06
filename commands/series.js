const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("series")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Name of the series")
        .setRequired(true)
    )
    .setDescription("Get any tv/web series info"),
  async execute(interaction) {
    await interaction.deferReply()
    const name = interaction.options.getString("name")
    let data

    try {
      let res = await axios.get(
        `https://catchtheshow.herokuapp.com/api/search?name=${name}`
      )
      data = res.data

      if (!data.length) {
        await interaction.editReply("No series found!")
        return
      }

      let showId = data[0].id
      res = await axios.get(`https://catchtheshow.herokuapp.com/api${showId}`)
      data = res.data
    } catch (error) {
      await interaction.editReply("Ooops! Something went wrong...")
      return
    }

    let s = ""
    s += data.description + "\n\n"
    s += `:star: **Rating:** ${data.rating}/5\n`
    s += `:mirror_ball: **Status:** ${data.status}\n`

    if (data.previousEpisode) {
      s += "\n**PREVIOUS EPISODE**\n"
      s += `:bookmark_tabs: **Name:** ${data.previousEpisode.name}\n`
      s += `:calendar: **Date:** ${data.previousEpisode.date.day}-${data.previousEpisode.date.month}-${data.previousEpisode.date.year}\n`
    }

    if (data.nextEpisode) {
      s += "\n**UPCOMING EPISODE**\n"
      s += `:bookmark_tabs: **Name:** ${data.nextEpisode.name}\n`
      s += `:calendar: **Date:** ${data.nextEpisode.date.day}-${data.nextEpisode.date.month}-${data.nextEpisode.date.year}\n`
    }

    const embed = new EmbedBuilder()
      .setColor(0x1089df)
      .setTitle(data.name)
      .setImage("https://" + data.imageUrl.substring(2))
      .setDescription(s)

    await interaction.editReply({ embeds: [embed] })
  },
}
