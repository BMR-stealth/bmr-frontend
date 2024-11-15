import { MetricCard } from '@/components/metrics/metric-card';
import { Trophy, DollarSign, Timer, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const metrics = [
  {
    title: 'Total Won Bids',
    value: '32',
    change: 12.5,
    progress: 75,
    icon: Trophy,
    isPrimary: true,
    breakdown: [
      { label: 'Purchase', value: 18 },
      { label: 'Refinance', value: 14 },
    ],
  },
  {
    title: 'Conversion Rate',
    value: '68%',
    change: 8.2,
    progress: 68,
    icon: BarChart3,
    isPrimary: true,
    breakdown: [
      { label: 'Purchase', value: '72%' },
      { label: 'Refinance', value: '63%' },
    ],
  },
  {
    title: 'Avg. Follow-up Time',
    value: '1.8h',
    change: -15.3,
    progress: 82,
    icon: Timer,
    breakdown: [
      { label: 'First Response', value: '1.2h' },
      { label: 'Follow-up', value: '2.4h' },
    ],
  },
  {
    title: 'Pipeline Value',
    value: '$8.2M',
    change: 24.5,
    progress: 85,
    icon: DollarSign,
    breakdown: [
      { label: 'In Progress', value: '$5.8M' },
      { label: 'Near Closing', value: '$2.4M' },
    ],
  },
];

export function WonBidsHeader() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Won Opportunities</h1>
        <p className="text-muted-foreground">
          Manage and track your successful bids
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard 
            key={metric.title} 
            {...metric} 
            onClick={() => {
              if (metric.breakdown) {
                // Handle metric card click - show breakdown
                console.log('Show breakdown for:', metric.title);
              }
            }}
          >
            {metric.breakdown && (
              <div className="mt-4 space-y-2 pt-4 border-t border-border">
                {metric.breakdown.map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </MetricCard>
        ))}
      </div>
    </div>
  );
}