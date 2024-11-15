import { MetricCard } from '@/components/metrics/metric-card';
import { Users, Timer, BarChart3, DollarSign } from 'lucide-react';

const metrics = [
  {
    title: 'Total Leads',
    value: '1,245',
    change: 15.5,
    progress: 75,
    icon: Users,
  },
  {
    title: 'Conversion Rate',
    value: '28%',
    change: 2.1,
    progress: 28,
    icon: BarChart3,
  },
  {
    title: 'Avg. Response Time',
    value: '1.5h',
    change: -10.2,
    progress: 82,
    icon: Timer,
  },
  {
    title: 'Total Loan Volume',
    value: '$12.5M',
    change: 8.4,
    progress: 68,
    icon: DollarSign,
  },
];

export function LeadsHistoryHeader() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Leads History</h1>
        <p className="text-muted-foreground">
          Review and analyze your past lead interactions
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
}