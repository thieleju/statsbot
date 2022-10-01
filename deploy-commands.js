const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DC_BOT_TOKEN);

rest
  .put(Routes.applicationCommands(process.env.DC_BOT_CLIENT_ID), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
