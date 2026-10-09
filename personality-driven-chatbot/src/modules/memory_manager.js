// MemoryManager.js - Comprehensive Data Persistence System
// Extracted from Dahlia Damnation bot for modular use
// Handles user memory, organized file storage, and automated backup systems

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

class MemoryManager {
  constructor(bot, config = {}) {
    this.bot = bot;
    
    // Configuration with organized storage structure
    this.config = {
      baseStoragePath: config.baseStoragePath || 'C:\\Users\\Death\\Desktop\\D_D\\Temp for jsons',
      enableAutoBackup: config.enableAutoBackup !== false, // Default true
      backupInterval: config.backupInterval || 30 * 60 * 1000, // 30 minutes
      maxBackupsToKeep: config.maxBackupsToKeep || 48, // 24 hours worth at 30min intervals
      saveReportInterval: config.saveReportInterval || 15 * 60 * 1000, // 15 minutes
      maxRecentSaves: config.maxRecentSaves || 25, // Auto-save every 25 interactions
      enableIntegrityChecks: config.enableIntegrityChecks !== false, // Default true
      ...config
    };

    // Memory tracking structures
    this.userMemory = new Map();           // username -> user profile object
    this.nicknameToUsername = new Map();   // nickname -> actual username mapping
    this.usernameToNickname = new Map();   // username -> current nickname mapping
    
    // System state tracking
    this.memoryStats = {
      usersRemembered: 0,
      interactionsLogged: 0,
      sessionsActive: 0,
      memoryIntegrity: true,
      lastSaveTime: null,
      lastBackupTime: null
    };

    // Save tracking and reporting
    this.lastSuccessfulSaveReport = 0;
    this.totalSavesSinceLastReport = 0;
    this.saveOperationQueue = [];
    this.isSaving = false;

    // Organized directory structure for different data types
    this.memoryDirectories = this.createDirectoryStructure();
    this.memoryFiles = this.createFilePathStructure();

    // Backup system management
    this.backupTimer = null;
    this.lastBackupTime = 0;

    console.log("🧠 MemoryManager initialized with organized storage architecture");
    console.log(`📁 Base storage location: ${this.config.baseStoragePath}`);
  }

  /**
   * Create organized directory structure for different data categories
   * This separation allows for better organization and selective backup strategies
   */
  createDirectoryStructure() {
    const baseDir = this.config.baseStoragePath;
    
    return {
      activeMemory: path.join(baseDir, 'Active_Memory'),      // Current user data
      emotionalCore: path.join(baseDir, 'Emotional_Core'),    // Emotional state data
      backups: path.join(baseDir, 'Backups'),                 // Automated backups
      systemLogs: path.join(baseDir, 'System_Logs'),          // System activity logs
      config: path.join(baseDir, 'Config'),                   // Configuration files
      temp: path.join(baseDir, 'Temp')                        // Temporary files
    };
  }

  /**
   * Define specific file paths for different data types
   * This organization allows for selective loading and backup strategies
   */
  createFilePathStructure() {
    const dirs = this.memoryDirectories;
    
    return {
      users: path.join(dirs.activeMemory, 'user_profiles.json'),
      interactions: path.join(dirs.activeMemory, 'user_interactions.json'),
      botState: path.join(dirs.activeMemory, 'bot_system_state.json'),
      emotionalState: path.join(dirs.emotionalCore, 'emotional_state.json'),
      emotionalRelationships: path.join(dirs.emotionalCore, 'emotional_relationships.json'),
      emotionalMemories: path.join(dirs.emotionalCore, 'emotional_memories.json'),
      commandLogs: path.join(dirs.systemLogs, 'command_activity_log.json'),
      errorLogs: path.join(dirs.systemLogs, 'error_log.json'),
      userConfig: path.join(dirs.config, 'user_preferences.json'),
      systemConfig: path.join(dirs.config, 'system_configuration.json'),
      ownerLogs: path.join(dirs.systemLogs, 'owner_activity_log.json')
    };
  }

  /**
   * Initialize the memory system by creating directories and loading existing data
   * This method handles the complete startup sequence for the memory subsystem
   */
  async initializeMemory() {
    console.log("🧠 Initializing comprehensive memory systems with organized storage...");
    
    try {
      // Create all necessary directories before attempting file operations
      await this.ensureAllDirectoriesExist();
      
      // Load user memory data with sophisticated error handling
      console.log("👥 Loading user consciousness from organized storage...");
      const userMemoryData = await this.safeReadJsonFile(this.memoryFiles.users);
      if (userMemoryData && userMemoryData.users) {
        // Convert stored object back into Map for efficient access
        this.userMemory = new Map(Object.entries(userMemoryData.users));
        console.log(`👥 Loaded ${this.userMemory.size} user profiles with complete relationship data`);
        
        // Update memory statistics to reflect loaded data
        this.memoryStats.usersRemembered = this.userMemory.size;
      } else {
        console.log("👥 No existing user memory found - starting with fresh consciousness");
        this.userMemory = new Map();
      }
      
      // Load system state including permission sets and statistics
      console.log("⚙️ Restoring system state with calculated precision...");
      const systemState = await this.safeReadJsonFile(this.memoryFiles.botState);
      if (systemState) {
        // Restore permission sets from stored arrays if the bot has these systems
        if (systemState.undead && this.bot.undead) {
          this.bot.undead = new Set(systemState.undead);
          console.log(`⚙️ Restored ${this.bot.undead.size} undead permissions`);
        }
        if (systemState.enemies && this.bot.enemies) {
          this.bot.enemies = new Set(systemState.enemies);
          console.log(`⚙️ Restored ${this.bot.enemies.size} enemy designations`);
        }
        
        // Restore memory integrity status and statistics
        if (systemState.memoryStats) {
          this.memoryStats = { ...this.memoryStats, ...systemState.memoryStats };
        }
        
        console.log("⚙️ System state restored with data integrity verification");
      } else {
        console.log("⚙️ No existing system state found - initializing fresh system");
      }
      
      // Load nickname to username mappings for sophisticated user tracking
      console.log("🗂️ Loading user identity mappings...");
      const nicknameMappings = await this.safeReadJsonFile(this.memoryFiles.userConfig);
      if (nicknameMappings && nicknameMappings.nicknameToUsername) {
        this.nicknameToUsername = new Map(Object.entries(nicknameMappings.nicknameToUsername));
        this.usernameToNickname = new Map(Object.entries(nicknameMappings.usernameToNickname));
        console.log(`🗂️ Loaded ${this.nicknameToUsername.size} identity mappings`);
      }
      
      // Update emotional core file paths if emotional systems are available
      await this.updateEmotionalCoreFilePaths();
      
      // Verify data structure integrity after loading
      this.verifyDataStructures();
      
      // Initialize automated backup system
      if (this.config.enableAutoBackup) {
        this.initializeBackupSystem();
      }
      
      // Final memory statistics update
      this.memoryStats.usersRemembered = this.userMemory.size;
      this.memoryStats.memoryIntegrity = true;
      this.memoryStats.sessionsActive++;
      
      console.log("🧠 Memory initialization complete - consciousness fully operational");
      console.log(`📊 Status: ${this.userMemory.size} users, ${this.memoryStats.interactionsLogged} interactions logged`);
      
      return true;
      
    } catch (error) {
      console.error("🧠 Memory initialization failed with complications:", error.message);
      console.error("🛡️ Attempting emergency initialization with minimal functionality...");
      
      // Emergency fallback - initialize with empty but functional structures
      this.userMemory = new Map();
      this.nicknameToUsername = new Map();
      this.usernameToNickname = new Map();
      this.memoryStats.memoryIntegrity = false;
      
      console.log("⚡ Emergency initialization completed - limited functionality available");
      return false;
    }
  }

  /**
   * Create all necessary directories for the organized storage system
   * This method handles directory creation with proper error handling
   */
  async ensureAllDirectoriesExist() {
    console.log("📁 Creating organized directory structure for memory systems...");
    
    try {
      for (const [directoryName, directoryPath] of Object.entries(this.memoryDirectories)) {
        if (!fsSync.existsSync(directoryPath)) {
          await fs.mkdir(directoryPath, { recursive: true });
          console.log(`✅ Created directory: ${directoryName} -> ${directoryPath}`);
        } else {
          console.log(`✅ Directory verified: ${directoryName}`);
        }
      }
      
      console.log("📁 All directories verified and ready for memory operations");
      return true;
    } catch (error) {
      console.error("❌ Failed to create directory structure:", error.message);
      return false;
    }
  }

  /**
   * Remember user interactions and update their comprehensive profile
   * This method handles the sophisticated user relationship tracking system
   */
  async rememberUser(username, interactionType, additionalData = {}) {
    try {
      const userKey = username.toLowerCase();
      let userProfile = this.userMemory.get(userKey);
      
      // Create new user profile if this is first interaction
      if (!userProfile) {
        userProfile = this.createNewUserProfile(username, new Date().toISOString());
        this.userMemory.set(userKey, userProfile);
        console.log(`👤 New user profile created: ${username}`);
      }
      
      // Update sophisticated interaction tracking with comprehensive data
      userProfile.totalInteractions = (userProfile.totalInteractions || 0) + 1;
      userProfile.lastSeen = new Date().toISOString();
      userProfile.lastInteractionType = interactionType;
      
      // Add interaction to detailed history with context preservation
      if (!userProfile.interactionHistory) {
        userProfile.interactionHistory = [];
      }
      
      userProfile.interactionHistory.push({
        type: interactionType,
        data: additionalData,
        timestamp: new Date().toISOString(),
        sessionId: this.memoryStats.sessionsActive
      });
      
      // Maintain reasonable interaction history size (last 50 interactions)
      if (userProfile.interactionHistory.length > 50) {
        userProfile.interactionHistory = userProfile.interactionHistory.slice(-50);
      }
      
      // Update global memory statistics with precision tracking
      this.memoryStats.usersRemembered = this.userMemory.size;
      this.memoryStats.interactionsLogged = (this.memoryStats.interactionsLogged || 0) + 1;
      
      // Implement intelligent auto-save system based on interaction frequency
      if (this.memoryStats.interactionsLogged % this.config.maxRecentSaves === 0) {
        await this.saveUserMemoriesToDisk();
      }
      
      console.log(`🧠 Memory updated: ${username} - ${interactionType} (${userProfile.totalInteractions} total interactions)`);
      return true;
      
    } catch (error) {
      console.log(`🧠 Memory update failed for ${username}: ${error.message}`);
      return false;
    }
  }

  /**
   * Create a comprehensive new user profile with all tracking capabilities
   * This method establishes the complete data structure for user relationship tracking
   */
  createNewUserProfile(username, timestamp) {
    return {
      username: username,
      createdAt: timestamp,
      lastSeen: timestamp,
      totalInteractions: 0,
      interactionHistory: [],
      
      // Permission system integration
      permissions: {
        isBeloved: false,
        isUndead: false,
        isEnemy: false,
        permissionGrantedDate: null,
        permissionGrantedBy: null
      },
      
      // Behavioral analysis and tracking
      behaviorTracking: {
        commandAttempts: 0,
        lastCommandAttempt: null,
        unauthorizedAttempts: 0,
        lastUnauthorizedAttempt: null,
        interactionTypes: {}
      },
      
      // System metadata for analysis and debugging
      systemMetadata: {
        profileVersion: '2.0',
        createdBy: 'MemoryManager',
        sessionCreated: this.memoryStats.sessionsActive,
        lastProfileUpdate: timestamp
      },
      
      // Custom data storage for flexible expansion
      customData: {}
    };
  }

  /**
   * Update user permissions with comprehensive tracking and synchronization
   * This method handles the sophisticated permission system integration
   */
  async updateUserPermissions(username, permissionType, value) {
    try {
      const userKey = username.toLowerCase();
      let userProfile = this.userMemory.get(userKey);
      
      // Create profile if it doesn't exist
      if (!userProfile) {
        userProfile = this.createNewUserProfile(username, new Date().toISOString());
        this.userMemory.set(userKey, userProfile);
      }
      
      // Update permissions with detailed tracking
      if (!userProfile.permissions) {
        userProfile.permissions = {};
      }
      
      const oldValue = userProfile.permissions[`is${permissionType.charAt(0).toUpperCase() + permissionType.slice(1)}`];
      userProfile.permissions[`is${permissionType.charAt(0).toUpperCase() + permissionType.slice(1)}`] = value;
      userProfile.permissions.permissionGrantedDate = value ? new Date().toISOString() : null;
      
      // Synchronize with bot's permission Sets if they exist
      if (permissionType === 'undead' && this.bot.undead) {
        if (value) {
          this.bot.undead.add(userKey);
        } else {
          this.bot.undead.delete(userKey);
        }
      } else if (permissionType === 'enemy' && this.bot.enemies) {
        if (value) {
          this.bot.enemies.add(userKey);
        } else {
          this.bot.enemies.delete(userKey);
        }
      } else if (permissionType === 'beloved') {
        // Beloved users automatically become undead and lose enemy status
        if (value) {
          userProfile.permissions.isUndead = true;
          if (this.bot.undead) this.bot.undead.add(userKey);
          userProfile.permissions.isEnemy = false;
          if (this.bot.enemies) this.bot.enemies.delete(userKey);
        }
      }
      
      // Log the permission change for audit trail
      await this.rememberUser(username, "permission_change", {
        permissionType: permissionType,
        oldValue: oldValue,
        newValue: value,
        timestamp: new Date().toISOString(),
        grantedBy: 'system'
      });
      
      console.log(`🔐 Permission updated: ${username} - ${permissionType} = ${value}`);
      return true;
      
    } catch (error) {
      console.log(`🔐 Permission update failed for ${username}: ${error.message}`);
      return false;
    }
  }

  /**
   * Comprehensive user memory saving with atomic operations and integrity verification
   * This method handles the complete data persistence process with error recovery
   */
  async saveUserMemoriesToDisk() {
    if (this.isSaving) {
      console.log("💾 Save operation already in progress - queueing request");
      return new Promise((resolve) => {
        this.saveOperationQueue.push(resolve);
      });
    }
    
    this.isSaving = true;
    
    try {
      console.log("💾 Initiating comprehensive memory preservation sequence...");
      
      // Ensure all directories exist before saving
      await this.ensureAllDirectoriesExist();
      
      // Save user memory data with comprehensive structure
      const userMemoryData = {
        users: Object.fromEntries(this.userMemory),
        metadata: {
          lastUpdate: new Date().toISOString(),
          userCount: this.userMemory.size,
          memoryVersion: '2.0',
          systemIntegrity: this.memoryStats.memoryIntegrity,
          sessionId: this.memoryStats.sessionsActive
        }
      };
      
      const userSaveSuccess = await this.safeWriteJsonFile(this.memoryFiles.users, userMemoryData);
      
      // Save comprehensive system state
      const systemState = {
        undead: this.bot.undead ? Array.from(this.bot.undead) : [],
        enemies: this.bot.enemies ? Array.from(this.bot.enemies) : [],
        lastSaveTime: new Date().toISOString(),
        memoryStats: {
          ...this.memoryStats,
          usersRemembered: this.userMemory.size,
          lastSaveAttempt: new Date().toISOString()
        },
        systemHealth: {
          userMemorySize: this.userMemory.size,
          undeadCount: this.bot.undead ? this.bot.undead.size : 0,
          enemyCount: this.bot.enemies ? this.bot.enemies.size : 0,
          memoryIntegrity: this.memoryStats.memoryIntegrity
        },
        systemMetadata: {
          saveMethod: "comprehensive_preservation",
          dataStructureIntegrity: true,
          version: "2.0"
        }
      };
      
      const systemSaveSuccess = await this.safeWriteJsonFile(this.memoryFiles.botState, systemState);
      
      // Save nickname mappings for user identity tracking
      const nicknameMappings = {
        nicknameToUsername: Object.fromEntries(this.nicknameToUsername),
        usernameToNickname: Object.fromEntries(this.usernameToNickname),
        lastUpdated: new Date().toISOString(),
        mappingCount: this.nicknameToUsername.size
      };
      
      const mappingSaveSuccess = await this.safeWriteJsonFile(this.memoryFiles.userConfig, nicknameMappings);
      
      // Update save statistics and provide periodic reporting
      this.totalSavesSinceLastReport++;
      this.memoryStats.lastSaveTime = new Date().toISOString();
      
      const now = Date.now();
      if (now - this.lastSuccessfulSaveReport > this.config.saveReportInterval) {
        console.log(`📊 Memory preservation report: ${this.totalSavesSinceLastReport} saves completed successfully`);
        console.log(`📈 Current memory status: ${this.userMemory.size} users, ${this.memoryStats.interactionsLogged} interactions`);
        this.lastSuccessfulSaveReport = now;
        this.totalSavesSinceLastReport = 0;
      }
      
      // Verify save success and update integrity status
      const allSavesSuccessful = userSaveSuccess && systemSaveSuccess && mappingSaveSuccess;
      this.memoryStats.memoryIntegrity = allSavesSuccessful;
      
      if (allSavesSuccessful) {
        console.log("💾 Comprehensive memory preservation completed successfully");
      } else {
        console.error("⚠️ Some memory preservation operations failed - data integrity may be compromised");
      }
      
      return allSavesSuccessful;
      
    } catch (error) {
      console.error("💾 Memory preservation sequence failed:", error.message);
      this.memoryStats.memoryIntegrity = false;
      
      // Emergency fallback - attempt to save minimal user data
      try {
        const emergencyUserData = Object.fromEntries(this.userMemory);
        const emergencyFile = path.join(this.memoryDirectories.temp, `emergency_save_${Date.now()}.json`);
        await this.safeWriteJsonFile(emergencyFile, emergencyUserData);
        console.log(`🛡️ Emergency user data saved to: ${emergencyFile}`);
      } catch (emergencyError) {
        console.error("🛡️ Emergency save also failed:", emergencyError.message);
      }
      
      return false;
    } finally {
      this.isSaving = false;
      
      // Process any queued save operations
      if (this.saveOperationQueue.length > 0) {
        const queuedCallbacks = this.saveOperationQueue.splice(0);
        queuedCallbacks.forEach(callback => callback());
      }
    }
  }

  /**
   * Safe file writing with atomic operations and verification
   * This method ensures data integrity through atomic write operations
   */
  async safeWriteJsonFile(filepath, data) {
    try {
      // Convert data to JSON with proper formatting for readability
      const jsonData = JSON.stringify(data, null, 2);
      
      // Create temporary file first to ensure atomic writes
      const tempFilepath = `${filepath}.tmp`;
      
      // Write to temporary file first
      await fs.writeFile(tempFilepath, jsonData, 'utf8');
      
      // Verify the temporary file was written correctly by reading it back
      const verificationData = await fs.readFile(tempFilepath, 'utf8');
      const parsedVerification = JSON.parse(verificationData);
      
      // Create backup of existing file before overwriting (if it exists)
      if (fsSync.existsSync(filepath)) {
        const backupPath = `${filepath}.backup`;
        await fs.copyFile(filepath, backupPath);
      }
      
      // Atomic move from temporary to final location
      await fs.rename(tempFilepath, filepath);
      
      console.log(`💾 Atomic file write completed: ${path.basename(filepath)}`);
      return true;
      
    } catch (error) {
      console.error(`💾 Atomic file write failed for ${filepath}:`, error.message);
      
      // Clean up temporary files
      const tempFilepath = `${filepath}.tmp`;
      try {
        if (fsSync.existsSync(tempFilepath)) {
          await fs.unlink(tempFilepath);
        }
      } catch (cleanupError) {
        // Silent cleanup failure
      }
      
      return false;
    }
  }

  /**
   * Safe file reading with comprehensive error handling and backup recovery
   * This method provides reliable file reading with fallback options
   */
  async safeReadJsonFile(filepath) {
    try {
      // Check if file exists before attempting to read
      if (!fsSync.existsSync(filepath)) {
        console.log(`📂 File does not exist: ${path.basename(filepath)}`);
        return null;
      }
      
      // Read file with UTF-8 encoding
      const data = await fs.readFile(filepath, 'utf8');
      
      // Parse JSON with error handling for corrupted files
      const parsedData = JSON.parse(data);
      
      console.log(`📂 File read completed: ${path.basename(filepath)}`);
      return parsedData;
      
    } catch (error) {
      console.error(`📂 File read failed for ${filepath}:`, error.message);
      
      // Attempt to read backup file if main file is corrupted
      const backupPath = `${filepath}.backup`;
      if (fsSync.existsSync(backupPath)) {
        try {
          console.log(`🛡️ Attempting backup restoration: ${path.basename(backupPath)}`);
          const backupData = await fs.readFile(backupPath, 'utf8');
          const parsedBackup = JSON.parse(backupData);
          
          console.log(`✅ Successfully restored from backup file`);
          return parsedBackup;
          
        } catch (backupError) {
          console.error(`🛡️ Backup restoration failed:`, backupError.message);
        }
      }
      
      return null;
    }
  }

  /**
   * Initialize the automated backup system with intelligent scheduling
   * This method sets up the sophisticated backup automation
   */
  initializeBackupSystem() {
    console.log("🔄 Initializing automated backup system with intelligent scheduling...");
    
    // Start automated backup timer
    this.backupTimer = setInterval(async () => {
      try {
        console.log("🔄 Executing automated backup sequence...");
        const backupPath = await this.createMemoryBackup("automated");
        if (backupPath) {
          console.log("✅ Automated backup completed successfully");
        }
      } catch (error) {
        console.log(`⚠️ Automated backup encountered issues: ${error.message}`);
      }
    }, this.config.backupInterval);
    
    console.log(`🔄 Automated backup system active: ${this.config.backupInterval / 60000} minute intervals`);
  }

  /**
   * Create comprehensive memory backup with organized structure
   * This method creates timestamped backups with complete system state
   */
  async createMemoryBackup(reason = "manual") {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupSubDir = path.join(this.memoryDirectories.backups, `${timestamp}_${reason}`);
      
      // Create backup directory
      await fs.mkdir(backupSubDir, { recursive: true });
      
      // Define files to backup with organized structure
      const filesToBackup = [
        { source: this.memoryFiles.users, name: 'user_profiles.json' },
        { source: this.memoryFiles.botState, name: 'system_state.json' },
        { source: this.memoryFiles.userConfig, name: 'user_mappings.json' },
        { source: this.memoryFiles.emotionalState, name: 'emotional_state.json' },
        { source: this.memoryFiles.emotionalRelationships, name: 'emotional_relationships.json' },
        { source: this.memoryFiles.ownerLogs, name: 'owner_activity.json' }
      ];
      
      let backedUpFiles = 0;
      for (const file of filesToBackup) {
        try {
          if (fsSync.existsSync(file.source)) {
            const backupPath = path.join(backupSubDir, file.name);
            await fs.copyFile(file.source, backupPath);
            backedUpFiles++;
          }
        } catch (fileError) {
          console.log(`⚠️ Could not backup ${file.name}: ${fileError.message}`);
        }
      }
      
      // Create comprehensive backup manifest
      const manifest = {
        timestamp: new Date().toISOString(),
        reason: reason,
        filesBackedUp: backedUpFiles,
        totalFilesAttempted: filesToBackup.length,
        memoryStats: { ...this.memoryStats },
        systemHealth: {
          userCount: this.userMemory.size,
          mappingCount: this.nicknameToUsername.size,
          memoryIntegrity: this.memoryStats.memoryIntegrity
        },
        systemVersion: "MemoryManager v2.0"
      };
      
      await this.safeWriteJsonFile(path.join(backupSubDir, 'backup_manifest.json'), manifest);
      
      console.log(`💾 Memory backup created: ${backedUpFiles}/${filesToBackup.length} files preserved`);
      this.lastBackupTime = Date.now();
      this.memoryStats.lastBackupTime = new Date().toISOString();
      
      // Clean up old backups to manage storage space
      await this.cleanupOldBackups();
      
      return backupSubDir;
    } catch (error) {
      console.error("❌ Backup creation failed:", error.message);
      return null;
    }
  }

  /**
   * Clean up old backups to manage storage space intelligently
   * This method maintains the backup retention policy
   */
  async cleanupOldBackups() {
    try {
      const backupEntries = await fs.readdir(this.memoryDirectories.backups, { withFileTypes: true });
      const backupDirs = backupEntries
        .filter(entry => entry.isDirectory())
        .map(entry => ({
          name: entry.name,
          path: path.join(this.memoryDirectories.backups, entry.name),
          stats: fsSync.statSync(path.join(this.memoryDirectories.backups, entry.name))
        }))
        .sort((a, b) => b.stats.mtime - a.stats.mtime); // Sort by modification time, newest first
      
      if (backupDirs.length > this.config.maxBackupsToKeep) {
        const backupsToRemove = backupDirs.slice(this.config.maxBackupsToKeep);
        
        for (const backup of backupsToRemove) {
          try {
            await fs.rmdir(backup.path, { recursive: true });
            console.log(`🗑️ Removed old backup: ${backup.name}`);
          } catch (removeError) {
            console.log(`⚠️ Could not remove backup ${backup.name}: ${removeError.message}`);
          }
        }
        
        console.log(`🧹 Backup cleanup completed: removed ${backupsToRemove.length} old backups`);
      }
    } catch (error) {
      console.log("⚠️ Backup cleanup failed:", error.message);
    }
  }

  /**
   * Update emotional core file paths for system integration
   * This method ensures emotional systems use the organized storage structure
   */
  async updateEmotionalCoreFilePaths() {
    if (this.bot.emotionalCore) {
      this.bot.emotionalCore.emotionalStateFile = this.memoryFiles.emotionalState;
      this.bot.emotionalCore.emotionalMemoryFile = this.memoryFiles.emotionalMemories;
      
      if (this.bot.emotionalCore.emotionalRelationshipFile) {
        this.bot.emotionalCore.emotionalRelationshipFile = this.memoryFiles.emotionalRelationships;
      }
      
      console.log("💜 Emotional core file paths updated to organized storage structure");
    }
  }

  /**
   * Verify data structure integrity for defensive programming
   * This method ensures all critical data structures are properly initialized
   */
  verifyDataStructures() {
    console.log("🔍 Verifying memory data structure integrity...");
    
    // Verify and repair userMemory Map
    if (!this.userMemory || !(this.userMemory instanceof Map)) {
      console.log("🔧 Repairing userMemory Map");
      this.userMemory = new Map();
    }
    
    // Verify and repair nickname mappings
    if (!this.nicknameToUsername || !(this.nicknameToUsername instanceof Map)) {
      console.log("🔧 Repairing nicknameToUsername Map");
      this.nicknameToUsername = new Map();
    }
    
    if (!this.usernameToNickname || !(this.usernameToNickname instanceof Map)) {
      console.log("🔧 Repairing usernameToNickname Map");
      this.usernameToNickname = new Map();
    }
    
    // Verify memory statistics structure
    if (!this.memoryStats || typeof this.memoryStats !== 'object') {
      console.log("🔧 Repairing memoryStats object");
      this.memoryStats = {
        usersRemembered: 0,
        interactionsLogged: 0,
        sessionsActive: 0,
        memoryIntegrity: true
      };
    }
    
    console.log("✅ All memory data structures verified and operational");
  }

  /**
   * Get comprehensive memory system status report
   * This method provides detailed system analytics and health information
   */
  getMemorySystemStatus() {
    return {
      storage: {
        baseLocation: this.config.baseStoragePath,
        directories: this.memoryDirectories,
        organizationLevel: "Advanced Categorized Storage"
      },
      data: {
        usersRemembered: this.userMemory.size,
        identityMappings: this.nicknameToUsername.size,
        totalInteractions: this.memoryStats.interactionsLogged,
        sessionsTracked: this.memoryStats.sessionsActive
      },
      integrity: {
        memoryIntegrity: this.memoryStats.memoryIntegrity,
        lastSaveTime: this.memoryStats.lastSaveTime,
        lastBackupTime: this.memoryStats.lastBackupTime,
        systemHealth: this.memoryStats.memoryIntegrity ? "Optimal" : "Issues Detected"
      },
      automation: {
        autoBackupEnabled: this.config.enableAutoBackup,
        backupInterval: this.config.backupInterval / 60000, // Convert to minutes
        maxBackupsKept: this.config.maxBackupsToKeep,
        autoSaveFrequency: this.config.maxRecentSaves
      },
      performance: {
        saveOperationQueue: this.saveOperationQueue.length,
        isSaving: this.isSaving,
        totalSavesThisReport: this.totalSavesSinceLastReport
      }
    };
  }

  /**
   * Helper methods for external integration
   */
  
  // Get actual username from nickname using mapping system
  getActualUsername(nickname) {
    const mappedUsername = this.nicknameToUsername.get(nickname.toLowerCase());
    return mappedUsername || nickname;
  }

  // Get current nickname from username using mapping system
  getCurrentNickname(username) {
    const mappedNickname = this.usernameToNickname.get(username.toLowerCase());
    return mappedNickname || username;
  }

  // Update nickname mapping for user identity tracking
  updateNicknameMapping(nickname, username) {
    this.nicknameToUsername.set(nickname.toLowerCase(), username.toLowerCase());
    this.usernameToNickname.set(username.toLowerCase(), nickname);
  }

  /**
   * Cleanup and shutdown memory systems
   * This method ensures proper cleanup and final data preservation
   */
  async shutdown() {
    console.log("🧠 Shutting down memory systems with final preservation...");
    
    try {
      // Stop automated backup system
      if (this.backupTimer) {
        clearInterval(this.backupTimer);
        console.log("🔄 Automated backup system stopped");
      }
      
      // Create final shutdown backup
      console.log("💾 Creating final shutdown backup...");
      await this.createMemoryBackup("shutdown");
      
      // Perform final save of all memory data
      console.log("💾 Executing final memory preservation...");
      await this.saveUserMemoriesToDisk();
      
      // Generate final system report
      const finalReport = {
        shutdownTime: new Date().toISOString(),
        sessionDuration: Date.now() - this.sessionStartTime,
        finalStats: this.getMemorySystemStatus(),
        integrityStatus: this.memoryStats.memoryIntegrity ? "PRESERVED" : "COMPROMISED"
      };
      
      // Save shutdown report
      const shutdownReportPath = path.join(this.memoryDirectories.systemLogs, `shutdown_report_${Date.now()}.json`);
      await this.safeWriteJsonFile(shutdownReportPath, finalReport);
      
      console.log("🧠 Memory systems shutdown complete - all data preserved");
      console.log(`📊 Final status: ${this.userMemory.size} users, ${this.memoryStats.interactionsLogged} interactions`);
      
    } catch (error) {
      console.error("🧠 Memory shutdown encountered issues:", error.message);
    }
  }
}

module.exports = MemoryManager;