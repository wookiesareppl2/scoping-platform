import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Globe, 
  ShoppingCart, 
  Users, 
  Calendar, 
  GraduationCap, 
  Heart,
  Briefcase,
  Palette,
  Code,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ConditionalTechnicalRequirements = ({ budgetTier, value, onChange, error }) => {
  // Website type options based on budget tier
  const websiteTypes = {
    'budget-constrained': [
      {
        id: 'business-static',
        title: 'Business Website (Static)',
        icon: Briefcase,
        description: 'Professional business presence with essential information',
        features: ['Company information', 'Services/products overview', 'Contact forms', 'Location/hours'],
        examples: ['Local services', 'Consulting firms', 'Small retailers'],
        complexity: 'Simple',
        pages: '3-5 pages'
      },
      {
        id: 'portfolio-static',
        title: 'Portfolio Website (Static)',
        icon: Palette,
        description: 'Showcase your work and creative projects',
        features: ['Project galleries', 'About section', 'Contact information', 'Resume/CV'],
        examples: ['Photographers', 'Designers', 'Artists', 'Freelancers'],
        complexity: 'Simple',
        pages: '3-4 pages'
      },
      {
        id: 'informational-static',
        title: 'Informational Website (Static)',
        icon: Info,
        description: 'Share information about a topic, cause, or organization',
        features: ['Content pages', 'Resource sections', 'Contact forms', 'Basic navigation'],
        examples: ['Non-profits', 'Community groups', 'Information sites'],
        complexity: 'Simple',
        pages: '4-6 pages'
      },
      {
        id: 'restaurant-static',
        title: 'Restaurant/Menu Website (Static)',
        icon: Globe,
        description: 'Display menu, hours, and restaurant information',
        features: ['Menu display', 'Location/hours', 'Contact info', 'Photo gallery'],
        examples: ['Restaurants', 'Cafes', 'Food trucks', 'Catering'],
        complexity: 'Simple',
        pages: '3-4 pages'
      }
    ],
    'full-budget': [
      {
        id: 'business-advanced',
        title: 'Custom Business Website (with CMS)',
        icon: Briefcase,
        description: 'Full-featured business website with content management',
        features: ['CMS integration', 'Blog functionality', 'SEO optimization', 'Analytics integration'],
        examples: ['Growing businesses', 'Service companies', 'B2B companies'],
        complexity: 'Advanced',
        pages: '5-15 pages'
      },
      {
        id: 'ecommerce',
        title: 'eCommerce Store',
        icon: ShoppingCart,
        description: 'Online store with payment processing and inventory management',
        features: ['Product catalog', 'Shopping cart', 'Payment processing', 'Order management'],
        examples: ['Online retailers', 'Product sellers', 'Digital goods'],
        complexity: 'Complex',
        pages: '10-50+ pages'
      },
      {
        id: 'membership',
        title: 'Membership/Community Site',
        icon: Users,
        description: 'User registration, profiles, and member-only content',
        features: ['User authentication', 'Member profiles', 'Private content', 'Community features'],
        examples: ['Online communities', 'Membership organizations', 'Subscription sites'],
        complexity: 'Complex',
        pages: '8-20 pages'
      },
      {
        id: 'booking',
        title: 'Booking/Appointment System',
        icon: Calendar,
        description: 'Online scheduling and appointment management',
        features: ['Calendar integration', 'Booking forms', 'Payment processing', 'Notifications'],
        examples: ['Service providers', 'Healthcare', 'Consultants', 'Events'],
        complexity: 'Complex',
        pages: '6-12 pages'
      },
      {
        id: 'educational',
        title: 'Educational/Course Platform',
        icon: GraduationCap,
        description: 'Online learning with courses, lessons, and progress tracking',
        features: ['Course management', 'Video hosting', 'Progress tracking', 'Certificates'],
        examples: ['Online schools', 'Training companies', 'Coaches', 'Educators'],
        complexity: 'Complex',
        pages: '10-30 pages'
      },
      {
        id: 'nonprofit',
        title: 'Non-Profit/Fundraising',
        icon: Heart,
        description: 'Donation processing, volunteer management, and cause promotion',
        features: ['Donation processing', 'Volunteer signup', 'Event management', 'Newsletter'],
        examples: ['Charities', 'Non-profits', 'Fundraising campaigns', 'Causes'],
        complexity: 'Advanced',
        pages: '6-15 pages'
      },
      {
        id: 'portfolio-advanced',
        title: 'Advanced Portfolio/Agency',
        icon: Palette,
        description: 'Professional portfolio with CMS and advanced features',
        features: ['Dynamic galleries', 'Client portals', 'Project management', 'Blog/news'],
        examples: ['Design agencies', 'Creative professionals', 'Marketing firms'],
        complexity: 'Advanced',
        pages: '8-20 pages'
      },
      {
        id: 'custom-application',
        title: 'Custom Web Application',
        icon: Code,
        description: 'Fully custom web application tailored to specific needs',
        features: ['Custom functionality', 'Database design', 'API integration', 'Advanced features'],
        examples: ['SaaS platforms', 'Business tools', 'Custom solutions'],
        complexity: 'Very Complex',
        pages: 'Variable'
      }
    ]
  };

  // Get available options based on budget tier
  const availableOptions = budgetTier ? websiteTypes[budgetTier] || [] : [];

  const handleTypeSelect = (typeId) => {
    onChange(typeId);
  };

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Complex': return 'bg-orange-100 text-orange-800';
      case 'Very Complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!budgetTier) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Please select a budget tier first to see available website options.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          Choose Your Website Type
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your {budgetTier === 'budget-constrained' ? 'Budget-Constrained' : 'Custom Development'} tier, 
          here are the website options available to you.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {budgetTier === 'budget-constrained' && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Budget-Constrained Options:</strong> These are static websites perfect for 
            essential business presence. All options include mobile-responsive design and basic SEO.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = value === option.id;
          
          return (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-sm'
              }`}
              onClick={() => handleTypeSelect(option.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm font-medium leading-tight">
                        {option.title}
                      </CardTitle>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <CardDescription className="text-xs">
                  {option.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Complexity and Pages */}
                <div className="flex items-center justify-between">
                  <Badge className={`text-xs ${getComplexityColor(option.complexity)}`}>
                    {option.complexity}
                  </Badge>
                  <span className="text-xs text-gray-500">{option.pages}</span>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Key Features</h4>
                  <ul className="space-y-0.5">
                    {option.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <CheckCircle className="w-2.5 h-2.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {option.features.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{option.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Examples */}
                <div>
                  <h4 className="text-xs font-medium text-gray-700 mb-1">Perfect For</h4>
                  <div className="flex flex-wrap gap-1">
                    {option.examples.slice(0, 2).map((example, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  size="sm"
                  className={`w-full text-xs ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => handleTypeSelect(option.id)}
                >
                  {isSelected ? 'Selected' : 'Select This Type'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {value && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Excellent!</strong> You've selected{' '}
            <strong>
              {availableOptions.find(o => o.id === value)?.title}
            </strong>. 
            The remaining questions will help us understand your specific requirements for this type of website.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ConditionalTechnicalRequirements;