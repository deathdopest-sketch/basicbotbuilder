// 3X_XE - Dark Humor & Positivity Twitter Bot
// Created by D****l "Death" N****n
// A Twitter bot that posts dark humor jokes and positivity content to confuse and engage followers

const { TwitterApi } = require('twitter-api-v2');
const cron = require('node-cron');
const chalk = require('chalk');
const darkHumor = require('./content/dark_humor');
const positivity = require('./content/positivity');

// Load environment variables
require('dotenv').config();

class ThreeXE {
    constructor() {
        this.client = null;
        this.isInitialized = false;
        this.postCount = 0;
        this.stats = {
            darkHumorPosts: 0,
            positivityPosts: 0,
            totalLikes: 0,
            totalRetweets: 0,
            followers: 0
        };

        // Initialize Twitter client
        this.initializeTwitterClient();
    }

    initializeTwitterClient() {
        try {
            const bearerToken = process.env.TWITTER_BEARER_TOKEN;
            const appKey = process.env.TWITTER_APP_KEY;
            const appSecret = process.env.TWITTER_APP_SECRET;
            const accessToken = process.env.TWITTER_ACCESS_TOKEN;
            const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

            if (!bearerToken || !appKey || !appSecret || !accessToken || !accessTokenSecret) {
                console.log(chalk.red('❌ Twitter API credentials not found!'));
                console.log(chalk.yellow('Please set the following environment variables:'));
                console.log(chalk.gray('  TWITTER_BEARER_TOKEN'));
                console.log(chalk.gray('  TWITTER_APP_KEY'));
                console.log(chalk.gray('  TWITTER_APP_SECRET'));
                console.log(chalk.gray('  TWITTER_ACCESS_TOKEN'));
                console.log(chalk.gray('  TWITTER_ACCESS_TOKEN_SECRET'));
                return false;
            }

            // Initialize Twitter client
            this.client = new TwitterApi({
                appKey: appKey,
                appSecret: appSecret,
                accessToken: accessToken,
                accessTokenSecret: accessTokenSecret,
            });

            this.rwClient = this.client.readWrite;
            this.isInitialized = true;

            console.log(chalk.green('✅ Twitter client initialized successfully'));
            console.log(chalk.blue('🤖 3X_XE Bot ready for action'));
            return true;

        } catch (error) {
            console.error(chalk.red('❌ Failed to initialize Twitter client:'), error.message);
            return false;
        }
    }

    async postDarkHumor() {
        if (!this.isInitialized) {
            console.log(chalk.red('❌ Bot not initialized'));
            return false;
        }

        try {
            const joke = darkHumor.getRandomJoke();

            // Add some random hashtags to increase visibility
            const hashtags = ['#DarkHumor', '#Jokes', '#Comedy', '#Funny', '#Humor'];
            const randomHashtags = hashtags
                .sort(() => 0.5 - Math.random())
                .slice(0, 2)
                .join(' ');

            const tweetText = `${joke}\n\n${randomHashtags}`;

            console.log(chalk.yellow('📝 Posting dark humor:'));
            console.log(chalk.gray(`"${tweetText}"`));

            const tweet = await this.rwClient.v2.tweet(tweetText);

            this.postCount++;
            this.stats.darkHumorPosts++;

            console.log(chalk.green(`✅ Dark humor posted! Tweet ID: ${tweet.data.id}`));
            return true;

        } catch (error) {
            console.error(chalk.red('❌ Failed to post dark humor:'), error.message);
            return false;
        }
    }

    async postPositivity() {
        if (!this.isInitialized) {
            console.log(chalk.red('❌ Bot not initialized'));
            return false;
        }

        try {
            const positiveContent = positivity.getRandom();
            const trendingTopics = positivity.getTrendingTopics();

            // Add trending hashtags for better engagement
            const randomTopics = trendingTopics
                .sort(() => 0.5 - Math.random())
                .slice(0, 2)
                .join(' ');

            const tweetText = `${positiveContent}\n\n${randomTopics}`;

            console.log(chalk.cyan('📝 Posting positivity:'));
            console.log(chalk.gray(`"${tweetText}"`));

            const tweet = await this.rwClient.v2.tweet(tweetText);

            this.postCount++;
            this.stats.positivityPosts++;

            console.log(chalk.green(`✅ Positivity posted! Tweet ID: ${tweet.data.id}`));
            return true;

        } catch (error) {
            console.error(chalk.red('❌ Failed to post positivity:'), error.message);
            return false;
        }
    }

    async postMixedContent() {
        if (!this.isInitialized) {
            console.log(chalk.red('❌ Bot not initialized'));
            return false;
        }

        try {
            // Randomly choose between dark humor and positivity (60% positivity, 40% dark humor)
            const contentType = Math.random() < 0.6 ? 'positivity' : 'darkHumor';

            if (contentType === 'positivity') {
                return await this.postPositivity();
            } else {
                return await this.postDarkHumor();
            }

        } catch (error) {
            console.error(chalk.red('❌ Failed to post mixed content:'), error.message);
            return false;
        }
    }

    startAutomatedPosting() {
        if (!this.isInitialized) {
            console.log(chalk.red('❌ Bot not initialized'));
            return false;
        }

        console.log(chalk.blue('🚀 Starting automated posting schedule...'));

        // Post every 2 hours (adjust as needed)
        cron.schedule('0 */2 * * *', async () => {
            console.log(chalk.yellow('⏰ Scheduled post time reached'));
            await this.postMixedContent();
        });

        // Post positivity every morning at 8 AM
        cron.schedule('0 8 * * *', async () => {
            console.log(chalk.cyan('🌅 Morning positivity post'));
            await this.postPositivity();
        });

        // Post dark humor every evening at 6 PM
        cron.schedule('0 18 * * *', async () => {
            console.log(chalk.yellow('🌙 Evening dark humor post'));
            await this.postDarkHumor();
        });

        console.log(chalk.green('✅ Automated posting schedule activated'));
        console.log(chalk.gray('📅 Schedule:'));
        console.log(chalk.gray('   • Mixed content every 2 hours'));
        console.log(chalk.gray('   • Positivity every morning at 8 AM'));
        console.log(chalk.gray('   • Dark humor every evening at 6 PM'));

        return true;
    }

    async getAccountInfo() {
        if (!this.isInitialized) {
            console.log(chalk.red('❌ Bot not initialized'));
            return null;
        }

        try {
            const user = await this.client.v2.me();
            console.log(chalk.blue('👤 Account Information:'));
            console.log(chalk.gray(`   Username: @${user.data.username}`));
            console.log(chalk.gray(`   Name: ${user.data.name}`));
            console.log(chalk.gray(`   Followers: ${user.data.public_metrics.followers_count}`));
            console.log(chalk.gray(`   Following: ${user.data.public_metrics.following_count}`));

            this.stats.followers = user.data.public_metrics.followers_count;
            return user.data;

        } catch (error) {
            console.error(chalk.red('❌ Failed to get account info:'), error.message);
            return null;
        }
    }

    async getStats() {
        if (!this.isInitialized) {
            console.log(chalk.red('❌ Bot not initialized'));
            return null;
        }

        try {
            const user = await this.client.v2.me();

            console.log(chalk.blue('📊 Bot Statistics:'));
            console.log(chalk.gray(`   Total Posts: ${this.postCount}`));
            console.log(chalk.gray(`   Dark Humor Posts: ${this.stats.darkHumorPosts}`));
            console.log(chalk.gray(`   Positivity Posts: ${this.stats.positivityPosts}`));
            console.log(chalk.gray(`   Followers: ${user.data.public_metrics.followers_count}`));
            console.log(chalk.gray(`   Account Age: ${new Date(user.data.created_at).toLocaleDateString()}`));

            return {
                ...this.stats,
                account: user.data
            };

        } catch (error) {
            console.error(chalk.red('❌ Failed to get stats:'), error.message);
            return null;
        }
    }

    async testPost() {
        console.log(chalk.yellow('🧪 Running test post...'));

        const testTweet = `🤖 3X_XE Test Post - ${new Date().toLocaleString()}\n\n#3X_XE #Test #Bot`;

        try {
            const tweet = await this.rwClient.v2.tweet(testTweet);
            console.log(chalk.green(`✅ Test post successful! Tweet ID: ${tweet.data.id}`));
            return true;
        } catch (error) {
            console.error(chalk.red('❌ Test post failed:'), error.message);
            return false;
        }
    }

    // Manual posting methods for different content types
    async postDarkHumorManual() {
        return await this.postDarkHumor();
    }

    async postPositivityManual() {
        return await this.postPositivity();
    }

    async postRandom() {
        return await this.postMixedContent();
    }
}

// CLI Interface
async function main() {
    const bot = new ThreeXE();

    // Parse command line arguments
    const args = process.argv.slice(2);
    const command = args[0];

    console.log(chalk.magenta('🎭 3X_XE - Dark Humor & Positivity Twitter Bot'));
    console.log(chalk.gray('Created by D****l "Death" N****n'));
    console.log(chalk.gray('='.repeat(50)));

    switch (command) {
        case '--help':
        case '-h':
            console.log(chalk.cyan('Available commands:'));
            console.log(chalk.gray('  npm start          - Start automated posting'));
            console.log(chalk.gray('  npm run test       - Run test post'));
            console.log(chalk.gray('  npm run post       - Post random content'));
            console.log(chalk.gray('  node bot.js --info - Show account info'));
            console.log(chalk.gray('  node bot.js --stats- Show bot statistics'));
            console.log(chalk.gray('  node bot.js --dark - Post dark humor'));
            console.log(chalk.gray('  node bot.js --positive - Post positivity'));
            console.log(chalk.gray('  node bot.js --help - Show this help'));
            break;

        case '--test':
            if (!bot.isInitialized) return;
            await bot.testPost();
            break;

        case '--info':
            if (!bot.isInitialized) return;
            await bot.getAccountInfo();
            break;

        case '--stats':
            if (!bot.isInitialized) return;
            await bot.getStats();
            break;

        case '--dark':
            if (!bot.isInitialized) return;
            console.log(chalk.yellow('🖤 Posting dark humor...'));
            await bot.postDarkHumorManual();
            break;

        case '--positive':
            if (!bot.isInitialized) return;
            console.log(chalk.cyan('💖 Posting positivity...'));
            await bot.postPositivityManual();
            break;

        case '--post':
        case '--random':
            if (!bot.isInitialized) return;
            console.log(chalk.blue('🎲 Posting random content...'));
            await bot.postRandom();
            break;

        default:
            if (!bot.isInitialized) {
                console.log(chalk.red('❌ Bot initialization failed'));
                console.log(chalk.yellow('💡 Make sure you have set up your Twitter API credentials'));
                process.exit(1);
            }

            console.log(chalk.green('✅ Bot initialized successfully'));
            await bot.getAccountInfo();

            // Start automated posting
            bot.startAutomatedPosting();

            console.log(chalk.blue('\n🤖 3X_XE is now running...'));
            console.log(chalk.gray('Press Ctrl+C to stop'));

            // Keep the process running
            process.on('SIGINT', () => {
                console.log(chalk.yellow('\n🛑 Stopping 3X_XE...'));
                process.exit(0);
            });

            // Prevent the process from exiting
            setInterval(() => {
                // Keep alive
            }, 1000);
    }
}

// Run the bot
if (require.main === module) {
    main().catch(error => {
        console.error(chalk.red('❌ Fatal error:'), error.message);
        process.exit(1);
    });
}

module.exports = ThreeXE;
