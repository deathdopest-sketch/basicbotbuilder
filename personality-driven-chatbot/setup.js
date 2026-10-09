// setup.js - One-command setup for personality-driven chatbot framework
const fs = require('fs').promises;
const chalk = require('chalk');

class FrameworkSetup {
  constructor() {
    this.requiredDirs = [
      'bot_data/memory',
      'bot_data/logs', 
      'bot_data/backups'
    ];
  }

  async setup() {
    console.clear();
    console.log(chalk.cyan('🤖 ================================================================ 🤖'));
    console.log(chalk.cyan('                PERSONALITY-DRIVEN CHATBOT FRAMEWORK SETUP'));
    console.log(chalk.cyan('                   Making Advanced AI Accessible to Everyone'));
    console.log(chalk.cyan('🤖 ================================================================ 🤖\n'));
    
    try {
      console.log(chalk.blue('📁 Creating data directories...'));
      await this.createDirectories();
      
      console.log(chalk.green('\n✅ SETUP COMPLETE!\n'));
      console.log(chalk.cyan('🎯 NEXT STEPS:'));
      console.log(chalk.white('  1. Run: npm run create (Create your bot personality)'));
      console.log(chalk.white('  2. Edit the generated .env file with your bot credentials'));
      console.log(chalk.white('  3. Run: npm start (Launch your bot!)\n'));
      
    } catch (error) {
      console.error(chalk.red('❌ Setup failed:'), error.message);
      process.exit(1);
    }
  }

  async createDirectories() {
    for (const dir of this.requiredDirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
        console.log(chalk.green(`  ✓ ${dir}/`));
      } catch (error) {
        console.log(chalk.yellow(`  ⚠ ${dir}/ (already exists)`));
      }
    }
  }
}

if (require.main === module) {
  const setup = new FrameworkSetup();
  setup.setup().catch(console.error);
}

module.exports = FrameworkSetup;