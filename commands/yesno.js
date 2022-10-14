const { SlashCommandBuilder } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yesno")
    .setDescription("Get a answere to any question."),
  async execute(interaction) {
    await axios({
      method: "get",
      url: "https://yesno.wtf/api",
      responseType: "json",
    })
      .then((response) => {
        // response.data
        // {
        //   "answer": "no",
        //   "forced": false,
        //   "image": "https://yesno.wtf/assets/no/2-101be1e3d8a0ed407c4e3c001ef8fa66.gif"
        // }
        const answer = response.data.answer // no
        const image = response.data.image // link

        const reply_string = `The answer is: ${answer}\n${image}`

        interaction.reply(reply_string)
      })
      .catch((error) => {
        interaction.reply("The api did not respond!")
      })
  },
}
