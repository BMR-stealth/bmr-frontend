import { MetricCard } from '@/components/metrics/metric-card';
import { Users, BarChart3, Timer, DollarSign } from 'lucide-react';

const metrics = [
  {
    title: 'Total Leads',
    value: '245',
    change: 20.1,
    progress: 65,
    icon: Users,
  },
  {
    title: 'Conversion Rate',
    value: '32%',
    change: 2.4,
    progress: 32,
    icon: BarChart3,
  },
  {
    title: 'Average Response Time',
    value: '1.2h',
    change: -15.3,
    progress: 75,
    icon: Timer,
  },
  {
    title: 'Avg. Loan Size',
    value: '$325K',
    change: 5.2,
    progress: 78,
    icon: DollarSign,
  },
];

export function PerformanceMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}