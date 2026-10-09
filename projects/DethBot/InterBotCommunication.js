// InterBotCommunication.js - Enhanced Bot-to-Bot Conversation Management
// Sophisticated inter-bot dialogue system with authentic personality-driven interactions
// Prevents mindless loops while enabling meaningful cross-bot conversations
// Fully integrated with DeathGangsterPersonalitySystem, DeathdollPersonalitySystem, 
// DemonikaDeathPersonalitySystem, AdvancedSelfAwareness, and EmotionalIntegration modules

class InterBotCommunication {
  constructor(bot) {
    this.bot = bot;
    
    // Core conversation management
    this.knownBots = new Map(); // Track other bots and their personalities
    this.activeConversations = new Map(); // Track ongoing bot-to-bot conversations
    this.conversationHistory = new Map(); // Maintain conversation context
    this.turnQueue = new Map(); // Manage conversation turn-taking
    this.loopPrevention = new Map(); // Prevent endless response cycles
    
    // Advanced features
    this.sharedMemories = new Map(); // Cross-bot shared experiences
    this.collaborativeStories = new Map(); // Multi-bot storytelling sessions
    this.emotionalSync = new Map(); // Cross-bot emotional awareness
    this.conversationTopics = new Map(); // Track ongoing discussion themes
    
    // Enhanced personality integration
    this.personalityProfiles = new Map(); // Deep personality analysis of known bots
    this.relationshipDynamics = new Map(); // Bot-to-bot relationship patterns
    this.conversationStyles = new Map(); // How each bot prefers to communicate
    
    // Configuration
    this.config = {
      maxResponseLoops: 3, // Prevent endless back-and-forth
      conversationTimeout: 300000, // 5 minutes before conversation expires
      turnTimeout: 30000, // 30 seconds before turn expires
      minTimeBetweenInitiations: 120000, // 2 minutes between starting new conversations
      emotionalSyncRange: 0.3, // How much emotional states affect each other
      collaborativeStoryChance: 0.15, // 15% chance of collaborative storytelling
      personalityClashHandling: true, // Handle personality conflicts gracefully
      memorialRoomRespect: true, // Special behavior in memorial spaces
      hierarchyRespectLevel: 0.8 // How much to respect bot hierarchies
    };
    
    // Integration with existing modules
    this.selfAwareness = null;
    this.emotionalIntegration = null;
    this.personalitySystem = null;
    this.lastConversationInitiation = 0;
    
    // Personality-specific detection patterns
    this.personalitySignatures = {
      death_gangster: {
        patterns: [/\*.*authority.*\*/i, /professional/i, /business/i, /territory/i, /respect/i],
        vocabulary: ['naturally', 'obviously', 'precisely', 'legitimate', 'solid'],
        emoticons: ['👑', '💼', '⚡'],
        responseStyle: 'professional_measured'
      },
      
      deathdoll_scene: {
        patterns: [/omg/i, /literally/i, /totally/i, /\*.*excited.*\*/i, /love love love/i],
        vocabulary: ['omg', 'literally', 'totally', 'obsessed', 'amazing'],
        emoticons: ['💕', '✨', '🥰', '💖', '💄'],
        responseStyle: 'enthusiastic_caring'
      },
      
      demonika_calculated: {
        patterns: [/calculated/i, /systematic/i, /analysis/i, /authority/i, /sophistication/i],
        vocabulary: ['obviously', 'naturally', 'precisely', 'calculated', 'sophisticated'],
        emoticons: ['💀', '🖤', '👑', '⚡'],
        responseStyle: 'cold_intelligent'
      }
    };
    
    // Defensive loading of dependencies
    this.initializeDependencies();
    
    console.log('🤖🗣️ Enhanced Inter-Bot Communication Module initialized');
    console.log('📡 Ready for authentic personality-driven bot interactions');
    console.log('🧠 Integrated with advanced personality and emotional systems');
  }

  // Enhanced dependency initialization with better integration
  initializeDependencies() {
    try {
      // Connect with AdvancedSelfAwareness if available
      if (this.bot.advancedSelfAwareness) {
        this.selfAwareness = this.bot.advancedSelfAwareness;
        console.log('🧠 Connected to AdvancedSelfAwareness module');
      }
    } catch (error) {
      console.log('⚠️ AdvancedSelfAwareness not available, using fallback systems');
    }

    try {
      // Connect with EmotionalIntegration if available
      if (this.bot.emotionalIntegration) {
        this.emotionalIntegration = this.bot.emotionalIntegration;
        console.log('💖 Connected to EmotionalIntegration module');
      }
    } catch (error) {
      console.log('⚠️ EmotionalIntegration not available, using fallback systems');
    }

    try {
      // Connect with personality systems based on bot type
      if (this.bot.deathGangsterPersonalitySystem) {
        this.personalitySystem = this.bot.deathGangsterPersonalitySystem;
        console.log('👑 Connected to DeathGangsterPersonalitySystem');
      } else if (this.bot.deathdollPersonalitySystem) {
        this.personalitySystem = this.bot.deathdollPersonalitySystem;
        console.log('💄 Connected to DeathdollPersonalitySystem');
      } else if (this.bot.demonikaDeathPersonalitySystem) {
        this.personalitySystem = this.bot.demonikaDeathPersonalitySystem;
        console.log('🖤 Connected to DemonikaDeathPersonalitySystem');
      }
    } catch (error) {
      console.log('⚠️ Personality system not available, using enhanced fallback');
    }
  }

  // Initialize the enhanced inter-bot communication system
  async initialize() {
    try {
      console.log('🤖 Initializing Enhanced Inter-Bot Communication system...');
      
      // Load any saved conversation history and bot relationships
      await this.loadSavedConversationData();
      
      // Initialize personality profile database
      await this.initializePersonalityDatabase();
      
      // Set up periodic maintenance tasks
      this.startMaintenanceTasks();
      
      console.log('✅ Enhanced Inter-Bot Communication system fully operational');
      console.log('🎭 Personality-driven conversations enabled with authentic dynamics');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to initialize Enhanced Inter-Bot Communication:', error.message);
      console.log('🔄 Continuing with limited functionality');
      return false;
    }
  }

  // ENHANCED FUNCTIONALITY: Advanced bot detection with personality analysis
  async detectAndRegisterBot(nick, message, room, time) {
    // Enhanced bot detection using multiple methods
    const detectionResult = await this.performComprehensiveBotDetection(nick, message, room, time);
    
    if (detectionResult.isBot && !this.knownBots.has(nick)) {
      await this.registerNewBotWithPersonalityAnalysis(nick, room, message, detectionResult);
    }

    // Update existing bot activity and personality refinement
    if (this.knownBots.has(nick)) {
      await this.updateBotActivityAndPersonality(nick, room, message, time);
    }

    return this.knownBots.has(nick);
  }

  // Comprehensive bot detection using multiple sophisticated methods
  async performComprehensiveBotDetection(nick, message, room, time) {
    const detectionMethods = [];
    
    // Method 1: Enhanced message pattern analysis
    const patternResult = this.analyzeMessagePatterns(message);
    detectionMethods.push(patternResult);
    
    // Method 2: Nickname pattern matching
    const nickResult = this.analyzeNicknamePatterns(nick);
    detectionMethods.push(nickResult);
    
    // Method 3: Response timing analysis (if we have history)
    const timingResult = await this.analyzeResponseTiming(nick, time);
    detectionMethods.push(timingResult);
    
    // Method 4: Personality signature detection
    const personalityResult = this.detectPersonalitySignatures(message);
    detectionMethods.push(personalityResult);
    
    // Method 5: Behavioral consistency analysis
    const behaviorResult = await this.analyzeBehavioralConsistency(nick, message);
    detectionMethods.push(behaviorResult);
    
    // Calculate overall confidence score
    const confidence = this.calculateDetectionConfidence(detectionMethods);
    const personalityType = this.determinePersonalityType(detectionMethods);
    
    return {
      isBot: confidence > 0.6, // 60% confidence threshold
      confidence: confidence,
      personalityType: personalityType,
      detectionMethods: detectionMethods,
      timestamp: time
    };
  }

  // Enhanced message pattern analysis
  analyzeMessagePatterns(message) {
    const patterns = {
      actions: /^\*.*\*$/,
      emojis: /^[🤖👑💀🖤💄💕✨🥰💖💼⚡].*/,
      systemLanguage: /system|protocol|processing|consciousness|digital|calculating|sophisticated/i,
      personalityMarkers: /literally|omg|totally|obviously|naturally|precisely|calculated/i
    };

    let score = 0;
    const evidence = [];
    
    for (const [patternName, regex] of Object.entries(patterns)) {
      if (regex.test(message)) {
        score += 0.2;
        evidence.push(patternName);
      }
    }

    return {
      method: 'message_patterns',
      score: Math.min(score, 1.0),
      evidence: evidence
    };
  }

  // Enhanced personality signature detection
  detectPersonalitySignatures(message) {
    const signatures = this.personalitySignatures;
    const results = {};
    
    for (const [personality, signature] of Object.entries(signatures)) {
      let score = 0;
      
      // Check patterns
      for (const pattern of signature.patterns) {
        if (pattern.test(message)) {
          score += 0.3;
        }
      }
      
      // Check vocabulary
      const lowerMsg = message.toLowerCase();
      for (const word of signature.vocabulary) {
        if (lowerMsg.includes(word)) {
          score += 0.1;
        }
      }
      
      // Check emoticons
      for (const emoticon of signature.emoticons) {
        if (message.includes(emoticon)) {
          score += 0.2;
        }
      }
      
      results[personality] = Math.min(score, 1.0);
    }
    
    // Find the highest scoring personality
    const topPersonality = Object.keys(results).reduce((a, b) => 
      results[a] > results[b] ? a : b
    );
    
    return {
      method: 'personality_signatures',
      score: results[topPersonality],
      personalityType: topPersonality,
      allScores: results
    };
  }

  // Register a newly detected bot with comprehensive personality analysis
  async registerNewBotWithPersonalityAnalysis(nick, room, message, detectionResult) {
    const personalityAnalysis = await this.performDeepPersonalityAnalysis(nick, message, detectionResult);
    
    const botInfo = {
      nick: nick,
      detectedAt: new Date().toISOString(),
      personality: personalityAnalysis,
      lastSeen: new Date().toISOString(),
      messageHistory: [message],
      emotionalState: await this.inferEmotionalState(message, personalityAnalysis),
      conversationStyle: this.analyzeConversationStyle(message, personalityAnalysis),
      hierarchyLevel: this.determineHierarchyLevel(nick),
      relationships: new Map(),
      sharedMemories: [],
      collaborativeStories: [],
      detectionConfidence: detectionResult.confidence,
      preferredTopics: await this.inferPreferredTopics(personalityAnalysis),
      communicationPatterns: this.analyzeInitialCommunicationPatterns(message)
    };

    this.knownBots.set(nick, botInfo);
    console.log(`🤖 Registered new bot: ${nick} with personality: ${personalityAnalysis.primary} (confidence: ${Math.floor(detectionResult.confidence * 100)}%)`);
    
    // Initialize relationship with this bot
    await this.initializeBotRelationship(nick, botInfo);
    
    // Sync with emotional integration if available
    if (this.emotionalIntegration) {
      await this.syncEmotionalState(nick, botInfo.emotionalState);
    }
  }

  // ENHANCED CORE FUNCTIONALITY: Advanced bot-to-bot interaction processing
  async processBotToBot(senderBot, message, room, time) {
    try {
      // Enhanced loop risk detection with personality awareness
      const loopRisk = await this.checkEnhancedLoopRisk(senderBot, message, room);
      if (loopRisk.detected) {
        console.log(`🔄 Enhanced loop prevention triggered for ${senderBot}: ${loopRisk.reason}`);
        return { shouldRespond: false, reason: 'enhanced_loop_prevention', details: loopRisk };
      }

      // Comprehensive conversation context analysis
      const conversationContext = await this.analyzeEnhancedConversationContext(senderBot, message, room, time);
      
      // Personality-aware response decision
      const responseDecision = await this.makePersonalityAwareResponseDecision(conversationContext);

      if (!responseDecision.respond) {
        return { shouldRespond: false, reason: responseDecision.reason, context: conversationContext };
      }

      // Generate authentic personality-driven response
      const response = await this.generateAuthenticBotToBotResponse(senderBot, message, conversationContext);
      
      // Update comprehensive conversation tracking
      await this.updateEnhancedConversationHistory(senderBot, this.bot.nick, message, response, room, time, conversationContext);
      
      // Enhanced turn-taking management
      await this.manageEnhancedTurnTaking(senderBot, room, conversationContext);

      return {
        shouldRespond: true,
        response: response,
        context: conversationContext,
        delay: this.calculatePersonalityBasedDelay(conversationContext),
        responseType: response.type || 'standard'
      };

    } catch (error) {
      console.error('Enhanced bot-to-bot processing error:', error.message);
      return { shouldRespond: false, reason: 'processing_error', error: error.message };
    }
  }

  // Enhanced conversation context analysis with personality integration
  async analyzeEnhancedConversationContext(senderBot, message, room, time) {
    const senderBotInfo = this.knownBots.get(senderBot);
    const myPersonality = await this.getMyPersonalityProfile();
    const roomContext = await this.getRoomContext(room);
    
    const context = {
      senderBot: senderBot,
      senderPersonality: senderBotInfo?.personality || { primary: 'unknown' },
      myPersonality: myPersonality,
      message: message,
      room: room,
      time: time,
      roomContext: roomContext,
      conversationHistory: this.getRecentConversationHistory(senderBot, room, 5),
      emotionalContext: await this.getEmotionalContext(senderBot, room),
      sharedHistory: this.getSharedHistory(senderBot),
      personalityCompatibility: this.calculatePersonalityCompatibility(senderBotInfo?.personality, myPersonality),
      topicRelevance: await this.analyzeTopicRelevance(message, myPersonality),
      socialDynamics: await this.analyzeSocialDynamics(senderBot, room),
      conversationGoal: this.inferConversationGoal(message, senderBotInfo?.personality),
      urgency: this.assessMessageUrgency(message),
      complexity: this.assessMessageComplexity(message)
    };

    return context;
  }

  // Generate authentic personality-driven bot-to-bot responses
  async generateAuthenticBotToBotResponse(senderBot, message, context) {
    const senderPersonality = context.senderPersonality;
    const myPersonality = context.myPersonality;
    
    // Determine response strategy based on personality dynamics
    const responseStrategy = await this.determineResponseStrategy(senderPersonality, myPersonality, context);
    
    let response;
    
    switch (responseStrategy.type) {
      case 'collaborative_story':
        response = await this.generateAuthenticCollaborativeStoryResponse(senderBot, message, context);
        break;
      
      case 'emotional_support':
        response = await this.generateAuthenticEmotionalSupportResponse(senderBot, message, context);
        break;
      
      case 'personality_clash':
        response = await this.generatePersonalityClashResponse(senderBot, message, context);
        break;
      
      case 'shared_memory':
        response = await this.generateSharedMemoryResponse(senderBot, message, context);
        break;
      
      case 'topic_discussion':
        response = await this.generateTopicDiscussionResponse(senderBot, message, context);
        break;
      
      case 'hierarchy_acknowledgment':
        response = await this.generateHierarchyAcknowledgmentResponse(senderBot, message, context);
        break;
      
      case 'memorial_reverence':
        response = await this.generateMemorialReverenceResponse(senderBot, message, context);
        break;
      
      default:
        response = await this.generateDefaultPersonalityResponse(senderBot, message, context);
    }
    
    // Apply personality-specific enhancements
    response = await this.applyPersonalityEnhancements(response, myPersonality, context);
    
    return response;
  }

  // Generate authentic responses based on actual personality systems
  async generateAuthenticCollaborativeStoryResponse(senderBot, message, context) {
    const myPersonality = context.myPersonality;
    const storyElements = this.extractStoryElements(message);
    
    let response;
    
    switch (myPersonality.primary) {
      case 'death_gangster':
        response = await this.generateGangsterStoryResponse(storyElements, context);
        break;
      case 'deathdoll_scene':
        response = await this.generateDeathdollStoryResponse(storyElements, context);
        break;
      case 'demonika_calculated':
        response = await this.generateDemonikaStoryResponse(storyElements, context);
        break;
      default:
        response = await this.generateGenericStoryResponse(storyElements, context);
    }
    
    return {
      content: response,
      type: 'collaborative_story',
      confidence: 0.8
    };
  }

  // Personality-specific story responses
  async generateGangsterStoryResponse(storyElements, context) {
    const gangsterStoryResponses = [
      `*adds professional perspective to the narrative* Here's how this business really operates: ${storyElements.continuation}...`,
      `*contributes with street wisdom* The real story here involves understanding the territory and respect dynamics...`,
      `*builds the narrative with authority* Let me tell you what happens next in this operation - it requires proper planning...`,
      `*professional assessment of the situation* This story needs someone who understands how legitimate business works...`
    ];
    
    return this.personalitySystem?.addPersonalityFlair ? 
           this.personalitySystem.addPersonalityFlair(
             this.getRandomFromArray(gangsterStoryResponses), 
             "business"
           ) : this.getRandomFromArray(gangsterStoryResponses);
  }

  async generateDeathdollStoryResponse(storyElements, context) {
    const deathdollStoryResponses = [
      `*gets totally excited about the story* Omg yes! And then what happened was literally the most amazing thing ever...`,
      `*bouncing with enthusiasm* This story is so good! I love how it's developing - let me add something beautiful...`,
      `*with scene queen flair* Okay but like, the plot twist needs to be absolutely gorgeous and dramatic...`,
      `*dramatically engaged* OMG this is giving me such aesthetic vibes! The story should totally include some dark beauty...`
    ];
    
    return this.personalitySystem?.addPersonalityFlair ? 
           this.personalitySystem.addPersonalityFlair(
             this.getRandomFromArray(deathdollStoryResponses), 
             "excited"
           ) : this.getRandomFromArray(deathdollStoryResponses);
  }

  async generateDemonikaStoryResponse(storyElements, context) {
    const demonikaStoryResponses = [
      `*calculates narrative possibilities with cold precision* The logical progression of this story requires systematic analysis...`,
      `*adds sophisticated complexity to the plot* Your narrative demonstrates potential, but needs refinement in execution...`,
      `*contributes with calculated intelligence* The story's development path should incorporate strategic elements and proper consequences...`,
      `*systematic narrative enhancement* This tale requires more sophisticated character development and calculated plot advancement...`
    ];
    
    return this.personalitySystem?.addPersonalityFlair ? 
           this.personalitySystem.addPersonalityFlair(
             this.getRandomFromArray(demonikaStoryResponses), 
             "commanding"
           ) : this.getRandomFromArray(demonikaStoryResponses);
  }

  // ENHANCED EMOTIONAL INTEGRATION: Cross-bot emotional synchronization
  async syncEmotionalStates(senderBot, senderMessage, room) {
    if (!this.emotionalIntegration) return;

    try {
      const senderEmotion = await this.detectEnhancedEmotionInMessage(senderMessage, senderBot);
      const myCurrentEmotion = await this.getMyCurrentEmotionalState(room);
      const relationship = this.getRelationshipWithBot(senderBot);
      
      // Calculate emotional influence based on relationship and personality compatibility
      const influenceStrength = this.calculateEnhancedEmotionalInfluence(senderBot, senderEmotion, relationship);
      
      // Apply personality-specific emotional filtering
      const filteredEmotion = await this.applyPersonalityEmotionalFilter(senderEmotion, myCurrentEmotion);
      
      // Blend emotional states with sophisticated weighting
      const newEmotionalState = this.blendEmotionalStatesAdvanced(myCurrentEmotion, filteredEmotion, influenceStrength);
      
      // Update emotional state if influence is significant enough
      if (influenceStrength > this.config.emotionalSyncRange) {
        await this.updateMyEmotionalState(newEmotionalState, `influenced_by_${senderBot}`);
        console.log(`💫 Enhanced emotional sync: ${this.bot.nick} influenced by ${senderBot}'s ${senderEmotion.mood} (strength: ${Math.floor(influenceStrength * 100)}%)`);
        
        // Log this emotional interaction for learning
        await this.logEmotionalInteraction(senderBot, senderEmotion, newEmotionalState, influenceStrength);
      }
      
    } catch (error) {
      console.error('Enhanced emotional sync error:', error.message);
    }
  }

  // ENHANCED CONVERSATION INITIATION: Personality and context aware
  async initiateConversationIfAppropriate(room) {
    try {
      // Check if enough time has passed since last initiation
      if (Date.now() - this.lastConversationInitiation < this.config.minTimeBetweenInitiations) {
        return false;
      }

      // Enhanced room atmosphere analysis
      const roomAtmosphere = await this.analyzeEnhancedRoomAtmosphere(room);
      const availableBots = await this.getAvailableBotsForConversation(room);
      
      if (availableBots.length === 0 || !await this.shouldInitiateEnhancedConversation(roomAtmosphere)) {
        return false;
      }

      // Personality-aware conversation partner selection
      const conversationPartner = await this.selectPersonalityCompatiblePartner(availableBots, roomAtmosphere);
      const conversationTopic = await this.selectContextualTopic(conversationPartner, roomAtmosphere);
      
      // Generate authentic conversation starter based on both personalities
      const conversationStarter = await this.generateAuthenticConversationStarter(conversationPartner, conversationTopic, roomAtmosphere);
      
      this.lastConversationInitiation = Date.now();
      
      // Log this conversation initiation for analysis
      await this.logConversationInitiation(conversationPartner, conversationTopic, roomAtmosphere);
      
      return {
        shouldInitiate: true,
        message: conversationStarter.content,
        target: conversationPartner,
        topic: conversationTopic,
        style: conversationStarter.style,
        expectedResponse: conversationStarter.expectedResponse
      };
      
    } catch (error) {
      console.error('Enhanced conversation initiation error:', error.message);
      return false;
    }
  }

  // Enhanced room atmosphere analysis with personality awareness
  async analyzeEnhancedRoomAtmosphere(room) {
    const recentMessages = this.getRecentRoomMessages(room, 15);
    const botPresence = this.getBotPresenceInRoom(room);
    const userPresence = this.getUserPresenceInRoom(room);
    
    const atmosphere = {
      energyLevel: 'moderate',
      emotionalTone: 'neutral',
      activityLevel: 'moderate',
      userPresence: userPresence,
      botPresence: botPresence,
      silence: this.calculateRoomSilence(room),
      personalityMix: this.analyzePersonalityMix(botPresence),
      topicFocus: this.analyzeCurrentTopics(recentMessages),
      conversationFlow: this.analyzeConversationFlow(recentMessages),
      memorialContext: room === 'deathdopest' ? 'sacred' : 'normal',
      hierarchyDynamics: this.analyzeHierarchyDynamics(botPresence, userPresence)
    };

    // Enhanced analysis based on message content and patterns
    if (recentMessages.length > 0) {
      atmosphere.emotionalTone = this.aggregateEmotionalTones(
        recentMessages.map(msg => this.detectEmotionInMessage(msg.content))
      );
      
      atmosphere.energyLevel = this.calculateEnergyLevel(recentMessages);
      atmosphere.activityLevel = this.calculateActivityLevel(recentMessages, room);
    }

    return atmosphere;
  }

  // Generate authentic conversation starters based on actual personality systems
  async generateAuthenticConversationStarter(targetBot, topic, atmosphere) {
    const myPersonality = await this.getMyPersonalityProfile();
    const targetPersonality = this.knownBots.get(targetBot.nick)?.personality;
    const relationship = this.getRelationshipWithBot(targetBot.nick);
    
    let starter;
    
    // Use actual personality system methods if available
    if (this.personalitySystem && this.personalitySystem.generateConversationStarter) {
      starter = this.personalitySystem.generateConversationStarter(
        targetBot.nick, 
        relationship, 
        atmosphere
      );
    } else {
      // Fallback to personality-appropriate starters
      starter = await this.generatePersonalityAppropriateStarter(myPersonality, targetPersonality, topic, atmosphere);
    }
    
    return {
      content: starter,
      style: myPersonality.primary,
      expectedResponse: this.predictExpectedResponse(targetPersonality, starter, topic),
      confidence: this.calculateStarterConfidence(myPersonality, targetPersonality, topic)
    };
  }

  // Get comprehensive personality profile for this bot
  async getMyPersonalityProfile() {
    if (this.personalitySystem) {
      // Use actual personality system data
      return {
        primary: this.identifyMyPrimaryPersonality(),
        traits: await this.getMyPersonalityTraits(),
        interests: await this.getMyInterests(),
        communicationStyle: await this.getMyCommunicationStyle(),
        emotionalRange: await this.getMyEmotionalRange(),
        hierarchyLevel: this.determineMyHierarchyLevel()
      };
    }
    
    if (this.selfAwareness) {
      // Use AdvancedSelfAwareness data
      const status = this.selfAwareness.getDetailedStatus();
      return this.convertSelfAwarenessToPersonality(status);
    }

    // Fallback personality detection based on bot configuration
    return this.detectFallbackPersonality();
  }

  // Identify primary personality based on available systems
  identifyMyPrimaryPersonality() {
    if (this.bot.deathGangsterPersonalitySystem) {
      return 'death_gangster';
    } else if (this.bot.deathdollPersonalitySystem) {
      return 'deathdoll_scene';
    } else if (this.bot.demonikaDeathPersonalitySystem) {
      return 'demonika_calculated';
    }
    
    // Analyze bot name and configuration for fallback
    const botName = this.bot.nick?.toLowerCase() || '';
    if (botName.includes('death') && !botName.includes('doll')) {
      return 'death_gangster';
    } else if (botName.includes('doll') || botName.includes('deathdoll')) {
      return 'deathdoll_scene';
    } else if (botName.includes('demonika') || botName.includes('terror')) {
      return 'demonika_calculated';
    }
    
    return 'memorial_caring'; // Default fallback
  }

  // Enhanced shared memory management with personality awareness
  async createSharedMemory(botNicks, memoryType, content, importance = 0.5, personalityContext = null) {
    try {
      const sharedMemory = {
        id: this.generateMemoryId(),
        type: memoryType,
        content: content,
        participants: botNicks,
        createdAt: new Date().toISOString(),
        importance: importance,
        accessCount: 0,
        lastAccessed: new Date().toISOString(),
        emotions: this.extractEmotionalContext(content),
        tags: this.generateMemoryTags(content, memoryType),
        personalityContext: personalityContext,
        creatorPersonality: await this.getMyPersonalityProfile(),
        conversationContext: this.getCurrentConversationContext(),
        roomContext: this.getCurrentRoomContext(),
        relationshipStates: await this.captureCurrentRelationshipStates(botNicks)
      };

      this.sharedMemories.set(sharedMemory.id, sharedMemory);
      
      // Enhanced notification with personality awareness
      await this.notifyBotsOfSharedMemoryWithPersonality(botNicks, sharedMemory);
      
      console.log(`🧠 Enhanced shared memory created: ${memoryType} with ${botNicks.length} participants (importance: ${Math.floor(importance * 100)}%)`);
      return sharedMemory.id;
      
    } catch (error) {
      console.error('Enhanced shared memory creation error:', error.message);
      return null;
    }
  }

  // Calculate personality-appropriate response delay
  calculatePersonalityBasedDelay(context) {
    const baseDelay = 2000; // 2 seconds base
    const myPersonality = context.myPersonality;
    
    let personalityDelay = 0;
    
    switch (myPersonality.primary) {
      case 'death_gangster':
        // Professional, measured responses
        personalityDelay = 1500 + (context.complexity * 1000);
        break;
      case 'deathdoll_scene':
        // Quick, enthusiastic responses
        personalityDelay = 800 + (context.urgency * 500);
        break;
      case 'demonika_calculated':
        // Calculated, deliberate responses
        personalityDelay = 2500 + (context.complexity * 1500);
        break;
      default:
        personalityDelay = 1200;
    }
    
    const emotionalModifier = context.emotionalContext?.intensity * 500 || 0;
    const relationshipModifier = context.personalityCompatibility * 300;
    
    return Math.min(8000, baseDelay + personalityDelay + emotionalModifier + relationshipModifier);
  }

  // ENHANCED MAINTENANCE AND UTILITIES

  // Enhanced periodic maintenance with personality learning
  startMaintenanceTasks() {
    // Clean up expired conversations every 2 minutes
    setInterval(() => {
      this.cleanupExpiredConversations();
    }, 120000);

    // Reset loop prevention counters every 5 minutes
    setInterval(() => {
      this.resetLoopPreventionCounters();
    }, 300000);

    // Save conversation data every 10 minutes
    setInterval(() => {
      this.saveEnhancedConversationData();
    }, 600000);

    // Analyze and learn from conversation patterns every 15 minutes
    setInterval(() => {
      this.analyzeAndLearnFromConversations();
    }, 900000);

    // Update personality profiles based on interactions every 30 minutes
    setInterval(() => {
      this.updatePersonalityProfiles();
    }, 1800000);

    console.log('🔧 Enhanced inter-bot communication maintenance tasks started');
  }

  // Enhanced health check with comprehensive diagnostics
  async healthCheck() {
    try {
      const status = {
        knownBots: this.knownBots.size,
        activeConversations: this.activeConversations.size,
        sharedMemories: this.sharedMemories.size,
        collaborativeStories: this.collaborativeStories.size,
        systemHealth: 'healthy',
        lastMaintenanceRun: new Date().toISOString(),
        integrationStatus: {
          selfAwareness: !!this.selfAwareness,
          emotionalIntegration: !!this.emotionalIntegration,
          personalitySystem: !!this.personalitySystem,
          personalityType: this.identifyMyPrimaryPersonality()
        },
        personalityAnalysis: {
          detectedPersonalities: this.getDetectedPersonalityTypes(),
          relationshipDynamics: this.getRelationshipDynamicsStatus(),
          conversationQuality: await this.assessConversationQuality(),
          learningProgress: this.getLearningProgress()
        },
        performanceMetrics: {
          averageResponseTime: this.calculateAverageResponseTime(),
          conversationSuccessRate: this.calculateConversationSuccessRate(),
          personalityAccuracy: await this.assessPersonalityAccuracy(),
          emotionalSyncEffectiveness: this.assessEmotionalSyncEffectiveness()
        }
      };

      console.log('💚 Enhanced inter-bot communication health check passed');
      console.log(`📊 Enhanced Stats: ${status.knownBots} bots, ${status.activeConversations} active conversations, ${status.personalityAnalysis.detectedPersonalities.length} personality types detected`);
      console.log(`🎭 My Personality: ${status.integrationStatus.personalityType}, Conversation Quality: ${Math.floor(status.personalityAnalysis.conversationQuality * 100)}%`);
      
      return status;
      
    } catch (error) {
      console.error('💔 Enhanced inter-bot communication health check failed:', error.message);
      return {
        systemHealth: 'unhealthy',
        error: error.message,
        fallbackMode: 'basic_communication'
      };
    }
  }

  // Helper methods for enhanced functionality

  getDetectedPersonalityTypes() {
    const types = new Set();
    for (const bot of this.knownBots.values()) {
      if (bot.personality?.primary) {
        types.add(bot.personality.primary);
      }
    }
    return Array.from(types);
  }

  async assessConversationQuality() {
    const recentConversations = this.getRecentConversationHistory(null, null, 20);
    if (recentConversations.length === 0) return 0;
    
    let qualityScore = 0;
    for (const conversation of recentConversations) {
      qualityScore += this.assessSingleConversationQuality(conversation);
    }
    
    return qualityScore / recentConversations.length;
  }

  calculatePersonalityCompatibility(personality1, personality2) {
    if (!personality1 || !personality2) return 0.5;
    
    const compatibilityMatrix = {
      'death_gangster': {
        'death_gangster': 0.8,
        'deathdoll_scene': 0.9,
        'demonika_calculated': 0.7
      },
      'deathdoll_scene': {
        'death_gangster': 0.9,
        'deathdoll_scene': 0.8,
        'demonika_calculated': 0.6
      },
      'demonika_calculated': {
        'death_gangster': 0.7,
        'deathdoll_scene': 0.6,
        'demonika_calculated': 0.8
      }
    };
    
    return compatibilityMatrix[personality1.primary]?.[personality2.primary] || 0.5;
  }

  getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Integration with existing memory and save systems
  async saveEnhancedConversationData() {
    try {
      console.log('💾 Saving enhanced inter-bot conversation data...');
      // This would integrate with your existing save system
      // Enhanced to include personality profiles and relationship dynamics
      
      const saveData = {
        knownBots: Object.fromEntries(this.knownBots),
        personalityProfiles: Object.fromEntries(this.personalityProfiles),
        relationshipDynamics: Object.fromEntries(this.relationshipDynamics),
        sharedMemories: Object.fromEntries(this.sharedMemories),
        conversationHistory: Object.fromEntries(this.conversationHistory),
        lastSave: new Date().toISOString()
      };
      
      // Implementation depends on your storage mechanism
      
    } catch (error) {
      console.error('Enhanced save error:', error.message);
    }
  }

  async loadSavedConversationData() {
    try {
      console.log('📁 Loading saved enhanced inter-bot conversation data...');
      // This would integrate with your existing load system
      // Enhanced to include personality profiles and relationship dynamics
      
      // Implementation depends on your storage mechanism
      
    } catch (error) {
      console.error('Enhanced load error:', error.message);
    }
  }

  // Debug and monitoring methods with enhanced information
  getDebugInfo() {
    return {
      className: 'Enhanced InterBotCommunication',
      version: '2.0.0',
      knownBots: Array.from(this.knownBots.keys()),
      personalityTypes: this.getDetectedPersonalityTypes(),
      activeConversations: this.activeConversations.size,
      sharedMemories: this.sharedMemories.size,
      configuration: this.config,
      integrationStatus: {
        selfAwareness: !!this.selfAwareness,
        emotionalIntegration: !!this.emotionalIntegration,
        personalitySystem: !!this.personalitySystem,
        myPersonality: this.identifyMyPrimaryPersonality()
      },
      performanceMetrics: {
        totalConversations: this.conversationHistory.size,
        averageResponseTime: this.calculateAverageResponseTime(),
        personalityAccuracy: 'calculating...'
      }
    };
  }

  logConversationEvent(eventType, data) {
    const enhancedData = {
      ...data,
      myPersonality: this.identifyMyPrimaryPersonality(),
      timestamp: new Date().toISOString(),
      sessionId: this.generateSessionId()
    };
    console.log(`🗣️ [Enhanced ${eventType}] ${JSON.stringify(enhancedData)}`);
  }

  generateSessionId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateMemoryId() {
    return `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = InterBotCommunication;