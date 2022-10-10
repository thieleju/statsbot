const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const axios = require("axios").default

const getColorImageLink = (hex) => {
  return `https://singlecolorimage.com/get/${hex}/100x100`
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomcolor")
    .setDescription("Get a random color in HEX and RGB format"),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://x-colors.herokuapp.com/api/random",
      responseType: "json",
    })
      .then((response) => {
        hexData = response.data.hex
        rgbData = response.data.rgb
        const embed = new EmbedBuilder()
          .setColor(hexData)
          .setTitle("Your random color")
          .setImage(getColorImageLink(hexData.slice(1)))
          .addFields(
            { name: "HEX format", value: hexData },
            { name: "RGB format", value: rgbData }
          )
          .setTimestamp()
        interaction.reply({ embeds: [embed] })
      })
      .catch((error) => {
        interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        })
      })
  },
}
