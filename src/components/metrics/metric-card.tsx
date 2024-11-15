import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowDown, ArrowUp, LucideIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  progress: number;
  icon: LucideIcon;
  isPrimary?: boolean;
  tooltip?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  change,
  progress,
  icon: Icon,
  isPrimary = false,
  tooltip,
  onClick,
  className,
  children,
}: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={cn(
              "p-4 transition-all",
              onClick && "cursor-pointer",
              isPrimary && "border-primary/20 bg-primary/5",
              className
            )}
            onClick={onClick}
          >
            <div className="flex items-center justify-between">
              <h3 className={cn(
                "text-sm font-medium",
                isPrimary ? "text-primary" : "text-muted-foreground"
              )}>
                {title}
              </h3>
              <Icon className={cn(
                "h-5 w-5",
                isPrimary ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <p className={cn(
              "text-2xl font-bold mt-2",
              isPrimary && "text-3xl"
            )}>
              {value}
            </p>
            <Progress 
              value={progress} 
              className={cn(
                "mt-2",
                isPrimary && "h-2",
                isPositive ? "bg-emerald-100 dark:bg-emerald-500/20" : "bg-red-100 dark:bg-red-500/20"
              )} 
            />
            <div className="mt-2 flex items-center text-sm">
              {isPositive ? (
                <ArrowUp className="h-4 w-4 text-emerald-500 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={cn(
                isPositive ? "text-emerald-500" : "text-red-500",
                "font-medium"
              )}>
                {Math.abs(change)}% from last month
              </span>
            </div>
            {children}
          </Card>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent side="bottom" className="max-w-xs">
            <p>{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}