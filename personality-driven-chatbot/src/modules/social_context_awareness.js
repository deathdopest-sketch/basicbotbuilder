// SocialContextAwareness.js - Conversation Flow and Social Dynamics
// Analyzes social context, conversation patterns, and appropriate response timing

class SocialContextAwareness {
  constructor(bot) {
    this.bot = bot;
    
    // Conversation state tracking
    this.conversationStates = new Map(); // room -> conversation state
    this.participantTracking = new Map(); // room -> participant data
    this.conversationHistory = new Map(); // room -> recent message history
    this.topicTracking = new Map(); // room -> current topics
    
    // Social dynamics analysis
    this.socialMetrics = {
      conversationFlow: new Map(),     // Tracks conversation patterns
      userInteractionPatterns: new Map(), // Individual user behavior
      groupDynamics: new Map(),        // Group interaction patterns
      emotionalClimate: new Map(),     // Room emotional atmosphere
      engagementLevels: new Map()      // User engagement tracking
    };
    
    // Response timing configuration
    this.responseTimingConfig = {
      immediate: { minDelay: 500, maxDelay: 2000 },      // Quick responses
      natural: { minDelay: 2000, maxDelay: 8000 },       // Natural conversation timing
      thoughtful: { minDelay: 5000, maxDelay: 15000 },   // Considered responses
      delayed: { minDelay: 15000, maxDelay: 45000 }      // Background responses
    };
    
    // Conversation contexts
    this.contextTypes = {
      greeting: {
        keywords: ['hello', 'hi', 'hey', 'sup', 'yo', 'greetings'],
        responseStyle: 'immediate',
        socialWeight: 0.7
      },
      farewell: {
        keywords: ['bye', 'goodbye', 'see you', 'later', 'night', 'leaving'],
        responseStyle: 'immediate',
        socialWeight: 0.8
      },
      question: {
        patterns: [/\?$/, /^(what|how|why|when|where|who)/i],
        responseStyle: 'natural',
        socialWeight: 0.9
      },
      emotional_support: {
        keywords: ['sad', 'depressed', 'upset', 'crying', 'hurt', 'pain', 'lonely'],
        responseStyle: 'thoughtful',
        socialWeight: 1.0
      },
      celebration: {
        keywords: ['happy', 'excited', 'yay', 'awesome', 'great', 'amazing'],
        responseStyle: 'immediate',
        socialWeight: 0.6
      },
      conflict: {
        keywords: ['argue', 'fight', 'angry', 'mad', 'hate', 'stupid'],
        responseStyle: 'delayed',
        socialWeight: 0.3
      },
      intimate: {
        keywords: ['love', 'care', 'miss', 'heart', 'soul', 'forever'],
        responseStyle: 'thoughtful',
        socialWeight: 0.9
      }
    };
    
    // Social rules and protocols
    this.socialProtocols = {
      interruption_threshold: 0.7,    // How likely to interrupt ongoing conversation
      response_probability: 0.3,      // Base probability of responding to messages
      silence_duration: 5 * 60 * 1000, // How long before considering conversation ended
      topic_shift_detection: 0.6,     // Sensitivity to topic changes
      engagement_decay: 30 * 1000,    // How quickly engagement scores decay
      group_size_modifier: 0.8        // Adjustment for larger groups
    };
    
    // Current analysis cache
    this.analysisCache = new Map();
    this.cacheTimeout = 60 * 1000; // 1 minute cache
    
    // Relationship context
    this.relationshipContexts = new Map(); // user -> relationship context
    this.conversationMemory = new Map(); // Long-term conversation patterns
    
    // Initialization
    this.initialize();
  }

  // === INITIALIZATION ===
  
  initialize() {
    console.log("🧠 Initializing social context awareness system...");
    
    // Clear caches
    this.analysisCache.clear();
    this.conversationStates.clear();
    this.participantTracking.clear();
    
    // Start periodic cleanup
    setInterval(() => {
      this.cleanupExpiredData();
    }, 5 * 60 * 1000); // Every 5 minutes
    
    console.log("🧠 Social context awareness system ready");
  }

  // === CORE ANALYSIS METHODS ===
  
  /**
   * Analyze message in social context
   */
  analyzeMessage(messageData, room) {
    const { nick, msg, time } = messageData;
    
    // Get or create conversation state
    const conversationState = this.getConversationState(room);
    const participants = this.getParticipantData(room);
    
    // Analyze message content
    const contentAnalysis = this.analyzeMessageContent(msg, nick);
    
    // Analyze social context
    const socialContext = this.analyzeSocialContext(messageData, room, conversationState);
    
    // Update conversation state
    this.updateConversationState(room, messageData, contentAnalysis, socialContext);
    
    // Update participant tracking
    this.updateParticipantTracking(room, nick, messageData, contentAnalysis);
    
    // Calculate response recommendation
    const responseRecommendation = this.calculateResponseRecommendation(
      contentAnalysis, socialContext, conversationState, nick
    );
    
    return {
      contentAnalysis,
      socialContext,
      responseRecommendation,
      conversationState: conversationState.current,
      timestamp: Date.now()
    };
  }

  analyzeMessageContent(msg, nick) {
    const analysis = {
      length: msg.length,
      wordCount: msg.split(/\s+/).length,
      emotionalTone: this.detectEmotionalTone(msg),
      contextType: this.detectContextType(msg),
      directedness: this.analyzeDirectedness(msg),
      complexity: this.calculateMessageComplexity(msg),
      urgency: this.detectUrgency(msg),
      topics: this.extractTopics(msg)
    };
    
    return analysis;
  }

  analyzeSocialContext(messageData, room, conversationState) {
    const { nick, msg, time } = messageData;
    
    const context = {
      conversationFlow: this.assessConversationFlow(room, messageData),
      timing: this.analyzeMessageTiming(room, messageData),
      groupDynamics: this.assessGroupDynamics(room, nick),
      relationshipContext: this.getRelationshipContext(nick),
      roomAtmosphere: this.assessRoomAtmosphere(room),
      interruptionRisk: this.calculateInterruptionRisk(room, messageData),
      engagementLevel: this.calculateEngagementLevel(room, nick)
    };
    
    return context;
  }

  // === CONTENT ANALYSIS ===
  
  detectEmotionalTone(msg) {
    const tones = {
      positive: ['happy', 'joy', 'love', 'awesome', 'great', 'amazing', 'wonderful'],
      negative: ['sad', 'angry', 'hate', 'terrible', 'awful', 'horrible', 'depressed'],
      neutral: ['ok', 'fine', 'whatever', 'maybe', 'perhaps'],
      excited: ['!', 'wow', 'omg', 'yay', 'exciting', 'incredible'],
      urgent: ['urgent', 'important', 'emergency', 'help', 'quickly', 'asap']
    };
    
    const lowerMsg = msg.toLowerCase();
    const detectedTones = [];
    
    for (const [tone, keywords] of Object.entries(tones)) {
      const matches = keywords.filter(keyword => lowerMsg.includes(keyword));
      if (matches.length > 0) {
        detectedTones.push({
          tone: tone,
          strength: matches.length / keywords.length,
          matches: matches
        });
      }
    }
    
    // Punctuation analysis
    const exclamationCount = (msg.match(/!/g) || []).length;
    const questionCount = (msg.match(/\?/g) || []).length;
    const capsRatio = (msg.match(/[A-Z]/g) || []).length / msg.length;
    
    return {
      detectedTones: detectedTones,
      intensity: Math.min(1.0, (exclamationCount * 0.2) + (capsRatio * 0.5)),
      questionLevel: questionCount > 0 ? questionCount * 0.3 : 0,
      overall: detectedTones.length > 0 ? detectedTones[0].tone : 'neutral'
    };
  }

  detectContextType(msg) {
    const lowerMsg = msg.toLowerCase();
    
    for (const [contextName, contextData] of Object.entries(this.contextTypes)) {
      // Check keywords
      if (contextData.keywords) {
        const matches = contextData.keywords.filter(keyword => lowerMsg.includes(keyword));
        if (matches.length > 0) {
          return {
            type: contextName,
            confidence: matches.length / contextData.keywords.length,
            socialWeight: contextData.socialWeight,
            responseStyle: contextData.responseStyle
          };
        }
      }
      
      // Check patterns
      if (contextData.patterns) {
        const patternMatches = contextData.patterns.filter(pattern => pattern.test(msg));
        if (patternMatches.length > 0) {
          return {
            type: contextName,
            confidence: 0.8,
            socialWeight: contextData.socialWeight,
            responseStyle: contextData.responseStyle
          };
        }
      }
    }
    
    return {
      type: 'general',
      confidence: 0.5,
      socialWeight: 0.4,
      responseStyle: 'natural'
    };
  }

  analyzeDirectedness(msg) {
    // Check if message is directed at bot or specific users
    const botMentions = this.bot.botNicknames ? 
      Array.from(this.bot.botNicknames).filter(name => 
        msg.toLowerCase().includes(name.toLowerCase())
      ) : [];
    
    const directQuestions = /^(.*)\?$/.test(msg.trim());
    const imperatives = /^(please |can you |would you |will you )/i.test(msg);
    
    return {
      toBotDirectly: botMentions.length > 0,
      indirectlyToBot: directQuestions || imperatives,
      toGroup: !botMentions.length && !directQuestions,
      mentionedUsers: this.extractUserMentions(msg),
      directnessScore: botMentions.length > 0 ? 1.0 : 
                     (directQuestions || imperatives) ? 0.7 : 0.3
    };
  }

  calculateMessageComplexity(msg) {
    const factors = {
      length: Math.min(1.0, msg.length / 200),
      wordCount: Math.min(1.0, msg.split(/\s+/).length / 50),
      punctuationVariety: new Set(msg.match(/[.!?;:,]/g)).size / 6,
      capitalLetters: (msg.match(/[A-Z]/g) || []).length / msg.length
    };
    
    return Object.values(factors).reduce((sum, factor) => sum + factor, 0) / Object.keys(factors).length;
  }

  detectUrgency(msg) {
    const urgencyIndicators = [
      'urgent', 'emergency', 'asap', 'quickly', 'hurry', 'important',
      'immediately', 'right now', 'help', 'please'
    ];
    
    const lowerMsg = msg.toLowerCase();
    const urgencyMatches = urgencyIndicators.filter(indicator => lowerMsg.includes(indicator));
    const exclamationCount = (msg.match(/!/g) || []).length;
    const capsWords = (msg.match(/\b[A-Z]{2,}\b/g) || []).length;
    
    return {
      level: Math.min(1.0, 
        (urgencyMatches.length * 0.3) + 
        (exclamationCount * 0.2) + 
        (capsWords * 0.1)
      ),
      indicators: urgencyMatches
    };
  }

  extractTopics(msg) {
    // Simple topic extraction based on keywords
    const topicKeywords = {
      music: ['song', 'music', 'playlist', 'band', 'artist', 'album'],
      emotion: ['feel', 'emotion', 'sad', 'happy', 'angry', 'love'],
      memory: ['remember', 'memory', 'past', 'forget', 'recall'],
      death: ['death', 'die', 'dead', 'grave', 'funeral', 'cemetery'],
      technology: ['computer', 'bot', 'ai', 'code', 'digital', 'system'],
      relationship: ['friend', 'relationship', 'love', 'hate', 'trust']
    };
    
    const lowerMsg = msg.toLowerCase();
    const detectedTopics = [];
    
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      const matches = keywords.filter(keyword => lowerMsg.includes(keyword));
      if (matches.length > 0) {
        detectedTopics.push({
          topic: topic,
          relevance: matches.length / keywords.length,
          keywords: matches
        });
      }
    }
    
    return detectedTopics;
  }

  extractUserMentions(msg) {
    // Extract potential user mentions (simplified)
    const mentions = msg.match(/@\w+/g) || [];
    return mentions.map(mention => mention.slice(1));
  }

  // === SOCIAL CONTEXT ANALYSIS ===
  
  assessConversationFlow(room, messageData) {
    const history = this.getConversationHistory(room);
    const recentMessages = history.slice(-5);
    
    if (recentMessages.length < 2) {
      return { flow: 'starting', continuity: 0.0, participants: 1 };
    }
    
    // Analyze conversation continuity
    const topicConsistency = this.calculateTopicConsistency(recentMessages);
    const participantContinuity = this.calculateParticipantContinuity(recentMessages);
    const timingConsistency = this.calculateTimingConsistency(recentMessages);
    
    return {
      flow: this.categorizeFlow(topicConsistency, participantContinuity, timingConsistency),
      continuity: (topicConsistency + participantContinuity + timingConsistency) / 3,
      participants: new Set(recentMessages.map(m => m.nick)).size,
      topicConsistency: topicConsistency,
      participantContinuity: participantContinuity,
      timingConsistency: timingConsistency
    };
  }

  analyzeMessageTiming(room, messageData) {
    const history = this.getConversationHistory(room);
    const lastMessage = history[history.length - 2]; // Previous message
    
    if (!lastMessage) {
      return { timing: 'first', gap: 0, context: 'conversation_start' };
    }
    
    const gap = Date.now() - new Date(lastMessage.time).getTime();
    
    let timingCategory;
    if (gap < 10000) timingCategory = 'immediate';
    else if (gap < 60000) timingCategory = 'responsive';
    else if (gap < 300000) timingCategory = 'delayed';
    else timingCategory = 'separated';
    
    return {
      timing: timingCategory,
      gap: gap,
      context: this.determineTimingContext(gap, lastMessage, messageData)
    };
  }

  assessGroupDynamics(room, currentSpeaker) {
    const participants = this.getParticipantData(room);
    const recentActivity = this.getRecentActivity(room, 10 * 60 * 1000); // 10 minutes
    
    const activeSpeakers = new Set(recentActivity.map(m => m.nick));
    const dominantSpeaker = this.findDominantSpeaker(recentActivity);
    const interactionBalance = this.calculateInteractionBalance(recentActivity);
    
    return {
      groupSize: activeSpeakers.size,
      dominantSpeaker: dominantSpeaker,
      currentSpeakerDominance: this.calculateSpeakerDominance(currentSpeaker, recentActivity),
      interactionBalance: interactionBalance,
      groupCohesion: this.calculateGroupCohesion(recentActivity),
      conversationMode: this.determineConversationMode(activeSpeakers.size, interactionBalance)
    };
  }

  getRelationshipContext(nick) {
    const actualUsername = this.bot.getActualUsername ? this.bot.getActualUsername(nick) : nick;
    const userKey = actualUsername.toLowerCase();
    
    // Get relationship information from various systems
    let relationshipContext = {
      type: 'unknown',
      trust_level: 0.5,
      interaction_history: 0,
      emotional_bond: 0.0,
      permission_level: 1
    };
    
    // Check beloved system
    if (this.bot.belovedSystem && this.bot.belovedSystem.isBelovedUser(actualUsername)) {
      relationshipContext.type = 'beloved';
      relationshipContext.trust_level = 1.0;
      relationshipContext.emotional_bond = 0.9;
    }
    
    // Check owner status
    if (this.bot.isOwner && this.bot.isOwner(nick)) {
      relationshipContext.type = 'owner';
      relationshipContext.trust_level = 1.0;
      relationshipContext.permission_level = 10;
    }
    
    // Check permission manager
    if (this.bot.permissionManager) {
      relationshipContext.permission_level = this.bot.permissionManager.getUserPermissionLevel(actualUsername);
    }
    
    // Check user memory
    if (this.bot.userMemory && this.bot.userMemory.has(userKey)) {
      const profile = this.bot.userMemory.get(userKey);
      relationshipContext.interaction_history = profile.totalInteractions || 0;
      
      if (profile.permissions) {
        if (profile.permissions.isBeloved) relationshipContext.type = 'beloved';
        if (profile.permissions.isUndead) relationshipContext.type = 'undead';
        if (profile.permissions.isEnemy) relationshipContext.type = 'enemy';
      }
    }
    
    return relationshipContext;
  }

  assessRoomAtmosphere(room) {
    const recentMessages = this.getRecentActivity(room, 30 * 60 * 1000); // 30 minutes
    
    if (recentMessages.length === 0) {
      return { atmosphere: 'quiet', energy: 0.1, emotional_tone: 'neutral' };
    }
    
    // Analyze emotional indicators in recent messages
    const emotionalTones = recentMessages.map(m => 
      this.detectEmotionalTone(m.msg).overall
    );
    
    const toneDistribution = this.calculateToneDistribution(emotionalTones);
    const messageFrequency = recentMessages.length / 30; // Messages per minute
    const averageLength = recentMessages.reduce((sum, m) => sum + m.msg.length, 0) / recentMessages.length;
    
    return {
      atmosphere: this.categorizeAtmosphere(toneDistribution, messageFrequency),
      energy: Math.min(1.0, messageFrequency / 2), // Normalize to 0-1
      emotional_tone: this.getDominantTone(toneDistribution),
      message_frequency: messageFrequency,
      average_message_length: averageLength,
      participant_count: new Set(recentMessages.map(m => m.nick)).size
    };
  }

  calculateInterruptionRisk(room, messageData) {
    const conversationState = this.getConversationState(room);
    const timing = this.analyzeMessageTiming(room, messageData);
    const groupDynamics = this.assessGroupDynamics(room, messageData.nick);
    
    // Factors that increase interruption risk
    let riskFactors = 0;
    
    if (timing.timing === 'immediate') riskFactors += 0.3;
    if (groupDynamics.groupSize > 3) riskFactors += 0.2;
    if (groupDynamics.currentSpeakerDominance > 0.7) riskFactors += 0.3;
    if (conversationState.current === 'active_discussion') riskFactors += 0.4;
    
    return Math.min(1.0, riskFactors);
  }

  calculateEngagementLevel(room, nick) {
    const recentActivity = this.getRecentActivity(room, 10 * 60 * 1000);
    const userMessages = recentActivity.filter(m => m.nick === nick);
    
    if (userMessages.length === 0) return 0.0;
    
    const frequency = userMessages.length / recentActivity.length;
    const averageLength = userMessages.reduce((sum, m) => sum + m.msg.length, 0) / userMessages.length;
    const timeSpread = this.calculateTimeSpread(userMessages);
    
    return Math.min(1.0, (frequency * 0.4) + (averageLength / 100 * 0.3) + (timeSpread * 0.3));
  }

  // === RESPONSE RECOMMENDATION ===
  
  calculateResponseRecommendation(contentAnalysis, socialContext, conversationState, nick) {
    const baseFactors = {
      directedness: contentAnalysis.directedness.directnessScore,
      emotional_weight: contentAnalysis.emotionalTone.intensity,
      social_weight: contentAnalysis.contextType.socialWeight,
      urgency: contentAnalysis.urgency.level,
      relationship_bonus: this.calculateRelationshipBonus(socialContext.relationshipContext)
    };
    
    const socialFactors = {
      conversation_flow: socialContext.conversationFlow.continuity,
      timing_appropriateness: this.calculateTimingAppropriateness(socialContext.timing),
      interruption_penalty: socialContext.interruptionRisk,
      engagement_level: socialContext.engagementLevel,
      atmosphere_match: this.calculateAtmosphereMatch(socialContext.roomAtmosphere)
    };
    
    // Calculate base response probability
    const baseScore = Object.values(baseFactors).reduce((sum, factor) => sum + factor, 0) / Object.keys(baseFactors).length;
    const socialScore = Object.values(socialFactors).reduce((sum, factor) => sum + factor, 0) / Object.keys(socialFactors).length;
    
    const combinedScore = (baseScore * 0.6) + (socialScore * 0.4);
    
    // Determine response style and timing
    const responseStyle = this.determineResponseStyle(contentAnalysis, socialContext);
    const responseDelay = this.calculateResponseDelay(responseStyle, socialContext);
    
    return {
      shouldRespond: combinedScore > this.socialProtocols.response_probability,
      confidence: combinedScore,
      responseStyle: responseStyle,
      recommendedDelay: responseDelay,
      reasoning: {
        baseFactors: baseFactors,
        socialFactors: socialFactors,
        combinedScore: combinedScore
      }
    };
  }

  calculateRelationshipBonus(relationshipContext) {
    const bonuses = {
      owner: 1.0,
      beloved: 0.8,
      undead: 0.6,
      trusted: 0.4,
      enemy: -0.5,
      unknown: 0.0
    };
    
    return bonuses[relationshipContext.type] || 0.0;
  }

  calculateTimingAppropriateness(timing) {
    const appropriateness = {
      immediate: 0.9,
      responsive: 1.0,
      delayed: 0.7,
      separated: 0.3
    };
    
    return appropriateness[timing.timing] || 0.5;
  }

  calculateAtmosphereMatch(roomAtmosphere) {
    // Bot tends to match room energy
    if (roomAtmosphere.atmosphere === 'active' && roomAtmosphere.energy > 0.7) {
      return 0.8;
    } else if (roomAtmosphere.atmosphere === 'quiet' && roomAtmosphere.energy < 0.3) {
      return 0.6;
    } else {
      return 0.5;
    }
  }

  determineResponseStyle(contentAnalysis, socialContext) {
    const contextStyle = contentAnalysis.contextType.responseStyle;
    const urgency = contentAnalysis.urgency.level;
    const relationship = socialContext.relationshipContext.type;
    
    // Override based on urgency
    if (urgency > 0.8) return 'immediate';
    
    // Override based on relationship
    if (relationship === 'owner' || relationship === 'beloved') {
      return 'immediate';
    }
    
    // Use context default
    return contextStyle;
  }

  calculateResponseDelay(responseStyle, socialContext) {
    const baseConfig = this.responseTimingConfig[responseStyle];
    const randomDelay = Math.random() * (baseConfig.maxDelay - baseConfig.minDelay) + baseConfig.minDelay;
    
    // Adjust based on social factors
    let adjustmentFactor = 1.0;
    
    if (socialContext.interruptionRisk > 0.7) {
      adjustmentFactor *= 1.5; // Wait longer if high interruption risk
    }
    
    if (socialContext.relationshipContext.type === 'beloved') {
      adjustmentFactor *= 0.7; // Respond faster to beloved users
    }
    
    return Math.round(randomDelay * adjustmentFactor);
  }

  // === DATA MANAGEMENT ===
  
  getConversationState(room) {
    if (!this.conversationStates.has(room)) {
      this.conversationStates.set(room, {
        current: 'idle',
        participants: new Set(),
        startTime: Date.now(),
        lastActivity: Date.now(),
        messageCount: 0,
        topics: []
      });
    }
    return this.conversationStates.get(room);
  }

  getParticipantData(room) {
    if (!this.participantTracking.has(room)) {
      this.participantTracking.set(room, new Map());
    }
    return this.participantTracking.get(room);
  }

  getConversationHistory(room) {
    if (!this.conversationHistory.has(room)) {
      this.conversationHistory.set(room, []);
    }
    return this.conversationHistory.get(room);
  }

  updateConversationState(room, messageData, contentAnalysis, socialContext) {
    const state = this.getConversationState(room);
    
    state.participants.add(messageData.nick);
    state.lastActivity = Date.now();
    state.messageCount++;
    
    // Update topics
    const newTopics = contentAnalysis.topics.map(t => t.topic);
    state.topics = [...new Set([...state.topics, ...newTopics])].slice(-5); // Keep last 5 topics
    
    // Update conversation state
    if (socialContext.conversationFlow.participants > 1) {
      state.current = 'active_discussion';
    } else if (Date.now() - state.startTime < 2 * 60 * 1000) {
      state.current = 'warming_up';
    } else {
      state.current = 'steady';
    }
    
    this.conversationStates.set(room, state);
  }

  updateParticipantTracking(room, nick, messageData, contentAnalysis) {
    const participants = this.getParticipantData(room);
    
    const participantData = participants.get(nick) || {
      messageCount: 0,
      totalLength: 0,
      averageLength: 0,
      lastMessage: null,
      emotionalTones: [],
      topicInterests: new Map(),
      engagementPattern: []
    };
    
    participantData.messageCount++;
    participantData.totalLength += messageData.msg.length;
    participantData.averageLength = participantData.totalLength / participantData.messageCount;
    participantData.lastMessage = Date.now();
    
    // Track emotional patterns
    participantData.emotionalTones.push(contentAnalysis.emotionalTone.overall);
    if (participantData.emotionalTones.length > 10) {
      participantData.emotionalTones = participantData.emotionalTones.slice(-10);
    }
    
    // Track topic interests
    for (const topic of contentAnalysis.topics) {
      const current = participantData.topicInterests.get(topic.topic) || 0;
      participantData.topicInterests.set(topic.topic, current + topic.relevance);
    }
    
    participants.set(nick, participantData);
  }

  getRecentActivity(room, timeWindow) {
    const history = this.getConversationHistory(room);
    const cutoff = Date.now() - timeWindow;
    
    return history.filter(msg => new Date(msg.time).getTime() > cutoff);
  }

  cleanupExpiredData() {
    const now = Date.now();
    const expirationTime = 2 * 60 * 60 * 1000; // 2 hours
    
    // Clean conversation history
    for (const [room, history] of this.conversationHistory.entries()) {
      const filtered = history.filter(msg => 
        now - new Date(msg.time).getTime() < expirationTime
      );
      this.conversationHistory.set(room, filtered);
    }
    
    // Clean analysis cache
    for (const [key, data] of this.analysisCache.entries()) {
      if (now - data.timestamp > this.cacheTimeout) {
        this.analysisCache.delete(key);
      }
    }
    
    console.log("[SOCIAL] Cleaned expired data");
  }

  // === UTILITY METHODS ===
  
  addMessageToHistory(room, messageData) {
    const history = this.getConversationHistory(room);
    history.push(messageData);
    
    // Keep history manageable (last 100 messages)
    if (history.length > 100) {
      this.conversationHistory.set(room, history.slice(-100));
    }
  }

  // Helper methods for calculations (simplified implementations)
  calculateTopicConsistency(messages) {
    // Simplified topic consistency calculation
    return 0.7; // Placeholder
  }

  calculateParticipantContinuity(messages) {
    const participants = new Set(messages.map(m => m.nick));
    return Math.min(1.0, participants.size / messages.length);
  }

  calculateTimingConsistency(messages) {
    // Simplified timing consistency calculation
    return 0.6; // Placeholder
  }

  categorizeFlow(topicConsistency, participantContinuity, timingConsistency) {
    const average = (topicConsistency + participantContinuity + timingConsistency) / 3;
    
    if (average > 0.8) return 'flowing';
    if (average > 0.6) return 'steady';
    if (average > 0.4) return 'choppy';
    return 'fragmented';
  }

  determineTimingContext(gap, lastMessage, currentMessage) {
    if (gap < 5000) return 'rapid_exchange';
    if (gap < 30000) return 'normal_conversation';
    if (gap < 300000) return 'slow_discussion';
    return 'conversation_gap';
  }

  findDominantSpeaker(recentActivity) {
    const speakerCounts = new Map();
    
    for (const message of recentActivity) {
      const count = speakerCounts.get(message.nick) || 0;
      speakerCounts.set(message.nick, count + 1);
    }
    
    let dominant = null;
    let maxCount = 0;
    
    for (const [speaker, count] of speakerCounts.entries()) {
      if (count > maxCount) {
        maxCount = count;
        dominant = speaker;
      }
    }
    
    return dominant;
  }

  calculateInteractionBalance(recentActivity) {
    const speakers = new Set(recentActivity.map(m => m.nick));
    if (speakers.size <= 1) return 1.0;
    
    const idealShare = 1.0 / speakers.size;
    const speakerCounts = new Map();
    
    for (const message of recentActivity) {
      const count = speakerCounts.get(message.nick) || 0;
      speakerCounts.set(message.nick, count + 1);
    }
    
    let totalDeviation = 0;
    for (const [speaker, count] of speakerCounts.entries()) {
      const actualShare = count / recentActivity.length;
      totalDeviation += Math.abs(actualShare - idealShare);
    }
    
    return Math.max(0, 1.0 - totalDeviation);
  }

  calculateSpeakerDominance(speaker, recentActivity) {
    const speakerMessages = recentActivity.filter(m => m.nick === speaker);
    return speakerMessages.length / recentActivity.length;
  }

  calculateGroupCohesion(recentActivity) {
    // Simplified cohesion calculation
    return 0.6; // Placeholder
  }

  determineConversationMode(groupSize, interactionBalance) {
    if (groupSize === 1) return 'monologue';
    if (groupSize === 2) return 'dialogue';
    if (interactionBalance > 0.7) return 'group_discussion';
    return 'fragmented_conversation';
  }

  calculateToneDistribution(emotionalTones) {
    const distribution = {};
    
    for (const tone of emotionalTones) {
      distribution[tone] = (distribution[tone] || 0) + 1;
    }
    
    // Normalize
    const total = emotionalTones.length;
    for (const tone in distribution) {
      distribution[tone] /= total;
    }
    
    return distribution;
  }

  categorizeAtmosphere(toneDistribution, messageFrequency) {
    if (messageFrequency < 0.5) return 'quiet';
    if (messageFrequency > 3) return 'active';
    if (toneDistribution.positive > 0.6) return 'positive';
    if (toneDistribution.negative > 0.6) return 'tense';
    return 'neutral';
  }

  getDominantTone(toneDistribution) {
    let dominant = 'neutral';
    let maxPercentage = 0;
    
    for (const [tone, percentage] of Object.entries(toneDistribution)) {
      if (percentage > maxPercentage) {
        maxPercentage = percentage;
        dominant = tone;
      }
    }
    
    return dominant;
  }

  calculateTimeSpread(userMessages) {
    if (userMessages.length < 2) return 0;
    
    const times = userMessages.map(m => new Date(m.time).getTime());
    const span = Math.max(...times) - Math.min(...times);
    const intervals = [];
    
    for (let i = 1; i < times.length; i++) {
      intervals.push(times[i] - times[i-1]);
    }
    
    const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
    return Math.min(1.0, averageInterval / (10 * 60 * 1000)); // Normalize to 10 minutes
  }

  // === PUBLIC API ===
  
  getSocialContextStatus() {
    return {
      activeRooms: this.conversationStates.size,
      trackedParticipants: Array.from(this.participantTracking.values()).reduce((sum, map) => sum + map.size, 0),
      conversationHistory: Array.from(this.conversationHistory.values()).reduce((sum, history) => sum + history.length, 0),
      cacheSize: this.analysisCache.size,
      systemHealth: "Operational"
    };
  }
}

module.exports = SocialContextAwareness;