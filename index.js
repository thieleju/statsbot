require("dotenv").config();

const invite_link = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DC_BOT_CLIENT_ID}&permissions=${process.env.DC_BOT_PERMISSIONS}&scope=applications.commands%20bot`;
console.log(invite_link);
