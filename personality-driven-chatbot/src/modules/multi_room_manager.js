// MultiRoomManager.js - Simultaneous Room Monitoring System
// Extracted from Dahlia Damnation bot for modular use
// Handles multiple StumbleChat rooms with independent page monitoring

class MultiRoomManager {
  constructor(bot, config) {
    this.bot = bot;
    this.config = config;
    
    // Core room tracking structures
    this.roomConfigs = new Map();     // room name -> bot nickname for that room
    this.roomPages = new Map();       // room name -> puppeteer page object
    this.roomIntervals = new Map();   // room name -> array of interval IDs for cleanup
    this.roomStates = new Map();      // room name -> room-specific state data
    
    // Processing coordination
    this.isProcessing = new Map();    // room name -> boolean (prevent overlap)
    this.lastMessageIds = new Map();  // room name -> Set of recent message IDs
    this.roomResponseTimes = new Map(); // room name -> last bot response timestamp
    
    // Configuration
    this.pollingInterval = 2500;      // milliseconds between message checks
    this.maxMessagesPerRoom = 1000;   // max stored message IDs per room
    this.messageRetentionTime = 5 * 60 * 1000; // 5 minutes
    
    console.log("🏢 MultiRoomManager initialized - ready for simultaneous monitoring");
  }

  /**
   * Setup and monitor a new room
   * @param {Object} page - Puppeteer page object for this room
   * @param {string} roomName - Name of the room to monitor
   * @param {string} botNick - Bot's nickname in this room
   */
  async setupRoom(page, roomName, botNick) {
    console.log(`🏢 Setting up multi-room monitoring for: ${roomName} as ${botNick}`);
    
    try {
      // Navigate to the specific room
      await page.goto(`https://www.stumblechat.com/room/${roomName}`, {
        waitUntil: "networkidle2",
        timeout: 30000
      });
      
      console.log(`🏢 Navigated to room: ${roomName} - establishing presence...`);
      
      // Allow room to fully load and stabilize
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Store room configuration and page reference
      this.roomConfigs.set(roomName, botNick);
      this.roomPages.set(roomName, page);
      this.isProcessing.set(roomName, false);
      this.lastMessageIds.set(roomName, new Set());
      this.roomResponseTimes.set(roomName, 0);
      
      // Initialize room-specific state
      this.roomStates.set(roomName, {
        lastSeen: "",
        messageCount: 0,
        lastActivity: Date.now(),
        botPresenceAnnounced: false
      });
      
      // Extract user data for this room
      await this.extractRoomUserData(page, roomName);
      
      // Send initial presence message
      await this.bot.sendMsg(page, `💀 ${botNick} ONLINE with Murder on her mind💜💀👑`);
      this.roomStates.get(roomName).botPresenceAnnounced = true;
      
      // Setup message monitoring for this specific room
      this.setupRoomMessageMonitoring(page, roomName, botNick);
      
      // Setup random messages for this room
      this.setupRoomRandomMessages(page, roomName, botNick);
      
      console.log(`✅ Room ${roomName} fully operational with independent monitoring`);
      
    } catch (error) {
      console.error(`❌ Failed to setup room ${roomName}:`, error.message);
      
      // Enhanced error reporting for room setup failures
      try {
        const currentUrl = page.url();
        console.error(`🏢 Debug info - Current URL: "${currentUrl}"`);
        
        // Take debug screenshot for room setup issues
        if (this.bot.memoryDirectories && this.bot.memoryDirectories.temp) {
          await page.screenshot({ 
            path: `${this.bot.memoryDirectories.temp}\\room_setup_failure_${roomName}_${Date.now()}.png`,
            fullPage: false 
          });
          console.log(`🏢 Debug screenshot saved for room setup failure: ${roomName}`);
        }
        
      } catch (debugError) {
        console.log("🏢 Could not capture room setup debug info:", debugError.message);
      }
      
      throw error;
    }
  }

  /**
   * Setup message monitoring for a specific room
   * Each room gets its own independent monitoring loop
   * @param {Object} page - Puppeteer page for this room
   * @param {string} roomName - Name of the room
   * @param {string} botNick - Bot's nickname in this room
   */
  setupRoomMessageMonitoring(page, roomName, botNick) {
    console.log(`[MONITOR] Setting up independent monitoring for ${roomName} as ${botNick}`);
    
    // Create room-specific monitoring interval
    const monitoringInterval = setInterval(async () => {
      // Prevent overlapping processing for this specific room
      if (this.isProcessing.get(roomName)) {
        return;
      }
      
      try {
        this.isProcessing.set(roomName, true);
        await this.pollRoomMessages(page, roomName, botNick);
      } catch(error) {
        console.log(`[MONITOR] Polling error in ${roomName}:`, error.message);
      } finally {
        this.isProcessing.set(roomName, false);
      }
    }, this.pollingInterval);
    
    // Store interval for cleanup
    if (!this.roomIntervals.has(roomName)) {
      this.roomIntervals.set(roomName, []);
    }
    this.roomIntervals.get(roomName).push(monitoringInterval);
    
    console.log(`[MONITOR] Independent monitoring active for ${roomName} with ${this.pollingInterval}ms interval`);
  }

  /**
   * Poll messages for a specific room
   * Uses the enhanced message detection system from the main bot
   * @param {Object} page - Puppeteer page for this room
   * @param {string} roomName - Name of the room
   * @param {string} botNick - Bot's nickname in this room
   */
  async pollRoomMessages(page, roomName, botNick) {
    try {
      // Use the bot's enhanced message detection system
      const messages = await this.bot.checkForNewMessages(page, roomName, botNick);
      
      if (messages && messages.length > 0) {
        console.log(`🏢 Room ${roomName}: Detected ${messages.length} new messages`);
        
        // Update room activity tracking
        const roomState = this.roomStates.get(roomName);
        if (roomState) {
          roomState.lastActivity = Date.now();
          roomState.messageCount += messages.length;
        }
        
        // Process each message with room-specific context
        for (const message of messages) {
          await this.processRoomMessage(message, page, roomName, botNick);
        }
      }
    } catch (error) {
      console.log(`🏢 Message polling error for ${roomName}: ${error.message}`);
    }
  }

  /**
   * Process a message from a specific room
   * Adds room-specific context and deduplication
   * @param {Object} message - Message data from StumbleChat
   * @param {Object} page - Puppeteer page for this room
   * @param {string} roomName - Name of the room
   * @param {string} botNick - Bot's nickname in this room
   */
  async processRoomMessage(message, page, roomName, botNick) {
    try {
      // Create room-specific message ID for deduplication
      const messageId = `${roomName}_${message.nick}_${message.time}_${message.msg.substring(0, 30)}`.replace(/[^a-zA-Z0-9_]/g, '_');
      
      // Get room-specific message tracking
      const roomMessageIds = this.lastMessageIds.get(roomName);
      
      if (!roomMessageIds.has(messageId)) {
        roomMessageIds.add(messageId);
        
        // Clean up old message IDs for this room
        if (roomMessageIds.size > this.maxMessagesPerRoom) {
          const oldIds = Array.from(roomMessageIds).slice(0, Math.floor(this.maxMessagesPerRoom / 2));
          oldIds.forEach(id => roomMessageIds.delete(id));
        }
        
        console.log(`🏢 Processing ${roomName} message from ${message.nick}: ${message.msg.substring(0, 60)}...`);
        
        // Add room context to message data
        const roomMessage = {
          ...message,
          roomName: roomName,
          botNick: botNick,
          roomState: this.roomStates.get(roomName)
        };
        
        // Pass to bot's main message processing system
        await this.bot.processMessage(roomMessage, page, roomName, botNick);
        
        // Update room response tracking
        this.roomResponseTimes.set(roomName, Date.now());
      }
    } catch (error) {
      console.log(`🏢 Error processing message in ${roomName}:`, error.message);
    }
  }

  /**
   * Setup random messages for a specific room
   * Each room has independent random message timing
   * @param {Object} page - Puppeteer page for this room
   * @param {string} roomName - Name of the room
   * @param {string} botNick - Bot's nickname in this room
   */
  setupRoomRandomMessages(page, roomName, botNick) {
    console.log(`🏢 Setting up random messages for ${roomName} with independent timing`);
    
    // Room-specific random message interval
    const randomMessageInterval = setInterval(async () => {
      try {
        // Check if room is active (has recent activity)
        const roomState = this.roomStates.get(roomName);
        const timeSinceActivity = Date.now() - (roomState ? roomState.lastActivity : 0);
        
        // Only send random messages if room has been active recently (within 2 hours)
        if (timeSinceActivity < 2 * 60 * 60 * 1000 && Math.random() < 0.15) {
          const messages = [
            "💀 Death comes for all mortals… eventually",
            "💀 the undead never truly rest", 
            "💀 she's still here... in this dufflebag...",
            "*stares into the void*",
            "💀 memories preserved in the void... 📁💜",
            "👑 Reaper privileges active - Death will FUCKING kill you"
          ];
          
          const message = messages[Math.floor(Math.random() * messages.length)];
          await this.bot.sendMsg(page, message);
          
          console.log(`🏢 Sent random message in ${roomName}: ${message}`);
          
          // Update room state
          if (roomState) {
            roomState.lastActivity = Date.now();
          }
        }
      } catch(error) {
        console.log(`🏢 Random message error in ${roomName}:`, error.message);
      }
    }, (Math.random() * 8 + 12) * 60 * 1000); // 12-20 minutes, varies per room
    
    // Store interval for cleanup
    this.roomIntervals.get(roomName).push(randomMessageInterval);
    
    console.log(`🏢 Random messages active for ${roomName} with 12-20 minute intervals`);
  }

  /**
   * Extract user data from a specific room
   * Maintains room-specific user mappings
   * @param {Object} page - Puppeteer page for this room
   * @param {string} roomName - Name of the room
   */
  async extractRoomUserData(page, roomName) {
    try {
      const userData = await page.evaluate(() => {
        const users = [];
        const userElements = document.querySelectorAll('li.bar');
        
        userElements.forEach(userElement => {
          const nicknameElement = userElement.querySelector('span.nickname');
          const usernameElement = userElement.querySelector('span.username');
          
          if (nicknameElement && usernameElement) {
            const nickname = nicknameElement.textContent.trim();
            const username = usernameElement.textContent.trim();
            
            if (nickname && username) {
              users.push({ nickname, username, timestamp: Date.now() });
            }
          }
        });
        
        return users;
      });
      
      // Update bot's user mapping system with room context
      userData.forEach(user => {
        if (this.bot.nicknameToUsername && this.bot.nicknameToUsername.set) {
          this.bot.nicknameToUsername.set(user.nickname.toLowerCase(), user.username.toLowerCase());
        }
        if (this.bot.usernameToNickname && this.bot.usernameToNickname.set) {
          this.bot.usernameToNickname.set(user.username.toLowerCase(), user.nickname);
        }
      });
      
      console.log(`🏢 Extracted ${userData.length} user mappings from ${roomName}`);
      return userData;
    } catch (error) {
      console.log(`🏢 User data extraction failed for ${roomName}:`, error.message);
      return [];
    }
  }

  /**
   * Get status of all monitored rooms
   * @returns {Object} Comprehensive status of all rooms
   */
  getRoomStatus() {
    const status = {
      totalRooms: this.roomConfigs.size,
      activeRooms: 0,
      rooms: {},
      globalStats: {
        totalMessages: 0,
        totalIntervals: 0,
        oldestActivity: Date.now(),
        newestActivity: 0
      }
    };

    for (const [roomName, botNick] of this.roomConfigs.entries()) {
      const roomState = this.roomStates.get(roomName) || {};
      const isProcessing = this.isProcessing.get(roomName) || false;
      const messageCount = this.lastMessageIds.get(roomName)?.size || 0;
      const intervalCount = this.roomIntervals.get(roomName)?.length || 0;
      const lastResponse = this.roomResponseTimes.get(roomName) || 0;
      
      const timeSinceActivity = Date.now() - (roomState.lastActivity || 0);
      const isActive = timeSinceActivity < 30 * 60 * 1000; // Active if activity within 30 minutes
      
      if (isActive) status.globalStats.activeRooms++;
      
      status.rooms[roomName] = {
        botNick: botNick,
        isActive: isActive,
        isProcessing: isProcessing,
        messageCount: roomState.messageCount || 0,
        trackedMessageIds: messageCount,
        intervals: intervalCount,
        lastActivity: roomState.lastActivity || 0,
        timeSinceActivity: timeSinceActivity,
        lastBotResponse: lastResponse,
        presenceAnnounced: roomState.botPresenceAnnounced || false
      };
      
      // Update global stats
      status.globalStats.totalMessages += roomState.messageCount || 0;
      status.globalStats.totalIntervals += intervalCount;
      if (roomState.lastActivity) {
        status.globalStats.oldestActivity = Math.min(status.globalStats.oldestActivity, roomState.lastActivity);
        status.globalStats.newestActivity = Math.max(status.globalStats.newestActivity, roomState.lastActivity);
      }
    }

    return status;
  }

  /**
   * Send a message to a specific room
   * @param {string} roomName - Name of the target room
   * @param {string} message - Message to send
   * @returns {boolean} Success status
   */
  async sendToRoom(roomName, message) {
    try {
      const page = this.roomPages.get(roomName);
      if (!page) {
        console.log(`🏢 Cannot send to ${roomName}: No page reference found`);
        return false;
      }

      await this.bot.sendMsg(page, message);
      
      // Update room activity
      const roomState = this.roomStates.get(roomName);
      if (roomState) {
        roomState.lastActivity = Date.now();
      }
      this.roomResponseTimes.set(roomName, Date.now());
      
      console.log(`🏢 Message sent to ${roomName}: ${message}`);
      return true;
    } catch (error) {
      console.log(`🏢 Failed to send message to ${roomName}:`, error.message);
      return false;
    }
  }

  /**
   * Broadcast a message to all monitored rooms
   * @param {string} message - Message to broadcast
   * @param {Array} excludeRooms - Rooms to exclude from broadcast
   * @returns {Object} Results of broadcast attempt
   */
  async broadcastToAllRooms(message, excludeRooms = []) {
    const results = {
      total: this.roomConfigs.size,
      successful: 0,
      failed: 0,
      results: {}
    };

    for (const roomName of this.roomConfigs.keys()) {
      if (excludeRooms.includes(roomName)) {
        results.results[roomName] = 'excluded';
        continue;
      }

      const success = await this.sendToRoom(roomName, message);
      if (success) {
        results.successful++;
        results.results[roomName] = 'sent';
      } else {
        results.failed++;
        results.results[roomName] = 'failed';
      }
      
      // Small delay between broadcasts to prevent spam detection
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`🏢 Broadcast complete: ${results.successful}/${results.total} successful`);
    return results;
  }

  /**
   * Update music system with all room page references
   * Allows music system to work across all monitored rooms
   */
  updateMusicSystemReferences() {
    if (this.bot.musicSystem && typeof this.bot.musicSystem.updatePageReferences === 'function') {
      try {
        this.bot.musicSystem.updatePageReferences(this.roomPages);
        console.log("🎵 Music system updated with all room page references");
        return true;
      } catch (musicError) {
        console.log("⚠️ Music system page reference update failed:", musicError.message);
        return false;
      }
    }
    return false;
  }

  /**
   * Cleanup and shutdown all room monitoring
   * Call this when shutting down the bot
   */
  async shutdown() {
    console.log("🏢 Shutting down multi-room monitoring system...");
    
    try {
      // Send farewell messages to all rooms
      const farewellMessage = "🖤 Dahlia Damnation withdrawing with calculated grace - digital authority preserved for return";
      
      for (const [roomName, page] of this.roomPages.entries()) {
        try {
          if (page && !page.isClosed()) {
            await this.bot.sendMsg(page, farewellMessage, false, { force: true });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Allow message to send
            console.log(`🏢 Farewell sent to ${roomName}`);
          }
        } catch (error) {
          console.log(`🏢 Farewell warning for ${roomName}: ${error.message}`);
        }
      }
      
      // Clear all room-specific intervals
      let totalIntervals = 0;
      for (const [roomName, intervals] of this.roomIntervals.entries()) {
        intervals.forEach(interval => {
          try {
            clearInterval(interval);
            totalIntervals++;
          } catch (error) {
            console.log(`🏢 Interval cleanup warning for ${roomName}: ${error.message}`);
          }
        });
      }
      
      console.log(`🏢 Cleared ${totalIntervals} room-specific monitoring intervals`);
      
      // Clear tracking data
      this.roomConfigs.clear();
      this.roomPages.clear();
      this.roomIntervals.clear();
      this.roomStates.clear();
      this.isProcessing.clear();
      this.lastMessageIds.clear();
      this.roomResponseTimes.clear();
      
      console.log("🏢 Multi-room monitoring system shutdown complete");
      
    } catch (error) {
      console.error("🏢 Error during multi-room shutdown:", error.message);
    }
  }
}

module.exports = MultiRoomManager;