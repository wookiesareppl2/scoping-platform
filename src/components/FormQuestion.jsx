import React from 'react';
import BudgetTierSelector from './BudgetTierSelector';
import ConditionalTechnicalRequirements from './ConditionalTechnicalRequirements';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, HelpCircle, Lightbulb } from 'lucide-react';
import { QUESTION_TYPES } from '../types/scoping';

const FormQuestion = ({ question, value, error, onChange, answers }) => {
  const {
    id,
    type,
    question: questionText,
    required,
    placeholder,
    hint,
    options,
    conditional
  } = question;

  // Handle different value types
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  const handleCheckboxChange = (optionValue, checked) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (checked) {
      handleChange([...currentValues, optionValue]);
    } else {
      handleChange(currentValues.filter(v => v !== optionValue));
    }
  };

  const renderInput = () => {
    switch (type) {
      case QUESTION_TYPES.TEXT:
        return (
          <Input
            id={id}
            type="text"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={error ? 'border-red-500' : ''}
          />
        );

      case QUESTION_TYPES.TEXTAREA:
        return (
          <Textarea
            id={id}
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className={error ? 'border-red-500' : ''}
          />
        );

      case QUESTION_TYPES.NUMBER:
        return (
          <Input
            id={id}
            type="number"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={error ? 'border-red-500' : ''}
          />
        );

      case QUESTION_TYPES.DATE:
        return (
          <Input
            id={id}
            type="date"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );

      case QUESTION_TYPES.SELECT:
        return (
          <Select value={value || ''} onValueChange={handleChange}>
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case QUESTION_TYPES.RADIO:
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={handleChange}
            className="space-y-3"
          >
            {options.map((option) => {
              const optionValue = typeof option === 'string' ? option : option.value;
              const optionLabel = typeof option === 'string' ? option : option.label;
              const optionDescription = typeof option === 'object' ? option.description : null;

              return (
                <div key={optionValue} className="flex items-start space-x-3">
                  <RadioGroupItem value={optionValue} id={`${id}-${optionValue}`} className="mt-1" />
                  <div className="flex-1">
                    <Label 
                      htmlFor={`${id}-${optionValue}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {optionLabel}
                    </Label>
                    {optionDescription && (
                      <p className="text-sm text-gray-600 mt-1">
                        {optionDescription}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        );

      case QUESTION_TYPES.CHECKBOX:
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-3">
            {options.map((option) => {
              const isChecked = selectedValues.includes(option);
              return (
                <div key={option} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${id}-${option}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => handleCheckboxChange(option, checked)}
                  />
                  <Label 
                    htmlFor={`${id}-${option}`}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
        );

      case QUESTION_TYPES.MULTISELECT:
        const multiSelectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 mb-3">
              {multiSelectedValues.map((selectedValue) => (
                <Badge 
                  key={selectedValue} 
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => {
                    const newValues = multiSelectedValues.filter(v => v !== selectedValue);
                    handleChange(newValues);
                  }}
                >
                  {selectedValue} ×
                </Badge>
              ))}
            </div>
            <Select 
              value="" 
              onValueChange={(newValue) => {
                if (!multiSelectedValues.includes(newValue)) {
                  handleChange([...multiSelectedValues, newValue]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select options..." />
              </SelectTrigger>
              <SelectContent>
                {options
                  .filter(option => !multiSelectedValues.includes(option))
                  .map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        );

      case QUESTION_TYPES.FILE:
        return (
          <div className="space-y-2">
            <Input
              id={id}
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleChange({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified
                  });
                }
              }}
              className={error ? 'border-red-500' : ''}
            />
            {value && (
              <div className="text-sm text-gray-600">
                Selected: {value.name} ({Math.round(value.size / 1024)}KB)
              </div>
            )}
          </div>
        );

      case 'budget_tier_selector':
        return (
          <BudgetTierSelector
            selectedTier={value}
            onTierSelect={(tier) => handleChange(tier)}
            className="mt-4"
          />
        );

      case 'conditional_website_type':
        // Get budget tier from form data
        const budgetTier = answers?.budget_tier;
        return (
          <ConditionalTechnicalRequirements
            budgetTier={budgetTier}
            selectedWebsiteType={value}
            onWebsiteTypeSelect={(type) => handleChange(type)}
            className="mt-4"
          />
        );
    default:
        return (
          <div className="text-red-500 text-sm">
            Unsupported question type: {type}
          </div>
        );
    }
  };

  return (
    <Card className={`p-4 ${error ? 'border-red-200 bg-red-50' : ''}`}>
      <CardContent className="p-0 space-y-4">
        {/* Question Header */}
        <div className="space-y-2">
          <Label htmlFor={id} className="text-base font-medium flex items-center space-x-2">
            <span>{questionText}</span>
            {required && <span className="text-red-500">*</span>}
            {hint && (
              <div className="group relative">
                <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {hint}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </Label>

          {/* Hint */}
          {hint && (
            <div className="flex items-start space-x-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{hint}</span>
            </div>
          )}
        </div>

        {/* Input Field */}
        <div>
          {renderInput()}
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Conditional Info */}
        {conditional && (
          <div className="text-xs text-gray-500 italic">
            This question appears based on your previous answer.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormQuestion;

