import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  Target,
  ArrowRight,
  Zap,
  Shield,
  Smartphone
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Scoping Forms',
      description: 'Multi-step forms with conditional logic that adapt based on client responses'
    },
    {
      icon: Target,
      title: 'Psychology-Driven Design',
      description: 'Gamified progress indicators and helpful hints encourage complete submissions'
    },
    {
      icon: Users,
      title: 'Admin Dashboard',
      description: 'Review submissions, request clarifications, and manage the approval workflow'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track completion rates, identify common issues, and optimize your process'
    },
    {
      icon: Zap,
      title: 'Development Integration',
      description: 'Export directly to your development format with GitHub integration'
    },
    {
      icon: Shield,
      title: 'Professional & Secure',
      description: 'Enterprise-grade security with data validation and backup systems'
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Complete Information',
      description: 'Get all the details you need upfront to avoid scope creep and revisions'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Reduce back-and-forth emails and meetings with structured information gathering'
    },
    {
      icon: Target,
      title: 'Better Projects',
      description: 'Well-scoped projects lead to happier clients and more successful outcomes'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Professional Client
            <span className="text-blue-600"> Scoping System</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your client onboarding process with intelligent forms, 
            psychology-driven design, and seamless development workflow integration.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-3">
            <Link to="/scoping-form">
              Start New Scoping
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
            <Link to="/admin">
              Admin Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Use Our Scoping System?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your client onboarding from chaotic to systematic, 
            ensuring every project starts with crystal-clear requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">6</div>
          <div className="text-sm text-gray-600">Scoping Categories</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">50+</div>
          <div className="text-sm text-gray-600">Smart Questions</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-gray-600">Mobile Responsive</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">⚡</div>
          <div className="text-sm text-gray-600">Lightning Fast</div>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Client Onboarding?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start gathering comprehensive project requirements today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Link to="/scoping-form">
                Create Your First Scoping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

