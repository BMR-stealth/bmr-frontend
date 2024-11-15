import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

interface PerformanceComparisonProps {
  dateRange: [Date | undefined, Date | undefined];
}

export function PerformanceComparison({ dateRange }: PerformanceComparisonProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Ranking</CardTitle>
        <CardDescription>
          How you compare to other loan officers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Trophy className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Top 15%</span>
                <span className="text-muted-foreground">Platform Ranking</span>
              </div>
              <Progress value={85} />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Conversion Rate</span>
                <span className="text-primary">+12% above average</span>
              </div>
              <Progress value={75} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Response Time</span>
                <span className="text-primary">+8% above average</span>
              </div>
              <Progress value={65} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Customer Satisfaction</span>
                <span className="text-primary">+15% above average</span>
              </div>
              <Progress value={80} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}