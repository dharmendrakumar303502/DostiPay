'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized spending insights.
 *
 * - generateSpendingInsights -  A function that generates spending insights for a user based on their transaction history.
 * - GenerateSpendingInsightsInput - The input type for the generateSpendingInsights function.
 * - GenerateSpendingInsightsOutput - The output type for the generateSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSpendingInsightsInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe(
      'A detailed transaction history of the user, including dates, amounts, and descriptions of each transaction.'
    ),
});
export type GenerateSpendingInsightsInput = z.infer<
  typeof GenerateSpendingInsightsInputSchema
>;

const GenerateSpendingInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the user\'s spending habits.'),
  trends: z
    .string()
    .describe('Identified spending trends, such as increased spending on dining out.'),
  recommendations: z
    .string()
    .describe(
      'Personalized saving recommendations based on the spending analysis.'
    ),
});
export type GenerateSpendingInsightsOutput = z.infer<
  typeof GenerateSpendingInsightsOutputSchema
>;

export async function generateSpendingInsights(
  input: GenerateSpendingInsightsInput
): Promise<GenerateSpendingInsightsOutput> {
  return generateSpendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSpendingInsightsPrompt',
  input: {schema: GenerateSpendingInsightsInputSchema},
  output: {schema: GenerateSpendingInsightsOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's transaction history and provide insights, trends, and recommendations.

Transaction History:
{{{transactionHistory}}}

Summary:
Trends:
Recommendations: `,
});

const generateSpendingInsightsFlow = ai.defineFlow(
  {
    name: 'generateSpendingInsightsFlow',
    inputSchema: GenerateSpendingInsightsInputSchema,
    outputSchema: GenerateSpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
