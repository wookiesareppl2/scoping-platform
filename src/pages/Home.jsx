import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Users
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Build Your
            <span className="text-blue-600 block">Perfect Website</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Help us understand your project requirements so we can create 
            an accurate proposal and timeline for your website development.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-lg text-blue-800 font-medium">
              The more detailed information you provide, the more accurate our proposal will be.
            </p>
            <p className="text-blue-700 mt-2">
              This helps us avoid scope changes and ensures your project stays on time and budget.
            </p>
          </div>
          
          <Button asChild size="lg" className="text-lg px-8 py-6 mb-4">
            <Link to="/scoping-form">
              Start Project Requirements
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          
          <p className="text-sm text-gray-500">
            Takes 10-15 minutes • Your information is secure
          </p>
        </div>
      </div>

      {/* Simple Process Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple 3-Step Process
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Share Your Vision</h3>
              <p className="text-gray-600">
                Tell us about your business, goals, and what you want your website to achieve.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. We Review & Discuss</h3>
              <p className="text-gray-600">
                Our team reviews your requirements and may ask follow-up questions for clarity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Receive Your Proposal</h3>
              <p className="text-gray-600">
                Get a detailed proposal with timeline, pricing, and next steps for your project.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Matters Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Detailed Requirements Matter
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    Accurate Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Detailed requirements help us provide realistic timelines and avoid delays 
                    caused by unclear specifications.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Better Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The more we understand your vision, the better we can bring it to life 
                    and exceed your expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 mb-6">
                Ready to get started? The form takes just 10-15 minutes to complete.
              </p>
              
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/scoping-form">
                  Begin Project Requirements
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Security Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            Your information is kept confidential and secure. We use it only to understand 
            your project requirements and provide you with an accurate proposal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;