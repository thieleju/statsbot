const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guessgender")
    .setDescription("Get the gender of a name")
    .addStringOption((option) =>
      option.setName("name").setDescription("Enter a name").setRequired(true)
    ),
  async execute(interaction) {
    const name = interaction.options.getString("name").toLowerCase()

    await axios({
      method: "get",
      url: `https://api.genderize.io?name=${name}`,
      responseType: "json",
    })
      .then((response) => {
        interaction.reply({
          content:
            "Name: " +
            response.data.name.charAt(0).toUpperCase() +
            response.data.name.slice(1) +
            "\n" +
            "Gender: " +
            response.data.gender.charAt(0).toUpperCase() +
            response.data.gender.slice(1),
        })
      })
      .catch(() => {
        interaction.reply("The api responded with an error!")
      })
  },
}
