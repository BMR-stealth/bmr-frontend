import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompetitorInsightsProps {
  currentRate: number;
  rank: number;
  previousRank?: number;
  totalBids: number;
}

export function CompetitorInsights({
  currentRate,
  rank,
  previousRank,
  totalBids,
}: CompetitorInsightsProps) {
  const competitiveRate = currentRate - 0.5;
  const isCompetitive = rank <= 3;
  const rankChange = previousRank ? previousRank - rank : 0;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <Users className="h-4 w-4" />
        Competitive Analysis
      </h3>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className={cn(
                  "h-5 w-5",
                  isCompetitive ? "text-primary" : "text-muted-foreground"
                )} />
                <span className="font-medium">Your Position</span>
              </div>
              <p className="text-2xl font-bold">
                {rank === 0 ? '—' : `#${rank}`}
                {rankChange > 0 && (
                  <span className="text-sm font-normal text-emerald-500 ml-2">
                    ↑ {rankChange} positions
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Out of {totalBids} bidders
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-primary" />
                <span className="font-medium">Target Rate</span>
              </div>
              <p className="text-2xl font-bold">{competitiveRate.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">
                Recommended maximum
              </p>
            </div>

            <div>
              <span className="font-medium mb-2 block">Win Probability</span>
              <Progress
                value={isCompetitive ? 75 : 25}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground">
                {isCompetitive
                  ? 'High chance of winning!'
                  : 'Consider lowering your rate'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isCompetitive && (
        <Alert>
          <AlertDescription>
            Tip: Most winning bids are at least 0.5% below the current rate.
            Consider bidding around {competitiveRate.toFixed(1)}% to be more competitive.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}