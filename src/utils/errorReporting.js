// Error reporting and monitoring utility

import logger from './logger.js';
import { getConfig } from './environment.js';

class ErrorReporter {
  constructor() {
    this.config = getConfig();
    this.errorQueue = [];
    this.isOnline = navigator.onLine;
    this.maxQueueSize = 100;
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushErrorQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Report JavaScript errors
  reportError(error, context = {}) {
    const errorReport = {
      timestamp: new Date().toISOString(),
      type: 'javascript_error',
      message: error.message,
      stack: error.stack,
      name: error.name,
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        memory: this.getMemoryInfo(),
        performance: this.getPerformanceInfo()
      },
      severity: this.determineSeverity(error),
      fingerprint: this.generateFingerprint(error)
    };

    this.sendErrorReport(errorReport);
    logger.error('JavaScript error reported', error, errorReport.context);
  }

  // Report API errors
  reportApiError(endpoint, method, status, response, context = {}) {
    const errorReport = {
      timestamp: new Date().toISOString(),
      type: 'api_error',
      endpoint,
      method,
      status,
      response: typeof response === 'string' ? response : JSON.stringify(response),
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent
      },
      severity: status >= 500 ? 'high' : status >= 400 ? 'medium' : 'low',
      fingerprint: `${method}_${endpoint}_${status}`
    };

    this.sendErrorReport(errorReport);
    logger.error('API error reported', null, errorReport);
  }

  // Report performance issues
  reportPerformanceIssue(metric, value, threshold, context = {}) {
    const errorReport = {
      timestamp: new Date().toISOString(),
      type: 'performance_issue',
      metric,
      value,
      threshold,
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        memory: this.getMemoryInfo(),
        performance: this.getPerformanceInfo()
      },
      severity: value > threshold * 2 ? 'high' : value > threshold * 1.5 ? 'medium' : 'low',
      fingerprint: `performance_${metric}_${Math.floor(value / 1000)}`
    };

    this.sendErrorReport(errorReport);
    logger.warn('Performance issue reported', errorReport);
  }

  // Report user action errors
  reportUserActionError(action, error, context = {}) {
    const errorReport = {
      timestamp: new Date().toISOString(),
      type: 'user_action_error',
      action,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent
      },
      severity: 'medium',
      fingerprint: `user_action_${action}_${error.name}`
    };

    this.sendErrorReport(errorReport);
    logger.error('User action error reported', error, errorReport.context);
  }

  // Send error report
  sendErrorReport(errorReport) {
    if (!this.config.features.enableErrorReporting) {
      logger.debug('Error reporting disabled, skipping report');
      return;
    }

    // Add to queue
    this.errorQueue.push(errorReport);
    
    // Limit queue size
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue = this.errorQueue.slice(-this.maxQueueSize);
    }

    // Try to send immediately if online
    if (this.isOnline) {
      this.flushErrorQueue();
    }
  }

  // Flush error queue
  async flushErrorQueue() {
    if (this.errorQueue.length === 0) return;

    const errors = [...this.errorQueue];
    this.errorQueue = [];

    try {
      // In a real application, you would send to your error reporting service
      // For now, we'll just log them
      logger.info(`Flushing ${errors.length} error reports`);
      
      // Example: Send to error reporting service
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ errors })
      // });

      // Store in localStorage as backup
      const existingErrors = JSON.parse(localStorage.getItem('error_reports') || '[]');
      const allErrors = [...existingErrors, ...errors];
      
      // Keep only last 50 errors
      const recentErrors = allErrors.slice(-50);
      localStorage.setItem('error_reports', JSON.stringify(recentErrors));
      
    } catch (error) {
      logger.error('Failed to flush error queue', error);
      // Put errors back in queue
      this.errorQueue = [...errors, ...this.errorQueue];
    }
  }

  // Determine error severity
  determineSeverity(error) {
    const criticalErrors = ['ChunkLoadError', 'TypeError', 'ReferenceError'];
    const highErrors = ['SyntaxError', 'RangeError'];
    
    if (criticalErrors.includes(error.name)) return 'critical';
    if (highErrors.includes(error.name)) return 'high';
    if (error.stack && error.stack.includes('React')) return 'medium';
    
    return 'low';
  }

  // Generate error fingerprint for deduplication
  generateFingerprint(error) {
    const key = `${error.name}_${error.message}_${this.getStackTrace(error)}`;
    return btoa(key).substring(0, 16);
  }

  // Get simplified stack trace
  getStackTrace(error) {
    if (!error.stack) return '';
    
    const lines = error.stack.split('\n').slice(0, 3);
    return lines.map(line => {
      // Remove file paths and line numbers for consistency
      return line.replace(/https?:\/\/[^\/]+/g, '').replace(/:\d+:\d+/g, '');
    }).join('|');
  }

  // Get memory information
  getMemoryInfo() {
    if (!performance.memory) return null;
    
    return {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
    };
  }

  // Get performance information
  getPerformanceInfo() {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (!navigation) return null;
    
    return {
      loadTime: Math.round(navigation.loadEventEnd - navigation.fetchStart),
      domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
      firstByte: Math.round(navigation.responseStart - navigation.fetchStart)
    };
  }

  // Get stored error reports
  getStoredErrors() {
    try {
      return JSON.parse(localStorage.getItem('error_reports') || '[]');
    } catch (error) {
      logger.error('Failed to get stored errors', error);
      return [];
    }
  }

  // Clear stored error reports
  clearStoredErrors() {
    localStorage.removeItem('error_reports');
    logger.info('Cleared stored error reports');
  }

  // Get error statistics
  getErrorStats() {
    const errors = this.getStoredErrors();
    const stats = {
      total: errors.length,
      byType: {},
      bySeverity: {},
      recent: errors.filter(e => 
        new Date(e.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      ).length
    };

    errors.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }
}

// Create singleton instance
const errorReporter = new ErrorReporter();

// Set up global error handlers
window.addEventListener('error', (event) => {
  errorReporter.reportError(event.error, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

window.addEventListener('unhandledrejection', (event) => {
  errorReporter.reportError(new Error(event.reason), {
    type: 'unhandled_promise_rejection',
    reason: event.reason
  });
});

// Export functions
export const reportError = (error, context) => errorReporter.reportError(error, context);
export const reportApiError = (endpoint, method, status, response, context) => 
  errorReporter.reportApiError(endpoint, method, status, response, context);
export const reportPerformanceIssue = (metric, value, threshold, context) => 
  errorReporter.reportPerformanceIssue(metric, value, threshold, context);
export const reportUserActionError = (action, error, context) => 
  errorReporter.reportUserActionError(action, error, context);
export const getErrorStats = () => errorReporter.getErrorStats();
export const getStoredErrors = () => errorReporter.getStoredErrors();
export const clearStoredErrors = () => errorReporter.clearStoredErrors();

export default errorReporter;