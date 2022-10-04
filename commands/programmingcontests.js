const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const axios = require("axios")
const { DateTime, Duration } = require("luxon")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("programmingcontests")
    .setDescription("Shows upcoming programming contests")
    .addStringOption((option) =>
      option
        .setName("platform")
        .setDescription("The platform of contests")
        .addChoices(
          { name: "CodeForces", value: "codeforces" },
          { name: "TopCoder", value: "top_coder" },
          { name: "AtCoder", value: "at_coder" },
          { name: "CodeChef", value: "code_chef" },
          { name: "CS Academy", value: "cs_academy" },
          { name: "HackerRank", value: "hacker_rank" },
          { name: "HackerEarth", value: "hacker_earth" },
          { name: "Kick Start", value: "kick_start" },
          { name: "LeetCode", value: "leet_code" }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of contests to show")
        .setMinValue(1)
        .setMaxValue(15)
    ),

  async execute(interaction) {
    const platform = interaction.options.getString("platform") ?? "all"
    const amount = interaction.options.getInteger("amount") ?? 5

    const contests = (
      await axios.get(`https://kontests.net/api/v1/${platform}`)
    ).data
      .filter(
        ({ start_time }) =>
          DateTime.fromISO(start_time).diffNow().as("seconds") > 0
      )
      .slice(0, amount)

    if (contests.length == 0) {
      return await interaction.reply(
        "There are no upcoming contests on this platform"
      )
    }

    const embed = new EmbedBuilder().setTitle("Upcoming programming contests:")

    for (const contest of contests) {
      const { name, url, start_time, end_time, site } = contest

      const starts = DateTime.fromISO(start_time).toLocaleString(
        DateTime.DATETIME_SHORT
      )
      const ends = DateTime.fromISO(end_time).toLocaleString(
        DateTime.DATETIME_SHORT
      )

      const durationMillis = parseInt(contest.duration) * 1000
      let durationUnit = "hours"
      let duration = Duration.fromMillis(durationMillis)
        .as(durationUnit)
        .toPrecision(2)
      if (duration > 24) {
        durationUnit = "days"
        duration = Duration.fromMillis(durationMillis)
          .as(durationUnit)
          .toPrecision(2)
      }

      const value = `[Link](${url})
			**Starts**: ${starts}
			**Ends**: ${ends}
			**Duration**: ${duration} ${durationUnit}
			${site ? `**Platform**: ${site}` : ""}`
      embed.addFields({ name, value })
    }
    return await interaction.reply({ embeds: [embed] })
  },
}
