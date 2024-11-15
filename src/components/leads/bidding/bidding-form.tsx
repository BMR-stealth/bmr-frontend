import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { InfoIcon, AlertCircle, TrendingDown, Percent, ArrowRight, Calculator, DollarSign, Shield, Scale } from 'lucide-react';
import { calculateSavings, getCompetitiveBidRange } from '@/lib/bidding';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BiddingFormProps {
  currentRate: number;
  currentBid: number | null;
  loanAmount?: string;
  creditScore?: string;
  dti?: string;
  onBidSubmit: (amount: number) => void;
  onBidWithdraw?: () => void;
}

export function BiddingForm({
  currentRate,
  currentBid,
  loanAmount,
  creditScore,
  dti,
  onBidSubmit,
  onBidWithdraw,
}: BiddingFormProps) {
  const [bidAmount, setBidAmount] = useState<number>(
    currentBid || Math.max(currentRate - 0.5, 0)
  );

  const bidRange = getCompetitiveBidRange(currentRate, []);
  const parsedLoanAmount = loanAmount 
    ? parseInt(loanAmount.replace(/[^0-9]/g, ''))
    : 300000;
  const savings = calculateSavings(parsedLoanAmount, currentRate, bidAmount);

  // Calculate monthly payments
  const calculateMonthlyPayment = (principal: number, rate: number, years: number = 30) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const currentMonthly = calculateMonthlyPayment(parsedLoanAmount, currentRate);
  const proposedMonthly = calculateMonthlyPayment(parsedLoanAmount, bidAmount);
  const monthlySavings = currentMonthly - proposedMonthly;

  const handleBidChange = (value: number) => {
    setBidAmount(value);
  };

  const competitiveness = bidAmount <= currentRate - 0.5 ? 'high' : 
                         bidAmount <= currentRate - 0.25 ? 'medium' : 'low';

  const getCompetitivenessInfo = () => {
    switch(competitiveness) {
      case 'high':
        return {
          label: 'Highly Competitive',
          description: 'Excellent rate! High chance of winning.',
          variant: 'success',
          progress: 100
        };
      case 'medium':
        return {
          label: 'Moderately Competitive',
          description: 'Good rate, but could be improved.',
          variant: 'warning',
          progress: 65
        };
      default:
        return {
          label: 'Not Competitive',
          description: 'Consider lowering your rate.',
          variant: 'destructive',
          progress: 30
        };
    }
  };

  const info = getCompetitivenessInfo();

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
              onChange={(e) => handleBidChange(Number(e.target.value))}
              step="0.05"
              min={bidRange.min}
              max={currentRate}
              className={cn(
                "text-3xl font-bold h-16 pr-12 transition-colors",
                competitiveness === 'high' && "border-success focus-visible:ring-success",
                competitiveness === 'medium' && "border-warning focus-visible:ring-warning",
                competitiveness === 'low' && "border-destructive focus-visible:ring-destructive"
              )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Percent className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <Badge variant={info.variant as any} className="h-8 px-3">
            {info.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <Slider
            value={[bidAmount]}
            onValueChange={([value]) => handleBidChange(value)}
            min={bidRange.min}
            max={currentRate}
            step={0.05}
            className={cn(
              "w-full h-3",
              "[&>span]:h-3",
              "[&>span]:w-3",
              "[&>span]:mt-[-4px]",
              competitiveness === 'high' && "[&>span]:border-success [&>span]:focus:ring-success",
              competitiveness === 'medium' && "[&>span]:border-warning [&>span]:focus:ring-warning",
              competitiveness === 'low' && "[&>span]:border-destructive [&>span]:focus:ring-destructive"
            )}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{bidRange.min}%</span>
            <span>{currentRate}%</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 bg-success/5 border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-success" />
              <h3 className="font-semibold">Monthly Payment</h3>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current:</span>
                <span className="font-medium">${currentMonthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Proposed:</span>
                <span className="font-medium">${proposedMonthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-success">
                <span className="text-sm">Monthly Savings:</span>
                <span className="font-bold">${monthlySavings.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Total Savings</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">${savings.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">Over the life of the loan</p>
            </div>
          </Card>
        </div>

        <Alert className={cn(
          competitiveness === 'high' ? 'bg-success/10 text-success' :
          competitiveness === 'medium' ? 'bg-warning/10 text-warning' :
          'bg-destructive/10 text-destructive'
        )}>
          <AlertDescription>
            {info.description}
            <div className="mt-1 flex items-center gap-2 text-sm">
              <TrendingDown className="h-4 w-4" />
              Potential customer savings: ${savings.toLocaleString()}
            </div>
          </AlertDescription>
        </Alert>
      </div>

      <div className="flex flex-col gap-3">
        {currentBid ? (
          <>
            <Button
              className={cn(
                "animate-bid-gradient animate-bid-pulse border-none text-primary-foreground",
                competitiveness === 'high' && "animate-gradient animate-secure-pulse"
              )}
              onClick={() => onBidSubmit(bidAmount)}
              disabled={bidAmount >= currentRate}
            >
              Update Bid to {bidAmount.toFixed(2)}%
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-destructive"
              onClick={onBidWithdraw}
            >
              Withdraw Bid
            </Button>
          </>
        ) : (
          <Button
            className={cn(
              "animate-bid-gradient animate-bid-pulse border-none text-primary-foreground",
              competitiveness === 'high' && "animate-gradient animate-secure-pulse"
            )}
            onClick={() => onBidSubmit(bidAmount)}
            disabled={bidAmount >= currentRate}
          >
            Place Bid at {bidAmount.toFixed(2)}%
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}