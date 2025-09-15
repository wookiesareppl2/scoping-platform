// Performance monitoring and optimization utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isEnabled = process.env.NODE_ENV === 'development';
  }

  // Start timing a performance metric
  startTiming(name) {
    if (!this.isEnabled) return;
    
    this.metrics.set(name, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  // End timing and calculate duration
  endTiming(name) {
    if (!this.isEnabled) return;
    
    const metric = this.metrics.get(name);
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      
      console.log(`⏱️ Performance: ${name} took ${metric.duration.toFixed(2)}ms`);
      
      // Warn about slow operations
      if (metric.duration > 1000) {
        console.warn(`🐌 Slow operation detected: ${name} took ${metric.duration.toFixed(2)}ms`);
      }
    }
  }

  // Measure a function execution time
  measure(name, fn) {
    if (!this.isEnabled) return fn();
    
    this.startTiming(name);
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => this.endTiming(name));
    } else {
      this.endTiming(name);
      return result;
    }
  }

  // Monitor component render performance
  measureRender(componentName, renderFn) {
    return this.measure(`${componentName} render`, renderFn);
  }

  // Monitor API call performance
  measureApiCall(endpoint, apiCall) {
    return this.measure(`API: ${endpoint}`, apiCall);
  }

  // Get all metrics
  getMetrics() {
    const results = {};
    this.metrics.forEach((value, key) => {
      results[key] = value;
    });
    return results;
  }

  // Clear all metrics
  clearMetrics() {
    this.metrics.clear();
  }

  // Monitor Core Web Vitals
  observeWebVitals() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    this.observePerformanceEntry('largest-contentful-paint', (entries) => {
      const lcp = entries[entries.length - 1];
      console.log(`📊 LCP: ${lcp.startTime.toFixed(2)}ms`);
      
      if (lcp.startTime > 2500) {
        console.warn('🚨 Poor LCP detected (>2.5s)');
      }
    });

    // First Input Delay (FID) - approximated with First Contentful Paint
    this.observePerformanceEntry('first-contentful-paint', (entries) => {
      const fcp = entries[0];
      console.log(`📊 FCP: ${fcp.startTime.toFixed(2)}ms`);
    });

    // Cumulative Layout Shift (CLS) - monitor layout shifts
    this.observePerformanceEntry('layout-shift', (entries) => {
      let clsScore = 0;
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      
      if (clsScore > 0.1) {
        console.warn(`🚨 High CLS detected: ${clsScore.toFixed(4)}`);
      }
    });
  }

  // Generic performance observer
  observePerformanceEntry(entryType, callback) {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ entryTypes: [entryType] });
      this.observers.set(entryType, observer);
    } catch (error) {
      console.warn(`Failed to observe ${entryType}:`, error);
    }
  }

  // Monitor memory usage
  logMemoryUsage() {
    if (!this.isEnabled || !performance.memory) return;

    const memory = performance.memory;
    console.log('💾 Memory Usage:', {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    });

    // Warn about high memory usage
    const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    if (usagePercent > 80) {
      console.warn(`🚨 High memory usage: ${usagePercent.toFixed(1)}%`);
    }
  }

  // Monitor bundle size and loading performance
  logLoadingMetrics() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      console.log('📦 Loading Metrics:', {
        domContentLoaded: `${navigation.domContentLoadedEventEnd.toFixed(2)}ms`,
        loadComplete: `${navigation.loadEventEnd.toFixed(2)}ms`,
        firstByte: `${navigation.responseStart.toFixed(2)}ms`,
        domInteractive: `${navigation.domInteractive.toFixed(2)}ms`
      });

      // Check for slow loading
      if (navigation.loadEventEnd > 3000) {
        console.warn('🐌 Slow page load detected (>3s)');
      }
    });
  }

  // Cleanup observers
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  const startTiming = (name) => performanceMonitor.startTiming(name);
  const endTiming = (name) => performanceMonitor.endTiming(name);
  const measure = (name, fn) => performanceMonitor.measure(name, fn);
  const measureRender = (componentName, renderFn) => performanceMonitor.measureRender(componentName, renderFn);
  
  return {
    startTiming,
    endTiming,
    measure,
    measureRender,
    getMetrics: () => performanceMonitor.getMetrics(),
    logMemoryUsage: () => performanceMonitor.logMemoryUsage()
  };
};

// Higher-order component for performance monitoring
export const withPerformanceMonitoring = (WrappedComponent, componentName) => {
  return function PerformanceMonitoredComponent(props) {
    return performanceMonitor.measureRender(componentName || WrappedComponent.name, () => (
      <WrappedComponent {...props} />
    ));
  };
};

// Initialize monitoring
export const initializePerformanceMonitoring = () => {
  // Only initialize if window is available and after DOM is ready
  if (typeof window === 'undefined') return;
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.observeWebVitals();
      performanceMonitor.logLoadingMetrics();
    });
  } else {
    performanceMonitor.observeWebVitals();
    performanceMonitor.logLoadingMetrics();
  }
  
  // Log memory usage periodically in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      setInterval(() => {
        performanceMonitor.logMemoryUsage();
      }, 30000); // Every 30 seconds
    }, 5000); // Wait 5 seconds before starting
  }
};

// Cleanup function
export const cleanupPerformanceMonitoring = () => {
  performanceMonitor.disconnect();
};

export default performanceMonitor;