import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  ThumbsUp, 
  Star, 
  Sparkles, 
  CheckCircle2,
  TrendingUp,
  Zap,
  Target,
  Award,
  Smile,
  Coffee,
  Rocket
} from 'lucide-react';

const VisualFeedback = ({ 
  answeredQuestions, 
  totalQuestions, 
  currentCategory,
  recentAnswer,
  timeSpent,
  qualityScore = 0
}) => {
  const [currentEncouragement, setCurrentEncouragement] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  // Encouragement messages based on progress
  const encouragementMessages = [
    {
      threshold: 0,
      messages: [
        { text: "Welcome! Let's create something amazing together.", icon: Rocket, color: "blue" },
        { text: "Every great project starts with the first question.", icon: Star, color: "yellow" },
        { text: "Take your time - quality answers lead to better results.", icon: Heart, color: "red" }
      ]
    },
    {
      threshold: 10,
      messages: [
        { text: "Great start! You're building momentum.", icon: TrendingUp, color: "green" },
        { text: "Excellent! Your answers are very helpful.", icon: ThumbsUp, color: "blue" },
        { text: "Keep going - you're doing fantastic!", icon: Sparkles, color: "purple" }
      ]
    },
    {
      threshold: 25,
      messages: [
        { text: "Quarter of the way there! Outstanding progress.", icon: Target, color: "orange" },
        { text: "Your detailed answers will help us serve you better.", icon: CheckCircle2, color: "green" },
        { text: "Impressive dedication to providing quality information!", icon: Award, color: "yellow" }
      ]
    },
    {
      threshold: 50,
      messages: [
        { text: "Halfway there! You're crushing this!", icon: Zap, color: "blue" },
        { text: "Fantastic progress! Your project is taking shape.", icon: Star, color: "yellow" },
        { text: "Amazing work! We can already see your vision.", icon: Smile, color: "green" }
      ]
    },
    {
      threshold: 75,
      messages: [
        { text: "Almost finished! You're in the home stretch.", icon: Rocket, color: "purple" },
        { text: "Incredible dedication! Just a few more questions.", icon: Heart, color: "red" },
        { text: "You're so close to completing this masterpiece!", icon: Sparkles, color: "blue" }
      ]
    },
    {
      threshold: 90,
      messages: [
        { text: "Final stretch! You're almost at the finish line.", icon: Target, color: "orange" },
        { text: "Outstanding commitment! Nearly there.", icon: Award, color: "yellow" },
        { text: "Just a few more questions to perfection!", icon: CheckCircle2, color: "green" }
      ]
    },
    {
      threshold: 100,
      messages: [
        { text: "Congratulations! You've completed everything!", icon: Award, color: "gold" },
        { text: "Perfect! Your comprehensive answers will help us deliver excellence.", icon: Star, color: "yellow" },
        { text: "Amazing work! You've provided everything we need.", icon: Sparkles, color: "purple" }
      ]
    }
  ];

  // Quality-based feedback
  const qualityFeedback = [
    {
      score: 80,
      message: "Exceptional detail! Your thorough answers are incredibly valuable.",
      icon: Award,
      color: "gold"
    },
    {
      score: 60,
      message: "Great detail! Your comprehensive responses are very helpful.",
      icon: ThumbsUp,
      color: "green"
    },
    {
      score: 40,
      message: "Good progress! Consider adding more detail where possible.",
      icon: TrendingUp,
      color: "blue"
    },
    {
      score: 20,
      message: "You're doing well! More detail helps us serve you better.",
      icon: Heart,
      color: "orange"
    }
  ];

  // Time-based encouragement
  const getTimeBasedMessage = () => {
    const minutes = Math.floor(timeSpent / 60);
    if (minutes < 5) {
      return { text: "Taking your time shows you care about quality!", icon: Coffee, color: "brown" };
    } else if (minutes < 15) {
      return { text: "Great pace! You're being thorough and thoughtful.", icon: Smile, color: "green" };
    } else {
      return { text: "Your dedication to detail is impressive!", icon: Heart, color: "red" };
    }
  };

  // Get current encouragement based on progress
  const getCurrentEncouragement = () => {
    const applicable = encouragementMessages
      .filter(group => progressPercentage >= group.threshold)
      .pop();
    
    if (applicable) {
      const randomMessage = applicable.messages[Math.floor(Math.random() * applicable.messages.length)];
      return randomMessage;
    }
    return encouragementMessages[0].messages[0];
  };

  // Update encouragement when progress changes
  useEffect(() => {
    if (answeredQuestions > 0) {
      const newEncouragement = getCurrentEncouragement();
      setCurrentEncouragement(newEncouragement);
      
      // Show celebration for milestones
      if (progressPercentage % 25 === 0 && progressPercentage > 0) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    }
  }, [answeredQuestions, progressPercentage]);

  // Visual elements based on progress
  const getProgressVisuals = () => {
    if (progressPercentage === 0) {
      return { emoji: "🚀", gradient: "from-blue-400 to-blue-600" };
    } else if (progressPercentage < 25) {
      return { emoji: "🌱", gradient: "from-green-400 to-green-600" };
    } else if (progressPercentage < 50) {
      return { emoji: "🔥", gradient: "from-orange-400 to-orange-600" };
    } else if (progressPercentage < 75) {
      return { emoji: "⚡", gradient: "from-yellow-400 to-yellow-600" };
    } else if (progressPercentage < 100) {
      return { emoji: "🎯", gradient: "from-purple-400 to-purple-600" };
    } else {
      return { emoji: "🎉", gradient: "from-pink-400 to-pink-600" };
    }
  };

  const visuals = getProgressVisuals();
  const timeMessage = getTimeBasedMessage();

  if (!currentEncouragement) return null;

  const EncouragementIcon = currentEncouragement.icon;

  return (
    <div className="space-y-4">
      {/* Main Encouragement Card */}
      <Card className={`bg-gradient-to-r ${visuals.gradient} text-white ${showCelebration ? 'animate-pulse' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{visuals.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <EncouragementIcon className="w-5 h-5" />
                <span className="font-semibold">Keep Going!</span>
              </div>
              <p className="text-sm opacity-90">{currentEncouragement.text}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-xs opacity-75">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quality Feedback */}
      {qualityScore > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  {qualityFeedback.find(f => qualityScore >= f.score)?.message || 
                   "Every answer helps us understand your needs better!"}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Quality: {qualityScore}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time-based Encouragement */}
      {timeSpent > 60 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <timeMessage.icon className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-800">{timeMessage.text}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Answer Feedback */}
      {recentAnswer && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-purple-800">
                  {recentAnswer.length > 50 
                    ? "Excellent detail in your last answer! This helps us understand your needs perfectly."
                    : "Thanks for your answer! Feel free to add more detail if you'd like."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestone Celebration */}
      {showCelebration && (
        <Card className="border-yellow-200 bg-yellow-50 animate-bounce">
          <CardContent className="p-4 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="font-bold text-yellow-800 mb-1">Milestone Reached!</h3>
            <p className="text-sm text-yellow-700">
              You've completed {Math.round(progressPercentage)}% of the scoping form!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisualFeedback;

