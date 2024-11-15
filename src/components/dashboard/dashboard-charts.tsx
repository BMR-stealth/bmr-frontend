import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartGradients } from '@/components/charts/chart-gradients';
import { baseChartConfig } from '@/lib/chart-config';

const data = [
  { month: 'Jan', leads: 65, conversion: 45 },
  { month: 'Feb', leads: 75, conversion: 53 },
  { month: 'Mar', leads: 85, conversion: 48 },
  { month: 'Apr', leads: 95, conversion: 62 },
  { month: 'May', leads: 105, conversion: 58 },
  { month: 'Jun', leads: 115, conversion: 65 },
];

export function DashboardCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>
          Track your lead conversion and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <ChartGradients gradients={baseChartConfig.gradients} />
              </defs>
              <CartesianGrid {...baseChartConfig.cartesianGrid} />
              <XAxis {...baseChartConfig.xAxis} />
              <YAxis {...baseChartConfig.yAxis} />
              <Tooltip {...baseChartConfig.tooltip} />
              <Area
                {...baseChartConfig.area}
                dataKey="leads"
                stroke="hsl(var(--primary))"
                fill="url(#leads)"
              />
              <Area
                {...baseChartConfig.area}
                dataKey="conversion"
                stroke="hsl(var(--secondary))"
                fill="url(#conversion)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}