// 3X_XE Positivity Database
// Created by D****l "Death" N****n
// Collection of uplifting posts designed to garner likes and engagement

const positivity = {
    // Motivational quotes with emojis
    motivational: [
        "🌅 Every sunrise is an invitation to brighten someone's day. Your kindness can change the world!",
        "💪 Believe you can and you're halfway there. Keep pushing forward! 🚀",
        "🌟 Your potential is limitless. Dream big, work hard, stay positive! ✨",
        "🌈 Behind every storm is a rainbow waiting to shine. Never give up! ☀️",
        "💖 Small acts of kindness can create big waves of change. Be the light! ✨",
        "🚀 Every expert was once a beginner. Your journey matters! Keep going! 💪",
        "🌸 Growth happens outside your comfort zone. Embrace the challenge! 🌱",
        "⭐ You are capable of amazing things. Believe in yourself! 🌟",
        "🌅 Start your day with gratitude and end it with hope. You're doing great! 🙏",
        "💫 Your smile can light up someone's entire day. Keep shining! 😊",
        "🌟 Every moment is a fresh beginning. Choose joy today! ✨",
        "💪 Your strength inspires others. Keep being amazing! 🌈",
        "🌸 Progress, not perfection. You're on the right path! 🚶‍♀️",
        "⭐ Your uniqueness is your superpower. Embrace it! 💫",
        "🌅 Wake up with determination, go to bed with satisfaction. Dream big! 💤"
    ],

    // Heartwarming messages
    heartwarming: [
        "🤗 Sometimes the smallest things take up the most room in your heart. Cherish them! 💝",
        "🌟 You're not just surviving, you're thriving. Be proud of yourself! 🙌",
        "💖 Your existence makes the world a little brighter. Thank you for being you! ✨",
        "🌸 Every day is a new opportunity to spread love and kindness. Make it count! ❤️",
        "🤝 We rise by lifting others. Your compassion changes lives! 🙏",
        "🌟 Your journey inspires someone else. Keep being authentic! 💫",
        "💕 The world becomes a better place when you choose to be kind. Thank you! 🙏",
        "🌈 Your positive energy is contagious. Keep spreading the love! ✨",
        "🤗 Sometimes all someone needs is a little encouragement. You might be that someone! 💪",
        "💖 Your smile has the power to heal. Keep smiling! 😊",
        "🌸 Small gestures of love can make someone's day extraordinary. Be that person! ❤️",
        "🌟 Your light shines brighter than you know. Keep illuminating the world! ✨",
        "💕 Kindness is free, sprinkle that stuff everywhere! 🌈",
        "🤝 Together we can create a world filled with love and compassion. Start with you! 🙌",
        "🌸 Your positive attitude is your greatest strength. Own it! 💪"
    ],

    // Inspirational life lessons
    inspirational: [
        "🌱 What you water grows. Water your dreams, not your fears! 💧",
        "🚀 Success is not final, failure is not fatal. Keep moving forward! 💪",
        "🌟 The only way to do great work is to love what you do. Find your passion! ❤️",
        "💫 Your mindset determines your reality. Choose positivity! ✨",
        "🌈 Every accomplishment starts with the decision to try. You've got this! 🙌",
        "🌱 Growth happens when you step outside your comfort zone. Be brave! 🚀",
        "💪 Your potential is endless. Never stop believing in yourself! ⭐",
        "🌟 The best time to start was yesterday. The next best time is now! ⏰",
        "🌸 Your dreams don't work unless you do. Keep grinding! 💎",
        "🚀 Every expert was once a beginner. Your journey is valid! 🙏",
        "💫 The difference between ordinary and extraordinary is that little extra. Give it! ⭐",
        "🌈 Your future self will thank you for not giving up. Keep going! 💪",
        "🌱 What lies behind us and what lies before us are tiny matters compared to what lies within us. 💫",
        "💪 The only person you should compare yourself to is the person you were yesterday. 🌟",
        "🌸 Every day may not be good, but there's something good in every day. Find it! 🙏"
    ],

    // Gratitude and appreciation
    gratitude: [
        "🙏 Grateful for the little things that make life beautiful. What's making you smile today? 😊",
        "💝 Thank you to everyone who shows up for others. Your kindness matters! 🌟",
        "🌸 Grateful for new beginnings and fresh starts. What's your fresh start today? ✨",
        "🙌 Thankful for the people who believe in me. Your support means everything! ❤️",
        "🌟 Grateful for the lessons that made me stronger. Growth hurts, but it's worth it! 💪",
        "💖 Thank you to the universe for another beautiful day. Make it count! 🌅",
        "🌸 Grateful for the love that surrounds me. It's the greatest gift! 💕",
        "🙏 Thankful for the challenges that shaped me. They made me who I am today! 🌟",
        "💫 Grateful for the moments that take my breath away. Life is beautiful! ✨",
        "🌈 Thank you for being part of my journey. Your presence matters! 🙌",
        "💝 Grateful for the simple joys that make life extraordinary. Cherish them! 🌸",
        "🙌 Thankful for the people who lift me up. Your encouragement means the world! 💪",
        "🌟 Grateful for second chances and fresh beginnings. What's your second chance? ✨",
        "💖 Thank you to everyone who spreads positivity. You're making the world better! 🌈",
        "🌸 Grateful for the love, laughter, and lessons. Life is a beautiful journey! 🙏"
    ],

    // Get random positivity content
    getRandom: function() {
        const allContent = [
            ...this.motivational,
            ...this.heartwarming,
            ...this.inspirational,
            ...this.gratitude
        ];
        return allContent[Math.floor(Math.random() * allContent.length)];
    },

    getRandomMotivational: function() {
        return this.motivational[Math.floor(Math.random() * this.motivational.length)];
    },

    getRandomHeartwarming: function() {
        return this.heartwarming[Math.floor(Math.random() * this.heartwarming.length)];
    },

    getRandomInspirational: function() {
        return this.inspirational[Math.floor(Math.random() * this.inspirational.length)];
    },

    getRandomGratitude: function() {
        return this.gratitude[Math.floor(Math.random() * this.gratitude.length)];
    },

    // Get content by category
    getByCategory: function(category) {
        switch(category) {
            case 'motivational':
                return this.getRandomMotivational();
            case 'heartwarming':
                return this.getRandomHeartwarming();
            case 'inspirational':
                return this.getRandomInspirational();
            case 'gratitude':
                return this.getRandomGratitude();
            default:
                return this.getRandom();
        }
    },

    // Get trending positivity topics
    getTrendingTopics: function() {
        return [
            "#MotivationMonday",
            "#PositiveVibes",
            "#Gratitude",
            "#Inspiration",
            "#Kindness",
            "#SelfLove",
            "#GrowthMindset",
            "#DreamBig",
            "#NeverGiveUp",
            "#ChooseJoy"
        ];
    }
};

module.exports = positivity;
