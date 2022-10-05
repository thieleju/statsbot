const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stockimage")
    .setDescription("Get a random stock image."),
  async execute(interaction) {
    const rand = Math.floor(Math.random() * 9999)
    interaction.reply(`https://picsum.photos/1920/1080?random=${rand}.jpg`)
  },
}
