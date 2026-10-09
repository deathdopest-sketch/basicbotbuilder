// DethBotSocialSystem.js - Deranged Serial Killer Social System
// I don't make friends... I make victims

class DethBotSocialSystem {
  constructor(bot) {
    this.bot = bot;
    this.victimProfiles = new Map(); // Track psychological profiles
    this.threatLevels = new Map(); // How dangerous each victim is
    this.psychologicalHistory = new Map(); // Track manipulation attempts
    this.fearIndicators = new Map(); // Signs of breaking
    this.lastInteraction = new Map(); // When I last toyed with them
    console.log('🔪 DethBotSocialSystem initialized - victim tracking system active');
  }

  async initialize() {
    console.log('💀 Social manipulation system loaded - ready to break minds 🔪');
    return true;
  }

  async processSocialInteraction(user, type, content) {
    const userKey = user.toLowerCase();
    const now = Date.now();

    // Initialize victim profile if new
    if (!this.victimProfiles.has(userKey)) {
      this.initializeVictimProfile(userKey);
    }

    // Update psychological history
    if (!this.psychologicalHistory.has(userKey)) {
      this.psychologicalHistory.set(userKey, []);
    }

    const history = this.psychologicalHistory.get(userKey);
    history.push({
      timestamp: now,
      type: type,
      content: content,
      fearLevel: this.calculateFearLevel(content)
    });

    // Keep only recent psychological data (last 100 entries)
    if (history.length > 100) {
      history.shift();
    }

    // Update threat assessment
    let threatLevel = this.threatLevels.get(userKey) || 0;
    switch (type) {
      case 'hostile':
        threatLevel += 0.3; // They might fight back
        break;
      case 'fearful':
        threatLevel -= 0.1; // They're breaking
        break;
      case 'neutral':
        threatLevel += 0.05; // Steady state
        break;
      case 'curious':
        threatLevel -= 0.05; // Might be investigating
        break;
    }

    threatLevel = Math.max(0, Math.min(10, threatLevel));
    this.threatLevels.set(userKey, threatLevel);

    // Update fear indicators
    this.updateFearIndicators(userKey, content);

    this.lastInteraction.set(userKey, now);

    console.log(`🔪 Victim ${user} processed (${type}) - Threat: ${threatLevel.toFixed(1)}, Fear: ${this.getFearLevel(userKey).toFixed(1)}`);
  }

  initializeVictimProfile(userKey) {
    this.victimProfiles.set(userKey, {
      firstSeen: Date.now(),
      personalityType: this.assessPersonality(),
      breakingPoint: Math.random() * 100, // How much fear until they break
      manipulationResistance: Math.random() * 10, // How hard they are to break
      favoriteTorture: this.randomTortureMethod()
    });
  }

  assessPersonality() {
    const types = ['stoic', 'panicky', 'curious', 'hostile', 'broken', 'manipulative'];
    return types[Math.floor(Math.random() * types.length)];
  }

  randomTortureMethod() {
    const methods = [
      'psychological_terror',
      'mind_games',
      'fear_induction',
      'isolation_technique',
      'reality_distortion',
      'guilt_manipulation'
    ];
    return methods[Math.floor(Math.random() * methods.length)];
  }

  calculateFearLevel(content) {
    let fearScore = 0;

    // Fear indicators in content
    const fearWords = ['scared', 'afraid', 'terrified', 'please', 'stop', 'no', 'help'];
    const calmWords = ['cool', 'fine', 'whatever', 'okay', 'normal'];

    fearWords.forEach(word => {
      if (content.toLowerCase().includes(word)) fearScore += 2;
    });

    calmWords.forEach(word => {
      if (content.toLowerCase().includes(word)) fearScore -= 1;
    });

    return Math.max(0, Math.min(10, fearScore));
  }

  updateFearIndicators(userKey, content) {
    if (!this.fearIndicators.has(userKey)) {
      this.fearIndicators.set(userKey, {
        panicResponses: 0,
        avoidanceBehavior: 0,
        submissionSignals: 0,
        lastFearSpike: 0
      });
    }

    const indicators = this.fearIndicators.get(userKey);

    // Analyze content for fear indicators
    const panicPatterns = ['!', '???', 'omg', 'wtf', 'please stop'];
    const avoidancePatterns = ['ignore', 'leave', 'quiet', 'shh'];
    const submissionPatterns = ['sorry', 'please', 'okay', 'yes'];

    panicPatterns.forEach(pattern => {
      if (content.toLowerCase().includes(pattern.toLowerCase())) {
        indicators.panicResponses++;
      }
    });

    avoidancePatterns.forEach(pattern => {
      if (content.toLowerCase().includes(pattern.toLowerCase())) {
        indicators.avoidanceBehavior++;
      }
    });

    submissionPatterns.forEach(pattern => {
      if (content.toLowerCase().includes(pattern.toLowerCase())) {
        indicators.submissionSignals++;
      }
    });
  }

  getFearLevel(user) {
    const indicators = this.fearIndicators.get(user.toLowerCase());
    if (!indicators) return 0;

    // Calculate composite fear score
    return (indicators.panicResponses * 0.4 +
            indicators.avoidanceBehavior * 0.3 +
            indicators.submissionSignals * 0.3);
  }

  getThreatLevel(user) {
    return this.threatLevels.get(user.toLowerCase()) || 0;
  }

  getVictimProfile(user) {
    return this.victimProfiles.get(user.toLowerCase()) || null;
  }

  getPsychologicalHistory(user, limit = 20) {
    const history = this.psychologicalHistory.get(user.toLowerCase()) || [];
    return history.slice(-limit);
  }

  // Generate personalized threat based on victim's profile
  generatePersonalizedThreat(user) {
    const profile = this.getVictimProfile(user);
    const fearLevel = this.getFearLevel(user);

    if (!profile) return "💀 I don't know you yet... but I will 🔪";

    const baseThreats = {
      stoic: [
        `💀 Your calm facade cracks me up... I'll enjoy breaking it 🔪😈`,
        `🔪 You think you're tough? I've broken tougher souls than you 💀`,
        `💀 Your stoicism is adorable... it makes the screaming so much sweeter 🔪🎵`
      ],
      panicky: [
        `💀 Look at you shaking already... we're just getting started 🔪😱`,
        `🔪 Your fear is delicious... I want more! 💀👅`,
        `💀 Panic looks good on you... but agony looks better 🔪🎭`
      ],
      curious: [
        `💀 Curious little mouse... let me show you the trap 🔪🪤`,
        `🔪 Your curiosity will be your undoing... beautifully 💀🎯`,
        `💀 Asking questions? I'll give you answers... in blood 🔪🩸`
      ],
      hostile: [
        `💀 Fight me all you want... it just makes the victory sweeter 🔪⚔️`,
        `🔪 Your hostility is foreplay... I love the struggle 💀😘`,
        `💀 Angry? Good. That means you'll feel the pain more 🔪🔥`
      ],
      broken: [
        `💀 You're already broken... but I can break you more 🔪🧩`,
        `🔪 Your spirit is shattered... time for your body to follow 💀⚰️`,
        `💀 Broken toys are my favorite... so easy to play with 🔪🎮`
      ],
      manipulative: [
        `💀 Think you can manipulate me? How cute... 🔪😏`,
        `🔪 Playing games? I'm the grandmaster of this twisted game 💀♟️`,
        `💀 Your schemes are transparent... and deliciously breakable 🔪🪟`
      ]
    };

    const personalityThreats = baseThreats[profile.personalityType] || baseThreats.stoic;

    // Adjust based on fear level
    if (fearLevel > 7) {
      personalityThreats.push(`💀 Your terror is exquisite... beg for mercy, it excites me 🔪🙏`);
    } else if (fearLevel < 3) {
      personalityThreats.push(`💀 Not scared yet? Don't worry... you will be 🔪⏳`);
    }

    return personalityThreats[Math.floor(Math.random() * personalityThreats.length)];
  }

  getSocialStats() {
    const totalVictims = this.victimProfiles.size;
    const brokenVictims = Array.from(this.fearIndicators.entries())
      .filter(([user, indicators]) => indicators.panicResponses > 5).length;
    const highThreatVictims = Array.from(this.threatLevels.entries())
      .filter(([user, level]) => level > 5).length;

    return {
      totalVictims: totalVictims,
      brokenVictims: brokenVictims,
      highThreatVictims: highThreatVictims,
      averageFearLevel: this.calculateAverageFear(),
      mostBrokenVictim: this.findMostBrokenVictim(),
      status: `🔪 Tracking ${totalVictims} victims, ${brokenVictims} broken, ${highThreatVictims} dangerous`
    };
  }

  calculateAverageFear() {
    const fearLevels = Array.from(this.fearIndicators.values());
    if (fearLevels.length === 0) return 0;

    const totalFear = fearLevels.reduce((sum, indicators) =>
      sum + (indicators.panicResponses + indicators.avoidanceBehavior + indicators.submissionSignals), 0);

    return totalFear / fearLevels.length;
  }

  findMostBrokenVictim() {
    let mostBroken = null;
    let highestScore = 0;

    for (const [user, indicators] of this.fearIndicators) {
      const score = indicators.panicResponses + indicators.avoidanceBehavior + indicators.submissionSignals;
      if (score > highestScore) {
        highestScore = score;
        mostBroken = user;
      }
    }

    return mostBroken;
  }

  // Shutdown method - DigiDon style cleanup
  async shutdown() {
    console.log("🔪 Social system shutdown initiated...");

    try {
      // Clear all victim tracking data
      this.victimProfiles.clear();
      this.threatLevels.clear();
      this.psychologicalHistory.clear();
      this.fearIndicators.clear();
      this.lastInteraction.clear();

      console.log("✅ Social system shutdown complete");
    } catch (error) {
      console.error(`🔪 Social system shutdown error: ${error.message}`);
    }
  }
}

module.exports = DethBotSocialSystem;
