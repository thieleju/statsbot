const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios").default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("animequote")
        .setDescription("Random Anime Quote")
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Random Quote from anime title')
                .setRequired(false)

        ),
    async execute(interaction) {
        const title = interaction.options.getString('title')?.toLowerCase();
        await interaction.deferReply({ ephemeral: false });
        let URL;

        if (title) {
            URL = `https://animechan.vercel.app/api/quotes/anime?title=${title}`;
        }
        else {
            URL = "https://animechan.vercel.app/api/random"
        }
        axios({
            method: "get",
            url: URL,
            responseType: "json",
        }).then(async (res) => {

            let resData;
            if (title) {
                const QL = res.data.length;
                const Random = Math.floor(Math.random() * QL);
                resData = res.data[Random];
            } else {
                resData = res.data;
            }

            const data = `
                **${resData?.anime}**\n**\`${resData?.quote}\`**\n\t\t\t\t\t\t\t\t **~${resData?.character}**`
            await interaction.editReply(data);
        }).catch(async (error) => {
            if (error.response.status === 404) {
                await interaction.editReply("No related quotes found!")
            } else {
                await interaction.editReply("SomeThing Went Wrong")
            }
        })
    },
};