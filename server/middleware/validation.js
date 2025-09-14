const { body, validationResult } = require('express-validator');

// Validation rules for form submission
const validateFormSubmission = [
  body('answers')
    .isObject()
    .withMessage('Answers must be an object')
    .custom((value) => {
      if (Object.keys(value).length === 0) {
        throw new Error('Answers cannot be empty');
      }
      return true;
    }),
  
  // Company name validation
  body('answers.company_name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name must be between 1 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-&.,()]+$/)
    .withMessage('Company name contains invalid characters'),
  
  // Industry validation
  body('answers.industry')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Industry must be between 1 and 50 characters'),
  
  // Email validation
  body('answers.email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  // URL validation
  body('answers.website')
    .optional()
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Please provide a valid website URL'),
  
  // Text area fields validation
  body('answers.target_audience')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Target audience description must be less than 1000 characters'),
  
  body('answers.business_goals')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Business goals description must be less than 1000 characters'),
  
  // Budget range validation
  body('answers.budget_range')
    .optional()
    .isIn(['$500-$1,000', '$1,000-$2,000', '$2,000-$5,000', '$5,000-$10,000', '$10,000+'])
    .withMessage('Invalid budget range selected'),
  
  // Timeline validation
  body('answers.launch_deadline')
    .optional()
    .isIn(['ASAP (rush job)', 'Within 2-4 weeks', 'Within 1-2 months', 'Within 3-6 months', 'No specific deadline'])
    .withMessage('Invalid launch deadline selected'),
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));
    
    return res.status(400).json({
      error: 'Validation failed',
      details: formattedErrors
    });
  }
  
  next();
};

// Sanitization middleware
const sanitizeInput = (req, res, next) => {
  if (req.body && req.body.answers) {
    // Remove any potentially dangerous HTML/script tags
    const sanitizeString = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .trim();
    };

    // Recursively sanitize all string values
    const sanitizeObject = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = sanitizeString(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      }
    };

    sanitizeObject(req.body.answers);
  }
  
  next();
};

// Rate limiting configuration
const rateLimit = require('express-rate-limit');

const createRateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: 'Too many requests',
      message: 'Please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Form submission rate limit (stricter)
const formSubmissionRateLimit = createRateLimit(15 * 60 * 1000, 10); // 10 submissions per 15 minutes

// General API rate limit
const generalRateLimit = createRateLimit(15 * 60 * 1000, 100); // 100 requests per 15 minutes

module.exports = {
  validateFormSubmission,
  handleValidationErrors,
  sanitizeInput,
  formSubmissionRateLimit,
  generalRateLimit
};