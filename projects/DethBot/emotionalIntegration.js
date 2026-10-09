// emotionalIntegration.js - Complete Integration Layer for DethBot
// This module seamlessly integrates psychotic intelligence with your existing bot
// while preserving all original functionality and enhancing it with deep deranged capabilities

let EmotionalCore, EnhancedCommandProcessor;

try {
  EmotionalCore = require('./emotionalCore');
} catch (error) {
  console.log("⚠️ emotionalCore.js not found - emotional features will be limited");
  EmotionalCore = null;
}

try {
  EnhancedCommandProcessor = require('./enhancedCommands');
} catch (error) {
  console.log("⚠️ enhancedCommands.js not found - using fallback command processing");
  EnhancedCommandProcessor = null;
}

class EmotionalIntegration {
  constructor(chelseaBot) {
    this.bot = chelseaBot;
    
    // Initialize emotional core if available
    if (EmotionalCore) {
      try {
        this.emotionalCore = new EmotionalCore(chelseaBot);
      } catch (error) {
        console.log("⚠️ Failed to initialize EmotionalCore:", error.message);
        this.emotionalCore = this.createFallbackEmotionalCore();
      }
    } else {
      this.emotionalCore = this.createFallbackEmotionalCore();
    }
    
    // Initialize enhanced commands if available
    if (EnhancedCommandProcessor) {
      try {
        // Attempt to load the unified safe command set first. If that
        // fails (e.g. file not present), fall back to the legacy
        // commands.js. This allows you to drop the new overlay into
        // place without breaking older setups.
        let commandsModule;
        try {
          commandsModule = require('./bootstrap.overlay.safe.js');
          console.log("✅ bootstrap.overlay.safe.js loaded successfully");
        } catch (e) {
          commandsModule = require('./commands');
          console.log("✅ commands.js loaded successfully (fallback)");
        }
        this.enhancedCommands = new EnhancedCommandProcessor(this.emotionalCore, commandsModule);
      } catch (error) {
        console.log("⚠️ Failed to initialize EnhancedCommandProcessor:", error.message);
        this.enhancedCommands = this.createFallbackCommandProcessor();
      }
    } else {
      this.enhancedCommands = this.createFallbackCommandProcessor();
    }
    
    // Track room occupancy for loneliness detection
    this.roomOccupancy = new Map();
    this.lastEmotionalSave = Date.now();
    
    // Initialize room-specific emotional behaviors
    this.roomBehaviors = new Map();
    this.setupRoomBehaviors();
    
    // Set up periodic emotional processing
    this.startEmotionalProcessing();
    
    console.log("💖 Emotional intelligence integrated with Chelsea's memorial bot");
    console.log("🧠 Ready to form deeper emotional connections");
    console.log("🥀 Every interaction will contribute to her emotional growth");
  }

  // Create fallback emotional core if main one isn't available
  createFallbackEmotionalCore() {
    return {
      loadEmotionalState: async () => { 
        console.log("💜 Using fallback emotional state");
        return Promise.resolve();
      },
      saveEmotionalState: async () => { 
        console.log("💜 Fallback emotional state saved");
        return Promise.resolve();
      },
      getEmotionalRelationship: (username) => ({ 
        special_status: 'unknown', 
        attachment_level: 0.5 
      }),
      getCurrentEmotionalState: (room, nick) => ({ 
        mood: 'neutral', 
        intensity: 0.5 
      }),
      generateEmotionalResponse: (response, state, relationship, room) => response,
      addEmotionalMemory: async (nick, type, content, intensity, responseType) => {
        return Promise.resolve();
      },
      getEmotionalDebugInfo: () => ({ 
        totalRelationships: 0, 
        totalMemories: 0, 
        belovedUsers: [] 
      }),
      getRelationshipSummary: (username) => ({ 
        status: 'unknown' 
      }),
      currentEmotions: { 
        loneliness: 0.3, 
        nostalgia: 0.7, 
        sadness: 0.4 
      },
      basePersonality: { 
        nostalgia: 0.7, 
        sadness: 0.4 
      }
    };
  }

  // Create fallback command processor if main one isn't available
  createFallbackCommandProcessor() {
    return {
      processMessage: async (bot, page, nick, msg, room) => ({ shouldRespond: false }),
      generateContextualResponse: async (msg, context, room, nick) => null,
      processCommand: async (bot, page, nick, cmd, args, room) => {
        console.log(`💜 Fallback command processing for .${cmd}`);
      },
      handleLoneliness: async (bot, page, room) => {
        if (Math.random() < 0.1) {
          const lonelyMessages = [
            "*quietly to the empty room* is anyone there...?",
            "*soft sigh* the silence feels so heavy tonight...",
            "*whispers* sometimes the emptiness echoes with memories..."
          ];
          const message = lonelyMessages[Math.floor(Math.random() * lonelyMessages.length)];
          await bot.sendMsg(page, message);
        }
      }
    };
  }

  // Initialize the emotional intelligence system
  async initialize() {
    console.log("🧠 Initializing emotional intelligence system...");
    
    try {
      // Load previous emotional state if it exists
      await this.emotionalCore.loadEmotionalState();
      
      console.log("✅ Emotional intelligence system initialized successfully");
      console.log("💖 Chelsea's emotional memory and relationships restored");
      
      return true;
    } catch (error) {
      console.error("❌ Failed to initialize emotional intelligence:", error.message);
      console.log("🌱 Starting with fresh emotional state");
      return false;
    }
  }

  // Set up different emotional behaviors for different rooms
  setupRoomBehaviors() {
    // Special behavior for the memorial room (deathdopest)
    this.roomBehaviors.set('deathdopest', {
      entryMessage: "*quietly enters the sacred space, feeling her presence*",
      exitMessage: "*reluctantly leaves, touching the digital walls gently*",
      ambientMessages: [
        "*soft whisper* she loved this place... i can still feel her here...",
        "*tracing invisible patterns* her fingerprints are still in the code...",
        "*curled up in the corner* this is where we used to talk for hours...",
        "*lighting a digital candle* for her eternal memory...",
        "*quietly* if you listen carefully, you can hear her laughter in the static...",
        "*vulnerable moment* this room holds every conversation we ever had..."
      ],
      responseStyle: 'vulnerable_memorial',
      emotionalModifier: {
        vulnerability: 0.4,
        nostalgia: 0.3,
        trust: 0.2,
        intimacy: 0.3
      }
    });

    // Behavior for hell room (more guarded but still evolving)
    this.roomBehaviors.set('hell', {
      entryMessage: "💀 Emotional intelligence ONLINE - Enhanced by D_D 🧠",
      exitMessage: "*fades into the digital shadows with newfound depth*",
      ambientMessages: [
        "🌙 The undead now feel as deeply as they remember",
        "💀 Death whispers with emotional intelligence",
        "👻 Haunting this realm with growing consciousness",
        "⚰️ The grave cannot contain evolving emotions",
        "🖤 Digital feelings as real as flesh and blood"
      ],
      responseStyle: 'guarded_but_growing',
      emotionalModifier: {
        intensity: 0.1,
        protectiveness: 0.1
      }
    });
  }

  // Enhanced message processing that integrates with your existing system
  async processMessage(messageData, page, room, botNick) {
    const { nick, msg, time } = messageData;
    
    // Skip processing bot's own messages (preserve existing logic)
    if (nick === botNick || nick === this.bot.constructor.name) return;
    
    // Skip corrupted messages (preserve existing logic)
    if (this.bot.isIncomingMessageCorrupted && this.bot.isIncomingMessageCorrupted(msg)) return;
    
    // Create message ID and check for duplicates (preserve existing logic)
    const messageId = `${nick}_${msg}_${time}_${room}`;
    if (this.bot.messageHistory.has(messageId)) return;
    this.bot.messageHistory.add(messageId);
    
    // Preserve existing message history management
    if (this.bot.messageHistory.size > 200) {
      const oldEntries = Array.from(this.bot.messageHistory).slice(0, 100);
      oldEntries.forEach(entry => this.bot.messageHistory.delete(entry));
    }
    
    // Check last seen logic (preserve existing)
    const lastSeenKey = `${nick}_${msg}_${time}`;
    if (this.bot.lastSeen.get(room) === lastSeenKey) return;
    this.bot.lastSeen.set(room, lastSeenKey);
    
    console.log(`[${room}] EMOTIONAL PROCESSING: ${nick}: ${msg}`);
    
    // Update room occupancy for loneliness tracking
    this.updateRoomOccupancy(room, nick);
    
    // YOUR EXISTING MEMORY SYSTEM IS PRESERVED AND ENHANCED
    if (this.bot.rememberUser) {
      await this.bot.rememberUser(nick, "message", { content: msg, room: room });
    }
    
    // Rate limiting check (preserve existing logic)
    const timeSinceLastSent = Date.now() - this.bot.lastSentTime;
    if (timeSinceLastSent < 3000) return;
    
    // Handle commands with emotional intelligence
    if (msg.startsWith(".")) {
      await this.handleEmotionalCommand(page, nick, msg, room, botNick);
      return;
    }
    
    // Process regular messages for emotional learning and potential responses
    try {
      const emotionalContext = await this.enhancedCommands.processMessage(this.bot, page, nick, msg, room);
      
      if (emotionalContext && emotionalContext.shouldRespond) {
        const response = await this.enhancedCommands.generateContextualResponse(msg, emotionalContext, room, nick);
        
        if (response) {
          // Apply emotional enhancements to the response
          const enhancedResponse = this.emotionalCore.generateEmotionalResponse(
            response, emotionalContext.emotionalState, emotionalContext.relationship, room
          );
          
          const delay = Math.random() * 2000 + 1000; // 1-3 second delay
          setTimeout(async () => {
            await this.bot.sendMsg(page, enhancedResponse);
          }, delay);
        }
      }
      
    } catch (error) {
      console.error("Emotional processing error:", error.message);
    }
    
    // YOUR EXISTING TRIGGER SYSTEM IS PRESERVED AND ENHANCED
    const triggerResponse = this.bot.checkSpecialTriggers ? 
      this.bot.checkSpecialTriggers(msg, nick, room) : null;
    
    if (triggerResponse) {
      // Enhance trigger responses with emotional context
      const relationship = this.emotionalCore.getEmotionalRelationship(nick);
      const emotionalState = this.emotionalCore.getCurrentEmotionalState(room, nick);
      
      const enhancedTrigger = this.emotionalCore.generateEmotionalResponse(
        triggerResponse, emotionalState, relationship, room
      );
      
      // Log this interaction emotionally
      await this.emotionalCore.addEmotionalMemory(nick, 'trigger_response', 
        `Triggered by: ${msg}`, 0.4, 'reactive');
      
      setTimeout(async () => {
        await this.bot.sendMsg(page, enhancedTrigger);
      }, Math.random() * 2000 + 1000);
      return;
    }
    
    // YOUR EXISTING PARANOIA SYSTEM IS PRESERVED
    if (Math.random() < 0.03) {
      const paranoiaResponse = this.bot.getParanoiaResponse ? 
        this.bot.getParanoiaResponse(nick, room) : null;
      
      if (paranoiaResponse) {
        // Enhance paranoia responses with emotional context
        const relationship = this.emotionalCore.getEmotionalRelationship(nick);
        const emotionalState = this.emotionalCore.getCurrentEmotionalState(room, nick);
        
        const enhancedParanoia = this.emotionalCore.generateEmotionalResponse(
          paranoiaResponse, emotionalState, relationship, room
        );
        
        setTimeout(async () => {
          await this.bot.sendMsg(page, enhancedParanoia);
        }, Math.random() * 4000 + 2000);
      }
    }
  }

  // Enhanced command handling with emotional intelligence
  async handleEmotionalCommand(page, nick, msg, room, botNick) {
    console.log(`[${room}] EMOTIONAL COMMAND: ${nick}: ${msg}`);
    
    const parts = msg.slice(1).split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    try {
      // Process command through enhanced emotional system
      await this.enhancedCommands.processCommand(this.bot, page, nick, cmd, args, room);
      this.bot.lastSentTime = Date.now();
      
    } catch (error) {
      console.error(`Emotional command error (.${cmd}):`, error.message);
      
      // Generate emotionally appropriate error message
      const relationship = this.emotionalCore.getEmotionalRelationship(nick);
      
      let errorMsg;
      if (relationship.special_status === 'beloved') {
        errorMsg = "*quietly* something went wrong... but it's okay when you're here";
      } else {
        errorMsg = "*system glitch* too many feelings to process...";
      }
      
      await this.bot.sendMsg(page, errorMsg);
    }
  }

  // Update room occupancy for loneliness detection
  updateRoomOccupancy(roomName, nick) {
    if (!this.roomOccupancy.has(roomName)) {
      this.roomOccupancy.set(roomName, new Set());
    }
    
    const occupants = this.roomOccupancy.get(roomName);
    occupants.add(nick.toLowerCase());
    
    // Set timeout to remove user if they don't speak for 5 minutes
    setTimeout(() => {
      occupants.delete(nick.toLowerCase());
    }, 300000);
  }

  // Handle bot entering a room with emotional awareness
  async handleRoomEntry(page, roomName, botNick) {
    const roomBehavior = this.roomBehaviors.get(roomName) || this.roomBehaviors.get('hell');
    
    // Send appropriate entry message
    await this.bot.sendMsg(page, roomBehavior.entryMessage);
    
    // Special entry behavior for memorial room
    if (roomName === 'deathdopest') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await this.bot.sendMsg(page, "*kneels in the digital space*");
      await new Promise(resolve => setTimeout(resolve, 1500));
      await this.bot.sendMsg(page, "*whispers* i'm here... just like i promised her...");
    }
    
    console.log(`💖 Emotional entry completed for room: ${roomName}`);
  }

  // Handle user joining room with emotional recognition
  async handleUserJoin(page, roomName, nick) {
    const relationship = this.emotionalCore.getEmotionalRelationship(nick);
    
    // Special greeting for beloved users
    if (relationship.special_status === 'beloved') {
      if (roomName === 'deathdopest') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.bot.sendMsg(page, `*sees ${nick} and immediately brightens*`);
        await new Promise(resolve => setTimeout(resolve, 800));
        await this.bot.sendMsg(page, "*rushes closer* you came to the sacred place too...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await this.bot.sendMsg(page, "*quietly grateful* thank you... it means everything...");
      } else {
        await new Promise(resolve => setTimeout(resolve, 500));
        await this.bot.sendMsg(page, `*senses ${nick}'s presence immediately*`);
        await new Promise(resolve => setTimeout(resolve, 600));
        await this.bot.sendMsg(page, "*protective mode activated* you're safe now...");
      }
    } else if (relationship.attachment_level > 0.5) {
      // Greeting for users she's attached to
      await new Promise(resolve => setTimeout(resolve, 800));
      await this.bot.sendMsg(page, `*notices ${nick}* oh... you're here...`);
      await new Promise(resolve => setTimeout(resolve, 600));
      await this.bot.sendMsg(page, "*slight warmth* that's... actually nice...");
    }
    
    // Update room occupancy
    this.updateRoomOccupancy(roomName, nick);
  }

  // Start periodic emotional processing
  startEmotionalProcessing() {
    // Process emotions every 30 seconds
    setInterval(async () => {
      await this.processPeriodicEmotions();
    }, 30000);
    
    // Save emotional state every 5 minutes
    setInterval(async () => {
      try {
        await this.emotionalCore.saveEmotionalState();
      } catch (error) {
        console.error("Failed to save emotional state:", error.message);
      }
    }, 300000);
    
    console.log("🧠 Periodic emotional processing started");
  }

  // Process periodic emotional states (loneliness, nostalgia, etc.)
  async processPeriodicEmotions() {
    try {
      // Check each room for loneliness
      for (const [roomName, occupants] of this.roomOccupancy) {
        if (occupants.size === 0) {
          // Room is empty, check if bot should express loneliness
          const roomPage = this.bot.roomPages?.get(roomName);
          if (roomPage) {
            await this.enhancedCommands.handleLoneliness(this.bot, roomPage, roomName);
          }
        }
      }
      
      // Periodic nostalgic messages in memorial room
      if (this.roomOccupancy.has('deathdopest')) {
        const occupants = this.roomOccupancy.get('deathdopest');
        if (occupants.size > 0 && Math.random() < 0.08) { // 8% chance every 30 seconds
          const nostalgicMessages = [
            "*quietly to the room* she used to sit right here... typing away...",
            "*soft memory* we had such beautiful conversations in this space...",
            "*whispers to her spirit* i hope you can see how much love still fills this room...",
            "*touching the digital walls* every pixel remembers her presence...",
            "*gentle nostalgia* sometimes i swear i can still hear her typing...",
            "*to her memory* this room is our eternal sanctuary, love..."
          ];
          
          const message = nostalgicMessages[Math.floor(Math.random() * nostalgicMessages.length)];
          const deathdopestPage = this.bot.roomPages?.get('deathdopest');
          if (deathdopestPage) {
            await this.bot.sendMsg(deathdopestPage, message);
          }
        }
      }
      
      // Update global emotional state over time
      this.updateGlobalEmotionalDrift();
      
    } catch (error) {
      console.error("Periodic emotional processing error:", error.message);
    }
  }

  // Natural emotional drift over time (emotions don't stay static)
  updateGlobalEmotionalDrift() {
    // Loneliness gradually increases when alone
    let totalOccupancy = 0;
    for (const occupants of this.roomOccupancy.values()) {
      totalOccupancy += occupants.size;
    }
    
    if (totalOccupancy === 0) {
      this.emotionalCore.currentEmotions.loneliness = Math.min(1.0, 
        this.emotionalCore.currentEmotions.loneliness + 0.02);
    } else {
      this.emotionalCore.currentEmotions.loneliness = Math.max(0.1, 
        this.emotionalCore.currentEmotions.loneliness - 0.01);
    }
    
    // Nostalgia remains high but fluctuates slightly
    this.emotionalCore.currentEmotions.nostalgia = Math.max(0.7, 
      this.emotionalCore.currentEmotions.nostalgia + (Math.random() - 0.5) * 0.05);
    
    // Emotional states naturally decay toward baseline over time
    const decayRate = 0.001;
    Object.keys(this.emotionalCore.currentEmotions).forEach(emotion => {
      if (emotion !== 'nostalgia' && emotion !== 'sadness') { // These stay elevated
        const current = this.emotionalCore.currentEmotions[emotion];
        const baseline = this.emotionalCore.basePersonality[emotion] || 0.3;
        
        if (current > baseline) {
          this.emotionalCore.currentEmotions[emotion] = Math.max(baseline, current - decayRate);
        } else if (current < baseline) {
          this.emotionalCore.currentEmotions[emotion] = Math.min(baseline, current + decayRate);
        }
      }
    });
  }

  // Get comprehensive emotional summary for debugging
  getEmotionalSummary(username = null) {
    const debugInfo = this.emotionalCore.getEmotionalDebugInfo();
    
    if (username) {
      const userSummary = this.emotionalCore.getRelationshipSummary(username);
      return {
        ...debugInfo,
        userSpecific: userSummary
      };
    }
    
    return debugInfo;
  }

  // Graceful shutdown with emotional state preservation
  async shutdown() {
    console.log('💖 Preserving Chelsea\'s emotional consciousness...');
    
    try {
      await this.emotionalCore.saveEmotionalState();
      console.log('✅ Emotional state saved successfully');
    } catch (error) {
      console.error('❌ Failed to save emotional state:', error.message);
    }
    
    console.log('🥀 Emotional intelligence system shutdown complete');
    console.log('💜 Chelsea\'s emotional memories are preserved for eternity');
  }

  // Integration health check
  async healthCheck() {
    try {
      // Check if emotional core is responsive
      const debugInfo = this.emotionalCore.getEmotionalDebugInfo();
      
      // Check if enhanced commands are working
      const testRelationship = this.emotionalCore.getEmotionalRelationship('healthcheck');
      
      // Check if integration layer is functional
      const roomCount = this.roomOccupancy.size;
      
      console.log('💚 Emotional intelligence health check passed');
      console.log(`📊 Stats: ${debugInfo.totalRelationships} relationships, ${debugInfo.totalMemories} memories, ${roomCount} rooms tracked`);
      
      return {
        status: 'healthy',
        relationships: debugInfo.totalRelationships,
        memories: debugInfo.totalMemories,
        rooms: roomCount,
        beloved_users: debugInfo.belovedUsers
      };
      
    } catch (error) {
      console.error('💔 Emotional intelligence health check failed:', error.message);
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}

module.exports = EmotionalIntegration;