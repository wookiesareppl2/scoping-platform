import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormWizard from '../components/FormWizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const ScopingForm = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const handleSubmit = async (answers) => {
    try {
      // Simulate API submission
      const submission = {
        id: Date.now().toString(),
        answers,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        clientInfo: {
          name: answers.company_name || 'Unknown Client',
          email: 'client@example.com' // This would come from a separate form
        }
      };

      // Save to localStorage (in a real app, this would be an API call)
      const existingSubmissions = JSON.parse(localStorage.getItem('scopingSubmissions') || '[]');
      existingSubmissions.push(submission);
      localStorage.setItem('scopingSubmissions', JSON.stringify(existingSubmissions));

      setSubmissionId(submission.id);
      setIsSubmitted(true);

      // Auto-save success notification
      console.log('Scoping form submitted successfully:', submission);
    } catch (error) {
      console.error('Error submitting scoping form:', error);
      throw error;
    }
  };

  const handleSave = async (answers) => {
    try {
      // Save draft to localStorage
      const draft = {
        answers,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('scopingDraft', JSON.stringify(draft));
      console.log('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  };

  // Load existing draft on component mount
  React.useEffect(() => {
    const savedDraft = localStorage.getItem('scopingDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        console.log('Found saved draft from:', draft.savedAt);
        // The FormWizard component would need to be updated to accept initial values
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">
              Scoping Form Submitted Successfully!
            </CardTitle>
            <CardDescription className="text-lg">
              Thank you for providing detailed information about your project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Submission ID:</strong> {submissionId}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Submitted:</strong> {new Date().toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">What happens next?</h3>
              <div className="text-left space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Review & Analysis</p>
                    <p className="text-sm text-gray-600">
                      Our team will review your requirements and may reach out for clarification.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Proposal Creation</p>
                    <p className="text-sm text-gray-600">
                      We'll create a detailed proposal with timeline and pricing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Project Kickoff</p>
                    <p className="text-sm text-gray-600">
                      Once approved, we'll begin development with clear milestones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/admin')} variant="outline">
                View in Admin Dashboard
              </Button>
              <Button onClick={() => {
                setIsSubmitted(false);
                setSubmissionId(null);
                localStorage.removeItem('scopingDraft');
              }}>
                Submit Another Scoping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Button>
      </div>

      {/* Form Wizard */}
      <FormWizard 
        onSubmit={handleSubmit}
        onSave={handleSave}
      />
    </div>
  );
};

export default ScopingForm;

