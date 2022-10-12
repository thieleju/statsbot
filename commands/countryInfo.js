const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("countryinfo")
    .setDescription("Get information about a country")
    .addStringOption((option) =>
      option
        .setName("country")
        .setDescription("Country to fetch information About e.g India")
        .setRequired(true)
    ),
  async execute(interaction) {
    const country = interaction.options.getString("country").toLowerCase()
    await interaction.deferReply({ ephemeral: false })

    const URL = `https://restcountries.com/v3.1/name/${country}`
    axios({
      method: "get",
      url: URL,
      responseType: "json",
    })
      .then(async (res) => {
        const resData = res.data[0]
        const data = `OfficialName: ${resData?.name?.official}\nGoogleMapsLocation: ${resData?.maps?.googleMaps}\nPopulation: ${resData?.population} \nCapital: ${resData?.capital[0]} \nRegion:  ${resData?.region}\nArea: ${resData?.area}`
        await interaction.editReply(data)
      })
      .catch(async () => {
        await interaction.editReply(
          "Country could not be found or API did not respond!"
        )
      })
  },
}
