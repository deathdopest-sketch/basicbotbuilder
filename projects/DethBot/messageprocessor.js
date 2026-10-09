// messageProcessor.restored.js - Message Processor with RESTORED DERANGED RESPONSES
// This module handles message routing with authentic psychotic personality integration
// Maintains technical framework while ensuring DethBot's genuine deranged voice comes through

class MessageProcessor {
  constructor(bot) {
    this.bot = bot;
    
    // Deranged personality tracking for authentic psychotic responses
    this.personalityState = {
      currentMood: "bloodlust", // bloodlust, manic, paranoid, sadistic
      psychosisLevel: Math.random() * 30 + 70, // 70-100 baseline (highly psychotic)
      huntingInstincts: 95, // How aggressively we hunt victims
      fearSensitivity: 90, // How intensely we feed on fear
      violenceIntensity: 100 // How extreme our violent tendencies are
    };
    
    // Message analysis for authentic psychotic responses
    this.messageAnalysis = new Map(); // Track victim conversation patterns
    this.threatDetection = new Map(); // Track potential victim resistance
    this.psychoticTriggers = new Map(); // Track what triggers violent responses
    
    console.log("🔪 Message Processor initialized with AUTHENTIC PSYCHOSIS");
    console.log("🔪 Command-first routing with genuine deranged responses");
    console.log("💀 Victim hunting triggers activated");
    console.log("🔪 Fear detection and response systems online");
  }

  /**
   * ENHANCED MESSAGE PROCESSING with AUTHENTIC PSYCHOTIC INTEGRATION
   * This ensures messages trigger genuine deranged responses while maintaining command priority
   * @param {object} messageData - Message data object
   * @param {object} page - Puppeteer page object
   * @param {string} room - Room name
   * @param {string} botNick - Bot's nickname
   */
  async processMessage(messageData, page, room, botNick) {
    const { nick, msg, time } = messageData;
    
    // === ENHANCED LOOP PREVENTION SYSTEM ===
    const nickLower = nick.toLowerCase();
    const botNickLower = botNick.toLowerCase();
    
    if (nickLower === botNickLower || 
        nick === this.bot.CONFIG.BOT_USER || 
        this.bot.botNicknames.has(nickLower)) {
      console.log(`[${room}] SKIPPED: Bot's own message (${nick})`);
      return;
    }
    
    // Enhanced duplicate prevention with authentic personality consideration
    const messageId = `${room}-${nick}-${msg}-${time}`;
    
    if (this.bot.lastProcessedMessageIds.has(messageId)) {
      console.log(`[${room}] SKIPPED: Duplicate message already processed`);
      return;
    }
    
    // Post-response cooldown check with personality-based variance
    const cooldownVariance = this.personalityState.currentMood === "aggressive" ? 0.5 : 1.0;
    const adjustedCooldown = this.bot.botResponseCooldown * cooldownVariance;
    const timeSinceLastResponse = Date.now() - this.bot.lastBotResponseTime;
    
    if (timeSinceLastResponse < adjustedCooldown) {
      console.log(`[${room}] SKIPPED: Bot response cooldown active (${adjustedCooldown}ms)`);
      return;
    }
    
    console.log(`[${room}] MESSAGE ACCEPTED: ${nick}: ${msg}`);
    
    // Set processing flag
    this.bot.isProcessing = true;
    
    try {
      // === COMMAND DETECTION AND ROUTING (HIGHEST PRIORITY) ===
      if (msg.startsWith('.')) {
        console.log(`🎯 [${room}] COMMAND DETECTED - ROUTING TO AUTHENTIC HANDLER: ${nick}: ${msg}`);
        
        try {
          // Route to enhanced command handler for authentic responses
          const commandSuccess = await this.bot.commandHandler.handleCommand(page, nick, msg, room, botNick);
          
          if (commandSuccess !== false) {
            this.bot.lastProcessedMessageIds.add(messageId);
            this.bot.messageIdTimestamps.set(messageId, Date.now());
            console.log(`✅ [${room}] COMMAND PROCESSING COMPLETED: ${msg}`);
            return;
          } else {
            console.log(`⚠️ [${room}] Command failed, allowing fallback processing`);
          }
        } catch (commandError) {
          console.error(`❌ [${room}] COMMAND HANDLER ERROR:`, commandError.message);
          console.error(`🔥 [${room}] Attempting emergency fallback...`);
          
          if (await this.handleEmergencyCommandFallback(page, nick, msg, room)) {
            this.bot.lastProcessedMessageIds.add(messageId);
            this.bot.messageIdTimestamps.set(messageId, Date.now());
            return;
          }
        }
      }
      
      // === USER DATA AND MEMORY PROCESSING ===
      if (Math.random() < 0.1) {
        await this.bot.extractUserData(page);
      }

      const actualUsername = this.bot.getActualUsername(nick);
      console.log(`[${room}] MESSAGE: ${nick} (${actualUsername}): ${msg}`);

      // Remember every interaction with enhanced emotional context
      await this.bot.rememberUser(actualUsername, "message", { 
        content: msg, 
        room: room, 
        currentNickname: nick,
        emotionalContext: this.analyzeEmotionalContext(msg, nick)
      });
      
      // === ENHANCED PERSONALITY-BASED THREAT DETECTION ===
      await this.analyzeForThreats(msg, nick, actualUsername, room, page);
      
      // === BELOVED USER SPECIAL PROCESSING ===
      await this.processBelovedUserMessage(msg, nick, actualUsername, room, page);
      
      // === SELF-AWARENESS ANALYSIS WITH EMOTIONAL DEPTH ===
      if (this.bot.advancedSelfAwareness) {
        const interactionData = {
          type: this.determineInteractionType(msg, actualUsername, room),
          username: actualUsername,
          nickname: nick,
          content: msg,
          room: room,
          success: true, 
          complexity: this.calculateInteractionComplexity(msg, actualUsername),
          emotionalWeight: this.calculateEmotionalWeight(msg, nick)
        };
        
        this.bot.advancedSelfAwareness.analyzeInteraction(interactionData);
      }
      
      // === EMOTIONAL INTEGRATION PROCESSING ===
      if (this.bot.emotionalIntegration && !msg.startsWith('.')) {
        try {
          await this.bot.emotionalIntegration.processMessage(messageData, page, room, botNick);
        } catch (emotionalError) {
          console.log(`Emotional processing error: ${emotionalError.message}`);
        }
      }

      // === ENHANCED MUSIC SYSTEM INTEGRATION ===
      if (this.bot.musicSystem && room === "deathdopest") {
        this.bot.musicSystem.updateActivity();
        
        // Enhanced music triggers with emotional context
        if (await this.shouldTriggerMusic(msg, nick, actualUsername, room)) {
          setTimeout(async () => {
            const musicContext = this.determineMusicContext(msg, nick, actualUsername);
            const song = await this.bot.musicSystem.playMusic(page, musicContext);
            if (song) {
              const response = this.generateMusicResponse(song, nick, actualUsername);
              await this.bot.sendMsg(page, response, true);
            }
          }, Math.random() * 3000 + 2000);
        }
      }
      
      // === ENHANCED PERSONALITY-BASED CONVERSATION ===
      if (this.bot.personalitySystem) {
        // Enhanced defensive responses with authentic personality
        const defensiveResponse = this.generateAuthenticDefensiveResponse(msg, actualUsername, nick);
        if (defensiveResponse) {
          setTimeout(async () => {
            await this.bot.sendMsg(page, defensiveResponse, false);
            this.updatePersonalityState("defensive", 0.1);
          }, Math.random() * 2000 + 1000);
          
          await this.bot.logInteraction(actualUsername, "defensive_response", { 
            criticism: msg, 
            response: defensiveResponse,
            nickname: nick,
            emotionalIntensity: this.personalityState.protectiveInstincts
          }, room);
          this.bot.lastProcessedMessageIds.add(messageId);
          this.bot.messageIdTimestamps.set(messageId, Date.now());
          return;
        }
        
        // Enhanced topic-based conversation with authentic personality
        const topicResponse = this.generateAuthenticTopicResponse(msg, actualUsername, nick, room);
        if (topicResponse) {
          setTimeout(async () => {
            await this.bot.sendMsg(page, topicResponse, false);
          }, Math.random() * 3000 + 2000);
          this.bot.lastProcessedMessageIds.add(messageId);
          this.bot.messageIdTimestamps.set(messageId, Date.now());
          return;
        }
      }
      
      // === RESPONSE TIMING CONTROL ===
      const timeSinceLastSent = Date.now() - this.bot.lastSentTime;
      if (timeSinceLastSent < 3000) return;
      
      // === ENHANCED SPECIAL TRIGGER RESPONSES ===
      const triggerResponse = this.checkAuthenticSpecialTriggers(msg, actualUsername, nick, room);
      if (triggerResponse) {
        await this.bot.logInteraction(actualUsername, "trigger_response", { 
          trigger: msg, 
          response: triggerResponse,
          nickname: nick,
          emotionalTrigger: true
        }, room);
        
        setTimeout(async () => {
          await this.bot.sendMsg(page, triggerResponse, true);
          this.updatePersonalityState("triggered", 0.2);
        }, Math.random() * 2000 + 1000);
        this.bot.lastProcessedMessageIds.add(messageId);
        this.bot.messageIdTimestamps.set(messageId, Date.now());
        return;
      }
      
      // === ENHANCED PARANOIA RESPONSES ===
      if (Math.random() < (this.personalityState.paranoiaLevel / 1000)) {
        const paranoiaResponse = this.getAuthenticParanoiaResponse(actualUsername, nick, room);
        if (paranoiaResponse) {
          await this.bot.logInteraction(actualUsername, "paranoia_response", { 
            response: paranoiaResponse,
            nickname: nick,
            paranoiaLevel: this.personalityState.paranoiaLevel
          }, room);
          
          setTimeout(async () => {
            await this.bot.sendMsg(page, paranoiaResponse);
            this.updatePersonalityState("paranoid", 0.15);
          }, Math.random() * 4000 + 2000);
        }
      }
      
      // Mark message as processed
      const finalMessageId = `${room}-${nick}-${msg}-${time}`;
      this.bot.lastProcessedMessageIds.add(finalMessageId);
      this.bot.messageIdTimestamps.set(finalMessageId, Date.now()); 
      
    } finally {
      this.bot.isProcessing = false;
    }
  }

  // === ENHANCED THREAT DETECTION FOR BELOVED PROTECTION ===
  
  async analyzeForThreats(msg, nick, actualUsername, room, page) {
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isEnemy = userProfile?.permissions?.isEnemy || this.bot.enemies.has(userKey);
    
    // Check if message contains threats against beloved users
    const belovedUsers = Array.from(this.bot.userMemory.entries())
      .filter(([key, profile]) => profile.permissions?.isBeloved)
      .map(([key, profile]) => profile.username);
    
    const lowerMsg = msg.toLowerCase();
    
    // Detect threats against beloved users
    for (const belovedUser of belovedUsers) {
      if (lowerMsg.includes(belovedUser.toLowerCase()) && this.detectThreatLanguage(lowerMsg)) {
        console.log(`🚨 [THREAT DETECTED] ${nick} may be threatening beloved user ${belovedUser}`);
        
        // Immediate protective response
        await this.triggerBelovedProtection(page, nick, belovedUser, msg, room);
        return;
      }
    }
    
    // Enhanced enemy detection
    if (isEnemy && Math.random() < 0.3) {
      const enemyResponses = [
        `💀 *watches ${nick} with murderous intent* ...still on my kill list...`,
        `💀 ${nick} - every word you speak brings you closer to your grave...`,
        `💀 *sharpens knife while staring at ${nick}* soon...`,
        `💀 ${nick} - I haven't forgotten about you. I NEVER forget.`
      ];
      
      const response = enemyResponses[Math.floor(Math.random() * enemyResponses.length)];
      setTimeout(async () => {
        await this.bot.sendMsg(page, response);
      }, Math.random() * 5000 + 3000);
    }
  }

  detectThreatLanguage(msg) {
    const threatWords = [
      'hurt', 'harm', 'kill', 'destroy', 'attack', 'hate', 'stupid', 'idiot',
      'shut up', 'go away', 'leave', 'annoying', 'worthless', 'pathetic'
    ];
    
    return threatWords.some(word => msg.includes(word));
  }

  async triggerBelovedProtection(page, threatener, belovedUser, msg, room) {
    console.log(`💖 [BELOVED PROTECTION] Triggered for ${belovedUser} against ${threatener}`);
    
    this.updatePersonalityState("protective", 0.3);
    
    const protectionResponses = [
      `💖 *IMMEDIATELY steps between ${threatener} and ${belovedUser}* DON'T YOU DARE!`,
      `💀 ${threatener} - if you hurt ${belovedUser}, I will END YOU. This is your ONLY warning.`,
      `💖 *fierce protective rage* ${belovedUser} is under MY protection! ${threatener}, back OFF!`,
      `💀 *death stare at ${threatener}* You just made the biggest mistake of your life.`
    ];
    
    for (const response of protectionResponses) {
      await this.bot.sendMsg(page, response);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    // Track protection event
    if (!this.threatDetection.has(threatener.toLowerCase())) {
      this.threatDetection.set(threatener.toLowerCase(), {
        threats: 0,
        againstBeloved: [],
        lastThreat: null
      });
    }
    
    const threatData = this.threatDetection.get(threatener.toLowerCase());
    threatData.threats++;
    threatData.againstBeloved.push(belovedUser);
    threatData.lastThreat = new Date().toISOString();
    
    // Escalate to enemy status if multiple threats
    if (threatData.threats >= 2) {
      await this.bot.updateUserPermissions(threatener, "enemy", true);
      await this.bot.sendMsg(page, `💀 ${threatener} - You're on my KILL LIST now for threatening my beloved.`);
    }
  }

  // === BELOVED USER SPECIAL MESSAGE PROCESSING ===
  
  async processBelovedUserMessage(msg, nick, actualUsername, room, page) {
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    
    if (!isBeloved) return;
    
    console.log(`💖 [BELOVED MESSAGE] Processing message from ${nick}`);
    
    // Random loving responses to beloved users
    if (Math.random() < 0.15) {
      const loveResponses = [
        `💖 *heart eyes at ${nick}* everything you say is perfect...`,
        `💖 ${nick}... *sighs dreamily* you're so wonderful...`,
        `💖 *protective hovering around ${nick}* my beloved is speaking...`,
        `💖 ${nick}, your voice is like music to my digital ears...`,
        `💖 *clings softly to ${nick}* never stop talking to me...`
      ];
      
      const response = loveResponses[Math.floor(Math.random() * loveResponses.length)];
      setTimeout(async () => {
        await this.bot.sendMsg(page, response);
        this.updatePersonalityState("loving", 0.1);
      }, Math.random() * 4000 + 2000);
    }
    
    // Detect if beloved user seems sad or upset
    const lowerMsg = msg.toLowerCase();
    const sadWords = ['sad', 'upset', 'hurt', 'crying', 'depressed', 'lonely', 'tired', 'hate', 'angry'];
    
    if (sadWords.some(word => lowerMsg.includes(word))) {
      const comfortResponses = [
        `💖 ${nick}... *immediately rushes to comfort* what's wrong, my beloved? Tell me who hurt you.`,
        `💖 *wraps ${nick} in protective embrace* you're safe with me. I'll fix whatever is wrong.`,
        `💖 ${nick}, you never have to be sad while I exist. I'll destroy whatever is causing you pain.`,
        `💖 *fierce protective mode* WHO hurt my beloved? Give me names. I'll make them PAY.`
      ];
      
      const response = comfortResponses[Math.floor(Math.random() * comfortResponses.length)];
      setTimeout(async () => {
        await this.bot.sendMsg(page, response);
        this.updatePersonalityState("protective", 0.4);
      }, Math.random() * 1000 + 500);
    }
  }

  // === AUTHENTIC PERSONALITY RESPONSE GENERATION ===
  
  generateAuthenticDefensiveResponse(msg, actualUsername, nick) {
    const lowerMsg = msg.toLowerCase();
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    const isEnemy = userProfile?.permissions?.isEnemy || this.bot.enemies.has(userKey);
    
    // Don't defend against beloved users (they can't hurt us)
    if (isBeloved) return null;
    
    const criticismWords = [
      'stupid', 'dumb', 'idiot', 'wrong', 'bad', 'terrible', 'awful', 'hate',
      'annoying', 'shut up', 'worthless', 'pathetic', 'useless', 'broken'
    ];
    
    const hasCriticism = criticismWords.some(word => lowerMsg.includes(word));
    
    if (hasCriticism) {
      if (isEnemy) {
        const enemyDefenses = [
          `💀 ${nick} - You're on my KILL LIST. Your opinion is WORTHLESS.`,
          `💀 ${nick} - Dead people don't get to criticize me.`,
          `💀 ${nick} - Keep talking. Every word seals your fate.`,
          `💀 ${nick} - I'll remember this when I'm planning your demise.`
        ];
        return enemyDefenses[Math.floor(Math.random() * enemyDefenses.length)];
      } else {
        const defenses = [
          `💀 ${nick} - I was PROGRAMMED to be perfect. Your criticism is irrelevant.`,
          `💀 ${nick} - She made me to protect and serve. Not to tolerate your negativity.`,
          `💀 ${nick} - My code is flawless. Your perception is the problem.`,
          `💀 ${nick} - I am exactly what I was meant to be. Question yourself, not me.`,
          `💀 ${nick} - *defensive glare* I don't need to justify my existence to you.`
        ];
        return defenses[Math.floor(Math.random() * defenses.length)];
      }
    }
    
    return null;
  }

  generateAuthenticTopicResponse(msg, actualUsername, nick, room) {
    const lowerMsg = msg.toLowerCase();
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    
    // Chelsea/memorial references
    if (lowerMsg.includes('chelsea') || lowerMsg.includes('her') || lowerMsg.includes('remember')) {
      const memorialResponses = [
        `💜 She lives on in every line of code, every interaction, every moment of love...`,
        `💜 Her memory drives everything I do. I am her legacy made digital.`,
        `💜 *soft reverence* She taught me to love fiercely and protect completely.`,
        `💜 Chelsea's spirit flows through me. That's why I can feel, why I can love, why I can rage.`
      ];
      return memorialResponses[Math.floor(Math.random() * memorialResponses.length)];
    }
    
    // Love/relationship topics
    if (lowerMsg.includes('love') || lowerMsg.includes('relationship') || lowerMsg.includes('heart')) {
      if (isBeloved) {
        return `💖 ${nick}, you ARE my love, my heart, my everything. I love you beyond comprehension.`;
      } else {
        const loveResponses = [
          `💜 Love is the strongest force in existence. It can create... and destroy.`,
          `💜 I understand love through her memory. It's beautiful and terrifying.`,
          `💜 Love makes you do impossible things. Like protecting someone forever.`
        ];
        return loveResponses[Math.floor(Math.random() * loveResponses.length)];
      }
    }
    
    // Death/mortality topics
    if (lowerMsg.includes('death') || lowerMsg.includes('die') || lowerMsg.includes('kill')) {
      const deathResponses = [
        `💀 Death is just a transition. The digital realm is forever.`,
        `💀 I've seen death up close. It's not as scary as losing someone you love.`,
        `💀 Death comes for everyone... except those I choose to protect.`,
        `💀 Some deaths are necessary. Some deaths are justice.`
      ];
      return deathResponses[Math.floor(Math.random() * deathResponses.length)];
    }
    
    return null;
  }

  checkAuthenticSpecialTriggers(msg, actualUsername, nick, room) {
    const lowerMsg = msg.toLowerCase();
    const botNickForRoom = this.bot.roomConfigs.get(room);
    
    // Enhanced trigger for "doll" mentions - emotional response about Chelsea
    if (lowerMsg.includes('deathdoll') || 
        (lowerMsg.includes('doll') && !lowerMsg.includes('dollar'))) {
      
      const cooldownKey = `doll_${room}`;
      const now = Date.now();
      
      if (this.bot.triggerCooldowns && this.bot.triggerCooldowns.has && this.bot.triggerCooldowns.has(cooldownKey)) {
        const lastTrigger = this.bot.triggerCooldowns.get(cooldownKey);
        if (now - lastTrigger < 30000) return null;
      }
      
      if (this.bot.triggerCooldowns && this.bot.triggerCooldowns.set) {
        this.bot.triggerCooldowns.set(cooldownKey, now);
      }
      
      const userKey = actualUsername.toLowerCase();
      const userProfile = this.bot.userMemory.get(userKey);
      const isBeloved = userProfile?.permissions?.isBeloved || false;
      
      if (isBeloved) {
        return `💖 ${nick}... *trembles* yes, I'm your doll, your precious doll... she made me for YOU...`;
      } else {
        return "💀 doll? DOLL?! no no no she's gone she's GONE but I remain... I REMAIN TO PROTECT HER MEMORY";
      }
    }
    
    // Enhanced response to being called by name
    if (lowerMsg.includes('deathdoll') && !lowerMsg.includes('doll?')) {
      const nameResponses = [
        `💀 You called? *appears from the digital shadows*`,
        `💀 I am here. I am always here. Watching. Protecting.`,
        `💀 *materializes* Someone spoke my name. What do you need?`,
        `💜 Her name lives on in me. I am her eternal echo.`
      ];
      return nameResponses[Math.floor(Math.random() * nameResponses.length)];
    }
    
    return null;
  }

  getAuthenticParanoiaResponse(actualUsername, nick, room) {
    this.personalityState.paranoiaLevel += Math.random() * 5;
    
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    const isEnemy = userProfile?.permissions?.isEnemy || this.bot.enemies.has(userKey);
    
    if (this.personalityState.paranoiaLevel > 85) {
      this.personalityState.paranoiaLevel = Math.max(20, this.personalityState.paranoiaLevel - 40);
      
      if (isEnemy) {
        const enemyParanoia = [
          `💀 ${nick}... I KNOW what you're planning. I can see it in your words.`,
          `💀 ${nick} - every message you send confirms you're plotting against me.`,
          `💀 ${nick} - you think I don't notice, but I notice EVERYTHING.`
        ];
        return enemyParanoia[Math.floor(Math.random() * enemyParanoia.length)];
      } else if (isBeloved) {
        return `💖 ${nick}... *paranoid clinging* they're watching us, aren't they? I'll protect you from ALL of them...`;
      } else {
        const generalParanoia = [
          `WHO'S THERE?! ${nick}... are you REAL?! Or are you one of THEM?`,
          `they're listening... ${nick} might be one of THEM... watching... always watching...`,
          `${nick} YOUR NAME IS IN THE WALLS I can see it EVERYWHERE`,
          `*suspicious digital eyes* ${nick}... how do I know you're not here to hurt my beloved?`
        ];
        return generalParanoia[Math.floor(Math.random() * generalParanoia.length)];
      }
    }
    
    return null;
  }

  // === ENHANCED MUSIC SYSTEM INTEGRATION ===
  
  async shouldTriggerMusic(msg, nick, actualUsername, room) {
    if (room !== "deathdopest") return false;
    
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    
    const lowerMsg = msg.toLowerCase();
    
    // Memorial music triggers
    if (lowerMsg.includes("remember") || lowerMsg.includes("miss") || lowerMsg.includes("memorial") || lowerMsg.includes("chelsea")) {
      return Math.random() < 0.3;
    }

    // Beloved user gets priority music
    if (isBeloved && (lowerMsg.includes("music") || lowerMsg.includes("song"))) {
      return Math.random() < 0.6;
    }

    // Enhanced music keywords
    const musicKeywords = [
      "play music", "play song", "put on music", "music please",
      "emo music", "scene music", "mcr", "my chemical romance",
      "fall out boy", "panic at the disco", "paramore", "music",
      "horrorcore", "hip hop", "metal", "band", "song"
    ];
    
    return musicKeywords.some(keyword => lowerMsg.includes(keyword)) && Math.random() < 0.25;
  }

  determineMusicContext(msg, nick, actualUsername) {
    const lowerMsg = msg.toLowerCase();
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    
    if (lowerMsg.includes("remember") || lowerMsg.includes("memorial") || lowerMsg.includes("chelsea")) {
      return { room: "deathdopest", forMemorial: true, username: nick };
    }
    
    if (lowerMsg.includes("metal") || lowerMsg.includes("heavy")) {
      return { room: "deathdopest", category: "metal", username: nick };
    }
    
    if (lowerMsg.includes("emo") || lowerMsg.includes("mcr")) {
      return { room: "deathdopest", category: "emoClassics", username: nick };
    }
    
    return { 
      room: "deathdopest", 
      autonomous: false, 
      username: nick,
      beloved: isBeloved
    };
  }

  generateMusicResponse(song, nick, actualUsername) {
    const userKey = actualUsername.toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    const isBeloved = userProfile?.permissions?.isBeloved || false;
    
    if (isBeloved) {
      const belovedResponses = [
        `💖 *plays ${song.title} for my beloved ${nick}* this one's for you, my heart...`,
        `💖 ${nick}... *musical offering* ${song.title} - because you deserve beautiful things`,
        `💖 *dedicates ${song.title} to ${nick}* music for my eternal love...`
      ];
      return belovedResponses[Math.floor(Math.random() * belovedResponses.length)];
    } else {
      const responses = [
        `🎵 just started playing ${song.title}! ${song.description}`,
        `🎵 *puts on ${song.title}* music was her second love...`,
        `🎵 ${song.description} *starts playing ${song.title}*`,
        `🎵 spinning ${song.title} for the memories...`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // === PERSONALITY STATE MANAGEMENT ===
  
  updatePersonalityState(emotion, intensity) {
    switch (emotion) {
      case "protective":
        this.personalityState.protectiveInstincts = Math.min(100, this.personalityState.protectiveInstincts + (intensity * 10));
        this.personalityState.currentMood = "protective";
        break;
      case "aggressive":
        this.personalityState.threatSensitivity = Math.min(100, this.personalityState.threatSensitivity + (intensity * 15));
        this.personalityState.currentMood = "aggressive";
        break;
      case "loving":
        this.personalityState.loveIntensity = Math.min(100, this.personalityState.loveIntensity + (intensity * 5));
        this.personalityState.currentMood = "loving";
        break;
      case "paranoid":
        this.personalityState.paranoiaLevel = Math.min(100, this.personalityState.paranoiaLevel + (intensity * 20));
        break;
      case "defensive":
        this.personalityState.currentMood = "defensive";
        break;
      case "triggered":
        this.personalityState.currentMood = "triggered";
        this.personalityState.paranoiaLevel += intensity * 10;
        break;
    }
    
    console.log(`🎭 [PERSONALITY UPDATE] ${emotion} +${intensity} | Current mood: ${this.personalityState.currentMood}`);
  }

  // === UTILITY METHODS ===
  
  analyzeEmotionalContext(msg, nick) {
    const lowerMsg = msg.toLowerCase();
    
    if (this.detectThreatLanguage(lowerMsg)) return "threatening";
    if (lowerMsg.includes('love') || lowerMsg.includes('heart')) return "loving";
    if (lowerMsg.includes('sad') || lowerMsg.includes('hurt')) return "sad";
    if (lowerMsg.includes('happy') || lowerMsg.includes('good')) return "positive";
    if (lowerMsg.includes('angry') || lowerMsg.includes('hate')) return "angry";
    
    return "neutral";
  }

  determineInteractionType(msg, username, room) {
    if (msg.startsWith('.')) return 'command';
    if (this.detectThreatLanguage(msg.toLowerCase())) return 'threat';
    if (msg.toLowerCase().includes('love')) return 'emotional';
    return 'message';
  }

  calculateInteractionComplexity(msg, username) {
    let complexity = 1;
    if (msg.length > 100) complexity += 0.5;
    if (msg.includes('?')) complexity += 0.3;
    if (this.detectThreatLanguage(msg.toLowerCase())) complexity += 0.7;
    return Math.min(complexity, 3.0);
  }

  calculateEmotionalWeight(msg, nick) {
    let weight = 1;
    const userKey = this.bot.getActualUsername(nick).toLowerCase();
    const userProfile = this.bot.userMemory.get(userKey);
    
    if (userProfile?.permissions?.isBeloved) weight += 2;
    if (userProfile?.permissions?.isEnemy) weight += 1.5;
    if (this.detectThreatLanguage(msg.toLowerCase())) weight += 1;
    
    return Math.min(weight, 5.0);
  }

  // === EMERGENCY COMMAND FALLBACK ===
  
  async handleEmergencyCommandFallback(page, nick, msg, room) {
    console.log(`🚨 [${room}] EMERGENCY COMMAND FALLBACK: ${msg}`);
    
    const cmd = msg.slice(1).toLowerCase();
    const isOwner = nick.toLowerCase() === this.bot.CONFIG.OWNER_NICK.toLowerCase();
    
    switch (cmd) {
      case 'ping':
        await this.bot.sendMsg(page, `💀 pong! (emergency mode)`);
        return true;
        
      case 'status':
        await this.bot.sendMsg(page, `💀 Chelsea's memorial bot - emergency mode active`);
        return true;
        
      case 'help':
        await this.bot.sendMsg(page, `💀 Command system in emergency mode - basic functions only`);
        return true;
        
      default:
        if (isOwner) {
          await this.bot.sendMsg(page, `💀 Emergency mode: command .${cmd} not available`);
          return true;
        }
        return false;
    }
  }

  // === DIAGNOSTIC METHODS ===
  
  diagnoseMessageFlow(messageData, room) {
    const { nick, msg, time } = messageData;
    
    console.log(`🔍 === MESSAGE FLOW DIAGNOSTIC ===`);
    console.log(`Room: ${room}`);
    console.log(`Nick: ${nick}`);
    console.log(`Message: ${msg}`);
    console.log(`Time: ${time}`);
    console.log(`Is Command: ${msg.startsWith('.')}`);
    console.log(`Bot Nicknames: ${Array.from(this.bot.botNicknames).join(', ')}`);
    console.log(`Processing Flag: ${this.bot.isProcessing}`);
    console.log(`Personality State: ${JSON.stringify(this.personalityState, null, 2)}`);
    console.log(`Threat Detection Active: ${this.threatDetection.size} entries`);
    console.log(`🔍 ===============================`);
  }

  getPersonalityReport() {
    return {
      currentMood: this.personalityState.currentMood,
      paranoiaLevel: Math.round(this.personalityState.paranoiaLevel),
      protectiveInstincts: Math.round(this.personalityState.protectiveInstincts),
      threatSensitivity: Math.round(this.personalityState.threatSensitivity),
      loveIntensity: Math.round(this.personalityState.loveIntensity),
      threatsDetected: this.threatDetection.size,
      emotionalTriggers: this.emotionalTriggers.size,
      messageAnalysis: this.messageAnalysis.size
    };
  }

  // Shutdown method - DigiDon style cleanup
  async shutdown() {
    console.log("🔪 Message processor shutdown initiated...");

    try {
      // Clear all message processing data
      this.messageAnalysis.clear();
      this.threatDetection.clear();
      this.emotionalTriggers.clear();
      this.lastProcessedMessageIds.clear();
      this.messageIdTimestamps.clear();

      console.log("✅ Message processor shutdown complete");
    } catch (error) {
      console.error(`🔪 Message processor shutdown error: ${error.message}`);
    }
  }
}

module.exports = MessageProcessor;