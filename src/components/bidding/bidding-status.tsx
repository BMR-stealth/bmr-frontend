import { Trophy, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface BiddingStatusProps {
  rank: number;
  previousRank?: number;
  totalBids: number;
}

export function BiddingStatus({ rank, previousRank, totalBids }: BiddingStatusProps) {
  const rankChange = previousRank ? previousRank - rank : 0;
  const isLeading = rank === 1;
  const isCompetitive = rank <= 3;

  return (
    <Card className="p-3 bg-accent/50">
      <div className="flex items-center gap-3">
        <Trophy className={cn(
          "h-8 w-8",
          isLeading ? "text-primary" : "text-muted-foreground"
        )} />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-semibold",
              isLeading ? "text-primary" : "text-muted-foreground"
            )}>
              {isLeading ? 'Leading Bid!' : `Rank #${rank}`}
            </span>
            {rankChange !== 0 && (
              <div className="flex items-center text-sm">
                {rankChange > 0 ? (
                  <ArrowUp className="h-4 w-4 text-success" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-destructive" />
                )}
                <span className={cn(
                  "font-medium",
                  rankChange > 0 ? "text-success" : "text-destructive"
                )}>
                  {Math.abs(rankChange)}
                </span>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {isCompetitive ? 'Strong position' : 'Consider improving your bid'}
          </p>
        </div>
      </div>
    </Card>
  );
}