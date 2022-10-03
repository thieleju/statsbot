# StatsBot - A Discord bot for statistics from public APIs

> **Note** <br>
> This project does participate in the **Hacktoberfest 2022** event! 

A Discord bot which provides various commands to get statistics from public APIs. This project is using the [discord.js](https://discord.js.org/) library and public APIs from [this list](https://github.com/public-apis/public-apis).

## :sparkles: How to contribute

- Navigate to an open issue and ask to be assigned to it
- After you are assigned, [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository and create a new branch
- Make your changes on the new branch and commit them
- Create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) and wait for it to be reviewed
- Thats it! 

For more information check out the [Contribution Guidelines](CONTRIBUTING.md)

> No open issues at the moment? Please wait for new issues to be created.

## :white_check_mark: Available commands

<!-- markdown table -->
| Command        | Description                        | Example       |
| -------------- | ---------------------------------- | ------------- |
| **invitelink** | Shows the invite link for the bot  | `/invitelink` |
| **ping**       | Pong!                              | `/ping`       |
| **serverinfo** | Shows information about the server | `/serverinfo` |
| **userinfo**   | Shows information about the user   | `/userinfo`   |
| **excuse**     | Sends a random excuse              | `/excuse`     |
| **mathquestion**     | Get a random math question            | `/mathquestion`     |


## :wrench: Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16.6.0 or higher)
- Discord Account 


### Project Setup

1. Fork or Clone the repository to your local machine 
2. Navigate to the project root directory (location of package.json)
3. Run the command `npm install` to install all dependencies
4. Setting up a discord bot application
   - Follow [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) on how to set up a new discord application and add a bot
   - Save the `Bot Token`, `Client ID` and `Client Secret` to a new file named `.env` in the project root directory

Example `.env` file content:

```html
DC_BOT_TOKEN=<your bot token>
DC_BOT_CLIENT_ID=<your application client id>
DC_BOT_CLIENT_SECRET=<your application client secret>
DC_BOT_PERMISSIONS=274878131264
```


## :rocket: How to run the bot

```sh
npm run serve
```

This runs the application with [nodemon](https://www.npmjs.com/package/nodemon) which automatically restarts the application when changes are made.


## :link: How to invite the bot

- Option 1: Follow this guide on [discordjs.guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)
- Option 2: Use the base Url `https://discord.com/api/oauth2/authorize` and add following url parameters:
  - **client_id**: Your application client id (`DC_BOT_CLIENT_ID`)
  - **permissions**: All permissions the bot should have when invited as a string (`274878131264`)
  - **scope**: `bot%20applications.commands`


# :question: What is Hacktoberfest?

A month-long celebration from October 1st - 31st sponsored by [Digital Ocean](https://hacktoberfest.com/) and GitHub to get people involved in [Open Source](https://github.com/open-source).

Create your very first pull request to any public repository on GitHub and contribute to the open source developer community.
