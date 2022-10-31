const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("apod")
    .setDescription("Get an astronomy picture of the day")
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription(
          "Must be later than 1995-06-16, and earlier than tomorrow. YYYY-MM-DD."
        )
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("descriptor")
        .setDescription("Output description of image or not. True by default.")
        .setRequired(false)
    ),

  async execute(interaction) {
    const date = interaction.options.getString("date")
    const desc =
      interaction.options.getBoolean("descriptor") == null
        ? true
        : interaction.options.getBoolean("descriptor")

    await axios({
      method: "get",
      url:
        `${date}`.length == 10
          ? `https://api.nasa.gov/planetary/apod?api_key=vUhDy288PdcxolqMhrrgKctqsw4JDa72Y0yDnOgR&date=${date}`
          : `https://api.nasa.gov/planetary/apod?api_key=vUhDy288PdcxolqMhrrgKctqsw4JDa72Y0yDnOgR`,
      responseType: "json",
    })
      .then((res) => {
        let explanation = `${
          res.data.explanation
            ? res.data.explanation
            : "No explanation provided."
        }`
        explanation = explanation.slice(0, explanation.indexOf(".", 256) + 1)
        explanation = desc ? explanation : "None"
        const embed = new EmbedBuilder()
          .setTitle(`${res.data.title}`)
          .setURL(`${res.data.hdurl ? res.data.hdurl : res.data.url}`)
          .setImage(`${res.data.hdurl ? res.data.hdurl : res.data.url}`)
          .addFields(
            {
              name: "Author",
              value: `${res.data.copyright ? res.data.copyright : "unknown"}`,
              inline: true,
            },
            { name: "Date", value: `${res.data.date}`, inline: true },
            { name: "Explanation", value: explanation }
          )
          // empty character in footer if the date format entered is correct.
          .setFooter({
            text:
              `${date}`.length == 10
                ? " "
                : "If you optioned for a custom date, make sure you enter it per format.",
          })
        interaction.reply({ embeds: [embed] })
      })
      .catch((err) => {
        const embed = new EmbedBuilder().setTitle(`Error`).addFields(
          {
            name: "Details",
            value: "The website did not respond. Please check your parameters!",
          },
          {
            name: "Additional info",
            value:
              typeof err == JSON
                ? `${
                    err.response.data.code ? err.response.data.code : "No code"
                  }`
                : `${
                    err.response.data.msg ? err.response.data.msg : "No message"
                  }`,
          }
        )
        interaction.reply({ embeds: [embed] })
      })
  },
}
