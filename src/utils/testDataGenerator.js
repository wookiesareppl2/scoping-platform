// Test Data Generator for Form Fields
import { SCOPING_CATEGORIES, BUDGET_TIERS, BUDGET_WEBSITE_TYPES, FULL_WEBSITE_TYPES } from '../types/scoping';

export const generateTestData = () => {
  const testData = {
    // Business & Brand
    company_name: 'Acme Digital Solutions',
    industry: 'Technology Consulting',
    unique_value: 'We combine cutting-edge technology with deep industry expertise to deliver customized digital solutions that drive real business results. Our agile approach and dedicated team set us apart from larger, less flexible competitors.',
    target_audience: 'Small to medium-sized businesses (5-200 employees) in the technology and professional services sectors, primarily in urban areas, who value personalized service and innovative solutions to their digital challenges.',
    business_goals: '1. Increase qualified lead generation by 40% in the next 12 months. 2. Establish thought leadership through our blog and resources section. 3. Streamline client onboarding with automated workflows. 4. Improve client retention through better engagement tools.',

    // Technical Requirements
    budget_tier: BUDGET_TIERS.FULL_BUDGET,
    website_type: FULL_WEBSITE_TYPES.BUSINESS_ADVANCED,
    existing_website: 'Yes, we have an existing website',
    domain_hosting: 'Yes, both domain and hosting',
    multilingual: 'Yes',
    security_requirements: ['GDPR Compliance', 'SSL Certificate'],
    mobile_app: 'Potentially in the future',

    // Content & Functionality
    content_ready: 'Some content is ready',
    content_help: ['Content writing', 'SEO optimization', 'Image sourcing'],
    blog_requirements: 'Yes, with regular updates',
    pages_needed: ['Home', 'About Us', 'Services/Products', 'Portfolio/Work', 'Blog/News', 'Contact'],
    special_features: ['Contact forms', 'Photo galleries', 'Blog/news section', 'Search functionality'],

    // Design Preferences
    design_style: 'Modern and minimalist',
    brand_guidelines: 'Yes, we have complete brand guidelines',
    design_dislikes: 'Cluttered layouts, auto-playing videos, pop-ups that are hard to close',
    inspiration_websites: 'We love the clean design of https://stripe.com and the user experience of https://notion.so. We want something professional but approachable, with smooth animations and clear call-to-action buttons.',
    
    // E-commerce & Integrations
    ecommerce_needs: 'Yes, full e-commerce store',
    third_party_tools: [
      'CRM (e.g., Salesforce, HubSpot)',
      'Email Marketing (e.g., Mailchimp, Constant Contact)',
      'Payment Processors (e.g., Stripe, PayPal)',
      'Scheduling Tools (e.g., Calendly, Acuity)'
    ],
    user_accounts: 'Yes, with different user roles',
    api_integrations: 'We need to integrate with our existing CRM (Salesforce) and payment gateway (Stripe).',
    
    // Timeline & Budget
    launch_deadline: 'Within 1-2 months',
    key_dates: 'Product launch in Q2, Industry conference in September',
    content_prep_time: '3-5 hours per week',
    budget_range: '$5,000-$10,000',
    ecommerce: random(['Yes, we need full e-commerce functionality', 'Not now, but possibly in the future', 'No e-commerce needed']),
    user_accounts: random(['Yes, with different permission levels', 'Simple user accounts only', 'No user accounts needed']),
    api_integrations: randomMultiple([
      'Payment gateway', 'Shipping providers', 'Inventory management',
      'Email service', 'CRM', 'Marketing automation', 'Single sign-on (SSO)'
    ], 0, 3),

    // Maintenance & Support
    maintenance_plan: 'Full maintenance (updates, backups, security)',
    training_needs: 'Yes, comprehensive training',
    expected_traffic: '1,000-10,000 visitors',
    support_channels: ['Email', 'Phone', 'Helpdesk ticket system']
  };

  return testData;
};

export const generateRandomTestData = () => {
  const companies = [
    'Acme Digital Solutions',
    'Bright Future Marketing',
    'Green Valley Consulting',
    'Urban Design Studio',
    'Coastal Tech Partners',
    'Mountain View Analytics'
  ];

  const industries = [
    'Technology Consulting',
    'Digital Marketing',
    'Healthcare Services',
    'Real Estate',
    'E-commerce',
    'Professional Services'
  ];

  const audiences = [
    'Small to medium-sized businesses looking to improve their digital presence',
    'Young professionals aged 25-40 seeking premium services',
    'Local families and community members in our service area',
    'Enterprise clients requiring scalable solutions',
    'Creative professionals and agencies needing portfolio showcases',
    'Healthcare providers wanting to connect with patients online'
  ];

  const goals = [
    'Increase online visibility and generate qualified leads through our website',
    'Showcase our portfolio and establish credibility in our industry',
    'Provide excellent user experience and convert visitors to customers',
    'Streamline our business processes and improve client communication',
    'Build a strong brand presence and compete with industry leaders',
    'Create an efficient platform for our services and customer support'
  ];

  const inspirationSites = [
    'https://stripe.com - love their clean, professional design',
    'https://notion.so - excellent user experience and intuitive interface',
    'https://airbnb.com - great use of imagery and smooth interactions',
    'https://slack.com - clear messaging and effective call-to-actions',
    'https://figma.com - modern design with great visual hierarchy',
    'https://shopify.com - professional yet approachable branding'
  ];

  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomMultiple = (arr, min = 1, max = 3) => {
    const count = Math.min(arr.length, Math.floor(Math.random() * (max - min + 1)) + min);
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  return {
    // Business & Brand
    company_name: random(companies),
    industry: random(industries),
    unique_value: `We stand out through ${random(['innovative solutions', 'exceptional customer service', 'industry expertise', 'competitive pricing', 'rapid delivery'])} and ${random(['personalized approach', 'cutting-edge technology', 'proven methodology', 'dedicated support'])}.`,
    target_audience: random(audiences),
    business_goals: `${random(goals)} Specifically, we aim to ${random(['increase our market share', 'improve customer engagement', 'streamline operations', 'expand to new markets', 'launch new products/services'])}.`,

    // Technical Requirements
    budget_tier: Math.random() > 0.3 ? BUDGET_TIERS.FULL_BUDGET : BUDGET_TIERS.BUDGET_CONSTRAINED,
    website_type: Math.random() > 0.5 ? FULL_WEBSITE_TYPES.BUSINESS_ADVANCED : BUDGET_WEBSITE_TYPES.BUSINESS_STATIC,
    existing_website: Math.random() > 0.4 ? 'Yes, we have an existing website' : 'No, this is a new website',
    domain_hosting: random(['Yes, both domain and hosting', 'Yes, domain only', 'Yes, hosting only', 'No, need both']),
    multilingual: random(['Yes', 'No', 'Not sure']),
    security_requirements: randomMultiple(['GDPR Compliance', 'HIPAA Compliance', 'PCI DSS Compliance', 'SSL Certificate', 'Other (please specify)'], 1, 3),
    mobile_app: random(['Yes, we need a mobile app', 'Potentially in the future', 'No, just a responsive website']),

    // Content & Functionality
    content_ready: random(['All content is ready', 'Some content is ready', 'Content needs to be created', 'Need help with content strategy']),
    content_help: randomMultiple(['Content writing', 'Copy editing', 'SEO optimization', 'Image sourcing', 'Content migration', 'Content strategy'], 1, 4),
    blog_requirements: random(['Yes, with regular updates', 'Yes, but updates will be infrequent', 'No blog needed']),
    pages_needed: randomMultiple(['Home', 'About Us', 'Services/Products', 'Portfolio/Work', 'Blog/News', 'Contact', 'FAQ', 'Testimonials', 'Team', 'Pricing'], 3, 8),
    special_features: randomMultiple([
      'Contact forms', 'Photo galleries', 'Blog/news section', 'User accounts', 'Search functionality',
      'E-commerce functionality', 'Booking system', 'Membership area', 'Event calendar', 'Testimonials',
      'Resource library', 'Client portal', 'Live chat', 'Newsletter signup', 'Interactive maps'
    ], 3, 7),

    // Design Preferences
    design_style: random(['Modern and minimalist', 'Bold and colorful', 'Professional and corporate', 'Creative and artistic', 'Classic and traditional']),
    brand_guidelines: random(['Yes, we have complete brand guidelines', 'We have some brand assets but no formal guidelines', 'No, we need help developing our brand identity']),
    design_dislikes: random([
      'Auto-playing videos', 'Pop-ups that are hard to close', 'Too many animations',
      'Poor mobile experience', 'Cluttered layouts', 'Small text that is hard to read'
    ]),
    inspiration_websites: random(inspirationSites),
    
    // E-commerce & Integrations
    ecommerce_needs: random(['Yes, full e-commerce store', 'Yes, but just a few products', 'Not now, but possibly in the future', 'No e-commerce needed']),
    third_party_tools: randomMultiple([
      'CRM (e.g., Salesforce, HubSpot)',
      'Email Marketing (e.g., Mailchimp, Constant Contact)',
      'Payment Processors (e.g., Stripe, PayPal)',
      'Scheduling Tools (e.g., Calendly, Acuity)',
      'Social Media Platforms',
      'Inventory Management',
      'Other (please specify)'
    ], 1, 4),
    user_accounts: random(['Yes, with different user roles', 'Yes, simple user accounts', 'Not now, but possibly in the future', 'No user accounts needed']),
    api_integrations: random([
      'We need to integrate with our existing CRM and payment gateway',
      'We need API connections to our inventory management system',
      'We need to connect with our email marketing platform',
      'No specific API integrations needed at this time'
    ]),
    
    // Maintenance & Support
    maintenance_plan: random(['Full maintenance (updates, backups, security)', 'Occasional updates only', 'Emergency support only', 'Not sure']),
    training_needs: random(['Yes, comprehensive training', 'Basic training only', 'No training needed', 'Not sure']),
    expected_traffic: random(['Under 1,000 visitors', '1,000-10,000 visitors', '10,000-50,000 visitors', '50,000+ visitors', 'Not sure']),
    support_channels: randomMultiple(['Email', 'Phone', 'Video call', 'Helpdesk ticket system', 'Live chat'], 1, 3),

    // Timeline & Budget
    launch_deadline: random(['ASAP (rush job)', 'Within 2-4 weeks', 'Within 1-2 months', 'Within 3-6 months', 'No specific deadline']),
    key_dates: random([
      'Product launch in Q2',
      'Industry conference in September',
      'Holiday season promotions',
      'Fiscal year start/end',
      'No specific dates'
    ]),
    content_prep_time: random(['1-2 hours per week', '3-5 hours per week', '5-10 hours per week', 'More than 10 hours per week']),
    budget_range: random(['$1,000-$3,000', '$3,000-$5,000', '$5,000-$10,000', '$10,000-$20,000', '$20,000+']),

    // Third-Party Integrations
    third_party_tools: ['Google Analytics', 'Social media platforms', 'Email marketing (MailChimp, etc.)'].slice(0, Math.floor(Math.random() * 3) + 1),
    analytics_tracking: ['Google Analytics', 'Conversion tracking'].slice(0, Math.floor(Math.random() * 2) + 1)
  };
};