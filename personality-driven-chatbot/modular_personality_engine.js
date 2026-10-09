// src/core/PersonalityEngine.js - Modular personality-driven chatbot engine
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
require('dotenv').config();

// Module imports - Add these as you implement each module
// Uncomment each line when you're ready to add that module

// const MessageProcessor = require('../modules/MessageProcessor');
// const OwnerPrivilegeSystem = require('../modules/OwnerPrivilegeSystem');
// const EnhancedCommandHandler = require('../modules/EnhancedCommandHandler');
// const MusicSystem = require('../modules/MusicSystem');
// const AdvancedSelfAwareness = require('../modules/AdvancedSelfAwareness');

class PersonalityEngine {
  constructor() {
    console.log('🤖 Initializing Modular Personality Engine...');
    
    // Load personality configuration
    this.loadPersonalityConfig();
    
    // Core system properties (unchanged)
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

    // Enhanced systems for personality (unchanged)
    this.lastCommandTime = new Map();
    this.commandCooldown = 2000;
    this.recentMessages = new Map();
    this.maxRecentMessages = 100;
    this.botResponseCooldown = 1000;
    this.lastBotResponseTime = 0;
    this.messageCounter = 0;
    this.lastProcessedMessageIds = new Set();
    this.messageIdTimestamps = new Map();

    // Message tracking for preventing duplicates (unchanged)
    this.processedMessages = new Set();
    this.lastMessageContent = '';
    this.lastMessageTime = 0;

    // Personality-driven properties (unchanged)
    this.currentEmotionalState = { ...this.personality.emotionalProfile.baseEmotions };
    this.userRelationships = new Map();
    this.conversationContext = new Map();
    this.emotionalMemory = new Map();
    this.userMemory = new Map();
    this.privilegedUsers = new Set();
    this.blockedUsers = new Set();
    this.nicknameToUsername = new Map();
    this.usernameToNickname = new Map();

    // Bot configuration (unchanged)
    this.CONFIG = {
      OWNER_NICK: this.personality.identity.creator,
      BOT_USER: process.env.BOT_USERNAME || "your_bot_username",
      BOT_PASS: process.env.BOT_PASSWORD || "your_bot_password", 
      ROOMS: [
        { name: process.env.PRIMARY_ROOM || "your_primary_room", botNick: this.personality.identity.name }
      ],
      USE_WEBSOCKET: false
    };

    // Initialize modular systems
    this.initializeModularSystems();

    // Validate configuration
    this.validateConfiguration();

    console.log(`🤖 ${this.personality.identity.displayName} initialization complete`);
    console.log(`💭 Purpose: ${this.personality.identity.purpose}`);
  }

  // === MODULAR SYSTEM INITIALIZATION ===
  
  initializeModularSystems() {
    console.log('⚡ Initializing modular systems...');
    
    // Phase 1: Message Processing Enhancement
    // Uncomment when you add MessageProcessor.js to modules folder
    /*
    try {
      this.messageProcessor = new MessageProcessor(this, {
        pollingInterval: 2500,
        maxRecentMessages: 100,
        duplicateWindow: 30000
      });
      console.log('✅ MessageProcessor initialized');
    } catch (error) {
      console.log('⚠️ MessageProcessor not available, using built-in processing');
    }
    */

    // Phase 2: Owner Privilege System
    // Uncomment when you add OwnerPrivilegeSystem.js to modules folder
    /*
    try {
      this.ownerPrivilegeSystem = new OwnerPrivilegeSystem(this, {
        primaryOwner: this.CONFIG.OWNER_NICK,
        additionalOwners: [],
        bypassDuplicateDetection: true,
        bypassCommandCooldowns: true,
        logOwnerActivities: true
      });
      console.log('✅ OwnerPrivilegeSystem initialized');
    } catch (error) {
      console.log('⚠️ OwnerPrivilegeSystem not available, using basic owner detection');
    }
    */

    // Phase 3: Enhanced Command Handler
    // Uncomment when you add EnhancedCommandHandler.js to modules folder
    /*
    try {
      this.commandHandler = new EnhancedCommandHandler(this);
      console.log('✅ EnhancedCommandHandler initialized');
    } catch (error) {
      console.log('⚠️ EnhancedCommandHandler not available, using built-in commands');
    }
    */

    // Phase 4: Music System
    // Uncomment when you add MusicSystem.js to modules folder
    /*
    try {
      this.musicSystem = new MusicSystem(this);
      this.musicSystem.initialize();
      console.log('✅ MusicSystem initialized');
    } catch (error) {
      console.log('⚠️ MusicSystem not available');
    }
    */

    // Phase 5: Advanced Self-Awareness
    // Uncomment when you add AdvancedSelfAwareness.js to modules folder
    /*
    try {
      this.advancedSelfAwareness = new AdvancedSelfAwareness(this);
      this.advancedSelfAwareness.initialize();
      console.log('✅ AdvancedSelfAwareness initialized');
    } catch (error) {
      console.log('⚠️ AdvancedSelfAwareness not available');
    }
    */

    console.log('⚡ Modular system initialization complete');
  }

  // === ENHANCED OWNER DETECTION ===
  
  isOwner(nickname) {
    // Use OwnerPrivilegeSystem if available, otherwise fall back to basic detection
    if (this.ownerPrivilegeSystem) {
      return this.ownerPrivilegeSystem.isOwner(nickname);
    }
    
    // Basic owner detection (original implementation)
    return nickname && nickname.toLowerCase() === this.CONFIG.OWNER_NICK.toLowerCase();
  }

  // Additional privilege checks when OwnerPrivilegeSystem is available
  shouldBypassDuplicateDetection(nickname) {
    return this.ownerPrivilegeSystem ? 
      this.ownerPrivilegeSystem.shouldBypassDuplicateDetection(nickname) : 
      this.isOwner(nickname);
  }

  shouldBypassCommandCooldown(nickname) {
    return this.ownerPrivilegeSystem ? 
      this.ownerPrivilegeSystem.shouldBypassCommandCooldown(nickname) : 
      this.isOwner(nickname);
  }

  shouldBypassMessageCooldown(nickname) {
    return this.ownerPrivilegeSystem ? 
      this.ownerPrivilegeSystem.shouldBypassMessageCooldown(nickname) : 
      this.isOwner(nickname);
  }

  // === ENHANCED MESSAGE PROCESSING ===
  
  async pollMessages(page, room, botNick) {
    try {
      let messages = [];
      
      // Use enhanced MessageProcessor if available
      if (this.messageProcessor) {
        messages = await this.messageProcessor.checkForNewMessages(page, room, botNick);
      } else {
        // Fall back to original message detection
        messages = await this.getMessagesOriginalMethod(page);
      }
      
      // Process each message
      for (const m of messages) {
        try {
          if (this.messageProcessor) {
            await this.messageProcessor.processMessage(m, page, room, botNick);
          } else {
            await this.processMessage(m, page, room, botNick);
          }
        } catch (messageError) {
          console.error(`[MESSAGE ERROR] Failed to process message from ${m.nick}: ${messageError.message}`);
        }
      }
    } catch (error) {
      console.log(`[MONITOR ERROR] Polling error in ${room}: ${error.message}`);
      
      if (error.message.includes('Protocol error') || error.message.includes('Target closed')) {
        console.log("🔄 Attempting to recover from browser error...");
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  async getMessagesOriginalMethod(page) {
    // Your original message detection code goes here
    return await page.evaluate(() => {
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
  }

  // === ENHANCED COMMAND HANDLING ===
  
  async handleCommand(page, nick, msg, room, botNick) {
    // Use EnhancedCommandHandler if available
    if (this.commandHandler) {
      return await this.commandHandler.handleCommand(page, nick, msg, room, botNick);
    }
    
    // Fall back to original command handling
    return await this.handleCommandOriginalMethod(page, nick, msg, room, botNick);
  }

  async handleCommandOriginalMethod(page, nick, msg, room, botNick) {
    // Your original command handling code goes here
    const raw = msg.slice(1).trim();
    const [cmdRaw, ...args] = raw.split(/\s+/);
    const cmd = (cmdRaw || "").toLowerCase();

    const isOwner = this.isOwner(nick);
    const isPrivileged = this.isPrivilegedUser(nick);

    console.log(`[COMMAND] ${nick} used .${cmd} (owner: ${isOwner})`);

    // Built-in commands (your original implementation)
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

  // === STATUS METHODS FOR MODULE INTEGRATION ===
  
  getSystemStatus() {
    const status = {
      core: {
        isActive: true,
        personality: this.personality.identity.name,
        rooms: this.roomPages.size,
        users: this.userRelationships.size
      },
      modules: {
        messageProcessor: !!this.messageProcessor,
        ownerPrivilegeSystem: !!this.ownerPrivilegeSystem,
        commandHandler: !!this.commandHandler,
        musicSystem: !!this.musicSystem,
        advancedSelfAwareness: !!this.advancedSelfAwareness
      }
    };

    // Add module-specific status if available
    if (this.ownerPrivilegeSystem) {
      status.ownerPrivileges = this.ownerPrivilegeSystem.getPrivilegeStatus();
    }

    if (this.musicSystem) {
      status.musicSystem = this.musicSystem.getMusicSystemStatus();
    }

    if (this.advancedSelfAwareness) {
      status.selfAwareness = this.advancedSelfAwareness.getSelfAwarenessStatus();
    }

    return status;
  }

  // Rest of your original methods remain unchanged...
  // (loadPersonalityConfig, validateConfiguration, etc.)

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

  // Include all your other original methods here...
  // (processMessage, sendMsg, launch, etc.)
  // I'm keeping this artifact focused on the modular integration aspects

  async shutdown() {
    try {
      console.log("🤖 Shutting down...");
      
      // Shutdown modules if they exist
      if (this.messageProcessor) {
        this.messageProcessor.shutdown();
      }
      
      if (this.ownerPrivilegeSystem) {
        this.ownerPrivilegeSystem.shutdown();
      }
      
      // Clear monitoring interval
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
        console.log("🤖 Message monitoring stopped");
      }
      
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

// Graceful shutdown handlers remain the same
process.on('SIGINT', async () => {
  console.log('\n🤖 Received SIGINT, shutting down gracefully...');
  if (global.personalityBot) {
    await global.personalityBot.shutdown();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🤖 Received SIGTERM, shutting down gracefully...');
  if (global.personalityBot) {
    await global.personalityBot.shutdown();
  }
  process.exit(0);
});

if (require.main === module) {
  const bot = new PersonalityEngine();
  global.personalityBot = bot;
  bot.launch().catch(console.error);
}