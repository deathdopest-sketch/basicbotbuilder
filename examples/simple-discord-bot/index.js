// examples/simple-discord-bot/index.js
// A basic Discord bot template created with Comprehensive Bot Builder
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
    token: process.env.DISCORD_BOT_TOKEN
};

// Command handlers
const commands = {
    ping: (message) => {
        const latency = Date.now() - message.createdTimestamp;
        message.reply(`🏓 Pong! Latency: ${latency}ms`);
    },

    hello: (message) => {
        const user = message.author;
        message.reply(`Hello ${user.username}! 👋 Welcome to our server!`);
    },

    help: (message) => {
        const helpText = `
🤖 **Bot Commands:**
\`!ping\` - Check bot latency
\`!hello\` - Get a friendly greeting
\`!help\` - Show this help message
\`!info\` - Bot information
\`!server\` - Server information
        `;
        message.reply(helpText);
    },

    info: (message) => {
        const infoText = `
🤖 **Bot Information:**
• Name: Simple Discord Bot
• Created with: Comprehensive Bot Builder
• Language: JavaScript
• Library: Discord.js
• Uptime: ${Math.floor(client.uptime / 1000 / 60)} minutes
        `;
        message.reply(infoText);
    },

    server: (message) => {
        const guild = message.guild;
        const serverInfo = `
🏠 **Server Information:**
• Name: ${guild.name}
• Members: ${guild.memberCount}
• Created: ${guild.createdAt.toDateString()}
• Region: ${guild.preferredLocale || 'Unknown'}
        `;
        message.reply(serverInfo);
    }
};

// Event handlers
client.once('ready', () => {
    console.log(`🤖 ${client.user.tag} is online and ready!`);
    console.log(`📊 Connected to ${client.guilds.cache.size} servers`);
    console.log(`👥 Serving ${client.users.cache.size} users`);

    // Set bot status
    client.user.setActivity('Learning JavaScript! 💻', { type: 'PLAYING' });
});

client.on('messageCreate', async (message) => {
    // Ignore bot messages and messages without prefix
    if (message.author.bot || !message.content.startsWith(config.prefix)) return;

    // Parse command
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Execute command
    if (commands[command]) {
        try {
            await commands[command](message);
            console.log(`✅ Executed command: ${command} by ${message.author.username}`);
        } catch (error) {
            console.error(`❌ Error executing command ${command}:`, error.message);
            message.reply('❌ Sorry, there was an error executing that command.');
        }
    } else {
        message.reply(`❓ Unknown command: \`${command}\`. Use \`!help\` for available commands.`);
    }
});

// Error handling
client.on('error', (error) => {
    console.error('Bot error:', error);
});

client.on('warn', (warning) => {
    console.warn('Bot warning:', warning);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down bot...');
    client.destroy();
    process.exit(0);
});

// Login
if (!config.token) {
    console.error('❌ DISCORD_BOT_TOKEN not found in .env file!');
    console.log('💡 Get your bot token from https://discord.com/developers/applications');
    process.exit(1);
}

client.login(config.token).catch((error) => {
    console.error('❌ Failed to login:', error.message);
    console.log('💡 Make sure your bot token is correct in the .env file');
    process.exit(1);
});



