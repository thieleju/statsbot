const { SlashCommandBuilder } = require("discord.js")
const countdown = require("countdown")

const bootTime = new Date()

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("See how long Stats-Bot has been up."),
  async execute(interaction) {
    return interaction.reply(
      `Stats-Bot has been up since ${bootTime.toUTCString()} for a total of: ${countdown(
        bootTime
      )}`
    )
  },
}
