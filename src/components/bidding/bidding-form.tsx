import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { InfoIcon, AlertCircle, TrendingDown, Percent } from 'lucide-react';
import { calculateSavings, getCompetitiveBidRange } from '@/lib/bidding';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface BiddingFormProps {
  currentRate: number;
  currentBid: number | null;
  loanAmount?: string;
  onBidSubmit: (amount: number) => void;
  onBidWithdraw?: () => void;
}

export function BiddingForm({
  currentRate,
  currentBid,
  loanAmount,
  onBidSubmit,
  onBidWithdraw,
}: BiddingFormProps) {
  const [bidAmount, setBidAmount] = useState<number>(
    currentBid || currentRate - 0.5
  );

  const bidRange = getCompetitiveBidRange(currentRate, []);
  const parsedLoanAmount = loanAmount 
    ? parseInt(loanAmount.replace(/[^0-9]/g, ''))
    : 300000;
  const savings = calculateSavings(parsedLoanAmount, currentRate, bidAmount);

  const getCompetitiveness = (rate: number) => {
    if (rate <= bidRange.target) return { label: 'Highly Competitive', variant: 'success' };
    if (rate <= bidRange.max) return { label: 'Moderately Competitive', variant: 'primary' };
    return { label: 'Not Competitive', variant: 'destructive' };
  };

  const competitiveness = getCompetitiveness(bidAmount);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
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

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Input
              id="bid-amount"
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              step="0.05"
              min={bidRange.min}
              max={currentRate}
              className="text-3xl font-bold h-16 pr-12"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Percent className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <Badge variant={competitiveness.variant as any} className="h-8 px-3">
            {competitiveness.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <Slider
            value={[bidAmount]}
            onValueChange={([value]) => setBidAmount(value)}
            min={bidRange.min}
            max={currentRate}
            step={0.05}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{bidRange.min}%</span>
            <span>{currentRate}%</span>
          </div>
        </div>

        <Alert variant={bidAmount <= bidRange.target ? 'default' : 'destructive'}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex flex-col gap-1">
              <span>{competitiveness.label} - {
                bidAmount <= bidRange.target 
                  ? 'High chance of winning!' 
                  : 'Consider lowering your rate'
              }</span>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4" />
                Potential customer savings: ${savings.toLocaleString()}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex gap-4">
        <Button
          className="flex-1"
          onClick={() => onBidSubmit(bidAmount)}
          disabled={bidAmount >= currentRate}
        >
          {currentBid ? 'Update Bid' : 'Place Bid'}
        </Button>
        {currentBid && onBidWithdraw && (
          <Button
            variant="destructive"
            onClick={onBidWithdraw}
          >
            Withdraw Bid
          </Button>
        )}
      </div>
    </Card>
  );
}