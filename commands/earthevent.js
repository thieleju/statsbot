const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("earthevent")
    .setDescription(
      "Return a natural event that has occurred in the last 30 days."
    ),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://eonet.gsfc.nasa.gov/api/v3/events?limit=60&days=30",
      responseType: "json",
    })
      .then(async (response) => {
        await interaction.deferReply({ ephemeral: false })
        // get number of events in the past 30 days, limited to 60
        let totalEvents = response.data.events.length
        // choose random event from eonet API response
        let randomIndex = Math.floor(Math.random() * totalEvents)
        let event = response.data.events[randomIndex]

        // if category is plural, change to singular
        let cat = event.categories[0].title
        if (cat[cat.length - 1] == "s") {
          cat = cat.slice(0, -1)
        }

        // if there were multiple occurrences of the event, return the latest
        let date = event.geometry[event.geometry.length - 1].date
        date = date.slice(0, 10)
        let year = date.slice(0, 4)
        let day = date.slice(8)
        switch (day) {
          case "01":
          case "21":
          case "31":
            day = `${day}st`
            break
          case "02":
          case "22":
            day = `${day}nd`
            break
          case "03":
          case "23":
            day = `${day}rd`
            break
          default:
            day = `${day}th`
        }
        if (day[0] == 0) {
          day = day.slice(1)
        }

        // formatting changes 10, 11, and 12 from strings("10") to ints(10) for some reason
        let months = {
          01: "January",
          02: "February",
          03: "March",
          04: "April",
          05: "May",
          06: "June",
          07: "July",
          08: "August",
          09: "September",
          10: "October",
          11: "November",
          12: "December",
        }
        // work around: parseInt date before returning month
        let month = months[parseInt(date.slice(5, 7))]

        interaction.editReply(
          cat +
            ": " +
            event.title +
            " - " +
            month +
            " " +
            day +
            ", " +
            year +
            "\n" +
            "Learn more [here](" +
            event.sources[0].url +
            ")"
        )
      })
      .catch(() => {
        interaction.editReply(
          "The Earth Observatory Natural Event Tracker API did not respond."
        )
      })
  },
}
