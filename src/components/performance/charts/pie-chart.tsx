import { useMemo } from 'react';
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { pieChartConfig } from '@/lib/chart-config';

interface PieChartProps {
  data: any[];
  height?: number;
  colors: readonly string[];
  dataKey?: string;
}

export function PieChart({ 
  data, 
  height = 300, 
  colors,
  dataKey = 'value'
}: PieChartProps) {
  const chartData = useMemo(() => data, [data]);

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={chartData}
            {...pieChartConfig.pie}
            dataKey={dataKey}
          >
            {chartData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip {...pieChartConfig.tooltip} />
          <Legend {...pieChartConfig.legend} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}