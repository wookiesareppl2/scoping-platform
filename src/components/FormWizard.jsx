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
  Send,
  Clock,
  Users,
  Settings,
  Palette,
  Calendar,
  Zap
} from 'lucide-react';
import { SCOPING_CATEGORIES, getCategoryQuestions, shouldShowQuestion, validateAnswer } from '../types/scoping';
import FormQuestion from './FormQuestion';
import HelpfulHints from './HelpfulHints';

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
  
  // Enhanced category metadata with icons and descriptions
  const categoryMetadata = {
    [SCOPING_CATEGORIES.BUSINESS]: { 
      icon: Users, 
      title: 'Business & Brand',
      description: 'Tell us about your business and goals',
      color: 'bg-blue-500'
    },
    [SCOPING_CATEGORIES.TECHNICAL]: { 
      icon: Settings, 
      title: 'Technical Requirements',
      description: 'Define your technical needs and requirements',
      color: 'bg-green-500'
    },
    [SCOPING_CATEGORIES.CONTENT]: { 
      icon: Clock, 
      title: 'Content & Functionality',
      description: 'Plan your content structure and management',
      color: 'bg-purple-500'
    },
    [SCOPING_CATEGORIES.DESIGN]: { 
      icon: Palette, 
      title: 'Design Preferences',
      description: 'Share your design vision and preferences',
      color: 'bg-pink-500'
    },
    [SCOPING_CATEGORIES.TIMELINE]: { 
      icon: Calendar, 
      title: 'Timeline & Budget',
      description: 'Set your timeline and budget expectations',
      color: 'bg-orange-500'
    },
    [SCOPING_CATEGORIES.INTEGRATIONS]: { 
      icon: Zap, 
      title: 'Third-Party Integrations',
      description: 'Specify any third-party tools or services',
      color: 'bg-indigo-500'
    }
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

  // Calculate category completion
  const getCategoryCompletion = (category) => {
    const categoryQuestions = getCategoryQuestions(category).filter(q => shouldShowQuestion(q, answers));
    const answeredInCategory = categoryQuestions.filter(q => 
      answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== ''
    ).length;
    return categoryQuestions.length > 0 ? (answeredInCategory / categoryQuestions.length) * 100 : 0;
  };

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

    // Calculate quality score based on answer completeness and detail
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
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Progress Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Project Requirements</h1>
              <Badge variant="secondary" className="text-sm">
                Step {currentStep + 1} of {categories.length}
              </Badge>
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Category Navigation */}
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
                  onClick={() => setCurrentStep(index)}
                  className="flex items-center space-x-2 h-auto py-2 px-3"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{metadata.title}</span>
                  {isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {!isCompleted && completion > 0 && (
                    <div className="w-4 h-4 rounded-full border-2 border-current relative">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              {React.createElement(categoryMetadata[currentCategory].icon, {
                className: `w-6 h-6 text-white p-1 rounded ${categoryMetadata[currentCategory].color}`
              })}
              <div>
                <CardTitle className="text-xl">
                  {categoryMetadata[currentCategory].title}
                </CardTitle>
                <CardDescription className="text-base">
                  {categoryMetadata[currentCategory].description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Questions */}
            {currentQuestions.map((question) => (
              <div key={question.id} className="space-y-4">
                <FormQuestion
                  question={question}
                  value={answers[question.id]}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                  error={errors[question.id]}
                  answers={answers}
                />
                
                {/* Helpful Hints */}
                <HelpfulHints 
                  questionType={question.type}
                  category={currentCategory}
                  questionId={question.id}
                />
              </div>
            ))}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleSave}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Draft</span>
                </Button>

                {isLastStep ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed || isSubmitting}
                    className="flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Requirements'}</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-semibold">{answeredQuestions} / {totalQuestions}</div>
                  <div className="text-sm text-gray-500">Questions Answered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold">{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</div>
                  <div className="text-sm text-gray-500">Time Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Circle className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-semibold">{qualityScore}%</div>
                  <div className="text-sm text-gray-500">Detail Quality</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormWizard;