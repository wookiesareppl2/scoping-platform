import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, ShieldCheck, AlertCircle } from 'lucide-react';

const Terms = () => (
  <div className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
      <FileText className="w-8 h-8 text-blue-600" /> Terms of Use
    </h1>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" /> Agreement to Terms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">
          By accessing or using this platform, you agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue use of the platform.
        </p>
      </CardContent>
    </Card>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-600" /> Use of the Platform
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You may use this platform solely for the purpose of submitting project requirements and managing your proposals and account.</li>
          <li>You agree to provide accurate and complete information in all submissions.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials (if applicable).</li>
          <li>You must not use the platform for any unlawful, abusive, or harmful activity.</li>
        </ul>
      </CardContent>
    </Card>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-yellow-600" /> Intellectual Property
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>All content and materials on this platform are the property of On a Digital Note or its licensors and are protected by copyright and other intellectual property laws.</li>
          <li>You may not copy, reproduce, distribute, or create derivative works from any part of the platform without express written permission.</li>
        </ul>
      </CardContent>
    </Card>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" /> Limitation of Liability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>This platform is provided "as is" and without warranties of any kind. We do not guarantee the accuracy, completeness, or suitability of the information provided.</li>
          <li>To the fullest extent permitted by law, On a Digital Note is not liable for any damages arising from your use of the platform.</li>
        </ul>
      </CardContent>
    </Card>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" /> Changes to Terms
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          We may update these Terms of Use from time to time. Any changes will be communicated via a notice banner on the website. Your continued use of the platform constitutes acceptance of the updated terms. Please review this page regularly.
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" /> Contact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700">
          For questions about these Terms, please email <a href="mailto:support@onadigitalnote.com" className="text-blue-600 underline">support@onadigitalnote.com</a>.
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Terms;
