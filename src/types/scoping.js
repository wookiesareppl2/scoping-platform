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
  INTEGRATIONS: 'integrations',
  MAINTENANCE: 'maintenance'
};

// Question Types
export const QUESTION_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  MULTISELECT: 'multiselect',
  NUMBER: 'number',
  EMAIL: 'email',
  URL: 'url',
  DATE: 'date',
  FILE: 'file',
  BUDGET_TIER_SELECTOR: 'budget_tier_selector',
  CONDITIONAL_WEBSITE_TYPE: 'conditional_website_type'
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
  if (question.type === QUESTION_TYPES.BUDGET_TIER_SELECTOR && !answer) {
    return 'Please select a budget tier to continue';
  }

  if (question.type === QUESTION_TYPES.CONDITIONAL_WEBSITE_TYPE && !answer) {
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
        hint: 'Please provide your official company or project name as you would like it to appear on your website. This helps maintain brand consistency across all digital assets.'
      },
      {
        id: 'industry',
        text: 'What industry or sector are you in?',
        type: QUESTION_TYPES.TEXT,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'Specify your primary industry (e.g., Healthcare, E-commerce, Professional Services). This helps us understand your market context and compliance requirements.'
      },
      {
        id: 'unique_value',
        text: 'What makes your business unique?',
        type: QUESTION_TYPES.TEXTAREA,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'Describe what sets your business apart from competitors. This helps us highlight your unique value proposition throughout the website.'
      },
      {
        id: 'target_audience',
        text: 'Who is your target audience?',
        type: QUESTION_TYPES.TEXTAREA,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'Describe your primary audience demographics, behaviors, and needs. Include details like age range, location, interests, and pain points.'
      },
      {
        id: 'business_goals',
        text: 'What are your main business goals for this website?',
        type: QUESTION_TYPES.TEXTAREA,
        required: true,
        category: SCOPING_CATEGORIES.BUSINESS,
        hint: 'List your top 3-5 business objectives (e.g., generate leads, sell products, share information). Be specific about success metrics when possible.'
      }
    ],
    
    [SCOPING_CATEGORIES.TECHNICAL]: [
      {
        id: 'budget_range',
        text: 'What is your project budget range?',
        type: QUESTION_TYPES.SELECT,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        options: ['$3,000-$5,000', '$5,000-$10,000', '$10,000-$20,000', '$20,000-$50,000', '$50,000+'],
        hint: 'Selecting an accurate budget range helps us recommend the most suitable technology stack and features. Quality websites typically start at $3,000 for basic sites.'
      },
      {
        id: 'website_type',
        text: 'What type of website do you need?',
        type: QUESTION_TYPES.CONDITIONAL_WEBSITE_TYPE,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        requiresBudgetTier: true,
        hint: 'Choose the option that most closely matches your primary goal. This helps determine the necessary features and technical architecture.'
      },
      {
        id: 'multilingual',
        text: 'Do you need multilingual support?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        options: ['Yes', 'No', 'Not sure'],
        hint: 'If you plan to serve content in multiple languages, we can implement a translation system. Please specify which languages you need.'
      },
      {
        id: 'security_requirements',
        text: 'Do you have any specific security or compliance requirements?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.TECHNICAL,
        options: ['GDPR Compliance', 'HIPAA Compliance', 'PCI DSS Compliance', 'SSL Certificate', 'Other (please specify)'],
        hint: 'Select any compliance standards that apply to your business. This ensures we implement the necessary security measures.'
      },
      {
        id: 'existing_website',
        text: 'Do you have an existing website?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        options: ['Yes, we have an existing website', 'No, this is a new website'],
        hint: 'If you have an existing website, we\'ll need to assess its current state and plan for content migration or integration.'
      },
      {
        id: 'domain_hosting',
        text: 'Do you have a domain name and hosting?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.TECHNICAL,
        options: ['Yes, both domain and hosting', 'Yes, domain only', 'Yes, hosting only', 'No, need both'],
        hint: 'We can assist with domain registration and hosting setup if needed. Please let us know your current setup.'
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
        hint: 'Content development often takes longer than expected. We can help with strategy, writing, and optimization if needed.'
      },
      {
        id: 'content_help',
        text: 'What kind of content support do you need?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.CONTENT,
        options: ['Content writing', 'Copy editing', 'SEO optimization', 'Image sourcing', 'Content migration', 'Content strategy'],
        hint: 'Select any content-related services you need help with. We can provide professional writing and optimization services.'
      },
      {
        id: 'blog_requirements',
        text: 'Will you need a blog or news section?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.CONTENT,
        options: ['Yes, with regular updates', 'Yes, but updates will be infrequent', 'No blog needed'],
        hint: 'A blog can help with SEO and engage your audience. Let us know if you plan to maintain it regularly.'
      },
      {
        id: 'pages_needed',
        text: 'What pages will your website need?',
        type: QUESTION_TYPES.CHECKBOX,
        required: true,
        category: SCOPING_CATEGORIES.CONTENT,
        options: ['Home', 'About Us', 'Services/Products', 'Portfolio/Work', 'Blog/News', 'Contact', 'FAQ', 'Testimonials', 'Team', 'Pricing'],
        hint: 'Select all pages you anticipate needing. We can help you determine the best structure for your goals.'
      },
      {
        id: 'special_features',
        text: 'What special features do you need?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.CONTENT,
        options: ['Contact forms', 'Photo galleries', 'Video integration', 'Search functionality', 'User accounts', 'Online payments', 'Booking system', 'Membership area', 'E-commerce functionality'],
        hint: 'Select all features you anticipate needing. Each selection may impact development time and cost.'
      }
    ],
    
    [SCOPING_CATEGORIES.DESIGN]: [
      {
        id: 'brand_guidelines',
        text: 'Do you have brand guidelines or style guides?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.DESIGN,
        options: ['Yes, we have complete brand guidelines', 'We have some brand assets but no formal guidelines', 'No, we need help developing our brand identity'],
        hint: 'Brand guidelines ensure consistency across all marketing materials. We can help develop or refine your brand identity if needed.'
      },
      {
        id: 'design_style',
        text: 'What design style do you prefer?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.DESIGN,
        options: ['Modern and minimalist', 'Bold and colorful', 'Professional and corporate', 'Creative and artistic', 'Classic and traditional'],
        hint: 'Your selection will guide our design team in creating a visual direction that aligns with your brand personality.'
      },
      {
        id: 'design_dislikes',
        text: 'Are there any design elements you specifically want to avoid?',
        type: QUESTION_TYPES.TEXTAREA,
        required: false,
        category: SCOPING_CATEGORIES.DESIGN,
        hint: 'Please mention any colors, styles, or design elements you dislike or want to avoid in your website design.'
      },
      {
        id: 'inspiration_websites',
        text: 'Are there any websites you admire or want to use as inspiration?',
        type: QUESTION_TYPES.TEXTAREA,
        required: false,
        category: SCOPING_CATEGORIES.DESIGN,
        hint: 'Share 2-3 websites you like and explain what you like about them (e.g., layout, navigation, color scheme).'
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
        hint: 'Realistic timelines ensure quality results. Rushed projects may require additional resources. Typical projects take 8-12 weeks from kickoff to launch.'
      },
      {
        id: 'key_dates',
        text: 'Are there any key dates or events we should be aware of?',
        type: QUESTION_TYPES.TEXTAREA,
        required: false,
        category: SCOPING_CATEGORIES.TIMELINE,
        hint: 'Please list any important dates, events, or deadlines that could impact the project timeline (e.g., product launches, trade shows, marketing campaigns).'
      },
      {
        id: 'content_prep_time',
        text: 'How much time can you dedicate to content preparation?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.TIMELINE,
        options: ['1-2 hours per week', '3-5 hours per week', '5-10 hours per week', 'More than 10 hours per week'],
        hint: 'Understanding your availability helps us plan the content development phase more effectively.'
      }
    ],
    
    [SCOPING_CATEGORIES.INTEGRATIONS]: [
      {
        id: 'ecommerce_needs',
        text: 'Do you need e-commerce functionality?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.INTEGRATIONS,
        options: ['Yes, full e-commerce store', 'Yes, but just a few products', 'Not now, but possibly in the future', 'No e-commerce needed'],
        hint: 'E-commerce functionality includes product listings, shopping cart, and payment processing. Let us know your specific needs.'
      },
      {
        id: 'third_party_tools',
        text: 'Do you need integration with any third-party tools or services?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.INTEGRATIONS,
        options: ['CRM (e.g., Salesforce, HubSpot)', 'Email Marketing (e.g., Mailchimp, Constant Contact)', 'Payment Processors (e.g., Stripe, PayPal)', 'Scheduling Tools (e.g., Calendly, Acuity)', 'Social Media Platforms', 'Inventory Management', 'Other (please specify)'],
        hint: 'Select all third-party services you need to integrate with your website.'
      },
      {
        id: 'analytics_tracking',
        text: 'What kind of analytics and tracking do you need?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.INTEGRATIONS,
        options: ['Google Analytics', 'Google Tag Manager', 'Facebook Pixel', 'Conversion tracking', 'Heat mapping', 'User behavior tracking', 'E-commerce tracking'],
        hint: 'Select the analytics and tracking tools you need to measure your website\'s performance and user behavior.'
      },
      {
        id: 'user_accounts',
        text: 'Do you need user accounts or membership functionality?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.INTEGRATIONS,
        options: ['Yes, with different user roles', 'Yes, simple user accounts', 'Not now, but possibly in the future', 'No user accounts needed'],
        hint: 'User accounts allow visitors to create profiles, save preferences, or access member-only content.'
      },
      {
        id: 'api_integrations',
        text: 'Are there any specific APIs you need to integrate?',
        type: QUESTION_TYPES.TEXTAREA,
        required: false,
        category: SCOPING_CATEGORIES.INTEGRATIONS,
        hint: 'Please list any specific APIs or external services that need to be integrated with your website.'
      }
    ],
    
    [SCOPING_CATEGORIES.MAINTENANCE]: [
      {
        id: 'maintenance_plan',
        text: 'What level of ongoing maintenance will you need?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.MAINTENANCE,
        options: ['Full maintenance (updates, backups, security)', 'Occasional updates only', 'Emergency support only', 'Not sure'],
        hint: 'Regular maintenance ensures your website stays secure, up-to-date, and performing optimally.'
      },
      {
        id: 'training_needs',
        text: 'Will you need training on how to use the website?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.MAINTENANCE,
        options: ['Yes, comprehensive training', 'Basic training only', 'No training needed', 'Not sure'],
        hint: 'We offer training sessions to help you manage your website content effectively.'
      },
      {
        id: 'expected_traffic',
        text: 'What is your expected monthly website traffic?',
        type: QUESTION_TYPES.RADIO,
        required: true,
        category: SCOPING_CATEGORIES.MAINTENANCE,
        options: ['Under 1,000 visitors', '1,000-10,000 visitors', '10,000-50,000 visitors', '50,000+ visitors', 'Not sure'],
        hint: 'This helps us recommend the appropriate hosting plan and performance optimizations.'
      },
      {
        id: 'support_channels',
        text: 'What are your preferred support channels?',
        type: QUESTION_TYPES.CHECKBOX,
        required: false,
        category: SCOPING_CATEGORIES.MAINTENANCE,
        options: ['Email', 'Phone', 'Video call', 'Helpdesk ticket system', 'Live chat'],
        hint: 'Select all the ways you\'d prefer to receive support for your website.'
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