import { Card } from '@/components/ui/card';
import { DashboardCharts } from '@/components/dashboard/dashboard-charts';

export function PerformanceStep() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Track your performance metrics and analyze your success rates.
      </p>

      <Card className="p-6">
        <DashboardCharts />
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Key Metrics</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="font-medium">32%</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Response Time</span>
              <span className="font-medium">1.2h avg</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Conversion Rate</span>
              <span className="font-medium">68%</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Performance Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Monitor your metrics regularly</li>
            <li>• Focus on improving response times</li>
            <li>• Track conversion rates by lead type</li>
            <li>• Analyze successful bids for patterns</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}