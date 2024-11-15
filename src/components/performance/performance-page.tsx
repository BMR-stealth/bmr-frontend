import { PerformanceMetrics } from './performance-metrics';
import { PerformanceTrends } from './performance-trends';
import { PerformanceBreakdown } from './performance-breakdown';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const topPerformers = [
  {
    name: 'Purchase Loans',
    rate: 75,
    count: 124,
  },
  {
    name: 'Refinance',
    rate: 62,
    count: 89,
  },
  {
    name: 'Home Equity',
    rate: 45,
    count: 32,
  },
];

export function PerformancePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <PerformanceMetrics />
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <PerformanceTrends />
        </div>
        <PerformanceBreakdown />
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Categories</CardTitle>
            <CardDescription>Loan types with highest conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{category.name}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={category.rate} className="w-[60px]" />
                      <span className="text-sm text-muted-foreground">
                        {category.rate}% conversion
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">{category.count} leads</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}