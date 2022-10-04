const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crypto")
    .setDescription("Get Crypto Status ")
    .addStringOption((option) =>
      option
        .setName("crypto")
        .setDescription("Crypto to fetch information About e.g bitcoin")
        .setRequired(true)
    ),
  async execute(interaction) {
    const crypto = interaction.options.getString("crypto").toLowerCase()
    await interaction.deferReply({ ephemeral: false })

    const URL = `https://api.coinstats.app/public/v1/coins/${crypto}?currency=USD`
    axios({
      method: "get",
      url: URL,
      responseType: "json",
    })
      .then(async (res) => {
        const resData = res.data.coin

        const data = `
                Name: ${resData?.name}\nSymbol: ${resData?.symbol}\nPrice: ${resData?.price}\$ \nPriceBTC: ${resData?.priceBtc} BTC\nicon:  ${resData?.icon}\nvolume: ${resData.volume}\nTotal Supply: ${resData.totalSupply} \nPrice Change: ${resData.priceChange1h}% (last 1hr) ${resData.priceChange1d}% (last 1 Day) ${resData.priceChange1w}% (last 1 Week)\nWebsite: ${resData.websiteUrl}
                `

        await interaction.editReply(data)
      })
      .catch(async () => {
        await interaction.editReply("Invalid Request")
      })
  },
}
