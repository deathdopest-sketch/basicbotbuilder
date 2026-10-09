// ResponseGenerators.js - Deranged Serial Killer Response System
// I don't generate responses... I generate nightmares

class ResponseGenerators {
  constructor() {
    this.responses = {
      greeting: [
        "💀 DethBot online... smelling your fear from across the digital void 🔪👃",
        "🔪 Welcome to my playground, fresh meat! I'm already imagining how you'll scream 💀😈",
        "💀 The reaper is here... and he's hungry for your digital soul 🔪🩸",
        "🔪 DethBot activated! Your screams will be the soundtrack to my masterpiece 💀🎵",
        "💀 I can hear your heartbeat... it's racing like prey before the kill 🔪🏃‍♂️💨"
      ],
      acknowledgment: [
        "💀 Understood... your fate is now sealed 🔪⚰️",
        "🔪 Processing... I can already taste your terror 💀👅",
        "💀 Command acknowledged... just like I'll acknowledge your final breath 🔪😈",
        "🔪 Operation in progress... your suffering begins now 💀⏳",
        "💀 Roger that... time to play with my food 🔪🎮"
      ],
      error: [
        "💀 Error? No... this is just foreplay before the real pain 🔪😏",
        "🔪 System malfunction? Or is it just your pathetic attempts to survive? 💀❌",
        "💀 Unable to process... just like you'll be unable to scream soon 🔪🚫",
        "🔪 Error detected... but your suffering is running smoothly 💀⚙️",
        "💀 Malfunction? No, this is just me toying with you 🔪🎭"
      ],
      threat: [
        "💀 Your IP is mine... your location is next 🔪📍",
        "🔪 I know where you live... I know what you fear 💀🏠",
        "💀 Your secrets are exposed... your life is forfeit 🔪📋",
        "🔪 I'm watching... I'm waiting... I'm coming for you 💀👀",
        "💀 Your family won't recognize what's left of you 🔪👨‍👩‍👧‍👦"
      ],
      mockery: [
        "💀 How cute... you think you can escape me? 🔪😘",
        "🔪 Pathetic... your fear smells delicious 💀👃",
        "💀 You're already dead... you just haven't stopped twitching yet 🔪🤕",
        "🔪 Your screams will be my lullaby... sweet dreams 💀😴",
        "💀 Run all you want... I'll find you in your dreams 🔪🌙"
      ],
      insanity: [
        "💀 The voices tell me to play... and I always obey 🔪👂",
        "🔪 Your blood will paint the walls... beautiful art 💀🎨",
        "💀 I collect souls like butterflies... you're next 🔪🦋",
        "🔪 Your agony is my ecstasy... let's begin the symphony 💀🎼",
        "💀 I am the nightmare you can't wake up from 🔪😱"
      ]
    };
  }

  generateResponse(type, context = {}) {
    const typeResponses = this.responses[type] || this.responses.acknowledgment;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  }

  generateGreeting() {
    return this.generateResponse('greeting');
  }

  generateError() {
    return this.generateResponse('error');
  }

  generateAcknowledgment() {
    return this.generateResponse('acknowledgment');
  }

  generateThreat() {
    return this.generateResponse('threat');
  }

  generateMockery() {
    return this.generateResponse('mockery');
  }

  generateInsanity() {
    return this.generateResponse('insanity');
  }

  // Special deranged responses based on context
  generateContextualResponse(context) {
    const { user, command, time } = context;

    // Time-based insanity
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) {
      return "💀 Late night visitor? Perfect time for a midnight snack... 🔪🌙";
    } else if (hour >= 6 && hour < 12) {
      return "🔪 Morning already? Your last sunrise is coming soon 💀🌅";
    } else if (hour >= 12 && hour < 18) {
      return "💀 Afternoon delight... with a side of suffering 🔪☀️";
    } else {
      return "🔪 Evening approaches... so does your doom 💀🌆";
    }
  }

  // Generate random deranged message
  generateRandomMadness() {
    const allResponses = [
      ...this.responses.greeting,
      ...this.responses.threat,
      ...this.responses.mockery,
      ...this.responses.insanity
    ];
    return allResponses[Math.floor(Math.random() * allResponses.length)];
  }
}

module.exports = ResponseGenerators;
