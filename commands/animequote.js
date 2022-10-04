const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animequote")
    .setDescription("Get a random anime quote.")
    .addStringOption((option) =>
      option
        .setName("anime")
        .setDescription("The name of an anime you'd like a quote from")
    ),
  async execute(interaction) {
    const animeName = interaction.options.getString("anime")
    await axios({
      method: "get",
      url: animeName
        ? `https://animechan.vercel.app/api/quotes/anime?title=${animeName}`
        : "https://animechan.vercel.app/api/random",
      responseType: "json",
    })
      .then((response) => {
        let animeQuote = response.data
        if (animeName) {
          const randQuote = animeQuote[(animeQuote.length * Math.random()) | 0]
          animeQuote = randQuote
        }
        const embeddedQuote = new EmbedBuilder()
          .setColor(0x0099ff)
          .setAuthor({ name: animeQuote.character })
          .setDescription(`*> ${animeQuote.quote}*`)
          .setFooter({ text: animeQuote.anime })
        interaction.reply({ embeds: [embeddedQuote] })
      })
      .catch((error) => {
        if (error.response != null && error.response.status == 404) {
          interaction.reply(error.response.data.error)
        } else {
          interaction.reply("The Anime-chan API did not respond!")
        }
      })
  },
}
