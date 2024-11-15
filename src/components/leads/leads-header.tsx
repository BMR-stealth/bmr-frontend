import { MetricCard } from '@/components/metrics/metric-card';
import { Users, Timer, BarChart3, DollarSign } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const metrics = [
  {
    title: 'Active Leads',
    value: '24',
    change: 12.5,
    progress: 65,
    icon: Users,
    tooltip: 'Total number of active leads in your pipeline',
    isPrimary: true,
  },
  {
    title: 'Response Time',
    value: '1.2h',
    change: -15.3,
    progress: 75,
    icon: Timer,
    tooltip: 'Average time taken to respond to new leads. Lower times improve win rates.',
  },
  {
    title: 'Win Rate',
    value: '32%',
    change: 2.4,
    progress: 32,
    icon: BarChart3,
    tooltip: 'Percentage of leads successfully closed from bids placed',
    isPrimary: true,
  },
  {
    title: 'Total Loan Amount',
    value: '$8.2M',
    change: 5.2,
    progress: 78,
    icon: DollarSign,
    tooltip: 'Total value of active loans in your pipeline',
  },
];

export function LeadsHeader() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Leads</h1>
        <p className="text-muted-foreground">
          Manage and track your active leads
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <TooltipProvider key={metric.title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <MetricCard
                    {...metric}
                    className={metric.isPrimary ? 'border-primary' : ''}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{metric.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}