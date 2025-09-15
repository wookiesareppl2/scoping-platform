import { useState, useEffect, useCallback } from 'react';
import { apiClient, API_ENDPOINTS } from '../config/api.js';
import { useLogger } from '../utils/logger.js';

/**
 * Custom hook for managing form submissions
 * Centralizes data fetching, caching, and state management
 */
export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const logger = useLogger();

  // Cache duration (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;

  // Check if cache is still valid
  const isCacheValid = useCallback(() => {
    return lastFetch && (Date.now() - lastFetch) < CACHE_DURATION;
  }, [lastFetch]);

  // Fetch submissions from API
  const fetchSubmissions = useCallback(async (forceRefresh = false) => {
    // Use cache if valid and not forcing refresh
    if (!forceRefresh && isCacheValid() && submissions.length > 0) {
      logger.debug('Using cached submissions data');
      return submissions;
    }

    setLoading(true);
    setError(null);

    try {
      logger.info('Fetching submissions from API');
      const data = await apiClient.get(API_ENDPOINTS.FORMS.LIST);
      
      setSubmissions(data);
      setLastFetch(Date.now());
      
      logger.info(`Successfully fetched ${data.length} submissions`);
      return data;
      
    } catch (err) {
      logger.error('Failed to fetch submissions', err);
      setError(err.message);
      
      // Fallback to localStorage
      try {
        const localData = JSON.parse(localStorage.getItem('scopingSubmissions') || '[]');
        setSubmissions(localData);
        logger.warn('Using localStorage fallback data', { count: localData.length });
        return localData;
      } catch (localErr) {
        logger.error('Failed to load localStorage fallback', localErr);
        return [];
      }
    } finally {
      setLoading(false);
    }
  }, [isCacheValid, submissions, logger]);

  // Submit new form data
  const submitForm = useCallback(async (formData) => {
    setLoading(true);
    setError(null);

    try {
      logger.info('Submitting new form');
      const result = await apiClient.post(API_ENDPOINTS.FORMS.SUBMIT, { answers: formData });
      
      // Add to local state immediately for optimistic updates
      const newSubmission = {
        _id: result.submissionId,
        answers: formData,
        metadata: {
          submittedAt: new Date().toISOString(),
          ipAddress: 'client-ip',
          userAgent: navigator.userAgent
        },
        status: 'submitted'
      };
      
      setSubmissions(prev => [newSubmission, ...prev]);
      
      // Also save to localStorage as backup
      const existingLocal = JSON.parse(localStorage.getItem('scopingSubmissions') || '[]');
      existingLocal.unshift(newSubmission);
      localStorage.setItem('scopingSubmissions', JSON.stringify(existingLocal));
      
      logger.info('Form submitted successfully', { submissionId: result.submissionId });
      return result;
      
    } catch (err) {
      logger.error('Failed to submit form', err);
      setError(err.message);
      
      // Fallback: save to localStorage only
      const fallbackSubmission = {
        _id: Date.now().toString(),
        answers: formData,
        metadata: {
          submittedAt: new Date().toISOString(),
          ipAddress: 'unknown',
          userAgent: navigator.userAgent
        },
        status: 'submitted'
      };
      
      const existingLocal = JSON.parse(localStorage.getItem('scopingSubmissions') || '[]');
      existingLocal.unshift(fallbackSubmission);
      localStorage.setItem('scopingSubmissions', JSON.stringify(existingLocal));
      
      setSubmissions(prev => [fallbackSubmission, ...prev]);
      
      logger.warn('Form saved to localStorage as fallback', { submissionId: fallbackSubmission._id });
      return { submissionId: fallbackSubmission._id };
    } finally {
      setLoading(false);
    }
  }, [logger]);

  // Get single submission by ID
  const getSubmission = useCallback(async (id) => {
    // Check local state first
    const localSubmission = submissions.find(s => s._id === id);
    if (localSubmission) {
      return localSubmission;
    }

    // Fetch from API
    try {
      logger.debug(`Fetching submission ${id} from API`);
      const submission = await apiClient.get(API_ENDPOINTS.FORMS.GET(id));
      return submission;
    } catch (err) {
      logger.error(`Failed to fetch submission ${id}`, err);
      
      // Check localStorage
      const localData = JSON.parse(localStorage.getItem('scopingSubmissions') || '[]');
      const localSubmission = localData.find(s => s._id === id || s.id === id);
      return localSubmission || null;
    }
  }, [submissions, logger]);

  // Delete submission
  const deleteSubmission = useCallback(async (id) => {
    try {
      logger.info(`Deleting submission ${id}`);
      
      // Optimistically remove from local state
      setSubmissions(prev => prev.filter(s => s._id !== id));
      
      // Try to delete from API (if endpoint exists)
      // await apiClient.delete(API_ENDPOINTS.FORMS.DELETE(id));
      
      // Remove from localStorage
      const localData = JSON.parse(localStorage.getItem('scopingSubmissions') || '[]');
      const updatedLocal = localData.filter(s => s._id !== id && s.id !== id);
      localStorage.setItem('scopingSubmissions', JSON.stringify(updatedLocal));
      
      logger.info(`Successfully deleted submission ${id}`);
      return true;
      
    } catch (err) {
      logger.error(`Failed to delete submission ${id}`, err);
      // Revert optimistic update
      await fetchSubmissions(true);
      throw err;
    }
  }, [logger, fetchSubmissions]);

  // Update submission status
  const updateSubmissionStatus = useCallback(async (id, status) => {
    try {
      logger.info(`Updating submission ${id} status to ${status}`);
      
      // Optimistically update local state
      setSubmissions(prev => prev.map(s => 
        s._id === id ? { ...s, status } : s
      ));
      
      // Update localStorage
      const localData = JSON.parse(localStorage.getItem('scopingSubmissions') || '[]');
      const updatedLocal = localData.map(s => 
        (s._id === id || s.id === id) ? { ...s, status } : s
      );
      localStorage.setItem('scopingSubmissions', JSON.stringify(updatedLocal));
      
      logger.info(`Successfully updated submission ${id} status`);
      return true;
      
    } catch (err) {
      logger.error(`Failed to update submission ${id} status`, err);
      // Revert optimistic update
      await fetchSubmissions(true);
      throw err;
    }
  }, [logger, fetchSubmissions]);

  // Clear cache and refetch
  const refreshSubmissions = useCallback(() => {
    return fetchSubmissions(true);
  }, [fetchSubmissions]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return {
    // State
    submissions,
    loading,
    error,
    
    // Actions
    fetchSubmissions,
    submitForm,
    getSubmission,
    deleteSubmission,
    updateSubmissionStatus,
    refreshSubmissions,
    
    // Utilities
    isCacheValid: isCacheValid(),
    lastFetch
  };
};

export default useSubmissions;