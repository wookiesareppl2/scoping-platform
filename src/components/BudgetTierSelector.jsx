import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Zap, 
  Star, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Sparkles 
} from 'lucide-react';

const BudgetTierSelector = ({ value, onChange, error }) => {
  const budgetTiers = [
    {
      id: 'budget-constrained',
      title: 'Budget-Constrained Project',
      priceRange: '$500 - $2,000',
      icon: DollarSign,
      badge: 'Essential',
      badgeColor: 'bg-blue-500',
      description: 'Perfect for small businesses and startups needing essential web presence',
      includes: [
        'Static HTML/CSS/JavaScript website',
        'Mobile-responsive design',
        'Contact forms and basic functionality',
        'Professional design and layout',
        'Basic SEO optimization',
        'Up to 5 pages of content'
      ],
      limitations: [
        'No content management system (CMS)',
        'Limited post-launch changes',
        'No eCommerce functionality',
        'No user authentication',
        'No database integration',
        'Basic hosting requirements'
      ],
      bestFor: [
        'Small business websites',
        'Portfolio sites',
        'Informational websites',
        'Restaurant/menu sites'
      ],
      timeline: '1-2 weeks',
      support: 'Basic launch support'
    },
    {
      id: 'full-budget',
      title: 'Custom Development Project',
      priceRange: '$3,000+',
      icon: Sparkles,
      badge: 'Premium',
      badgeColor: 'bg-purple-500',
      description: 'Comprehensive web solutions with advanced functionality and ongoing support',
      includes: [
        'Custom CMS integration',
        'Advanced functionality and features',
        'eCommerce capabilities',
        'User authentication systems',
        'Database integration',
        'Ongoing support and maintenance',
        'Multiple revision rounds',
        'Scalable architecture'
      ],
      limitations: [
        'Higher investment required',
        'Longer development timeline',
        'More complex project management'
      ],
      bestFor: [
        'Business websites with CMS',
        'eCommerce stores',
        'Membership sites',
        'Booking systems',
        'Educational platforms',
        'Custom web applications'
      ],
      timeline: '4-12 weeks',
      support: 'Comprehensive support & maintenance'
    }
  ];

  const handleTierSelect = (tierId) => {
    onChange(tierId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">
          Choose Your Project Budget Tier
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the budget tier that best matches your project needs. This helps us provide 
          appropriate recommendations and set clear expectations.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {budgetTiers.map((tier) => {
          const IconComponent = tier.icon;
          const isSelected = value === tier.id;
          
          return (
            <Card 
              key={tier.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleTierSelect(tier.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${tier.badgeColor} text-white`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tier.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className={`${tier.badgeColor} text-white`}>
                          {tier.badge}
                        </Badge>
                        <span className="text-sm font-medium text-gray-600">
                          {tier.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <CardDescription className="text-sm">
                  {tier.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* What's Included */}
                <div>
                  <h4 className="font-medium text-green-800 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    What's Included
                  </h4>
                  <ul className="space-y-1">
                    {tier.includes.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {tier.limitations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-orange-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-1" />
                      Limitations
                    </h4>
                    <ul className="space-y-1">
                      {tier.limitations.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <XCircle className="w-3 h-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Best For */}
                <div>
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Best For
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {tier.bestFor.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Timeline & Support */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-xs font-medium text-gray-500">Timeline</p>
                    <p className="text-sm text-gray-900">{tier.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Support</p>
                    <p className="text-sm text-gray-900">{tier.support}</p>
                  </div>
                </div>

                <Button 
                  className={`w-full ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => handleTierSelect(tier.id)}
                >
                  {isSelected ? 'Selected' : 'Select This Tier'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {value && (
        <Alert>
          <Zap className="h-4 w-4" />
          <AlertDescription>
            <strong>Great choice!</strong> You've selected the{' '}
            <strong>
              {budgetTiers.find(t => t.id === value)?.title}
            </strong>{' '}
            tier. The next questions will be tailored to your budget and requirements.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BudgetTierSelector;