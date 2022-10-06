const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Shows random memes from r/memes"),
  async execute(interaction) {
    axios({
      method: "GET",
      url: "https://reddit-meme-api.herokuapp.com",
      responseType: "json",
    })
      .then((response) => {
        const embed = new EmbedBuilder()

        const memeUrl = response.data.post_link
        const memeImage = response.data.url
        const memeTitle = response.data.title
        const memeUpvotes = response.data.ups

        embed.setTitle(`${memeTitle}`)
        embed.setURL(`${memeUrl}`)
        embed.setImage(`${memeImage}`)
        embed.setColor("Random")
        embed.setFooter({
          text: `👍 ${memeUpvotes}`,
        })

        interaction.reply({ embeds: [embed] }).catch((err) => {
          interaction.reply("Failed to reply with embed!")
        })
      })
      .catch((err) => {
        interaction.reply("API failed to respond!")
      })
  },
}
