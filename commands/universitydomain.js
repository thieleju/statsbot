const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("universitydomain")
    .setDescription("Get the gender of a name")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("Enter the name of the university")
        .setRequired(true)
    ),

  async execute(interaction) {
    var universityName = interaction.options.getString("name").toLowerCase()

    await axios({
      method: "get",
      url: `https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json`,
      responseType: "json",
    })
      .then((response) => {
        var temp = response.data.filter((el) =>
          el.name.toLowerCase().includes(universityName)
        )
        if (temp.length === 1) {
          var universityData = temp.pop()

          interaction.reply({
            content:
              "Name: " +
              universityData.name +
              "\n" +
              "Webside: " +
              universityData.web_pages +
              "\n" +
              "Domain: " +
              universityData.domains +
              "\n" +
              "Country: " +
              universityData.country +
              "\n",
          })
        } else if (temp.length > 1) {
          var universityData = ""
          for (var i = 0; i < temp.length; i++) {
            if (i < temp.length - 1) {
              universityData =
                universityData +
                (i + 1) +
                ".Result: " +
                "\n" +
                "Name: " +
                temp[i].name +
                "\n" +
                "\n"
            } else if (i === temp.length - 1) {
              universityData =
                universityData +
                (i + 1) +
                ".Result: " +
                "\n" +
                "Name: " +
                temp[i].name +
                "\n" +
                "\n"

              interaction.reply(universityData.toString())
            }
          }
        }
      })
      .catch((error) => {
        interaction.reply("An error happen. Try again.")
      })
  },
}
