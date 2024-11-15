import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, AlertCircle } from 'lucide-react';

export function PerformanceInsights() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-primary/5 border-primary/10">
          <TrendingUp className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm">
            Tip: Leads with bids 0.5% below market rate have an 80% higher chance of winning
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Your average bid rate is 0.3% above winning bids. Consider lowering your rates to improve win rate.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}