import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const BudgetTierSelector = ({ selectedTier, onTierSelect }) => {
  const budgetTiers = [
    {
      id: 'budget-constrained',
      title: 'Budget-Constrained Project',
      priceRange: '$500 - $2,000',
      icon: DollarSign,
      color: 'bg-orange-500',
      description: 'Static websites with minimal functionality',
      features: [
        'Static website (HTML/CSS/JS)',
        'Contact form integration',
        'Basic responsive design',
        'Up to 5 pages',
        'Basic SEO setup'
      ],
      limitations: [
        'No content management system',
        'Minimal post-launch changes included',
        'No e-commerce functionality',
        'No custom backend features',
        'Limited design revisions'
      ],
      warning: 'Budget projects require thorough initial planning as changes after development are limited.'
    },
    {
      id: 'full-budget',
      title: 'Custom Development Project',
      priceRange: '$3,000+',
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Full-featured websites with advanced functionality',
      features: [
        'Custom design and development',
        'Content management system',
        'E-commerce capabilities',
        'User authentication systems',
        'Third-party integrations',
        'Advanced SEO optimization',
        'Ongoing support included'
      ],
      limitations: [],
      warning: null
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select Your Project Budget Tier</h2>
        <p className="text-gray-600">
          Choose the budget tier that best fits your project to see appropriate technical options
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {budgetTiers.map((tier) => {
          const IconComponent = tier.icon;
          const isSelected = selectedTier === tier.id;
          
          return (
            <Card 
              key={tier.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => onTierSelect(tier.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${tier.color} text-white`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tier.title}</CardTitle>
                      <Badge variant="secondary">{tier.priceRange}</Badge>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-sm text-green-700 mb-2">✅ Included Features</h4>
                  <ul className="text-sm space-y-1">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {tier.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-orange-700 mb-2">⚠️ Limitations</h4>
                    <ul className="text-sm space-y-1">
                      {tier.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-orange-600 mt-0.5">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warning */}
                {tier.warning && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      {tier.warning}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Selection Button */}
                <Button 
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                  onClick={() => onTierSelect(tier.id)}
                >
                  {isSelected ? 'Selected' : `Choose ${tier.title}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedTier === 'budget-constrained' && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Important:</strong> Budget-constrained projects require detailed initial planning. 
            Please provide as much information as possible in this scoping form to ensure we can 
            deliver the best possible website within your budget constraints.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BudgetTierSelector;