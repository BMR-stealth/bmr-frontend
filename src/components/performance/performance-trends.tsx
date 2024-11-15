import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AreaChart } from './charts/area-chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const data = [
  { month: 'Jan', leads: 65, conversion: 45 },
  { month: 'Feb', leads: 75, conversion: 53 },
  { month: 'Mar', leads: 85, conversion: 48 },
  { month: 'Apr', leads: 95, conversion: 62 },
  { month: 'May', leads: 105, conversion: 58 },
  { month: 'Jun', leads: 115, conversion: 65 },
];

const chartSeries = [
  {
    key: 'leads',
    color: 'hsl(var(--primary))',
    gradientId: 'leads',
  },
  {
    key: 'conversion',
    color: 'hsl(var(--secondary))',
    gradientId: 'conversion',
  },
];

export function PerformanceTrends() {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Track your lead conversion and performance metrics
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="12months">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <AreaChart
          data={data}
          height={280} // Reduced height
          series={chartSeries}
          compact // New prop for compact mode
        />
      </CardContent>
    </Card>
  );
}