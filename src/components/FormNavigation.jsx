import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';

const FormNavigation = ({ 
  currentStep, 
  totalSteps, 
  canProceed, 
  isSubmitting,
  onPrevious, 
  onNext, 
  onSave, 
  onSubmit 
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="flex items-center space-x-2"
        aria-label="Go to previous step"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        <span>Previous</span>
      </Button>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          onClick={onSave}
          className="flex items-center space-x-2"
          aria-label="Save current progress as draft"
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          <span>Save Draft</span>
        </Button>

        {isLastStep ? (
          <Button
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
            className="flex items-center space-x-2"
            aria-label="Submit completed form"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Requirements'}</span>
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center space-x-2"
            aria-label="Go to next step"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;