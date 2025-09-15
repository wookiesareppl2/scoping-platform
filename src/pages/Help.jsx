import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, Info, HelpCircle, AlertTriangle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I start a new project proposal?',
    answer: 'Click the "Let\'s Go!" button on the homepage or use the navigation to access the scoping form. Fill out all required details and submit.'
  },
  {
    question: 'How long does it take to receive a proposal?',
    answer: 'Typically, you will receive a detailed proposal within 24-48 hours after submitting your requirements.'
  },
  {
    question: 'Can I update my submission after sending it?',
    answer: 'If you need to make changes, please contact us directly using the information below.'
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes, your information is kept confidential and is only used to prepare your project proposal.'
  }
];

const Help = () => (
  <div className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
      <HelpCircle className="w-8 h-8 text-blue-600" /> Help & Support
    </h1>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" /> How to Use This Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Start by filling out the <b>Project Scoping Form</b> with as much detail as possible.</li>
          <li>Submit your requirements and wait for a proposal from our team.</li>
          <li>Review your proposal and respond with any questions or clarifications.</li>
          <li>Once agreed, we will begin the project as outlined in the proposal.</li>
        </ol>
      </CardContent>
    </Card>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-green-600" /> Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {faqs.map((faq, idx) => (
            <li key={idx}>
              <div className="font-semibold text-gray-900">{faq.question}</div>
              <div className="text-gray-700 mt-1">{faq.answer}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" /> Troubleshooting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>If you experience issues submitting the form, ensure all required fields are filled and try refreshing the page.</li>
          <li>Clear your browser cache if the form is not loading correctly.</li>
          <li>If problems persist, contact us using the information below.</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-purple-600" /> Contact Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700">
          For further assistance, please email us at <a href="mailto:support@onadigitalnote.com" className="text-blue-600 underline">support@onadigitalnote.com</a>.
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Help;
