import { cn } from '@/lib/utils';
import { Trophy, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BiddingRankProps {
  rank: number;
  previousRank?: number;
  expiryTime: Date;
  suggestedImprovement?: string;
  score?: number;
}

export function BiddingRank({
  rank,
  previousRank,
  expiryTime,
  suggestedImprovement,
  score
}: BiddingRankProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-emerald-500 dark:text-emerald-400';
    if (rank <= 3) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };

  const getRankText = (rank: number) => {
    if (rank === 1) return 'Leading Bid!';
    if (rank <= 3) return `Top ${rank} Position`;
    return `Position #${rank}`;
  };

  const getRankTooltip = (rank: number) => {
    if (rank === 1) {
      return 'You currently have the leading bid! Monitor the time remaining to ensure you maintain your position.';
    }
    if (rank <= 3) {
      return 'You\'re in a competitive position. Consider adjusting your bid or reviewing the suggested improvements to secure the lead.';
    }
    return 'Your bid needs improvement to be competitive. Review the suggested actions below to increase your chances.';
  };

  const rankChange = previousRank ? previousRank - rank : 0;

  return (
    <div className="space-y-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
              <Trophy className={cn('h-8 w-8', getRankColor(rank))} />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={cn('font-semibold text-lg', getRankColor(rank))}>
                    {getRankText(rank)}
                  </span>
                  {rankChange !== 0 && (
                    <div className="flex items-center text-sm">
                      {rankChange > 0 ? (
                        <ArrowUp className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={cn(
                        'font-medium',
                        rankChange > 0 ? 'text-emerald-500' : 'text-red-500'
                      )}>
                        {Math.abs(rankChange)} {Math.abs(rankChange) === 1 ? 'position' : 'positions'}
                      </span>
                    </div>
                  )}
                </div>
                {score && (
                  <div className="text-sm text-muted-foreground">
                    Bid Score: {score.toFixed(1)}
                  </div>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{getRankTooltip(rank)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {suggestedImprovement && (
        <Alert variant="default" className="bg-accent/50 border-accent">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {suggestedImprovement}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}