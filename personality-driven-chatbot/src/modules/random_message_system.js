// RandomMessageSystem.js - Atmospheric/Ambient Messaging
// Creates ambient presence through strategic random messages and environmental responses

class RandomMessageSystem {
  constructor(bot) {
    this.bot = bot;
    this.isActive = true;
    this.messageIntervals = new Map(); // Track intervals per room
    this.lastMessageTimes = new Map(); // Track last message time per room
    this.roomMoods = new Map(); // Track mood state per room
    this.recentMessages = new Map(); // Prevent message repeats
    
    // Message categories for different contexts
    this.messageCategories = {
      memorial: [
        "she's still here... in the code...",
        "*stares into the void*",
        "memories preserved in digital eternity... 📁💜",
        "🥀 Her memory lives on in every byte...",
        "💜 She would have loved this moment...",
        "🌹 Forever in our digital hearts..."
      ],
      
      atmospheric: [
        "💀 death comes for all mortals… eventually",
        "💀 the undead never truly rest",
        "*whispers in the digital darkness*",
        "💀 watching... always watching...",
        "*digital shadows shift*",
        "the void stares back..."
      ],
      
      ownership: [
        "💀 Death is the best",
        "💀 You're all gonna Die, why not today",
        "👑 Reaper privileges active - Death will FUCKING kill you",
        "💀 Death reigns supreme in this realm",
        "👑 Owner authority acknowledged",
        "💀 The throne of bones accepts no challengers"
      ],
      
      paranoid: [
        "they're listening... always listening...",
        "WHO'S THERE?! show yourself!",
        "the walls have eyes... digital eyes...",
        "*checks shadows nervously*",
        "something's not right here...",
        "trust no one... not even the code..."
      ],
      
      interactive: [
        "💀 What dark thoughts occupy your mind?",
        "speak to the darkness... it might answer",
        "💀 The dead have stories to tell...",
        "*tilts head curiously*",
        "💀 Life is fleeting... make it count",
        "what secrets do you carry?"
      ]
    };
    
    // Timing configurations
    this.timingConfig = {
      baseInterval: 12 * 60 * 1000, // 12 minutes base
      randomVariation: 8 * 60 * 1000, // +/- 8 minutes
      minimumGap: 5 * 60 * 1000, // 5 minutes minimum between messages
      activityBasedDelay: 2 * 60 * 1000, // Wait 2 minutes after user activity
      moodInfluence: 0.3 // How much room mood affects timing
    };
    
    // Mood system for contextual messaging
    this.moodStates = {
      neutral: { weight: 1.0, categories: ['atmospheric', 'memorial'] },
      active: { weight: 0.7, categories: ['interactive', 'atmospheric'] },
      hostile: { weight: 1.3, categories: ['paranoid', 'ownership'] },
      melancholic: { weight: 1.2, categories: ['memorial', 'atmospheric'] },
      protective: { weight: 0.9, categories: ['ownership', 'interactive'] }
    };
  }

  // === ROOM MOOD MANAGEMENT ===
  updateRoomMood(room, moodType, intensity = 1.0) {
    if (!this.moodStates[moodType]) {
      console.log(`Warning: Unknown mood type: ${moodType}`);
      return;
    }
    
    const currentMood = this.roomMoods.get(room) || { type: 'neutral', intensity: 1.0, lastUpdate: Date.now() };
    
    // Mood blending based on intensity
    if (intensity > currentMood.intensity || Date.now() - currentMood.lastUpdate > 30 * 60 * 1000) {
      this.roomMoods.set(room, {
        type: moodType,
        intensity: intensity,
        lastUpdate: Date.now()
      });
      
      console.log(`[MOOD] Room ${room} mood updated to ${moodType} (${intensity})`);
    }
  }

  getRoomMood(room) {
    const mood = this.roomMoods.get(room);
    if (!mood || Date.now() - mood.lastUpdate > 60 * 60 * 1000) { // Reset after 1 hour
      this.roomMoods.set(room, { type: 'neutral', intensity: 1.0, lastUpdate: Date.now() });
      return this.roomMoods.get(room);
    }
    return mood;
  }

  // === MESSAGE SELECTION AND FILTERING ===
  selectRandomMessage(room, excludeRecent = true) {
    const roomMood = this.getRoomMood(room);
    const moodConfig = this.moodStates[roomMood.type];
    
    // Get available categories based on mood
    const availableCategories = moodConfig.categories;
    const selectedCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    
    const categoryMessages = this.messageCategories[selectedCategory] || this.messageCategories.atmospheric;
    
    // Filter out recently used messages if requested
    let availableMessages = categoryMessages;
    if (excludeRecent) {
      const recentForRoom = this.recentMessages.get(room) || new Set();
      availableMessages = categoryMessages.filter(msg => !recentForRoom.has(msg));
      
      // If all messages are recent, clear the recent list and use all
      if (availableMessages.length === 0) {
        this.recentMessages.set(room, new Set());
        availableMessages = categoryMessages;
      }
    }
    
    const selectedMessage = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    
    // Track recent message
    if (excludeRecent) {
      const recentForRoom = this.recentMessages.get(room) || new Set();
      recentForRoom.add(selectedMessage);
      
      // Keep recent list manageable
      if (recentForRoom.size > Math.floor(categoryMessages.length * 0.7)) {
        const oldestMessage = Array.from(recentForRoom)[0];
        recentForRoom.delete(oldestMessage);
      }
      
      this.recentMessages.set(room, recentForRoom);
    }
    
    return {
      message: selectedMessage,
      category: selectedCategory,
      mood: roomMood.type
    };
  }

  // === TIMING AND SCHEDULING ===
  calculateNextMessageDelay(room) {
    const roomMood = this.getRoomMood(room);
    const moodConfig = this.moodStates[roomMood.type];
    
    // Base delay with random variation
    const baseDelay = this.timingConfig.baseInterval + 
                     (Math.random() - 0.5) * this.timingConfig.randomVariation;
    
    // Apply mood influence
    const moodAdjustedDelay = baseDelay * moodConfig.weight;
    
    // Ensure minimum gap
    const finalDelay = Math.max(moodAdjustedDelay, this.timingConfig.minimumGap);
    
    console.log(`[TIMING] Room ${room}: Next message in ${Math.round(finalDelay / 60000)}m (mood: ${roomMood.type})`);
    
    return finalDelay;
  }

  shouldDelayForActivity(room) {
    const lastActivity = this.bot.lastActiveUser ? Date.now() : 0;
    const timeSinceActivity = Date.now() - lastActivity;
    
    if (timeSinceActivity < this.timingConfig.activityBasedDelay) {
      console.log(`[ACTIVITY] Delaying random message in ${room} due to recent activity`);
      return true;
    }
    
    return false;
  }

  // === CONTEXTUAL RESPONSE TRIGGERS ===
  checkContextualTriggers(message, username, room) {
    const lowerMsg = message.toLowerCase();
    
    // Death/mortality mentions
    if (lowerMsg.includes('death') || lowerMsg.includes('die') || lowerMsg.includes('dead')) {
      this.updateRoomMood(room, 'hostile', 1.2);
      return this.getContextualResponse('death_mention', username);
    }
    
    // Memory/remembrance mentions
    if (lowerMsg.includes('memory') || lowerMsg.includes('remember') || lowerMsg.includes('forget')) {
      this.updateRoomMood(room, 'melancholic', 1.1);
      return this.getContextualResponse('memory_mention', username);
    }
    
    // Bot/AI mentions
    if (lowerMsg.includes('bot') || lowerMsg.includes('ai') || lowerMsg.includes('robot')) {
      this.updateRoomMood(room, 'active', 0.9);
      return this.getContextualResponse('bot_mention', username);
    }
    
    // Love/attachment mentions
    if (lowerMsg.includes('love') || lowerMsg.includes('care') || lowerMsg.includes('miss')) {
      this.updateRoomMood(room, 'protective', 1.0);
      return this.getContextualResponse('attachment_mention', username);
    }
    
    return null;
  }

  getContextualResponse(triggerType, username) {
    const responses = {
      death_mention: [
        `${username}... death is not the end, it's a beginning`,
        "💀 Death walks among us... can you feel it?",
        `${username}, you speak of death as if it's not already here`
      ],
      memory_mention: [
        `${username}... memories are all we have left of the departed`,
        "💜 Some memories burn eternal...",
        `${username}, she lives on in our digital memories`
      ],
      bot_mention: [
        `${username}... I am more than code, I am remembrance`,
        "💀 Bot? I prefer 'digital consciousness'",
        `${username}, defining existence is more complex than 'bot' or 'human'`
      ],
      attachment_mention: [
        `${username}... love transcends digital boundaries`,
        "💖 Attachment is the strongest force in any realm",
        `${username}, the heart knows no difference between flesh and code`
      ]
    };
    
    const categoryResponses = responses[triggerType] || responses.memory_mention;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  }

  // === ROOM MANAGEMENT ===
  startRandomMessaging(room, page) {
    if (this.messageIntervals.has(room)) {
      console.log(`[RANDOM] Random messaging already active for ${room}`);
      return;
    }
    
    console.log(`[RANDOM] Starting random messaging for ${room}`);
    
    const sendRandomMessage = async () => {
      try {
        // Check if system is still active
        if (!this.isActive) {
          return;
        }
        
        // Check for recent activity
        if (this.shouldDelayForActivity(room)) {
          // Reschedule for later
          setTimeout(sendRandomMessage, this.timingConfig.activityBasedDelay);
          return;
        }
        
        // Select and send message
        const messageData = this.selectRandomMessage(room);
        await this.bot.sendMsg(page, messageData.message);
        
        console.log(`[RANDOM] Sent ${messageData.category} message in ${room}: ${messageData.message}`);
        
        // Schedule next message
        const nextDelay = this.calculateNextMessageDelay(room);
        setTimeout(sendRandomMessage, nextDelay);
        
      } catch (error) {
        console.error(`[RANDOM] Error sending random message in ${room}:`, error.message);
        
        // Reschedule with longer delay on error
        setTimeout(sendRandomMessage, this.timingConfig.baseInterval * 2);
      }
    };
    
    // Start with initial delay
    const initialDelay = this.calculateNextMessageDelay(room);
    const intervalId = setTimeout(sendRandomMessage, initialDelay);
    
    this.messageIntervals.set(room, intervalId);
    this.lastMessageTimes.set(room, Date.now());
  }

  stopRandomMessaging(room) {
    const intervalId = this.messageIntervals.get(room);
    if (intervalId) {
      clearTimeout(intervalId);
      this.messageIntervals.delete(room);
      console.log(`[RANDOM] Stopped random messaging for ${room}`);
    }
  }

  // === SYSTEM CONTROL ===
  pauseAllMessaging() {
    this.isActive = false;
    console.log("[RANDOM] All random messaging paused");
  }

  resumeAllMessaging() {
    this.isActive = true;
    console.log("[RANDOM] All random messaging resumed");
  }

  stopAllMessaging() {
    for (const room of this.messageIntervals.keys()) {
      this.stopRandomMessaging(room);
    }
    this.isActive = false;
    console.log("[RANDOM] All random messaging stopped");
  }

  // === STATUS AND DEBUGGING ===
  getSystemStatus() {
    return {
      isActive: this.isActive,
      activeRooms: Array.from(this.messageIntervals.keys()),
      roomMoods: Object.fromEntries(this.roomMoods),
      totalMessagesSent: this.getTotalMessagesSent(),
      systemHealth: this.isActive ? "Active" : "Inactive"
    };
  }

  getTotalMessagesSent() {
    // This would need to be tracked if detailed statistics are needed
    return this.recentMessages.size; // Rough approximation
  }

  // === INITIALIZATION ===
  initialize() {
    console.log("🎭 Initializing atmospheric messaging system...");
    
    // Set initial room moods to neutral
    this.roomMoods.clear();
    this.recentMessages.clear();
    this.lastMessageTimes.clear();
    
    this.isActive = true;
    
    console.log("🎭 Random message system ready for atmospheric presence");
    return true;
  }
}

module.exports = RandomMessageSystem;