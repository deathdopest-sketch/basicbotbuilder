// src/start.js - Bot launcher
const PersonalityEngine = require('./core/PersonalityEngine');

console.log('🤖 Starting Personality-Driven Chatbot...');

const bot = new PersonalityEngine();
global.personalityBot = bot;

bot.launch().catch(error => {
  console.error('Failed to start bot:', error.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🤖 Shutting down...');
  if (bot.browser) {
    await bot.browser.close();
  }
  process.exit(0);
});