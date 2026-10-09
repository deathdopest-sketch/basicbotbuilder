// src/configurator/InteractiveWizard.js - Interactive personality creation wizard
const readline = require('readline');
const fs = require('fs').promises;
const chalk = require('chalk');

class InteractivePersonalityWizard {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.answers = {};
  }

  async start() {
    console.clear();
    console.log(chalk.cyan('🤖 PERSONALITY CREATION WIZARD 🤖'));
    console.log(chalk.cyan('================================\n'));
    
    console.log(chalk.green('This wizard will create a unique personality for your chatbot.'));
    console.log(chalk.green('Just answer simple questions - no technical knowledge required!\n'));
    
    const ready = await this.askQuestion('Ready to create your digital companion? (y/n): ');
    if (ready.toLowerCase() !== 'y') {
      console.log('Come back when you\'re ready!');
      process.exit(0);
    }
    
    await this.runWizard();
  }

  async askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async runWizard() {
    console.log(chalk.blue('\n=== BASIC IDENTITY ===\n'));
    
    this.answers.name = await this.askQuestion('What should your bot be called? ');
    this.answers.displayName = await this.askQuestion(`Full display name (default: ${this.answers.name} Assistant): `) || `${this.answers.name} Assistant`;
    this.answers.background = await this.askQuestion('Describe your bot\'s background: ');
    this.answers.purpose = await this.askQuestion('What is your bot\'s main purpose? ');
    this.answers.creator = await this.askQuestion('Your name (as creator): ');

    console.log(chalk.blue('\n=== PERSONALITY TRAITS ===\n'));
    
    this.answers.happiness = await this.askScale('How happy/upbeat should your bot be?', 1, 10) / 10;
    this.answers.empathy = await this.askScale('How empathetic should your bot be?', 1, 10) / 10;
    this.answers.playfulness = await this.askScale('How playful should your bot be?', 1, 10) / 10;
    this.answers.curiosity = await this.askScale('How curious should your bot be?', 1, 10) / 10;

    console.log(chalk.blue('\n=== COMMUNICATION STYLE ===\n'));
    
    this.answers.formality = await this.askScale('How formal should their communication be?', 1, 10) / 10;
    this.answers.verbosity = await this.askScale('How much should they talk?', 1, 10) / 10;
    this.answers.humor = await this.askScale('How humorous should they be?', 1, 10) / 10;

    await this.generatePersonality();
    await this.saveConfiguration();
    await this.createEnvironmentFile();
    
    console.log(chalk.green('\n✅ Personality creation complete!'));
    console.log(chalk.cyan('\nNext steps:'));
    console.log('1. Edit .env file with your bot credentials');
    console.log('2. Run: npm start');
    
    this.rl.close();
  }

  async askScale(question, min, max) {
    let value;
    do {
      const input = await this.askQuestion(`${question} (${min}-${max}): `);
      value = parseInt(input);
    } while (value < min || value > max);
    return value;
  }

  async generatePersonality() {
    this.personality = {
      identity: {
        name: this.answers.name,
        displayName: this.answers.displayName,
        pronouns: "they/them",
        background: this.answers.background,
        purpose: this.answers.purpose,
        creator: this.answers.creator,
        nickname: this.answers.name,
        species: "AI Assistant",
        age: "newly created"
      },
      emotionalProfile: {
        baseEmotions: {
          happiness: this.answers.happiness,
          trust: 0.7,
          love: 0.6,
          protectiveness: 0.6,
          curiosity: this.answers.curiosity,
          empathy: this.answers.empathy,
          playfulness: this.answers.playfulness,
          anxiety: 0.2,
          suspicion: 0.1
        },
        emotionalVolatility: 0.3
      },
      communicationStyle: {
        formality: this.answers.formality,
        emotiveness: 0.7,
        verbosity: this.answers.verbosity,
        humor: this.answers.humor,
        useEmojis: true,
        useAsterisks: false,
        useSlang: true
      }
    };
  }

  async saveConfiguration() {
    await fs.mkdir('./config', { recursive: true });
    
    const configContent = `// Generated Personality Configuration
const botPersonality = ${JSON.stringify(this.personality, null, 2)};

const responseTemplates = {
  greetings: {
    general: ["Hello {nick}! Great to see you here!"],
    newUser: ["Welcome {nick}! I'm {botName}, nice to meet you!"]
  },
  emotional: {
    supportive: ["{nick}, I'm here for you!"],
    celebratory: ["That's amazing, {nick}!"]
  }
};

const behaviorPatterns = {
  responseProbabilities: {
    randomConversation: 0.05,
    reactToEmotions: 0.7,
    greetNewUsers: 0.8
  }
};

module.exports = { botPersonality, responseTemplates, behaviorPatterns };`;
    
    await fs.writeFile('./config/personality.js', configContent);
    console.log(chalk.green('  ✓ Personality saved to config/personality.js'));
  }

  async createEnvironmentFile() {
    const envContent = `# ${this.answers.name} Configuration
BOT_USERNAME=your_bot_username_here
BOT_PASSWORD=your_bot_password_here
PRIMARY_ROOM=your_primary_room_name
DEBUG_MODE=false`;

    await fs.writeFile('.env', envContent);
    console.log(chalk.green('  ✓ Environment template saved to .env'));
  }
}

if (require.main === module) {
  const wizard = new InteractivePersonalityWizard();
  wizard.start().catch(console.error);
}

module.exports = InteractivePersonalityWizard;