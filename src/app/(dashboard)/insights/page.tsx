import React from 'react';
import { getInsightsAction } from '@/actions/getInsightsAction';

export default async function InsightsPage() {
  const insightsData = await getInsightsAction();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Spending Insights</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <pre className="whitespace-pre-wrap text-gray-700">{insightsData.insights}</pre>
      </div>
    </div>
  );
}
