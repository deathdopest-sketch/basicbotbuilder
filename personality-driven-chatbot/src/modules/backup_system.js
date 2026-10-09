// BackupSystem.js - Automated Backup and Recovery
// Handles automated backup creation, rotation, and recovery operations for bot data

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

class BackupSystem {
  constructor(bot) {
    this.bot = bot;
    this.backupSettings = {
      enableAutoBackup: true,
      backupInterval: 30 * 60 * 1000, // 30 minutes
      maxBackupsToKeep: 48, // Keep 48 backups (24 hours worth)
      lastBackupTime: 0,
      compressionEnabled: false, // Could be implemented later
      integrityChecksEnabled: true
    };

    // Backup categories and their priorities
    this.backupCategories = {
      critical: {
        priority: 1,
        files: [
          'users.json',
          'emotionalState.json',
          'botState.json'
        ],
        description: 'Essential bot functionality data'
      },
      important: {
        priority: 2,
        files: [
          'interactions.json',
          'emotionalRelationships.json',
          'emotionalMemories.json'
        ],
        description: 'User relationships and interaction history'
      },
      supplementary: {
        priority: 3,
        files: [
          'ownerLogs.json',
          'systemConfig.json',
          'userConfig.json'
        ],
        description: 'System logs and configuration data'
      }
    };

    // Recovery options
    this.recoverySettings = {
      autoRecoveryEnabled: true,
      corruptionDetectionEnabled: true,
      fallbackToLastKnownGood: true,
      maxRecoveryAttempts: 3
    };

    this.backupStats = {
      totalBackupsCreated: 0,
      lastBackupSize: 0,
      lastBackupDuration: 0,
      successfulBackups: 0,
      failedBackups: 0,
      averageBackupSize: 0,
      oldestBackupDate: null,
      newestBackupDate: null
    };
  }

  // === BACKUP CREATION ===
  async createMemoryBackup(reason = "automatic", priority = "normal") {
    const startTime = Date.now();
    console.log(`💾 Creating ${reason} backup (priority: ${priority})...`);

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupSubDir = `${this.bot.memoryDirectories.backups}\\${timestamp}_${reason}`;
      
      await fs.mkdir(backupSubDir, { recursive: true });
      
      const filesToBackup = this.getFilesToBackup(priority);
      let backedUpFiles = 0;
      let totalSize = 0;
      const backupResults = [];

      // Process files by priority
      for (const categoryName of Object.keys(this.backupCategories)) {
        const category = this.backupCategories[categoryName];
        
        for (const fileName of category.files) {
          const sourceFile = this.getSourceFilePath(fileName);
          if (!sourceFile) continue;

          try {
            if (fsSync.existsSync(sourceFile)) {
              const backupPath = `${backupSubDir}\\${fileName}`;
              const stats = fsSync.statSync(sourceFile);
              
              // Verify file integrity before backup
              if (this.backupSettings.integrityChecksEnabled) {
                const isValid = await this.verifyFileIntegrity(sourceFile, fileName);
                if (!isValid) {
                  console.log(`⚠️ Integrity check failed for ${fileName}, backing up anyway`);
                }
              }
              
              await fs.copyFile(sourceFile, backupPath);
              
              backedUpFiles++;
              totalSize += stats.size;
              
              backupResults.push({
                file: fileName,
                category: categoryName,
                size: stats.size,
                status: 'success'
              });
              
              console.log(`✅ Backed up ${fileName} (${this.formatFileSize(stats.size)})`);
            } else {
              backupResults.push({
                file: fileName,
                category: categoryName,
                size: 0,
                status: 'not_found'
              });
            }
          } catch (fileError) {
            console.log(`❌ Failed to backup ${fileName}: ${fileError.message}`);
            backupResults.push({
              file: fileName,
              category: categoryName,
              size: 0,
              status: 'error',
              error: fileError.message
            });
          }
        }
      }
      
      const backupDuration = Date.now() - startTime;
      
      // Create backup manifest with detailed information
      const manifest = await this.createBackupManifest(
        reason, 
        priority, 
        backedUpFiles, 
        totalSize, 
        backupDuration,
        backupResults
      );
      
      await this.safeWriteJsonFile(`${backupSubDir}\\backup_manifest.json`, manifest);
      
      // Update backup statistics
      this.updateBackupStats(backedUpFiles, totalSize, backupDuration, true);
      
      console.log(`💾 Backup completed: ${backedUpFiles} files (${this.formatFileSize(totalSize)}) in ${backupDuration}ms`);
      this.backupSettings.lastBackupTime = Date.now();
      
      // Cleanup old backups
      await this.cleanupOldBackups();
      
      return {
        success: true,
        path: backupSubDir,
        filesBackedUp: backedUpFiles,
        totalSize: totalSize,
        duration: backupDuration,
        manifest: manifest
      };
      
    } catch (error) {
      console.error("❌ Backup creation failed:", error.message);
      this.updateBackupStats(0, 0, Date.now() - startTime, false);
      
      return {
        success: false,
        error: error.message,
        duration: Date.now() - startTime
      };
    }
  }

  async createBackupManifest(reason, priority, filesBackedUp, totalSize, duration, results) {
    return {
      timestamp: new Date().toISOString(),
      reason: reason,
      priority: priority,
      filesBackedUp: filesBackedUp,
      totalSize: totalSize,
      backupDuration: duration,
      backupResults: results,
      memoryStats: this.bot.memoryStats ? { ...this.bot.memoryStats } : {},
      ownerStats: {
        bypassCount: this.bot.ownerBypassCount || 0,
        activeOwners: this.bot.lastOwnerActivity?.size || 0
      },
      systemInfo: {
        botVersion: "Multi-Room StumbleChat Bot",
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: process.memoryUsage()
      },
      integrityChecks: this.backupSettings.integrityChecksEnabled,
      backupSettings: { ...this.backupSettings }
    };
  }

  // === BACKUP MANAGEMENT ===
  getFilesToBackup(priority = "normal") {
    const allFiles = [];
    
    if (priority === "critical") {
      allFiles.push(...this.backupCategories.critical.files);
    } else if (priority === "important") {
      allFiles.push(...this.backupCategories.critical.files);
      allFiles.push(...this.backupCategories.important.files);
    } else { // normal or full
      for (const category of Object.values(this.backupCategories)) {
        allFiles.push(...category.files);
      }
    }
    
    return [...new Set(allFiles)]; // Remove duplicates
  }

  getSourceFilePath(fileName) {
    // Map backup file names to actual file paths
    const fileMapping = {
      'users.json': this.bot.memoryFiles?.users,
      'interactions.json': this.bot.memoryFiles?.interactions,
      'botState.json': this.bot.memoryFiles?.botState,
      'emotionalState.json': this.bot.memoryFiles?.emotionalState,
      'emotionalRelationships.json': this.bot.memoryFiles?.emotionalRelationships,
      'emotionalMemories.json': this.bot.memoryFiles?.emotionalMemories,
      'ownerLogs.json': this.bot.memoryFiles?.ownerLogs,
      'systemConfig.json': this.bot.memoryFiles?.systemConfig,
      'userConfig.json': this.bot.memoryFiles?.userConfig
    };

    return fileMapping[fileName] || null;
  }

  async cleanupOldBackups() {
    try {
      const backupDir = this.bot.memoryDirectories?.backups;
      if (!backupDir || !fsSync.existsSync(backupDir)) {
        return;
      }

      const backupEntries = await fs.readdir(backupDir, { withFileTypes: true });
      const backupDirs = backupEntries
        .filter(entry => entry.isDirectory())
        .map(entry => ({
          name: entry.name,
          path: `${backupDir}\\${entry.name}`,
          stats: fsSync.statSync(`${backupDir}\\${entry.name}`)
        }))
        .sort((a, b) => b.stats.mtime - a.stats.mtime); // Newest first
      
      // Update backup stats
      if (backupDirs.length > 0) {
        this.backupStats.oldestBackupDate = backupDirs[backupDirs.length - 1].stats.mtime;
        this.backupStats.newestBackupDate = backupDirs[0].stats.mtime;
      }

      if (backupDirs.length > this.backupSettings.maxBackupsToKeep) {
        const backupsToRemove = backupDirs.slice(this.backupSettings.maxBackupsToKeep);
        
        console.log(`🗑️ Cleaning up ${backupsToRemove.length} old backups...`);
        
        for (const backup of backupsToRemove) {
          try {
            await fs.rmdir(backup.path, { recursive: true });
            console.log(`🗑️ Removed old backup: ${backup.name}`);
          } catch (removeError) {
            console.log(`Warning: Could not remove backup ${backup.name}: ${removeError.message}`);
          }
        }
      }
    } catch (error) {
      console.log("Warning: Backup cleanup failed:", error.message);
    }
  }

  // === FILE INTEGRITY VERIFICATION ===
  async verifyFileIntegrity(filePath, fileName) {
    try {
      if (fileName.endsWith('.json')) {
        const content = await fs.readFile(filePath, 'utf8');
        JSON.parse(content); // Will throw if invalid JSON
        return content.length > 0;
      }
      
      // For non-JSON files, just check if readable
      const stats = fsSync.statSync(filePath);
      return stats.size > 0;
      
    } catch (error) {
      console.log(`Integrity check failed for ${fileName}: ${error.message}`);
      return false;
    }
  }

  // === RECOVERY OPERATIONS ===
  async listAvailableBackups() {
    try {
      const backupDir = this.bot.memoryDirectories?.backups;
      if (!backupDir || !fsSync.existsSync(backupDir)) {
        return [];
      }

      const backupEntries = await fs.readdir(backupDir, { withFileTypes: true });
      const backups = [];

      for (const entry of backupEntries) {
        if (entry.isDirectory()) {
          const backupPath = `${backupDir}\\${entry.name}`;
          const manifestPath = `${backupPath}\\backup_manifest.json`;
          
          try {
            let manifest = null;
            if (fsSync.existsSync(manifestPath)) {
              const manifestContent = await fs.readFile(manifestPath, 'utf8');
              manifest = JSON.parse(manifestContent);
            }
            
            const stats = fsSync.statSync(backupPath);
            
            backups.push({
              name: entry.name,
              path: backupPath,
              created: stats.mtime,
              manifest: manifest,
              size: manifest?.totalSize || 0,
              files: manifest?.filesBackedUp || 0
            });
          } catch (error) {
            console.log(`Warning: Could not read backup ${entry.name}: ${error.message}`);
          }
        }
      }

      return backups.sort((a, b) => b.created - a.created); // Newest first
      
    } catch (error) {
      console.error("Failed to list backups:", error.message);
      return [];
    }
  }

  async recoverFromBackup(backupName, selectedFiles = null) {
    try {
      console.log(`🔄 Starting recovery from backup: ${backupName}`);
      
      const backups = await this.listAvailableBackups();
      const targetBackup = backups.find(b => b.name === backupName);
      
      if (!targetBackup) {
        throw new Error(`Backup not found: ${backupName}`);
      }

      const backupPath = targetBackup.path;
      const filesToRecover = selectedFiles || this.getAllBackupFiles(backupPath);
      let recoveredFiles = 0;
      
      for (const fileName of filesToRecover) {
        const backupFilePath = `${backupPath}\\${fileName}`;
        const targetFilePath = this.getSourceFilePath(fileName);
        
        if (!targetFilePath) {
          console.log(`Warning: Unknown target for ${fileName}`);
          continue;
        }

        try {
          if (fsSync.existsSync(backupFilePath)) {
            // Verify backup file integrity before recovery
            const isValid = await this.verifyFileIntegrity(backupFilePath, fileName);
            if (!isValid && this.recoverySettings.corruptionDetectionEnabled) {
              console.log(`⚠️ Skipping corrupted backup file: ${fileName}`);
              continue;
            }

            // Create backup of current file before overwriting
            if (fsSync.existsSync(targetFilePath)) {
              const backupCurrentPath = `${targetFilePath}.recovery_backup`;
              await fs.copyFile(targetFilePath, backupCurrentPath);
            }

            await fs.copyFile(backupFilePath, targetFilePath);
            recoveredFiles++;
            console.log(`✅ Recovered: ${fileName}`);
          }
        } catch (fileError) {
          console.log(`❌ Failed to recover ${fileName}: ${fileError.message}`);
        }
      }

      console.log(`🔄 Recovery completed: ${recoveredFiles} files restored from ${backupName}`);
      
      return {
        success: true,
        filesRecovered: recoveredFiles,
        backupUsed: backupName,
        backupDate: targetBackup.created
      };
      
    } catch (error) {
      console.error("❌ Recovery failed:", error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  getAllBackupFiles(backupPath) {
    try {
      const files = fsSync.readdirSync(backupPath);
      return files.filter(file => file.endsWith('.json') && file !== 'backup_manifest.json');
    } catch (error) {
      console.log(`Warning: Could not read backup directory ${backupPath}: ${error.message}`);
      return [];
    }
  }

  // === AUTOMATIC BACKUP SCHEDULING ===
  shouldCreateAutomaticBackup() {
    if (!this.backupSettings.enableAutoBackup) {
      return false;
    }

    const timeSinceLastBackup = Date.now() - this.backupSettings.lastBackupTime;
    return timeSinceLastBackup >= this.backupSettings.backupInterval;
  }

  async checkAndCreateAutomaticBackup() {
    if (this.shouldCreateAutomaticBackup()) {
      console.log("⏰ Automatic backup triggered");
      return await this.createMemoryBackup("automatic", "normal");
    }
    return null;
  }

  // === STATISTICS AND UTILITIES ===
  updateBackupStats(files, size, duration, success) {
    this.backupStats.totalBackupsCreated++;
    this.backupStats.lastBackupSize = size;
    this.backupStats.lastBackupDuration = duration;
    
    if (success) {
      this.backupStats.successfulBackups++;
    } else {
      this.backupStats.failedBackups++;
    }
    
    // Calculate average backup size
    this.backupStats.averageBackupSize = 
      (this.backupStats.averageBackupSize + size) / Math.max(1, this.backupStats.successfulBackups);
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async safeWriteJsonFile(filePath, data) {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      await fs.writeFile(filePath, jsonString, 'utf8');
      return true;
    } catch (error) {
      console.error(`Failed to write ${filePath}:`, error.message);
      return false;
    }
  }

  // === SYSTEM STATUS ===
  getBackupSystemStatus() {
    return {
      enabled: this.backupSettings.enableAutoBackup,
      lastBackupTime: this.backupSettings.lastBackupTime,
      backupInterval: this.backupSettings.backupInterval,
      maxBackupsToKeep: this.backupSettings.maxBackupsToKeep,
      stats: { ...this.backupStats },
      settings: { ...this.backupSettings },
      nextBackupDue: this.backupSettings.lastBackupTime + this.backupSettings.backupInterval,
      systemHealth: this.getSystemHealth()
    };
  }

  getSystemHealth() {
    const successRate = this.backupStats.totalBackupsCreated > 0 ? 
      (this.backupStats.successfulBackups / this.backupStats.totalBackupsCreated) * 100 : 100;
    
    if (successRate >= 95) return "Excellent";
    if (successRate >= 85) return "Good";
    if (successRate >= 70) return "Fair";
    return "Poor";
  }

  // === INITIALIZATION ===
  initialize() {
    console.log("💾 Initializing automated backup system...");
    
    // Reset stats for new session
    this.backupStats.totalBackupsCreated = 0;
    this.backupStats.successfulBackups = 0;
    this.backupStats.failedBackups = 0;
    
    console.log("💾 Backup system ready");
    console.log(`📅 Auto-backup interval: ${this.backupSettings.backupInterval / 60000} minutes`);
    console.log(`📦 Max backups to keep: ${this.backupSettings.maxBackupsToKeep}`);
    
    return true;
  }
}

module.exports = BackupSystem;