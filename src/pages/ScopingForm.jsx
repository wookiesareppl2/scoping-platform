import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormWizard from '../components/FormWizard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ScopingForm = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create submission object
      const submission = {
        id: Date.now().toString(),
        answers: formData,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        clientInfo: {
          name: formData.company_name || formData.contact_name || 'Unknown Client',
          email: formData.email || 'client@example.com',
          phone: formData.phone || '',
          website: formData.website || ''
        },
        completeness: calculateCompleteness(formData),
        qualityScore: calculateQualityScore(formData)
      };

      // Save to localStorage
      const existingSubmissions = JSON.parse(localStorage.getItem('scopingSubmissions')) || [];
      existingSubmissions.push(submission);
      localStorage.setItem('scopingSubmissions', JSON.stringify(existingSubmissions));

      // Set success state
      setSubmissionId(submission.id);
      setIsSubmitted(true);
      
      console.log('Form submitted successfully:', submission);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form save (draft)
  const handleFormSave = (formData) => {
    try {
      // Save draft to localStorage
      const draft = {
        id: 'draft_' + Date.now(),
        answers: formData,
        status: 'draft',
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('scopingFormDraft', JSON.stringify(draft));
      console.log('Form saved as draft:', draft);
    } catch (err) {
      console.error('Error saving draft:', err);
    }
  };

  // Calculate form completeness percentage
  const calculateCompleteness = (formData) => {
    if (!formData || typeof formData !== 'object') return 0;
    
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.values(formData).filter(value => 
      value !== null && value !== undefined && value !== ''
    ).length;
    
    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
  };

  // Calculate quality score based on answer length and detail
  const calculateQualityScore = (formData) => {
    if (!formData || typeof formData !== 'object') return 0;
    
    let totalScore = 0;
    let fieldCount = 0;
    
    Object.values(formData).forEach(value => {
      if (value && typeof value === 'string') {
        fieldCount++;
        // Score based on answer length and detail
        if (value.length > 100) totalScore += 100;
        else if (value.length > 50) totalScore += 75;
        else if (value.length > 20) totalScore += 50;
        else if (value.length > 0) totalScore += 25;
      } else if (value && typeof value === 'object') {
        fieldCount++;
        totalScore += 75; // Arrays/objects get medium score
      } else if (value) {
        fieldCount++;
        totalScore += 50; // Other non-empty values
      }
    });
    
    return fieldCount > 0 ? Math.round(totalScore / fieldCount) : 0;
  };

  // Success view after submission
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-800">Submission Successful!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for providing your project requirements. We'll review your submission and get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Submission ID:</p>
              <p className="font-mono text-sm font-medium">{submissionId}</p>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                We typically respond within 24-48 hours with follow-up questions or a detailed project proposal.
              </AlertDescription>
            </Alert>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
                Return Home
              </Button>
              <Button onClick={() => navigate('/admin')} className="flex-1">
                View Admin Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main form view
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button 
          onClick={() => navigate(-1)} 
          variant="ghost" 
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Project Scoping Form
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us understand your project requirements by providing detailed information. 
            The more details you provide, the better we can serve you.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Form Wizard */}
      <FormWizard 
        onSubmit={handleFormSubmit}
        onSave={handleFormSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ScopingForm;