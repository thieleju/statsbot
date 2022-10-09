const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("choose")
    .setDescription("Randomly select any item from your given list")
    .addStringOption((option) =>
      option
        .setName("list")
        .setDescription("List of words to choose from")
        .setRequired(true)
    ),
  async execute(interaction) {
    const list = interaction.options.getString("list").split(" ")
    const word = list[Math.floor(Math.random() * list.length)]
    await interaction.reply(
      `>>> Your List: \n \u0009• ${list.join("\n \u0009• ")} \n\n` +
        "**I chose `" +
        word +
        "`!**"
    )
  },
}
