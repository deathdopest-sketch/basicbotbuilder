// src/index.js - Main entry point for the personality-driven chatbot framework
const PersonalityEngine = require('./core/PersonalityEngine');
const InteractiveWizard = require('./configurator/InteractiveWizard');

class PersonalityBotFramework {
  constructor() {
    this.version = require('../package.json').version;
  }

  createBot(configPath = null) {
    return new PersonalityEngine(configPath);
  }

  async createPersonality() {
    const wizard = new InteractiveWizard();
    return await wizard.start();
  }

  getInfo() {
    return {
      name: 'Personality-Driven Chatbot Framework',
      version: this.version,
      description: 'Advanced chatbot framework with sophisticated personality system - no technical expertise required'
    };
  }
}

module.exports = PersonalityBotFramework;

if (require.main === module) {
  console.log('Personality-Driven Chatbot Framework');
  console.log('Use npm scripts or import this module:');
  console.log('  npm run create  - Create personality');
  console.log('  npm start       - Launch bot');
  console.log('  npm run validate - Validate config');
}