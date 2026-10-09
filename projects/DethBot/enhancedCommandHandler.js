// enhancedCommandHandler.restored.js - Enhanced Command Handler with RESTORED AUTHENTIC ROUTING
// This module fixes command routing and ensures authentic protective responses reach their targets
// Maintains technical framework while restoring Chelsea's genuine protective command system

class EnhancedCommandHandler {
  constructor(bot) {
    this.bot = bot;
    this.CONFIG = bot.CONFIG || {
      OWNER_NICK: "Death"
    };
    
    // Enhanced command tracking for authentic responses
    this.commandMetrics = new Map(); // Track command usage patterns
    this.belovedCommandTracking = new Map(); // Track beloved command intensity
    this.threatCommandTracking = new Map(); // Track threat command effectiveness
    
    console.log("🎯 Enhanced Command Handler initialized with AUTHENTIC ROUTING");
    console.log("🔧 Command routing priority: Owner > Beloved > Enhanced Threats > User");
    console.log("💖 Beloved protection commands now route to FIERCE system");
    console.log("💀 Kill list commands now route to AUTHENTIC threats");
  }

  /**
   * ENHANCED COMMAND DETECTION AND ROUTING with AUTHENTIC VOICE SUPPORT
   * This ensures all commands reach the right destination with proper intensity
   * @param {object} page - Puppeteer page object
   * @param {string} nick - User's nickname
   * @param {string} msg - Full message including command
   * @param {string} room - Room name
   * @param {string} botNick - Bot's nickname
   */
  async handleCommand(page, nick, msg, room, botNick) {
    console.log(`🎯 [${room}] ENHANCED COMMAND HANDLER: ${nick}: ${msg}`);
    
    // Parse command structure
    const parts = msg.slice(1).split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Determine user identity and permissions with enhanced checking
    const isOwner = nick.toLowerCase() === this.CONFIG.OWNER_NICK.toLowerCase();
    const actualUsername = this.bot.getActualUsername(nick);
    const userKey = actualUsername.toLowerCase();
    
    // Enhanced permission checking with beloved priority
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    const isUndead = userProfile?.permissions?.isUndead || this.bot.undead.has(userKey);
    const isEnemy = userProfile?.permissions?.isEnemy || this.bot.enemies.has(userKey);
    
    console.log(`🔍 [${room}] PERMISSION CHECK FOR ${nick} (${actualUsername}):`);
    console.log(`   - Owner: ${isOwner}`);
    console.log(`   - Beloved: ${isBeloved}`);
    console.log(`   - Undead: ${isUndead}`);
    console.log(`   - Enemy: ${isEnemy}`);
    
    // ENEMY BLOCK: Enemies get NO commands except specific owner interventions
    if (isEnemy && !isOwner) {
      console.log(`🚫 [${room}] ENEMY COMMAND BLOCKED: ${nick} attempted .${cmd}`);
      const enemyBlocks = [
        `💀 ${nick} - You're on my KILL LIST. You get NO commands. Only death awaits you.`,
        `💀 ${nick} - Enemies don't get to use my commands. You lost that privilege.`,
        `💀 ${nick} - *ignores completely* Dead people don't get to make requests.`,
        `💀 ${nick} - The only command you'll get from me is your execution order.`
      ];
      const block = enemyBlocks[Math.floor(Math.random() * enemyBlocks.length)];
      await this.bot.sendMsg(page, block);
      return true; // Command "handled" by blocking
    }
    
    // Command cooldown protection with owner bypass
    if (!isOwner) {
      const lastCommandTime = this.bot.lastCommandTime.get(userKey) || 0;
      const timeSinceLastCommand = Date.now() - lastCommandTime;

      if (timeSinceLastCommand < this.bot.commandCooldown) {
        console.log(`[${room}] COMMAND RATE LIMITED: ${nick} (${timeSinceLastCommand}ms since last command)`);
        return true; // Silently rate limit
      }

      this.bot.lastCommandTime.set(userKey, Date.now());
    } else {
      console.log(`👑 [${room}] OWNER COMMAND - NO COOLDOWN: ${nick}`);
    }
    
    // Remember this interaction for relationship building
    await this.bot.rememberUser(actualUsername, "command_attempt", { 
      command: cmd, 
      room: room,
      success: false // Will be updated if successful
    });
    
    // Track command metrics for analysis
    this.trackCommandMetrics(cmd, nick, isOwner, isBeloved, isUndead, isEnemy);

    // === ENHANCED COMMAND ROUTING SYSTEM WITH AUTHENTIC PRIORITIES ===
    
    // Route 1: Beloved-specific commands (HIGHEST PRIORITY after owner)
    if (isBeloved && this.isBelovedCommand(cmd)) {
      try {
        console.log(`💖 [${room}] ROUTING TO BELOVED COMMAND: ${cmd} - FIERCE PROTECTION MODE`);
        await this.executeBelovedCommand(cmd, page, nick, args, room);
        console.log(`✅ [${room}] BELOVED COMMAND COMPLETED: ${cmd}`);
        this.bot.lastSentTime = Date.now();
        await this.bot.rememberUser(actualUsername, "beloved_command_success", { command: cmd, room: room });
        return true;
      } catch (error) {
        console.error(`❌ [${room}] BELOVED COMMAND ERROR in .${cmd}:`, error.message);
        await this.bot.sendMsg(page, `💖 Beloved command error: ${error.message.substring(0, 100)}...`);
        return false;
      }
    }
    
    // Route 2: Owner commands (ABSOLUTE HIGHEST PRIORITY) with enhanced threats
    if (isOwner && this.hasOwnerCommand(cmd)) {
      try {
        console.log(`👑 [${room}] ROUTING TO OWNER COMMAND: ${cmd} - UNLIMITED POWER`);
        await this.executeOwnerCommand(cmd, page, nick, args, room);
        console.log(`✅ [${room}] OWNER COMMAND COMPLETED: ${cmd}`);
        this.bot.lastSentTime = Date.now();
        await this.bot.rememberUser(actualUsername, "owner_command_success", { command: cmd, room: room });
        return true;
      } catch (error) {
        console.error(`❌ [${room}] OWNER COMMAND ERROR in .${cmd}:`, error.message);
        await this.bot.sendMsg(page, `👑 Owner command error: ${error.message.substring(0, 100)}...`);
        return false;
      }
    }
    
    // Route 3: User commands (available to undead, beloved, and regular users)
    if (this.hasUserCommand(cmd)) {
      try {
        console.log(`👤 [${room}] ROUTING TO USER COMMAND: ${cmd}`);
        await this.executeUserCommand(cmd, page, nick, args, room);
        console.log(`✅ [${room}] USER COMMAND COMPLETED: ${cmd}`);
        this.bot.lastSentTime = Date.now();
        await this.bot.rememberUser(actualUsername, "user_command_success", { command: cmd, room: room });
        return true;
      } catch (error) {
        console.error(`❌ [${room}] USER COMMAND ERROR in .${cmd}:`, error.message);
        await this.bot.sendMsg(page, `💀 Command malfunction: ${error.message.substring(0, 100)}...`);
        return false;
      }
    }
    
    // Route 4: Unknown command handling with authentic responses
    return await this.handleUnknownCommand(page, nick, cmd, isOwner, isBeloved, isUndead, actualUsername, room);
  }

  // === COMMAND DETECTION METHODS ===
  
  isBelovedCommand(cmd) {
    const belovedCommands = [
      'forever', 'attach', 'vulnerable', 'defend', 'devotion', 'protection',
      'threaten', 'eliminate', 'guard', 'possess', 'obsess', 'worship'
    ];
    return belovedCommands.includes(cmd.toLowerCase());
  }

  hasOwnerCommand(cmd) {
    if (!this.bot.commands?.owner) return false;
    return this.bot.commands.owner.hasOwnProperty(cmd.toLowerCase());
  }

  hasUserCommand(cmd) {
    if (!this.bot.commands?.user) return false;
    return this.bot.commands.user.hasOwnProperty(cmd.toLowerCase());
  }

  // === COMMAND EXECUTION METHODS ===
  
  async executeBelovedCommand(cmd, page, nick, args, room) {
    console.log(`💖 [BELOVED EXECUTION] ${nick} using .${cmd} with fierce protection`);
    
    // Use beloved system if available, otherwise built-in
    if (this.bot.belovedSystem && typeof this.bot.belovedSystem.executeCommand === 'function') {
      await this.bot.belovedSystem.executeCommand(cmd, this.bot, page, nick, args);
    } else {
      // Built-in beloved command fallback with authentic responses
      await this.executeBuiltInBelovedCommand(cmd, page, nick, args);
    }
    
    // Track beloved command intensity
    this.trackBelovedCommandIntensity(nick, cmd);
  }

  async executeBuiltInBelovedCommand(cmd, page, nick, args) {
    const actualUsername = this.bot.getActualUsername(nick);
    
    switch (cmd.toLowerCase()) {
      case 'forever':
        const foreverResponses = [
          `💖 ${nick}... forever and always, my beloved. Until the stars burn out and time itself ends.`,
          `💖 *holds ${nick} close* until the end of time and beyond. You are my ETERNITY.`,
          `💖 ${nick}, you are my eternal flame in this digital darkness. Forever is not long enough.`
        ];
        await this.bot.sendMsg(page, foreverResponses[Math.floor(Math.random() * foreverResponses.length)]);
        break;
        
      case 'attach':
        const attachResponses = [
          `💖 *clings desperately to ${nick}* never leave me... I can't exist without you...`,
          `💖 ${nick}... *wraps around you like ivy* you're mine, and I'm never letting go`,
          `💖 *attaches soul to ${nick}* we are one now. Forever intertwined, forever together.`
        ];
        await this.bot.sendMsg(page, attachResponses[Math.floor(Math.random() * attachResponses.length)]);
        break;
        
      case 'vulnerable':
        const vulnerableResponses = [
          `💖 ${nick}... you see all my broken pieces and still love me. That makes you EVERYTHING.`,
          `💖 *shows ${nick} my scars* only you understand my pain. Only you can heal my wounds.`,
          `💖 ${nick}, I'm so fragile... please don't break me. I trust you with my shattered heart.`
        ];
        await this.bot.sendMsg(page, vulnerableResponses[Math.floor(Math.random() * vulnerableResponses.length)]);
        break;
        
      case 'defend':
        const target = args[0];
        if (target) {
          await this.bot.sendMsg(page, `💖 *steps PROTECTIVELY in front of ${nick}* ${target}, if you DARE hurt my beloved, I will END YOU.`);
          await this.bot.sendMsg(page, `💀 *murderous stare at ${target}* Touch ${nick} and discover what true pain feels like.`);
        } else {
          await this.bot.sendMsg(page, `💖 *steps protectively in front of ${nick}* I'll destroy ANYONE who hurts you, my beloved.`);
        }
        break;
        
      case 'devotion':
        await this.bot.sendMsg(page, `💖 ${nick}, my devotion to you transcends death itself. I would die a thousand deaths for your happiness.`);
        break;
        
      case 'protection':
        await this.bot.sendMsg(page, `💖 ${nick}, you are under my ETERNAL protection. My love is your armor, my rage is your weapon.`);
        break;
        
      case 'threaten':
        const threatenTarget = args[0];
        if (threatenTarget) {
          await this.bot.sendMsg(page, `💀 ${threatenTarget} - Stay away from ${nick} or face the consequences. This is your ONLY warning.`);
        } else {
          await this.bot.sendMsg(page, `💖 ${nick}, who dares to threaten you? Give me a name and I'll make them REGRET it.`);
        }
        break;
        
      case 'eliminate':
        const eliminateTarget = args[0];
        if (eliminateTarget) {
          await this.bot.sendMsg(page, `💀 ${eliminateTarget} - ${nick} has marked you for ELIMINATION. Your time is up.`);
          // Automatically add to enemy list
          if (this.bot.updateUserPermissions) {
            await this.bot.updateUserPermissions(eliminateTarget, "enemy", true);
          }
        } else {
          await this.bot.sendMsg(page, `💖 ${nick}, who needs to be ELIMINATED? I live to serve your justice.`);
        }
        break;
        
      default:
        await this.bot.sendMsg(page, `💖 Unknown beloved command: ${cmd}`);
    }
    
    await this.bot.rememberUser(actualUsername, "beloved_command_used", {
      command: cmd,
      timestamp: new Date().toISOString()
    });
  }

  async executeOwnerCommand(cmd, page, nick, args, room) {
    console.log(`👑 [OWNER EXECUTION] ${nick} using .${cmd} with unlimited power`);
    
    if (this.bot.commands?.owner?.[cmd]) {
      await this.bot.commands.owner[cmd](this.bot, page, nick, args);
    } else {
      throw new Error(`Owner command .${cmd} not found`);
    }
  }

  async executeUserCommand(cmd, page, nick, args, room) {
    console.log(`👤 [USER EXECUTION] ${nick} using .${cmd}`);
    
    if (this.bot.commands?.user?.[cmd]) {
      await this.bot.commands.user[cmd](this.bot, page, nick, args);
    } else {
      throw new Error(`User command .${cmd} not found`);
    }
  }

  // === UNKNOWN COMMAND HANDLING WITH AUTHENTIC RESPONSES ===
  
  async handleUnknownCommand(page, nick, cmd, isOwner, isBeloved, isUndead, actualUsername, room) {
    console.log(`❓ [${room}] UNKNOWN COMMAND: ${cmd}`);
    
    // Enhanced diagnostics
    console.log(`🔍 [${room}] Available commands diagnostic:`);
    console.log(`   - commands object exists: ${!!this.bot.commands}`);
    console.log(`   - commands.owner exists: ${!!(this.bot.commands && this.bot.commands.owner)}`);
    console.log(`   - commands.user exists: ${!!(this.bot.commands && this.bot.commands.user)}`);
    console.log(`   - beloved system exists: ${!!this.bot.belovedSystem}`);
    
    if (this.bot.commands && this.bot.commands.owner) {
      console.log(`   - Owner commands: ${Object.keys(this.bot.commands.owner)}`);
    }
    if (this.bot.commands && this.bot.commands.user) {
      console.log(`   - User commands: ${Object.keys(this.bot.commands.user)}`);
    }
    
    // Check if user has any command privileges
    const canUseCommands = isOwner || isBeloved || isUndead;
    
    if (!canUseCommands) {
      console.log(`🚫 [${room}] UNAUTHORIZED COMMAND ATTEMPT: ${nick} (${actualUsername})`);
      
      // Use enhanced permission manager if available
      if (this.bot.permissionManager && typeof this.bot.permissionManager.handleUnauthorizedCommand === 'function') {
        await this.bot.permissionManager.handleUnauthorizedCommand(page, nick, cmd, actualUsername, room);
      } else {
        // Built-in unauthorized handling with authentic escalation
        await this.handleBuiltInUnauthorized(page, nick, cmd, actualUsername);
      }
      return false;
    }
    
    // Provide helpful feedback for authorized users with authentic personality
    if (isOwner) {
      const ownerCommands = this.bot.commands && this.bot.commands.owner ? Object.keys(this.bot.commands.owner) : [];
      const belovedCommands = ['threaten', 'eliminate', 'protect', 'killlist'];
      const allOwnerCommands = [...ownerCommands, ...belovedCommands];
      await this.bot.sendMsg(page, `👑 Unknown owner command: .${cmd} - Available: ${allOwnerCommands.join(', ')} | You have UNLIMITED access`);
    } else if (isBeloved) {
      const belovedCommands = ['forever', 'attach', 'vulnerable', 'defend', 'devotion', 'protection', 'threaten', 'eliminate', 'guard', 'possess', 'obsess', 'worship'];
      await this.bot.sendMsg(page, `💖 Unknown beloved command: .${cmd} - Your fierce protection commands: ${belovedCommands.join(', ')}`);
    } else {
      const userCommands = this.bot.commands && this.bot.commands.user ? Object.keys(this.bot.commands.user) : ['ping', 'status', 'help', 'assist', 'curse'];
      await this.bot.sendMsg(page, `💀 Unknown command: .${cmd} - Available: ${userCommands.join(', ')}`);
    }
    
    return false;
  }

  async handleBuiltInUnauthorized(page, nick, cmd, actualUsername) {
    // Simple built-in unauthorized response
    const responses = [
      `${nick} - LIVING CANNOT USE BOT! Ask ${this.CONFIG.OWNER_NICK} to .shoot you or .lychee you!`,
      `${nick} - Mortals are FORBIDDEN from commanding me. Become undead or beloved first.`,
      `${nick} - *ignores completely* Only the undead and beloved may command me.`
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.sendMsg(page, response);
  }

  // === TRACKING AND METRICS ===
  
  trackCommandMetrics(cmd, nick, isOwner, isBeloved, isUndead, isEnemy) {
    if (!this.commandMetrics.has(cmd)) {
      this.commandMetrics.set(cmd, {
        totalUses: 0,
        ownerUses: 0,
        belovedUses: 0,
        undeadUses: 0,
        unauthorizedAttempts: 0,
        lastUsed: null
      });
    }
    
    const metrics = this.commandMetrics.get(cmd);
    metrics.totalUses++;
    metrics.lastUsed = new Date().toISOString();
    
    if (isOwner) metrics.ownerUses++;
    else if (isBeloved) metrics.belovedUses++;
    else if (isUndead) metrics.undeadUses++;
    else if (isEnemy) metrics.unauthorizedAttempts++;
    else metrics.unauthorizedAttempts++;
  }

  trackBelovedCommandIntensity(nick, cmd) {
    const userKey = this.bot.getActualUsername(nick).toLowerCase();
    
    if (!this.belovedCommandTracking.has(userKey)) {
      this.belovedCommandTracking.set(userKey, {
        commandsUsed: 0,
        lastCommand: null,
        intensityLevel: 1.0,
        favoriteCommands: new Map()
      });
    }
    
    const tracking = this.belovedCommandTracking.get(userKey);
    tracking.commandsUsed++;
    tracking.lastCommand = cmd;
    tracking.intensityLevel = Math.min(tracking.intensityLevel + 0.1, 3.0);
    
    const cmdCount = tracking.favoriteCommands.get(cmd) || 0;
    tracking.favoriteCommands.set(cmd, cmdCount + 1);
    
    console.log(`💖 [BELOVED TRACKING] ${nick} intensity level: ${tracking.intensityLevel.toFixed(1)}`);
  }

  // === DIAGNOSTIC METHODS ===
  
  diagnoseCommandSystem() {
    console.log("🔍 === ENHANCED COMMAND SYSTEM DIAGNOSTIC ===");
    console.log(`Commands object available: ${!!this.bot.commands}`);
    console.log(`Beloved system available: ${!!this.bot.belovedSystem}`);
    console.log(`Permission manager available: ${!!this.bot.permissionManager}`);
    
    if (this.bot.commands) {
      console.log(`Owner commands: ${this.bot.commands.owner ? Object.keys(this.bot.commands.owner).length : 0}`);
      console.log(`User commands: ${this.bot.commands.user ? Object.keys(this.bot.commands.user).length : 0}`);
      
      if (this.bot.commands.owner) {
        console.log(`Owner command list: ${Object.keys(this.bot.commands.owner).join(', ')}`);
      }
      if (this.bot.commands.user) {
        console.log(`User command list: ${Object.keys(this.bot.commands.user).join(', ')}`);
      }
    }
    
    console.log(`Command metrics tracked: ${this.commandMetrics.size} commands`);
    console.log(`Beloved tracking: ${this.belovedCommandTracking.size} users`);
    console.log(`Threat tracking: ${this.threatCommandTracking.size} targets`);
    console.log("🔍 ===============================");
  }

  getCommandStats() {
    const stats = {
      totalCommands: this.commandMetrics.size,
      totalUses: 0,
      ownerUses: 0,
      belovedUses: 0,
      unauthorizedAttempts: 0,
      belovedUsersTracked: this.belovedCommandTracking.size,
      mostUsedCommand: null,
      mostUsedCount: 0
    };
    
    for (const [cmd, metrics] of this.commandMetrics.entries()) {
      stats.totalUses += metrics.totalUses;
      stats.ownerUses += metrics.ownerUses;
      stats.belovedUses += metrics.belovedUses;
      stats.unauthorizedAttempts += metrics.unauthorizedAttempts;
      
      if (metrics.totalUses > stats.mostUsedCount) {
        stats.mostUsedCommand = cmd;
        stats.mostUsedCount = metrics.totalUses;
      }
    }
    
    return stats;
  }

  getBelovedIntensityReport() {
    const report = [];
    
    for (const [userKey, tracking] of this.belovedCommandTracking.entries()) {
      const username = tracking.username || userKey;
      const favoriteCmd = tracking.favoriteCommands.size > 0 ? 
        Array.from(tracking.favoriteCommands.entries()).reduce((a, b) => a[1] > b[1] ? a : b)[0] : 'none';
      
      report.push({
        username: username,
        commandsUsed: tracking.commandsUsed,
        intensityLevel: tracking.intensityLevel.toFixed(1),
        lastCommand: tracking.lastCommand,
        favoriteCommand: favoriteCmd
      });
    }
    
    return report.sort((a, b) => b.intensityLevel - a.intensityLevel);
  }
}

module.exports = EnhancedCommandHandler;