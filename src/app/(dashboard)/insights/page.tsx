'use client';

import { useState } from 'react';
import { generateSpendingInsights, GenerateSpendingInsightsOutput } from '@/ai/flows/generate-spending-insights';
import { transactions as mockTransactions } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from '@/components/dashboard-header';
import { Lightbulb, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

async function getInsightsAction(): Promise<GenerateSpendingInsightsOutput> {
  'use server';
  try {
    const transactionHistory = mockTransactions
      .map(t => `${t.date}: ${t.name} - ${t.description} - ₹${t.amount.toFixed(2)} (${t.type})`)
      .join('\n');
    
    if (!transactionHistory) {
      throw new Error('No transaction history available.');
    }

    const result = await generateSpendingInsights({ transactionHistory });
    return result;
  } catch (error) {
    console.error('Error generating insights:', error);
    throw new Error('Failed to generate spending insights. Please try again.');
  }
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<GenerateSpendingInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setInsights(null);
    try {
      const result = await getInsightsAction();
      setInsights(result);
      toast({
        title: "Insights Generated!",
        description: "Your personalized spending insights are ready.",
      });
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message || "Failed to generate insights.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader title="Spending Insights" />
      <main className="flex-1 p-4 sm:p-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Unlock Your Financial Picture</CardTitle>
            <CardDescription>
              Use AI to analyze your spending habits, identify trends, and get personalized recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" onClick={handleGenerate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Insights
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {insights && (
          <div className="mt-6 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{insights.summary}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{insights.trends}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{insights.recommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}


import { getInsightsAction } from '@/actions/getInsightsAction';
