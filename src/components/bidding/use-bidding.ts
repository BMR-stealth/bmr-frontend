import { useState, useEffect } from 'react';
import { calculateBidScore, getBidStatus } from '@/lib/bidding';

interface UseBiddingProps {
  leadId: string;
  marketRate: number;
  currentBid: number | null;
  bidderStats: {
    responseTime: number;
    winRate: number;
    completionRate: number;
    activeLeads: number;
  };
}

export function useBidding({
  leadId,
  marketRate,
  currentBid,
  bidderStats
}: UseBiddingProps) {
  const [rank, setRank] = useState(0);
  const [previousRank, setPreviousRank] = useState<number>();
  const [score, setScore] = useState<number>();
  const [suggestedImprovement, setSuggestedImprovement] = useState<string>();

  // Simulate other bids (in production, this would come from an API)
  const mockOtherBids = [
    {
      amount: marketRate - 0.2,
      timestamp: new Date(),
      bidderId: 'competitor1',
      bidderStats: {
        responseTime: 45,
        winRate: 75,
        completionRate: 85,
        activeLeads: 10
      }
    },
    {
      amount: marketRate - 0.15,
      timestamp: new Date(),
      bidderId: 'competitor2',
      bidderStats: {
        responseTime: 30,
        winRate: 80,
        completionRate: 90,
        activeLeads: 8
      }
    }
  ];

  useEffect(() => {
    if (currentBid) {
      const userBid = {
        amount: currentBid,
        timestamp: new Date(),
        bidderId: 'currentUser',
        bidderStats
      };

      const allBids = [...mockOtherBids, userBid];
      const status = getBidStatus(userBid, allBids, marketRate);
      
      setPreviousRank(rank);
      setRank(status.rank);
      setScore(calculateBidScore(userBid, marketRate));
      setSuggestedImprovement(status.suggestedImprovement);
    } else {
      setRank(0);
      setPreviousRank(undefined);
      setScore(undefined);
      setSuggestedImprovement(undefined);
    }
  }, [currentBid, marketRate, bidderStats, rank]);

  return {
    rank,
    previousRank,
    score,
    suggestedImprovement
  };
}