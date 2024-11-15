import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PieChart } from './charts/pie-chart';

const data = [
  { name: 'Guaranteed Leads', value: 65 },
  { name: 'Competitive Leads', value: 35 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))'] as const;

export function PerformanceBreakdown() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Lead Type Breakdown</CardTitle>
        <CardDescription>Distribution of lead types and success rates</CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart
          data={data}
          colors={COLORS}
          height={300}
        />
      </CardContent>
    </Card>
  );
}