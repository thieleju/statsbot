const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("catfact")
    .setDescription("Get a random fact about cats."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://meowfacts.herokuapp.com/",
      responseType: "json",
    })
      .then((response) => {
        console.log(response.data)
        interaction.reply(response.data.data[0]);
      })
      .catch((error) => {
        interaction.reply("The Excuser API did not respond!");
      });
  },
};