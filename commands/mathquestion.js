const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default
let collector

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mathquestion")
    .setDescription("Get a random math question and answer it.")
    .addNumberOption((option) =>
      option.setName("min").setDescription("Minimum number.").setRequired(false)
    )
    .addNumberOption((option) =>
      option.setName("max").setDescription("Maximum number.").setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Choose game mode.")
        .addChoices(
          { name: "easy", value: "Easy" },
          { name: "medium", value: "Medium" },
          { name: "hard", value: "Hard" }
        )
        .setRequired(false)
    ),
  async execute(interaction) {
    let ingame = true

    await interaction.reply("Let's go!")

    let min = interaction.options.getNumber("min")
    let max = interaction.options.getNumber("max")

    if (!min) {
      min = 20
    }

    if (!max) {
      max = 400
    }

    if (max === min || min > max) {
      min = 20
      max = 400
    }

    let mode = interaction.options.getString("mode")
    let time

    if (!mode || mode.toLowerCase() === "easy") {
      time = 30000
    } else if (mode.toLowerCase() === "medium") {
      time = 20000
    } else if (mode.toLowerCase() === "hard") {
      time = 10000
    }

    await axios({
      method: "get",
      url: `https://x-math.herokuapp.com/api/random?max=${max}&min=${min}`,
      responseType: "json",
    })
      .then(async (response) => {
        let questions = [
          `What is the result for **${response.data.expression}**?`,
          `Do you know the result for **${response.data.expression}**?`,
          `What is the solution for **${response.data.expression}**?`,
        ]
        let question = questions[Math.floor(Math.random() * questions.length)]
        let answer = response.data.answer

        await interaction.channel.send(`${interaction.member}, ${question}`)

        let filter = (m) => m.author.id === interaction.member.id
        collector = await interaction.channel.createMessageCollector({
          filter,
          time: time,
        })

        collector.on("collect", async (col) => {
          if (ingame) {
            if (isNaN(col.content)) {
              await interaction.channel.send(
                `${col.author} **${col.content}** is not a number.`
              )
            }

            if (!isNaN(col.content) && parseInt(col.content) === answer) {
              ingame = false
              return await interaction.channel.send(
                `Congratulations ${col.author}! The answer **${answer}** is correct!`
              )
            } else if (
              !isNaN(col.content) &&
              parseInt(col.content) !== answer
            ) {
              ingame = false
              return await interaction.channel.send(
                `Sorry ${col.author}. You calculated **${col.content}** but the answer was **${answer}**`
              )
            }
          }
        })

        collector.on("end", async (col) => {
          if (ingame) {
            ingame = false
            return await interaction.channel.send(
              `Sorry ${interaction.member}. Time is up. The answer was **${answer}**.`
            )
          }
        })
      })
      .catch((error) => {
        interaction.reply("The math question API did not respond!")
      })
  },
}
