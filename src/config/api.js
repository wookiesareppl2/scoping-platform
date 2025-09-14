// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
};

// API Endpoints
export const API_ENDPOINTS = {
    HEALTH: '/api/health',
    FORMS: {
        SUBMIT: '/api/forms/submit',
        LIST: '/api/forms',
        GET: (id) => `/api/forms/${id}`,
    },
    TEST: {
        CREATE_SUBMISSION: '/api/test/create-submission',
    },
};

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

// Request Headers
export const getDefaultHeaders = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
});

// API Client with error handling and logging
export class ApiClient {
    constructor(baseURL = API_CONFIG.BASE_URL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: getDefaultHeaders(),
            ...options,
        };

        const startTime = performance.now();

        try {
            // Import logger dynamically to avoid circular imports
            const { apiCall } = await import('../utils/logger.js');

            const response = await fetch(url, config);
            const duration = performance.now() - startTime;

            if (!response.ok) {
                const errorText = await response.text();
                const error = new Error(`HTTP ${response.status}: ${response.statusText}`);

                apiCall(config.method || 'GET', endpoint, config.body, null, error);

                // Report API error
                try {
                    const { reportApiError } = await import('../utils/errorReporting.js');
                    reportApiError(endpoint, config.method || 'GET', response.status, errorText);
                } catch (reportError) {
                    console.warn('Failed to report API error:', reportError);
                }

                throw error;
            }

            const contentType = response.headers.get('content-type');
            let responseData;

            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            // Log successful API call
            apiCall(config.method || 'GET', endpoint, config.body, responseData);

            // Log performance if slow
            if (duration > 1000) {
                const { performance: logPerformance } = await import('../utils/logger.js');
                logPerformance(`API ${endpoint}`, duration, 'ms');
            }

            return responseData;
        } catch (error) {
            const duration = performance.now() - startTime;

            // Import logger for error logging
            try {
                const { apiCall } = await import('../utils/logger.js');
                apiCall(config.method || 'GET', endpoint, config.body, null, error);
            } catch (logError) {
                console.error('Failed to log API error:', logError);
            }

            console.error(`API Request failed: ${endpoint} (${duration.toFixed(2)}ms)`, error);
            throw error;
        }
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Default API client instance
export const apiClient = new ApiClient();