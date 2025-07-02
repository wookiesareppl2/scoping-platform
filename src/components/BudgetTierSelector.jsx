import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Zap, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Info,
  Clock,
  Settings
} from 'lucide-react';

const BudgetTierSelector = ({ selectedTier, onTierSelect, className = '' }) => {
  const budgetTiers = [
    {
      id: 'budget-constrained',
      title: 'Budget-Constrained Project',
      subtitle: 'Static websites with essential functionality',
      icon: DollarSign,
      price: 'Starting from $500-$2,000',
      badge: 'Limited Scope',
      badgeVariant: 'secondary',
      description: 'Perfect for small businesses, portfolios, and informational websites with tight budget constraints.',
      includes: [
        'Static website (HTML/CSS/JavaScript)',
        'Contact form integration',
        'Mobile-responsive design',
        'Basic SEO optimization',
        'Up to 5-10 pages',
        'Standard hosting setup'
      ],
      limitations: [
        'No content management system (CMS)',
        'Minimal post-launch changes included',
        'No eCommerce functionality',
        'No user authentication/memberships',
        'No complex integrations',
        'Limited custom functionality'
      ],
      warnings: [
        'This option requires thorough initial scoping as changes after development are minimal',
        'Perfect for businesses that need a professional web presence without ongoing content updates',
        'Ideal for portfolios, service businesses, and informational sites'
      ]
    },
    {
      id: 'full-budget',
      title: 'Custom Development Project',
      subtitle: 'Full-featured websites with advanced functionality',
      icon: Zap,
      price: 'Starting from $3,000+',
      badge: 'Full Features',
      badgeVariant: 'default',
      description: 'Comprehensive web development with custom functionality, CMS integration, and ongoing support.',
      includes: [
        'Custom website development',
        'Content Management System (WordPress/Custom)',
        'eCommerce functionality (if needed)',
        'User authentication & memberships',
        'Third-party integrations',
        'Advanced custom functionality',
        'Ongoing support and maintenance',
        'Multiple revision rounds'
      ],
      limitations: [],
      warnings: []
    }
  ];

  const renderTierCard = (tier) => {
    const IconComponent = tier.icon;
    const isSelected = selectedTier === tier.id;
    
    return (
      <Card 
        key={tier.id}
        className={`cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'ring-2 ring-blue-500 border-blue-500 shadow-lg' 
            : 'hover:shadow-md hover:border-gray-300'
        }`}
        onClick={() => onTierSelect(tier.id)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{tier.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{tier.subtitle}</p>
              </div>
            </div>
            <Badge variant={tier.badgeVariant}>{tier.badge}</Badge>
          </div>
          
          <div className="mt-3">
            <p className="text-lg font-semibold text-green-600">{tier.price}</p>
            <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* What's Included */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              What's Included
            </h4>
            <ul className="space-y-1">
              {tier.includes.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations (for budget tier) */}
          {tier.limitations.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <XCircle className="w-4 h-4 text-red-500 mr-2" />
                Limitations
              </h4>
              <ul className="space-y-1">
                {tier.limitations.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Important Warnings (for budget tier) */}
          {tier.warnings.length > 0 && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <div className="space-y-2">
                  <p className="font-medium">Important Considerations:</p>
                  <ul className="space-y-1">
                    {tier.warnings.map((warning, index) => (
                      <li key={index} className="text-sm">
                        • {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Selection Button */}
          <Button 
            variant={isSelected ? "default" : "outline"}
            className="w-full mt-4"
            onClick={() => onTierSelect(tier.id)}
          >
            {isSelected ? 'Selected' : `Choose ${tier.title}`}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Project Type</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the option that best fits your budget and project requirements. 
          This will help us provide you with the most appropriate solution and set clear expectations.
        </p>
      </div>

      {/* Important Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="space-y-2">
            <p className="font-medium">Why We Ask About Budget:</p>
            <p className="text-sm">
              Understanding your budget constraints helps us recommend the right approach and 
              set realistic expectations. Both options deliver high-quality results, but with 
              different scopes and ongoing support levels.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Budget Tier Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {budgetTiers.map(renderTierCard)}
      </div>

      {/* Additional Information */}
      {selectedTier === 'budget-constrained' && (
        <Alert className="border-amber-200 bg-amber-50">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <div className="space-y-2">
              <p className="font-medium">Budget-Constrained Project Guidelines:</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Thorough Scoping is Critical:</strong> Since changes are minimal, please provide detailed requirements upfront</li>
                <li>• <strong>Static Website Focus:</strong> Perfect for businesses that don't need frequent content updates</li>
                <li>• <strong>Professional Quality:</strong> You'll still receive a high-quality, professional website</li>
                <li>• <strong>Future Upgrades:</strong> You can always upgrade to full custom development later</li>
              </ul>
            </div>
        </AlertDescription>
        </Alert>
      )}

      {selectedTier === 'full-budget' && (
        <Alert className="border-green-200 bg-green-50">
          <Settings className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-2">
              <p className="font-medium">Custom Development Project Benefits:</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Full Functionality:</strong> Access to all website types and features</li>
                <li>• <strong>Ongoing Support:</strong> Multiple revision rounds and post-launch support</li>
                <li>• <strong>Scalable Solution:</strong> Built to grow with your business</li>
                <li>• <strong>Custom Features:</strong> Tailored functionality for your specific needs</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BudgetTierSelector;