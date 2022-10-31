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
        console.log(temp)
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
              universityData.country,
          })
        } else if (temp.length > 1) {
          var universityData = ""
          for (var i = 0; i < temp.length; i++) {
            if (i < temp.length - 1) {
              universityData =
                universityData + (i + 1) + ". Name: " + temp[i].name + "\n"
            } else if (i === temp.length - 1) {
              universityData =
                universityData + (i + 1) + ". Name: " + temp[i].name + "\n"

              var errorMessage =
                "Specify your search! Your search gived " +
                (i + 1) +
                " Results:"

              interaction.reply(errorMessage + "\n" + "\n" + universityData)
            }
          }
        } else {
          var errorMessage =
            "No result for your search. Try with searching just the city of the university!"
          interaction.reply(errorMessage)
        }
      })
      .catch((error) => {
        interaction.reply("An error happen. Try again.")
      })
  },
}
