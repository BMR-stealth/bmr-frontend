import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/metrics/metric-card';
import { Users, Timer, BarChart3, DollarSign } from 'lucide-react';

const metrics = [
  {
    title: 'Active Leads',
    value: '24',
    change: 12.5,
    progress: 65,
    icon: Users,
    tooltip: 'Track your current leads and opportunities'
  },
  {
    title: 'Response Time',
    value: '1.2h',
    change: -15.3,
    progress: 75,
    icon: Timer,
    tooltip: 'Average time to respond to new leads'
  },
  {
    title: 'Win Rate',
    value: '32%',
    change: 2.4,
    progress: 32,
    icon: BarChart3,
    tooltip: 'Your success rate in winning bids'
  },
  {
    title: 'Avg. Loan Size',
    value: '$325K',
    change: 5.2,
    progress: 78,
    icon: DollarSign,
    tooltip: 'Average value of your closed loans'
  }
];

export function DashboardStep() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Your command center for managing leads and tracking performance.
      </p>

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard 
              key={metric.title} 
              {...metric}
              className="hover:scale-105 transition-transform"
            />
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-4 bg-primary/5 border-primary/10">
            <h3 className="font-semibold mb-2">Quick Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Monitor active leads in real-time
              </li>
              <li className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-primary" />
                Quick response times improve win rates
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Track performance trends over time
              </li>
            </ul>
          </Card>

          <Card className="p-4 bg-secondary/5 border-secondary/10">
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="space-y-2 text-sm">
              <li>• Real-time bid tracking and analytics</li>
              <li>• Automated follow-up reminders</li>
              <li>• Performance insights and comparisons</li>
              <li>• Customizable dashboard views</li>
            </ul>
          </Card>
        </div>
      </Card>
    </div>
  );
}