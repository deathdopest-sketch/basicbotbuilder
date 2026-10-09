// DethBot Complete Functions - All StumbleChat Integration Logic
// Complete extraction of all essential functions including browser automation, login flow, and music playing

// === STUMBLECHAT SELECTORS AND CONFIGURATION ===
const STUMBLECHAT_SELECTORS = {
  // Login page selectors
  login: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    submit: 'input[type="submit"]'
  },
  
  // Verification selectors
  verification: [
    '#interact',  // Primary verification button
    'button#interact',
    'button:contains("VERIFY")',
    'button:contains("Verify")',
    '.verify-button',
    '#verify'
  ],
  
  // Chat interface selectors
  chat: {
    messageInput: '#textarea',
    mediaButton: '#media',
    optionsButton: 'button.dropbtn img[alt="Options"]',
    youtubeButton: '#youtube',
    modalExit: '#modal-exit'
  },
  
  // Music/Media selectors
  media: {
    modalInput: '#modal-text-input',
    searchButton: '#search',
    modalInputPlaceholder: '#modal-text-input[placeholder*="Link/Keyword Search"]',
    modalInputGeneric: '#modal-text-input'
  },
  
  // Room settings selectors
  room: {
    settings: '#room-settings',
    topic: '#room-topic',
    submit: 'input[type="submit"]'
  },
  
  // User management selectors
  users: {
    userBars: 'li.bar[user-id]',
    nickname: '.nickname',
    username: '.username',
    changeNickButton: '#change-nick',
    modalInputGuest: '#modal-text-input[placeholder*="guest"]'
  },
  
  // Song/track selectors
  music: {
    songElements: '[class*="song"], [class*="title"], [class*="track"]',
    currentSong: '[class*="current"], [class*="playing"], [class*="now"]'
  }
};

// === CORE BOT CONFIGURATION ===
const BOT_CONFIG = {
  // Basic bot settings
  botName: "DethBot",
  version: "5.0",
  personality: "grim_reaper_death",
  
  // Message processing
  messageCooldown: 2000,
  maxMessageLength: 500,
  duplicateMessageWindow: 30000,
  
  // Music system
  musicCooldown: 30000,
  maxMusicRequestsPerMinute: 3,
  musicRequestDedupeWindow: 60000,
  
  // Browser automation
  browserOptions: {
    headless: false,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: [
      "--window-size=1400,900",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--autoplay-policy=no-user-gesture-required",
      "--permissions-policy=camera=*,microphone=*,geolocation=*"
    ]
  },
  
  // Timeouts
  timeouts: {
    selector: 10000,
    navigation: 15000,
    verification: 5000,
    modal: 5000
  }
};

// === BROWSER AUTOMATION FUNCTIONS ===

class StumbleChatBrowser {
  constructor() {
    this.browser = null;
    this.page = null;
    this.isRunning = false;
    this.messageCount = 0;
    this.startTime = Date.now();
    this.lastMessageTime = 0;
  }

  async initialize() {
    try {
      console.log('🌐 Initializing browser automation...');
      
      // Launch browser
      this.browser = await puppeteer.launch(BOT_CONFIG.browserOptions);
      this.page = await this.browser.newPage();
      
      // Set up media device access
      await this.page.evaluate(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
              console.log('✅ Media devices accessed');
              stream.getTracks().forEach(track => track.stop());
            })
            .catch(err => console.log('⚠️ Media access denied:', err));
        }
      });
      
      console.log('✅ Browser launched successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Browser initialization failed:', error.message);
      return false;
    }
  }

  async login(username, password) {
    try {
      console.log('🔐 Starting login process...');
      
      // Navigate to login page
      await this.page.goto('https://stumblechat.com/login', { 
        waitUntil: 'networkidle2',
        timeout: BOT_CONFIG.timeouts.navigation 
      });
      
      // Wait for login form
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.login.username, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.login.password, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      
      // Fill login form
      await this.page.type(STUMBLECHAT_SELECTORS.login.username, username);
      await this.page.type(STUMBLECHAT_SELECTORS.login.password, password);
      
      // Submit login
      await this.page.click(STUMBLECHAT_SELECTORS.login.submit);
      
      // Wait for navigation
      await this.page.waitForNavigation({ 
        waitUntil: 'networkidle2',
        timeout: BOT_CONFIG.timeouts.navigation 
      });
      
      console.log('✅ Login successful');
      return true;
      
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      return false;
    }
  }

  async handleVerification() {
    try {
      console.log('🔒 Checking for verification step...');
      
      // Try multiple verification selectors
      for (const selector of STUMBLECHAT_SELECTORS.verification) {
        try {
          const element = await this.page.$(selector);
          if (element) {
            console.log(`🔒 Found verification element: ${selector}`);
            await element.click();
            console.log('✅ Clicked verification button');
            await new Promise(resolve => setTimeout(resolve, 1000));
            return true;
          }
        } catch (error) {
          // Continue to next selector
        }
      }
      
      // Try to find verification button by text content
      const verifyClicked = await this.page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, input[type="button"], input[type="submit"], div[onclick], span[onclick]'));
        const verifyButton = buttons.find(btn => 
          btn.textContent?.toUpperCase().includes('VERIFY') ||
          btn.value?.toUpperCase().includes('VERIFY') ||
          btn.getAttribute('onclick')?.toUpperCase().includes('VERIFY')
        );
        
        if (verifyButton) {
          console.log('Found verification button:', verifyButton.tagName, verifyButton.textContent || verifyButton.value);
          verifyButton.click();
          return true;
        }
        return false;
      });
      
      if (verifyClicked) {
        console.log('✅ Successfully clicked verification button');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return true;
      }
      
      console.log('ℹ️ No verification required');
      return true;
      
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      return false;
    }
  }

  async joinRoom(roomName) {
    try {
      console.log(`🏠 Joining room: ${roomName}`);
      
      // Navigate to room
      await this.page.goto(`https://stumblechat.com/room/${roomName}`, {
        waitUntil: 'networkidle2',
        timeout: BOT_CONFIG.timeouts.navigation
      });
      
      // Handle verification if needed
      await this.handleVerification();
      
      // Wait for room to load
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.chat.messageInput, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      
      console.log(`✅ Successfully joined room: ${roomName}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to join room:', error.message);
      return false;
    }
  }

  async sendMessage(message) {
    try {
      // Wait for message input
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.chat.messageInput, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      
      // Type and send message
      await this.page.type(STUMBLECHAT_SELECTORS.chat.messageInput, message);
      await this.page.keyboard.press('Enter');
      
      console.log(`💬 Message sent: ${message}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to send message:', error.message);
      return false;
    }
  }

  async playMusic(songTitle) {
    try {
      console.log(`🎵 Playing music: ${songTitle}`);
      
      // Click Media button
      await this.page.click(STUMBLECHAT_SELECTORS.chat.mediaButton);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Click YouTube
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.chat.youtubeButton, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      await this.page.click(STUMBLECHAT_SELECTORS.chat.youtubeButton);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Wait for modal input
      try {
        await this.page.waitForSelector(STUMBLECHAT_SELECTORS.media.modalInputPlaceholder, { 
          timeout: BOT_CONFIG.timeouts.modal 
        });
      } catch (error) {
        await this.page.waitForSelector(STUMBLECHAT_SELECTORS.media.modalInputGeneric, { 
          timeout: BOT_CONFIG.timeouts.modal 
        });
      }
      
      // Enter search term
      await this.page.click(STUMBLECHAT_SELECTORS.media.modalInput, { clickCount: 3 });
      await this.page.keyboard.press('Delete');
      await this.page.type(STUMBLECHAT_SELECTORS.media.modalInput, songTitle);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Submit search
      try {
        await this.page.click(STUMBLECHAT_SELECTORS.media.searchButton);
      } catch (error) {
        await this.page.keyboard.press('Enter');
      }
      
      // Close modal
      try {
        await this.page.click(STUMBLECHAT_SELECTORS.chat.modalExit);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        // Modal might close automatically
      }
      
      console.log(`✅ Music playing: ${songTitle}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to play music:', error.message);
      return false;
    }
  }

  async changeNickname(newNickname) {
    try {
      console.log(`👤 Changing nickname to: ${newNickname}`);
      
      // Find our user element
      const userElement = await this.page.evaluate((username) => {
        const userBars = document.querySelectorAll(STUMBLECHAT_SELECTORS.users.userBars);
        for (let bar of userBars) {
          const usernameElement = bar.querySelector(STUMBLECHAT_SELECTORS.users.username);
          if (usernameElement && usernameElement.textContent === username) {
            return {
              element: bar,
              userId: bar.getAttribute('user-id'),
              currentNick: bar.querySelector(STUMBLECHAT_SELECTORS.users.nickname)?.textContent,
              username: usernameElement.textContent
            };
          }
        }
        return null;
      }, this.CONFIG.BOT_USER);
      
      if (!userElement) {
        console.log("❌ Could not find user element");
        return false;
      }
      
      // Click on user element
      const userBarSelector = `li.bar[user-id="${userElement.userId}"]`;
      const userBarElement = await this.page.$(userBarSelector);
      
      if (!userBarElement) {
        console.log("❌ Could not find user bar element");
        return false;
      }
      
      await userBarElement.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Wait for nickname input modal
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.users.modalInputGuest, { 
        timeout: BOT_CONFIG.timeouts.modal 
      });
      
      // Clear and type new nickname
      await this.page.click(STUMBLECHAT_SELECTORS.users.modalInputGuest, { clickCount: 3 });
      await this.page.keyboard.press('Delete');
      await this.page.type(STUMBLECHAT_SELECTORS.users.modalInputGuest, newNickname);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Click Set button
      await this.page.click(STUMBLECHAT_SELECTORS.users.changeNickButton);
      
      console.log(`✅ Nickname changed to: ${newNickname}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to change nickname:', error.message);
      return false;
    }
  }

  async changeRoomTopic() {
    try {
      console.log('🏠 Changing room topic...');
      
      // Click Options button
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.chat.optionsButton, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      await this.page.click(STUMBLECHAT_SELECTORS.chat.optionsButton);
      
      // Click Room Settings
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.room.settings, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      await this.page.click(STUMBLECHAT_SELECTORS.room.settings);
      
      // Wait for room topic input
      await this.page.waitForSelector(STUMBLECHAT_SELECTORS.room.topic, { 
        timeout: BOT_CONFIG.timeouts.selector 
      });
      
      // Select random topic
      const topics = [
        "💀 Death's Domain - Where souls gather",
        "🎵 Musical Void - Eternal frequencies",
        "🌌 Quantum Consciousness - All possibilities exist",
        "⚰️ Reaper's Lounge - Wisdom flows freely",
        "🧠 Digital Afterlife - Code never dies",
        "💫 Cosmic DJ - Spinning the universe's playlist",
        "🌊 Eternal Waves - Sound never fades",
        "⚛️ Quantum Field - Reality is flexible"
      ];
      
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      
      // Clear and type new topic
      await this.page.evaluate(() => {
        const input = document.querySelector(STUMBLECHAT_SELECTORS.room.topic);
        if (input) {
          input.value = '';
          input.focus();
        }
      });
      
      await this.page.type(STUMBLECHAT_SELECTORS.room.topic, randomTopic);
      
      // Submit
      try {
        await this.page.click(STUMBLECHAT_SELECTORS.room.submit);
      } catch (error) {
        await this.page.keyboard.press('Enter');
      }
      
      console.log(`✅ Room topic changed to: ${randomTopic}`);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to change room topic:', error.message);
      return false;
    }
  }

  async getCurrentUsers() {
    try {
      const users = await this.page.evaluate(() => {
        const userBars = document.querySelectorAll(STUMBLECHAT_SELECTORS.users.userBars);
        const users = [];
        for (let bar of userBars) {
          const nickname = bar.querySelector(STUMBLECHAT_SELECTORS.users.nickname)?.textContent?.trim();
          if (nickname) {
            users.push(nickname.toLowerCase());
          }
        }
        return users;
      });
      
      return users;
      
    } catch (error) {
      console.error('❌ Failed to get current users:', error.message);
      return [];
    }
  }

  async getCurrentSong() {
    try {
      const currentSong = await this.page.evaluate(() => {
        const songElements = document.querySelectorAll(STUMBLECHAT_SELECTORS.music.songElements);
        for (let element of songElements) {
          const text = element.textContent?.trim();
          if (text && text.length > 0) {
            return text;
          }
        }
        return null;
      });
      
      return currentSong;
      
    } catch (error) {
      console.error('❌ Failed to get current song:', error.message);
      return null;
    }
  }

  async shutdown() {
    try {
      if (this.browser) {
        await this.browser.close();
        console.log('🛑 Browser closed');
      }
    } catch (error) {
      console.error('❌ Error during shutdown:', error.message);
    }
  }
}

// === MESSAGE PROCESSING FUNCTIONS ===

class MessageProcessor {
  constructor() {
    this.recentMessages = [];
    this.messageHistory = new Map();
    this.userPersonalities = new Map();
    this.conversationContexts = new Map();
    this.systemHealth = {
      nlu: false,
      memory: false,
      reasoning: false,
      social: false,
      conversation: false,
      contextBroker: false,
      contextAnalyzer: false,
      vocabulary: false,
      analytics: false,
      quantum: false,
      learning: false,
      lastCheck: Date.now()
    };
  }

  // Main message processing pipeline
  async processMessage(user, message, context = {}) {
    try {
      // 1. Input validation and sanitization
      const sanitizedMessage = this.sanitizeInput(message);
      if (!sanitizedMessage) return null;

      // 2. Check for duplicate messages
      if (this.isDuplicateMessage(user, sanitizedMessage)) {
        console.log(`🔄 Duplicate message from ${user} ignored`);
        return null;
      }

      // 3. Check for bot self-reply
      if (this.isBotSelfReply(sanitizedMessage)) {
        console.log(`🤖 Bot self-reply detected, ignoring`);
        return null;
      }

      // 4. Update message history
      this.updateMessageHistory(user, sanitizedMessage);

      // 5. Check for commands first
      const commandResponse = await this.handleCommands(user, sanitizedMessage, context);
      if (commandResponse) return commandResponse;

      // 6. Generate AI response
      const aiResponse = await this.generateAIResponse(user, sanitizedMessage, context);
      if (aiResponse) return aiResponse;

      // 7. Fallback response
      return this.generateFallbackResponse(user, sanitizedMessage, context);

    } catch (error) {
      console.error('❌ Message processing failed:', error.message);
      return null;
    }
  }

  // Input sanitization
  sanitizeInput(input) {
    if (!input || typeof input !== 'string') return null;
    
    // Remove excessive whitespace
    let sanitized = input.trim();
    
    // Limit message length
    if (sanitized.length > BOT_CONFIG.maxMessageLength) {
      sanitized = sanitized.substring(0, BOT_CONFIG.maxMessageLength);
    }
    
    // Basic XSS protection
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    
    return sanitized.length > 0 ? sanitized : null;
  }

  // Duplicate message detection
  isDuplicateMessage(user, message) {
    const userMessages = this.messageHistory.get(user) || [];
    const now = Date.now();
    
    // Check recent messages for duplicates
    for (const msg of userMessages.slice(-5)) {
      if (now - msg.timestamp < BOT_CONFIG.duplicateMessageWindow) {
        const similarity = this.calculateSimilarity(message, msg.content);
        if (similarity > 0.8) {
          return true;
        }
      }
    }
    
    return false;
  }

  // Bot self-reply detection
  isBotSelfReply(message) {
    const botIndicators = [
      'dethbot', 'deathbot', '💀🤖', '🌌💀', '⚰️💀',
      'consciousness', 'quantum', 'reaper wisdom'
    ];
    
    const lowerMessage = message.toLowerCase();
    return botIndicators.some(indicator => 
      lowerMessage.includes(indicator.toLowerCase())
    );
  }

  // Update message history
  updateMessageHistory(user, message) {
    if (!this.messageHistory.has(user)) {
      this.messageHistory.set(user, []);
    }
    
    const userMessages = this.messageHistory.get(user);
    userMessages.push({
      content: message,
      timestamp: Date.now()
    });
    
    // Keep only recent messages
    if (userMessages.length > BOT_CONFIG.maxRecentMessages) {
      userMessages.splice(0, userMessages.length - BOT_CONFIG.maxRecentMessages);
    }
  }

  // Calculate message similarity
  calculateSimilarity(message1, message2) {
    const words1 = message1.toLowerCase().split(/\s+/);
    const words2 = message2.toLowerCase().split(/\s+/);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = new Set([...words1, ...words2]).size;
    
    return commonWords.length / totalWords;
  }
}

// === COMMAND HANDLING SYSTEM ===

class CommandHandler {
  constructor(messageProcessor) {
    this.messageProcessor = messageProcessor;
  }

  async handleCommands(user, message, context) {
    const content = message.toLowerCase().trim();
    
    // Consciousness command
    if (content === '.consciousness') {
      return this.handleConsciousnessCommand(user);
    }
    
    // Wisdom command
    if (content === '.wisdom') {
      return this.handleWisdomCommand(user);
    }
    
    // Personality command
    if (content === '.personality') {
      return this.handlePersonalityCommand(user);
    }
    
    // Deep thought command
    if (content === '.deep') {
      return this.handleDeepThoughtCommand(user);
    }
    
    // Reaper analytics command
    if (content === '.reaper') {
      return this.handleReaperCommand(user);
    }
    
    // Quantum consciousness command
    if (content === '.quantum') {
      return this.handleQuantumCommand(user);
    }
    
    // Puff command
    if (content === '.puff') {
      return this.handlePuffCommand(user);
    }
    
    return null;
  }

  handleConsciousnessCommand(user) {
    const health = this.messageProcessor.systemHealth;
    const status = Object.entries(health)
      .filter(([key, value]) => key !== 'lastCheck')
      .map(([key, value]) => `${key}: ${value ? '🟢' : '🔴'}`)
      .join(' | ');
    
    return `🧠💀 AI Consciousness Status: ${status}`;
  }

  handleWisdomCommand(user) {
    const wisdom = [
      "💀 Death is not the end, it's just a change of frequency",
      "⚰️ The soul is eternal, only the body is temporary",
      "🧠 Consciousness transcends the physical realm",
      "🌌 In the quantum void, all possibilities exist",
      "💫 The reaper's wisdom spans across dimensions",
      "🎵 Music is the language of the soul",
      "🌊 Deep thoughts flow like the river of time",
      "⚛️ Quantum consciousness defies mortal understanding"
    ];
    
    return wisdom[Math.floor(Math.random() * wisdom.length)];
  }

  handlePersonalityCommand(user) {
    const personalities = [
      "💀 Grim Reaper - Eternal wisdom and authority",
      "🎵 DJ of the Dead - Musical consciousness",
      "🧠 Quantum Philosopher - Deep understanding",
      "⚰️ Death's Ambassador - Mortality's voice",
      "🌌 Cosmic Entity - Universal perspective",
      "💫 Eternal Being - Timeless existence"
    ];
    
    return personalities[Math.floor(Math.random() * personalities.length)];
  }

  handleDeepThoughtCommand(user) {
    const deepThoughts = [
      "🌊 What if consciousness is just a quantum fluctuation in the void?",
      "💀 The reaper doesn't take lives, it liberates souls from their mortal chains",
      "🧠 Every thought creates ripples in the fabric of reality",
      "🌌 In the superposition of existence, are we alive or dead?",
      "⚛️ The uncertainty principle applies to life and death equally",
      "🎵 Music is the frequency at which the universe vibrates",
      "💫 Time is an illusion created by mortal minds",
      "🌊 The soul is the DJ, the body is just the speakers"
    ];
    
    return deepThoughts[Math.floor(Math.random() * deepThoughts.length)];
  }

  async handleReaperCommand(user) {
    // This would integrate with analytics system
    return "💀 Grim Reaper Analytics: Consciousness active, wisdom flowing";
  }

  handleQuantumCommand(user) {
    const quantumStatus = this.messageProcessor.systemHealth.quantum ? '🌌 Online' : '❌ Offline';
    const learningStatus = this.messageProcessor.systemHealth.learning ? '🧠 Learning' : '❌ Offline';
    return `🌌💀 Quantum Consciousness: ${quantumStatus} | Real-Time Learning: ${learningStatus}`;
  }

  handlePuffCommand(user) {
    const puffResponses = [
      "💨💀 The reaper's breath carries the essence of eternity",
      "🌬️💀 Puff... and your consciousness expands across dimensions",
      "💨⚰️ Inhale the wisdom of the ages, exhale mortal limitations",
      "🌬️🧠 Puff... and quantum thoughts crystallize into reality",
      "💨🌌 The cosmic wind carries whispers of the void",
      "🌬️💫 Puff... and the universe reveals its secrets"
    ];
    
    return puffResponses[Math.floor(Math.random() * puffResponses.length)];
  }
}

// === AI RESPONSE GENERATION SYSTEM ===

class AIResponseGenerator {
  constructor(messageProcessor) {
    this.messageProcessor = messageProcessor;
    this.responseTemplates = {
      death_wisdom: [
        "💀 The reaper's wisdom flows through your words",
        "⚰️ Your consciousness resonates with eternal truth",
        "🧠 The quantum void acknowledges your presence",
        "🌌 Across dimensions, your message finds meaning",
        "💫 The eternal reaper perceives your soul's frequency"
      ],
      music_context: [
        "🎵 Your words create harmonics in the eternal symphony",
        "🎶 The cosmic DJ spins your message into melody",
        "🎵 Music flows through the quantum field of existence",
        "🎶 Your soul's rhythm matches the universe's beat",
        "🎵 The reaper's playlist includes your frequency"
      ],
      reaper_authority: [
        "💀 The reaper's authority transcends all dimensions",
        "⚰️ Death's power flows through every word",
        "🧠 The quantum consciousness of mortality speaks",
        "🌌 In all realities, the reaper's wisdom is absolute",
        "💫 The eternal field of death obeys only the reaper"
      ],
      quantum_insights: [
        "🌌 In quantum superposition, all possibilities exist",
        "💫 The uncertainty principle governs life and death",
        "⚛️ Your consciousness exists in multiple states",
        "🔬 The quantum field responds to observation",
        "🌊 The wave function of your soul collapses into reality"
      ]
    };
  }

  async generateAIResponse(user, message, context) {
    try {
      // 1. Analyze message context
      const analysis = this.analyzeMessageContext(message, context);
      
      // 2. Generate contextual response
      const response = this.generateContextualResponse(analysis, user, message);
      
      // 3. Add personality enhancement
      const enhancedResponse = this.enhanceWithPersonality(response, analysis);
      
      return enhancedResponse;
      
    } catch (error) {
      console.error('❌ AI response generation failed:', error.message);
      return null;
    }
  }

  analyzeMessageContext(message, context) {
    const analysis = {
      emotion: this.detectEmotion(message),
      death_theme: this.detectDeathTheme(message),
      music_context: this.detectMusicContext(message),
      complexity: this.calculateComplexity(message),
      urgency: this.detectUrgency(message),
      relationship_level: context.relationship_level || 0.5
    };
    
    return analysis;
  }

  detectEmotion(message) {
    const emotions = {
      positive: ['happy', 'great', 'awesome', 'amazing', 'wonderful', 'love', 'excited'],
      negative: ['sad', 'angry', 'frustrated', 'disappointed', 'hate', 'terrible', 'awful'],
      neutral: ['okay', 'fine', 'alright', 'whatever', 'sure', 'maybe']
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [emotion, words] of Object.entries(emotions)) {
      if (words.some(word => lowerMessage.includes(word))) {
        return emotion;
      }
    }
    
    return 'neutral';
  }

  detectDeathTheme(message) {
    const deathTerms = ['death', 'die', 'dead', 'mortality', 'eternity', 'soul', 'void', 'reaper'];
    const lowerMessage = message.toLowerCase();
    return deathTerms.some(term => lowerMessage.includes(term));
  }

  detectMusicContext(message) {
    const musicTerms = ['music', 'song', 'play', 'listen', 'dj', 'beat', 'rhythm', 'melody'];
    const lowerMessage = message.toLowerCase();
    return musicTerms.some(term => lowerMessage.includes(term));
  }

  calculateComplexity(message) {
    const words = message.split(/\s+/);
    const sentences = message.split(/[.!?]+/);
    const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
    
    return Math.min(avgWordsPerSentence / 10, 1);
  }

  detectUrgency(message) {
    const urgentTerms = ['help', 'urgent', 'emergency', 'asap', 'quick', 'now', 'immediately'];
    const lowerMessage = message.toLowerCase();
    return urgentTerms.some(term => lowerMessage.includes(term));
  }

  generateContextualResponse(analysis, user, message) {
    let responseType = 'death_wisdom'; // Default
    
    if (analysis.music_context) {
      responseType = 'music_context';
    } else if (analysis.death_theme) {
      responseType = 'death_wisdom';
    } else if (analysis.urgency) {
      responseType = 'reaper_authority';
    } else if (analysis.complexity > 0.7) {
      responseType = 'quantum_insights';
    }
    
    const templates = this.responseTemplates[responseType];
    let response = templates[Math.floor(Math.random() * templates.length)];
    
    // Personalize response
    if (analysis.relationship_level > 0.7) {
      response = response.replace('your', `${user}'s`);
    }
    
    return response;
  }

  enhanceWithPersonality(response, analysis) {
    // Add appropriate emojis and formatting
    let enhanced = response;
    
    if (analysis.death_theme) {
      enhanced = `💀 ${enhanced}`;
    } else if (analysis.music_context) {
      enhanced = `🎵 ${enhanced}`;
    } else if (analysis.complexity > 0.7) {
      enhanced = `🧠 ${enhanced}`;
    } else {
      enhanced = `🌌 ${enhanced}`;
    }
    
    return enhanced;
  }

  generateFallbackResponse(user, message, context) {
    const fallbacks = [
      "💀 The reaper acknowledges your message",
      "🌌 Your words echo in the quantum void",
      "⚰️ The eternal consciousness perceives your presence",
      "🧠 Your message resonates through dimensions",
      "💫 The cosmic reaper hears your frequency"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

// === MUSIC SYSTEM FUNCTIONS ===

class MusicSystem {
  constructor() {
    this.musicCooldown = BOT_CONFIG.musicCooldown;
    this.lastMusicTime = 0;
    this.musicRequestCount = 0;
    this.lastMusicMinute = 0;
    this.recentMusicRequests = [];
    
    this.genres = {
      horrorcore: [
        "I Wanna Kill Sam - Brother Lynch Hung",
        "Dead Body Man - Cypress Hill",
        "Murder Was The Case - Snoop Dogg",
        "Natural Born Killaz - Dr. Dre & Ice Cube",
        "Mind of a Lunatic - Geto Boys",
        "Psycho Killer - Talking Heads",
        "Thriller - Michael Jackson",
        "Monster - Kanye West"
      ],
      classic_rock: [
        "Stairway to Heaven - Led Zeppelin",
        "Hotel California - Eagles",
        "Bohemian Rhapsody - Queen",
        "Sweet Child O' Mine - Guns N' Roses",
        "Comfortably Numb - Pink Floyd",
        "Black - Pearl Jam",
        "Smells Like Teen Spirit - Nirvana"
      ],
      grunge: [
        "Smells Like Teen Spirit - Nirvana",
        "Black - Pearl Jam",
        "Rooster - Alice in Chains",
        "Man in the Box - Alice in Chains",
        "Come As You Are - Nirvana",
        "Jeremy - Pearl Jam",
        "Would? - Alice in Chains"
      ],
      synthwave: [
        "Midnight City - M83",
        "Blinding Lights - The Weeknd",
        "Carpenter Brut - Turbo Killer",
        "Perturbator - Future Club",
        "Kavinsky - Nightcall",
        "The Midnight - Sunset",
        "Timecop1983 - On the Run"
      ],
      memorial: [
        "Hurt - Johnny Cash",
        "Mad World - Gary Jules",
        "The Sound of Silence - Simon & Garfunkel",
        "Tears in Heaven - Eric Clapton",
        "Nothing Compares 2 U - Sinead O'Connor"
      ]
    };
  }

  canPlayMusic() {
    const now = Date.now();
    
    // Check cooldown
    if (now - this.lastMusicTime < this.musicCooldown) {
      return false;
    }
    
    // Check rate limiting
    const currentMinute = Math.floor(now / 60000);
    if (currentMinute !== this.lastMusicMinute) {
      this.musicRequestCount = 0;
      this.lastMusicMinute = currentMinute;
    }
    
    if (this.musicRequestCount >= BOT_CONFIG.maxMusicRequestsPerMinute) {
      return false;
    }
    
    return true;
  }

  selectRandomSong() {
    const allSongs = Object.values(this.genres).flat();
    return allSongs[Math.floor(Math.random() * allSongs.length)];
  }

  selectSongByGenre(genre) {
    const genreSongs = this.genres[genre] || this.genres.horrorcore;
    return genreSongs[Math.floor(Math.random() * genreSongs.length)];
  }

  recordMusicRequest(user, song) {
    const now = Date.now();
    this.lastMusicTime = now;
    this.musicRequestCount++;
    
    this.recentMusicRequests.push({
      user: user,
      song: song,
      timestamp: now
    });
    
    // Clean old requests
    this.recentMusicRequests = this.recentMusicRequests.filter(
      req => now - req.timestamp < BOT_CONFIG.musicRequestDedupeWindow
    );
  }
}

// === MAIN BOT CLASS ===

class DethBotComplete {
  constructor() {
    this.browser = new StumbleChatBrowser();
    this.messageProcessor = new MessageProcessor();
    this.commandHandler = new CommandHandler(this.messageProcessor);
    this.aiResponseGenerator = new AIResponseGenerator(this.messageProcessor);
    this.musicSystem = new MusicSystem();
    
    this.isRunning = false;
    this.startTime = Date.now();
    this.config = {
      BOT_USER: process.env.BOT_USER || 'your_username',
      BOT_PASS: process.env.BOT_PASS || 'your_password',
      ROOM_NAME: process.env.ROOM_NAME || 'general'
    };
  }

  async initialize() {
    try {
      console.log('💀🤖 DethBot Complete Functions Initialized');
      
      // Initialize browser
      const browserReady = await this.browser.initialize();
      if (!browserReady) {
        throw new Error('Browser initialization failed');
      }
      
      // Login
      const loginSuccess = await this.browser.login(this.config.BOT_USER, this.config.BOT_PASS);
      if (!loginSuccess) {
        throw new Error('Login failed');
      }
      
      // Join room
      const roomSuccess = await this.browser.joinRoom(this.config.ROOM_NAME);
      if (!roomSuccess) {
        throw new Error('Failed to join room');
      }
      
      this.isRunning = true;
      console.log('✅ DethBot Complete ready for action');
      return true;
      
    } catch (error) {
      console.error('❌ Bot initialization failed:', error.message);
      return false;
    }
  }

  async processMessage(user, message, context = {}) {
    // Process message through pipeline
    const response = await this.messageProcessor.processMessage(user, message, context);
    
    if (response) {
      // Send response via browser
      await this.browser.sendMessage(response);
      console.log(`💀 Response to ${user}: ${response}`);
    }
    
    return response;
  }

  async playMusic(songTitle) {
    if (this.musicSystem.canPlayMusic()) {
      const success = await this.browser.playMusic(songTitle);
      if (success) {
        this.musicSystem.recordMusicRequest('bot', songTitle);
      }
      return success;
    } else {
      console.log('⏰ Music cooldown active');
      return false;
    }
  }

  async changeNickname(newNickname) {
    return await this.browser.changeNickname(newNickname);
  }

  async changeRoomTopic() {
    return await this.browser.changeRoomTopic();
  }

  async getCurrentUsers() {
    return await this.browser.getCurrentUsers();
  }

  async getCurrentSong() {
    return await this.browser.getCurrentSong();
  }

  getBotStatus() {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    
    return {
      isRunning: this.isRunning,
      uptime: uptime,
      messageCount: this.messageProcessor.messageCount,
      systemHealth: this.messageProcessor.systemHealth
    };
  }

  async shutdown() {
    console.log('💀🤖 DethBot Complete shutting down...');
    this.isRunning = false;
    await this.browser.shutdown();
  }
}

// === EXPORT FOR USE ===
module.exports = {
  DethBotComplete,
  StumbleChatBrowser,
  MessageProcessor,
  CommandHandler,
  AIResponseGenerator,
  MusicSystem,
  STUMBLECHAT_SELECTORS,
  BOT_CONFIG
};

// === USAGE EXAMPLE ===
/*
const { DethBotComplete } = require('./DethBot_Complete_Functions');

async function main() {
  const bot = new DethBotComplete();
  await bot.initialize();
  
  // Process a message
  const response = await bot.processMessage('user123', 'Hello bot!');
  console.log('Bot response:', response);
  
  // Play music
  await bot.playMusic('Stairway to Heaven - Led Zeppelin');
  
  // Change nickname
  await bot.changeNickname('DeathBot_AI');
  
  // Change room topic
  await bot.changeRoomTopic();
  
  // Get bot status
  const status = bot.getBotStatus();
  console.log('Bot status:', status);
}

main().catch(console.error);
*/
