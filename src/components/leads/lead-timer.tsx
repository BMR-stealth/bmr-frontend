import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LeadTimerProps {
  timeLeft: string;
  expiryTime: Date;
}

export function LeadTimer({ timeLeft, expiryTime }: LeadTimerProps) {
  const [progress, setProgress] = useState(100);
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    const now = new Date();
    const timeLeftMs = expiryTime.getTime() - now.getTime();
    const totalDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const newProgress = (timeLeftMs / totalDuration) * 100;
    
    setProgress(Math.max(0, Math.min(100, newProgress)));
    setIsExpiringSoon(timeLeftMs < 30 * 60 * 1000); // Less than 30 minutes
  }, [expiryTime]);

  return (
    <div className="flex items-center gap-2">
      <Timer 
        className={cn(
          "h-4 w-4",
          isExpiringSoon ? "text-destructive animate-pulse" : "text-muted-foreground"
        )} 
      />
      <div className="flex flex-col gap-1">
        <span className={cn(
          "text-sm whitespace-nowrap",
          isExpiringSoon && "text-destructive font-medium"
        )}>
          {timeLeft}
        </span>
        <Progress
          value={progress}
          className={cn(
            "w-16 h-1",
            isExpiringSoon && "bg-destructive/20"
          )}
        />
      </div>
    </div>
  );
}