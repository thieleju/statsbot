const { default: axios } = require("axios")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const link = "https://api.chess.com/pub/leaderboards"
const chessLink = "https://www.chess.com/"
const maxTopNRank = 10
const defaultTopNRank = 5
const categories = ["rapid", "bullet", "blitz"]

function formatChessData(data, categories, topNRank = defaultTopNRank) {
  let embed = new EmbedBuilder()
    .setTitle("Chess Leaderboard")
    .setColor(0x7fa650)
    .setURL(chessLink)

  if (categories.includes("bullet")) {
    embed.addFields({
      name: "Live Bullet",
      value: formatChessPlayers(data.live_bullet.slice(0, topNRank)),
    })
  }
  if (categories.includes("blitz")) {
    embed.addFields({
      name: "Live Blitz",
      value: formatChessPlayers(data.live_blitz.slice(0, topNRank)),
    })
  }
  if (categories.includes("rapid")) {
    embed.addFields({
      name: "Live Rapid",
      value: formatChessPlayers(data.live_rapid.slice(0, topNRank)),
    })
  }

  return embed.setTimestamp()
}

function formatChessPlayers(players) {
  let result = ""

  players.forEach((player) => {
    result += `**${player.rank}. @${player.username} - ${player.name} - ${player.score}**
      Win: ${player.win_count} - Loss: ${player.loss_count} - Draw: ${player.draw_count}`
    result += "\n"
  })

  return result
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("show-chess-leaderboard")
    .setDescription("Show chess leaderboard")
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("The leaderboard category")
        .setRequired(false)
        .addChoices(
          { name: "bullet", value: "bullet" },
          { name: "blitz", value: "blitz" },
          { name: "rapid", value: "rapid" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("top-n")
        .setDescription(`Number of top users. Max: ${maxTopNRank}`)
        .setRequired(false)
    ),
  async execute(interaction) {
    let data = ``
    const category = interaction.options.getString("category")
    const topN = interaction.options.getInteger("top-n")

    let selectedCategories = [...categories]
    let selectedTopN = defaultTopNRank

    if (category) {
      selectedCategories = [category]
    }
    if (topN && 0 < topN && topN <= maxTopNRank) {
      selectedTopN = topN
    }

    await axios
      .get(link)
      .then((response) => {
        data = formatChessData(response.data, selectedCategories, selectedTopN)
      })
      .catch((err) => {
        data = err
      })
    await interaction.deferReply() // sometimes it takes longer than max 3 seconds
    const reply = { embeds: [data] }
    // interaction.reply("Working on it...");
    return await interaction.editReply(reply)
  },
}
