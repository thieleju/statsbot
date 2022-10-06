const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

const url = "https://opentdb.com/api.php?amount=1&type=boolean"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Fetches a random question and answer with ✅ or ❌"),
  async execute(interaction) {
    try {
      // fetch a random question and answer from the Open Trivia Database
      const response = await axios({
        method: "get",
        url, // same as url: url
        responseType: "json",
      })

      if (!response) throw "No response from the api"

      // Reply message with the question
      const message = await interaction.reply({
        content: `\n**Category**: ${response.data.results[0].category} \
        \n**Difficulty**: ${response.data.results[0].difficulty} \
        \n\n${response.data.results[0].question} `,
        fetchReply: true,
      })

      // Add the ✅ and ❌ reactions to the message
      message.react("✅").then(() => message.react("❌"))

      // Create a filter to only allow ✅ and ❌ reactions
      let filter = (reaction, user) => {
        return (
          ["✅", "❌"].includes(reaction.emoji.name) &&
          user.id === interaction.user.id
        )
      }

      // Wait for a reaction to be added to the message
      // If the user failed to react in time -> reply error in .catch()
      message
        .awaitReactions({
          filter,
          max: 1,
          time: 10000,
        })
        .then((collected) => {
          const reaction = collected.first()

          if (reaction.emoji.name === "✅") {
            if (response.data.results[0].correct_answer == "True") {
              message.reply(`✅ Correct Answer!`)
            } else {
              message.reply(`❌ Wrong Answer!`)
            }
          } else {
            if (response.data.results[0].correct_answer == "False") {
              message.reply(`✅ Correct Answer!`)
            } else {
              message.reply(`❌ Wrong Answer!`)
            }
          }
        })
        .catch(() => {
          const correct_answer =
            response.data.results[0].correct_answer == "True" ? "✅" : "❌"
          message.reply(
            `❌ You failed to react in time! The correct answer was ${correct_answer}`
          )
        })
    } catch (error) {
      interaction.reply("The Trivia API did not respond!")
    }
  },
}
