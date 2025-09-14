import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TestTube, Shuffle, Circle } from 'lucide-react';

const FormProgress = ({ 
  currentStep, 
  totalSteps, 
  progressPercentage, 
  onFillTestData, 
  onFillRandomData, 
  onClearData 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Project Requirements</h1>
            <Badge variant="secondary" className="text-sm">
              Step {currentStep + 1} of {totalSteps}
            </Badge>
          </div>
          
          {/* Test Data Controls */}
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 mr-4">
              {Math.round(progressPercentage)}% Complete
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onFillTestData}
              className="flex items-center space-x-1 text-xs"
              title="Fill with realistic test data"
              aria-label="Fill form with realistic test data"
            >
              <TestTube className="w-3 h-3" aria-hidden="true" />
              <span className="hidden sm:inline">Test Data</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onFillRandomData}
              className="flex items-center space-x-1 text-xs"
              title="Fill with random test data"
              aria-label="Fill form with random test data"
            >
              <Shuffle className="w-3 h-3" aria-hidden="true" />
              <span className="hidden sm:inline">Random</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onClearData}
              className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-700"
              title="Clear all form data"
              aria-label="Clear all form data"
            >
              <Circle className="w-3 h-3" aria-hidden="true" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Progress 
            value={progressPercentage} 
            className="h-2" 
            aria-label={`Form completion progress: ${Math.round(progressPercentage)}%`}
          />
        </div>
      </div>
    </div>
  );
};

export default FormProgress;