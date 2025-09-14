// Shared form metrics calculations

/**
 * Calculate form completion percentage
 * @param {Object} formData - Form answers object
 * @param {Array} allQuestions - Array of all relevant questions
 * @returns {number} Completion percentage (0-100)
 */
export const calculateCompleteness = (formData, allQuestions = null) => {
  if (!formData || typeof formData !== 'object') return 0;
  
  // If no questions provided, use simple field count
  if (!allQuestions) {
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.values(formData).filter(value => 
      value !== null && value !== undefined && value !== ''
    ).length;
    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
  }
  
  // Use provided questions for accurate calculation
  const relevantQuestions = allQuestions.filter(q => shouldShowQuestion(q, formData));
  const completedFields = relevantQuestions.filter(q => {
    const value = formData[q.id];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined && value !== '';
  });
  
  return relevantQuestions.length > 0 ? Math.round((completedFields.length / relevantQuestions.length) * 100) : 0;
};

/**
 * Calculate quality score based on answer detail and completeness
 * @param {Object} formData - Form answers object
 * @returns {number} Quality score (0-100)
 */
export const calculateQualityScore = (formData) => {
  if (!formData || typeof formData !== 'object') return 0;
  
  let totalScore = 0;
  let fieldCount = 0;
  
  Object.values(formData).forEach(value => {
    if (value && typeof value === 'string') {
      fieldCount++;
      // Score based on answer length and detail
      if (value.length > 100) totalScore += 100;
      else if (value.length > 50) totalScore += 75;
      else if (value.length > 20) totalScore += 50;
      else if (value.length > 0) totalScore += 25;
    } else if (value && Array.isArray(value)) {
      fieldCount++;
      // Score based on number of selections
      totalScore += Math.min(value.length * 20, 100);
    } else if (value && typeof value === 'object') {
      fieldCount++;
      totalScore += 75; // Objects get medium score
    } else if (value) {
      fieldCount++;
      totalScore += 50; // Other non-empty values
    }
  });
  
  return fieldCount > 0 ? Math.round(totalScore / fieldCount) : 0;
};

/**
 * Estimate project value based on form answers
 * @param {Object} answers - Form answers object
 * @returns {number} Estimated project value in dollars
 */
export const estimateProjectValue = (answers) => {
  if (!answers) return 0;
  
  let baseValue = 5000; // Default base value
  
  // Budget range multiplier
  const budgetRange = answers.budget_range || '';
  if (budgetRange.includes('$50,000')) baseValue = 50000;
  else if (budgetRange.includes('$25,000')) baseValue = 35000;
  else if (budgetRange.includes('$10,000')) baseValue = 15000;
  else if (budgetRange.includes('$5,000')) baseValue = 7500;
  else if (budgetRange.includes('$2,000')) baseValue = 3500;
  else if (budgetRange.includes('$1,000')) baseValue = 1500;
  
  // Complexity multipliers
  const websiteType = answers.website_type || '';
  if (websiteType.includes('ecommerce') || websiteType.includes('custom')) {
    baseValue *= 1.5;
  } else if (websiteType.includes('advanced') || websiteType.includes('membership')) {
    baseValue *= 1.3;
  }
  
  // Feature complexity
  const features = answers.special_features || [];
  if (Array.isArray(features)) {
    const complexFeatures = ['User accounts', 'Online payments', 'Search functionality'];
    const hasComplexFeatures = features.some(f => complexFeatures.includes(f));
    if (hasComplexFeatures) {
      baseValue *= 1.2;
    }
  }
  
  return Math.round(baseValue);
};

/**
 * Calculate project priority based on timeline and budget
 * @param {Object} answers - Form answers object
 * @returns {string} Priority level: 'high', 'medium', 'low'
 */
export const calculatePriority = (answers) => {
  if (!answers) return 'medium';
  
  const deadline = answers.launch_deadline || '';
  const budget = answers.budget_range || '';
  
  // High priority conditions
  if (deadline.includes('ASAP') || deadline.includes('2-4 weeks')) return 'high';
  if (budget.includes('$25,000') || budget.includes('$50,000')) return 'high';
  
  // Low priority conditions
  if (deadline.includes('3-6 months') || deadline.includes('No specific deadline')) return 'low';
  if (budget.includes('$500') || budget.includes('$1,000')) return 'low';
  
  return 'medium';
};

/**
 * Validate form data structure
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateFormData = (formData) => {
  const errors = [];
  
  if (!formData || typeof formData !== 'object') {
    errors.push('Form data must be an object');
    return { isValid: false, errors };
  }
  
  // Check for required fields
  const requiredFields = ['company_name', 'industry', 'target_audience', 'business_goals'];
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors.push(`${field.replace('_', ' ')} is required`);
    }
  });
  
  // Validate email format if provided
  if (formData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }
  }
  
  // Validate URL format if provided
  if (formData.website) {
    try {
      new URL(formData.website);
    } catch {
      errors.push('Invalid website URL format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Import shouldShowQuestion if available
let shouldShowQuestion;
try {
  const scopingModule = require('../types/scoping.js');
  shouldShowQuestion = scopingModule.shouldShowQuestion;
} catch (error) {
  // Fallback implementation
  shouldShowQuestion = () => true;
}