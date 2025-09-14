// Environment configuration and feature flags

class EnvironmentConfig {
  constructor() {
    this.env = import.meta.env.MODE || 'development';
    this.isDevelopment = this.env === 'development';
    this.isProduction = this.env === 'production';
    this.isTest = this.env === 'test';
  }

  // Get environment variable with fallback
  get(key, fallback = null) {
    return import.meta.env[key] || fallback;
  }

  // Get API configuration
  getApiConfig() {
    return {
      baseUrl: this.get('VITE_API_URL', 'http://localhost:3001'),
      timeout: parseInt(this.get('VITE_API_TIMEOUT', '10000')),
      retryAttempts: parseInt(this.get('VITE_API_RETRY_ATTEMPTS', '3')),
      retryDelay: parseInt(this.get('VITE_API_RETRY_DELAY', '1000'))
    };
  }

  // Get database configuration
  getDatabaseConfig() {
    return {
      mongoUri: this.get('VITE_MONGODB_URI'),
      fallbackToMemory: this.get('VITE_FALLBACK_TO_MEMORY', 'true') === 'true'
    };
  }

  // Get logging configuration
  getLoggingConfig() {
    return {
      level: this.get('VITE_LOG_LEVEL', this.isDevelopment ? 'debug' : 'error'),
      enableConsole: this.get('VITE_ENABLE_CONSOLE_LOGGING', 'true') === 'true',
      enableRemote: this.get('VITE_ENABLE_REMOTE_LOGGING', 'false') === 'true',
      remoteEndpoint: this.get('VITE_REMOTE_LOG_ENDPOINT')
    };
  }

  // Get performance monitoring configuration
  getPerformanceConfig() {
    return {
      enabled: this.get('VITE_ENABLE_PERFORMANCE_MONITORING', this.isDevelopment ? 'true' : 'false') === 'true',
      sampleRate: parseFloat(this.get('VITE_PERFORMANCE_SAMPLE_RATE', '1.0')),
      enableWebVitals: this.get('VITE_ENABLE_WEB_VITALS', 'true') === 'true',
      enableMemoryMonitoring: this.get('VITE_ENABLE_MEMORY_MONITORING', this.isDevelopment ? 'true' : 'false') === 'true'
    };
  }

  // Get security configuration
  getSecurityConfig() {
    return {
      enableCSP: this.get('VITE_ENABLE_CSP', 'true') === 'true',
      allowedOrigins: this.get('VITE_ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:3000').split(','),
      enableRateLimiting: this.get('VITE_ENABLE_RATE_LIMITING', 'true') === 'true',
      maxRequestsPerMinute: parseInt(this.get('VITE_MAX_REQUESTS_PER_MINUTE', '100'))
    };
  }

  // Feature flags
  getFeatureFlags() {
    return {
      // Core features
      enableBudgetTierSelector: this.get('VITE_ENABLE_BUDGET_TIER_SELECTOR', 'true') === 'true',
      enableConditionalQuestions: this.get('VITE_ENABLE_CONDITIONAL_QUESTIONS', 'true') === 'true',
      enableFormValidation: this.get('VITE_ENABLE_FORM_VALIDATION', 'true') === 'true',
      enableAutoSave: this.get('VITE_ENABLE_AUTO_SAVE', 'true') === 'true',
      
      // Development features
      enableTestDataGenerator: this.get('VITE_ENABLE_TEST_DATA_GENERATOR', this.isDevelopment ? 'true' : 'false') === 'true',
      enableDevTools: this.get('VITE_ENABLE_DEV_TOOLS', this.isDevelopment ? 'true' : 'false') === 'true',
      enableTestingUtilities: this.get('VITE_ENABLE_TESTING_UTILITIES', this.isDevelopment ? 'true' : 'false') === 'true',
      
      // Analytics and monitoring
      enableAnalytics: this.get('VITE_ENABLE_ANALYTICS', 'false') === 'true',
      enableErrorReporting: this.get('VITE_ENABLE_ERROR_REPORTING', 'false') === 'true',
      enableUserTracking: this.get('VITE_ENABLE_USER_TRACKING', 'false') === 'true',
      
      // UI/UX features
      enableProgressAnimation: this.get('VITE_ENABLE_PROGRESS_ANIMATION', 'true') === 'true',
      enableHelpfulHints: this.get('VITE_ENABLE_HELPFUL_HINTS', 'true') === 'true',
      enableFormWizardNavigation: this.get('VITE_ENABLE_FORM_WIZARD_NAVIGATION', 'true') === 'true',
      
      // Admin features
      enableAdminDashboard: this.get('VITE_ENABLE_ADMIN_DASHBOARD', 'true') === 'true',
      enableSubmissionExport: this.get('VITE_ENABLE_SUBMISSION_EXPORT', 'true') === 'true',
      enableBulkOperations: this.get('VITE_ENABLE_BULK_OPERATIONS', 'false') === 'true'
    };
  }

  // Get all configuration
  getAllConfig() {
    return {
      environment: this.env,
      isDevelopment: this.isDevelopment,
      isProduction: this.isProduction,
      isTest: this.isTest,
      api: this.getApiConfig(),
      database: this.getDatabaseConfig(),
      logging: this.getLoggingConfig(),
      performance: this.getPerformanceConfig(),
      security: this.getSecurityConfig(),
      features: this.getFeatureFlags()
    };
  }

  // Check if feature is enabled
  isFeatureEnabled(featureName) {
    const features = this.getFeatureFlags();
    return features[featureName] || false;
  }

  // Get build information
  getBuildInfo() {
    return {
      version: this.get('VITE_APP_VERSION', '1.0.0'),
      buildDate: this.get('VITE_BUILD_DATE', new Date().toISOString()),
      gitCommit: this.get('VITE_GIT_COMMIT', 'unknown'),
      gitBranch: this.get('VITE_GIT_BRANCH', 'unknown')
    };
  }

  // Validate configuration
  validateConfig() {
    const issues = [];
    const config = this.getAllConfig();

    // Check required environment variables
    if (!config.api.baseUrl) {
      issues.push('API base URL is not configured');
    }

    // Check API URL format
    try {
      new URL(config.api.baseUrl);
    } catch (error) {
      issues.push('API base URL is not a valid URL');
    }

    // Check timeout values
    if (config.api.timeout < 1000) {
      issues.push('API timeout is too low (minimum 1000ms recommended)');
    }

    // Check retry configuration
    if (config.api.retryAttempts < 0 || config.api.retryAttempts > 10) {
      issues.push('API retry attempts should be between 0 and 10');
    }

    // Check performance sample rate
    if (config.performance.sampleRate < 0 || config.performance.sampleRate > 1) {
      issues.push('Performance sample rate should be between 0 and 1');
    }

    // Check security configuration
    if (config.security.maxRequestsPerMinute < 1) {
      issues.push('Max requests per minute should be at least 1');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }

  // Log configuration (safe for production)
  logConfig() {
    const config = this.getAllConfig();
    
    // Remove sensitive information
    const safeConfig = {
      ...config,
      database: {
        ...config.database,
        mongoUri: config.database.mongoUri ? '[CONFIGURED]' : '[NOT CONFIGURED]'
      }
    };

    console.log('🔧 Environment Configuration:', safeConfig);
    
    // Validate and log any issues
    const validation = this.validateConfig();
    if (!validation.isValid) {
      console.warn('⚠️ Configuration Issues:', validation.issues);
    }

    return safeConfig;
  }
}

// Create singleton instance
const environmentConfig = new EnvironmentConfig();

// Export convenience functions
export const getConfig = () => environmentConfig.getAllConfig();
export const getApiConfig = () => environmentConfig.getApiConfig();
export const getDatabaseConfig = () => environmentConfig.getDatabaseConfig();
export const getLoggingConfig = () => environmentConfig.getLoggingConfig();
export const getPerformanceConfig = () => environmentConfig.getPerformanceConfig();
export const getSecurityConfig = () => environmentConfig.getSecurityConfig();
export const getFeatureFlags = () => environmentConfig.getFeatureFlags();
export const getBuildInfo = () => environmentConfig.getBuildInfo();
export const isFeatureEnabled = (featureName) => environmentConfig.isFeatureEnabled(featureName);
export const validateConfig = () => environmentConfig.validateConfig();
export const logConfig = () => environmentConfig.logConfig();

// Environment checks
export const isDevelopment = environmentConfig.isDevelopment;
export const isProduction = environmentConfig.isProduction;
export const isTest = environmentConfig.isTest;

// Make configuration available globally in development
if (typeof window !== 'undefined') {
  // Delay to avoid import issues
  setTimeout(() => {
    if (environmentConfig.isDevelopment) {
      window.environmentConfig = {
        getConfig,
        getFeatureFlags,
        isFeatureEnabled,
        validateConfig,
        logConfig
      };
    }
  }, 500);
}

export default environmentConfig;