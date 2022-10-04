const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guessage")
    .setDescription("Guess the average age of a random name.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Guess the average age of a specific name.")
        .setRequired(false)
    ),
  async execute(interaction) {
    let ingame = true

    await interaction.reply("Guess!")

    let name = interaction.options.getString("name")

    if (name === null) {
      await axios({
        method: "get",
        url: `https://random-data-api.com/api/v2/users?size=1&response_type=json`,
        responseType: "json",
      }).then(async (response) => {
        name = response.data.first_name
      })
    }

    if (!/^\w+$/.test(name)) {
      await interaction.editReply(`Please only use latin letters.`)
      return
    }

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    let time = 30000

    await axios({
      method: "get",
      url: `https://api.agify.io?name=${name}`,
      responseType: "json",
    })
      .then(async (response) => {
        if (response.data.age === null) {
          await interaction.editReply(`The name ${name} does not exist.`)
          return
        }

        let question = `What is the average age of someone named **${name}**?`
        let answer = response.data.age

        await interaction.editReply(`${question}`)

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
                `Congratulations ${col.author}! **${answer}** is the correct age.`
              )
            } else if (
              !isNaN(col.content) &&
              parseInt(col.content) !== answer
            ) {
              ingame = false
              return await interaction.channel.send(
                `Sorry ${col.author}, the right answer is **${answer}**.`
              )
            }
          }
        })

        collector.on("end", async (col) => {
          if (ingame) {
            ingame = false
            return await interaction.channel.send(
              `Sorry ${interaction.member}. Time is up. The answer was **${answer}** years.`
            )
          }
        })
      })
      .catch((error) => {
        interaction.editReply(`Something went wrong.`)
      })
  },
}
