// MusicSystem.js - Music Request and Playlist Management
// Handles music requests, playlist generation, and social music interactions

class MusicSystem {
  constructor(bot) {
    this.bot = bot;
    this.isActive = true;
    this.playlistMode = false;
    this.currentPlaylist = [];
    this.playlistIndex = 0;
    this.lastMusicRequest = new Map(); // Track per-user cooldowns
    this.roomPages = new Map(); // Room to page mapping
    this.musicHistory = new Map(); // Track played songs per room
    this.userMusicPreferences = new Map(); // Track user music preferences
    
    // Music cooldown settings
    this.cooldownSettings = {
      userRequestCooldown: 5 * 60 * 1000, // 5 minutes between user requests
      globalMusicCooldown: 30 * 1000, // 30 seconds between any music
      playlistInterval: 3 * 60 * 1000, // 3 minutes between playlist songs
      maxHistoryPerRoom: 20 // Remember last 20 songs per room
    };
    
    // Music genre categories for better recommendations
    this.musicGenres = {
      emo: {
        keywords: ['emo', 'emotional', 'sad', 'cry', 'heart', 'pain', 'tears'],
        artists: ['My Chemical Romance', 'Fall Out Boy', 'Panic! At The Disco', 'Pierce The Veil', 'Sleeping With Sirens'],
        defaultSongs: [
          'My Chemical Romance - Welcome to the Black Parade',
          'Fall Out Boy - Sugar We\'re Goin Down',
          'Panic! At The Disco - I Write Sins Not Tragedies',
          'Pierce The Veil - King For A Day',
          'Sleeping With Sirens - If You Can\'t Hang'
        ]
      },
      
      scene: {
        keywords: ['scene', 'hardcore', 'screamo', 'metalcore', 'punk'],
        artists: ['Bring Me The Horizon', 'A Day To Remember', 'The Devil Wears Prada', 'Of Mice & Men'],
        defaultSongs: [
          'Bring Me The Horizon - Can You Feel My Heart',
          'A Day To Remember - Downfall of Us All',
          'The Devil Wears Prada - Hey John What\'s Your Name Again',
          'Of Mice & Men - Second & Sebring'
        ]
      },
      
      alternative: {
        keywords: ['alternative', 'indie', 'rock', 'grunge'],
        artists: ['Twenty One Pilots', 'Paramore', 'Green Day', 'Linkin Park'],
        defaultSongs: [
          'Twenty One Pilots - Stressed Out',
          'Paramore - Misery Business',
          'Green Day - Boulevard of Broken Dreams',
          'Linkin Park - In The End'
        ]
      },
      
      memorial: {
        keywords: ['memory', 'memorial', 'remembrance', 'goodbye', 'miss'],
        artists: ['Johnny Cash', 'Hurt', 'Mad World'],
        defaultSongs: [
          'Johnny Cash - Hurt',
          'Gary Jules - Mad World',
          'The Sound of Silence - Disturbed',
          'Chester Bennington - One More Light'
        ]
      }
    };
    
    // Social awareness for music timing
    this.socialContext = {
      conversationActive: false,
      lastUserActivity: new Map(),
      roomActivity: new Map(),
      musicInterruption: false
    };
    
    // Playlist generation settings
    this.playlistSettings = {
      defaultLength: 7,
      maxLength: 20,
      genreMixing: true,
      avoidRecentRepeats: true,
      personalizeForUsers: true
    };
  }

  // === CORE MUSIC REQUEST HANDLING ===
  
  /**
   * Process a music request from a user
   */
  async processMusicRequest(query, username, room, page) {
    const userKey = username.toLowerCase();
    
    // Check permissions
    if (!this.canUserRequestMusic(username)) {
      return {
        success: false,
        message: `${username} - Music requests require undead status or higher. Ask ${this.bot.CONFIG?.OWNER_NICK || 'Death'} for .shoot.`
      };
    }
    
    // Check cooldowns (owners bypass)
    if (!this.bot.isOwner || !this.bot.isOwner(username)) {
      const cooldownRemaining = this.getUserCooldownRemaining(userKey);
      if (cooldownRemaining > 0) {
        return {
          success: false,
          message: `${username} - Music cooldown: ${Math.ceil(cooldownRemaining / 1000)}s remaining`
        };
      }
    }
    
    // Check global music cooldown
    const globalCooldown = this.getGlobalCooldownRemaining(room);
    if (globalCooldown > 0) {
      return {
        success: false,
        message: `Music system cooling down: ${Math.ceil(globalCooldown / 1000)}s remaining`
      };
    }
    
    // Process the music request
    const song = await this.selectSongFromQuery(query, username, room);
    if (!song) {
      return {
        success: false,
        message: `${username} - Could not find music for: "${query}"`
      };
    }
    
    // Play the music
    await this.playMusic(song, room, page, username);
    
    // Update cooldowns and tracking
    this.updateMusicCooldowns(userKey, room);
    this.trackUserMusicPreference(userKey, query, song);
    
    return {
      success: true,
      song: song,
      message: this.generateMusicResponse(song, username)
    };
  }

  /**
   * Select appropriate song based on query and context
   */
  async selectSongFromQuery(query, username, room) {
    const queryLower = query.toLowerCase();
    
    // Detect genre from query
    const detectedGenre = this.detectGenreFromQuery(queryLower);
    
    // Check user preferences
    const userPreferences = this.getUserMusicPreferences(username);
    
    // Get room history to avoid recent repeats
    const roomHistory = this.getRoomMusicHistory(room);
    
    // Generate song selection
    let song = null;
    
    // Try specific artist/song matching first
    if (queryLower.includes(' - ') || this.isSpecificRequest(queryLower)) {
      song = this.processSpecificRequest(query);
    }
    
    // Try genre-based selection
    if (!song && detectedGenre) {
      song = this.selectFromGenre(detectedGenre, roomHistory, userPreferences);
    }
    
    // Fall back to general selection
    if (!song) {
      song = this.selectGeneralSong(queryLower, roomHistory, userPreferences);
    }
    
    // Final fallback to random emo song
    if (!song) {
      song = this.getRandomEmoSong();
    }
    
    return song;
  }

  /**
   * Detect musical genre from query keywords
   */
  detectGenreFromQuery(query) {
    for (const [genreName, genreData] of Object.entries(this.musicGenres)) {
      for (const keyword of genreData.keywords) {
        if (query.includes(keyword)) {
          return genreName;
        }
      }
      
      // Check artist names
      for (const artist of genreData.artists) {
        if (query.includes(artist.toLowerCase())) {
          return genreName;
        }
      }
    }
    return null;
  }

  isSpecificRequest(query) {
    // Check if query contains specific song/artist indicators
    const indicators = ['by ', ' - ', 'song ', 'track ', 'play '];
    return indicators.some(indicator => query.includes(indicator));
  }

  processSpecificRequest(query) {
    // For now, return a formatted version of the request
    // In a real implementation, this would interface with a music API
    return {
      title: this.formatSongTitle(query),
      artist: this.extractArtistFromQuery(query),
      genre: 'requested',
      source: 'user_request',
      duration: '3:45'
    };
  }

  formatSongTitle(query) {
    // Basic formatting for song titles
    return query.split(' - ').map(part => 
      part.trim().replace(/\b\w/g, l => l.toUpperCase())
    ).join(' - ');
  }

  extractArtistFromQuery(query) {
    if (query.includes(' - ')) {
      return query.split(' - ')[0].trim();
    }
    if (query.includes(' by ')) {
      return query.split(' by ')[1].trim();
    }
    return 'Unknown Artist';
  }

  selectFromGenre(genreName, roomHistory, userPreferences) {
    const genre = this.musicGenres[genreName];
    if (!genre) return null;
    
    const availableSongs = genre.defaultSongs.filter(song => 
      !roomHistory.includes(song)
    );
    
    if (availableSongs.length === 0) {
      // If all songs were recent, pick from full list
      return this.formatSongObject(genre.defaultSongs[Math.floor(Math.random() * genre.defaultSongs.length)], genreName);
    }
    
    return this.formatSongObject(availableSongs[Math.floor(Math.random() * availableSongs.length)], genreName);
  }

  selectGeneralSong(query, roomHistory, userPreferences) {
    // Search across all genres for matching keywords
    const allSongs = [];
    
    for (const [genreName, genreData] of Object.entries(this.musicGenres)) {
      for (const song of genreData.defaultSongs) {
        if (song.toLowerCase().includes(query) || 
            genreData.keywords.some(keyword => query.includes(keyword))) {
          allSongs.push({ song, genre: genreName });
        }
      }
    }
    
    if (allSongs.length === 0) return null;
    
    // Filter out recent songs
    const availableSongs = allSongs.filter(item => !roomHistory.includes(item.song));
    const finalSelection = availableSongs.length > 0 ? availableSongs : allSongs;
    
    const selected = finalSelection[Math.floor(Math.random() * finalSelection.length)];
    return this.formatSongObject(selected.song, selected.genre);
  }

  getRandomEmoSong() {
    const emoSongs = this.musicGenres.emo.defaultSongs;
    const randomSong = emoSongs[Math.floor(Math.random() * emoSongs.length)];
    return this.formatSongObject(randomSong, 'emo');
  }

  formatSongObject(songString, genre) {
    const parts = songString.split(' - ');
    return {
      title: parts[1] || songString,
      artist: parts[0] || 'Unknown Artist',
      genre: genre,
      source: 'default_playlist',
      duration: '3:' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
      fullTitle: songString
    };
  }

  // === MUSIC PLAYBACK SIMULATION ===
  
  /**
   * Simulate playing music in the chat
   */
  async playMusic(song, room, page, requestedBy = null) {
    try {
      // Simulate music playback with chat message
      const musicMessage = this.generateMusicPlayingMessage(song, requestedBy);
      await this.bot.sendMsg(page, musicMessage);
      
      // Update room music history
      this.addToRoomHistory(room, song.fullTitle || `${song.artist} - ${song.title}`);
      
      // Update social context
      this.updateSocialContext(room, 'music_playing');
      
      console.log(`[MUSIC] Playing in ${room}: ${song.artist} - ${song.title}`);
      
    } catch (error) {
      console.error(`[MUSIC] Error playing music in ${room}:`, error.message);
    }
  }

  generateMusicPlayingMessage(song, requestedBy) {
    const messages = [
      `🎵 Now playing: ${song.artist} - ${song.title}`,
      `🎶 ♪ ${song.artist} - ${song.title} ♪`,
      `🎵 Playing: ${song.artist} - ${song.title} [${song.duration}]`,
      `🎶 ${song.artist} - ${song.title} | ${song.genre} vibes`
    ];
    
    let message = messages[Math.floor(Math.random() * messages.length)];
    
    if (requestedBy) {
      message += ` (requested by ${requestedBy})`;
    }
    
    return message;
  }

  // === PLAYLIST SYSTEM ===
  
  /**
   * Start automatic playlist mode
   */
  async startPlaylistMode(page, songCount = null, room = null) {
    if (this.playlistMode) {
      console.log("[MUSIC] Playlist mode already active");
      return false;
    }
    
    const count = songCount || this.playlistSettings.defaultLength;
    this.currentPlaylist = this.generatePlaylist(count, room);
    this.playlistIndex = 0;
    this.playlistMode = true;
    
    console.log(`[MUSIC] Playlist mode started: ${count} songs`);
    
    // Start playlist playback
    this.scheduleNextPlaylistSong(page, room);
    
    return true;
  }

  /**
   * Generate a playlist based on preferences and context
   */
  generatePlaylist(count, room = null) {
    const playlist = [];
    const roomHistory = room ? this.getRoomMusicHistory(room) : [];
    const usedSongs = new Set(roomHistory);
    
    // Mix genres for variety
    const genreNames = Object.keys(this.musicGenres);
    const genreDistribution = this.calculateGenreDistribution(count);
    
    for (const [genre, songCount] of Object.entries(genreDistribution)) {
      const genreData = this.musicGenres[genre];
      if (!genreData) continue;
      
      let addedFromGenre = 0;
      const shuffledSongs = [...genreData.defaultSongs].sort(() => Math.random() - 0.5);
      
      for (const songString of shuffledSongs) {
        if (addedFromGenre >= songCount) break;
        if (usedSongs.has(songString)) continue;
        
        playlist.push(this.formatSongObject(songString, genre));
        usedSongs.add(songString);
        addedFromGenre++;
      }
    }
    
    // Fill remaining slots with random songs if needed
    while (playlist.length < count) {
      const randomGenre = genreNames[Math.floor(Math.random() * genreNames.length)];
      const randomSong = this.selectFromGenre(randomGenre, Array.from(usedSongs), {});
      if (randomSong && !usedSongs.has(randomSong.fullTitle)) {
        playlist.push(randomSong);
        usedSongs.add(randomSong.fullTitle);
      } else {
        break; // Avoid infinite loop
      }
    }
    
    return playlist;
  }

  calculateGenreDistribution(totalCount) {
    // Default distribution favoring emo/scene genres
    const distribution = {
      emo: Math.ceil(totalCount * 0.4),
      scene: Math.ceil(totalCount * 0.3),
      alternative: Math.ceil(totalCount * 0.2),
      memorial: Math.ceil(totalCount * 0.1)
    };
    
    // Normalize to exact count
    const currentTotal = Object.values(distribution).reduce((sum, count) => sum + count, 0);
    if (currentTotal > totalCount) {
      // Reduce largest category
      const largest = Object.keys(distribution).reduce((a, b) => 
        distribution[a] > distribution[b] ? a : b
      );
      distribution[largest] -= (currentTotal - totalCount);
    }
    
    return distribution;
  }

  /**
   * Schedule next song in playlist
   */
  scheduleNextPlaylistSong(page, room) {
    if (!this.playlistMode || this.playlistIndex >= this.currentPlaylist.length) {
      this.stopPlaylistMode();
      return;
    }
    
    setTimeout(async () => {
      try {
        if (this.playlistMode && this.currentPlaylist[this.playlistIndex]) {
          const song = this.currentPlaylist[this.playlistIndex];
          await this.playMusic(song, room, page);
          
          this.playlistIndex++;
          this.scheduleNextPlaylistSong(page, room);
        }
      } catch (error) {
        console.error("[MUSIC] Playlist playback error:", error.message);
        this.stopPlaylistMode();
      }
    }, this.cooldownSettings.playlistInterval);
  }

  /**
   * Stop playlist mode
   */
  stopPlaylistMode() {
    this.playlistMode = false;
    this.currentPlaylist = [];
    this.playlistIndex = 0;
    console.log("[MUSIC] Playlist mode stopped");
  }

  // === COOLDOWN AND PERMISSION MANAGEMENT ===
  
  canUserRequestMusic(username) {
    if (this.bot.isOwner && this.bot.isOwner(username)) {
      return true; // Owners bypass all restrictions
    }
    
    const userLevel = this.bot.permissionManager ? 
      this.bot.permissionManager.getUserPermissionLevel(username) :
      this.getBasicUserLevel(username);
    
    return userLevel >= 3; // TRUSTED level or higher
  }

  getBasicUserLevel(username) {
    const userKey = username.toLowerCase();
    const profile = this.bot.userMemory?.get(userKey);
    
    if (!profile || !profile.permissions) return 1;
    
    if (profile.permissions.isBeloved) return 5;
    if (profile.permissions.isUndead) return 4;
    if (profile.permissions.isTrusted) return 3;
    if (profile.permissions.isEnemy) return -1;
    
    return 2; // Regular user
  }

  getUserCooldownRemaining(userKey) {
    const lastRequest = this.lastMusicRequest.get(userKey);
    if (!lastRequest) return 0;
    
    const elapsed = Date.now() - lastRequest;
    return Math.max(0, this.cooldownSettings.userRequestCooldown - elapsed);
  }

  getGlobalCooldownRemaining(room) {
    const roomActivity = this.socialContext.roomActivity.get(room);
    if (!roomActivity || !roomActivity.lastMusic) return 0;
    
    const elapsed = Date.now() - roomActivity.lastMusic;
    return Math.max(0, this.cooldownSettings.globalMusicCooldown - elapsed);
  }

  updateMusicCooldowns(userKey, room) {
    this.lastMusicRequest.set(userKey, Date.now());
    
    const roomActivity = this.socialContext.roomActivity.get(room) || {};
    roomActivity.lastMusic = Date.now();
    this.socialContext.roomActivity.set(room, roomActivity);
  }

  // === SOCIAL AWARENESS ===
  
  /**
   * Check if music should be played based on social context
   */
  shouldPlayMusicForMessage(message, username, room) {
    if (!this.isActive) return false;
    
    const musicKeywords = ['music', 'song', 'play', 'playlist', 'tune', 'track'];
    const lowerMessage = message.toLowerCase();
    
    // Check for music request keywords
    const containsMusicKeyword = musicKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Check for emotional context that might warrant music
    const emotionalKeywords = ['sad', 'depressed', 'lonely', 'hurt', 'pain', 'miss'];
    const isEmotional = emotionalKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Check social timing
    const conversationActive = this.isConversationActive(room);
    
    return (containsMusicKeyword || (isEmotional && !conversationActive)) && 
           this.canUserRequestMusic(username) &&
           this.getGlobalCooldownRemaining(room) === 0;
  }

  isConversationActive(room) {
    const roomActivity = this.socialContext.roomActivity.get(room);
    if (!roomActivity) return false;
    
    const timeSinceActivity = Date.now() - (roomActivity.lastMessage || 0);
    return timeSinceActivity < 2 * 60 * 1000; // 2 minutes
  }

  updateSocialContext(room, eventType) {
    const roomActivity = this.socialContext.roomActivity.get(room) || {};
    
    switch (eventType) {
      case 'message':
        roomActivity.lastMessage = Date.now();
        break;
      case 'music_playing':
        roomActivity.lastMusic = Date.now();
        break;
    }
    
    this.socialContext.roomActivity.set(room, roomActivity);
  }

  // === MUSIC PREFERENCE TRACKING ===
  
  trackUserMusicPreference(userKey, query, song) {
    const preferences = this.userMusicPreferences.get(userKey) || {
      genres: new Map(),
      artists: new Map(),
      totalRequests: 0
    };
    
    preferences.totalRequests++;
    
    // Track genre preference
    if (song.genre) {
      const genreCount = preferences.genres.get(song.genre) || 0;
      preferences.genres.set(song.genre, genreCount + 1);
    }
    
    // Track artist preference
    if (song.artist) {
      const artistCount = preferences.artists.get(song.artist) || 0;
      preferences.artists.set(song.artist, artistCount + 1);
    }
    
    this.userMusicPreferences.set(userKey, preferences);
  }

  getUserMusicPreferences(username) {
    return this.userMusicPreferences.get(username.toLowerCase()) || null;
  }

  // === ROOM HISTORY MANAGEMENT ===
  
  addToRoomHistory(room, songTitle) {
    const history = this.musicHistory.get(room) || [];
    history.push({
      title: songTitle,
      timestamp: Date.now()
    });
    
    // Keep history size manageable
    if (history.length > this.cooldownSettings.maxHistoryPerRoom) {
      history.splice(0, history.length - this.cooldownSettings.maxHistoryPerRoom);
    }
    
    this.musicHistory.set(room, history);
  }

  getRoomMusicHistory(room) {
    const history = this.musicHistory.get(room) || [];
    return history.map(entry => entry.title);
  }

  // === RESPONSE GENERATION ===
  
  generateMusicResponse(song, requestedBy = null) {
    const responses = [
      `🎵 Hope you enjoy this selection`,
      `🎶 This one's for the memories`,
      `🎵 Music was her second love`,
      `🎶 Let the music heal your soul`,
      `🎵 In memory of better times`
    ];
    
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    if (requestedBy) {
      response = response.replace('you', requestedBy);
    }
    
    return response;
  }

  // === PAGE REFERENCE MANAGEMENT ===
  
  updatePageReferences(pageMap) {
    this.roomPages = new Map(pageMap);
    console.log(`[MUSIC] Updated page references for ${this.roomPages.size} rooms`);
  }

  // === SYSTEM STATUS ===
  
  getMusicSystemStatus() {
    return {
      isActive: this.isActive,
      playlistMode: this.playlistMode,
      currentPlaylistLength: this.currentPlaylist.length,
      playlistIndex: this.playlistIndex,
      totalGenres: Object.keys(this.musicGenres).length,
      trackedUsers: this.userMusicPreferences.size,
      roomsWithHistory: this.musicHistory.size,
      systemHealth: this.isActive ? "Operational" : "Inactive"
    };
  }

  // === INITIALIZATION ===
  
  initialize() {
    console.log("🎵 Initializing music system...");
    
    // Clear any existing state
    this.currentPlaylist = [];
    this.playlistIndex = 0;
    this.playlistMode = false;
    
    this.isActive = true;
    
    console.log("🎵 Music system ready");
    console.log(`🎵 ${Object.keys(this.musicGenres).length} music genres available`);
    console.log(`🎵 Cooldowns: User ${this.cooldownSettings.userRequestCooldown/1000}s, Global ${this.cooldownSettings.globalMusicCooldown/1000}s`);
    
    return true;
  }
}

module.exports = MusicSystem;