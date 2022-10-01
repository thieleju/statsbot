const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Login to Discord with your client's token
client.login(process.env.DC_BOT_TOKEN).catch(console.error);

// Read all command files from commands folder (__dirname is the current directory)
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

// Read command files and add them to the client.commands collection
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Bot ready and online!");
});

// React to chat interactions
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  // do nothing if command is not found
  if (!command) return;

  try {
    // Execute the command
    await command.execute(interaction);
    // Log command usage
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] Player ${interaction.user.username} used command ${interaction.commandName}`
    );
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
