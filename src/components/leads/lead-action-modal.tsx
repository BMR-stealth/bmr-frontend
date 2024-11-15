import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Calculator, 
  TrendingDown, 
  Percent, 
  Loader2, 
  CheckCircle2, 
  DollarSign, 
  Star,
  Gavel,
  Scale
} from 'lucide-react';
import { calculateSavings, getCompetitiveBidRange } from '@/lib/bidding';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface LeadActionModalProps {
  lead: {
    id: string;
    name: string;
    loanAmount: string;
    currentRate: string;
    type: 'Guaranteed' | 'Competitive';
    creditScore?: string;
    dti?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onAction: (leadId: string, rate: number) => Promise<void>;
  currentBid?: number | null;
  rank?: number;
}

export function LeadActionModal({
  lead,
  isOpen,
  onClose,
  onAction,
  currentBid,
  rank,
}: LeadActionModalProps) {
  const isGuaranteed = lead.type === 'Guaranteed';
  const currentRate = parseFloat(lead.currentRate);
  const [rate, setRate] = useState(currentBid || currentRate - 0.5);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const loanAmount = parseInt(lead.loanAmount.replace(/[^0-9]/g, ''));
  const savings = calculateSavings(loanAmount, currentRate, rate);
  const monthlyPaymentCurrent = (loanAmount * (currentRate / 100 / 12)) / (1 - Math.pow(1 + currentRate / 100 / 12, -360));
  const monthlyPaymentNew = (loanAmount * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -360));
  const monthlySavings = monthlyPaymentCurrent - monthlyPaymentNew;

  const bidRange = getCompetitiveBidRange(currentRate, []);
  const competitiveness = rate <= bidRange.target ? 'high' : rate <= bidRange.max ? 'medium' : 'low';

  const getCompetitivenessInfo = () => {
    if (isGuaranteed) {
      return {
        label: 'Guaranteed Rate',
        description: 'Lock in this guaranteed opportunity',
        variant: 'success',
        progress: 100
      };
    }

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

  const handleAction = async () => {
    setIsProcessing(true);
    try {
      await onAction(lead.id, rate);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl flex items-center gap-2">
                {isGuaranteed ? (
                  <>
                    <Shield className="h-5 w-5 text-success" />
                    Secure Guaranteed Lead
                  </>
                ) : (
                  <>
                    <Gavel className="h-5 w-5 text-primary" />
                    Place Competitive Bid
                  </>
                )}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {isGuaranteed 
                  ? `Lock in this guaranteed opportunity for ${lead.name}`
                  : `Submit your competitive bid for ${lead.name}`}
              </p>
            </div>
            <Badge 
              variant={isGuaranteed ? 'success' : 'default'} 
              className={cn(
                "border-none px-3 py-1.5",
                isGuaranteed 
                  ? "animate-gradient animate-secure-pulse"
                  : "animate-bid-gradient animate-bid-pulse"
              )}
            >
              {lead.type}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Loan Details Card */}
          <Card className={cn(
            "p-4",
            isGuaranteed 
              ? "bg-success/5 border-success/20"
              : "bg-primary/5 border-primary/20"
          )}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Loan Amount</Label>
                <div className="flex items-center gap-2">
                  <DollarSign className={cn(
                    "h-5 w-5",
                    isGuaranteed ? "text-success" : "text-primary"
                  )} />
                  <span className="text-2xl font-bold">{lead.loanAmount}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Current Rate</Label>
                <div className="flex items-center gap-2">
                  <Percent className={cn(
                    "h-5 w-5",
                    isGuaranteed ? "text-success" : "text-primary"
                  )} />
                  <span className="text-2xl font-bold">{lead.currentRate}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Rate Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Your Rate</Label>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  step={0.125}
                  className={cn(
                    "text-2xl font-bold h-16 pr-12",
                    isGuaranteed 
                      ? "border-success focus-visible:ring-success"
                      : "border-primary focus-visible:ring-primary"
                  )}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Percent className={cn(
                    "h-6 w-6",
                    isGuaranteed ? "text-success" : "text-primary"
                  )} />
                </div>
              </div>
              <Badge 
                variant={isGuaranteed ? 'success' : info.variant as any} 
                className="h-8 px-3"
              >
                {info.label}
              </Badge>
            </div>
            <Slider
              value={[rate]}
              onValueChange={([value]) => setRate(value)}
              min={bidRange.min}
              max={currentRate}
              step={0.125}
              className={cn(
                "mt-2 h-3",
                "[&>span]:h-3 [&>span]:w-3 [&>span]:mt-[-4px]",
                isGuaranteed 
                  ? "[&>span]:border-success [&>span]:focus:ring-success"
                  : "[&>span]:border-primary [&>span]:focus:ring-primary"
              )}
            />
          </div>

          {/* Financial Impact Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className={cn(
              "p-4",
              isGuaranteed 
                ? "bg-success/5 border-success/20"
                : "bg-primary/5 border-primary/20"
            )}>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calculator className={cn(
                    "h-4 w-4",
                    isGuaranteed ? "text-success" : "text-primary"
                  )} />
                  Monthly Payment
                </Label>
                <div className="text-2xl font-bold">
                  ${Math.round(monthlyPaymentNew).toLocaleString()}
                </div>
                <div className={cn(
                  "flex items-center gap-2 text-sm",
                  isGuaranteed ? "text-success" : "text-primary"
                )}>
                  <TrendingDown className="h-4 w-4" />
                  Save ${Math.round(monthlySavings).toLocaleString()}/month
                </div>
              </div>
            </Card>

            <Card className={cn(
              "p-4",
              isGuaranteed 
                ? "bg-success/5 border-success/20"
                : "bg-primary/5 border-primary/20"
            )}>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Star className={cn(
                    "h-4 w-4",
                    isGuaranteed ? "text-success" : "text-primary"
                  )} />
                  Total Savings
                </Label>
                <div className={cn(
                  "text-2xl font-bold",
                  isGuaranteed ? "text-success" : "text-primary"
                )}>
                  ${Math.round(savings).toLocaleString()}
                </div>
                <Progress 
                  value={(savings / (loanAmount * 0.1)) * 100} 
                  className={isGuaranteed ? "bg-success/20" : "bg-primary/20"} 
                />
              </div>
            </Card>
          </div>

          <Alert className={cn(
            isGuaranteed 
              ? "bg-success/5 border-success/20"
              : "bg-primary/5 border-primary/20"
          )}>
            <Calculator className={cn(
              "h-4 w-4",
              isGuaranteed ? "text-success" : "text-primary"
            )} />
            <AlertDescription>
              {info.description} This rate will save your customer ${Math.round(savings).toLocaleString()} over the life of their loan.
            </AlertDescription>
          </Alert>

          <Button 
            className={cn(
              "w-full font-medium h-12 border-none",
              isGuaranteed 
                ? "animate-gradient animate-secure-pulse text-success-foreground"
                : "animate-bid-gradient animate-bid-pulse text-primary-foreground"
            )}
            onClick={handleAction}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isGuaranteed ? 'Securing Lead...' : 'Placing Bid...'}
              </>
            ) : (
              <>
                {isGuaranteed ? 'Secure Guaranteed Lead' : 'Place Bid'}
                {isGuaranteed ? (
                  <CheckCircle2 className="ml-2 h-5 w-5" />
                ) : (
                  <Gavel className="ml-2 h-5 w-5" />
                )}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}