const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { DateTime, Duration } = require('luxon');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('programmingcontests')
		.setDescription('Shows five upcoming programming contests'),
	async execute(interaction) {
		const contests = (await axios.get('https://kontests.net/api/v1/all')).data
			.filter(({ start_time }) => (
				DateTime.fromISO(start_time).diffNow().as('seconds') > 0
			))
			.slice(0, 5);
		const embed = new EmbedBuilder()
			.setTitle('Upcoming programming contests:');

		for (const contest of contests) {
			const { name, url, start_time, end_time } = contest;

			const starts = DateTime.fromISO(start_time).toLocaleString(DateTime.DATETIME_SHORT);
			const ends = DateTime.fromISO(end_time).toLocaleString(DateTime.DATETIME_SHORT);

			const durationMillis = parseInt(contest.duration) * 1000;
			let durationUnit = 'hours';
			let duration = Duration.fromMillis(durationMillis).as(durationUnit).toPrecision(2);
			if (duration > 24) {
				durationUnit = 'days';
				duration = Duration.fromMillis(durationMillis).as(durationUnit).toPrecision(2);
			}

			const value = `[Link](${url})
			**Starts**: ${starts}
			**Ends**: ${ends}
			**Duration**: ${duration} ${durationUnit}`;
			embed.addFields({ name, value });
		}
		interaction.reply({ embeds: [embed] });
	},
};
