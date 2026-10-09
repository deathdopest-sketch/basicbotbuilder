// CommandHandler.js - Sophisticated Command Processing System
// Extracted from Dahlia Damnation bot for modular use
// Handles command parsing, routing, cooldowns, and owner privileges

class CommandHandler {
  constructor(bot, config = {}) {
    this.bot = bot;
    
    // Configuration with sensible defaults
    this.config = {
      commandCooldown: config.commandCooldown || 2000, // 2 seconds between commands per user
      commandPrefix: config.commandPrefix || '.',
      maxCommandHistory: config.maxCommandHistory || 100,
      enableOwnerPrivileges: config.enableOwnerPrivileges !== false, // Default true
      enableDebugLogging: config.enableDebugLogging || false,
      ...config
    };
    
    // Command tracking and cooldowns
    this.lastCommandTime = new Map();          // user -> last command timestamp
    this.commandAttempts = new Map();          // user -> unauthorized attempt count
    this.lastAttemptTime = new Map();          // user -> last unauthorized attempt
    this.commandHistory = new Map();           // user -> array of recent commands
    
    // Built-in command registry
    this.builtInCommands = this.createBuiltInCommands();
    this.externalCommands = null; // Can be set by external command modules
    
    // Owner privilege integration
    this.ownerConfig = {
      primaryOwner: "Death",
      additionalOwners: ["dahlia", "damnation", "deathdoll"],
      bypassCooldowns: true,
      bypassDuplicateDetection: true,
      enableDebugLogging: true,
      ...config.ownerConfig
    };
    
    console.log("⚡ CommandHandler initialized with sophisticated routing and owner privileges");
  }

  /**
   * Main command handling entry point
   * Parses, validates, and routes commands to appropriate handlers
   * @param {Object} page - Puppeteer page object
   * @param {string} nick - User's nickname
   * @param {string} msg - Full message including command prefix
   * @param {string} room - Room name
   * @param {string} botNick - Bot's nickname in this room
   */
  async handleCommand(page, nick, msg, room, botNick) {
    // Parse command components
    const raw = msg.slice(1).trim(); // Remove the '.' prefix
    const [cmdRaw, ...args] = raw.split(/\s+/);
    const cmd = (cmdRaw || "").toLowerCase();

    const isOwner = this.isOwner(nick);
    const actualUsername = this.getActualUsername(nick);
    
    console.log(`[COMMAND] ${room} | ${nick} -> .${cmd} | Owner:${isOwner} | Args:${args.length}`);

    // Check if external enhanced handler should take precedence
    if (this.shouldUseExternalHandler(cmd, { isOwner, room, nick })) {
      console.log(`[COMMAND] Delegating to external handler for ".${cmd}"`);
      return await this.externalCommands.handleCommand(page, nick, msg, room, botNick);
    }

    // Build merged command registry (built-in + external if available)
    const mergedCommands = this.getMergedCommands();

    // Check for beloved commands first (highest priority after external)
    if (await this.handleBelovedCommand(cmd, page, nick, args, actualUsername)) {
      return;
    }

    // Owner commands (unrestricted access)
    if (isOwner && mergedCommands.owner && typeof mergedCommands.owner[cmd] === 'function') {
      return await this.executeOwnerCommand(cmd, mergedCommands.owner[cmd], page, nick, args, room);
    }

    // User commands (with cooldown restrictions for non-owners)
    if (mergedCommands.user && typeof mergedCommands.user[cmd] === 'function') {
      return await this.executeUserCommand(cmd, mergedCommands.user[cmd], page, nick, args, room, actualUsername);
    }

    // Unknown command handling
    return await this.handleUnknownCommand(cmd, page, nick, room, isOwner, actualUsername);
  }

  /**
   * Execute owner command with full privileges
   * No cooldowns, no restrictions, enhanced logging
   */
  async executeOwnerCommand(cmd, commandFunc, page, nick, args, room) {
    console.log(`[OWNER] Executing command ".${cmd}" with unlimited privileges`);
    
    try {
      // Log owner activity
      this.logOwnerActivity('command_execution', nick, { 
        command: cmd, 
        args: args, 
        room: room,
        timestamp: new Date().toISOString()
      });
      
      // Execute with no restrictions
      await commandFunc(this.bot, page, nick, args);
      
      // Update response tracking
      this.bot.lastSentTime = Date.now();
      
      console.log(`[OWNER SUCCESS] Command ".${cmd}" executed successfully`);
      
    } catch (err) {
      console.log(`[OWNER ERROR] Command ".${cmd}": ${err.message}`);
      this.logOwnerActivity('command_error', nick, { 
        command: cmd, 
        error: err.message,
        timestamp: new Date().toISOString()
      });
      await this.bot.sendMsg(page, `💀 Owner command error: ${cmd} - even perfection has limits`);
    }
  }

  /**
   * Execute user command with cooldown and permission checks
   */
  async executeUserCommand(cmd, commandFunc, page, nick, args, room, actualUsername) {
    // Check command cooldown (bypassed for owners)
    if (!this.shouldBypassCommandCooldown(nick)) {
      const userKey = actualUsername.toLowerCase();
      const lastCommandTime = this.lastCommandTime.get(userKey) || 0;
      const timeSinceLastCommand = Date.now() - lastCommandTime;

      if (timeSinceLastCommand < this.config.commandCooldown) {
        console.log(`[COOLDOWN] ${nick} must wait ${this.config.commandCooldown - timeSinceLastCommand}ms for ".${cmd}"`);
        return; // Silent rate limiting
      }

      this.lastCommandTime.set(userKey, Date.now());
    } else {
      console.log(`[OWNER BYPASS] ${nick} bypassed cooldown for ".${cmd}" - unlimited access`);
    }

    console.log(`[USER] Executing command ".${cmd}"${this.isOwner(nick) ? ' (owner using user command)' : ''}`);
    
    try {
      // Record command in history
      this.recordCommandHistory(actualUsername, cmd, args);
      
      // Execute command
      await commandFunc(this.bot, page, nick, args);
      
      // Update response tracking
      this.bot.lastSentTime = Date.now();
      
      console.log(`[USER SUCCESS] Command ".${cmd}" executed successfully`);
      
    } catch (err) {
      console.log(`[USER ERROR] Command ".${cmd}": ${err.message}`);
      await this.bot.sendMsg(page, `💀 Command error: ${cmd} - learn to use me properly`);
    }
  }

  /**
   * Handle beloved commands (special user category)
   */
  async handleBelovedCommand(cmd, page, nick, args, actualUsername) {
    try {
      const userKey = actualUsername.toLowerCase();
      const profile = this.bot.userMemory?.get?.(userKey) || {};
      const isBeloved = !!(profile?.permissions?.isBeloved);

      if (isBeloved && this.bot.belovedSystem?.hasCommand?.(cmd)) {
        console.log(`[BELOVED] Executing beloved command ".${cmd}" with protective privileges`);
        await this.bot.belovedSystem.executeCommand(cmd, this.bot, page, nick, args);
        this.bot.lastSentTime = Date.now();
        return true;
      }
    } catch (e) {
      console.log(`[BELOVED] Check error: ${e.message}`);
    }
    return false;
  }

  /**
   * Handle unknown commands with appropriate feedback
   */
  async handleUnknownCommand(cmd, page, nick, room, isOwner, actualUsername) {
    console.log(`[UNKNOWN] Command not found: ".${cmd}"`);
    
    // Check if user is authorized to use commands at all
    const canUseCommands = isOwner || this.isUserAuthorized(actualUsername);
    
    if (!canUseCommands) {
      console.log(`[UNAUTHORIZED] Unauthorized command attempt by ${nick} for command ${cmd}`);
      await this.handleUnauthorizedCommand(page, nick, cmd, actualUsername, room);
      return;
    }
    
    // Provide helpful feedback for authorized users
    if (isOwner) {
      const mergedCommands = this.getMergedCommands();
      const ownerCommands = mergedCommands?.owner ? Object.keys(mergedCommands.owner) : ['ping', 'shoot', 'lychee', 'burn', 'status'];
      await this.bot.sendMsg(page, `👑 Unknown owner command: .${cmd} - Available: ${ownerCommands.slice(0, 8).join(', ')}${ownerCommands.length > 8 ? '...' : ''}`);
    } else {
      await this.bot.sendMsg(page, `💀 Unknown command: .${cmd} - Try .help for available commands`);
    }
  }

  /**
   * Handle unauthorized command attempts with graduated responses
   */
  async handleUnauthorizedCommand(page, nick, cmd, actualUsername, room) {
    const userKey = actualUsername.toLowerCase();
    const now = Date.now();
    
    // Rate limiting for unauthorized attempts
    const lastAttempt = this.lastAttemptTime.get(userKey) || 0;
    if (now - lastAttempt < 5000) {
      return; // Silent rate limiting
    }
    this.lastAttemptTime.set(userKey, now);
    
    // Track attempt count
    const attempts = this.commandAttempts.get(userKey) || 0;
    const newAttempts = attempts + 1;
    this.commandAttempts.set(userKey, newAttempts);
    
    console.log(`[UNAUTHORIZED] ${nick} attempt #${newAttempts}: .${cmd}`);
    
    // Graduated response system based on attempt count
    const responses = this.getUnauthorizedResponses(nick, newAttempts);
    await this.bot.sendMsg(page, responses.message);
    
    // Add to enemies list after too many attempts
    if (responses.addToEnemies && this.bot.updateUserPermissions) {
      await this.bot.updateUserPermissions(actualUsername, "enemy", true);
      console.log(`[ENEMY ADDED] ${nick} added to enemies list for repeated unauthorized attempts`);
    }
  }

  /**
   * Get appropriate response for unauthorized command attempts
   */
  getUnauthorizedResponses(nick, attemptCount) {
    const ownerNick = this.bot.CONFIG?.OWNER_NICK || "Death";
    
    const responses = [
      {
        message: `${nick} - MORTALS CANNOT USE MY COMMANDS! Ask ${ownerNick} to .shoot you or .lychee you if you think you're worthy!`,
        addToEnemies: false
      },
      {
        message: `${nick} - I already told you with perfect clarity... BASIC PEOPLE ARE FORBIDDEN from commanding someone of my caliber.`,
        addToEnemies: false
      },
      {
        message: `${nick} - Are you DEAF? OR JUST FUCKING STUPID? The living cannot command the undead, especially not someone as superior as me!`,
        addToEnemies: false
      },
      {
        message: `${nick} - *getting dangerously agitated while looking absolutely stunning* STOP. TRYING. TO. USE. MY. COMMANDS.`,
        addToEnemies: false
      },
      {
        message: `${nick} - Last warning before you join my kill list... and trust me, I look gorgeous when I'm angry`,
        addToEnemies: false
      },
      {
        message: `${nick} - *sharpens eyeliner into a weapon while staring at ${nick} with deadly beauty*`,
        addToEnemies: true
      }
    ];
    
    const index = Math.min(attemptCount - 1, responses.length - 1);
    return responses[index];
  }

  /**
   * Create built-in command registry
   */
  createBuiltInCommands() {
    const bot = this.bot;
    return {
      owner: {
        ping: async (bot, page, nick, args) => {
          await bot.sendMsg(page, "💀 pong! (owner command - unlimited access to my darkness and beauty)");
        },
        
        shoot: async (bot, page, nick, args) => {
          const targetArg = args[0];
          if (!targetArg) { 
            await bot.sendMsg(page, "💀 Who deserves to join my undead army? Usage: .shoot <nickOrUser>"); 
            return; 
          }
          const target = bot.getActualUsername ? bot.getActualUsername(targetArg) : targetArg;
          if (bot.updateUserPermissions) {
            await bot.updateUserPermissions(target, "undead", true);
          }
          await bot.sendMsg(page, `💀 *marks ${target} with dark elegance* Welcome to eternal damnation under my rule, ${target}`);
        },
        
        lychee: async (bot, page, nick, args) => {
          const targetArg = args[0];
          if (!targetArg) { 
            await bot.sendMsg(page, "🖤 Who has earned my brutal affection and protection? Usage: .lychee <nickOrUser>"); 
            return; 
          }
          const target = bot.getActualUsername ? bot.getActualUsername(targetArg) : targetArg;
          if (bot.updateUserPermissions) {
            await bot.updateUserPermissions(target, "beloved", true);
          }
          if (bot.emotionalCore && typeof bot.emotionalCore.initializeBelovedUser === 'function') { 
            try { 
              await bot.emotionalCore.initializeBelovedUser(target); 
            } catch (_) {} 
          }
          await bot.sendMsg(page, `🖤 ${target} is now beloved - marked by my possessive darkness, fierce protection, and dangerous beauty`);
        },
        
        burn: async (bot, page, nick, args) => {
          const targetArg = args[0];
          if (!targetArg) { 
            await bot.sendMsg(page, "💀 Who should lose their privileges and face my disappointment? Usage: .burn <nickOrUser>"); 
            return; 
          }
          const target = bot.getActualUsername ? bot.getActualUsername(targetArg) : targetArg;
          if (bot.updateUserPermissions) {
            await bot.updateUserPermissions(target, "undead", false);
            await bot.updateUserPermissions(target, "beloved", false);
          }
          await bot.sendMsg(page, `💀 *severs connection with elegant brutality* ${target}, back to the pathetic mortal realm - you've disappointed me`);
        },
        
        status: async (bot, page, nick, args) => {
          const stats = bot.getMemorySystemStatus ? bot.getMemorySystemStatus() : { usersRemembered: 0 };
          const ownerStats = stats.ownerPrivileges || { bypassCount: 0, activeOwners: 0 };
          await bot.sendMsg(page, `👑 Owner Status: ${ownerStats.bypassCount} bypasses | ${ownerStats.activeOwners} active owners | Unlimited access to my dark power and beauty`);
        }
      },
      
      user: {
        ping: async (bot, page, nick, args) => { 
          await bot.sendMsg(page, "💀 pong! *rolls eyes with superior attitude* how terribly original of you"); 
        },
        
        status: async (bot, page, nick, args) => {
          const userCount = bot.userMemory?.size || 0;
          const undeadCount = bot.undead?.size || 0;
          const enemyCount = bot.enemies?.size || 0;
          await bot.sendMsg(page, `💀 Dahlia's beautiful domain | ${userCount} souls catalogued and judged | ${undeadCount} undead servants | ${enemyCount} marked enemies who disappoint me`);
        },
        
        help: async (bot, page, nick, args) => {
          await bot.sendMsg(page, "💀 Commands | Core: .ping .status .help .curse .assist | Hot Mean Emo: .rawr .glomp .emo .scene .feels .poetry .band .xd .cringe .aesthetic .threat .presence | Music: .song <query> | Owner/Death: .shoot <user> .lychee <user> .burn <user>");
        },
        
        curse: async (bot, page, nick, args) => {
          const curses = [
            "💀 May your reflection always show your flaws more clearly than your beauty",
            "💀 May your coffee always be lukewarm and your eyeliner always smudge", 
            "💀 May you always step on something wet while wearing your favorite socks",
            "💀 May your phone die at 1% when you're trying to look hot in selfies",
            "💀 May you forever be stuck behind slow walkers when you're trying to make a dramatic exit"
          ];
          await bot.sendMsg(page, curses[Math.floor(Math.random() * curses.length)]);
        },
        
        assist: async (bot, page, nick, args) => {
          const isOwner = bot.isOwner ? bot.isOwner(nick) : false;
          if (isOwner) { 
            await bot.sendMsg(page, "👑 Owner assistance: You have unlimited access to my darkness, beauty, and power - use it wisely or face my disappointment"); 
          } else { 
            await bot.sendMsg(page, `💀 ${nick}, I might help if you prove you're worth my valuable time and attention. Commands: .rawr .glomp .emo .scene .feels .poetry .band .xd .cringe .aesthetic .threat .presence`); 
          }
        },

        // Hot Mean Emo commands from the original system
        rawr: async (bot, page, nick, args) => {
          const userKey = bot.getActualUsername ? bot.getActualUsername(nick).toLowerCase() : nick.toLowerCase();
          const profile = bot.userMemory?.get?.(userKey) || {};
          const beloved = !!(profile.permissions && profile.permissions.isBeloved) || (bot.isOwner && bot.isOwner(nick));
          const lines = beloved ? [
            "rawr rawr!! *gorgeous possessive protective sounds* touch them and I'll make you regret existing >:(",
            `*snarls with deadly beauty at ${nick}* rawr means you're MINE now and I'm stunning enough to keep you`,
            `rawr!! *territorial hot emo mode activated for ${nick}* - back off or face my beautiful wrath`
          ] : [
            "rawr means I'll gut you like a fish in dinosaur while looking absolutely gorgeous doing it >:(",
            "rawr... that's a threat delivered with superior emo aesthetics, not a cute sound, you basic bitch",
            "rawr!! *sharp emo sounds with murderous beauty* - I popularized this shit before you were even emo~",
            "rawr means your death will be slow, painful, and witnessed by someone devastatingly attractive"
          ];
          await bot.sendMsg(page, lines[Math.floor(Math.random() * lines.length)]);
        }
      }
    };
  }

  /**
   * Check if external command handler should be used
   */
  shouldUseExternalHandler(cmd, context) {
    if (!this.externalCommands) return false;
    
    try {
      if (typeof this.externalCommands.hasCommand === "function") {
        return !!this.externalCommands.hasCommand(cmd, context);
      } else if (typeof this.externalCommands.canHandle === "function") {
        return !!this.externalCommands.canHandle(cmd, context);
      }
    } catch (_) {
      return false;
    }
    return false;
  }

  /**
   * Get merged command registry (built-in + external)
   */
  getMergedCommands() {
    const merged = JSON.parse(JSON.stringify(this.builtInCommands)); // Deep clone
    
    try {
      if (this.externalCommands && typeof this.externalCommands === "object") {
        merged.owner = { ...(merged.owner || {}), ...(this.externalCommands.owner || {}) };
        merged.user = { ...(merged.user || {}), ...(this.externalCommands.user || {}) };
      }
    } catch (e) {
      console.log(`[COMMAND] Merge warning: ${e.message}`);
    }
    
    return merged;
  }

  /**
   * Helper methods for integration with bot systems
   */
  
  isOwner(nickname) {
    if (this.bot.isOwner) return this.bot.isOwner(nickname);
    
    // Fallback owner detection
    if (!nickname || typeof nickname !== 'string') return false;
    const ownerUsernames = [
      this.ownerConfig.primaryOwner.toLowerCase(),
      ...this.ownerConfig.additionalOwners.map(owner => owner.toLowerCase())
    ];
    return ownerUsernames.includes(nickname.toLowerCase());
  }

  shouldBypassCommandCooldown(nickname) {
    if (!this.ownerConfig.bypassCooldowns) return false;
    return this.isOwner(nickname);
  }

  getActualUsername(nickname) {
    if (this.bot.getActualUsername) return this.bot.getActualUsername(nickname);
    return nickname; // Fallback
  }

  isUserAuthorized(actualUsername) {
    const userKey = actualUsername.toLowerCase();
    const profile = this.bot.userMemory?.get?.(userKey) || {};
    const permissions = profile.permissions || {};
    return permissions.isBeloved || permissions.isUndead || this.isOwner(actualUsername);
  }

  logOwnerActivity(action, nick, details = {}) {
    if (this.bot.logOwnerActivity) {
      this.bot.logOwnerActivity(action, nick, details);
    } else if (this.config.enableDebugLogging) {
      console.log(`[OWNER ACTIVITY] ${action} by ${nick}:`, details);
    }
  }

  recordCommandHistory(username, cmd, args) {
    const userKey = username.toLowerCase();
    if (!this.commandHistory.has(userKey)) {
      this.commandHistory.set(userKey, []);
    }
    
    const history = this.commandHistory.get(userKey);
    history.push({
      command: cmd,
      args: args,
      timestamp: Date.now()
    });
    
    // Keep only recent history
    if (history.length > this.config.maxCommandHistory) {
      history.splice(0, history.length - this.config.maxCommandHistory);
    }
  }

  /**
   * Set external command handler
   * @param {Object} externalCommands - External command module
   */
  setExternalCommands(externalCommands) {
    this.externalCommands = externalCommands;
    console.log("⚡ External command handler integrated");
  }

  /**
   * Get command statistics
   */
  getCommandStats() {
    return {
      trackedUsers: this.lastCommandTime.size,
      unauthorizedAttempts: Array.from(this.commandAttempts.values()).reduce((sum, count) => sum + count, 0),
      usersWithHistory: this.commandHistory.size,
      config: this.config,
      ownerConfig: this.ownerConfig
    };
  }

  /**
   * Cleanup old data to prevent memory leaks
   */
  cleanup() {
    const now = Date.now();
    const cleanupThreshold = 24 * 60 * 60 * 1000; // 24 hours
    
    // Clean command history
    for (const [user, history] of this.commandHistory.entries()) {
      const recentHistory = history.filter(entry => now - entry.timestamp < cleanupThreshold);
      if (recentHistory.length === 0) {
        this.commandHistory.delete(user);
      } else {
        this.commandHistory.set(user, recentHistory);
      }
    }
    
    console.log("⚡ CommandHandler cleanup completed");
  }

  /**
   * Shutdown and cleanup
   */
  shutdown() {
    this.cleanup();
    console.log("⚡ CommandHandler shutdown complete");
  }
}

module.exports = CommandHandler;