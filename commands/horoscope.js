const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("horoscope")
    .setDescription("Shows horoscope for a particular sign and day")
    .addStringOption((option) => {
      return option
        .setName("sign")
        .setDescription("All Signs")
        .setRequired(true)
        .addChoices(
          { name: "aries", value: "aries" },
          { name: "taurus", value: "taurus" },
          { name: "gemini", value: "gemini" },
          { name: "cancer", value: "cancer" },
          { name: "leo", value: "leo" },
          { name: "virgo", value: "virgo" },
          { name: "libra", value: "libra" },
          { name: "scorpio", value: "scorpio" },
          { name: "sagittarius", value: "sagittarius" },
          { name: "capricorn", value: "capricorn" },
          { name: "aquarius", value: "aquarius " },
          { name: "taurus", value: "taurus" }
        )
    })
    .addStringOption((option) => {
      return option
        .setName("day")
        .setDescription("Show for")
        .setRequired(true)
        .addChoices(
          { name: "Today", value: "today" },
          { name: "Tomorrow", value: "tomorrow" },
          { name: "Yesterday", value: "yesterday" }
        )
    }),
  async execute(interaction) {
    const sign = interaction.options.getString("sign").toLowerCase() ?? "aries"
    const day = interaction.options.getString("day").toLowerCase() ?? "today"

    axios({
      url: `https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`,
      method: "POST",
      responseType: "json",
    })
      .then(async (response) => {
        await interaction.reply({
          content:
            "Date: " +
            response.data.current_date +
            "\n" +
            "Description: " +
            response.data.description +
            "\n" +
            "Compatibility: " +
            response.data.compatibility +
            "\n" +
            "Mood: " +
            response.data.mood +
            "\n" +
            "Color: " +
            response.data.color +
            "\n" +
            "Lucky Number: " +
            response.data.lucky_number +
            "\n" +
            "Lucky Time: " +
            response.data.lucky_time,
        })
      })
      .catch(async (error) => {
        await interaction.reply("Some error occurred!")
      })
  },
}
