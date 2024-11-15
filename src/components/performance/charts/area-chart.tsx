import { useMemo } from 'react';
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { baseChartConfig } from '@/lib/chart-config';
import { ChartGradients } from './chart-gradients';

interface AreaChartProps {
  data: any[];
  height?: number;
  series: Array<{
    key: string;
    color: string;
    gradientId: string;
  }>;
  compact?: boolean;
}

export function AreaChart({ 
  data, 
  height = 400, 
  series,
  compact = false 
}: AreaChartProps) {
  const gradients = useMemo(() => {
    return series.reduce((acc, { gradientId, color }) => ({
      ...acc,
      [gradientId]: {
        id: gradientId,
        stops: [
          { offset: '5%', color, opacity: 0.3 },
          { offset: '95%', color, opacity: 0 },
        ],
      },
    }), {});
  }, [series]);

  const config = useMemo(() => ({
    ...baseChartConfig,
    xAxis: {
      ...baseChartConfig.xAxis,
      tickMargin: compact ? 8 : 12,
      fontSize: compact ? 10 : 12,
      padding: { left: 5, right: 5 },
      scale: 'auto',
      allowDataOverflow: true,
    },
    yAxis: {
      ...baseChartConfig.yAxis,
      tickMargin: compact ? 8 : 12,
      fontSize: compact ? 10 : 12,
      padding: { top: 5, bottom: 5 },
      scale: 'auto',
      allowDataOverflow: true,
    },
    area: {
      ...baseChartConfig.area,
      strokeWidth: compact ? 1.5 : 2,
    },
    cartesianGrid: {
      ...baseChartConfig.cartesianGrid,
      strokeDasharray: compact ? "2 2" : "3 3",
    },
  }), [compact]);

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <defs>
            <ChartGradients gradients={gradients} />
          </defs>
          <CartesianGrid {...config.cartesianGrid} />
          <XAxis 
            {...config.xAxis}
            dataKey="month"
            scale="auto"
            allowDataOverflow={true}
          />
          <YAxis 
            {...config.yAxis}
            scale="auto"
            allowDataOverflow={true}
          />
          <Tooltip {...config.tooltip} />
          {series.map(({ key, color, gradientId }) => (
            <Area
              key={key}
              {...config.area}
              dataKey={key}
              stroke={color}
              fill={`url(#${gradientId})`}
              isAnimationActive={true}
              animationDuration={300}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}