import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle,
  Save,
  Send
} from 'lucide-react';
import { SCOPING_CATEGORIES, getCategoryQuestions, shouldShowQuestion, validateAnswer } from '../types/scoping';
import FormQuestion from './FormQuestion';
import ProgressGamification from './ProgressGamification';
import HelpfulHints from './HelpfulHints';
import VisualFeedback from './VisualFeedback';

const FormWizard = ({ onSubmit, onSave }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [recentAnswer, setRecentAnswer] = useState('');
  const [qualityScore, setQualityScore] = useState(0);

  const categories = Object.values(SCOPING_CATEGORIES);
  const categoryNames = {
    [SCOPING_CATEGORIES.BUSINESS]: 'Business & Brand',
    [SCOPING_CATEGORIES.TECHNICAL]: 'Technical Requirements',
    [SCOPING_CATEGORIES.CONTENT]: 'Content & Functionality',
    [SCOPING_CATEGORIES.DESIGN]: 'Design Preferences',
    [SCOPING_CATEGORIES.TIMELINE]: 'Timeline & Budget',
    [SCOPING_CATEGORIES.INTEGRATIONS]: 'Third-Party Integrations'
  };

  const categoryDescriptions = {
    [SCOPING_CATEGORIES.BUSINESS]: 'Tell us about your business and goals',
    [SCOPING_CATEGORIES.TECHNICAL]: 'Define your technical needs and requirements',
    [SCOPING_CATEGORIES.CONTENT]: 'Plan your content structure and management',
    [SCOPING_CATEGORIES.DESIGN]: 'Share your design vision and preferences',
    [SCOPING_CATEGORIES.TIMELINE]: 'Set your timeline and budget expectations',
    [SCOPING_CATEGORIES.INTEGRATIONS]: 'Specify any third-party tools or services'
  };

  // Calculate progress
  const totalQuestions = categories.reduce((total, category) => {
    return total + getCategoryQuestions(category).filter(q => shouldShowQuestion(q, answers)).length;
  }, 0);

  const answeredQuestions = Object.keys(answers).filter(key => {
    const answer = answers[key];
    return answer !== undefined && answer !== null && answer !== '';
  }).length;

  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  // Get current category questions
  const currentCategory = categories[currentStep];
  const currentQuestions = getCategoryQuestions(currentCategory).filter(q => 
    shouldShowQuestion(q, answers)
  );

  // Validate current step
  const validateCurrentStep = () => {
    const stepErrors = {};
    let hasErrors = false;

    currentQuestions.forEach(question => {
      const error = validateAnswer(question, answers[question.id]);
      if (error) {
        stepErrors[question.id] = error;
        hasErrors = true;
      }
    });

    setErrors(stepErrors);
    return !hasErrors;
  };

  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Track recent answer for feedback
    if (typeof value === 'string') {
      setRecentAnswer(value);
    }

    // Calculate quality score based on answer completeness
    const newQualityScore = calculateQualityScore({ ...answers, [questionId]: value });
    setQualityScore(newQualityScore);

    // Clear error for this field
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
  };

  // Calculate quality score based on answer completeness and detail
  const calculateQualityScore = (allAnswers) => {
    const answerValues = Object.values(allAnswers).filter(v => v !== undefined && v !== null && v !== '');
    if (answerValues.length === 0) return 0;

    let totalScore = 0;
    let scoredAnswers = 0;

    answerValues.forEach(answer => {
      if (typeof answer === 'string') {
        if (answer.length > 100) totalScore += 100;
        else if (answer.length > 50) totalScore += 75;
        else if (answer.length > 20) totalScore += 50;
        else totalScore += 25;
        scoredAnswers++;
      } else if (Array.isArray(answer)) {
        totalScore += Math.min(answer.length * 20, 100);
        scoredAnswers++;
      } else {
        totalScore += 50;
        scoredAnswers++;
      }
    });

    return scoredAnswers > 0 ? Math.round(totalScore / scoredAnswers) : 0;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Navigation handlers
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < categories.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      try {
        await onSubmit(answers);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      await onSave(answers);
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.keys(answers).length > 0) {
        handleSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [answers]);

  const isLastStep = currentStep === categories.length - 1;
  const canProceed = currentQuestions.every(q => !q.required || answers[q.id]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle className="text-2xl">Client Scoping Form</CardTitle>
              <CardDescription>
                Step {currentStep + 1} of {categories.length}: {categoryNames[currentCategory]}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {Math.round(progressPercentage)}% Complete
            </Badge>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </CardHeader>
      </Card>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Psychology Components */}
        <div className="lg:col-span-1 space-y-4">
          <ProgressGamification
            currentProgress={progressPercentage}
            totalQuestions={totalQuestions}
            answeredQuestions={answeredQuestions}
            currentCategory={currentCategory}
            completedCategories={categories.slice(0, currentStep)}
            timeSpent={timeSpent}
          />
          
          <VisualFeedback
            answeredQuestions={answeredQuestions}
            totalQuestions={totalQuestions}
            currentCategory={currentCategory}
            recentAnswer={recentAnswer}
            timeSpent={timeSpent}
            qualityScore={qualityScore}
          />
        </div>

        {/* Main Form Content */}
        <div className="lg:col-span-2 space-y-6">{/* Step Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">{categories.map((category, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const categoryQuestions = getCategoryQuestions(category).filter(q => 
            shouldShowQuestion(q, answers)
          );
          const answeredInCategory = categoryQuestions.filter(q => 
            answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== ''
          ).length;
          
          return (
            <Button
              key={category}
              variant={isCurrent ? "default" : isCompleted ? "secondary" : "outline"}
              size="sm"
              onClick={() => setCurrentStep(index)}
              className="flex items-center space-x-2"
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {categoryNames[category]}
              </span>
              <span className="sm:hidden">
                {index + 1}
              </span>
              {categoryQuestions.length > 0 && (
                <Badge variant="outline" className="ml-1 text-xs">
                  {answeredInCategory}/{categoryQuestions.length}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>{categoryNames[currentCategory]}</span>
          </CardTitle>
          <CardDescription>
            {categoryDescriptions[currentCategory]}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentQuestions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No questions in this category based on your previous answers.
              </p>
            </div>
          ) : (
            currentQuestions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <FormQuestion
                  question={question}
                  value={answers[question.id]}
                  error={errors[question.id]}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                  answers={answers}
                />
                <HelpfulHints
                  questionId={question.id}
                  questionType={question.type}
                  category={currentCategory}
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Navigation Footer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>
              
              {!isLastStep ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed || isSubmitting}
                  className="flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Scoping'}</span>
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={handleSave}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </Button>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;

