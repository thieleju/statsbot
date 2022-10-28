const axios = require("axios").default
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ayah")
    .setDescription("Get any verse of Quran")
    .addStringOption((option) =>
      option
        .setName("key")
        .setDescription(`The key should be in form Surah:Ayah Example: 2:255`)
        .setRequired(false)
    ),
  async execute(interaction) {
    let key = interaction.options.getString("key")
    if (key == null) {
      // Get a random verse number from 1 to 6236
      key = Math.floor(Math.random() * 6236) + 1
    }

    let url = `http://api.alquran.cloud/v1/ayah/${key}/editions/quran-uthmani,en.asad`
    let reply = ""
    axios
      .get(url)
      .then(({ data }) => {
        const [ar, en] = data.data
        const { text, surah, numberInSurah } = ar

        reply = `>>> **Arabic:** \n${text} \n\n**English:** \n${en.text} \n\nSurah #${surah.number}: ${surah.englishName} | Verse #${numberInSurah}`
        interaction.reply(reply)
      })
      .catch((error) => {
        error = error.response.data
        reply = `**Something Went Wrong** \n${error.data[0]}`
        interaction.reply(reply)
      })
  },
}

// Nice to have TODO: Add arabic audio from same API
