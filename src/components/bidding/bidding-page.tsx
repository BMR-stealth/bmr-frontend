import { useState } from 'react';
import { BiddingHeader } from './bidding-header';
import { BiddingForm } from './bidding-form';
import { BiddingHistory } from './bidding-history';
import { BiddingHelp } from './bidding-help';
import { useBidding } from './use-bidding';
import { Card } from '@/components/ui/card';

const mockBidderStats = {
  responseTime: 55, // minutes
  winRate: 70,     // percentage
  completionRate: 85, // percentage
  activeLeads: 12
};

export function BiddingPage() {
  const [currentBid, setCurrentBid] = useState<number | null>(null);
  const [bidHistory, setBidHistory] = useState<{ amount: number; timestamp: Date; }[]>([]);

  const {
    rank,
    previousRank,
  } = useBidding({
    leadId: 'LO-2023-001',
    marketRate: 5.2,
    currentBid,
    bidderStats: mockBidderStats
  });

  const handleBidSubmit = (amount: number) => {
    setCurrentBid(amount);
    setBidHistory([{ amount, timestamp: new Date() }, ...bidHistory]);
  };

  const handleBidWithdraw = () => {
    setCurrentBid(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <BiddingHeader
        leadId="LO-2023-001"
        expiryTime={new Date(Date.now() + 2 * 60 * 60 * 1000)}
        rank={rank}
        previousRank={previousRank}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <BiddingForm
              currentBid={currentBid}
              currentRate={5.2}
              onBidSubmit={handleBidSubmit}
              onBidWithdraw={handleBidWithdraw}
            />
          </Card>

          <Card className="p-6">
            <BiddingHistory bids={bidHistory} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <BiddingHelp />
          </Card>
        </div>
      </div>
    </div>
  );
}