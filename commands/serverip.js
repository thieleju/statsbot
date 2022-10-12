const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

const template = ({ ip, country }) => `
**Server IP Address:** ${ip}
**Server Location:** ${country}
`

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverip")
    .setDescription("Display server IP and location"),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://api.myip.com",
      responseType: "json",
    })
      .then((response) => {
        interaction.reply(template(response.data))
      })
      .catch((error) => {
        interaction.reply("Something went wrong!")
      })
  },
}
