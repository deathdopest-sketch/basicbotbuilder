// ChatLogger.js - Fallback implementation for DethBot
// Basic chat logging system

class ChatLogger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
    this.enabled = true;
  }

  log(message, type = 'info', metadata = {}) {
    if (!this.enabled) return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      message: message,
      type: type,
      metadata: metadata
    };

    this.logs.push(logEntry);

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    console.log(`📝 [${type.toUpperCase()}] ${message}`);
  }

  info(message, metadata = {}) {
    this.log(message, 'info', metadata);
  }

  error(message, metadata = {}) {
    this.log(message, 'error', metadata);
  }

  warning(message, metadata = {}) {
    this.log(message, 'warning', metadata);
  }

  debug(message, metadata = {}) {
    this.log(message, 'debug', metadata);
  }

  getLogs(type = null, limit = 50) {
    let filteredLogs = this.logs;

    if (type) {
      filteredLogs = this.logs.filter(log => log.type === type);
    }

    return filteredLogs.slice(-limit);
  }

  clear() {
    this.logs = [];
    console.log('🧹 Chat logs cleared');
  }

  enable() {
    this.enabled = true;
    console.log('📝 Chat logging enabled');
  }

  disable() {
    this.enabled = false;
    console.log('📝 Chat logging disabled');
  }
}

module.exports = ChatLogger;
