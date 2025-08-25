import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Eye,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const HelpfulHints = ({ questionId, questionType, category }) => {
  const [expandedHint, setExpandedHint] = useState(null);

  // Comprehensive hints database
  const hintsDatabase = {
    // Business & Brand hints
    company_name: {
      type: 'info',
      title: 'Company Name Tips',
      content: 'Use your official business name as it appears on legal documents. This will be used throughout your project documentation and proposals.',
      examples: ['Acme Corporation', 'Smith & Associates LLC', 'TechStart Solutions Inc.']
    },
    industry: {
      type: 'info',
      title: 'Industry Selection',
      content: 'Choose the industry that best represents your primary business focus. This helps us understand compliance requirements and target audience.',
      examples: ['Technology (SaaS, Apps)', 'Healthcare (Medical, Wellness)', 'Finance (Banking, Insurance)']
    },
    business_description: {
      type: 'tip',
      title: 'Effective Business Descriptions',
      content: 'Describe what you do, who you serve, and what makes you unique. Focus on benefits rather than just features.',
      examples: [
        'We help small businesses streamline their accounting with cloud-based software that saves time and reduces errors.',
        'A boutique marketing agency specializing in sustainable brands, helping eco-conscious companies tell their story.',
        'We provide 24/7 IT support for medical practices, ensuring HIPAA compliance and minimal downtime.'
      ],
      goodExample: 'We help small businesses streamline their accounting with cloud-based software that saves time and reduces errors.',
      badExample: 'We do accounting software.'
    },
    target_audience: {
      type: 'tip',
      title: 'Defining Your Target Audience',
      content: 'Be specific about demographics, pain points, and behaviors. The more detailed, the better we can design for them.',
      examples: [
        'Small business owners (10-50 employees) who struggle with manual bookkeeping and want to save time',
        'Health-conscious millennials (25-40) who value sustainability and are willing to pay premium for eco-friendly products',
        'Medical practice managers who need reliable IT support but lack technical expertise'
      ],
      questions: [
        'What age range is your typical customer?',
        'What problems do they face that you solve?',
        'Where do they typically look for solutions?',
        'What\'s their technical comfort level?'
      ]
    },

    // Technical hints
    website_type: {
      type: 'comparison',
      title: 'Website Type Comparison',
      content: 'Different website types serve different purposes and have varying complexity levels.',
      options: [
        {
          type: 'Static Website',
          description: 'Perfect for: Brochures, portfolios, simple business sites',
          pros: ['Fast loading', 'Low cost', 'Easy maintenance'],
          cons: ['Limited interactivity', 'No user accounts'],
          timeline: '2-4 weeks'
        },
        {
          type: 'Dynamic Website',
          description: 'Perfect for: Business sites with forms, basic CMS',
          pros: ['Content management', 'Contact forms', 'Basic interactivity'],
          cons: ['More complex', 'Higher cost'],
          timeline: '4-8 weeks'
        },
        {
          type: 'E-commerce',
          description: 'Perfect for: Online stores, product catalogs',
          pros: ['Payment processing', 'Inventory management', 'Customer accounts'],
          cons: ['Complex setup', 'Ongoing maintenance'],
          timeline: '8-16 weeks'
        }
      ]
    },
    hosting_preference: {
      type: 'info',
      title: 'Hosting Options Explained',
      content: 'Different hosting options have different benefits and responsibilities.',
      examples: [
        'Managed hosting: We handle everything (recommended for most clients)',
        'Your hosting: You have existing hosting we can use',
        'Specific requirements: You need particular server configurations'
      ]
    },

    // Content hints
    content_ready: {
      type: 'checklist',
      title: 'Content Readiness Checklist',
      content: 'Assess how much of your content is ready for the website.',
      checklist: [
        'Written copy for all main pages',
        'High-quality images and photos',
        'Logo and brand assets',
        'Product descriptions (if applicable)',
        'Team bios and photos',
        'Testimonials and reviews',
        'Contact information',
        'Legal pages (privacy policy, terms)'
      ]
    },
    content_volume: {
      type: 'guide',
      title: 'Estimating Page Count',
      content: 'Consider all the pages your website will need, including hidden ones.',
      categories: [
        {
          name: 'Main Pages',
          examples: ['Home', 'About', 'Services', 'Contact']
        },
        {
          name: 'Service/Product Pages',
          examples: ['Individual service pages', 'Product detail pages']
        },
        {
          name: 'Content Pages',
          examples: ['Blog posts', 'Case studies', 'FAQ']
        },
        {
          name: 'Legal Pages',
          examples: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
        }
      ]
    },

    // Design hints
    design_style: {
      type: 'visual',
      title: 'Design Style Guide',
      content: 'Different design styles convey different messages about your brand.',
      styles: [
        {
          name: 'Modern & Clean',
          description: 'Minimalist, lots of white space, clean typography',
          goodFor: 'Tech companies, startups, professional services',
          characteristics: ['Simple layouts', 'Plenty of white space', 'Sans-serif fonts']
        },
        {
          name: 'Professional & Corporate',
          description: 'Traditional, trustworthy, established look',
          goodFor: 'Law firms, financial services, established businesses',
          characteristics: ['Structured layouts', 'Conservative colors', 'Formal typography']
        },
        {
          name: 'Creative & Artistic',
          description: 'Unique, eye-catching, expressive design',
          goodFor: 'Creative agencies, artists, entertainment',
          characteristics: ['Bold colors', 'Unique layouts', 'Custom graphics']
        }
      ]
    },

    // Timeline hints
    budget_range: {
      type: 'breakdown',
      title: 'Budget Breakdown Guide',
      content: 'Understanding what different budget ranges typically include.',
      ranges: [
        {
          range: 'Under $5,000',
          includes: ['Simple static website', 'Basic design', 'Standard features'],
          timeline: '2-4 weeks',
          pages: '5-10 pages'
        },
        {
          range: '$5,000 - $10,000',
          includes: ['Custom design', 'Content management', 'Mobile optimization'],
          timeline: '4-8 weeks',
          pages: '10-20 pages'
        },
        {
          range: '$10,000 - $25,000',
          includes: ['Advanced features', 'E-commerce', 'Custom development'],
          timeline: '8-16 weeks',
          pages: '20+ pages'
        }
      ]
    }
  };

  const getHintForQuestion = (questionId) => {
    return hintsDatabase[questionId] || null;
  };

  const hint = getHintForQuestion(questionId);

  if (!hint) return null;

  const renderHintContent = () => {
    switch (hint.type) {
      case 'info':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">{hint.content}</p>
            {hint.examples && (
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Examples:</h5>
                <ul className="space-y-1">
                  {hint.examples.map((example, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'tip':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">{hint.content}</p>
            
            {hint.goodExample && hint.badExample && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Good Example</span>
                  </div>
                  <p className="text-sm text-green-700">{hint.goodExample}</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Avoid This</span>
                  </div>
                  <p className="text-sm text-red-700">{hint.badExample}</p>
                </div>
              </div>
            )}

            {hint.questions && (
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-2">Consider These Questions:</h5>
                <ul className="space-y-1">
                  {hint.questions.map((question, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">?</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">{hint.content}</p>
            <div className="space-y-3">
              {hint.options.map((option, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">{option.type}</h5>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                  <div className="grid md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-medium text-green-700">Pros:</span>
                      <ul className="mt-1 space-y-1">
                        {option.pros.map((pro, i) => (
                          <li key={i} className="text-green-600">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-red-700">Cons:</span>
                      <ul className="mt-1 space-y-1">
                        {option.cons.map((con, i) => (
                          <li key={i} className="text-red-600">• {con}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-blue-700">Timeline:</span>
                      <p className="text-blue-600 mt-1">{option.timeline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'checklist':
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">{hint.content}</p>
            <div className="space-y-2">
              {hint.checklist.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 rounded"
                    id={`checklist-${index}`}
                  />
                  <label 
                    htmlFor={`checklist-${index}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <p className="text-sm text-gray-700">{hint.content}</p>;
    }
  };

  const getHintIcon = () => {
    switch (hint.type) {
      case 'tip': return Lightbulb;
      case 'comparison': return Eye;
      case 'checklist': return CheckCircle;
      case 'breakdown': return Info;
      default: return HelpCircle;
    }
  };

  const getHintColor = () => {
    switch (hint.type) {
      case 'tip': return 'yellow';
      case 'comparison': return 'blue';
      case 'checklist': return 'green';
      case 'breakdown': return 'purple';
      default: return 'gray';
    }
  };

  const HintIcon = getHintIcon();
  const color = getHintColor();
  const isExpanded = expandedHint === questionId;

  return (
    <Card className={`border-${color}-200 bg-${color}-50`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Hint Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 bg-${color}-100 rounded-full flex items-center justify-center`}>
                <HintIcon className={`w-3 h-3 text-${color}-600`} />
              </div>
              <h4 className={`text-sm font-medium text-${color}-800`}>
                {hint.title}
              </h4>
              <Badge variant="outline" className="text-xs">
                {hint.type}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedHint(isExpanded ? null : questionId)}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Hint Content */}
          {isExpanded && (
            <div className="pt-2 border-t border-gray-200">
              {renderHintContent()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpfulHints;

