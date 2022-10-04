const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("numberfact")
    .setDescription("Get a random number fact.")

    .addSubcommand((subcommand) =>
      subcommand
        .setName("trivia")
        .setDescription("Get any random fact about a number")
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription(
              "The number to get a fact about. Leave empty for a random number"
            )
        )
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("math")
        .setDescription("Get a math related fact about a number")
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription(
              "The number to get a fact about. Leave empty for a random number"
            )
        )
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("year")
        .setDescription("Get any fact about a year")
        .addIntegerOption((option) =>
          option
            .setName("year")
            .setDescription(
              "The year to get a fact about. Leave empty for a random year"
            )
        )
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("date")
        .setDescription("Get any fact about a date")
        .addIntegerOption((option) =>
          option
            .setName("month")
            .setDescription("The month of the year")
            .setRequired(true)
            .addChoices(
              { name: "January", value: 1 },
              { name: "February", value: 2 },
              { name: "March", value: 3 },
              { name: "April", value: 4 },
              { name: "May", value: 5 },
              { name: "June", value: 6 },
              { name: "July", value: 7 },
              { name: "August", value: 8 },
              { name: "September", value: 9 },
              { name: "October", value: 10 },
              { name: "November", value: 11 },
              { name: "December", value: 12 }
            )
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption((option) =>
          option
            .setName("day")
            .setDescription("The day of the month")
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
    ),
  async execute(interaction) {
    let number = interaction.options.getInteger("number") ?? "random"
    let year = interaction.options.getInteger("year") ?? "random"
    let month = interaction.options.getInteger("month")
    let day = interaction.options.getInteger("day")

    let type = interaction.options.getSubcommand()
    let url = `http://numbersapi.com/${number}/${type}`

    switch (type) {
      case "year":
        url = `http://numbersapi.com/${year}/${type}`
        break

      case "date":
        url = `http://numbersapi.com/${month}/${day}/${type}`
        break
    }

    await axios({
      method: "get",
      url: url,
      responseType: "text",
    })
      .then((response) => {
        interaction.reply(response.data)
      })
      .catch((error) => {
        interaction.reply("The Numbers API did not respond!")
      })
  },
}
