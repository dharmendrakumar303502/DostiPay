'use server';

import { GenerateSpendingInsightsOutput } from '@/types';
import { mockTransactions } from '@/data/mock-transactions';

export async function getInsightsAction(): Promise<GenerateSpendingInsightsOutput> {
  try {
    const transactionHistory = mockTransactions
      .map(t => `${t.date}: ${t.name} - ${t.description} - ₹${t.amount.toFixed(2)} (${t.type})`)
      .join('\n');

    return {
      insights: `Spending Pattern: \n${transactionHistory}`
    };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate insights');
  }
}
