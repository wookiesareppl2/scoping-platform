import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Users, 
  Calendar, 
  FileText, 
  Camera, 
  Utensils,
  Building,
  Briefcase,
  ShoppingCart,
  CreditCard,
  UserCheck,
  BookOpen,
  Zap
} from 'lucide-react';

const ConditionalTechnicalRequirements = ({ budgetTier, selectedType, onTypeSelect }) => {
  const budgetConstrainedTypes = [
    {
      id: 'business-static',
      title: 'Business Website',
      description: 'Professional business presence with company information',
      icon: Building,
      features: ['Company info', 'Services pages', 'Contact form', 'About page'],
      examples: ['Law firm website', 'Consulting company', 'Professional services']
    },
    {
      id: 'portfolio-static',
      title: 'Portfolio Website',
      description: 'Showcase your work and creative projects',
      icon: Camera,
      features: ['Project galleries', 'About section', 'Contact form', 'Resume/CV'],
      examples: ['Photographer portfolio', 'Designer showcase', 'Artist gallery']
    },
    {
      id: 'informational-static',
      title: 'Informational Website',
      description: 'Share information about a topic, cause, or organization',
      icon: FileText,
      features: ['Content pages', 'Resource sections', 'Contact info', 'Basic navigation'],
      examples: ['Non-profit organization', 'Community group', 'Information hub']
    },
    {
      id: 'restaurant-static',
      title: 'Restaurant Website',
      description: 'Simple restaurant presence with menu and contact info',
      icon: Utensils,
      features: ['Menu display', 'Location/hours', 'Contact form', 'Photo gallery'],
      examples: ['Local restaurant', 'Cafe website', 'Food truck info']
    }
  ];

  const fullBudgetTypes = [
    {
      id: 'ecommerce',
      title: 'E-commerce Website',
      description: 'Online store with payment processing and inventory management',
      icon: ShoppingCart,
      features: ['Product catalog', 'Shopping cart', 'Payment processing', 'Order management', 'Customer accounts'],
      examples: ['Online retail store', 'Digital product sales', 'Subscription services']
    },
    {
      id: 'membership',
      title: 'Membership Website',
      description: 'User registration and member-only content areas',
      icon: UserCheck,
      features: ['User registration', 'Member login', 'Protected content', 'User profiles', 'Subscription management'],
      examples: ['Online courses', 'Member communities', 'Subscription content']
    },
    {
      id: 'booking',
      title: 'Booking/Appointment System',
      description: 'Online scheduling and appointment management',
      icon: Calendar,
      features: ['Calendar integration', 'Online booking', 'Payment processing', 'Email notifications', 'Admin dashboard'],
      examples: ['Medical appointments', 'Service bookings', 'Event reservations']
    },
    {
      id: 'business-advanced',
      title: 'Advanced Business Website',
      description: 'Full-featured business website with CMS and integrations',
      icon: Briefcase,
      features: ['Content management', 'Blog system', 'SEO optimization', 'Analytics', 'Third-party integrations'],
      examples: ['Corporate website', 'Agency website', 'Professional services']
    },
    {
      id: 'portfolio-advanced',
      title: 'Advanced Portfolio',
      description: 'Dynamic portfolio with CMS and client management',
      icon: Camera,
      features: ['Dynamic galleries', 'Client login', 'Project management', 'Blog integration', 'Contact management'],
      examples: ['Professional photographer', 'Design agency', 'Creative studio']
    },
    {
      id: 'blog-cms',
      title: 'Blog/Content Website',
      description: 'Content-focused website with publishing capabilities',
      icon: BookOpen,
      features: ['Content management', 'Multi-author support', 'Categories/tags', 'Comment system', 'SEO tools'],
      examples: ['News website', 'Magazine', 'Personal blog', 'Company blog']
    },
    {
      id: 'custom-application',
      title: 'Custom Web Application',
      description: 'Specialized functionality tailored to specific needs',
      icon: Zap,
      features: ['Custom features', 'Database integration', 'User management', 'API development', 'Advanced functionality'],
      examples: ['Project management tool', 'CRM system', 'Custom dashboard']
    }
  ];

  const websiteTypes = budgetTier === 'budget-constrained' ? budgetConstrainedTypes : fullBudgetTypes;
  const tierTitle = budgetTier === 'budget-constrained' ? 'Budget-Constrained' : 'Custom Development';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold">What type of website do you need?</h3>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="secondary">{tierTitle} Options</Badge>
          <p className="text-gray-600">
            Select the option that best describes your project
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {websiteTypes.map((type) => {
          const IconComponent = type.icon;
          const isSelected = selectedType === type.id;
          
          return (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
              }`}
              onClick={() => onTypeSelect(type.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{type.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {type.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                {/* Key Features */}
                <div>
                  <h5 className="font-medium text-xs text-gray-700 mb-1">Key Features:</h5>
                  <div className="flex flex-wrap gap-1">
                    {type.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {type.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{type.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h5 className="font-medium text-xs text-gray-700 mb-1">Examples:</h5>
                  <p className="text-xs text-gray-600">
                    {type.examples.join(', ')}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {budgetTier === 'budget-constrained' && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-2">Budget-Constrained Project Notes:</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• These options focus on static websites with minimal ongoing maintenance</li>
            <li>• Content management systems (like WordPress) are not included</li>
            <li>• Post-launch changes are limited to maintain project viability</li>
            <li>• Detailed initial content and requirements are essential</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConditionalTechnicalRequirements;