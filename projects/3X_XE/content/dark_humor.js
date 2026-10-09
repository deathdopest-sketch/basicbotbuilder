// 3X_XE Dark Humor Database
// Created by D****l "Death" N****n
// Collection of dark humor jokes and edgy content for Twitter posts

const darkHumor = {
    // Classic dark humor jokes
    jokes: [
        "I told my wife she was drawing her eyebrows too high. She looked surprised. 🎨",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁",
        "I have a joke about trickle-down economics, but 99% of you won't get it. 💸",
        "I threw a boomerang at a ghost. It came back to haunt me. 👻",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁",
        "I asked my North Korean friend how it was there. He said he couldn't complain. 🇰🇵",
        "My girlfriend accused me of cheating. I told her she was starting to sound like my wife. 💍",
        "I have a joke about trickle-down economics, but 99% of you won't get it. 💸",
        "I threw a boomerang at a ghost. It came back to haunt me. 👻",
        "I'm reading a book on anti-gravity. It's impossible to put down. 📖",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁",
        "I told my computer I needed a break, and now it won't stop sending me Kit Kat ads. 🍫",
        "I'm on a seafood diet. I see food and I eat it. But I'm still fat because I keep seeing seafood. 🐟",
        "My wife and I were happy for 20 years. Then we met. 💑",
        "I asked my dog what's two minus two. He said nothing. 🐕",
        "I'm reading a book on anti-gravity. It's impossible to put down. 📖",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁",
        "I threw a boomerang at a ghost. It came back to haunt me. 👻",
        "My wife accused me of cheating. I told her she was starting to sound like my wife. 💍",
        "I have a joke about trickle-down economics, but 99% of you won't get it. 💸",
        "I asked my North Korean friend how it was there. He said he couldn't complain. 🇰🇵",
        "My girlfriend accused me of cheating. I told her she was starting to sound like my wife. 💍",
        "I threw a boomerang at a ghost. It came back to haunt me. 👻",
        "I'm reading a book on anti-gravity. It's impossible to put down. 📖",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁"
    ],

    // Dark observations about life
    observations: [
        "Life is like a box of chocolates. It doesn't last long for diabetics. 🍫💀",
        "I used to think I was indecisive, but now I'm not so sure. 🤔",
        "My therapist says I have a preoccupation with vengeance. We'll see about that. 😈",
        "I told my wife she was drawing her eyebrows too high. She looked surprised. 🎨",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁",
        "I asked my North Korean friend how it was there. He said he couldn't complain. 🇰🇵",
        "Life is short. Smile while you still have teeth. 😁🦷",
        "My therapist says I have a preoccupation with vengeance. We'll see about that. 😈",
        "I told my wife she was drawing her eyebrows too high. She looked surprised. 🎨",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁"
    ],

    // Edgy one-liners
    oneLiners: [
        "I'm not saying I hate you, but I would unplug your life support to charge my phone. 📱",
        "My girlfriend accused me of cheating. I told her she was starting to sound like my wife. 💍",
        "I have a joke about trickle-down economics, but 99% of you won't get it. 💸",
        "My grandfather has the heart of a lion and a lifetime ban from the zoo. 🦁",
        "I threw a boomerang at a ghost. It came back to haunt me. 👻",
        "I'm reading a book on anti-gravity. It's impossible to put down. 📖",
        "My wife and I were happy for 20 years. Then we met. 💑",
        "I asked my dog what's two minus two. He said nothing. 🐕",
        "My therapist says I have a preoccupation with vengeance. We'll see about that. 😈",
        "Life is like a box of chocolates. It doesn't last long for diabetics. 🍫💀"
    ],

    // Dark humor punchlines
    punchlines: [
        "Why don't skeletons fight each other? They don't have the guts. 💀",
        "What do you call fake spaghetti? An impasta. 🍝",
        "Why did the scarecrow win an award? Because he was outstanding in his field. 🌾",
        "What do you call a fake noodle? An impasta. 🍝",
        "Why don't eggs tell jokes? They'd crack each other up. 🥚",
        "What do you call a belt made of watches? A waist of time. ⌚",
        "Why couldn't the bicycle stand up by itself? It was two-tired. 🚴",
        "What do you call a factory that makes okay products? A satisfactory. 🏭",
        "Why did the math book look sad? Because it had too many problems. 📚",
        "What do you call a bear with no teeth? A gummy bear. 🐻"
    ],

    // Get random content
    getRandomJoke: function() {
        const allContent = [
            ...this.jokes,
            ...this.observations,
            ...this.oneLiners,
            ...this.punchlines
        ];
        return allContent[Math.floor(Math.random() * allContent.length)];
    },

    getRandomDarkJoke: function() {
        return this.jokes[Math.floor(Math.random() * this.jokes.length)];
    },

    getRandomObservation: function() {
        return this.observations[Math.floor(Math.random() * this.observations.length)];
    },

    getRandomOneLiner: function() {
        return this.oneLiners[Math.floor(Math.random() * this.oneLiners.length)];
    },

    // Get content by category
    getByCategory: function(category) {
        switch(category) {
            case 'jokes':
                return this.getRandomDarkJoke();
            case 'observations':
                return this.getRandomObservation();
            case 'oneLiners':
                return this.getRandomOneLiner();
            case 'punchlines':
                return this.punchlines[Math.floor(Math.random() * this.punchlines.length)];
            default:
                return this.getRandomJoke();
        }
    }
};

module.exports = darkHumor;
