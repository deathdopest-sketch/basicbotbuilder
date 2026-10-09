#!/usr/bin/env node

// setup.js - Comprehensive setup script for the bot builder
// Created by Daniel "Death" Newton
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

class SetupWizard {
    constructor() {
        this.projectRoot = process.cwd();
        this.requiredDirs = [
            'projects',
            'tutorials',
            'templates',
            'examples',
            'docs',
            'user_data',
            'backups'
        ];
        this.requiredFiles = [
            'user_progress.json',
            '.env.example'
        ];
    }

    async run() {
        console.clear();
        console.log(chalk.cyan('🚀 ======================================== 🚀'));
        console.log(chalk.cyan('       COMPREHENSIVE BOT BUILDER SETUP'));
        console.log(chalk.cyan('      Making Coding Education Fun & Easy'));
        console.log(chalk.cyan('🚀 ======================================== 🚀\n'));

        try {
            console.log(chalk.blue('📁 Creating directory structure...'));
            await this.createDirectories();

            console.log(chalk.blue('📝 Creating configuration files...'));
            await this.createConfigFiles();

            console.log(chalk.blue('📚 Setting up tutorials...'));
            await this.setupTutorials();

            console.log(chalk.blue('🔧 Installing dependencies...'));
            await this.installDependencies();

            console.log(chalk.blue('🎯 Creating examples...'));
            await this.createExamples();

            console.log(chalk.green('\n✅ SETUP COMPLETE!\n'));

            this.showWelcomeMessage();

        } catch (error) {
            console.error(chalk.red('❌ Setup failed:'), error.message);
            console.log(chalk.yellow('\n💡 Troubleshooting tips:'));
            console.log('1. Make sure you have Node.js installed (version 14+)');
            console.log('2. Check that you have write permissions in this directory');
            console.log('3. Try running: npm install');
            console.log('4. If issues persist, check the GitHub repository for help');
            process.exit(1);
        }
    }

    async createDirectories() {
        for (const dir of this.requiredDirs) {
            try {
                await fs.mkdir(path.join(this.projectRoot, dir), { recursive: true });
                console.log(chalk.green(`  ✓ Created ${dir}/`));
            } catch (error) {
                if (error.code !== 'EEXIST') {
                    throw error;
                }
                console.log(chalk.yellow(`  ⚠ ${dir}/ already exists`));
            }
        }
    }

    async createConfigFiles() {
        // Create user progress file
        const userProgress = {
            completedTutorials: [],
            currentLanguage: null,
            achievements: [],
            totalTimeSpent: 0,
            streakDays: 0,
            preferences: {
                educationalMode: true,
                autoSave: true,
                showHints: true
            }
        };

        await fs.writeFile(
            path.join(this.projectRoot, 'user_progress.json'),
            JSON.stringify(userProgress, null, 2)
        );
        console.log(chalk.green('  ✓ Created user_progress.json'));

        // Create .env.example
        const envExample = `# Bot Builder Configuration
# Copy this file to .env and fill in your values

# Bot Tokens (get these from the respective platforms)
DISCORD_BOT_TOKEN=your_discord_bot_token_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
SLACK_BOT_TOKEN=your_slack_bot_token_here

# API Keys for AI and other services
OPENAI_API_KEY=your_openai_api_key_here
STABILITY_API_KEY=your_stability_ai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# Database Configuration (optional)
DATABASE_URL=your_database_url_here
REDIS_URL=your_redis_url_here

# Development Settings
NODE_ENV=development
DEBUG=true
LOG_LEVEL=info

# User Preferences
EDUCATIONAL_MODE=true
AUTO_SAVE=true
SHOW_HINTS=true`;

        await fs.writeFile(
            path.join(this.projectRoot, '.env.example'),
            envExample
        );
        console.log(chalk.green('  ✓ Created .env.example'));

        // Create .gitignore
        const gitignore = `# Dependencies
node_modules/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Project files
projects/*/node_modules/
projects/*/build/
projects/*/.env
user_data/
backups/
*.log`;

        await fs.writeFile(
            path.join(this.projectRoot, '.gitignore'),
            gitignore
        );
        console.log(chalk.green('  ✓ Created .gitignore'));
    }

    async setupTutorials() {
        const tutorialDirs = [
            'tutorials/javascript',
            'tutorials/python',
            'tutorials/java',
            'tutorials/cpp',
            'tutorials/go',
            'tutorials/rust',
            'tutorials/advanced'
        ];

        for (const dir of tutorialDirs) {
            await fs.mkdir(path.join(this.projectRoot, dir), { recursive: true });
        }
        console.log(chalk.green('  ✓ Created tutorial directories'));

        // Create tutorial index
        const tutorialIndex = {
            languages: [
                {
                    name: 'JavaScript',
                    key: 'javascript',
                    difficulty: 'Beginner',
                    description: 'Perfect for web bots and interactive applications',
                    lessons: 8,
                    estimatedHours: 4
                },
                {
                    name: 'Python',
                    key: 'python',
                    difficulty: 'Beginner',
                    description: 'Ideal for AI bots and automation scripts',
                    lessons: 8,
                    estimatedHours: 4
                },
                {
                    name: 'Java',
                    key: 'java',
                    difficulty: 'Intermediate',
                    description: 'Great for enterprise bots and large-scale applications',
                    lessons: 10,
                    estimatedHours: 6
                },
                {
                    name: 'C++',
                    key: 'cpp',
                    difficulty: 'Advanced',
                    description: 'Best for high-performance bots and system programming',
                    lessons: 12,
                    estimatedHours: 8
                },
                {
                    name: 'Go',
                    key: 'go',
                    difficulty: 'Intermediate',
                    description: 'Excellent for network services and cloud applications',
                    lessons: 10,
                    estimatedHours: 6
                },
                {
                    name: 'Rust',
                    key: 'rust',
                    difficulty: 'Advanced',
                    description: 'Perfect for security-critical and performance-critical bots',
                    lessons: 12,
                    estimatedHours: 8
                }
            ],
            advancedTopics: [
                'Design Patterns',
                'Testing Strategies',
                'Performance Optimization',
                'Security Best Practices',
                'Deployment and Scaling',
                'Database Integration'
            ]
        };

        await fs.writeFile(
            path.join(this.projectRoot, 'tutorials', 'index.json'),
            JSON.stringify(tutorialIndex, null, 2)
        );
        console.log(chalk.green('  ✓ Created tutorial index'));
    }

    async installDependencies() {
        try {
            console.log(chalk.gray('  Installing npm dependencies...'));
            execSync('npm install', { stdio: 'inherit', cwd: this.projectRoot });
            console.log(chalk.green('  ✓ Dependencies installed successfully'));
        } catch (error) {
            console.log(chalk.yellow('  ⚠ npm install failed, you may need to run it manually'));
            console.log(chalk.gray('  Try: npm install'));
        }
    }

    async createExamples() {
        const examples = [
            {
                name: 'simple-discord-bot',
                language: 'javascript',
                description: 'A basic Discord bot with commands',
                difficulty: 'Beginner'
            },
            {
                name: 'ai-chatbot',
                language: 'python',
                description: 'AI-powered chatbot with natural language processing',
                difficulty: 'Intermediate'
            },
            {
                name: 'image-generator',
                language: 'javascript',
                description: 'Bot that generates images using AI',
                difficulty: 'Advanced'
            },
            {
                name: 'system-monitor',
                language: 'go',
                description: 'Bot that monitors system resources',
                difficulty: 'Intermediate'
            }
        ];

        // Create examples directory structure
        for (const example of examples) {
            const examplePath = path.join(this.projectRoot, 'examples', example.name);
            await fs.mkdir(examplePath, { recursive: true });

            // Create a basic README for each example
            const readme = `# ${example.name}

${example.description}

**Language:** ${example.language}
**Difficulty:** ${example.difficulty}

## Features

- Feature 1
- Feature 2
- Feature 3

## Setup

1. Install dependencies
2. Configure your API keys
3. Run the bot

## Usage

Describe how to use this example...

## Learning Objectives

- Objective 1
- Objective 2
- Objective 3
`;

            await fs.writeFile(
                path.join(examplePath, 'README.md'),
                readme
            );
        }

        console.log(chalk.green(`  ✓ Created ${examples.length} example projects`));
    }

    showWelcomeMessage() {
        console.log(chalk.cyan('🎉 Welcome to the Comprehensive Bot Builder!'));
        console.log(chalk.white('You\'re all set to start your coding journey.\n'));

        console.log(chalk.yellow('🚀 NEXT STEPS:'));
        console.log('1. Run the bot builder:');
        console.log(chalk.green('   npm start'));
        console.log('');

        console.log('2. Start with interactive tutorials:');
        console.log(chalk.green('   npm run tutorial'));
        console.log('');

        console.log('3. Create your first bot project:');
        console.log(chalk.green('   npm run create'));
        console.log('');

        console.log(chalk.yellow('📚 WHAT YOU CAN DO NOW:'));
        console.log('• 🌟 Learn 6 programming languages step-by-step');
        console.log('• 🤖 Create any type of bot imaginable');
        console.log('• 🎮 Earn achievements and track progress');
        console.log('• 📖 Get personalized learning recommendations');
        console.log('• 🚀 Deploy your bots to production');
        console.log('');

        console.log(chalk.yellow('💡 PRO TIPS:'));
        console.log('• Start with JavaScript or Python if you\'re new to coding');
        console.log('• Use the interactive tutorials to learn at your own pace');
        console.log('• Don\'t hesitate to experiment and break things - that\'s how you learn!');
        console.log('• Join our community for support and inspiration');
        console.log('');

        console.log(chalk.cyan('Happy coding! 🎉'));
    }
}

// Run setup if this file is executed directly
if (require.main === module) {
    const setup = new SetupWizard();
    setup.run().catch(console.error);
}

module.exports = SetupWizard;


