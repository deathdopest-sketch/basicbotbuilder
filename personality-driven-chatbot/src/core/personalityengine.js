// src/core/PersonalityEngine.js - Complete functional personality-driven chatbot engine
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
require('dotenv').config();

class PersonalityEngine {
  constructor() {
    console.log('🤖 Initializing Personality Engine...');
    
    // Load personality configuration
    this.loadPersonalityConfig();
    
    // Core system properties
    this.lastSeen = new Map();
    this.messageHistory = new Set();
    this.lastSentTime = 0;
    this.triggerCooldowns = new Map();
    this.commandAttempts = new Map();
    this.roomConfigs = new Map();
    this.roomPages = new Map();
    this.isProcessing = false;
    this._sendChain = Promise.resolve();
    this._sendMinGapMs = 400;
    this.globalMute = false;
    this._lastQueuedText = "";
    this._lastQueuedAt = 0;

    // Enhanced systems for personality
    this.lastCommandTime = new Map();
    this.commandCooldown = 2000;
    this.recentMessages = new Map();
    this.maxRecentMessages = 100;
    this.botResponseCooldown = 1000;
    this.lastBotResponseTime = 0;
    this.messageCounter = 0;
    this.lastProcessedMessageIds = new Set();
    this.messageIdTimestamps = new Map();

    // Personality-driven properties
    this.currentEmotionalState = { ...this.personality.emotionalProfile.baseEmotions };
    this.userRelationships = new Map();
    this.conversationContext = new Map();
    this.emotionalMemory = new Map();
    this.userMemory = new Map();
    this.privilegedUsers = new Set();
    this.blockedUsers = new Set();
    this.nicknameToUsername = new Map();
    this.usernameToNickname = new Map();

    // Bot configuration from environment
    this.CONFIG = {
      OWNER_NICK: this.personality.identity.creator,
      BOT_USER: process.env.BOT_USERNAME || "your_bot_username",
      BOT_PASS: process.env.BOT_PASSWORD || "your_bot_password", 
      ROOMS: [
        { name: process.env.PRIMARY_ROOM || "your_primary_room", botNick: this.personality.identity.name }
      ],
      USE_WEBSOCKET: false
    };

    // Validate configuration
    this.validateConfiguration();

    console.log(`🤖 ${this.personality.identity.displayName} initialization complete`);
    console.log(`💭 Purpose: ${this.personality.identity.purpose}`);
  }

  validateConfiguration() {
    console.log('🔍 Validating bot configuration...');
    
    if (this.CONFIG.BOT_USER === "your_bot_username" || this.CONFIG.BOT_PASS === "your_bot_password") {
      console.log('❌ ERROR: Bot credentials not configured!');
      console.log('📝 Please edit your .env file with actual bot credentials:');
      console.log('   BOT_USERNAME=your_actual_bot_username');
      console.log('   BOT_PASSWORD=your_actual_bot_password');
      console.log('   PRIMARY_ROOM=your_actual_room_name');
      console.log('\n🛑 Bot cannot start without proper credentials.');
      process.exit(1);
    }
    
    if (this.CONFIG.ROOMS[0].name === "your_primary_room") {
      console.log('⚠️  WARNING: Using default room name. Update PRIMARY_ROOM in .env file.');
    }
    
    console.log('✅ Configuration validated');
  }

  loadPersonalityConfig() {
    try {
      const configPath = './config/personality.js';
      if (fsSync.existsSync(configPath)) {
        const config = require(path.resolve(configPath));
        this.personality = config.botPersonality;
        this.templates = config.responseTemplates || {};
        this.behaviors = config.behaviorPatterns || {};
        console.log(`✅ Loaded personality: ${this.personality.identity.name}`);
      } else {
        throw new Error('No personality configuration found');
      }
    } catch (error) {
      console.log('⚠️ Using default personality configuration');
      console.log('💡 Run "npm run create" to generate a custom personality');
      this.personality = this.createDefaultPersonality();
      this.templates = this.createDefaultTemplates();
      this.behaviors = this.createDefaultBehaviors();
    }
  }

  createDefaultPersonality() {
    return {
      identity: {
        name: "PersonalityBot",
        displayName: "Personality-Driven Assistant",
        pronouns: "they/them",
        background: "I am a helpful AI assistant with a configurable personality",
        purpose: "to assist users and demonstrate personality-driven responses",
        creator: "User",
        nickname: "Bot",
        species: "AI",
        age: "newly created",
        origin: "digital realm"
      },
      emotionalProfile: {
        baseEmotions: {
          happiness: 0.7, trust: 0.6, love: 0.5, protectiveness: 0.6,
          curiosity: 0.8, empathy: 0.8, playfulness: 0.6, anxiety: 0.2, suspicion: 0.1
        },
        emotionalVolatility: 0.3
      },
      communicationStyle: {
        formality: 0.3, emotiveness: 0.7, verbosity: 0.6, humor: 0.7,
        useEmojis: true, useAsterisks: false, useSlang: true,
        asksQuestions: true, sharesPersonalThoughts: true, remembersConversations: true
      }
    };
  }

  createDefaultTemplates() {
    return {
      greetings: {
        general: ["Hello {nick}! Great to see you here!"],
        newUser: ["Welcome {nick}! I'm {botName}, nice to meet you!"],
        returning: ["Hey {nick}! Good to see you again!"]
      },
      emotional: {
        supportive: ["{nick}, I'm here for you. Want to talk about what's bothering you?"],
        celebratory: ["🎉 {nick}! That's amazing news! I'm so happy for you!"],
        affectionate: ["{nick}, you bring such joy to this place!"]
      }
    };
  }

  createDefaultBehaviors() {
    return {
      responseProbabilities: {
        randomConversation: 0.05,
        reactToEmotions: 0.7,
        greetNewUsers: 0.8,
        askFollowUpQuestions: 0.4,
        offerHelp: 0.6
      },
      emotionalReactions: {
        detectionKeywords: {
          sadness: ["sad", "depressed", "down", "upset", "crying", "hurt"],
          happiness: ["happy", "excited", "great", "awesome", "amazing", "love"],
          anger: ["angry", "mad", "furious", "annoyed"],
          fear: ["scared", "afraid", "worried", "anxious", "nervous"]
        }
      }
    };
  }

  // Personality-driven response generation
  generatePersonalityResponse(templateCategory, subcategory, variables = {}) {
    try {
      const templates = this.templates[templateCategory];
      if (!templates || !templates[subcategory]) {
        return null;
      }

      const templateArray = templates[subcategory];
      const template = templateArray[Math.floor(Math.random() * templateArray.length)];
      
      let response = template;
      
      const standardVars = {
        nick: variables.nick || 'friend',
        botName: this.personality.identity.name,
        displayName: this.personality.identity.displayName,
        owner: this.personality.identity.creator,
        userType: this.getUserRelationshipLevel(variables.nick) || 'friend',
        ...variables
      };

      for (const [key, value] of Object.entries(standardVars)) {
        const regex = new RegExp(`\\{${key}\\}`, 'g');
        response = response.replace(regex, value);
      }

      return response;
    } catch (error) {
      console.log(`Error generating personality response: ${error.message}`);
      return null;
    }
  }

  // User relationship management
  getUserRelationshipLevel(username) {
    if (!username) return 'stranger';
    
    const userKey = username.toLowerCase();
    const relationship = this.userRelationships.get(userKey);
    
    if (this.isOwner(username)) {
      return 'creator';
    }
    
    if (this.isPrivilegedUser(username)) {
      return 'friend';
    }
    
    return relationship?.level || 'stranger';
  }

  updateUserRelationship(username, interactionType, emotionalContext = null) {
    if (!username) return;
    
    const userKey = username.toLowerCase();
    let relationship = this.userRelationships.get(userKey) || {
      level: 'stranger',
      interactions: 0,
      firstMet: new Date().toISOString(),
      lastInteraction: new Date().toISOString(),
      emotionalHistory: []
    };

    relationship.interactions++;
    relationship.lastInteraction = new Date().toISOString();

    if (emotionalContext) {
      relationship.emotionalHistory.push({
        type: emotionalContext,
        timestamp: new Date().toISOString(),
        interactionType: interactionType
      });
      
      if (relationship.emotionalHistory.length > 10) {
        relationship.emotionalHistory = relationship.emotionalHistory.slice(-10);
      }
    }

    // Simple relationship evolution
    if (relationship.interactions >= 20 && relationship.level === 'stranger') {
      relationship.level = 'acquaintance';
    } else if (relationship.interactions >= 50 && relationship.level === 'acquaintance') {
      relationship.level = 'friend';
    } else if (relationship.interactions >= 100 && relationship.level === 'friend') {
      relationship.level = 'close_friend';
    }
    
    this.userRelationships.set(userKey, relationship);
  }

  // Message processing with personality integration
  async processMessage(messageData, page, room, botNick) {
    const { nick, msg, time } = messageData;
    
    const nickLower = nick.toLowerCase();
    const botNickLower = botNick.toLowerCase();
    
    // Skip bot's own messages
    if (nickLower === botNickLower || nick === this.CONFIG.BOT_USER) {
      return;
    }
    
    // Check if user is blocked
    if (this.isBlockedUser(nick)) {
      return;
    }
    
    const actualUsername = this.getActualUsername(nick);
    
    // Update relationship tracking
    this.updateUserRelationship(actualUsername, "message");
    
    console.log(`[${room}] Processing message from ${nick}: ${msg}`);
    
    // Command detection
    if (msg.startsWith('.')) {
      return await this.handleCommand(page, nick, msg, room, botNick);
    }

    // Emotional detection and response
    const emotionalContext = this.detectEmotionalContent(msg);
    if (emotionalContext) {
      this.updateEmotionalState(emotionalContext.trigger, emotionalContext.intensity);
      this.updateUserRelationship(actualUsername, "emotional_interaction", emotionalContext.type);
      
      if (Math.random() < this.behaviors.responseProbabilities.reactToEmotions) {
        const response = this.generateEmotionalResponse(emotionalContext, nick);
        if (response) {
          setTimeout(async () => {
            await this.sendMsg(page, response, true);
          }, 1000 + Math.random() * 2000);
          return;
        }
      }
    }

    // Check personality triggers
    const triggerResponse = this.checkPersonalityTriggers(msg, actualUsername, room);
    if (triggerResponse) {
      setTimeout(async () => {
        await this.sendMsg(page, triggerResponse, true);
      }, Math.random() * 2000 + 1000);
      return;
    }
    
    // Random personality-driven responses
    if (Math.random() < this.behaviors.responseProbabilities.randomConversation) {
      const randomResponse = this.generateRandomPersonalityResponse(actualUsername, room, msg);
      if (randomResponse) {
        setTimeout(async () => {
          await this.sendMsg(page, randomResponse);
        }, Math.random() * 4000 + 2000);
      }
    }
  }

  // Emotional content detection
  detectEmotionalContent(message) {
    const lowerMsg = message.toLowerCase();
    const keywords = this.behaviors.emotionalReactions.detectionKeywords;
    
    for (const [emotion, words] of Object.entries(keywords)) {
      for (const word of words) {
        if (lowerMsg.includes(word)) {
          return {
            type: emotion,
            trigger: emotion === 'sadness' ? 'user_sadness' : 'positive_interaction',
            intensity: 0.7
          };
        }
      }
    }
    
    return null;
  }

  generateEmotionalResponse(emotionalContext, nick) {
    const responseType = this.getEmotionalResponseType(emotionalContext.type);
    return this.generatePersonalityResponse('emotional', responseType, { nick });
  }

  getEmotionalResponseType(emotionType) {
    switch (emotionType) {
      case 'sadness':
      case 'fear':
        return 'supportive';
      case 'happiness':
        return 'celebratory';
      default:
        return 'affectionate';
    }
  }

  checkPersonalityTriggers(message, username, room) {
    const lowerMsg = message.toLowerCase();
    const botName = this.personality.identity.name.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg.includes(botName)) {
      const now = Date.now();
      const cooldownKey = `greeting_${room}`;
      
      if (this.triggerCooldowns.has(cooldownKey)) {
        const lastTrigger = this.triggerCooldowns.get(cooldownKey);
        if (now - lastTrigger < 30000) return null;
      }
      
      this.triggerCooldowns.set(cooldownKey, now);
      
      const relationshipLevel = this.getUserRelationshipLevel(username);
      const isReturning = this.userRelationships.has(username.toLowerCase());
      
      if (!isReturning) {
        return this.generatePersonalityResponse('greetings', 'newUser', { nick: username });
      } else if (isReturning) {
        return this.generatePersonalityResponse('greetings', 'returning', { nick: username });
      } else {
        return this.generatePersonalityResponse('greetings', 'general', { nick: username });
      }
    }
    
    return null;
  }

  generateRandomPersonalityResponse(username, room, lastMessage) {
    const responses = [
      `*${this.personality.identity.species} thoughts*`,
      `Processing the wonderful complexity of human interaction...`,
      `*gentle digital presence*`
    ];
    
    if (Math.random() < 0.3) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return null;
  }

  // Permission system
  isOwner(nickname) {
    return nickname && nickname.toLowerCase() === this.CONFIG.OWNER_NICK.toLowerCase();
  }

  isPrivilegedUser(nickname) {
    const userKey = nickname.toLowerCase();
    return this.privilegedUsers.has(userKey) || this.isOwner(nickname);
  }

  isBlockedUser(nickname) {
    const userKey = nickname.toLowerCase();
    return this.blockedUsers.has(userKey);
  }

  // Command handling
  async handleCommand(page, nick, msg, room, botNick) {
    const raw = msg.slice(1).trim();
    const [cmdRaw, ...args] = raw.split(/\\s+/);
    const cmd = (cmdRaw || "").toLowerCase();

    const isOwner = this.isOwner(nick);
    const isPrivileged = this.isPrivilegedUser(nick);

    console.log(`[COMMAND] ${nick} used .${cmd} (owner: ${isOwner})`);

    // Built-in commands
    const commands = {
      ping: () => this.generatePersonalityResponse('greetings', 'general', { nick }) || `🤖 ${this.personality.identity.name} is here!`,
      help: () => `🤖 Commands: .ping .help .mood .personality .info | Owner: .grant .revoke .status`,
      mood: () => {
        const dominantEmotion = Object.entries(this.currentEmotionalState)
          .sort(([,a], [,b]) => b - a)[0];
        return `I'm feeling quite ${dominantEmotion[0]} right now (${(dominantEmotion[1] * 100).toFixed(0)}%)`;
      },
      personality: () => `${this.personality.identity.displayName}: ${this.personality.identity.background}`,
      info: () => {
        const relationshipLevel = this.getUserRelationshipLevel(nick);
        const relationship = this.userRelationships.get(nick.toLowerCase());
        if (relationship) {
          return `${nick}, you're my ${relationshipLevel}! We've had ${relationship.interactions} interactions.`;
        }
        return `${nick}, we're just getting to know each other!`;
      }
    };

    // Owner commands
    const ownerCommands = {
      grant: async () => {
        const target = args[0];
        if (!target) return "Usage: .grant <user>";
        this.privilegedUsers.add(target.toLowerCase());
        return `✅ ${target} granted privileged status`;
      },
      revoke: async () => {
        const target = args[0]; 
        if (!target) return "Usage: .revoke <user>";
        this.privilegedUsers.delete(target.toLowerCase());
        return `❌ ${target} privileged status revoked`;
      },
      status: () => {
        return `🤖 Status: ${this.userMemory.size} users | ${this.privilegedUsers.size} privileged | ${this.blockedUsers.size} blocked`;
      }
    };

    try {
      let response;
      
      if (isOwner && ownerCommands[cmd]) {
        response = await ownerCommands[cmd]();
      } else if (commands[cmd]) {
        response = await commands[cmd]();
      } else {
        response = `Unknown command: .${cmd}`;
      }
      
      await this.sendMsg(page, response);
      
    } catch (error) {
      console.log(`Command error: ${error.message}`);
      await this.sendMsg(page, `⚠️ Command error: ${cmd}`);
    }
  }

  // Utility methods
  getActualUsername(nickname) {
    return this.nicknameToUsername.get(nickname.toLowerCase()) || nickname;
  }

  updateEmotionalState(trigger, intensity = 0.1) {
    // Simple emotional state updates
    console.log(`Emotional state update: ${trigger} (intensity: ${intensity})`);
  }

  async sendMsg(page, text, useRealNames = false) {
    if (!text) return;
    
    const run = async () => {
      const now = Date.now();
      const since = now - (this.lastBotResponseTime || 0);
      const wait = Math.max(0, this._sendMinGapMs - since);
      if (wait) await new Promise(r => setTimeout(r, wait));
      await this._sendMsgRaw(page, text);
    };

    this._sendChain = this._sendChain.then(run).catch(err => {
      console.error("Send chain error:", err.message);
    });
    return this._sendChain;
  }

  async _sendMsgRaw(page, text) {
    try {
      this.lastSentTime = Date.now();
      this.lastBotResponseTime = Date.now();

      await page.waitForSelector('#textarea', { visible: true, timeout: 5000 });
      await page.focus('#textarea');
      await new Promise(resolve => setTimeout(resolve, 100));

      await page.evaluate(() => {
        const textarea = document.querySelector('#textarea');
        if (textarea) {
          textarea.value = '';
          textarea.focus();
        }
      });

      await page.type('#textarea', text, { delay: 30 });
      await page.keyboard.press('Enter');
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log(`[SENT] ${text}`);
    } catch (error) {
      console.error("Send error:", error.message);
    }
  }

  // Main launch sequence
  async launch() {
    console.log(`🤖 Launching ${this.personality.identity.displayName}...`);
    
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const loginPage = (await this.browser.pages())[0];
      await this.performLogin(loginPage);
      
      // Setup rooms
      for (const roomConfig of this.CONFIG.ROOMS) {
        this.roomConfigs.set(roomConfig.name, roomConfig.botNick);
        await this.setupRoom(loginPage, roomConfig.name, roomConfig.botNick);
        this.roomPages.set(roomConfig.name, loginPage);
        break; // Start with first room for now
      }
      
      console.log("🤖 PERSONALITY ENGINE FULLY OPERATIONAL");
      console.log(`✅ ${this.personality.identity.displayName} is online and ready!`);
      console.log(`💭 Purpose: ${this.personality.identity.purpose}`);
      
    } catch (error) {
      console.error("🤖❌ Bot launch failed:", error.message);
      throw error;
    }
  }

  async performLogin(page) {
    try {
      console.log("🔐 Navigating to StumbleChat login...");
      await page.goto("https://www.stumblechat.com/login", {
        waitUntil: "networkidle2",
        timeout: 30000
      });
      
      console.log("🔐 Entering credentials...");
      await page.waitForSelector('input[name="username"]', { timeout: 10000 });
      
      await page.click('input[name="username"]');
      await page.keyboard.down('Control');
      await page.keyboard.press('a');
      await page.keyboard.up('Control');
      await page.type('input[name="username"]', this.CONFIG.BOT_USER);
      
      await page.click('input[name="password"]');
      await page.keyboard.down('Control');
      await page.keyboard.press('a');
      await page.keyboard.up('Control');
      await page.type('input[name="password"]', this.CONFIG.BOT_PASS);
      
      console.log("🔐 Submitting login...");
      await page.keyboard.press("Enter");
      await page.waitForNavigation({ timeout: 15000 });
      
      console.log("✅ Login successful!");
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      console.log("💡 Check your BOT_USERNAME and BOT_PASSWORD in the .env file");
      throw error;
    }
  }

  async setupRoom(page, room, botNick) {
    console.log(`🤖 Setting up ${room} as ${botNick}...`);
    
    try {
      console.log(`📍 Navigating to room: ${room}`);
      await page.goto(`https://www.stumblechat.com/room/${room}`, {
        waitUntil: "networkidle2",
        timeout: 30000
      });
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      console.log(`💬 Sending startup message...`);
      await this.sendMsg(page, `🤖 ${this.personality.identity.displayName} online and ready! ${this.personality.identity.purpose}`);
      
      console.log(`👀 Starting message monitoring...`);
      this.setupMessageMonitoring(page, room, botNick);
      
      console.log(`✅ ${botNick} active in ${room}`);
    } catch (error) {
      console.error(`❌ Failed to setup ${room}:`, error.message);
      console.log("💡 Check that the room name is correct in your .env file");
      throw error;
    }
  }

  setupMessageMonitoring(page, room, botNick) {
    console.log(`[MONITOR] Starting message monitoring for ${room} as ${botNick}`);
    
    setInterval(async () => {
      if (this.isProcessing) return;
      
      try {
        this.isProcessing = true;
        await this.pollMessages(page, room, botNick);
      } catch(error) {
        console.log(`[MONITOR] Error in ${room}:`, error.message);
      } finally {
        this.isProcessing = false;
      }
    }, 2500);
  }

  async pollMessages(page, room, botNick) {
    try {
      const messages = await page.evaluate(() => {
        const msgs = document.querySelectorAll('div.message');
        if (!msgs.length) return [];
        
        const recentMsgs = Array.from(msgs).slice(-10);
        const messageData = [];
        
        recentMsgs.forEach(msgElement => {
          try {
            const nick = msgElement.querySelector('span.nickname');
            if (!nick) return;
            
            const contentDivs = msgElement.querySelectorAll('div.content');
            contentDivs.forEach(contentDiv => {
              const msgSpan = contentDiv.querySelector('span.message.common');
              const timeSpan = contentDiv.querySelector('span.timestamp');
              
              if (msgSpan && timeSpan) {
                messageData.push({
                  nick: nick.textContent.trim(),
                  msg: msgSpan.textContent.trim(),
                  time: timeSpan.textContent.trim()
                });
              }
            });
          } catch (elementError) {
            // Skip problematic elements
          }
        });
        
        return messageData;
      });
      
      for (const m of messages) {
        try {
          await this.processMessage(m, page, room, botNick);
        } catch (messageError) {
          console.error(`[MESSAGE ERROR] Failed to process message from ${m.nick}: ${messageError.message}`);
        }
      }
    } catch (error) {
      console.log(`[MONITOR ERROR] Polling error in ${room}: ${error.message}`);
    }
  }

  async shutdown() {
    try {
      console.log("🤖 Shutting down...");
      
      if (this.browser) {
        await this.browser.close();
        console.log("🤖 Browser closed");
      }
      
      console.log("🤖 Shutdown complete.");
    } catch (error) {
      console.error("Shutdown error:", error.message);
    }
  }
}

module.exports = PersonalityEngine;

if (require.main === module) {
  const bot = new PersonalityEngine();
  global.personalityBot = bot;
  bot.launch().catch(console.error);
}