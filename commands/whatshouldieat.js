const { default: axios } = require("axios")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whatshouldieat")
    .setDescription("Get a random recipe."),
  async execute(interaction) {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((req) => {
        const recipe = req.data.meals[0]
        var ingredients = ""
        //since api provides max. 20 ingredients loop trough them
        for (var i = 1; i < 21; i++) {
          if (recipe["strMeasure" + i])
            ingredients +=
              recipe["strMeasure" + i] +
              " " +
              recipe["strIngredient" + i] +
              "\n"
        }
        const message = new EmbedBuilder()
          .setTitle(recipe?.strMeal)
          .setThumbnail(recipe?.strMealThumb)
          .setDescription(recipe?.strSource)
          .addFields({
            name: "Ingredients",
            value: ingredients,
          })
          .addFields({
            name: "Instructions",
            value:
              recipe?.strInstructions.substring(
                0,
                1024 - (" [more...](" + recipe?.strSource + ")").length
              ) +
              " [more...](" +
              recipe?.strSource +
              ")",
          })
        interaction.reply({ embeds: [message] })
      })
      .catch((err) => {
        interaction.reply("The API did not respond!")
      })
  },
}
