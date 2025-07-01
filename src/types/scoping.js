// Scoping System Data Types and Models

export const SCOPING_CATEGORIES = {
  BUSINESS: 'business',
  TECHNICAL: 'technical', 
  CONTENT: 'content',
  DESIGN: 'design',
  TIMELINE: 'timeline',
  INTEGRATIONS: 'integrations'
};

export const QUESTION_TYPES = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  NUMBER: 'number',
  DATE: 'date',
  FILE: 'file'
};

export const SCOPING_QUESTIONS = {
  [SCOPING_CATEGORIES.BUSINESS]: [
    {
      id: 'company_name',
      type: QUESTION_TYPES.TEXT,
      question: 'What is your company/organization name?',
      required: true,
      placeholder: 'Enter your company name',
      hint: 'This will be used throughout the project documentation'
    },
    {
      id: 'industry',
      type: QUESTION_TYPES.SELECT,
      question: 'What industry are you in?',
      required: true,
      options: [
        'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 
        'Manufacturing', 'Real Estate', 'Legal', 'Non-profit', 'Other'
      ],
      hint: 'Helps us understand your target audience and compliance needs'
    },
    {
      id: 'business_description',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'Describe your business and what you do',
      required: true,
      placeholder: 'Tell us about your business, products, or services...',
      hint: 'This helps us understand your brand voice and messaging needs'
    },
    {
      id: 'target_audience',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'Who is your target audience?',
      required: true,
      placeholder: 'Describe your ideal customers or users...',
      hint: 'Understanding your audience helps us design the right user experience'
    },
    {
      id: 'business_goals',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'What are your main business goals for this website?',
      required: true,
      placeholder: 'e.g., Generate leads, sell products, provide information...',
      hint: 'This drives the entire design and functionality strategy'
    },
    {
      id: 'current_website',
      type: QUESTION_TYPES.TEXT,
      question: 'Do you have an existing website? (URL)',
      required: false,
      placeholder: 'https://yourwebsite.com',
      hint: 'We\'ll analyze what works and what needs improvement'
    },
    {
      id: 'competitors',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'List 3-5 competitor websites you admire',
      required: false,
      placeholder: 'Include URLs and what you like about each...',
      hint: 'Helps us understand your market position and preferences'
    }
  ],

  [SCOPING_CATEGORIES.TECHNICAL]: [
    {
      id: 'website_type',
      type: QUESTION_TYPES.RADIO,
      question: 'What type of website do you need?',
      required: true,
      options: [
        { value: 'static', label: 'Static/Brochure Website', description: 'Information-focused, minimal interactivity' },
        { value: 'dynamic', label: 'Dynamic Website', description: 'Database-driven with user interactions' },
        { value: 'ecommerce', label: 'E-commerce Store', description: 'Online store with payment processing' },
        { value: 'webapp', label: 'Web Application', description: 'Complex functionality and user accounts' },
        { value: 'portal', label: 'Customer/Member Portal', description: 'Login-based access to resources' }
      ],
      hint: 'This determines the technical architecture and development approach'
    },
    {
      id: 'hosting_preference',
      type: QUESTION_TYPES.RADIO,
      question: 'Do you have hosting preferences?',
      required: true,
      options: [
        { value: 'managed', label: 'We handle hosting (recommended)', description: 'We manage everything for you' },
        { value: 'existing', label: 'Use my existing hosting', description: 'You have hosting we can use' },
        { value: 'specific', label: 'Specific hosting requirements', description: 'You need particular hosting setup' }
      ],
      hint: 'Affects deployment strategy and ongoing maintenance'
    },
    {
      id: 'hosting_details',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'Please provide hosting details or requirements',
      required: false,
      conditional: { field: 'hosting_preference', values: ['existing', 'specific'] },
      placeholder: 'Hosting provider, server specs, special requirements...',
      hint: 'Include any technical constraints or requirements'
    },
    {
      id: 'cms_needed',
      type: QUESTION_TYPES.RADIO,
      question: 'Do you need to update content yourself?',
      required: true,
      options: [
        { value: 'yes_easy', label: 'Yes, I need an easy content management system' },
        { value: 'yes_advanced', label: 'Yes, I need advanced content management' },
        { value: 'no', label: 'No, you can handle all updates' },
        { value: 'unsure', label: 'I\'m not sure what I need' }
      ],
      hint: 'Determines if we need to build a CMS or admin interface'
    },
    {
      id: 'user_accounts',
      type: QUESTION_TYPES.RADIO,
      question: 'Will users need to create accounts or log in?',
      required: true,
      options: [
        { value: 'no', label: 'No user accounts needed' },
        { value: 'simple', label: 'Simple login (email/password)' },
        { value: 'social', label: 'Social login (Google, Facebook, etc.)' },
        { value: 'advanced', label: 'Advanced user management with roles' }
      ],
      hint: 'Affects security requirements and development complexity'
    },
    {
      id: 'mobile_requirements',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'Mobile and device requirements',
      required: true,
      options: [
        'Responsive design (works on all devices)',
        'Mobile-first design approach',
        'Progressive Web App (PWA) features',
        'Native mobile app integration',
        'Tablet-optimized layouts'
      ],
      hint: 'Most websites should be responsive at minimum'
    },
    {
      id: 'performance_requirements',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'Performance and technical requirements',
      required: false,
      options: [
        'Fast loading speeds (under 3 seconds)',
        'SEO optimization',
        'Accessibility compliance (WCAG)',
        'Multi-language support',
        'High traffic handling',
        'Advanced security features',
        'Analytics and tracking setup'
      ],
      hint: 'Select all that apply to your needs'
    }
  ],

  [SCOPING_CATEGORIES.CONTENT]: [
    {
      id: 'content_ready',
      type: QUESTION_TYPES.RADIO,
      question: 'How ready is your content?',
      required: true,
      options: [
        { value: 'ready', label: 'All content is ready', description: 'Text, images, videos are prepared' },
        { value: 'partial', label: 'Some content ready', description: 'Have some content, need help with rest' },
        { value: 'outline', label: 'Have outline/structure', description: 'Know what content is needed' },
        { value: 'help', label: 'Need content creation help', description: 'Need assistance creating content' }
      ],
      hint: 'Content readiness affects timeline and project scope'
    },
    {
      id: 'content_types',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'What types of content will you have?',
      required: true,
      options: [
        'Text content (pages, articles)',
        'Images and photos',
        'Videos',
        'Documents/PDFs',
        'Blog posts',
        'Product catalogs',
        'Testimonials/reviews',
        'Case studies',
        'News/announcements',
        'FAQ section',
        'Contact information',
        'Team/staff profiles'
      ],
      hint: 'Helps us plan the content structure and management system'
    },
    {
      id: 'content_volume',
      type: QUESTION_TYPES.SELECT,
      question: 'Approximately how many pages will your website have?',
      required: true,
      options: [
        '1-5 pages (simple brochure)',
        '6-15 pages (standard business site)',
        '16-50 pages (larger business site)',
        '51-100 pages (complex site)',
        '100+ pages (large site/catalog)',
        'Unsure - need help determining'
      ],
      hint: 'Affects development time and content management needs'
    },
    {
      id: 'blog_needed',
      type: QUESTION_TYPES.RADIO,
      question: 'Do you need a blog or news section?',
      required: true,
      options: [
        { value: 'yes', label: 'Yes, with full blogging features' },
        { value: 'simple', label: 'Simple news/updates section' },
        { value: 'no', label: 'No blog needed' },
        { value: 'future', label: 'Maybe in the future' }
      ],
      hint: 'Blogs require content management and can help with SEO'
    },
    {
      id: 'content_updates',
      type: QUESTION_TYPES.RADIO,
      question: 'How often will content be updated?',
      required: true,
      options: [
        { value: 'daily', label: 'Daily or multiple times per week' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'rarely', label: 'Rarely (few times per year)' },
        { value: 'never', label: 'Almost never' }
      ],
      hint: 'Determines the type of content management system needed'
    },
    {
      id: 'seo_keywords',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'What keywords should your website rank for?',
      required: false,
      placeholder: 'List important keywords and phrases for your business...',
      hint: 'These will guide our SEO strategy and content optimization'
    }
  ],

  [SCOPING_CATEGORIES.DESIGN]: [
    {
      id: 'design_style',
      type: QUESTION_TYPES.RADIO,
      question: 'What design style do you prefer?',
      required: true,
      options: [
        { value: 'modern', label: 'Modern & Clean', description: 'Minimalist, lots of white space' },
        { value: 'professional', label: 'Professional & Corporate', description: 'Traditional business look' },
        { value: 'creative', label: 'Creative & Artistic', description: 'Unique, eye-catching design' },
        { value: 'playful', label: 'Fun & Playful', description: 'Colorful, engaging, informal' },
        { value: 'luxury', label: 'Luxury & Premium', description: 'Elegant, sophisticated' },
        { value: 'technical', label: 'Technical & Data-focused', description: 'Clean, functional, information-dense' }
      ],
      hint: 'This sets the overall visual direction for your website'
    },
    {
      id: 'color_preferences',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'Do you have brand colors or color preferences?',
      required: false,
      placeholder: 'Describe your brand colors or color preferences...',
      hint: 'Include hex codes if you have them, or describe the mood you want'
    },
    {
      id: 'existing_branding',
      type: QUESTION_TYPES.RADIO,
      question: 'Do you have existing branding materials?',
      required: true,
      options: [
        { value: 'complete', label: 'Complete brand guidelines' },
        { value: 'logo', label: 'Logo and basic colors' },
        { value: 'partial', label: 'Some branding elements' },
        { value: 'none', label: 'No existing branding' }
      ],
      hint: 'Existing branding will guide the design direction'
    },
    {
      id: 'inspiration_sites',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'Share 3-5 websites you love the design of',
      required: false,
      placeholder: 'Include URLs and what you like about each design...',
      hint: 'This helps us understand your aesthetic preferences'
    },
    {
      id: 'layout_preferences',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'Layout and structure preferences',
      required: false,
      options: [
        'Full-width hero section',
        'Sidebar navigation',
        'Sticky/fixed header',
        'Footer with lots of links',
        'Image galleries/sliders',
        'Video backgrounds',
        'Parallax scrolling effects',
        'Animation and micro-interactions'
      ],
      hint: 'Select elements you definitely want or definitely don\'t want'
    },
    {
      id: 'imagery_style',
      type: QUESTION_TYPES.RADIO,
      question: 'What style of imagery do you prefer?',
      required: true,
      options: [
        { value: 'photos', label: 'Professional photography' },
        { value: 'stock', label: 'High-quality stock photos' },
        { value: 'illustrations', label: 'Custom illustrations' },
        { value: 'icons', label: 'Icons and graphics' },
        { value: 'mixed', label: 'Mix of photos and graphics' },
        { value: 'minimal', label: 'Minimal imagery' }
      ],
      hint: 'Affects the visual style and budget for imagery'
    }
  ],

  [SCOPING_CATEGORIES.TIMELINE]: [
    {
      id: 'launch_deadline',
      type: QUESTION_TYPES.DATE,
      question: 'Do you have a specific launch deadline?',
      required: false,
      hint: 'Hard deadlines affect project scope and pricing'
    },
    {
      id: 'urgency_level',
      type: QUESTION_TYPES.RADIO,
      question: 'How urgent is this project?',
      required: true,
      options: [
        { value: 'asap', label: 'ASAP - Very urgent' },
        { value: 'month', label: 'Within a month' },
        { value: 'quarter', label: 'Within 2-3 months' },
        { value: 'flexible', label: 'Flexible timeline' }
      ],
      hint: 'Urgent projects may require rush fees or reduced scope'
    },
    {
      id: 'budget_range',
      type: QUESTION_TYPES.SELECT,
      question: 'What is your budget range for this project?',
      required: true,
      options: [
        'Under $5,000',
        '$5,000 - $10,000',
        '$10,000 - $25,000',
        '$25,000 - $50,000',
        '$50,000 - $100,000',
        'Over $100,000',
        'I need help determining budget'
      ],
      hint: 'Budget helps us recommend the right approach and features'
    },
    {
      id: 'budget_flexibility',
      type: QUESTION_TYPES.RADIO,
      question: 'How flexible is your budget?',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed - cannot exceed budget' },
        { value: 'some', label: 'Some flexibility for important features' },
        { value: 'flexible', label: 'Flexible - value is most important' }
      ],
      hint: 'Helps us prioritize features within your constraints'
    },
    {
      id: 'project_phases',
      type: QUESTION_TYPES.RADIO,
      question: 'Are you open to a phased approach?',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - launch MVP then add features' },
        { value: 'maybe', label: 'Maybe - depends on the plan' },
        { value: 'no', label: 'No - need everything at launch' }
      ],
      hint: 'Phased development can reduce initial costs and risks'
    }
  ],

  [SCOPING_CATEGORIES.INTEGRATIONS]: [
    {
      id: 'payment_processing',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'Do you need payment processing?',
      required: false,
      options: [
        'Credit card payments',
        'PayPal integration',
        'Stripe integration',
        'Subscription/recurring payments',
        'Invoice generation',
        'Multiple currencies',
        'Tax calculation'
      ],
      hint: 'Payment processing adds complexity and compliance requirements'
    },
    {
      id: 'email_marketing',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'Email marketing and communication tools',
      required: false,
      options: [
        'Newsletter signup',
        'Mailchimp integration',
        'Constant Contact integration',
        'Automated email sequences',
        'Contact form submissions',
        'Email notifications'
      ],
      hint: 'Email integration helps with lead generation and customer communication'
    },
    {
      id: 'social_media',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'Social media integrations needed',
      required: false,
      options: [
        'Social media feeds',
        'Social sharing buttons',
        'Facebook Pixel',
        'Instagram feed',
        'Twitter integration',
        'LinkedIn integration',
        'Social login options'
      ],
      hint: 'Social integration can increase engagement and reach'
    },
    {
      id: 'analytics_tracking',
      type: QUESTION_TYPES.CHECKBOX,
      question: 'Analytics and tracking requirements',
      required: false,
      options: [
        'Google Analytics',
        'Google Tag Manager',
        'Facebook Pixel',
        'Conversion tracking',
        'Heat mapping (Hotjar)',
        'A/B testing capability',
        'Custom event tracking'
      ],
      hint: 'Analytics help measure success and optimize performance'
    },
    {
      id: 'third_party_tools',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'Other third-party tools or services to integrate',
      required: false,
      placeholder: 'CRM systems, booking tools, inventory management, etc...',
      hint: 'List any existing tools that need to connect to your website'
    },
    {
      id: 'api_requirements',
      type: QUESTION_TYPES.TEXTAREA,
      question: 'Do you need custom API integrations?',
      required: false,
      placeholder: 'Describe any custom integrations or data connections needed...',
      hint: 'Custom APIs require additional development time and expertise'
    }
  ]
};

export const SUBMISSION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  NEEDS_CLARIFICATION: 'needs_clarification',
  APPROVED: 'approved',
  IN_DEVELOPMENT: 'in_development'
};

// Helper functions
export const getCategoryQuestions = (category) => {
  return SCOPING_QUESTIONS[category] || [];
};

export const getAllQuestions = () => {
  return Object.values(SCOPING_QUESTIONS).flat();
};

export const getQuestionById = (questionId) => {
  return getAllQuestions().find(q => q.id === questionId);
};

export const validateAnswer = (question, answer) => {
  if (question.required && (!answer || answer.toString().trim() === '')) {
    return 'This field is required';
  }
  
  if (question.type === QUESTION_TYPES.NUMBER && answer && isNaN(answer)) {
    return 'Please enter a valid number';
  }
  
  return null;
};

export const shouldShowQuestion = (question, answers) => {
  if (!question.conditional) return true;
  
  const { field, values } = question.conditional;
  const fieldValue = answers[field];
  
  return values.includes(fieldValue);
};

