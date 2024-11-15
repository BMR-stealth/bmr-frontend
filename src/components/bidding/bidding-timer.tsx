import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface BiddingTimerProps {
  expiryTime: Date;
}

export function BiddingTimer({ expiryTime }: BiddingTimerProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(100);
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLeftMs = expiryTime.getTime() - now.getTime();
      
      if (timeLeftMs <= 0) {
        clearInterval(interval);
        setTimeLeft('Expired');
        setProgress(0);
        return;
      }

      const hours = Math.floor(timeLeftMs / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeftMs % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      
      const totalDuration = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const newProgress = (timeLeftMs / totalDuration) * 100;
      setProgress(Math.max(0, Math.min(100, newProgress)));
      
      setIsExpiringSoon(timeLeftMs < 30 * 60 * 1000); // Less than 30 minutes
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  return (
    <div className="text-center">
      <div className="flex items-center gap-2 mb-2">
        <Timer className={cn(
          "h-5 w-5",
          isExpiringSoon ? "text-red-500 animate-pulse" : "text-muted-foreground"
        )} />
        <span className={cn(
          "text-lg font-semibold",
          isExpiringSoon && "text-red-500"
        )}>
          {timeLeft}
        </span>
      </div>
      <Progress
        value={progress}
        className={cn(
          "w-32",
          isExpiringSoon && "bg-red-100 dark:bg-red-900"
        )}
      />
    </div>
  );
}