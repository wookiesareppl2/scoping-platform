import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
        <p className="text-gray-600 mt-2">
          Track completion rates and optimize your scoping process.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            Analytics and reporting features coming soon...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Analytics features will be implemented in future phases.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

