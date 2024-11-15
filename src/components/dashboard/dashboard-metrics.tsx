import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Timer, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const metrics = [
  {
    title: 'Win Rate',
    value: '68%',
    change: 12.5,
    icon: Trophy,
    trend: 'up',
    description: 'Top 15% in your region',
    color: 'text-primary',
  },
  {
    title: 'Response Time',
    value: '1.2h',
    change: -15.3,
    icon: Timer,
    trend: 'down',
    description: 'Avg. time to first contact',
    color: 'text-success',
  },
  {
    title: 'Conversion Rate',
    value: '32%',
    change: 2.4,
    icon: BarChart3,
    trend: 'up',
    description: 'From lead to closed loan',
    color: 'text-primary',
  },
];

export function DashboardMetrics() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="flex items-center gap-4">
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center",
                metric.color === 'text-primary' ? 'bg-primary/10' : 'bg-success/10'
              )}>
                <metric.icon className={cn("h-5 w-5", metric.color)} />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </span>
                  <div className="flex items-center gap-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                    <Badge variant={metric.trend === 'up' ? 'success' : 'default'}>
                      {Math.abs(metric.change)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-xs text-muted-foreground">
                    {metric.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}