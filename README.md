# StatsBot - A Discord Bot to gather data from public APIs

[![CodeQL](https://github.com/thieleju/statsbot/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/thieleju/statsbot/actions/workflows/codeql-analysis.yml)

> **Note** <br>
> This project does participate in the **Hacktoberfest 2022** event!

A Discord bot which provides various commands to get data from public APIs. This project is using the [discord.js](https://discord.js.org/) library and public APIs from [this list](https://github.com/public-apis/public-apis) or other ressources.

## :sparkles: How to contribute

> **Warning** <br>
> Only **one** issue/pull request per person will be accepted. If you want to contribute more, please look for other repositories [here](https://github.com/topics/hacktoberfest-2022?o=desc&s=updated) and keep contributing ❤️

- Navigate to an open issue and ask to be assigned to it (or create one yourself)
- After you are assigned, [fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository and create a new branch
- Make your changes on the new branch and commit them
- Create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) and wait for it to be reviewed
- Thats it!

For more information check out the [Contribution Guidelines](CONTRIBUTING.md)

## :white_check_mark: Available commands

<!-- markdown table -->

| Command                   | Description                                               | API                                                                              |
| ------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `/invitelink`             | Shows the invite link for the bot                         |                                                                                  |
| `/ping`                   | Pong!                                                     |                                                                                  |
| `/serverinfo`             | Shows information about the server                        |                                                                                  |
| `/userinfo`               | Shows information about the user                          |                                                                                  |
| `/excuse`                 | Sends a random excuse                                     | [Excuser](https://excuser.herokuapp.com/)                                        |
| `/show-chess-leaderboard` | Shows information about the current chess.com leaderboard | [chess.com](https://www.chess.com/news/view/published-data-api)                  |
| `/trivia`                 | Shows a random question, react with ✅ or ❌.               | [opentdb.com](https://opentdb.com/api.php?amount=1&type=boolean)                 |
| `/numberfact`             | Shows a random number fact                                | [numbersapi.com](http://numbersapi.com/)                                         |
| `/catfact`                | Shows a random fact about cats.                           | [meowfacts](https://github.com/wh-iterabb-it/meowfacts)                          |
| `/dogfact`                | Shows a random fact about dogs.                           | [Dog API](http://dog-api.kinduff.com/api/facts)                                  |
| `/dictionary`             | Get definitions and synonyms of words.                    | [dictionaryapi](https://dictionaryapi.dev/)                                      |
| `/foxpic`                 | Shows a random picture of a fox.                          | [RandomFox](https://randomfox.ca/floof/)                                         |
| `/mathquestion`           | Sends a random math question.                             | [xMath API](https://x-math.herokuapp.com/)                                       |
| `/uptime`                 | Shows how long Stats-Bot has been up.                     | [Countdown NPM Package](https://www.npmjs.com/package/countdown)                 |
| `/crypto`                 | Provide detail about given crypto currency.               | [coinstat](https://documenter.getpostman.com/view/5734027/RzZ6Hzr3)              |
| `/motivation`             | Shows a random motivation quote.                          | [motivation](https://nodejs-quoteapp.herokuapp.com/)                             |
| `/breakingbad`            | Shows a random Breaking Bad quote.                        | [Breaking Bad Quotes Api](https://breakingbadquotes.xyz/)                        |
| `/dogpic`                 | Shows a random dog picture.                               | [Dog Pic API](https://random.dog/woof.json/)                                     |
| `/catpic`                 | Shows a random cat picture.                               | [Cat Pic API](https://aws.random.cat/meow/)                                      |
| `/duckpic`                | Shows a random duck picture.                              | [Duck Pic API](https://random-d.uk/api/quack/)                                   |
| `/joke`                   | Give you a random joke.                                   | [Joke API](https://sv443.net/jokeapi/v2/)                                        |
| `/chuck`                  | Shows a random joke about Chuck Norris                    | [Chuck Norris API](https://api.chucknorris.io/jokes/random)                      |
| `/animequote`             | Shows a random anime quote.                               | [anime-chan](https://animechan.vercel.app/)                                      |
| `/bored`                  | Get something to do if you are bored.                     | [Bored API](http://www.boredapi.com/api/activity/)                               |
| `/kanye`                  | Shows a random quote by Kanye West.                       | [Kanye Rest API](https://api.kanye.rest/)                               |
| `/websiteicon`            | Shows the favicon of the requested sit.                   | [Icon Horse API](https://icon.horse/)                                            |
| `/guessage`               | Guess the age of a specific or random name.               | [Agify API](https://agify.io/), [Random Data API](https://random-data-api.com/)  |
| `/npm`                    | Query the NPM registry for npm package details.           | [NPM Registry](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md) |
| `/stockimage`             | Get a random 1920x1080p stock image.                      | [Lorem Picsum](https://picsum.photos/)                                           |
| `/tecchy`                 | Shows a random tech-savvy phrase.                         | [TechyAPI](https://techy-api.vercel.app/api/json)                                |
| `/affirmation`            | Shows a random affirmation quote.                         | [Affirmation Dev API](https://www.affirmations.dev/)                             |
| `/series`                 | Get any tv/web series information                         | [CatchTheShow](https://catchtheshow.herokuapp.com/api/documentation)             |
| `/meme`                   | Send Random Memes.                                        | [Reddit Random Memes Api](https://reddit-meme-api.herokuapp.com)                 |
| `/list-data-breaches`     | Lists data breaches using the haveibeenpwned.com API      | [haveibeenpwned.com](https://haveibeenpwned.com/api)                             |
| `/onthisday`              | Shows a random history event happended on this date.      | [ZenQuotes](https://today.zenquotes.io/api/)                                     |
| `/fruit`                  | Get interesting information about fruit                   | [Fruityvice](https://www.fruityvice.com/)                                        |

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
npm run dev
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
