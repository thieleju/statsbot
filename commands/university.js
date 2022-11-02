const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("universitydomain")
    .setDescription("Get the domain of a university")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Enter the name of the university or the city")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const universityName = interaction.options.getString("name").toLowerCase()
      const response = await axios({
        method: "get",
        url: `https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json`,
        responseType: "json",
      })

      var filtered = response.data.filter((el) =>
        el.name.toLowerCase().includes(universityName)
      )

      var universityData = ""
      if (filtered.length === 0) {
        interaction.reply(
          "No result for your search. Try with searching just the city of the university!"
        )
      } else if (filtered.length === 1)
        interaction.reply(
          `Name: ${filtered.pop().name}\nDomain: ${
            filtered.pop().domains[0]
          }\nCountry: ${filtered.pop().country}\nWeb Page: ${
            filtered.pop().web_pages[0]
          }`
        )
      else if (filtered.length > 1) {
        for (var i = 0; i < filtered.length; i++) {
          // Don't add more if over 1000 chars to prevent error
          if (universityData.length + filtered[i].name.length > 1000) break
          else
            universityData = `${universityData} ${i + 1}. Name: ${
              filtered[i].name
            }\n`
        }

        interaction.reply(
          `Specify your search! ${filtered.length} results found:\n\n${universityData}`
        )
      }
    } catch (error) {
      interaction.reply("An error occured. Please try again later.")
    }
  },
}
