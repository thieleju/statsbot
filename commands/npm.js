const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("npm")
    .setDescription("Get package details from the NPM Registry")
    .addStringOption((option) => {
      return option
        .setName("package_name")
        .setDescription("Package name")
        .setRequired(true)
    })
    .addStringOption((option) => {
      return option
        .setName("version")
        .setDescription("Package specific version or latest")
        .setRequired(false)
    }),
  async execute(interaction) {
    const packageName = interaction.options
      .getString("package_name")
      .toLowerCase()
    const version = interaction.options.getString("version")

    axios({
      url: version
        ? `https://registry.npmjs.org/${packageName}/${version}`
        : `https://registry.npmjs.org/${packageName}`,
      method: "GET",
      responseType: "json",
    })
      .then(async (response) => {
        await interaction.reply({
          content:
            "Package Name: " +
            response.data.name +
            "\n" +
            "Package Description: " +
            response.data.description +
            "\n" +
            "Package Author(email): " +
            response.data.author.name +
            " - " +
            response.data.author.email +
            "\n" +
            "Package Repository: " +
            response.data.repository.url,
        })
      })
      .catch(async (error) => {
        await interaction.reply("NPM command run with errors")
      })
  },
}
