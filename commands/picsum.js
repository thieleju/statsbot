const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("picsum")
    .setDescription("Get a random stock image."),
  async execute(interaction) {
    try {
      interaction.reply(
        `https://picsum.photos/1920/1080?random=${Math.floor(
          Math.random() * 9999
        )}.jpg`
      )
    } catch (error) {
      console.log(error)
      interaction.reply("Something went wrong with the API.")
    }
  },
}
