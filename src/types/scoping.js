// Scoping System Data Types and Configuration

// Budget Tiers
export const BUDGET_TIERS = {
  BUDGET_CONSTRAINED: 'budget-constrained',
  FULL_BUDGET: 'full-budget'
};

// Website Types for Budget-Constrained Projects
export const BUDGET_WEBSITE_TYPES = {
  BUSINESS_STATIC: 'business-static',
  PORTFOLIO_STATIC: 'portfolio-static',
  INFORMATIONAL_STATIC: 'informational-static',
  RESTAURANT_STATIC: 'restaurant-static'
};

// Website Types for Full-Budget Projects
export const FULL_WEBSITE_TYPES = {
  ECOMMERCE: 'ecommerce',
  MEMBERSHIP: 'membership',
  BOOKING: 'booking',
  BUSINESS_ADVANCED: 'business-advanced',
  PORTFOLIO_ADVANCED: 'portfolio-advanced',
  BLOG_CMS: 'blog-cms',
  CUSTOM_APPLICATION: 'custom-application'
};

// All Website Types Combined
export const WEBSITE_TYPES = {
  ...BUDGET_WEBSITE_TYPES,
  ...FULL_WEBSITE_TYPES
};

// Scoping Categories
export const SCOPING_CATEGORIES = {
  BUSINESS: 'business',
  TECHNICAL: 'technical',
  CONTENT: 'content',
  DESIGN: 'design',
  TIMELINE: 'timeline',
  INTEGRATIONS: 'integrations'
};

// Question Types
export const QUESTION_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  NUMBER: 'number',
  EMAIL: 'email',
  URL: 'url',
  BUDGET_TIER: 'budget-tier',
  WEBSITE_TYPE: 'website-type'
};

// Budget-aware question logic
export const getBudgetAppropriateQuestions = (category, budgetTier) => {
  const allQuestions = getCategoryQuestions(category);
  
  return allQuestions.filter(question => {
    // If question has budget restrictions, check them
    if (question.budgetTiers) {
      return question.budgetTiers.includes(budgetTier);
    }
    
    // If no budget restrictions, show for all tiers
    return true;
  });
};

// Enhanced question validation with budget awareness
export const validateAnswer = (question, answer, formData = {}) => {
  if (question.required && (!answer || answer.toString().trim() === '')) {
    return 'This field is required';
  }

  // Budget-specific validation
  if (question.type === QUESTION_TYPES.BUDGET_TIER && !answer) {
    return 'Please select a budget tier to continue';
  }

  if (question.type === QUESTION_TYPES.WEBSITE_TYPE && !answer) {
    return 'Please select a website type to continue';
  }

  // Email validation
  if (question.type === QUESTION_TYPES.EMAIL && answer) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(answer)) {
      return 'Please enter a valid email address';
    }
  }

  // URL validation
  if (question.type === QUESTION_TYPES.URL && answer) {
    try {
      new URL(answer);
    } catch {
      return 'Please enter a valid URL';
    }
  }

  // Number validation
  if (question.type === QUESTION_TYPES.NUMBER && answer) {
    if (isNaN(answer)) {
      return 'Please enter a valid number';
    }
    if (question.min !== undefined && Number(answer) < question.min) {
      return `Value must be at least ${question.min}`;
    }
    if (question.max !== undefined && Number(answer) > question.max) {
      return `Value must be no more than ${question.max}`;
    }
  }

  return null;
};

// Enhanced conditional logic with budget awareness
export const shouldShowQuestion = (question, formData) => {
  // Budget tier dependency
  if (question.requiresBudgetTier && !formData.budgetTier) {
    return false;
  }

  // Website type dependency
  if (question.requiresWebsiteType && !formData.websiteType) {
    return false;
  }

  // Budget-specific questions
  if (question.budgetTiers && formData.budgetTier) {
    if (!question.budgetTiers.includes(formData.budgetTier)) {
      return false;
    }
  }

  // Website type-specific questions
  if (question.websiteTypes && formData.websiteType) {
    if (!question.websiteTypes.includes(formData.websiteType)) {
      return false;
    }
  }

  // Original conditional logic
  if (question.showIf) {
    return evaluateCondition(question.showIf, formData);
  }

  return true;
};

// Evaluate conditional expressions
const evaluateCondition = (condition, formData) => {
  try {
    // Simple condition evaluation
    // Format: "fieldName === 'value'" or "fieldName !== 'value'"
    const parts = condition.split(/\s*(===|!==)\s*/);
    if (parts.length === 3) {
      const [fieldName, operator, expectedValue] = parts;
      const actualValue = formData[fieldName];
      const cleanExpectedValue = expectedValue.replace(/['"]/g, '');
      
      if (operator === '===') {
        return actualValue === cleanExpectedValue;
      } else if (operator === '!==') {
        return actualValue !== cleanExpectedValue;
      }
    }
    
    return true;
  } catch (error) {
    console.warn('Error evaluating condition:', condition, error);
    return true;
  }
};

// Get questions for a specific category with budget awareness
export const getCategoryQuestions = (category) => {
  const questions = {
    [SCOPING_CATEGORIES.BUSINESS]: [
      {
        id: 'company_name',
        text: 'What is your company or project name?',
        type: QUESTION_TYPES.TEXT,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'This will help us understand your brand and project context'
      },
      {
        id: 'industry',
        text: 'What industry or sector are you in?',
        type: QUESTION_TYPES.TEXT,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'Understanding your industry helps us tailor the website appropriately'
      },
      {
        id: 'target_audience',
        text: 'Who is your target audience?',
        type: QUESTION_TYPES.TEXTAREA,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'Describe your ideal customers or website visitors'
      },
      {
        id: 'business_goals',
        text: 'What are your main business goals for this website?',
        type: QUESTION_TYPES.TEXTAREA,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'What do you want to achieve with your new website?'
      }
    ],
    
    [SCOPING_CATEGORIES.TECHNICAL]: [
      {
        id: 'budget_tier',
        text: 'What is your project budget tier?',
        type: QUESTION_TYPES.BUDGET_TIER,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        hint: 'This helps us provide appropriate technical options for your budget'
      },
      {
        id: 'website_type',
        text: 'What type of website do you need?',
        type: QUESTION_TYPES.WEBSITE_TYPE,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        requiresBudgetTier: true,
        hint: 'Select the option that best describes your project needs'
      },
      {
        id: 'existing_website',
        text: 'Do you have an existing website?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        options: ['Yes, we have an existing website', 'No, this is a new website'],
        hint: 'This helps us understand if we need to plan for migration or redesign'
      },
      {
        id: 'domain_hosting',
        text: 'Do you have a domain name and hosting?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        options: ['Yes, both domain and hosting', 'Yes, domain only', 'Yes, hosting only', 'No, need both'],
        hint: 'We can help set these up if needed'
      }
    ],
    
    [SCOPING_CATEGORIES.CONTENT]: [
      {
        id: 'content_ready',
        text: 'How ready is your content (text, images, etc.)?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.CONTENT,
        options: ['All content is ready', 'Some content is ready', 'Content needs to be created', 'Need help with content strategy'],
        hint: 'Content readiness affects project timeline and scope'
      },
      {
        id: 'pages_needed',
        text: 'How many pages will your website need?',
        type: QUESTION_TYPES.SELECT,
        required: true,
        category: SCOPING_CATEGORIES.CONTENT,
        options: ['1-5 pages', '6-10 pages', '11-20 pages', '21-50 pages', '50+ pages'],
        hint: 'Include all main pages, not including blog posts or products'
      },
      {
        id: 'special_features',
        text: 'What special features do you need?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.CONTENT,
        options: ['Contact forms', 'Photo galleries', 'Video integration', 'Blog/news section', 'Search functionality', 'User accounts', 'Online payments'],
        hint: 'Select all that apply to your project'
      }
    ],
    
    [SCOPING_CATEGORIES.DESIGN]: [
      {
        id: 'design_style',
        text: 'What design style do you prefer?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.DESIGN,
        options: ['Modern and minimalist', 'Bold and colorful', 'Professional and corporate', 'Creative and artistic', 'Classic and traditional'],
        hint: 'This helps us understand your aesthetic preferences'
      },
      {
        id: 'brand_colors',
        text: 'Do you have established brand colors?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.DESIGN,
        options: ['Yes, we have specific brand colors', 'We have some ideas but need guidance', 'No, we need help choosing colors'],
        hint: 'Brand colors help maintain consistency across your marketing'
      },
      {
        id: 'inspiration_websites',
        text: 'Are there any websites you admire or want to use as inspiration?',
        type: QUESTION_TYPES.TEXTAREA,
        required: false,
        category: SCOPING_CATEGORIES.DESIGN,
        hint: 'Share URLs or describe what you like about other websites'
      }
    ],
    
    [SCOPING_CATEGORIES.TIMELINE]: [
      {
        id: 'launch_deadline',
        text: 'When do you need the website to launch?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.TIMELINE,
        options: ['ASAP (rush job)', 'Within 2-4 weeks', 'Within 1-2 months', 'Within 3-6 months', 'No specific deadline'],
        hint: 'Timeline affects project planning and resource allocation'
      },
      {
        id: 'budget_range',
        text: 'What is your total project budget range?',
        type: QUESTION_TYPES.SELECT,
        required: true,
        category: SCOPING_CATEGORIES.TIMELINE,
        options: ['$500-$1,000', '$1,000-$2,000', '$2,000-$5,000', '$5,000-$10,000', '$10,000+'],
        hint: 'This helps us recommend appropriate solutions for your budget'
      }
    ],
    
    [SCOPING_CATEGORIES.INTEGRATIONS]: [
      {
        id: 'third_party_tools',
        text: 'Do you need integration with any third-party tools or services?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.INTEGRATIONS,
        options: ['Google Analytics', 'Social media platforms', 'Email marketing (MailChimp, etc.)', 'CRM systems', 'Payment processors', 'Booking systems', 'Inventory management'],
        hint: 'Select any tools you currently use or plan to use'
      },
      {
        id: 'analytics_tracking',
        text: 'What kind of analytics and tracking do you need?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.INTEGRATIONS,
        options: ['Google Analytics', 'Facebook Pixel', 'Conversion tracking', 'Heat mapping', 'User behavior tracking'],
        hint: 'Analytics help you understand your website performance'
      }
    ]
  };

  return questions[category] || [];
};

// Get all questions across all categories
export const getAllQuestions = () => {
  const allQuestions = [];
  Object.values(SCOPING_CATEGORIES).forEach(category => {
    allQuestions.push(...getCategoryQuestions(category));
  });
  return allQuestions;
};

// Calculate form completion percentage with budget awareness
export const calculateCompletionPercentage = (answers, budgetTier) => {
  const allQuestions = getAllQuestions();
  const relevantQuestions = allQuestions.filter(q => shouldShowQuestion(q, { ...answers, budgetTier }));
  const answeredQuestions = relevantQuestions.filter(q => {
    const answer = answers[q.id];
    return answer !== undefined && answer !== null && answer !== '';
  });
  
  return relevantQuestions.length > 0 ? (answeredQuestions.length / relevantQuestions.length) * 100 : 0;
};

// Export default configuration
export default {
  BUDGET_TIERS,
  BUDGET_WEBSITE_TYPES,
  FULL_WEBSITE_TYPES,
  WEBSITE_TYPES,
  SCOPING_CATEGORIES,
  QUESTION_TYPES,
  getCategoryQuestions,
  getAllQuestions,
  validateAnswer,
  shouldShowQuestion,
  getBudgetAppropriateQuestions,
  calculateCompletionPercentage
};