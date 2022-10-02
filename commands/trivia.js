const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;
module.exports = {
  data: new SlashCommandBuilder()
    .setName("trivia")
    .setDescription("Fetches a random question with answer as true and false"),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://opentdb.com/api.php?amount=1&type=boolean",
      responseType: "json",
    })
      .then(async (response) => {
        const message = await interaction
          .reply({
            content: `${response.data.results[0].question} (**Category** : **${response.data.results[0].category}**)`,
            fetchReply: true,
          })
          .then((message) => {
            message.react("✅").then(() => message.react("❌"));
            let filter = (reaction, user) => {
              return (
                ["✅", "❌"].includes(reaction.emoji.name) &&
                user.id === interaction.user.id
              );
            };
            message
              .awaitReactions({ filter, max: 1, time: 10000 })
              .then((collected) => {
                const reaction = collected.first();
                if (reaction.emoji.name === "✅") {
                  if (response.data.results[0].correct_answer == "True") {
                    message.reply(`Correct Answer!`);
                  } else {
                    message.reply(`Wrong Answer!`);
                  }
                } else {
                  if (response.data.results[0].correct_answer == "False") {
                    message.reply(`Correct Answer!`);
                  } else {
                    message.reply(`Wrong Answer!`);
                  }
                }
              })
              .catch((collected) => {
                console.log(collected);
                message.reply(
                  "You reacted with neither a thumbs up, nor a thumbs down."
                );
              });
          });
      })
      .catch((e) => {
        interaction.reply(`Error`);
      });
  },
};
