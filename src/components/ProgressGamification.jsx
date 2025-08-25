import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  CheckCircle, 
  Award,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';

const ProgressGamification = ({ 
  currentProgress, 
  totalQuestions, 
  answeredQuestions, 
  currentCategory,
  completedCategories = [],
  timeSpent = 0
}) => {
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);

  const progressPercentage = Math.round(currentProgress);
  const completionRate = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  // Achievement definitions
  const achievementDefinitions = [
    {
      id: 'first_step',
      title: 'Getting Started',
      description: 'Completed your first question',
      icon: Star,
      condition: (stats) => stats.answeredQuestions >= 1,
      points: 10
    },
    {
      id: 'quarter_complete',
      title: 'Quarter Master',
      description: 'Completed 25% of the scoping form',
      icon: Target,
      condition: (stats) => stats.completionRate >= 25,
      points: 25
    },
    {
      id: 'half_complete',
      title: 'Halfway Hero',
      description: 'Completed 50% of the scoping form',
      icon: Zap,
      condition: (stats) => stats.completionRate >= 50,
      points: 50
    },
    {
      id: 'category_master',
      title: 'Category Master',
      description: 'Completed an entire category',
      icon: CheckCircle,
      condition: (stats) => stats.completedCategories.length >= 1,
      points: 30
    },
    {
      id: 'speed_demon',
      title: 'Speed Demon',
      description: 'Answered 10 questions in under 5 minutes',
      icon: TrendingUp,
      condition: (stats) => stats.answeredQuestions >= 10 && stats.timeSpent < 300,
      points: 40
    },
    {
      id: 'detail_oriented',
      title: 'Detail Oriented',
      description: 'Provided detailed answers (over 100 characters) for 5 questions',
      icon: Award,
      condition: (stats) => stats.detailedAnswers >= 5,
      points: 35
    },
    {
      id: 'almost_there',
      title: 'Almost There!',
      description: 'Completed 75% of the scoping form',
      icon: Trophy,
      condition: (stats) => stats.completionRate >= 75,
      points: 75
    },
    {
      id: 'completion_champion',
      title: 'Completion Champion',
      description: 'Completed the entire scoping form',
      icon: Sparkles,
      condition: (stats) => stats.completionRate >= 100,
      points: 100
    }
  ];

  // Check for new achievements
  useEffect(() => {
    const stats = {
      answeredQuestions,
      completionRate,
      completedCategories,
      timeSpent,
      detailedAnswers: 0 // This would be calculated from actual answers
    };

    const newAchievements = achievementDefinitions.filter(achievement => 
      achievement.condition(stats) && !achievements.find(a => a.id === achievement.id)
    );

    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      // Show the first new achievement
      setShowAchievement(newAchievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
  }, [answeredQuestions, completionRate, completedCategories, timeSpent]);

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);

  const getProgressMessage = () => {
    if (progressPercentage === 0) {
      return "Let's get started! Every great project begins with the first question.";
    } else if (progressPercentage < 25) {
      return "Great start! You're building momentum.";
    } else if (progressPercentage < 50) {
      return "Excellent progress! You're really getting into the details.";
    } else if (progressPercentage < 75) {
      return "Fantastic! You're more than halfway there.";
    } else if (progressPercentage < 100) {
      return "Almost finished! Just a few more questions to go.";
    } else {
      return "Congratulations! You've completed the scoping form!";
    }
  };

  const getProgressColor = () => {
    if (progressPercentage < 25) return "bg-red-500";
    if (progressPercentage < 50) return "bg-orange-500";
    if (progressPercentage < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-4">
      {/* Achievement Notification */}
      {showAchievement && (
        <Card className="border-yellow-200 bg-yellow-50 animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <showAchievement.icon className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800">Achievement Unlocked!</h4>
                <p className="text-sm text-yellow-700">{showAchievement.title}</p>
                <p className="text-xs text-yellow-600">{showAchievement.description}</p>
              </div>
              <Badge variant="secondary" className="ml-auto">
                +{showAchievement.points} pts
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Progress Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Progress Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                <p className="text-sm text-gray-600">{getProgressMessage()}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{answeredQuestions} of {totalQuestions} questions</span>
                <span>{Math.floor(timeSpent / 60)}m {timeSpent % 60}s</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{totalPoints}</div>
                <div className="text-xs text-gray-500">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{achievements.length}</div>
                <div className="text-xs text-gray-500">Achievements</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{completedCategories.length}</div>
                <div className="text-xs text-gray-500">Categories Done</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Display */}
      {achievements.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Your Achievements</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id}
                    className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Icon className="w-3 h-3 text-yellow-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {achievement.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.points}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Motivational Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Pro Tip</h4>
              <p className="text-sm text-green-700">
                {progressPercentage < 50 
                  ? "Take your time to provide detailed answers. The more information you share, the better we can serve your needs!"
                  : "You're doing great! Complete answers help us create the perfect solution for your project."
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressGamification;

