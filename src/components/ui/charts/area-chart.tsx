import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface AreaChartProps {
  data: any[];
  height?: number | string;
  xAxisKey: string;
  series: Array<{
    key: string;
    color: string;
    gradientId: string;
  }>;
}

export function AreaChart({
  data,
  height = 400,
  xAxisKey,
  series,
}: AreaChartProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            {series.map(({ gradientId, color }) => (
              <linearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            className="stroke-muted" 
          />
          <XAxis
            dataKey={xAxisKey}
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            padding={{ left: 10, right: 10 }}
            tickFormatter={(value) => value}
          />
          <YAxis
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            padding={{ top: 10, bottom: 10 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          {series.map(({ key, color, gradientId }) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}