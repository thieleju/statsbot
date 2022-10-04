const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("websiteicon")
		.setDescription("Get a website icon of the domain of your choice.")

		.addSubcommand(subcommand => subcommand
			.setName("domain")
			.setDescription("Get an icon of this domain")
			.addStringOption(option => option
				.setName("icon")
				.setDescription("The icon of the domain"))
		),

	async execute(interaction) {
		let domain_icon = interaction.options.getString("icon");

		let type = interaction.options.getSubcommand();
		let url = `https://icon.horse/icon/${domain_icon}/${type}/`;


		await axios({
			method: "get",
			url: url,
			responseType: "json",
		})
			.then((response) => {
				interaction.reply(response.img);
			})
			.catch((error) => {
				interaction.reply("The website icon API did not respond!");
			});
	},
};

