import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldCheck, Info } from 'lucide-react';

const Privacy = () => (
  <div className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold mb-6 flex items-center gap-2">
      <ShieldCheck className="w-8 h-8 text-blue-600" /> Privacy Policy
    </h1>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" /> Your Privacy Matters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">
          We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform. By using this platform, you consent to the practices described below.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><b>Information We Collect:</b> We collect information you provide directly, such as your name, email address, company details, project requirements, and any other data you submit via our forms. We may also collect technical data such as your IP address, browser type, and usage data for security and analytics purposes.</li>
          <li><b>How We Use Your Information:</b> Your information is used to:
            <ul className="list-disc list-inside ml-6">
              <li>Respond to your project inquiries and provide proposals</li>
              <li>Communicate with you about your project</li>
              <li>Improve and secure our platform</li>
              <li>Comply with legal obligations</li>
            </ul>
          </li>
          <li><b>Legal Basis for Processing:</b> We process your data based on your consent, to fulfill contractual obligations, or to comply with legal requirements.</li>
          <li><b>Cookies & Tracking:</b> We may use cookies or similar technologies to enhance your experience and analyze usage. You can control cookies via your browser settings.</li>
          <li><b>Third-Party Services:</b> We do not share your personal information with third parties except as required for service provision (e.g., hosting, analytics) or by law. All third-party providers are required to maintain the confidentiality and security of your data.</li>
          <li><b>Data Security:</b> We implement industry-standard measures (encryption, access controls, secure storage) to protect your data from unauthorized access, disclosure, alteration, or destruction.</li>
          <li><b>Data Retention:</b> We retain your information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.</li>
          <li><b>Your Rights:</b> You have the right to access, correct, or request deletion of your personal data. You may also object to or restrict certain processing, and withdraw consent at any time, subject to legal or contractual restrictions.</li>
          <li><b>Children's Privacy:</b> This platform is not intended for children under 16. We do not knowingly collect data from children.</li>
        </ul>
      </CardContent>
    </Card>

    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-green-600" /> Your Rights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You have the right to know what information we collect and how it is used.</li>
          <li>You may request deletion of your information at any time, subject to legal or contractual obligations.</li>
          <li>If this Privacy Policy is updated, we will notify users via a notice banner on the website. Users are responsible for reviewing the Privacy Policy before continuing to use the platform, and should revisit this page to stay informed of any changes.</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5 text-purple-600" /> Contact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-700">
          For privacy-related questions or requests, please email <a href="mailto:support@onadigitalnote.com" className="text-blue-600 underline">support@onadigitalnote.com</a>.
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Privacy;
