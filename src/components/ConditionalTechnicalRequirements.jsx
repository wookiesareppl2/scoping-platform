import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Globe, 
  ShoppingCart, 
  Users, 
  FileText, 
  Camera, 
  Briefcase,
  GraduationCap,
  Heart,
  Building,
  Palette,
  MessageSquare,
  Calendar,
  CreditCard,
  UserCheck,
  Database,
  Zap,
  Info,
  CheckCircle
} from 'lucide-react';

const ConditionalTechnicalRequirements = ({ 
  budgetTier, 
  selectedWebsiteType, 
  onWebsiteTypeSelect,
  className = '' 
}) => {
  
  // Budget-constrained website options (static sites only)
  const budgetConstrainedOptions = [
    {
      id: 'business-static',
      title: 'Business Website',
      description: 'Professional static website for service-based businesses',
      icon: Briefcase,
      features: ['Contact forms', 'Service pages', 'About/Team pages', 'Testimonials'],
      examples: ['Law firms', 'Consulting', 'Real estate', 'Professional services']
    },
    {
      id: 'portfolio-static',
      title: 'Portfolio Website',
      description: 'Showcase your work with a professional portfolio',
      icon: Camera,
      features: ['Image galleries', 'Project showcases', 'Bio/About page', 'Contact form'],
      examples: ['Photographers', 'Designers', 'Artists', 'Freelancers']
    },
    {
      id: 'informational-static',
      title: 'Informational Website',
      description: 'Share information about your organization or cause',
      icon: FileText,
      features: ['Multiple pages', 'Content sections', 'Contact information', 'Basic forms'],
      examples: ['Non-profits', 'Community groups', 'Information sites', 'Landing pages']
    },
    {
      id: 'restaurant-static',
      title: 'Restaurant/Menu Website',
      description: 'Display your menu and restaurant information',
      icon: Building,
      features: ['Menu display', 'Location/hours', 'Contact info', 'Photo gallery'],
      examples: ['Restaurants', 'Cafes', 'Food trucks', 'Catering services']
    }
  ];

  // Full-budget website options (all functionality)
  const fullBudgetOptions = [
    {
      id: 'business-custom',
      title: 'Custom Business Website',
      description: 'Full-featured business website with CMS and advanced functionality',
      icon: Briefcase,
      features: ['Content management', 'Blog system', 'SEO tools', 'Analytics integration'],
      examples: ['Corporate sites', 'Professional services', 'B2B companies']
    },
    {
      id: 'ecommerce',
      title: 'eCommerce Store',
      description: 'Online store with payment processing and inventory management',
      icon: ShoppingCart,
      features: ['Product catalog', 'Shopping cart', 'Payment processing', 'Order management'],
      examples: ['Online retail', 'Digital products', 'Subscription services']
    },
    {
      id: 'membership',
      title: 'Membership/Community Site',
      description: 'User registration, login, and member-only content',
      icon: Users,
      features: ['User accounts', 'Member areas', 'Content restrictions', 'User profiles'],
      examples: ['Online communities', 'Course platforms', 'Member organizations']
    },
    {
      id: 'booking',
      title: 'Booking/Appointment System',
      description: 'Online scheduling and appointment management',
      icon: Calendar,
      features: ['Calendar integration', 'Online booking', 'Payment processing', 'Notifications'],
      examples: ['Healthcare', 'Beauty services', 'Consultants', 'Event venues']
    },
    {
      id: 'educational',
      title: 'Educational/Course Platform',
      description: 'Online learning with courses, quizzes, and progress tracking',
      icon: GraduationCap,
      features: ['Course management', 'Video hosting', 'Quizzes/tests', 'Progress tracking'],
      examples: ['Online schools', 'Training platforms', 'Skill development']
    },
    {
      id: 'nonprofit',
      title: 'Non-Profit/Fundraising',
      description: 'Donation processing and volunteer management',
      icon: Heart,
      features: ['Donation forms', 'Event management', 'Volunteer portal', 'Impact tracking'],
      examples: ['Charities', 'Foundations', 'Community organizations']
    },
    {
      id: 'portfolio-advanced',
      title: 'Advanced Portfolio/Agency',
      description: 'Dynamic portfolio with client portals and project management',
      icon: Palette,
      features: ['Dynamic galleries', 'Client portals', 'Project management', 'Invoicing'],
      examples: ['Design agencies', 'Marketing firms', 'Creative studios']
    },
    {
      id: 'custom-application',
      title: 'Custom Web Application',
      description: 'Specialized functionality tailored to your unique requirements',
      icon: Zap,
      features: ['Custom features', 'Database integration', 'API development', 'Third-party integrations'],
      examples: ['SaaS platforms', 'Business tools', 'Industry-specific solutions']
    }
  ];

  const websiteOptions = budgetTier === 'budget-constrained' ? budgetConstrainedOptions : fullBudgetOptions;

  const renderWebsiteOption = (option) => {
    const IconComponent = option.icon;
    const isSelected = selectedWebsiteType === option.id;
    
    return (
      <Card 
        key={option.id}
        className={`cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' 
            : 'hover:shadow-md hover:border-gray-300'
        }`}
        onClick={() => onWebsiteTypeSelect(option.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${
              isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{option.title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
            </div>
            {isSelected && (
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Key Features */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-sm">Key Features:</h4>
            <div className="flex flex-wrap gap-1">
              {option.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-sm">Perfect For:</h4>
            <p className="text-sm text-gray-600">
              {option.examples.join(', ')}
            </p>
          </div>

          {/* Selection Button */}
          <Button 
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className="w-full mt-3"
            onClick={() => onWebsiteTypeSelect(option.id)}
          >
            {isSelected ? 'Selected' : 'Choose This Type'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  if (!budgetTier) {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          Please select your project type above to see available website options.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900">
          {budgetTier === 'budget-constrained' 
            ? 'Static Website Options' 
            : 'Website Type Selection'
          }
        </h3>
        <p className="text-gray-600">
          {budgetTier === 'budget-constrained'
            ? 'Choose the type of static website that best fits your needs. All options include mobile-responsive design and basic contact functionality.'
            : 'Select the type of website that best matches your requirements. All options include full custom development and ongoing support.'
          }
        </p>
      </div>

      {/* Budget-specific guidance */}
      {budgetTier === 'budget-constrained' && (
        <Alert className="border-amber-200 bg-amber-50">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <div className="space-y-1">
              <p className="font-medium">Budget-Constrained Project Reminder:</p>
              <p className="text-sm">
                These are static website options designed for maximum value within budget constraints. 
                All include professional design, mobile responsiveness, and basic contact functionality.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Website Options Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {websiteOptions.map(renderWebsiteOption)}
      </div>

      {/* Additional Information Based on Selection */}
      {selectedWebsiteType && budgetTier === 'budget-constrained' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-1">
              <p className="font-medium">Great Choice!</p>
              <p className="text-sm">
                This static website option will provide you with a professional web presence 
                that's perfect for your budget. Remember to provide detailed content and 
                requirements in the following sections for the best results.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {selectedWebsiteType && budgetTier === 'full-budget' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-1">
              <p className="font-medium">Excellent Selection!</p>
              <p className="text-sm">
                This website type will give you access to advanced functionality and 
                ongoing support. We'll work together to create a solution that grows with your business.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ConditionalTechnicalRequirements;