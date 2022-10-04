const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dictionary")
    .setDescription("Get definitions and synonyms of words.")
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("Word to find the meaning of")
        .setRequired(true)
    ),
  async execute(interaction) {
    const word = interaction.options.getString("word")
    await axios({
      method: "get",
      url: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      responseType: "json",
    })
      .then((response) => {
        const meanings = response.data[0].meanings
        const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(`Meaning for word: "${response.data[0].word}"`)
        meanings.map((meaning) => {
          definitions = meaning.definitions[0]
          embed.addFields({
            name: meaning.partOfSpeech,
            value: `${definitions.definition}`,
          })

          if (meaning.synonyms.length > 0) {
            let synonyms = ""
            allSyns = meaning.synonyms.map((syn) => {
              synonyms += syn + " ,"
            })
            embed.addFields({
              name: "synonyms",
              value: synonyms,
              inline: true,
            })
          }
        })

        interaction.reply({ embeds: [embed] })
      })
      .catch((error) => {
        interaction.reply(
          "Couldn't find the meaning for the word. Please check and enter again."
        )
      })
  },
}
