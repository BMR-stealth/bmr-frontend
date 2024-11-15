import { type XAxisProps, type YAxisProps } from 'recharts';

export type ChartGradientStop = {
  offset: string;
  color: string;
  opacity: number;
};

export type ChartGradient = {
  id: string;
  stops: ChartGradientStop[];
};

export type ChartGradients = {
  [key: string]: ChartGradient;
};

export type ChartConfig = {
  area: {
    type: "monotone";
    strokeWidth: number;
  };
  xAxis: Omit<XAxisProps, "scale">;
  yAxis: Omit<YAxisProps, "scale">;
  tooltip: {
    contentStyle: React.CSSProperties;
    labelStyle: React.CSSProperties;
  };
  cartesianGrid: {
    strokeDasharray: string;
    className: string;
  };
  pie?: {
    cx: string;
    cy: string;
    innerRadius: number;
    outerRadius: number;
    paddingAngle: number;
    dataKey: string;
  };
  legend?: {
    align: "center" | "left" | "right";
    verticalAlign: "top" | "middle" | "bottom";
  };
};

export const baseChartConfig: ChartConfig = {
  area: {
    type: "monotone",
    strokeWidth: 2,
  },
  xAxis: {
    dataKey: "month",
    fontSize: 12,
    stroke: "hsl(var(--foreground))",
    tickLine: false,
    axisLine: false,
    padding: { left: 10, right: 10 },
  },
  yAxis: {
    fontSize: 12,
    stroke: "hsl(var(--foreground))",
    tickLine: false,
    axisLine: false,
    tickFormatter: (value: number) => `${value}`,
    padding: { top: 10, bottom: 10 },
  },
  tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
    },
    labelStyle: { color: 'hsl(var(--foreground))' },
  },
  cartesianGrid: {
    strokeDasharray: "3 3",
    className: "stroke-muted",
  },
};

export const pieChartConfig: ChartConfig = {
  ...baseChartConfig,
  pie: {
    cx: "50%",
    cy: "50%",
    innerRadius: 60,
    outerRadius: 80,
    paddingAngle: 5,
    dataKey: "value",
  },
  legend: {
    align: "center",
    verticalAlign: "bottom",
  },
};