# Basic Bot Builder

**by Death (Daniel Newton)**

A tool that generates bot code for you — no experience needed. Pick what kind of bot you want, answer a few questions, and it spits out working code with explanations so you can learn as you go.

---

## What even is this?

A "bot" is just a program that does something automatically — responds to messages, watches for events, farms in a game, whatever. Writing one from scratch is hard if you've never coded before. This tool handles the hard part and walks you through the rest.

You run it, it asks you some questions (what kind of bot? what language?), and it generates a working starting point along with tutorials explaining what the code does and why.

---

## Before you start — things you need to install

You only have to do this once.

### 1. Install Node.js

Node.js is what runs this tool. Go to **https://nodejs.org** and download the version that says **LTS** (that means "stable"). Run the installer, click through the defaults.

To check it worked, open a terminal and type:
```
node --version
```
You should see something like `v20.11.0`. If you see that, you're good.

> **How to open a terminal on Windows:** Press `Windows key + R`, type `cmd`, press Enter.
> **On Mac:** Press `Cmd + Space`, type `Terminal`, press Enter.

### 2. Download this project

At the top of this GitHub page, click the green **Code** button, then click **Download ZIP**. Unzip it somewhere easy to find, like your Desktop.

Or if you have Git installed:
```
git clone https://github.com/deathdopest-sketch/basicbotbuilder.git
```

---

## How to run it

### Easiest way (Windows only)

Double-click the file called **`START_BOTMAKER.bat`** in the folder. It checks everything for you and launches the tool automatically.

### Manual way (works on Windows, Mac, Linux)

1. Open your terminal
2. Navigate to the folder you downloaded. For example:
   ```
   cd C:\Users\YourName\Desktop\basicbotbuilder
   ```
   (Replace the path with wherever you actually put it)
3. Install the dependencies (only needed the first time):
   ```
   npm install
   ```
4. Start the tool:
   ```
   npm start
   ```

That's it. The tool will guide you from there with menus you click through.

---

## What it can make

**Chat bots** — bots that respond to messages on Discord, Telegram, Slack, etc.

**AI bots** — bots that use ChatGPT or other AI to have real conversations

**Game bots** — automation scripts for games (farming, crafting, etc.)

**Crypto bots** — DCA bots that buy on a schedule, price alert bots

**Image generation bots** — bots that generate art using AI APIs

**Security/network tools** — port scanners, monitoring scripts (for your own systems)

**PC automation** — scripts that organize files, do backups, clean up your computer

---

## What languages can it generate code in?

The tool supports 6 languages. If you have no idea which to pick, **choose JavaScript** — it's the easiest to get running.

| Language | Why you'd pick it |
|---|---|
| **JavaScript** | Easiest to start, runs without extra setup, best for Discord/web bots |
| **Python** | Best for AI and machine learning bots |
| **Java** | Good for large, serious projects |
| **C++** | Maximum speed, for performance-critical stuff |
| **Go** | Fast and simple, good for network/server bots |
| **Rust** | Very fast and safe, steeper learning curve |

---

## The bot needs a token — what's that?

Most bots connect to a platform (like Discord) and need a "token" — basically a password that proves your bot is allowed to connect. The tool generates the code, but **you have to get your own token** from whatever platform you're using.

The project includes a file called `.env.example`. When you're ready to connect your bot to a real platform:

1. Make a copy of `.env.example` and rename it to `.env`
2. Fill in your token where it says `your_discord_bot_token_here` (or whichever platform you're using)

**Never share your `.env` file or your token with anyone.** The `.gitignore` file in this project already makes sure your `.env` won't accidentally get uploaded to GitHub.

Where to get tokens:
- **Discord:** https://discord.com/developers/applications — create an app, go to the Bot tab
- **Telegram:** Message `@BotFather` on Telegram
- **OpenAI (for AI bots):** https://platform.openai.com/api-keys

---

## Project structure (what all these files are)

```
basicbotbuilder/
├── START_BOTMAKER.bat     ← Double-click this on Windows to run
├── bot_builder.js         ← The main tool (this is what runs)
├── SimpleBotMaker.js      ← Bot template generator
├── package.json           ← Tells Node.js what packages are needed
├── .env.example           ← Template for your tokens/API keys
├── templates/             ← Bot code templates
├── tutorials/             ← Learning content
├── examples/              ← Example bots you can look at
├── languages/             ← Language-specific guides
└── projects/              ← Your generated bots get saved here
```

---

## Something went wrong

**"node is not recognized"** — Node.js isn't installed or didn't install correctly. Go back to step 1 above.

**"npm install" fails** — Usually a network issue. Try again. If it keeps failing, make sure you're not behind a firewall that blocks downloads.

**"Cannot find module"** — You probably skipped `npm install`. Run it first.

**The bot connects but doesn't do anything** — Your token might be wrong, or the bot might not have permissions on your server/channel. Double-check the token and make sure the bot was invited with the right permissions.

---

## License

MIT — free to use, modify, and share for anything.
