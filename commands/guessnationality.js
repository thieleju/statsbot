const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guessnationality")
    .setDescription(
      "Guess the nationality of a specific name or fetch a random name and its nationality."
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Guess the nationality of a specific name.")
        .setRequired(false)
    ),
  async execute(interaction) {
    let ingame = true

    let name = interaction.options.getString("name")

    //If a name not given by user, get random name
    if (name === null) {
      await axios({
        method: "get",
        url: `https://random-data-api.com/api/v2/users?size=1&response_type=json`,
        responseType: "json",
      }).then(async (response) => {
        name = response.data.first_name
      })
    }

    //Name can be any nationality, but must only use Latin characters
    if (!/^\w+$/.test(name)) {
      await interaction.reply(`Please only use latin characters.`)
      return
    }

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    await axios({
      method: "get",
      url: `https://api.nationalize.io?name=${name}`,
      responseType: "json",
    })
      .then(async (response) => {
        if (response.data.country === null) {
          await interaction.reply(`The name ${name} does not exist.`)
          return
        }
        const countryName = new Intl.DisplayNames(["en"], { type: "region" })

        let answer = countryName.of(response.data.country[0].country_id)

        await interaction.reply(`${name} is from ${answer}`)
      })
      .catch((error) => {
        interaction.reply(`Something went wrong.`)
      })
  },
}
