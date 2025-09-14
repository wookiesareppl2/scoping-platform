// Comprehensive testing utilities for development and QA

import { generateTestData, generateRandomTestData } from './testDataGenerator.js';
import { apiClient, API_ENDPOINTS } from '../config/api.js';
import logger from './logger.js';

class TestingUtility {
  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'development';
    this.testResults = [];
  }

  // Test form submission with various data sets
  async testFormSubmissions() {
    if (!this.isEnabled) return;

    logger.info('Starting form submission tests');
    const testCases = [
      { name: 'Realistic Test Data', data: generateTestData() },
      { name: 'Random Test Data', data: generateRandomTestData() },
      { name: 'Minimal Data', data: this.generateMinimalData() },
      { name: 'Maximum Data', data: this.generateMaximumData() }
    ];

    const results = [];

    for (const testCase of testCases) {
      try {
        logger.debug(`Testing: ${testCase.name}`);
        const startTime = performance.now();
        
        const response = await apiClient.post(API_ENDPOINTS.FORMS.SUBMIT, {
          answers: testCase.data
        });
        
        const duration = performance.now() - startTime;
        
        results.push({
          name: testCase.name,
          success: true,
          duration: duration.toFixed(2),
          submissionId: response.submissionId,
          timestamp: new Date().toISOString()
        });
        
        logger.info(`✅ ${testCase.name} submission successful`, {
          duration: `${duration.toFixed(2)}ms`,
          submissionId: response.submissionId
        });
        
      } catch (error) {
        results.push({
          name: testCase.name,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        logger.error(`❌ ${testCase.name} submission failed`, error);
      }
    }

    this.testResults.push({
      type: 'Form Submissions',
      timestamp: new Date().toISOString(),
      results
    });

    console.table(results);
    return results;
  }

  // Test API endpoints
  async testApiEndpoints() {
    if (!this.isEnabled) return;

    logger.info('Starting API endpoint tests');
    const endpoints = [
      { name: 'Health Check', method: 'GET', endpoint: API_ENDPOINTS.HEALTH },
      { name: 'Get Forms', method: 'GET', endpoint: API_ENDPOINTS.FORMS.LIST },
      { name: 'Test Submission', method: 'POST', endpoint: API_ENDPOINTS.TEST.CREATE_SUBMISSION }
    ];

    const results = [];

    for (const test of endpoints) {
      try {
        logger.debug(`Testing endpoint: ${test.name}`);
        const startTime = performance.now();
        
        let response;
        if (test.method === 'GET') {
          response = await apiClient.get(test.endpoint);
        } else if (test.method === 'POST') {
          response = await apiClient.post(test.endpoint, {});
        }
        
        const duration = performance.now() - startTime;
        
        results.push({
          name: test.name,
          endpoint: test.endpoint,
          method: test.method,
          success: true,
          duration: duration.toFixed(2),
          responseSize: JSON.stringify(response).length,
          timestamp: new Date().toISOString()
        });
        
        logger.info(`✅ ${test.name} endpoint test successful`, {
          duration: `${duration.toFixed(2)}ms`,
          responseSize: `${JSON.stringify(response).length} bytes`
        });
        
      } catch (error) {
        results.push({
          name: test.name,
          endpoint: test.endpoint,
          method: test.method,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        
        logger.error(`❌ ${test.name} endpoint test failed`, error);
      }
    }

    this.testResults.push({
      type: 'API Endpoints',
      timestamp: new Date().toISOString(),
      results
    });

    console.table(results);
    return results;
  }

  // Test form validation
  async testFormValidation() {
    if (!this.isEnabled) return;

    logger.info('Starting form validation tests');
    
    const validationTests = [
      {
        name: 'Empty Required Field',
        data: { company_name: '' },
        shouldFail: true
      },
      {
        name: 'Invalid Email',
        data: { email: 'invalid-email' },
        shouldFail: true
      },
      {
        name: 'Invalid URL',
        data: { website: 'not-a-url' },
        shouldFail: true
      },
      {
        name: 'Valid Data',
        data: { 
          company_name: 'Test Company',
          email: 'test@example.com',
          website: 'https://example.com'
        },
        shouldFail: false
      }
    ];

    const results = await Promise.all(validationTests.map(async test => {
      try {
        // Import validation function dynamically to avoid issues
        const { validateAnswer } = await import('../types/scoping.js');
        
        let hasErrors = false;
        const errors = {};
        
        Object.entries(test.data).forEach(([field, value]) => {
          // Mock question object for validation
          const question = {
            id: field,
            required: true,
            type: field === 'email' ? 'email' : field === 'website' ? 'url' : 'text'
          };
          
          const error = validateAnswer(question, value);
          if (error) {
            errors[field] = error;
            hasErrors = true;
          }
        });
        
        const testPassed = test.shouldFail ? hasErrors : !hasErrors;
        
        return {
          name: test.name,
          success: testPassed,
          expectedToFail: test.shouldFail,
          actuallyFailed: hasErrors,
          errors: hasErrors ? errors : null,
          timestamp: new Date().toISOString()
        };
        
      } catch (error) {
        return {
          name: test.name,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });

    this.testResults.push({
      type: 'Form Validation',
      timestamp: new Date().toISOString(),
      results
    });

    console.table(results);
    return results;
  }

  // Test localStorage functionality
  testLocalStorage() {
    if (!this.isEnabled) return;

    logger.info('Starting localStorage tests');
    
    const tests = [
      {
        name: 'Save Form Data',
        test: () => {
          const testData = { test: 'data', timestamp: Date.now() };
          localStorage.setItem('test_form_data', JSON.stringify(testData));
          const retrieved = JSON.parse(localStorage.getItem('test_form_data'));
          return JSON.stringify(testData) === JSON.stringify(retrieved);
        }
      },
      {
        name: 'Save Large Data',
        test: () => {
          const largeData = { data: 'x'.repeat(100000) };
          localStorage.setItem('test_large_data', JSON.stringify(largeData));
          const retrieved = JSON.parse(localStorage.getItem('test_large_data'));
          return largeData.data === retrieved.data;
        }
      },
      {
        name: 'Clear Test Data',
        test: () => {
          localStorage.removeItem('test_form_data');
          localStorage.removeItem('test_large_data');
          return !localStorage.getItem('test_form_data') && !localStorage.getItem('test_large_data');
        }
      }
    ];

    const results = tests.map(test => {
      try {
        const success = test.test();
        return {
          name: test.name,
          success,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        return {
          name: test.name,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        };
      }
    });

    this.testResults.push({
      type: 'LocalStorage',
      timestamp: new Date().toISOString(),
      results
    });

    console.table(results);
    return results;
  }

  // Generate minimal test data
  generateMinimalData() {
    return {
      company_name: 'Test Co',
      industry: 'Tech',
      budget_tier: 'budget-constrained',
      website_type: 'business-static'
    };
  }

  // Generate maximum test data
  generateMaximumData() {
    const baseData = generateTestData();
    
    // Add extra fields and longer content
    return {
      ...baseData,
      target_audience: 'A'.repeat(1000), // Long text
      business_goals: 'B'.repeat(1000),
      special_features: [
        'Contact forms',
        'Photo galleries', 
        'Video integration',
        'Blog/news section',
        'Search functionality',
        'User accounts',
        'Online payments'
      ],
      third_party_tools: [
        'Google Analytics',
        'Social media platforms',
        'Email marketing (MailChimp, etc.)',
        'CRM systems',
        'Payment processors',
        'Booking systems',
        'Inventory management'
      ]
    };
  }

  // Run all tests
  async runAllTests() {
    if (!this.isEnabled) {
      console.log('Testing utilities are only available in development mode');
      return;
    }

    logger.info('🧪 Starting comprehensive test suite');
    
    const startTime = performance.now();
    
    try {
      // Run all test suites
      await this.testApiEndpoints();
      await this.testFormSubmissions();
      await this.testFormValidation();
      this.testLocalStorage();
      
      const duration = performance.now() - startTime;
      
      logger.info(`✅ Test suite completed in ${duration.toFixed(2)}ms`);
      
      // Generate test report
      this.generateTestReport();
      
    } catch (error) {
      logger.error('❌ Test suite failed', error);
    }
  }

  // Generate comprehensive test report
  generateTestReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTestSuites: this.testResults.length,
        totalTests: this.testResults.reduce((sum, suite) => sum + suite.results.length, 0),
        passedTests: this.testResults.reduce((sum, suite) => 
          sum + suite.results.filter(r => r.success).length, 0),
        failedTests: this.testResults.reduce((sum, suite) => 
          sum + suite.results.filter(r => !r.success).length, 0)
      },
      testSuites: this.testResults
    };

    console.log('📊 Test Report:', report);
    
    // Save to localStorage for later review
    localStorage.setItem('test_report', JSON.stringify(report));
    
    return report;
  }

  // Get test results
  getTestResults() {
    return this.testResults;
  }

  // Clear test results
  clearTestResults() {
    this.testResults = [];
    localStorage.removeItem('test_report');
    logger.info('Test results cleared');
  }
}

// Create singleton instance
const testingUtility = new TestingUtility();

// Export convenience functions
export const runAllTests = () => testingUtility.runAllTests();
export const testFormSubmissions = () => testingUtility.testFormSubmissions();
export const testApiEndpoints = () => testingUtility.testApiEndpoints();
export const testFormValidation = () => testingUtility.testFormValidation();
export const testLocalStorage = () => testingUtility.testLocalStorage();
export const getTestResults = () => testingUtility.getTestResults();
export const clearTestResults = () => testingUtility.clearTestResults();

// Make testing utilities available globally in development
if (typeof window !== 'undefined') {
  // Only expose in development, and do it after a delay to avoid import issues
  setTimeout(() => {
    if (process.env.NODE_ENV === 'development') {
      window.testingUtility = {
        runAllTests,
        testFormSubmissions,
        testApiEndpoints,
        testFormValidation,
        testLocalStorage,
        getTestResults,
        clearTestResults
      };
    }
  }, 1000);
}

export default testingUtility;