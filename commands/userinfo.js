const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Display info about yourself."),
  async execute(interaction) {
    return interaction.reply(
      `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`
    )
  },
}
