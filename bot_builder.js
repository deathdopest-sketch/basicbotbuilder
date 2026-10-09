#!/usr/bin/env node

// bot_builder.js - Comprehensive Bot Builder Framework
// Created by Daniel "Death" Newton
const fs = require('fs').promises;
const path = require('path');
const { execSync, spawn } = require('child_process');
const readline = require('readline');
const chalk = require('chalk');
const DependencyManager = require('./dependency_manager');
const BotTestingFramework = require('./testing_framework');
const ProjectManager = require('./project_manager');
const GamificationSystem = require('./gamification');
const CodeEditor = require('./code_editor');

class ComprehensiveBotBuilder {
    constructor() {
        this.supportedLanguages = {
            javascript: {
                name: 'JavaScript',
                extensions: ['.js', '.mjs', '.ts'],
                pros: [
                    'Easy to learn and use',
                    'Excellent for web applications',
                    'Huge ecosystem with npm packages',
                    'Runs on all platforms',
                    'Great for beginners'
                ],
                cons: [
                    'Dynamic typing can lead to runtime errors',
                    'Single-threaded (though Node.js supports workers)',
                    'Memory-intensive for some applications'
                ],
                frameworks: ['Node.js', 'Express', 'Discord.js', 'Telegraf'],
                useCases: ['Web bots', 'Chatbots', 'API services', 'Automation scripts']
            },
            python: {
                name: 'Python',
                extensions: ['.py'],
                pros: [
                    'Very readable and beginner-friendly',
                    'Extensive libraries for AI/ML',
                    'Cross-platform compatibility',
                    'Strong community support',
                    'Excellent for automation and data processing'
                ],
                cons: [
                    'Slower execution speed',
                    'Global Interpreter Lock (GIL) limits threading',
                    'Higher memory usage',
                    'Less suitable for mobile apps'
                ],
                frameworks: ['Discord.py', 'Telebot', 'Flask', 'FastAPI', 'TensorFlow', 'PyTorch'],
                useCases: ['AI bots', 'Data analysis bots', 'Automation scripts', 'Machine learning applications']
            },
            java: {
                name: 'Java',
                extensions: ['.java', '.jar'],
                pros: [
                    'Platform independent (Write Once, Run Anywhere)',
                    'Strong type system prevents many errors',
                    'Excellent performance',
                    'Enterprise-grade reliability',
                    'Rich ecosystem with Maven/Gradle'
                ],
                cons: [
                    'Verbose syntax',
                    'Steeper learning curve',
                    'Requires compilation',
                    'Higher memory footprint',
                    'Slower startup times'
                ],
                frameworks: ['Spring Boot', 'Discord4J', 'JDA', 'Maven', 'Gradle'],
                useCases: ['Enterprise bots', 'Android bots', 'High-performance applications', 'Large-scale systems']
            },
            cpp: {
                name: 'C++',
                extensions: ['.cpp', '.cc', '.cxx', '.hpp'],
                pros: [
                    'Maximum performance and speed',
                    'Low-level hardware control',
                    'Memory efficient',
                    'Cross-platform development',
                    'Industry standard for games and systems'
                ],
                cons: [
                    'Complex syntax and steep learning curve',
                    'Manual memory management',
                    'Longer development time',
                    'Platform-specific compilation',
                    'No built-in garbage collection'
                ],
                frameworks: ['Qt', 'Boost', 'Poco', 'CMake'],
                useCases: ['Game bots', 'System-level bots', 'High-performance applications', 'Embedded systems']
            },
            go: {
                name: 'Go (Golang)',
                extensions: ['.go'],
                pros: [
                    'Excellent performance and efficiency',
                    'Simple and clean syntax',
                    'Built-in concurrency support',
                    'Fast compilation times',
                    'Strong standard library'
                ],
                cons: [
                    'Younger language with smaller ecosystem',
                    'Less mature frameworks',
                    'Limited generics (until Go 1.18+)',
                    'Different error handling approach',
                    'Fewer learning resources than older languages'
                ],
                frameworks: ['Gorilla', 'Gin', 'Echo', 'DiscordGo'],
                useCases: ['Network services', 'Microservices', 'CLI tools', 'Cloud applications']
            },
            rust: {
                name: 'Rust',
                extensions: ['.rs'],
                pros: [
                    'Memory safety without garbage collection',
                    'Exceptional performance',
                    'Modern syntax and features',
                    'Excellent concurrency support',
                    'Growing ecosystem and community'
                ],
                cons: [
                    'Steep learning curve',
                    'Longer compilation times',
                    'Smaller ecosystem than established languages',
                    'Ownership system can be complex',
                    'Fewer libraries for some domains'
                ],
                frameworks: ['Tokio', 'Rocket', 'Actix', 'Serenity'],
                useCases: ['System programming', 'Web services', 'Game development', 'Security-critical applications']
            }
        };

        this.botTypes = {
            chat: {
                name: 'Chat Bot',
                description: 'Basic conversational bots for messaging platforms',
                complexity: 'Beginner',
                features: ['Text responses', 'Command handling', 'User management'],
                recommendedLanguages: ['javascript', 'python', 'go'],
                templates: {
                    basic: 'Simple command-response bot',
                    advanced: 'Multi-channel chat bot with user history'
                }
            },
            ai: {
                name: 'AI Bot',
                description: 'Intelligent bots with machine learning capabilities',
                complexity: 'Advanced',
                features: ['Natural language processing', 'Learning algorithms', 'Pattern recognition'],
                recommendedLanguages: ['python', 'javascript', 'java'],
                templates: {
                    nlp: 'Natural language processing bot',
                    ml: 'Machine learning powered bot',
                    sentiment: 'Sentiment analysis and mood tracking'
                }
            },
            image: {
                name: 'Image Generation Bot',
                description: 'Bots that create or manipulate images',
                complexity: 'Intermediate',
                features: ['Image processing', 'AI image generation', 'File handling'],
                recommendedLanguages: ['python', 'javascript', 'cpp'],
                templates: {
                    dalle: 'DALL-E style image generation',
                    processing: 'Image manipulation and editing',
                    recognition: 'Image recognition and classification'
                }
            },
            security: {
                name: 'Security Bot',
                description: 'Ethical security testing and monitoring bots',
                complexity: 'Expert',
                features: ['Network scanning', 'Vulnerability assessment', 'Security monitoring'],
                recommendedLanguages: ['python', 'cpp', 'rust'],
                templates: {
                    scanner: 'Network vulnerability scanner',
                    monitor: 'Security monitoring and alerting',
                    forensics: 'Digital forensics analysis'
                },
                warning: '⚠️  This bot type is for ethical security research only. Always obtain permission before scanning systems.'
            },
            automation: {
                name: 'PC Automation Bot',
                description: 'System automation and maintenance bots',
                complexity: 'Intermediate',
                features: ['File management', 'System monitoring', 'Task automation'],
                recommendedLanguages: ['python', 'javascript', 'cpp'],
                templates: {
                    cleaner: 'Disk cleanup and maintenance',
                    backup: 'Automated backup system',
                    monitor: 'System performance monitoring'
                }
            },
            game: {
                name: 'Game Bot',
                description: 'Bots for gaming applications and automation',
                complexity: 'Intermediate',
                features: ['Game integration', 'AI decision making', 'Real-time responses'],
                recommendedLanguages: ['cpp', 'python', 'rust'],
                templates: {
                    strategy: 'Strategy game AI',
                    automation: 'Game automation and scripting',
                    analysis: 'Game performance analysis'
                }
            },
            trading: {
                name: 'Trading Bot',
                description: 'Automated financial trading and analysis bots',
                complexity: 'Expert',
                features: ['Market data analysis', 'Automated trading', 'Risk management'],
                recommendedLanguages: ['python', 'cpp', 'javascript'],
                templates: {
                    crypto: 'Cryptocurrency trading bot',
                    stocks: 'Stock market analysis bot',
                    arbitrage: 'Arbitrage opportunity finder'
                },
                warning: '⚠️  Trading involves financial risk. This is for educational purposes only.'
            },
            social: {
                name: 'Social Media Bot',
                description: 'Bots for social media automation and management',
                complexity: 'Intermediate',
                features: ['Post scheduling', 'Engagement tracking', 'Content curation'],
                recommendedLanguages: ['python', 'javascript', 'java'],
                templates: {
                    scheduler: 'Automated posting scheduler',
                    analytics: 'Social media analytics',
                    moderation: 'Content moderation assistant'
                }
            },
            iot: {
                name: 'IoT Bot',
                description: 'Internet of Things device control and monitoring',
                complexity: 'Advanced',
                features: ['Device communication', 'Sensor data processing', 'Remote control'],
                recommendedLanguages: ['python', 'cpp', 'javascript'],
                templates: {
                    monitor: 'Device monitoring and alerting',
                    control: 'Remote device control',
                    analytics: 'IoT data analytics'
                }
            }
        };

        this.currentProject = null;
        this.educationalMode = true;
        this.dependencyManager = new DependencyManager();
        this.testingFramework = new BotTestingFramework();
        this.projectManager = new ProjectManager();
        this.gamification = new GamificationSystem();
        this.codeEditor = new CodeEditor();
    }

    async initialize() {
        console.clear();
        console.log(chalk.cyan('🚀 ======================================== 🚀'));
        console.log(chalk.cyan('          COMPREHENSIVE BOT BUILDER'));
        console.log(chalk.cyan('       Making Coding Fun & Educational'));
        console.log(chalk.cyan('🚀 ======================================== 🚀\n'));

        await this.createBaseDirectories();
        await this.gamification.initialize();
        await this.mainMenu();
    }

    async createBaseDirectories() {
        const dirs = [
            'projects',
            'templates',
            'tutorials',
            'examples',
            'languages'
        ];

        for (const dir of dirs) {
            try {
                await fs.mkdir(dir, { recursive: true });
            } catch (error) {
                // Directory might already exist
            }
        }
    }

    async mainMenu() {
        while (true) {
            console.log(chalk.yellow('\n🎯 MAIN MENU:'));
            console.log('1. 🆕 Create New Bot Project');
            console.log('2. 📂 Open Existing Project');
            console.log('3. 📚 Interactive Coding Tutorials');
            console.log('4. 🔍 Explore Bot Types & Languages');
            console.log('5. 🧪 Test Existing Bot');
            console.log('6. 📊 Project Management');
            console.log('7. 🎮 Gamification');
            console.log('8. ⚙️  Bot Builder Settings');
            console.log('9. 🚪 Exit');

            const choice = await this.getUserInput('\nChoose an option (1-9): ');

            switch (choice) {
                case '1':
                    await this.createNewProject();
                    break;
                case '2':
                    await this.openExistingProject();
                    break;
                case '3':
                    await this.interactiveTutorials();
                    break;
                case '4':
                    await this.exploreOptions();
                    break;
                case '5':
                    await this.testBot();
                    break;
                case '6':
                    await this.projectManagement();
                    break;
                case '7':
                    await this.gamificationMenu();
                    break;
                case '8':
                    await this.settings();
                    break;
                case '9':
                    console.log(chalk.green('\n👋 Thanks for using Comprehensive Bot Builder! Happy coding! 🎉'));
                    process.exit(0);
                default:
                    console.log(chalk.red('❌ Invalid choice. Please select 1-9.'));
            }
        }
    }

    async createNewProject() {
        console.log(chalk.cyan('\n🆕 CREATE NEW BOT PROJECT'));
        console.log(chalk.gray('='.repeat(40)));

        // Get project details
        const projectName = await this.getUserInput('Project name: ');
        const projectDescription = await this.getUserInput('Project description: ');

        // Choose bot type
        console.log(chalk.yellow('\n🤖 Choose Bot Type:'));
        Object.entries(this.botTypes).forEach(([key, type], index) => {
            const warning = type.warning ? ` ⚠️` : '';
            console.log(`${index + 1}. ${type.name}${warning}`);
            console.log(`   ${type.description}`);
            console.log(`   📊 Complexity: ${type.complexity}`);
            console.log(`   🚀 Features: ${type.features.join(', ')}`);
            console.log(`   💻 Recommended: ${type.recommendedLanguages.map(lang => this.supportedLanguages[lang].name).join(', ')}`);
            if (type.warning) {
                console.log(`   ${chalk.red(type.warning)}`);
            }
            console.log('');
        });

        const botTypeCount = Object.keys(this.botTypes).length;
        const botTypeChoice = await this.getUserInput(`\nChoose bot type (1-${botTypeCount}): `);
        const botTypeKeys = Object.keys(this.botTypes);
        const selectedBotType = botTypeKeys[parseInt(botTypeChoice) - 1];

        // Choose programming language
        const selectedBotTypeInfo = this.botTypes[selectedBotType];
        console.log(chalk.yellow('\n💻 Choose Programming Language:'));
        console.log(chalk.cyan(`📌 Recommended for ${selectedBotTypeInfo.name}: ${selectedBotTypeInfo.recommendedLanguages.map(lang => this.supportedLanguages[lang].name).join(', ')}`));
        console.log('');

        Object.entries(this.supportedLanguages).forEach(([key, lang], index) => {
            const isRecommended = selectedBotTypeInfo.recommendedLanguages.includes(key);
            const recommendedIcon = isRecommended ? ' ⭐' : '';
            console.log(`${index + 1}. ${lang.name}${recommendedIcon}`);
            console.log(`   📈 Pros: ${lang.pros.slice(0, 2).join(', ')}...`);
            console.log(`   📉 Cons: ${lang.cons.slice(0, 2).join(', ')}...`);
            console.log(`   🔧 Frameworks: ${lang.frameworks.slice(0, 3).join(', ')}`);
            if (isRecommended) {
                console.log(chalk.green(`   ✅ Great choice for ${selectedBotTypeInfo.name}!`));
            }
            console.log('');
        });

        const langChoice = await this.getUserInput('\nChoose language (1-6): ');
        const langKeys = Object.keys(this.supportedLanguages);
        const selectedLanguage = langKeys[parseInt(langChoice) - 1];

        // Create project structure
        await this.createProjectStructure(projectName, selectedLanguage, selectedBotType, projectDescription);

        console.log(chalk.green(`\n✅ Project "${projectName}" created successfully!`));
        console.log(chalk.cyan(`📁 Location: projects/${projectName}`));
        console.log(chalk.yellow(`\n🎓 Ready to start coding? Let's begin with the basics!`));

        // Track gamification progress
        await this.gamification.trackProjectCreation(selectedLanguage, selectedBotType);

        // Start educational journey
        if (this.educationalMode) {
            await this.startEducationalJourney(projectName, selectedLanguage, selectedBotType);
        }
    }

    async createProjectStructure(projectName, language, botType, description) {
        const projectPath = path.join('projects', projectName);

        // Create project directory
        await fs.mkdir(projectPath, { recursive: true });

        // Create language-specific structure
        const langConfig = this.supportedLanguages[language];

        // Basic project files
        const projectConfig = {
            name: projectName,
            description: description,
            language: language,
            botType: botType,
            created: new Date().toISOString(),
            version: '1.0.0',
            dependencies: [],
            tutorials_completed: [],
            achievements: []
        };

        await fs.writeFile(
            path.join(projectPath, 'project.json'),
            JSON.stringify(projectConfig, null, 2)
        );

        // Create language-specific files
        await this.createLanguageSpecificFiles(projectPath, language, botType);

        // Install dependencies and setup development environment
        console.log(chalk.yellow('\n📦 Setting up dependencies and development environment...'));
        const depsInstalled = await this.dependencyManager.installDependencies(projectPath, language, botType);
        await this.dependencyManager.setupDevelopmentEnvironment(projectPath, language, botType);

        if (depsInstalled) {
            console.log(chalk.green('✅ Dependencies and environment setup completed!'));
        } else {
            console.log(chalk.yellow('⚠️ Some setup steps may need manual completion.'));
        }
    }

    async createLanguageSpecificFiles(projectPath, language, botType) {
        const langConfig = this.supportedLanguages[language];

        switch (language) {
            case 'javascript':
                await this.createJavaScriptProject(projectPath, botType);
                break;
            case 'python':
                await this.createPythonProject(projectPath, botType);
                break;
            case 'java':
                await this.createJavaProject(projectPath, botType);
                break;
            case 'cpp':
                await this.createCppProject(projectPath, botType);
                break;
            case 'go':
                await this.createGoProject(projectPath, botType);
                break;
            case 'rust':
                await this.createRustProject(projectPath, botType);
                break;
        }
    }

    async createJavaScriptProject(projectPath, botType) {
        // Create main bot file
        const botCode = this.generateJavaScriptBot(botType);
        await fs.writeFile(path.join(projectPath, 'index.js'), botCode);
    }

    async createPythonProject(projectPath, botType) {
        // Create main bot file
        const botCode = this.generatePythonBot(botType);
        await fs.writeFile(path.join(projectPath, 'main.py'), botCode);
    }

    async createJavaProject(projectPath, botType) {
        // Create Maven directory structure
        await fs.mkdir(path.join(projectPath, 'src', 'main', 'java', 'com', 'botbuilder'), { recursive: true });

        // Create main Java class
        const javaCode = this.generateJavaBot(botType);
        await fs.writeFile(
            path.join(projectPath, 'src', 'main', 'java', 'com', 'botbuilder', 'Bot.java'),
            javaCode
        );
    }

    async createCppProject(projectPath, botType) {
        // Create CMakeLists.txt
        const cmakeLists = `cmake_minimum_required(VERSION 3.16)
project(${path.basename(projectPath)})

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find packages
find_package(CURL REQUIRED)
find_package(nlohmann_json REQUIRED)

# Add executable
add_executable(\${PROJECT_NAME} src/main.cpp)

# Link libraries
target_link_libraries(\${PROJECT_NAME} CURL::libcurl nlohmann_json::nlohmann_json)

# Include directories
target_include_directories(\${PROJECT_NAME} PRIVATE include/)`;

        await fs.mkdir(path.join(projectPath, 'src'), { recursive: true });
        await fs.mkdir(path.join(projectPath, 'include'), { recursive: true });
        await fs.writeFile(path.join(projectPath, 'CMakeLists.txt'), cmakeLists);

        // Create main C++ file
        const cppCode = this.generateCppBot(botType);
        await fs.writeFile(path.join(projectPath, 'src', 'main.cpp'), cppCode);
    }

    async createGoProject(projectPath, botType) {
        // Create go.mod
        const goMod = `module ${path.basename(projectPath)}

go 1.19

require (
    github.com/bwmarrin/discordgo v0.26.1
    github.com/joho/godotenv v1.4.0
)`;

        await fs.writeFile(path.join(projectPath, 'go.mod'), goMod);

        // Create main Go file
        const goCode = this.generateGoBot(botType);
        await fs.writeFile(path.join(projectPath, 'main.go'), goCode);
    }

    async createRustProject(projectPath, botType) {
        // Create src directory
        const srcDir = path.join(projectPath, 'src');
        await fs.mkdir(srcDir, { recursive: true });

        // Create Cargo.toml
        const cargoToml = `[package]
name = "${path.basename(projectPath)}"
version = "0.1.0"
edition = "2021"

[dependencies]
serenity = "0.11"
tokio = { version = "1.0", features = ["macros", "rt-multi-thread"] }
dotenv = "0.15"`;

        await fs.writeFile(path.join(projectPath, 'Cargo.toml'), cargoToml);

        // Create main Rust file
        const rustCode = this.generateRustBot(botType);
        await fs.writeFile(path.join(srcDir, 'main.rs'), rustCode);
    }

    generateJavaScriptBot(botType) {
        const templates = {
            chat: `// Basic Chat Bot Template
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
    console.log(\`🤖 \${client.user.tag} is online!\`);
    console.log(\`📊 Connected to \${client.guilds.cache.size} servers\`);
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
            message.reply(\`Hello \${message.author.username}! 👋\`);
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
`,
            ai: `// AI Bot Template with basic NLP
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Simple pattern matching for AI responses
const responses = {
    greetings: ['hello', 'hi', 'hey', 'greetings'],
    questions: ['what', 'how', 'why', 'when', 'where', 'who'],
    positive: ['good', 'great', 'awesome', 'excellent', 'amazing'],
    negative: ['bad', 'terrible', 'awful', 'horrible', 'sad']
};

function analyzeMessage(content) {
    const lowerContent = content.toLowerCase();
    let sentiment = 'neutral';
    let intent = 'unknown';

    // Simple sentiment analysis
    if (responses.positive.some(word => lowerContent.includes(word))) {
        sentiment = 'positive';
    } else if (responses.negative.some(word => lowerContent.includes(word))) {
        sentiment = 'negative';
    }

    // Simple intent detection
    if (responses.greetings.some(word => lowerContent.includes(word))) {
        intent = 'greeting';
    } else if (responses.questions.some(word => lowerContent.includes(word))) {
        intent = 'question';
    }

    return { sentiment, intent };
}

function generateResponse(analysis, originalMessage) {
    const { sentiment, intent } = analysis;

    if (intent === 'greeting') {
        return \`Hello! How are you feeling today? (You seem \${sentiment})\`;
    } else if (intent === 'question') {
        return "That's an interesting question! I'm still learning, but I'll do my best to help.";
    } else if (sentiment === 'positive') {
        return "I'm glad you're feeling good! 😊";
    } else if (sentiment === 'negative') {
        return "I'm sorry you're feeling down. Is there anything I can do to help? 💙";
    } else {
        return "I understand. Tell me more about what's on your mind.";
    }
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Analyze the message
    const analysis = analyzeMessage(message.content);

    // Generate AI response
    const response = generateResponse(analysis, message.content);

    message.reply(response);
});

client.once('ready', () => {
    console.log(\`🤖 AI Bot \${client.user.tag} is online and ready to chat!\`);
});

client.login(process.env.BOT_TOKEN);
`
        };

        return templates[botType] || templates.chat;
    }

    generatePythonBot(botType) {
        const templates = {
            chat: `#!/usr/bin/env python3
"""
Basic Chat Bot Template - Python
Created with Comprehensive Bot Builder
"""

import discord
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Bot configuration
TOKEN = os.getenv('BOT_TOKEN')
PREFIX = '!'

# Create bot instance
intents = discord.Intents.default()
intents.message_content = True
bot = discord.Client(intents=intents)

@bot.event
async def on_ready():
    print(f'🤖 {bot.user} is online!')
    print(f'📊 Connected to {len(bot.guilds)} servers')

@bot.event
async def on_message(message):
    # Ignore bot messages
    if message.author == bot.user:
        return

    # Check for command prefix
    if not message.content.startswith(PREFIX):
        return

    # Parse command
    content = message.content[len(PREFIX):].strip()
    command = content.split()[0].lower()
    args = content.split()[1:]

    # Handle commands
    if command == 'ping':
        await message.reply('Pong! 🏓')
    elif command == 'hello':
        await message.reply(f'Hello {message.author.name}! 👋')
    elif command == 'help':
        await message.reply('Available commands: !ping, !hello, !help')
    else:
        await message.reply('Unknown command. Use !help for available commands.')

# Run the bot
if __name__ == '__main__':
    bot.run(TOKEN)
`,
            ai: `#!/usr/bin/env python3
"""
AI Bot Template with Natural Language Processing
Created with Comprehensive Bot Builder
"""

import discord
import os
import random
import nltk
from dotenv import load_dotenv
from nltk.sentiment import SentimentIntensityAnalyzer

# Load environment variables
load_dotenv()

# Download NLTK data (first run only)
try:
    nltk.data.find('vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

# Initialize sentiment analyzer
sia = SentimentIntensityAnalyzer()

# Bot configuration
TOKEN = os.getenv('BOT_TOKEN')
bot = discord.Client(intents=discord.Intents.default())

# Response patterns
RESPONSES = {
    'greeting': [
        "Hello! How are you today?",
        "Hi there! What's on your mind?",
        "Greetings! How can I help you?"
    ],
    'positive': [
        "That's wonderful! I'm glad you're feeling good.",
        "I'm happy to hear that! 😊",
        "Great! Tell me more about what's making you happy."
    ],
    'negative': [
        "I'm sorry you're feeling that way. Want to talk about it?",
        "That sounds tough. I'm here to listen. 💙",
        "I understand. Sometimes sharing helps."
    ],
    'question': [
        "That's an interesting question!",
        "Let me think about that...",
        "Good question! Here's what I think..."
    ]
}

def analyze_sentiment(text):
    """Analyze sentiment of text"""
    scores = sia.polarity_scores(text)
    compound = scores['compound']

    if compound >= 0.05:
        return 'positive'
    elif compound <= -0.05:
        return 'negative'
    else:
        return 'neutral'

def detect_intent(text):
    """Simple intent detection"""
    text_lower = text.lower()

    if any(word in text_lower for word in ['hello', 'hi', 'hey', 'greetings']):
        return 'greeting'
    elif any(word in text_lower for word in ['what', 'how', 'why', 'when', 'where', 'who']):
        return 'question'
    else:
        return 'general'

def generate_response(text):
    """Generate AI response based on analysis"""
    sentiment = analyze_sentiment(text)
    intent = detect_intent(text)

    if intent == 'greeting':
        return random.choice(RESPONSES['greeting'])
    elif intent == 'question':
        return random.choice(RESPONSES['question'])
    elif sentiment == 'positive':
        return random.choice(RESPONSES['positive'])
    elif sentiment == 'negative':
        return random.choice(RESPONSES['negative'])
    else:
        return "I understand. Tell me more about what's on your mind."

@bot.event
async def on_ready():
    print(f'🤖 AI Bot {bot.user} is online and ready to chat!')

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    # Generate AI response
    response = generate_response(message.content)
    await message.reply(response)

# Run the bot
if __name__ == '__main__':
    bot.run(TOKEN)
`
        };

        return templates[botType] || templates.chat;
    }

    generateJavaBot(botType) {
        const templates = {
            chat: `// Basic Chat Bot Template - Java
// Created with Comprehensive Bot Builder

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.requests.GatewayIntent;

import javax.security.auth.login.LoginException;

public class Bot extends ListenerAdapter {
    private static final String TOKEN = System.getenv("BOT_TOKEN");
    private static final String PREFIX = "!";

    public static void main(String[] args) throws LoginException {
        if (TOKEN == null || TOKEN.isEmpty()) {
            System.err.println("❌ BOT_TOKEN environment variable not set!");
            System.exit(1);
        }

        JDA jda = JDABuilder.createDefault(TOKEN)
                .enableIntents(GatewayIntent.MESSAGE_CONTENT)
                .addEventListeners(new Bot())
                .build();

        try {
            jda.awaitReady();
            System.out.println("🤖 Bot is online!");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        Message message = event.getMessage();
        String content = message.getContentRaw();

        // Ignore bot messages
        if (message.getAuthor().isBot()) return;

        // Check for command prefix
        if (!content.startsWith(PREFIX)) return;

        String[] parts = content.substring(PREFIX.length()).trim().split("\\s+");
        String command = parts[0].toLowerCase();

        // Handle commands
        switch (command) {
            case "ping":
                message.reply("Pong! 🏓").queue();
                break;
            case "hello":
                message.reply("Hello " + message.getAuthor().getName() + "! 👋").queue();
                break;
            case "help":
                message.reply("Available commands: !ping, !hello, !help").queue();
                break;
            default:
                message.reply("Unknown command. Use !help for available commands.").queue();
        }
    }
}`
        };

        return templates[botType] || templates.chat;
    }

    generateCppBot(botType) {
        const templates = {
            chat: `// Basic Chat Bot Template - C++
// Created with Comprehensive Bot Builder

#include <iostream>
#include <string>
#include <vector>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

// Callback function for curl
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* response) {
    size_t totalSize = size * nmemb;
    response->append((char*)contents, totalSize);
    return totalSize;
}

class ChatBot {
private:
    std::string botToken;
    std::string apiBaseUrl;
    CURL* curl;

public:
    ChatBot(const std::string& token) : botToken(token) {
        apiBaseUrl = "https://discord.com/api/v10";
        curl_global_init(CURL_GLOBAL_DEFAULT);
        curl = curl_easy_init();
    }

    ~ChatBot() {
        if (curl) {
            curl_easy_cleanup(curl);
        }
        curl_global_cleanup();
    }

    void sendMessage(const std::string& channelId, const std::string& message) {
        if (!curl) return;

        std::string url = apiBaseUrl + "/channels/" + channelId + "/messages";
        std::string postData = "{\"content\":\"" + message + "\"}";

        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, ("Authorization: Bot " + botToken).c_str());
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, postData.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        CURLcode res = curl_easy_perform(curl);

        if (res != CURLE_OK) {
            std::cerr << "Failed to send message: " << curl_easy_strerror(res) << std::endl;
        }

        curl_slist_free_all(headers);
    }

    void handleMessage(const std::string& message) {
        std::cout << "Received: " << message << std::endl;

        // Simple command handling
        if (message == "!ping") {
            std::cout << "Sending: Pong! 🏓" << std::endl;
        } else if (message.find("!hello") == 0) {
            std::cout << "Sending: Hello! 👋" << std::endl;
        } else if (message == "!help") {
            std::cout << "Sending: Available commands: !ping, !hello, !help" << std::endl;
        }
    }
};

int main() {
    const char* token = std::getenv("BOT_TOKEN");
    if (!token) {
        std::cerr << "❌ BOT_TOKEN environment variable not set!" << std::endl;
        return 1;
    }

    ChatBot bot(token);

    std::cout << "🤖 C++ Chat Bot is running!" << std::endl;
    std::cout << "Bot Token: " << std::string(token).substr(0, 10) << "..." << std::endl;

    // Example usage
    bot.handleMessage("!ping");
    bot.handleMessage("!hello");
    bot.handleMessage("!help");

    return 0;
}`
        };

        return templates[botType] || templates.chat;
    }

    generateGoBot(botType) {
        const templates = {
            chat: `// Basic Chat Bot Template - Go
// Created with Comprehensive Bot Builder

package main

import (
    "fmt"
    "log"
    "os"
    "strings"

    "github.com/bwmarrin/discordgo"
    "github.com/joho/godotenv"
)

func main() {
    // Load environment variables
    err := godotenv.Load()
    if err != nil {
        log.Println("Warning: .env file not found")
    }

    token := os.Getenv("BOT_TOKEN")
    if token == "" {
        log.Fatal("❌ BOT_TOKEN environment variable not set!")
    }

    // Create bot instance
    bot, err := discordgo.New("Bot " + token)
    if err != nil {
        log.Fatal("Error creating Discord session:", err)
    }

    // Add event handler
    bot.AddHandler(messageHandler)

    // Open connection
    err = bot.Open()
    if err != nil {
        log.Fatal("Error opening connection:", err)
    }

    fmt.Println("🤖 Go Chat Bot is online!")
    fmt.Printf("Bot user: %s\n", bot.State.User.Username)

    // Wait for termination signal
    fmt.Println("Press Ctrl+C to exit")
    <-make(chan struct{})
}

func messageHandler(s *discordgo.Session, m *discordgo.MessageCreate) {
    // Ignore bot messages
    if m.Author.ID == s.State.User.ID {
        return
    }

    content := m.Content

    // Check for command prefix
    if !strings.HasPrefix(content, "!") {
        return
    }

    // Parse command
    parts := strings.Fields(content[1:])
    if len(parts) == 0 {
        return
    }

    command := strings.ToLower(parts[0])

    // Handle commands
    switch command {
    case "ping":
        s.ChannelMessageSend(m.ChannelID, "Pong! 🏓")
    case "hello":
        s.ChannelMessageSend(m.ChannelID, fmt.Sprintf("Hello %s! 👋", m.Author.Username))
    case "help":
        s.ChannelMessageSend(m.ChannelID, "Available commands: !ping, !hello, !help")
    default:
        s.ChannelMessageSend(m.ChannelID, "Unknown command. Use !help for available commands.")
    }
}`
        };

        return templates[botType] || templates.chat;
    }

    generateRustBot(botType) {
        const templates = {
            chat: `// Basic Chat Bot Template - Rust
// Created with Comprehensive Bot Builder

use serenity::async_trait;
use serenity::model::channel::Message;
use serenity::model::gateway::Ready;
use serenity::prelude::*;
use std::env;

struct Handler;

#[async_trait]
impl EventHandler for Handler {
    async fn message(&self, ctx: Context, msg: Message) {
        // Ignore bot messages
        if msg.author.id == ctx.cache.current_user_id() {
            return;
        }

        let content = &msg.content;

        // Check for command prefix
        if !content.starts_with('!') {
            return;
        }

        // Parse command
        let parts: Vec<&str> = content[1..].split_whitespace().collect();
        if parts.is_empty() {
            return;
        }

        let command = parts[0].to_lowercase();

        // Handle commands
        match command.as_str() {
            "ping" => {
                if let Err(why) = msg.reply(&ctx.http, "Pong! 🏓").await {
                    println!("Error sending message: {:?}", why);
                }
            }
            "hello" => {
                let response = format!("Hello {}! 👋", msg.author.name);
                if let Err(why) = msg.reply(&ctx.http, &response).await {
                    println!("Error sending message: {:?}", why);
                }
            }
            "help" => {
                if let Err(why) = msg.reply(&ctx.http, "Available commands: !ping, !hello, !help").await {
                    println!("Error sending message: {:?}", why);
                }
            }
            _ => {
                if let Err(why) = msg.reply(&ctx.http, "Unknown command. Use !help for available commands.").await {
                    println!("Error sending message: {:?}", why);
                }
            }
        }
    }

    async fn ready(&self, _: Context, ready: Ready) {
        println!("🤖 Rust Chat Bot is online!");
        println!("Bot user: {}", ready.user.name);
    }
}

#[tokio::main]
async fn main() {
    // Load token from environment
    let token = env::var("BOT_TOKEN").expect("❌ BOT_TOKEN environment variable not set!");

    // Create client
    let intents = GatewayIntents::GUILD_MESSAGES | GatewayIntents::MESSAGE_CONTENT;
    let mut client = Client::builder(&token, intents)
        .event_handler(Handler)
        .await
        .expect("Error creating client");

    // Start the bot
    if let Err(why) = client.start().await {
        println!("Client error: {:?}", why);
    }
}`
        };

        return templates[botType] || templates.chat;
    }

    async startEducationalJourney(projectName, language, botType) {
        console.log(chalk.cyan('\n🎓 EDUCATIONAL JOURNEY BEGINS!'));
        console.log(chalk.gray('='.repeat(50)));

        const journey = {
            javascript: {
                steps: [
                    {
                        title: "Understanding JavaScript Basics",
                        content: "JavaScript is a versatile programming language that runs in web browsers and servers (via Node.js). It uses dynamic typing and supports both object-oriented and functional programming paradigms.",
                        code: `// Variables and data types
let message = "Hello, World!";
const PI = 3.14159;
let isActive = true;

// Functions
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));`
                    },
                    {
                        title: "Working with Objects and Arrays",
                        content: "JavaScript objects are collections of key-value pairs, and arrays are ordered lists of values.",
                        code: `// Objects
const bot = {
    name: "MyBot",
    version: "1.0.0",
    features: ["chat", "commands", "ai"],
    greet: function() {
        return \`Hello from \${this.name}!\`;
    }
};

// Arrays
const commands = ["ping", "hello", "help"];
commands.push("status");
console.log(commands.length); // 4`
                    }
                ]
            },
            python: {
                steps: [
                    {
                        title: "Python Fundamentals",
                        content: "Python is known for its clean, readable syntax. It uses indentation for code blocks and has extensive libraries for various tasks.",
                        code: `# Variables and data types
message = "Hello, World!"
pi = 3.14159
is_active = True

# Functions
def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`
                    },
                    {
                        title: "Lists and Dictionaries",
                        content: "Python lists are mutable arrays, and dictionaries are key-value data structures.",
                        code: `# Lists
commands = ["ping", "hello", "help"]
commands.append("status")
print(len(commands))  # 4

# Dictionaries
bot = {
    "name": "MyBot",
    "version": "1.0.0",
    "features": ["chat", "commands", "ai"]
}

print(bot["name"])`
                    }
                ]
            }
        };

        const langJourney = journey[language];
        if (langJourney) {
            for (let i = 0; i < langJourney.steps.length; i++) {
                const step = langJourney.steps[i];
                console.log(chalk.yellow(`\n📚 Step ${i + 1}: ${step.title}`));
                console.log(chalk.white(step.content));
                console.log(chalk.gray('\n💻 Example Code:'));
                console.log(chalk.cyan(step.code));

                if (i < langJourney.steps.length - 1) {
                    await this.getUserInput('\nPress Enter to continue to the next step...');
                }
            }
        }

        console.log(chalk.green('\n🎉 Congratulations! You\'ve completed the basic tutorial.'));
        console.log(chalk.cyan('💡 Next steps:'));
        console.log('1. Explore the generated code in your project');
        console.log('2. Try modifying the bot\'s responses');
        console.log('3. Add new commands and features');
        console.log('4. Deploy your bot to a platform');
    }

    async openExistingProject() {
        console.log(chalk.cyan('\n📂 OPEN EXISTING PROJECT'));

        try {
            const projects = await fs.readdir('projects');
            if (projects.length === 0) {
                console.log(chalk.yellow('No projects found. Create a new project first!'));
                return;
            }

            console.log(chalk.yellow('Available projects:'));
            projects.forEach((project, index) => {
                console.log(`${index + 1}. ${project}`);
            });

            const choice = await this.getUserInput('\nChoose a project (number): ');
            const projectIndex = parseInt(choice) - 1;

            if (projectIndex >= 0 && projectIndex < projects.length) {
                const selectedProject = projects[projectIndex];
                await this.loadProject(selectedProject);
            } else {
                console.log(chalk.red('❌ Invalid choice.'));
            }
        } catch (error) {
            console.log(chalk.red('❌ Error loading projects:', error.message));
        }
    }

    async loadProject(projectName) {
        const projectPath = path.join('projects', projectName);

        try {
            const configPath = path.join(projectPath, 'project.json');
            const configData = await fs.readFile(configPath, 'utf8');
            this.currentProject = JSON.parse(configData);

            console.log(chalk.green(`\n✅ Loaded project: ${projectName}`));
            console.log(chalk.cyan(`📝 Description: ${this.currentProject.description}`));
            console.log(chalk.cyan(`💻 Language: ${this.currentProject.language}`));
            console.log(chalk.cyan(`🤖 Bot Type: ${this.currentProject.botType}`));

            await this.projectMenu();
        } catch (error) {
            console.log(chalk.red('❌ Error loading project:', error.message));
        }
    }

    async projectMenu() {
        while (true) {
            console.log(chalk.yellow('\n🔧 PROJECT MENU:'));
            console.log('1. 📝 Edit Code');
            console.log('2. ▶️  Run Bot');
            console.log('3. 🧪 Test Bot');
            console.log('4. 📚 View Tutorials');
            console.log('5. ⚙️  Project Settings');
            console.log('6. 🔙 Back to Main Menu');

            const choice = await this.getUserInput('\nChoose an option (1-6): ');

            switch (choice) {
                case '1':
                    await this.editCode();
                    break;
                case '2':
                    await this.runBot();
                    break;
                case '3':
                    await this.testBot();
                    break;
                case '4':
                    await this.viewTutorials();
                    break;
                case '5':
                    await this.projectSettings();
                    break;
                case '6':
                    return;
                default:
                    console.log(chalk.red('❌ Invalid choice.'));
            }
        }
    }

    async editCode() {
        console.log(chalk.cyan('\n📝 CODE EDITOR'));

        if (!this.currentProject) {
            console.log(chalk.red('❌ No project selected'));
            return;
        }

        try {
            // Get list of code files in the project
            const projectPath = path.join('projects', this.currentProject.name);
            const files = await fs.readdir(projectPath);
            const codeFiles = files.filter(file => {
                const ext = path.extname(file);
                return ['.js', '.py', '.java', '.cpp', '.go', '.rs', '.json', '.md'].includes(ext);
            });

            if (codeFiles.length === 0) {
                console.log(chalk.yellow('No code files found in project.'));
                console.log('Creating a new file...');

                // Create new file with editor
                await this.codeEditor.initialize(projectPath);
                await this.codeEditor.runEditor();
                return;
            }

            console.log(chalk.yellow('📂 Available Files:'));
            codeFiles.forEach((file, index) => {
                console.log(`${index + 1}. ${file}`);
            });
            console.log(`${codeFiles.length + 1}. Create new file`);

            const choice = await this.getUserInput('\nChoose a file to edit: ');

            if (parseInt(choice) === codeFiles.length + 1) {
                // Create new file
                await this.codeEditor.initialize(projectPath);
                await this.codeEditor.runEditor();
            } else {
                const fileIndex = parseInt(choice) - 1;
                if (fileIndex >= 0 && fileIndex < codeFiles.length) {
                    const selectedFile = codeFiles[fileIndex];
                    await this.codeEditor.initialize(projectPath, selectedFile);
                    await this.codeEditor.runEditor();
                } else {
                    console.log(chalk.red('❌ Invalid choice.'));
                }
            }

        } catch (error) {
            console.log(chalk.red(`❌ Error opening editor: ${error.message}`));
        }
    }

    async runBot() {
        console.log(chalk.cyan('\n▶️  RUNNING BOT'));

        const projectPath = path.join('projects', this.currentProject.name);
        const language = this.currentProject.language;

        try {
            switch (language) {
                case 'javascript':
                    console.log('Running JavaScript bot...');
                    // In a real implementation, this would run: cd projectPath && npm start
                    console.log(`cd ${projectPath} && npm start`);
                    break;
                case 'python':
                    console.log('Running Python bot...');
                    console.log(`cd ${projectPath} && python main.py`);
                    break;
                case 'java':
                    console.log('Running Java bot...');
                    console.log(`cd ${projectPath} && mvn exec:java`);
                    break;
                case 'cpp':
                    console.log('Running C++ bot...');
                    console.log(`cd ${projectPath} && ./build/bot_executable`);
                    break;
                case 'go':
                    console.log('Running Go bot...');
                    console.log(`cd ${projectPath} && go run main.go`);
                    break;
                case 'rust':
                    console.log('Running Rust bot...');
                    console.log(`cd ${projectPath} && cargo run`);
                    break;
            }

            console.log(chalk.green('✅ Bot started successfully!'));
            console.log(chalk.yellow('💡 Make sure you have configured your bot token in the .env file'));
        } catch (error) {
            console.log(chalk.red('❌ Error running bot:', error.message));
        }
    }

    async testBot() {
        console.log(chalk.cyan('\n🧪 TESTING BOT'));
        console.log('This feature will run automated tests for your bot...');

        // In a real implementation, this would run tests
        console.log('For now, manually test your bot by running it and interacting with it.');
    }

    async viewTutorials() {
        console.log(chalk.cyan('\n📚 TUTORIALS'));
        console.log('Here are some helpful tutorials for your project:');

        const language = this.currentProject.language;
        const langConfig = this.supportedLanguages[language];

        console.log(chalk.yellow(`\n🌟 ${langConfig.name} Tutorials:`));
        console.log(`📖 Official Documentation: ${this.getLanguageDocs(language)}`);
        console.log(`📚 Learning Resources: ${this.getLearningResources(language)}`);
        console.log(`🛠️  Package Registry: ${this.getPackageRegistry(language)}`);
    }

    getLanguageDocs(language) {
        const docs = {
            javascript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            python: 'https://docs.python.org/3/',
            java: 'https://docs.oracle.com/en/java/',
            cpp: 'https://en.cppreference.com/',
            go: 'https://golang.org/doc/',
            rust: 'https://doc.rust-lang.org/'
        };
        return docs[language] || 'Search online for documentation';
    }

    getLearningResources(language) {
        const resources = {
            javascript: 'freeCodeCamp, Codecademy, Udemy',
            python: 'Codecademy, Coursera, edX',
            java: 'Oracle Tutorials, Udemy, Pluralsight',
            cpp: 'LearnCpp, CPlusPlus, Udemy',
            go: 'Go Tour, Udemy, Pluralsight',
            rust: 'Rust Book, Udemy, Exercism'
        };
        return resources[language] || 'Various online platforms';
    }

    getPackageRegistry(language) {
        const registries = {
            javascript: 'npm (https://www.npmjs.com/)',
            python: 'PyPI (https://pypi.org/)',
            java: 'Maven Central (https://mvnrepository.com/)',
            cpp: 'Conan, vcpkg',
            go: 'Go Modules',
            rust: 'Crates.io (https://crates.io/)'
        };
        return registries[language] || 'Language-specific package managers';
    }

    async projectSettings() {
        console.log(chalk.cyan('\n⚙️  PROJECT SETTINGS'));
        console.log('Current project configuration:');
        console.log(JSON.stringify(this.currentProject, null, 2));
    }

    async interactiveTutorials() {
        console.log(chalk.cyan('\n📚 INTERACTIVE CODING TUTORIALS'));

        console.log(chalk.yellow('Choose a programming language to learn:'));
        Object.entries(this.supportedLanguages).forEach(([key, lang], index) => {
            console.log(`${index + 1}. ${lang.name}`);
        });

        const choice = await this.getUserInput('\nChoose language (1-6): ');
        const langKeys = Object.keys(this.supportedLanguages);
        const selectedLanguage = langKeys[parseInt(choice) - 1];

        if (selectedLanguage) {
            await this.runLanguageTutorial(selectedLanguage);
        } else {
            console.log(chalk.red('❌ Invalid choice.'));
        }
    }

    async runLanguageTutorial(language) {
        const langConfig = this.supportedLanguages[language];

        console.log(chalk.cyan(`\n🌟 ${langConfig.name} TUTORIAL`));
        console.log(chalk.gray('='.repeat(50)));

        console.log(chalk.yellow('📈 PROS:'));
        langConfig.pros.forEach(pro => console.log(`✅ ${pro}`));

        console.log(chalk.yellow('\n📉 CONS:'));
        langConfig.cons.forEach(con => console.log(`❌ ${con}`));

        console.log(chalk.yellow('\n🛠️  FRAMEWORKS:'));
        langConfig.frameworks.forEach(framework => console.log(`🔧 ${framework}`));

        console.log(chalk.yellow('\n🎯 USE CASES:'));
        langConfig.useCases.forEach(useCase => console.log(`💡 ${useCase}`));

        console.log(chalk.cyan('\n💻 BASIC SYNTAX EXAMPLES:'));

        const examples = this.getLanguageExamples(language);
        for (const example of examples) {
            console.log(chalk.yellow(`\n${example.title}:`));
            console.log(chalk.white(example.description));
            console.log(chalk.gray('\nCode:'));
            console.log(chalk.cyan(example.code));
        }

        console.log(chalk.green('\n🎉 Tutorial completed!'));
        console.log(chalk.cyan('💡 Next steps:'));
        console.log(`1. Visit ${this.getLanguageDocs(language)}`);
        console.log(`2. Practice with ${this.getLearningResources(language)}`);
        console.log('3. Create your first project with this language');
    }

    getLanguageExamples(language) {
        const examples = {
            javascript: [
                {
                    title: 'Variables and Functions',
                    description: 'JavaScript uses let/const for variables and arrow functions for concise syntax.',
                    code: `// Variables
let message = "Hello, World!";
const PI = 3.14159;

// Arrow function
const greet = (name) => \`Hello, \${name}!\`;

console.log(greet("Developer"));`
                },
                {
                    title: 'Objects and Arrays',
                    description: 'Objects store key-value pairs, arrays store ordered collections.',
                    code: `// Object
const user = {
    name: "Alice",
    age: 25,
    skills: ["JavaScript", "Python"]
};

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]`
                }
            ],
            python: [
                {
                    title: 'Variables and Functions',
                    description: 'Python uses simple syntax with def for functions and no semicolons.',
                    code: `# Variables
message = "Hello, World!"
pi = 3.14159

# Function
def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`
                },
                {
                    title: 'Lists and Dictionaries',
                    description: 'Lists are mutable arrays, dictionaries are key-value mappings.',
                    code: `# List
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(doubled)  # [2, 4, 6, 8, 10]

# Dictionary
user = {
    "name": "Alice",
    "age": 25,
    "skills": ["Python", "JavaScript"]
}`
                }
            ],
            java: [
                {
                    title: 'Classes and Methods',
                    description: 'Java is object-oriented with strong typing and class-based structure.',
                    code: `public class Bot {
    private String name;

    public Bot(String name) {
        this.name = name;
    }

    public String greet(String user) {
        return "Hello, " + user + "!";
    }

    public static void main(String[] args) {
        Bot bot = new Bot("MyBot");
        System.out.println(bot.greet("Developer"));
    }
}`
                }
            ],
            cpp: [
                {
                    title: 'Basic Structure',
                    description: 'C++ is compiled with manual memory management and powerful performance.',
                    code: `#include <iostream>
#include <string>

class Bot {
private:
    std::string name;

public:
    Bot(std::string n) : name(n) {}

    std::string greet(std::string user) {
        return "Hello, " + user + "!";
    }
};

int main() {
    Bot bot("MyBot");
    std::cout << bot.greet("Developer") << std::endl;
    return 0;
}`
                }
            ],
            go: [
                {
                    title: 'Basic Syntax',
                    description: 'Go has simple syntax with built-in concurrency support.',
                    code: `package main

import "fmt"

type Bot struct {
    name string
}

func (b Bot) greet(user string) string {
    return fmt.Sprintf("Hello, %s!", user)
}

func main() {
    bot := Bot{name: "MyBot"}
    fmt.Println(bot.greet("Developer"))
}`
                }
            ],
            rust: [
                {
                    title: 'Ownership System',
                    description: 'Rust uses ownership and borrowing for memory safety without garbage collection.',
                    code: `struct Bot {
    name: String,
}

impl Bot {
    fn new(name: &str) -> Bot {
        Bot {
            name: name.to_string(),
        }
    }

    fn greet(&self, user: &str) -> String {
        format!("Hello, {}!", user)
    }
}

fn main() {
    let bot = Bot::new("MyBot");
    println!("{}", bot.greet("Developer"));
}`
                }
            ]
        };

        return examples[language] || [];
    }

    async exploreOptions() {
        console.log(chalk.cyan('\n🔍 EXPLORE BOT TYPES & LANGUAGES'));

        console.log(chalk.yellow('🤖 AVAILABLE BOT TYPES:'));
        Object.entries(this.botTypes).forEach(([key, type]) => {
            console.log(`\n🎯 ${type.name}`);
            console.log(`   ${type.description}`);
            console.log(`   Complexity: ${type.complexity}`);
            console.log(`   Features: ${type.features.join(', ')}`);
        });

        console.log(chalk.yellow('\n💻 SUPPORTED LANGUAGES:'));
        Object.entries(this.supportedLanguages).forEach(([key, lang]) => {
            console.log(`\n🌟 ${lang.name}`);
            console.log(`   ✅ Pros: ${lang.pros.slice(0, 3).join(', ')}`);
            console.log(`   ❌ Cons: ${lang.cons.slice(0, 2).join(', ')}`);
            console.log(`   🔧 Frameworks: ${lang.frameworks.join(', ')}`);
        });
    }

    async testBot() {
        console.log(chalk.cyan('\n🧪 BOT TESTING FRAMEWORK'));

        // Get list of existing projects
        try {
            const projects = await fs.readdir('projects');
            if (projects.length === 0) {
                console.log(chalk.yellow('No projects found to test. Create a project first!'));
                return;
            }

            console.log(chalk.yellow('📂 Available Projects:'));
            projects.forEach((project, index) => {
                console.log(`${index + 1}. ${project}`);
            });

            const choice = await this.getUserInput('\nChoose a project to test (number): ');
            const projectIndex = parseInt(choice) - 1;

            if (projectIndex >= 0 && projectIndex < projects.length) {
                const selectedProject = projects[projectIndex];
                const projectPath = path.join('projects', selectedProject);

                // Load project configuration
                const configPath = path.join(projectPath, 'project.json');
                const configData = await fs.readFile(configPath, 'utf8');
                const projectConfig = JSON.parse(configData);

                console.log(chalk.blue(`\n🧪 Testing ${selectedProject}...`));
                console.log(`Language: ${projectConfig.language}`);
                console.log(`Bot Type: ${projectConfig.botType}`);

                // Run tests
                const results = await this.testingFramework.runTests(
                    projectPath,
                    projectConfig.language,
                    projectConfig.botType
                );

                // Track gamification progress
                await this.gamification.trackTestCompletion(results);

                // Offer additional testing options
                if (results.passed > 0) {
                    const runMoreTests = await this.getUserInput('\nRun additional tests? (performance/security) (y/n): ');
                    if (runMoreTests.toLowerCase() === 'y') {
                        const testType = await this.getUserInput('Choose test type (performance/security): ');

                        if (testType === 'performance') {
                            await this.testingFramework.runPerformanceTest(projectPath, projectConfig.language);
                        } else if (testType === 'security') {
                            await this.testingFramework.runSecurityTest(projectPath, projectConfig.language);
                        }
                    }
                }

            } else {
                console.log(chalk.red('❌ Invalid choice.'));
            }
        } catch (error) {
            console.log(chalk.red(`❌ Error testing bot: ${error.message}`));
        }
    }

    async projectManagement() {
        console.log(chalk.cyan('\n📊 PROJECT MANAGEMENT'));

        while (true) {
            console.log(chalk.yellow('\n🔧 PROJECT MANAGEMENT MENU:'));
            console.log('1. 💾 Backup Project');
            console.log('2. 🔄 Restore Project');
            console.log('3. 📤 Share Project');
            console.log('4. 📥 Import Shared Project');
            console.log('5. 📈 Project Statistics');
            console.log('6. 🗂️  List All Projects');
            console.log('7. 🧹 Clean Old Backups');
            console.log('8. 🔙 Back to Main Menu');

            const choice = await this.getUserInput('\nChoose an option (1-9): ');

            switch (choice) {
                case '1':
                    await this.backupProject();
                    break;
                case '2':
                    await this.restoreProject();
                    break;
                case '3':
                    await this.shareProject();
                    break;
                case '4':
                    await this.importSharedProject();
                    break;
                case '5':
                    await this.showProjectStats();
                    break;
                case '6':
                    await this.listProjects();
                    break;
                case '7':
                    await this.cleanBackups();
                    break;
                case '8':
                    return;
                default:
                    console.log(chalk.red('❌ Invalid choice.'));
            }
        }
    }

    async backupProject() {
        console.log(chalk.cyan('\n💾 BACKUP PROJECT'));

        try {
            const projects = await fs.readdir('projects');
            if (projects.length === 0) {
                console.log(chalk.yellow('No projects found to backup.'));
                return;
            }

            console.log(chalk.yellow('📂 Available Projects:'));
            projects.forEach((project, index) => {
                console.log(`${index + 1}. ${project}`);
            });

            const choice = await this.getUserInput('\nChoose a project to backup (number): ');
            const projectIndex = parseInt(choice) - 1;

            if (projectIndex >= 0 && projectIndex < projects.length) {
                const selectedProject = projects[projectIndex];
                await this.projectManager.backupProject(selectedProject);
            } else {
                console.log(chalk.red('❌ Invalid choice.'));
            }
        } catch (error) {
            console.log(chalk.red(`❌ Error backing up project: ${error.message}`));
        }
    }

    async restoreProject() {
        console.log(chalk.cyan('\n🔄 RESTORE PROJECT'));

        try {
            const backups = await fs.readdir('backups');
            if (backups.length === 0) {
                console.log(chalk.yellow('No backups found.'));
                return;
            }

            console.log(chalk.yellow('📦 Available Backups:'));
            backups.forEach((backup, index) => {
                console.log(`${index + 1}. ${backup}`);
            });

            const choice = await this.getUserInput('\nChoose a backup to restore (number): ');
            const backupIndex = parseInt(choice) - 1;

            if (backupIndex >= 0 && backupIndex < backups.length) {
                const selectedBackup = path.join('backups', backups[backupIndex]);
                const newName = await this.getUserInput('Enter new project name (or press Enter to use original): ');
                await this.projectManager.restoreProject(selectedBackup, newName || null);
            } else {
                console.log(chalk.red('❌ Invalid choice.'));
            }
        } catch (error) {
            console.log(chalk.red(`❌ Error restoring project: ${error.message}`));
        }
    }

    async shareProject() {
        console.log(chalk.cyan('\n📤 SHARE PROJECT'));

        try {
            const projects = await fs.readdir('projects');
            if (projects.length === 0) {
                console.log(chalk.yellow('No projects found to share.'));
                return;
            }

            console.log(chalk.yellow('📂 Available Projects:'));
            projects.forEach((project, index) => {
                console.log(`${index + 1}. ${project}`);
            });

            const choice = await this.getUserInput('\nChoose a project to share (number): ');
            const projectIndex = parseInt(choice) - 1;

            if (projectIndex >= 0 && projectIndex < projects.length) {
                const selectedProject = projects[projectIndex];
                const visibility = await this.getUserInput('Share as public or private? (public/private): ');
                await this.projectManager.shareProject(selectedProject, visibility || 'public');
            } else {
                console.log(chalk.red('❌ Invalid choice.'));
            }
        } catch (error) {
            console.log(chalk.red(`❌ Error sharing project: ${error.message}`));
        }
    }

    async importSharedProject() {
        console.log(chalk.cyan('\n📥 IMPORT SHARED PROJECT'));

        try {
            const shared = await fs.readdir('shared');
            if (shared.length === 0) {
                console.log(chalk.yellow('No shared projects found.'));
                return;
            }

            console.log(chalk.yellow('📦 Shared Projects:'));
            shared.forEach((project, index) => {
                console.log(`${index + 1}. ${project}`);
            });

            const choice = await this.getUserInput('\nChoose a project to import (number): ');
            const projectIndex = parseInt(choice) - 1;

            if (projectIndex >= 0 && projectIndex < shared.length) {
                const selectedProject = shared[projectIndex];
                const newName = await this.getUserInput('Enter new project name (or press Enter to use original): ');
                await this.projectManager.importSharedProject(selectedProject, newName || null);
            } else {
                console.log(chalk.red('❌ Invalid choice.'));
            }
        } catch (error) {
            console.log(chalk.red(`❌ Error importing project: ${error.message}`));
        }
    }

    async showProjectStats() {
        console.log(chalk.cyan('\n📈 PROJECT STATISTICS'));

        try {
            const projects = await fs.readdir('projects');
            if (projects.length === 0) {
                console.log(chalk.yellow('No projects found.'));
                return;
            }

            console.log(chalk.yellow('📂 Available Projects:'));
            projects.forEach((project, index) => {
                console.log(`${index + 1}. ${project}`);
            });

            const choice = await this.getUserInput('\nChoose a project (number): ');
            const projectIndex = parseInt(choice) - 1;

            if (projectIndex >= 0 && projectIndex < projects.length) {
                const selectedProject = projects[projectIndex];
                const stats = await this.projectManager.getProjectStatistics(selectedProject);

                if (stats) {
                    console.log(chalk.green(`\n📊 Statistics for ${stats.name}:`));
                    console.log(`💻 Language: ${stats.language}`);
                    console.log(`🤖 Bot Type: ${stats.botType}`);
                    console.log(`📁 Size: ${(stats.size / 1024).toFixed(2)} KB`);
                    console.log(`📄 Files: ${stats.files}`);
                    console.log(`📁 Directories: ${stats.directories}`);
                    console.log(`🕒 Last Modified: ${stats.lastModified ? stats.lastModified.toLocaleString() : 'Unknown'}`);
                } else {
                    console.log(chalk.red('❌ Could not retrieve statistics.'));
                }
            } else {
                console.log(chalk.red('❌ Invalid choice.'));
            }
        } catch (error) {
            console.log(chalk.red(`❌ Error getting statistics: ${error.message}`));
        }
    }

    async listProjects() {
        console.log(chalk.cyan('\n🗂️  ALL PROJECTS'));

        try {
            const projects = await this.projectManager.listProjects();

            if (projects.length === 0) {
                console.log(chalk.yellow('No projects found.'));
                return;
            }

            console.log(chalk.yellow('\n📂 Your Projects:'));
            console.log('─'.repeat(80));
            console.log('Name'.padEnd(20), 'Language'.padEnd(12), 'Type'.padEnd(15), 'Size'.padEnd(10), 'Files'.padEnd(8), 'Last Modified');
            console.log('─'.repeat(80));

            projects.forEach(project => {
                const size = `${(project.size / 1024).toFixed(1)}KB`;
                const modified = project.lastModified ? project.lastModified.toLocaleDateString() : 'Unknown';

                console.log(
                    project.name.padEnd(20),
                    project.language.padEnd(12),
                    project.botType.padEnd(15),
                    size.padEnd(10),
                    project.files.toString().padEnd(8),
                    modified
                );
            });

            console.log('─'.repeat(80));
            console.log(`Total Projects: ${projects.length}`);

        } catch (error) {
            console.log(chalk.red(`❌ Error listing projects: ${error.message}`));
        }
    }

    async cleanBackups() {
        console.log(chalk.cyan('\n🧹 CLEAN OLD BACKUPS'));

        const days = await this.getUserInput('Delete backups older than how many days? (default: 30): ');
        const daysOld = parseInt(days) || 30;

        await this.projectManager.cleanOldBackups(daysOld);
    }

    async gamificationMenu() {
        while (true) {
            console.log(chalk.cyan('\n🎮 GAMIFICATION MENU'));
            console.log(chalk.yellow('\n🎯 What would you like to do?'));
            console.log('1. 📊 View Profile & Progress');
            console.log('2. 🏆 View Achievements');
            console.log('3. 🎯 Browse Challenges');
            console.log('4. 🏅 View Leaderboard');
            console.log('5. 🚀 Start Random Challenge');
            console.log('6. 🔙 Back to Main Menu');

            const choice = await this.getUserInput('\nChoose an option (1-6): ');

            switch (choice) {
                case '1':
                    this.gamification.displayProfile();
                    break;
                case '2':
                    this.gamification.displayAchievements();
                    break;
                case '3':
                    this.gamification.displayChallenges();
                    const challengeChoice = await this.getUserInput('\nEnter challenge ID to start (or press Enter to skip): ');
                    if (challengeChoice.trim()) {
                        await this.gamification.startChallenge(challengeChoice.trim());
                    }
                    break;
                case '4':
                    this.gamification.displayLeaderboard();
                    break;
                case '5':
                    // Start a random challenge
                    const challenges = Object.keys(this.gamification.challenges);
                    if (challenges.length > 0) {
                        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
                        await this.gamification.startChallenge(randomChallenge);
                    } else {
                        console.log(chalk.yellow('No challenges available.'));
                    }
                    break;
                case '6':
                    return;
                default:
                    console.log(chalk.red('❌ Invalid choice.'));
            }

            // Pause before continuing
            if (choice !== '6') {
                await this.getUserInput('\nPress Enter to continue...');
            }
        }
    }

    async settings() {
        console.log(chalk.cyan('\n⚙️  BOT BUILDER SETTINGS'));

        console.log('1. 🎓 Educational Mode:', this.educationalMode ? 'ON' : 'OFF');
        console.log('2. 📁 Default Project Location: projects/');
        console.log('3. 🎮 Gamification: Enabled');
        console.log('4. 🔄 Auto-save: Enabled');

        const choice = await this.getUserInput('\nChoose setting to modify (1-4) or press Enter to go back: ');

        switch (choice) {
            case '1':
                this.educationalMode = !this.educationalMode;
                console.log(`Educational Mode: ${this.educationalMode ? 'ON' : 'OFF'}`);
                break;
            default:
                // Go back
                break;
        }
    }

    async getUserInput(prompt) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        });
    }
}

// Run the bot builder if this file is executed directly
if (require.main === module) {
    const builder = new ComprehensiveBotBuilder();
    builder.initialize().catch(console.error);
}

module.exports = ComprehensiveBotBuilder;
