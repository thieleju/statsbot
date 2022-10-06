const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fruit")
    .setDescription(
      "You can find out interesting information about fruit and educate yourself."
    )
    .addStringOption((option) => {
      return option
        .setName("fruit")
        .setDescription("Fruit name")
        .setRequired(true)
    }),
  async execute(interaction) {
    const fruit_name = interaction.options.getString("fruit").toLowerCase()

    axios({
      method: "get",
      url: `https://www.fruityvice.com/api/fruit/${fruit_name}`,
      responseType: "json",
    })
      .then((response) => {
        interaction.reply({
          content:
            "Name: " +
            response.data.name +
            "\n" +
            "Genus: " +
            response.data.genus +
            "\n" +
            "Family: " +
            response.data.family +
            "\n" +
            "Order: " +
            response.data.order +
            "\n" +
            "Carbohydrates: " +
            response.data.nutritions.carbohydrates +
            "\n" +
            "Protein: " +
            response.data.nutritions.protein +
            "\n" +
            "Fat: " +
            response.data.nutritions.fat +
            "\n" +
            "Calories: " +
            response.data.nutritions.calories +
            "\n" +
            "Sugar: " +
            response.data.nutritions.sugar,
        })
      })
      .catch((error) => {
        interaction.reply("The Fruit API did not respond!")
      })
  },
}
