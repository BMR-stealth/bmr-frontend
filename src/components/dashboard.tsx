import {
  BarChart3,
  Users,
  Timer,
  DollarSign,
} from 'lucide-react';
import { MetricCard } from './metrics/metric-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsSection } from './leads/leads-section';
import { PerformanceSection } from './performance-section';
import { SubscriptionSection } from './subscription-section';

const metrics = [
  {
    title: 'Total Leads',
    value: '245',
    change: 20.1,
    progress: 65,
    icon: Users,
  },
  {
    title: 'Active Bids',
    value: '12',
    change: -5.2,
    progress: 45,
    icon: Timer,
  },
  {
    title: 'Conversion Rate',
    value: '32%',
    change: 2.4,
    progress: 32,
    icon: BarChart3,
  },
  {
    title: 'Avg. Loan Size',
    value: '$325K',
    change: 5.2,
    progress: 78,
    icon: DollarSign,
  },
];

export function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
            onClick={() => console.log(`Clicked ${metric.title}`)}
          />
        ))}
      </div>

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leads">My Leads</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="leads" className="space-y-4">
          <LeadsSection />
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <PerformanceSection />
        </TabsContent>
        <TabsContent value="subscription" className="space-y-4">
          <SubscriptionSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}