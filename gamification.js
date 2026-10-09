#!/usr/bin/env node

// gamification.js - Comprehensive gamification system
// Created by Daniel "Death" Newton

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

class GamificationSystem {
    constructor() {
        this.achievements = this.loadAchievements();
        this.challenges = this.loadChallenges();
        this.userProgress = {
            username: 'Coder',
            level: 1,
            xp: 0,
            achievements: [],
            completedChallenges: [],
            streakDays: 0,
            totalProjects: 0,
            languagesLearned: [],
            botsCreated: [],
            tutorialsCompleted: [],
            lastActive: new Date().toISOString(),
            stats: {
                totalCodingTime: 0,
                projectsCreated: 0,
                tutorialsCompleted: 0,
                challengesSolved: 0,
                testsPassed: 0
            }
        };
        this.leaderboard = [];
    }

    async initialize() {
        await this.loadUserProgress();
        console.log(chalk.green('🎮 Gamification system initialized'));
        console.log(chalk.cyan(`Welcome back, ${this.userProgress.username}! Level ${this.userProgress.level} (${this.userProgress.xp} XP)`));
    }

    loadAchievements() {
        return {
            // Beginner achievements
            firstBot: {
                id: 'first_bot',
                name: '🚀 First Bot',
                description: 'Create your first bot project',
                icon: '🚀',
                xp: 100,
                rarity: 'Common',
                category: 'Creation'
            },
            firstTest: {
                id: 'first_test',
                name: '🧪 Test Runner',
                description: 'Run your first bot test',
                icon: '🧪',
                xp: 50,
                rarity: 'Common',
                category: 'Testing'
            },
            firstTutorial: {
                id: 'first_tutorial',
                name: '📚 Knowledge Seeker',
                description: 'Complete your first tutorial',
                icon: '📚',
                xp: 75,
                rarity: 'Common',
                category: 'Learning'
            },

            // Language-specific achievements
            javascriptMaster: {
                id: 'js_master',
                name: '🌟 JavaScript Master',
                description: 'Complete 5 JavaScript projects',
                icon: '🌟',
                xp: 500,
                rarity: 'Rare',
                category: 'Language'
            },
            pythonWizard: {
                id: 'python_wizard',
                name: '🐍 Python Wizard',
                description: 'Complete 5 Python projects',
                icon: '🐍',
                xp: 500,
                rarity: 'Rare',
                category: 'Language'
            },
            rustApprentice: {
                id: 'rust_apprentice',
                name: '🦀 Rust Apprentice',
                description: 'Create your first Rust bot',
                icon: '🦀',
                xp: 200,
                rarity: 'Uncommon',
                category: 'Language'
            },

            // Bot type achievements
            aiCreator: {
                id: 'ai_creator',
                name: '🧠 AI Creator',
                description: 'Build an AI-powered bot',
                icon: '🧠',
                xp: 300,
                rarity: 'Uncommon',
                category: 'Specialization'
            },
            securityGuardian: {
                id: 'security_guardian',
                name: '🔒 Security Guardian',
                description: 'Create a security monitoring bot',
                icon: '🔒',
                xp: 400,
                rarity: 'Rare',
                category: 'Specialization'
            },

            // Advanced achievements
            projectManager: {
                id: 'project_manager',
                name: '📊 Project Manager',
                description: 'Manage 10+ bot projects',
                icon: '📊',
                xp: 750,
                rarity: 'Epic',
                category: 'Management'
            },
            challengeMaster: {
                id: 'challenge_master',
                name: '🏆 Challenge Master',
                description: 'Complete 20 coding challenges',
                icon: '🏆',
                xp: 1000,
                rarity: 'Legendary',
                category: 'Challenges'
            },
            streakMaster: {
                id: 'streak_master',
                name: '🔥 Streak Master',
                description: 'Maintain a 30-day coding streak',
                icon: '🔥',
                xp: 800,
                rarity: 'Epic',
                category: 'Consistency'
            },

            // Special achievements
            contributor: {
                id: 'contributor',
                name: '🤝 Contributor',
                description: 'Share 5 projects with the community',
                icon: '🤝',
                xp: 600,
                rarity: 'Uncommon',
                category: 'Community'
            },
            perfectionist: {
                id: 'perfectionist',
                name: '✨ Perfectionist',
                description: 'Achieve 100% test pass rate on 10 projects',
                icon: '✨',
                xp: 900,
                rarity: 'Legendary',
                category: 'Quality'
            }
        };
    }

    loadChallenges() {
        return {
            // Easy challenges
            helloWorld: {
                id: 'hello_world',
                title: 'Hello World Bot',
                description: 'Create a bot that responds with "Hello, World!"',
                difficulty: 'Easy',
                xp: 25,
                category: 'Basic',
                requirements: ['Respond to !hello command'],
                hints: ['Use basic string responses', 'Check for command prefix'],
                solution: 'Implement a simple command handler that responds to !hello'
            },

            mathBot: {
                id: 'math_bot',
                title: 'Math Calculator',
                description: 'Create a bot that can perform basic math operations',
                difficulty: 'Easy',
                xp: 50,
                category: 'Utility',
                requirements: ['Add command', 'Subtract command', 'Multiply command'],
                hints: ['Parse user input for numbers', 'Use JavaScript Math or Python operators'],
                solution: 'Create commands like !add 5 3, !multiply 4 2'
            },

            // Medium challenges
            weatherBot: {
                id: 'weather_bot',
                title: 'Weather Reporter',
                description: 'Create a bot that reports weather information',
                difficulty: 'Medium',
                xp: 100,
                category: 'API Integration',
                requirements: ['Weather API integration', 'Location parsing', 'Error handling'],
                hints: ['Use a weather API like OpenWeatherMap', 'Handle API errors gracefully'],
                solution: 'Integrate weather API and format responses nicely'
            },

            quizBot: {
                id: 'quiz_bot',
                title: 'Quiz Master',
                description: 'Create a bot that can conduct quizzes',
                difficulty: 'Medium',
                xp: 125,
                category: 'Interactive',
                requirements: ['Question storage', 'Score tracking', 'Multiple choice'],
                hints: ['Store questions in arrays/objects', 'Track user scores', 'Handle timeouts'],
                solution: 'Implement question flow with scoring system'
            },

            // Hard challenges
            aiChatbot: {
                id: 'ai_chatbot',
                title: 'AI Conversational Bot',
                description: 'Build a bot with basic AI conversation capabilities',
                difficulty: 'Hard',
                xp: 250,
                category: 'AI',
                requirements: ['Sentiment analysis', 'Context awareness', 'Personality'],
                hints: ['Use NLP libraries', 'Implement conversation memory', 'Add emotional responses'],
                solution: 'Create sophisticated conversation handling with personality'
            },

            securityScanner: {
                id: 'security_scanner',
                title: 'Security Scanner',
                description: 'Create a bot that performs basic security scans',
                difficulty: 'Hard',
                xp: 300,
                category: 'Security',
                requirements: ['Port scanning', 'Vulnerability detection', 'Report generation'],
                hints: ['Use ethical scanning methods', 'Implement safe scanning', 'Generate clear reports'],
                solution: 'Build comprehensive security assessment tool'
            },

            // Expert challenges
            tradingBot: {
                id: 'trading_bot',
                title: 'Crypto Trading Bot',
                description: 'Build an automated cryptocurrency trading bot',
                difficulty: 'Expert',
                xp: 500,
                category: 'Finance',
                requirements: ['Exchange API integration', 'Trading strategy', 'Risk management'],
                hints: ['Start with paper trading', 'Implement stop-loss', 'Add backtesting'],
                solution: 'Create sophisticated trading algorithm with safety measures'
            },

            gameServer: {
                id: 'game_server',
                title: 'Game Server Bot',
                description: 'Create a bot that manages game servers and tournaments',
                difficulty: 'Expert',
                xp: 450,
                category: 'Gaming',
                requirements: ['Player management', 'Matchmaking', 'Statistics tracking'],
                hints: ['Implement player queues', 'Track game statistics', 'Handle disconnections'],
                solution: 'Build complete game management system'
            }
        };
    }

    async loadUserProgress() {
        try {
            const progressPath = path.join(__dirname, 'user_progress.json');
            const data = await fs.readFile(progressPath, 'utf8');
            const savedProgress = JSON.parse(data);

            // Merge saved progress with defaults
            this.userProgress = { ...this.userProgress, ...savedProgress };
        } catch (error) {
            // File doesn't exist or corrupted, use defaults
            console.log(chalk.yellow('🎮 Starting new gamification profile...'));
        }
    }

    async saveUserProgress() {
        try {
            const progressPath = path.join(__dirname, 'user_progress.json');
            await fs.writeFile(progressPath, JSON.stringify(this.userProgress, null, 2));
        } catch (error) {
            console.error('Error saving progress:', error.message);
        }
    }

    async awardXP(amount, reason) {
        this.userProgress.xp += amount;
        console.log(chalk.green(`🎉 +${amount} XP: ${reason}`));

        // Check for level up
        const newLevel = Math.floor(this.userProgress.xp / 1000) + 1;
        if (newLevel > this.userProgress.level) {
            const levelsGained = newLevel - this.userProgress.level;
            this.userProgress.level = newLevel;
            console.log(chalk.yellow(`🚀 LEVEL UP! You are now level ${newLevel}! (+${levelsGained} levels)`));
        }

        await this.saveUserProgress();
    }

    async unlockAchievement(achievementId, reason = '') {
        if (this.userProgress.achievements.includes(achievementId)) {
            return; // Already unlocked
        }

        const achievement = this.achievements[achievementId];
        if (!achievement) {
            console.log(chalk.red(`Unknown achievement: ${achievementId}`));
            return;
        }

        this.userProgress.achievements.push(achievementId);
        await this.awardXP(achievement.xp, `Achievement unlocked: ${achievement.name}`);

        console.log(chalk.yellow(`
🏆 ACHIEVEMENT UNLOCKED!
${achievement.icon} ${achievement.name}
${achievement.description}
+${achievement.xp} XP (${achievement.rarity})
        `));

        await this.saveUserProgress();
    }

    async completeChallenge(challengeId) {
        if (this.userProgress.completedChallenges.includes(challengeId)) {
            return; // Already completed
        }

        const challenge = this.challenges[challengeId];
        if (!challenge) {
            console.log(chalk.red(`Unknown challenge: ${challengeId}`));
            return;
        }

        this.userProgress.completedChallenges.push(challengeId);
        this.userProgress.stats.challengesSolved++;
        await this.awardXP(challenge.xp, `Challenge completed: ${challenge.title}`);

        console.log(chalk.cyan(`
🎯 CHALLENGE COMPLETED!
${challenge.title}
${challenge.description}
+${challenge.xp} XP (${challenge.difficulty})
        `));

        await this.saveUserProgress();
    }

    async updateStreak() {
        const today = new Date().toDateString();
        const lastActive = new Date(this.userProgress.lastActive).toDateString();

        if (today !== lastActive) {
            if (this.isConsecutiveDay(lastActive, today)) {
                this.userProgress.streakDays++;
                if (this.userProgress.streakDays % 7 === 0) {
                    console.log(chalk.green(`🔥 ${this.userProgress.streakDays} day streak! Weekly achievement!`));
                    await this.awardXP(50, 'Weekly streak bonus');
                }
            } else {
                this.userProgress.streakDays = 1;
            }
            this.userProgress.lastActive = new Date().toISOString();
            await this.saveUserProgress();
        }
    }

    isConsecutiveDay(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1;
    }

    getLevelProgress() {
        const currentLevelXP = (this.userProgress.level - 1) * 1000;
        const nextLevelXP = this.userProgress.level * 1000;
        const progressXP = this.userProgress.xp - currentLevelXP;
        const neededXP = nextLevelXP - currentLevelXP;

        return {
            current: progressXP,
            needed: neededXP,
            percentage: Math.round((progressXP / neededXP) * 100)
        };
    }

    displayProfile() {
        const progress = this.getLevelProgress();

        console.log(chalk.cyan('\n🎮 YOUR GAMIFICATION PROFILE'));
        console.log(chalk.gray('='.repeat(50)));
        console.log(chalk.yellow(`👤 Player: ${this.userProgress.username}`));
        console.log(chalk.yellow(`⭐ Level: ${this.userProgress.level}`));
        console.log(chalk.yellow(`💎 XP: ${this.userProgress.xp}`));
        console.log(chalk.green(`📊 Progress to next level: ${progress.current}/${progress.needed} XP (${progress.percentage}%)`));

        console.log(chalk.yellow(`🔥 Current Streak: ${this.userProgress.streakDays} days`));
        console.log(chalk.yellow(`📁 Total Projects: ${this.userProgress.stats.projectsCreated}`));
        console.log(chalk.yellow(`🎯 Challenges Solved: ${this.userProgress.stats.challengesSolved}`));
        console.log(chalk.yellow(`📚 Tutorials Completed: ${this.userProgress.stats.tutorialsCompleted}`));

        // Achievement summary
        const achievements = this.userProgress.achievements.length;
        console.log(chalk.yellow(`🏆 Achievements Unlocked: ${achievements}`));

        // Progress bar
        const barWidth = 20;
        const filledBars = Math.round((progress.percentage / 100) * barWidth);
        const emptyBars = barWidth - filledBars;
        const progressBar = '█'.repeat(filledBars) + '░'.repeat(emptyBars);

        console.log(chalk.cyan(`\nLevel Progress: [${progressBar}] ${progress.percentage}%`));
    }

    displayAchievements() {
        console.log(chalk.cyan('\n🏆 YOUR ACHIEVEMENTS'));
        console.log(chalk.gray('='.repeat(50)));

        const unlockedAchievements = this.userProgress.achievements.map(id => this.achievements[id]).filter(Boolean);

        if (unlockedAchievements.length === 0) {
            console.log(chalk.yellow('No achievements unlocked yet. Keep coding!'));
            return;
        }

        // Group by category
        const categories = {};
        unlockedAchievements.forEach(achievement => {
            if (!categories[achievement.category]) {
                categories[achievement.category] = [];
            }
            categories[achievement.category].push(achievement);
        });

        Object.entries(categories).forEach(([category, achievements]) => {
            console.log(chalk.yellow(`\n${category}:`));
            achievements.forEach(achievement => {
                console.log(`${achievement.icon} ${achievement.name} - ${achievement.description}`);
                console.log(chalk.gray(`   +${achievement.xp} XP (${achievement.rarity})`));
            });
        });

        // Show locked achievements
        const lockedAchievements = Object.values(this.achievements).filter(
            achievement => !this.userProgress.achievements.includes(achievement.id)
        );

        if (lockedAchievements.length > 0) {
            console.log(chalk.yellow('\n🔒 Locked Achievements:'));
            lockedAchievements.slice(0, 5).forEach(achievement => {
                console.log(`🔒 ${achievement.name} - ${achievement.description}`);
            });
            if (lockedAchievements.length > 5) {
                console.log(chalk.gray(`... and ${lockedAchievements.length - 5} more`));
            }
        }
    }

    displayChallenges() {
        console.log(chalk.cyan('\n🎯 CODING CHALLENGES'));
        console.log(chalk.gray('='.repeat(50)));

        const allChallenges = Object.values(this.challenges);
        const completedIds = this.userProgress.completedChallenges;

        // Group by difficulty
        const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];

        difficulties.forEach(difficulty => {
            const challenges = allChallenges.filter(c => c.difficulty === difficulty);
            if (challenges.length === 0) return;

            console.log(chalk.yellow(`\n${difficulty} Challenges:`));

            challenges.forEach(challenge => {
                const completed = completedIds.includes(challenge.id);
                const status = completed ? '✅' : '🔒';
                const xp = completed ? chalk.gray(`${challenge.xp} XP`) : `${challenge.xp} XP`;

                console.log(`${status} ${challenge.title} - ${xp}`);
                console.log(chalk.gray(`   ${challenge.description}`));
            });
        });

        const completed = completedIds.length;
        const total = allChallenges.length;
        console.log(chalk.cyan(`\nProgress: ${completed}/${total} challenges completed`));
    }

    async startChallenge(challengeId) {
        const challenge = this.challenges[challengeId];
        if (!challenge) {
            console.log(chalk.red(`Challenge not found: ${challengeId}`));
            return;
        }

        console.log(chalk.cyan(`\n🎯 STARTING CHALLENGE: ${challenge.title}`));
        console.log(chalk.gray('='.repeat(50)));
        console.log(challenge.description);
        console.log(chalk.yellow(`\nDifficulty: ${challenge.difficulty}`));
        console.log(chalk.yellow(`XP Reward: ${challenge.xp}`));

        console.log(chalk.yellow('\n📋 Requirements:'));
        challenge.requirements.forEach(req => console.log(`• ${req}`));

        if (challenge.hints && challenge.hints.length > 0) {
            console.log(chalk.yellow('\n💡 Hints:'));
            challenge.hints.forEach(hint => console.log(`• ${hint}`));
        }

        console.log(chalk.green('\nGood luck! You\'ve got this! 🚀'));
    }

    // Event tracking methods
    async trackProjectCreation(language, botType) {
        this.userProgress.stats.projectsCreated++;
        this.userProgress.totalProjects++;

        if (!this.userProgress.languagesLearned.includes(language)) {
            this.userProgress.languagesLearned.push(language);
            await this.awardXP(25, `Learned new language: ${language}`);
        }

        if (!this.userProgress.botsCreated.includes(botType)) {
            this.userProgress.botsCreated.push(botType);
        }

        // Achievement checks
        if (this.userProgress.stats.projectsCreated === 1) {
            await this.unlockAchievement('first_bot');
        }

        if (this.userProgress.stats.projectsCreated >= 10) {
            await this.unlockAchievement('project_manager');
        }

        // Language-specific achievements
        const languageProjects = this.userProgress.stats.projectsCreated; // Simplified
        if (language === 'javascript' && languageProjects >= 5) {
            await this.unlockAchievement('javascript_master');
        }

        await this.updateStreak();
        await this.saveUserProgress();
    }

    async trackTutorialCompletion(tutorialId, language) {
        if (!this.userProgress.tutorialsCompleted.includes(tutorialId)) {
            this.userProgress.tutorialsCompleted.push(tutorialId);
            this.userProgress.stats.tutorialsCompleted++;

            await this.awardXP(25, `Completed tutorial: ${tutorialId}`);

            if (this.userProgress.stats.tutorialsCompleted === 1) {
                await this.unlockAchievement('first_tutorial');
            }
        }

        await this.updateStreak();
        await this.saveUserProgress();
    }

    async trackTestCompletion(testResults) {
        if (testResults.passed > 0) {
            this.userProgress.stats.testsPassed += testResults.passed;

            if (this.userProgress.stats.testsPassed === 1) {
                await this.unlockAchievement('first_test');
            }

            await this.awardXP(testResults.passed * 5, `Tests passed: ${testResults.passed}`);
        }

        await this.updateStreak();
        await this.saveUserProgress();
    }

    async trackChallengeCompletion(challengeId) {
        await this.completeChallenge(challengeId);
        await this.updateStreak();
    }

    // Leaderboard methods
    async updateLeaderboard() {
        // This would typically sync with a server
        // For now, just maintain local leaderboard
        this.leaderboard = [{
            username: this.userProgress.username,
            level: this.userProgress.level,
            xp: this.userProgress.xp,
            achievements: this.userProgress.achievements.length
        }];

        this.leaderboard.sort((a, b) => b.xp - a.xp);
    }

    displayLeaderboard() {
        console.log(chalk.cyan('\n🏅 LEADERBOARD'));
        console.log(chalk.gray('='.repeat(30)));

        this.leaderboard.slice(0, 10).forEach((player, index) => {
            const rank = index + 1;
            const rankIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🏅';
            console.log(`${rankIcon} ${rank}. ${player.username} - Level ${player.level} (${player.xp} XP)`);
        });
    }
}

module.exports = GamificationSystem;

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];

    const gamification = new GamificationSystem();

    switch (command) {
        case 'profile':
            gamification.displayProfile();
            break;

        case 'achievements':
            gamification.displayAchievements();
            break;

        case 'challenges':
            gamification.displayChallenges();
            break;

        case 'leaderboard':
            gamification.displayLeaderboard();
            break;

        case 'challenge':
            if (args[1]) {
                gamification.startChallenge(args[1]);
            } else {
                console.log('Usage: node gamification.js challenge <challengeId>');
            }
            break;

        default:
            console.log('Gamification CLI');
            console.log('Usage: node gamification.js <command>');
            console.log('');
            console.log('Commands:');
            console.log('  profile      - Show your profile');
            console.log('  achievements - Show unlocked achievements');
            console.log('  challenges   - Show available challenges');
            console.log('  leaderboard  - Show leaderboard');
            console.log('  challenge <id> - Start a specific challenge');
    }
}
