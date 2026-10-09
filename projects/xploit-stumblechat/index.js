// Basic Chat Bot Template
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Bot configuration
const config = {
    prefix: '!',
    token: process.env.BOT_TOKEN
};

// Ready event
client.once('ready', () => {
    console.log(`🤖 ${client.user.tag} is online!`);
    console.log(`📊 Connected to ${client.guilds.cache.size} servers`);
});

// Message event handler
client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;

    // Check for command prefix
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Basic commands
    switch (command) {
        case 'ping':
            message.reply('Pong! 🏓');
            break;
        case 'hello':
            message.reply(`Hello ${message.author.username}! 👋`);
            break;
        case 'help':
            message.reply('Available commands: !ping, !hello, !help');
            break;
        default:
            message.reply('Unknown command. Use !help for available commands.');
    }
});

// Error handling
client.on('error', (error) => {
    console.error('Bot error:', error);
});

client.login(config.token);
