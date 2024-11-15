interface BidderStats {
  responseTime: number;  // Average response time in minutes
  winRate: number;      // Win rate percentage (0-100)
  completionRate: number; // Loan completion rate percentage (0-100)
  activeLeads: number;  // Number of active leads
}

interface Bid {
  amount: number;
  timestamp: Date;
  bidderId: string;
  bidderStats: BidderStats;
}

export function calculateBidScore(bid: Bid, marketRate: number): number {
  // Rate competitiveness (60% weight) - Increased from 40%
  // Lower rate = exponentially higher score to strongly prefer lower rates
  const rateScore = Math.pow((marketRate - bid.amount) / marketRate, 2) * 100 * 0.6;

  // Response time (15% weight) - Decreased from 20%
  // Faster response = higher score
  const responseScore = Math.max(0, (120 - bid.bidderStats.responseTime) / 120) * 100 * 0.15;

  // Historical performance (15% weight) - Decreased from 25%
  const performanceScore = (
    (bid.bidderStats.winRate * 0.4) +
    (bid.bidderStats.completionRate * 0.6)
  ) * 0.15;

  // Capacity management (10% weight) - Decreased from 15%
  // Prevents overloading loan officers
  const capacityScore = Math.max(0, (20 - bid.bidderStats.activeLeads) / 20) * 100 * 0.1;

  return rateScore + responseScore + performanceScore + capacityScore;
}

export function rankBids(bids: Bid[], marketRate: number): Bid[] {
  return bids
    .map(bid => ({
      ...bid,
      score: calculateBidScore(bid, marketRate)
    }))
    .sort((a, b) => b.score - a.score);
}

export function getBidStatus(
  bid: Bid,
  allBids: Bid[],
  marketRate: number
): {
  rank: number;
  isCompetitive: boolean;
  suggestedImprovement?: string;
} {
  const rankedBids = rankBids(allBids, marketRate);
  const rank = rankedBids.findIndex(b => b.bidderId === bid.bidderId) + 1;
  const score = calculateBidScore(bid, marketRate);
  
  let suggestedImprovement: string | undefined;
  
  if (rank > 1) {
    const topBid = rankedBids[0];
    const topScore = calculateBidScore(topBid, marketRate);
    const scoreDiff = topScore - score;
    
    // Prioritize rate suggestions over other improvements
    if (bid.amount > topBid.amount + 0.1) {
      const suggestedRate = (topBid.amount - 0.05).toFixed(2);
      suggestedImprovement = `Consider lowering your rate to ${suggestedRate}% to become more competitive`;
    } else if (bid.bidderStats.responseTime > 60) {
      suggestedImprovement = 'Improve your response time to increase your ranking';
    } else if (bid.bidderStats.activeLeads > 15) {
      suggestedImprovement = 'You may want to complete some existing leads before taking on more';
    }
  }
  
  // A bid is considered competitive if it's within 0.25% of the lowest bid
  const lowestBid = Math.min(...allBids.map(b => b.amount));
  const isCompetitive = bid.amount <= lowestBid + 0.25;
  
  return {
    rank,
    isCompetitive,
    suggestedImprovement
  };
}

export function calculateSavings(
  loanAmount: number,
  currentRate: number,
  proposedRate: number,
  term: number = 30
): number {
  const monthlyPaymentCurrent = calculateMonthlyPayment(loanAmount, currentRate, term);
  const monthlyPaymentProposed = calculateMonthlyPayment(loanAmount, proposedRate, term);
  const monthlySavings = monthlyPaymentCurrent - monthlyPaymentProposed;
  return Math.round(monthlySavings * 12 * term);
}

function calculateMonthlyPayment(principal: number, rate: number, years: number): number {
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
}

export function getCompetitiveBidRange(
  marketRate: number,
  existingBids: Bid[]
): {
  min: number;
  max: number;
  target: number;
} {
  // Find the lowest existing bid
  const lowestBid = existingBids.length > 0
    ? Math.min(...existingBids.map(b => b.amount))
    : marketRate;

  // Target rate is slightly below the lowest bid or market rate
  const target = Math.min(lowestBid - 0.05, marketRate - 0.5);
  
  // Provide a range that's competitive but still profitable
  return {
    min: target - 0.15, // Minimum acceptable rate
    max: target + 0.25, // Maximum competitive rate
    target
  };
}