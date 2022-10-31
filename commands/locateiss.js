const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("locateiss")
    .setDescription("locate the International Space Station."),
  async execute(interaction) {
    axios({
      method: "get",
      url: `http://api.open-notify.org/iss-now.json`,
      responseType: "json",
    })
      .then((response) => {
        var lat = response.data["iss_position"]["latitude"]
        var lon = response.data["iss_position"]["longitude"]
        
        var url =
          "https://www.openstreetmap.org/search?query=" +
          lat +
          "%2C%20" +
          lon +
          "#map=5/" +
          lat +
          "/" +
          lon

        interaction.reply({
          content:
            "Current postion of the ISS:" +
            "\n\t" +
            "latitud: " +
            lat +
            "\n\t" +
            "longitud: " +
            lon +
            "\n\n" +
            "Map Location: " +
            url +
            "\n\n" +
            "NOTE: go to the website an hover over the coordinates ",
        })
      })
      .catch((error) => {
        interaction.reply("The Fruit API did not respond!")
      })
  },
}
