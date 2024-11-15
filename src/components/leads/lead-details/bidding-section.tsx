import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon, AlertCircle, TrendingDown } from 'lucide-react';
import { calculateSavings, getCompetitiveBidRange } from '@/lib/bidding';

interface BiddingSectionProps {
  lead: {
    currentRate: string;
    amount?: string;
  };
  currentBid: number | null;
  rank: number;
  onBidSubmit: (amount: number) => void;
  onBidWithdraw: () => void;
  onUndoWithdraw: () => void;
  showUndoWithdraw: boolean;
}

export function BiddingSection({
  lead,
  currentBid,
  rank,
  onBidSubmit,
  onBidWithdraw,
  onUndoWithdraw,
  showUndoWithdraw,
}: BiddingSectionProps) {
  const currentRate = parseFloat(lead.currentRate);
  const [bidAmount, setBidAmount] = useState<number>(
    currentBid || currentRate - 0.5
  );

  // Get competitive bid range
  const bidRange = getCompetitiveBidRange(currentRate, []);
  
  // Calculate potential savings if a loan amount is provided
  const loanAmount = lead.amount 
    ? parseInt(lead.amount.replace(/[^0-9]/g, ''))
    : 300000; // Default amount for calculation
  const savings = calculateSavings(loanAmount, currentRate, bidAmount);

  const handleBidChange = (value: number) => {
    setBidAmount(value);
  };

  const getSuccessProbability = (rate: number) => {
    if (rate <= bidRange.target) return 'High chance of winning!';
    if (rate <= bidRange.max) return 'Moderate chance of success';
    return 'Consider lowering your rate';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="bid-amount" className="text-lg font-semibold">
            Your Bid Rate
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Current market rate is {currentRate}%. Target rate: {bidRange.target}%</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              id="bid-amount"
              type="number"
              value={bidAmount}
              onChange={(e) => handleBidChange(Number(e.target.value))}
              step="0.05"
              min={bidRange.min}
              max={currentRate}
              className="text-2xl font-bold"
            />
            <span className="text-2xl font-bold">%</span>
          </div>

          <Slider
            value={[bidAmount]}
            onValueChange={(value) => handleBidChange(value[0])}
            min={bidRange.min}
            max={currentRate}
            step={0.05}
            className="w-full"
          />

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{bidRange.min}%</span>
            <span>{currentRate}%</span>
          </div>

          <Alert variant={bidAmount <= bidRange.target ? 'default' : 'destructive'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {getSuccessProbability(bidAmount)}
              <div className="mt-1 flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4" />
                Potential customer savings: ${savings.toLocaleString()}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {showUndoWithdraw ? (
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <span>Bid withdrawn successfully</span>
            <Button
              variant="link"
              className="p-0 h-auto"
              onClick={onUndoWithdraw}
            >
              Undo
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="flex gap-4">
          <Button
            className="flex-1"
            onClick={() => onBidSubmit(bidAmount)}
            disabled={bidAmount >= currentRate}
          >
            {currentBid ? 'Update Bid' : 'Place Bid'}
          </Button>
          {currentBid && (
            <Button
              variant="destructive"
              onClick={onBidWithdraw}
            >
              Withdraw Bid
            </Button>
          )}
        </div>
      )}
    </div>
  );
}