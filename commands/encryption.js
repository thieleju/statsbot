const { SlashCommandBuilder, escapeMarkdown } = require("discord.js")
const axios = require("axios").default

module.exports = {
  data: new SlashCommandBuilder()
    .setName("encyption")
    .setDescription("Encrypt/decrypt a message using a key.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("encrypt")
        .setDescription("Encrypt a message using a key.")
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("The message to encrypt.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("key")
            .setDescription("The key to encrypt the message with.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("decrypt")
        .setDescription("Decrypt a message using a key.")
        .addStringOption((option) =>
          option
            .setName("message")
            .setDescription("The message to decrypt.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("key")
            .setDescription("The key to decrypt the message with.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("generate")
        .setDescription("Generate a key.")
        .addIntegerOption((option) =>
          option
            .setName("length")
            .setDescription("The length of the key to generate.")
            .setMaxValue(1000)
            .setRequired(true)
        )
        .addBooleanOption((option) =>
          option
            .setName("symbols")
            .setDescription("Whether or not to include symbols in the key.")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand()
    if (subcommand === "encrypt") {
      const message = interaction.options.getString("message")
      const key = interaction.options.getString("key")
      await axios({
        method: "post",
        url: "https://classify-web.herokuapp.com/api/encrypt",
        data: {
          data: message,
          key,
        },
        responseType: "json",
      })
        .then((response) => {
          let { result } = response.data
          if (result.length > 2000)
            result = {
              files: [{ name: "result.txt", attachment: Buffer.from(result) }],
            }
          interaction.reply(result)
        })
        .catch((error) => {
          console.log(error)
          interaction.reply("Problem encrypting the message!")
        })
    } else if (subcommand === "decrypt") {
      const message = interaction.options.getString("message")
      const key = interaction.options.getString("key")
      await axios({
        method: "post",
        url: "https://classify-web.herokuapp.com/api/decrypt",
        data: {
          data: message,
          key,
        },
        responseType: "json",
      })
        .then((response) => {
          let { result } = response.data
          if (result.length > 2000)
            result = {
              files: [{ name: "result.txt", attachment: Buffer.from(result) }],
            }
          interaction.reply(result)
        })
        .catch((error) => {
          interaction.reply("Problem decrypting the message!")
        })
    } else if (subcommand === "generate") {
      const length = interaction.options.getInteger("length")
      const symbols = interaction.options.getBoolean("symbols")
      await axios({
        method: "get",
        url: `https://classify-web.herokuapp.com/api/keygen?symbols=${
          symbols ? "1" : "0"
        }${length ? `&length=${length}` : ""}`,
        responseType: "json",
      })
        .then((response) => {
          let { key } = response.data
          if (key.length > 2000)
            key = {
              files: [{ name: "result.txt", attachment: Buffer.from(key) }],
            }
          interaction.reply(escapeMarkdown(response.data.key))
        })
        .catch((error) => {
          interaction.reply("Problem generating the key!")
        })
    }
  },
}
