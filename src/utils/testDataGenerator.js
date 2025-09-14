// Test Data Generator for Form Fields
import { SCOPING_CATEGORIES, BUDGET_TIERS, BUDGET_WEBSITE_TYPES, FULL_WEBSITE_TYPES } from '../types/scoping';

export const generateTestData = () => {
  const testData = {
    // Business & Brand
    company_name: 'Acme Digital Solutions',
    industry: 'Technology Consulting',
    target_audience: 'Small to medium-sized businesses looking to improve their digital presence and streamline their operations through custom web applications.',
    business_goals: 'We want to establish ourselves as the leading digital transformation partner in our region. Our main goals include increasing online visibility, generating qualified leads, showcasing our portfolio of successful projects, and providing an easy way for potential clients to request consultations.',

    // Technical Requirements
    budget_tier: BUDGET_TIERS.FULL_BUDGET,
    website_type: FULL_WEBSITE_TYPES.BUSINESS_ADVANCED,
    existing_website: 'Yes, we have an existing website',
    domain_hosting: 'Yes, both domain and hosting',

    // Content & Functionality
    content_ready: 'Some content is ready',
    pages_needed: '11-20 pages',
    special_features: ['Contact forms', 'Photo galleries', 'Blog/news section', 'User accounts', 'Search functionality'],

    // Design Preferences
    design_style: 'Modern and minimalist',
    brand_colors: 'Yes, we have specific brand colors',
    inspiration_websites: 'We love the clean design of https://stripe.com and the user experience of https://notion.so. We want something professional but approachable, with smooth animations and clear call-to-action buttons.',

    // Timeline & Budget
    launch_deadline: 'Within 1-2 months',
    budget_range: '$5,000-$10,000',

    // Third-Party Integrations
    third_party_tools: ['Google Analytics', 'Email marketing (MailChimp, etc.)', 'CRM systems', 'Social media platforms'],
    analytics_tracking: ['Google Analytics', 'Conversion tracking', 'User behavior tracking']
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

  return {
    // Business & Brand
    company_name: random(companies),
    industry: random(industries),
    target_audience: random(audiences),
    business_goals: random(goals),

    // Technical Requirements
    budget_tier: Math.random() > 0.3 ? BUDGET_TIERS.FULL_BUDGET : BUDGET_TIERS.BUDGET_CONSTRAINED,
    website_type: Math.random() > 0.5 ? FULL_WEBSITE_TYPES.BUSINESS_ADVANCED : BUDGET_WEBSITE_TYPES.BUSINESS_STATIC,
    existing_website: Math.random() > 0.4 ? 'Yes, we have an existing website' : 'No, this is a new website',
    domain_hosting: random(['Yes, both domain and hosting', 'Yes, domain only', 'No, need both']),

    // Content & Functionality
    content_ready: random(['All content is ready', 'Some content is ready', 'Content needs to be created']),
    pages_needed: random(['1-5 pages', '6-10 pages', '11-20 pages', '21-50 pages']),
    special_features: ['Contact forms', 'Photo galleries', 'Blog/news section'].slice(0, Math.floor(Math.random() * 3) + 1),

    // Design Preferences
    design_style: random(['Modern and minimalist', 'Bold and colorful', 'Professional and corporate', 'Creative and artistic']),
    brand_colors: random(['Yes, we have specific brand colors', 'We have some ideas but need guidance', 'No, we need help choosing colors']),
    inspiration_websites: random(inspirationSites),

    // Timeline & Budget
    launch_deadline: random(['Within 2-4 weeks', 'Within 1-2 months', 'Within 3-6 months', 'No specific deadline']),
    budget_range: random(['$1,000-$2,000', '$2,000-$5,000', '$5,000-$10,000', '$10,000+']),

    // Third-Party Integrations
    third_party_tools: ['Google Analytics', 'Social media platforms', 'Email marketing (MailChimp, etc.)'].slice(0, Math.floor(Math.random() * 3) + 1),
    analytics_tracking: ['Google Analytics', 'Conversion tracking'].slice(0, Math.floor(Math.random() * 2) + 1)
  };
};