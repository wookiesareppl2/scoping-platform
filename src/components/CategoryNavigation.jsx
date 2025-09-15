import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const CategoryNavigation = ({ 
  categories, 
  categoryMetadata, 
  currentStep, 
  getCategoryCompletion, 
  onStepChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => {
        const metadata = categoryMetadata[category];
        const completion = getCategoryCompletion(category);
        const isCompleted = completion === 100;
        const isCurrent = index === currentStep;
        const IconComponent = metadata.icon;

        return (
          <Button
            key={category}
            variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
            size="sm"
            onClick={() => onStepChange(index)}
            className="flex items-center space-x-2 h-auto py-2 px-3"
            aria-label={`${metadata.title} - ${Math.round(completion)}% complete`}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <IconComponent className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">{metadata.title}</span>
            {isCompleted && (
              <CheckCircle className="w-4 h-4 text-green-600" aria-label="Completed" />
            )}
            {!isCompleted && completion > 0 && (
              <div 
                className="w-4 h-4 rounded-full border-2 border-current relative"
                aria-label={`${Math.round(completion)}% complete`}
              >
                <div 
                  className="absolute inset-0 rounded-full bg-current"
                  style={{ clipPath: `inset(${100 - completion}% 0 0 0)` }}
                />
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryNavigation;