#!/usr/bin/env python3
"""
AI Chatbot Example - Python
Created with Comprehensive Bot Builder

This example demonstrates:
- Natural language processing with NLTK
- Sentiment analysis
- Pattern matching for responses
- Discord bot integration
- Error handling and logging
"""

import discord
import os
import random
import asyncio
import logging
from datetime import datetime
from dotenv import load_dotenv

# Optional: Sentiment analysis (requires nltk)
try:
    import nltk
    from nltk.sentiment import SentimentIntensityAnalyzer
    NLTK_AVAILABLE = True
except ImportError:
    NLTK_AVAILABLE = False
    print("⚠️ NLTK not available. Install with: pip install nltk")

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('bot.log'),
        logging.StreamHandler()
    ]
)

# Bot configuration
TOKEN = os.getenv('DISCORD_BOT_TOKEN')
PREFIX = '!'

# Initialize Discord client
intents = discord.Intents.default()
intents.message_content = True
bot = discord.Client(intents=intents)

# Initialize sentiment analyzer if available
if NLTK_AVAILABLE:
    try:
        nltk.data.find('vader_lexicon')
    except LookupError:
        nltk.download('vader_lexicon')
    sia = SentimentIntensityAnalyzer()
else:
    sia = None

# Response patterns for different contexts
RESPONSES = {
    'greetings': [
        "Hello! How are you feeling today?",
        "Hi there! What's on your mind?",
        "Greetings! How can I help you?",
        "Hey! Nice to see you here!",
    ],

    'positive': [
        "That's wonderful! I'm glad you're feeling good.",
        "I'm happy to hear that! 😊",
        "Great! Tell me more about what's making you happy.",
        "That's awesome! Keep that positive energy going!",
    ],

    'negative': [
        "I'm sorry you're feeling that way. Want to talk about it?",
        "That sounds tough. I'm here to listen. 💙",
        "I understand. Sometimes sharing helps.",
        "I'm here for you. What's bothering you?",
    ],

    'questions': [
        "That's an interesting question!",
        "Let me think about that...",
        "Good question! Here's what I think...",
        "Hmm, let me consider that...",
    ],

    'neutral': [
        "I understand. Tell me more about that.",
        "That's interesting. Can you elaborate?",
        "I see. What else is on your mind?",
        "Okay, I'm listening. Continue...",
    ],

    'farewell': [
        "Goodbye! Take care of yourself.",
        "See you later! Have a great day!",
        "Farewell! Come back anytime.",
        "Take care! I'm here if you need me.",
    ]
}

# Keywords for pattern matching
KEYWORDS = {
    'greetings': ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    'farewell': ['bye', 'goodbye', 'see you', 'farewell', 'later', 'cya'],
    'questions': ['what', 'how', 'why', 'when', 'where', 'who', 'which', 'can you', 'do you'],
    'positive': ['good', 'great', 'awesome', 'excellent', 'amazing', 'love', 'happy', 'excited'],
    'negative': ['bad', 'terrible', 'awful', 'horrible', 'sad', 'angry', 'upset', 'depressed']
}

class AIChatbot:
    def __init__(self):
        self.conversation_history = {}
        self.user_moods = {}
        self.command_stats = {}

    def analyze_sentiment(self, text):
        """Analyze sentiment of text using NLTK or simple keyword matching"""
        if sia:
            scores = sia.polarity_scores(text)
            compound = scores['compound']

            if compound >= 0.05:
                return 'positive'
            elif compound <= -0.05:
                return 'negative'
            else:
                return 'neutral'
        else:
            # Simple keyword-based sentiment analysis
            text_lower = text.lower()
            positive_count = sum(1 for word in KEYWORDS['positive'] if word in text_lower)
            negative_count = sum(1 for word in KEYWORDS['negative'] if word in text_lower)

            if positive_count > negative_count:
                return 'positive'
            elif negative_count > positive_count:
                return 'negative'
            else:
                return 'neutral'

    def detect_intent(self, text):
        """Detect user intent based on keywords"""
        text_lower = text.lower()

        for intent, keywords in KEYWORDS.items():
            if any(keyword in text_lower for keyword in keywords):
                return intent

        return 'neutral'

    def get_personalized_response(self, user_id, sentiment, intent):
        """Generate personalized response based on user history and current context"""
        # Update user mood history
        if user_id not in self.user_moods:
            self.user_moods[user_id] = []

        self.user_moods[user_id].append(sentiment)

        # Keep only last 10 mood entries
        if len(self.user_moods[user_id]) > 10:
            self.user_moods[user_id] = self.user_moods[user_id][-10:]

        # Calculate average mood
        mood_counts = {
            'positive': self.user_moods[user_id].count('positive'),
            'negative': self.user_moods[user_id].count('negative'),
            'neutral': self.user_moods[user_id].count('neutral')
        }

        dominant_mood = max(mood_counts, key=mood_counts.get)

        # Get base response
        if intent in RESPONSES:
            response = random.choice(RESPONSES[intent])
        else:
            response = random.choice(RESPONSES['neutral'])

        # Add personalized touch based on mood history
        if dominant_mood == 'positive' and intent != 'positive':
            response += " You seem to be in a good mood lately! 🌟"
        elif dominant_mood == 'negative' and intent != 'negative':
            response += " I hope things get better for you soon. 💙"

        return response

    def learn_from_interaction(self, user_id, user_message, bot_response):
        """Learn from user interactions (placeholder for future ML integration)"""
        if user_id not in self.conversation_history:
            self.conversation_history[user_id] = []

        self.conversation_history[user_id].append({
            'timestamp': datetime.now(),
            'user_message': user_message,
            'bot_response': bot_response,
            'sentiment': self.analyze_sentiment(user_message)
        })

        # Keep only last 50 interactions per user
        if len(self.conversation_history[user_id]) > 50:
            self.conversation_history[user_id] = self.conversation_history[user_id][-50:]

# Initialize AI chatbot
ai_bot = AIChatbot()

# Bot commands
async def handle_ping(message):
    """Handle ping command"""
    latency = round(bot.latency * 1000)  # Convert to milliseconds
    await message.reply(f"🏓 Pong! Latency: {latency}ms")
    ai_bot.command_stats['ping'] = ai_bot.command_stats.get('ping', 0) + 1

async def handle_hello(message):
    """Handle hello command"""
    user = message.author
    response = f"Hello {user.name}! 👋 I'm an AI chatbot created with Python!"
    await message.reply(response)
    ai_bot.command_stats['hello'] = ai_bot.command_stats.get('hello', 0) + 1

async def handle_mood(message):
    """Handle mood analysis command"""
    if not sia:
        await message.reply("⚠️ Sentiment analysis not available. Install NLTK: `pip install nltk`")
        return

    # Get user's recent messages for mood analysis
    user_id = str(message.author.id)
    if user_id in ai_bot.user_moods and ai_bot.user_moods[user_id]:
        recent_moods = ai_bot.user_moods[user_id][-5:]  # Last 5 interactions
        mood_counts = {
            'positive': recent_moods.count('positive'),
            'negative': recent_moods.count('negative'),
            'neutral': recent_moods.count('neutral')
        }

        dominant_mood = max(mood_counts, key=mood_counts.get)
        mood_emoji = {'positive': '😊', 'negative': '😔', 'neutral': '😐'}[dominant_mood]

        response = f"Based on our recent conversations, you seem {dominant_mood} {mood_emoji}"
        await message.reply(response)
    else:
        await message.reply("I don't have enough conversation history to analyze your mood yet. Let's chat more!")

    ai_bot.command_stats['mood'] = ai_bot.command_stats.get('mood', 0) + 1

async def handle_stats(message):
    """Handle statistics command"""
    embed = discord.Embed(
        title="🤖 Bot Statistics",
        color=0x00ff00,
        timestamp=datetime.utcnow()
    )

    embed.add_field(name="🖥️ Servers", value=str(len(bot.guilds)), inline=True)
    embed.add_field(name="👥 Users", value=str(len(bot.users)), inline=True)
    embed.add_field(name="⏰ Uptime", value=f"{int(bot.uptime / 3600)}h", inline=True)

    # Command usage stats
    if ai_bot.command_stats:
        stats_text = ""
        for cmd, count in ai_bot.command_stats.items():
            stats_text += f"{cmd}: {count}\\n"
        embed.add_field(name="📊 Command Usage", value=f"```{stats_text}```", inline=False)

    await message.reply(embed=embed)

async def handle_help(message):
    """Handle help command"""
    help_text = """
🤖 **AI Chatbot Commands:**

**Basic Commands:**
`!ping` - Check bot latency
`!hello` - Get a friendly greeting
`!help` - Show this help message

**AI Features:**
`!mood` - Analyze your conversation mood
`!stats` - View bot statistics

**How to chat:**
Just send any message (without !) and I'll respond intelligently!

**Features:**
• Sentiment analysis
• Mood tracking
• Personalized responses
• Learning from conversations
    """
    await message.reply(help_text)

# Command mapping
COMMANDS = {
    'ping': handle_ping,
    'hello': handle_hello,
    'mood': handle_mood,
    'stats': handle_stats,
    'help': handle_help
}

@bot.event
async def on_ready():
    """Called when bot is ready"""
    print("🤖 AI Chatbot is online!")
    print(f"📊 Connected to {len(bot.guilds)} servers")
    print(f"👥 Serving {len(bot.users)} users")
    print(f"🔧 AI Features: {'Enabled' if NLTK_AVAILABLE else 'Limited (install nltk for full features)'}")

    # Set bot status
    await bot.change_presence(activity=discord.Game(name="Learning Python! 🐍"))

@bot.event
async def on_message(message):
    """Handle incoming messages"""
    # Ignore bot messages
    if message.author == bot.user:
        return

    content = message.content.strip()

    # Handle commands (messages starting with prefix)
    if content.startswith(PREFIX):
        command = content[len(PREFIX):].lower().split()[0]

        if command in COMMANDS:
            try:
                await COMMANDS[command](message)
                logging.info(f"Executed command: {command} by {message.author}")
            except Exception as e:
                logging.error(f"Error executing command {command}: {e}")
                await message.reply("❌ Sorry, there was an error executing that command.")
        else:
            await message.reply(f"❓ Unknown command: `{command}`. Use `!help` for available commands.")

    # Handle regular conversation (AI responses)
    elif content:
        try:
            user_id = str(message.author.id)

            # Analyze message
            sentiment = ai_bot.analyze_sentiment(content)
            intent = ai_bot.detect_intent(content)

            # Generate AI response
            ai_response = ai_bot.get_personalized_response(user_id, sentiment, intent)

            # Learn from this interaction
            ai_bot.learn_from_interaction(user_id, content, ai_response)

            # Send response
            await message.reply(ai_response)

            logging.info(f"AI Response to {message.author}: {sentiment}/{intent}")

        except Exception as e:
            logging.error(f"Error in AI response: {e}")
            await message.reply("🤔 I'm having trouble processing that. Can you try rephrasing?")

@bot.event
async def on_error(event, *args, **kwargs):
    """Handle bot errors"""
    logging.error(f"Bot error in {event}: {args} {kwargs}")

# Graceful shutdown
async def shutdown():
    """Cleanup on shutdown"""
    print("\\n🛑 Shutting down bot...")
    await bot.close()

# Main execution
async def main():
    """Main bot execution"""
    if not TOKEN:
        print("❌ DISCORD_BOT_TOKEN not found in .env file!")
        print("💡 Get your bot token from https://discord.com/developers/applications")
        return

    try:
        await bot.start(TOKEN)
    except KeyboardInterrupt:
        await shutdown()
    except Exception as e:
        logging.error(f"Failed to start bot: {e}")
        print(f"❌ Failed to start bot: {e}")

if __name__ == "__main__":
    asyncio.run(main())



