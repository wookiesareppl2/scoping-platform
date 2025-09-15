// Enhanced logging utility with different log levels and formatting

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.logLevel = this.isDevelopment ? 'debug' : 'error';
    this.logs = [];
    this.maxLogs = 1000; // Keep last 1000 logs in memory
  }

  // Log levels
  static LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };

  // Get numeric level
  getLevelNumber(level) {
    return Logger.LEVELS[level.toUpperCase()] || Logger.LEVELS.INFO;
  }

  // Check if should log based on level
  shouldLog(level) {
    return this.getLevelNumber(level) >= this.getLevelNumber(this.logLevel);
  }

  // Format log message with timestamp and context
  formatMessage(level, message, context = {}) {
    const timestamp = new Date().toISOString();
    const prefix = this.getLogPrefix(level);
    
    let formattedMessage = `${prefix} [${timestamp}] ${message}`;
    
    if (Object.keys(context).length > 0) {
      formattedMessage += ` | Context: ${JSON.stringify(context)}`;
    }
    
    return formattedMessage;
  }

  // Get colored prefix for different log levels
  getLogPrefix(level) {
    const prefixes = {
      debug: '🔍 DEBUG',
      info: '📝 INFO',
      warn: '⚠️ WARN',
      error: '❌ ERROR'
    };
    return prefixes[level.toLowerCase()] || '📝 LOG';
  }

  // Store log in memory
  storeLog(level, message, context, error) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      context,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : null,
      url: typeof window !== 'undefined' ? window.location.href : null,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
    };

    this.logs.push(logEntry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  // Debug level logging
  debug(message, context = {}) {
    if (!this.shouldLog('debug')) return;
    
    this.storeLog('debug', message, context);
    
    if (this.isDevelopment) {
      console.log(this.formatMessage('debug', message, context));
    }
  }

  // Info level logging
  info(message, context = {}) {
    if (!this.shouldLog('info')) return;
    
    this.storeLog('info', message, context);
    console.info(this.formatMessage('info', message, context));
  }

  // Warning level logging
  warn(message, context = {}) {
    if (!this.shouldLog('warn')) return;
    
    this.storeLog('warn', message, context);
    console.warn(this.formatMessage('warn', message, context));
  }

  // Error level logging
  error(message, error = null, context = {}) {
    if (!this.shouldLog('error')) return;
    
    this.storeLog('error', message, context, error);
    
    const formattedMessage = this.formatMessage('error', message, context);
    console.error(formattedMessage);
    
    if (error) {
      console.error('Error details:', error);
    }
  }

  // API call logging
  apiCall(method, url, data = null, response = null, error = null) {
    const context = {
      method,
      url,
      requestData: data,
      responseData: response,
      timestamp: Date.now()
    };

    if (error) {
      this.error(`API call failed: ${method} ${url}`, error, context);
    } else {
      this.info(`API call successful: ${method} ${url}`, context);
    }
  }

  // Form interaction logging
  formInteraction(action, formId, fieldId = null, value = null) {
    const context = {
      action,
      formId,
      fieldId,
      value: typeof value === 'string' && value.length > 100 ? 
        value.substring(0, 100) + '...' : value,
      timestamp: Date.now()
    };

    this.debug(`Form interaction: ${action}`, context);
  }

  // User action logging
  userAction(action, details = {}) {
    const context = {
      action,
      ...details,
      timestamp: Date.now(),
      page: typeof window !== 'undefined' ? window.location.pathname : null
    };

    this.info(`User action: ${action}`, context);
  }

  // Performance logging
  performance(metric, value, unit = 'ms') {
    const context = {
      metric,
      value,
      unit,
      timestamp: Date.now()
    };

    if (value > 1000 && unit === 'ms') {
      this.warn(`Slow performance detected: ${metric}`, context);
    } else {
      this.debug(`Performance metric: ${metric}`, context);
    }
  }

  // Security event logging
  security(event, details = {}) {
    const context = {
      event,
      ...details,
      timestamp: Date.now(),
      ip: this.getClientIP(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null
    };

    this.warn(`Security event: ${event}`, context);
  }

  // Get client IP (best effort)
  getClientIP() {
    // This is a placeholder - in a real app you'd get this from the server
    return 'client-ip-not-available';
  }

  // Get all logs
  getLogs(level = null, limit = null) {
    let filteredLogs = this.logs;
    
    if (level) {
      filteredLogs = this.logs.filter(log => 
        log.level.toLowerCase() === level.toLowerCase()
      );
    }
    
    if (limit) {
      filteredLogs = filteredLogs.slice(-limit);
    }
    
    return filteredLogs;
  }

  // Export logs as JSON
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear all logs
  clearLogs() {
    this.logs = [];
    this.info('Logs cleared');
  }

  // Set log level
  setLogLevel(level) {
    this.logLevel = level.toLowerCase();
    this.info(`Log level set to: ${level}`);
  }

  // Get log statistics
  getStats() {
    const stats = {
      total: this.logs.length,
      byLevel: {},
      timeRange: null
    };

    // Count by level
    this.logs.forEach(log => {
      stats.byLevel[log.level] = (stats.byLevel[log.level] || 0) + 1;
    });

    // Time range
    if (this.logs.length > 0) {
      const timestamps = this.logs.map(log => new Date(log.timestamp));
      stats.timeRange = {
        start: new Date(Math.min(...timestamps)).toISOString(),
        end: new Date(Math.max(...timestamps)).toISOString()
      };
    }

    return stats;
  }
}

// Create singleton instance
const logger = new Logger();

// React hook for logging
export const useLogger = () => {
  return {
    debug: (message, context) => logger.debug(message, context),
    info: (message, context) => logger.info(message, context),
    warn: (message, context) => logger.warn(message, context),
    error: (message, error, context) => logger.error(message, error, context),
    apiCall: (method, url, data, response, error) => logger.apiCall(method, url, data, response, error),
    formInteraction: (action, formId, fieldId, value) => logger.formInteraction(action, formId, fieldId, value),
    userAction: (action, details) => logger.userAction(action, details),
    performance: (metric, value, unit) => logger.performance(metric, value, unit),
    security: (event, details) => logger.security(event, details)
  };
};

// Convenience functions for direct use
export const debug = (message, context) => logger.debug(message, context);
export const info = (message, context) => logger.info(message, context);
export const warn = (message, context) => logger.warn(message, context);
export const error = (message, err, context) => logger.error(message, err, context);
export const apiCall = (method, url, data, response, err) => logger.apiCall(method, url, data, response, err);
export const formInteraction = (action, formId, fieldId, value) => logger.formInteraction(action, formId, fieldId, value);
export const userAction = (action, details) => logger.userAction(action, details);
export const performance = (metric, value, unit) => logger.performance(metric, value, unit);
export const security = (event, details) => logger.security(event, details);

export default logger;