import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, TrendingDown, Trophy, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { LeadDetailsModal } from '@/components/leads/lead-details-modal';

interface HotLeadProps {
  lead: {
    id: string;
    name: string;
    location: string;
    amount: string;
    currentRate: string;
    timeLeft: string;
    expiryTime: Date;
    type: 'Guaranteed' | 'Competitive';
    currentRank?: number;
    suggestedRate?: string;
    creditScore: string;
    dti: string;
  };
}

export function HotLeadCard({ lead }: HotLeadProps) {
  const [showBiddingModal, setShowBiddingModal] = useState(false);
  const [currentBid, setCurrentBid] = useState<number | null>(null);
  const [rank, setRank] = useState(lead.currentRank || 0);
  const [previousRank, setPreviousRank] = useState<number>();

  const timeLeftMs = lead.expiryTime.getTime() - new Date().getTime();
  const isExpiringSoon = timeLeftMs < 30 * 60 * 1000; // Less than 30 minutes
  const progress = (timeLeftMs / (2 * 60 * 60 * 1000)) * 100; // 2 hours total

  const handleBidSubmit = (amount: number) => {
    setPreviousRank(rank);
    setCurrentBid(amount);
    const newRank = Math.floor(Math.random() * 3) + 1;
    setRank(newRank);
  };

  const handleBidWithdraw = () => {
    setCurrentBid(null);
    setRank(0);
    setPreviousRank(undefined);
  };

  return (
    <>
      <Card className={cn(
        "border-2 transition-all",
        isExpiringSoon ? "border-destructive/50" : "border-primary/50"
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Hot Lead</CardTitle>
          <Badge variant={lead.type === 'Guaranteed' ? 'default' : 'secondary'}>
            {lead.type}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{lead.name}</h3>
                <p className="text-sm text-muted-foreground">{lead.location}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{lead.amount}</p>
                <p className="text-sm text-muted-foreground">Loan Amount</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Rate</span>
                <span className="font-medium">{lead.currentRate}</span>
              </div>
              {lead.type === 'Competitive' && lead.suggestedRate && (
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <span>Suggested bid: {lead.suggestedRate}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className={cn(
                    "h-4 w-4",
                    isExpiringSoon ? "text-destructive animate-pulse" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    isExpiringSoon && "text-destructive"
                  )}>
                    {lead.timeLeft} remaining
                  </span>
                </div>
                {lead.currentRank && (
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Rank #{lead.currentRank}</span>
                  </div>
                )}
              </div>
              <Progress value={progress} className={cn(
                "h-1",
                isExpiringSoon && "bg-destructive/20"
              )} />
            </div>

            {isExpiringSoon && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4" />
                <span>Expiring soon! Take action now.</span>
              </div>
            )}

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setShowBiddingModal(true)}
            >
              {lead.type === 'Competitive' ? 'Place Bid Now' : 'View Details'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {showBiddingModal && (
        <LeadDetailsModal
          lead={lead}
          isOpen={showBiddingModal}
          onClose={() => setShowBiddingModal(false)}
          currentBid={currentBid}
          rank={rank}
          previousRank={previousRank}
          onBidSubmit={handleBidSubmit}
          onBidWithdraw={handleBidWithdraw}
        />
      )}
    </>
  );
}