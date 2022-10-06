const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { DateTime } = require("luxon")
const axios = require("axios")
const { htmlToText } = require("html-to-text")

function getBreaches(breaches) {
  let array = []
  breaches.forEach((breach) => {
    exampleEmbed = new EmbedBuilder().setColor(0x0099ff)
    let {
      PwnCount,
      Title,
      Domain,
      BreachDate,
      AddedDate,
      Description,
      LogoPath,
      ModifiedDate,
      DataClasses,
    } = breach
    const text = htmlToText(Description, { wordwrap: 130 })
    exampleEmbed
      .setThumbnail(LogoPath)
      .addFields(
        { name: "Name: ", value: Title, inline: true },
        { name: "Domain: ", value: Domain, inline: true },
        { name: "Pwn Count: ", value: String(PwnCount), inline: true },
        {
          name: "Modified Date: ",
          value: DateTime.fromISO(ModifiedDate).toLocaleString(),
          inline: true,
        },
        {
          name: "Added Date: ",
          value: DateTime.fromISO(AddedDate).toLocaleString(),
          inline: true,
        },
        {
          name: "Breach Date: ",
          value: DateTime.fromISO(BreachDate).toLocaleString(),
          inline: true,
        }
      )
      .setDescription(text)
      .setFooter({ text: "haveibeenpwned.com", iconURL: LogoPath })
    array.push(exampleEmbed)
  })
  return array
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list-data-breaches")
    .setDescription("Lists data breaches using the haveibeenpwned.com API"),
  async execute(interaction) {
    const amount = 5
    try {
      let breaches = (
        await axios.get("https://haveibeenpwned.com/api/v3/breaches")
      ).data.slice(0, amount)
      breachList = getBreaches(breaches)
      interaction.reply({
        embeds: [
          breachList[0],
          breachList[1],
          breachList[2],
          breachList[3],
          breachList[4],
        ],
      })
    } catch (err) {
      interaction.reply("The API did not respond!")
    }
  },
}
