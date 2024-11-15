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
import { Shield, Calculator, TrendingDown, Percent, Loader2, CheckCircle2, DollarSign, Star } from 'lucide-react';
import { calculateSavings } from '@/lib/bidding';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GuaranteedLeadModalProps {
  lead: {
    id: string;
    name: string;
    loanAmount: string;
    currentRate: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSecure: (leadId: string) => Promise<void>;
}

export function GuaranteedLeadModal({
  lead,
  isOpen,
  onClose,
  onSecure,
}: GuaranteedLeadModalProps) {
  const [rate, setRate] = useState(parseFloat(lead.currentRate) - 0.5);
  const [isSecuring, setIsSecuring] = useState(false);
  const loanAmount = parseInt(lead.loanAmount.replace(/[^0-9]/g, ''));
  const savings = calculateSavings(loanAmount, parseFloat(lead.currentRate), rate);
  const monthlyPaymentCurrent = (loanAmount * (parseFloat(lead.currentRate) / 100 / 12)) / (1 - Math.pow(1 + parseFloat(lead.currentRate) / 100 / 12, -360));
  const monthlyPaymentNew = (loanAmount * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -360));
  const monthlySavings = monthlyPaymentCurrent - monthlyPaymentNew;

  const handleSecure = async () => {
    setIsSecuring(true);
    try {
      await onSecure(lead.id);
      onClose();
    } finally {
      setIsSecuring(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                Secure Guaranteed Lead
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Lock in this guaranteed opportunity for {lead.name}
              </p>
            </div>
            <Badge 
              variant="success" 
              className={cn(
                "animate-gradient animate-secure-pulse",
                "border-none px-3 py-1.5"
              )}
            >
              Guaranteed
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Loan Details Card */}
          <Card className="p-4 bg-success/5 border-success/20">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Loan Amount</Label>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-success" />
                  <span className="text-2xl font-bold">{lead.loanAmount}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Current Rate</Label>
                <div className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-success" />
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
                  className="text-2xl font-bold h-16 pr-12 border-success focus-visible:ring-success"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Percent className="h-6 w-6 text-success" />
                </div>
              </div>
              <Badge variant="success" className="h-8 px-3">
                Guaranteed Rate
              </Badge>
            </div>
            <Slider
              value={[rate]}
              onValueChange={([value]) => setRate(value)}
              min={parseFloat(lead.currentRate) - 1}
              max={parseFloat(lead.currentRate)}
              step={0.125}
              className="mt-2 h-3 [&>span]:h-3 [&>span]:w-3 [&>span]:mt-[-4px] [&>span]:border-success [&>span]:focus:ring-success"
            />
          </div>

          {/* Financial Impact Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4 bg-success/5 border-success/20">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-success" />
                  Monthly Payment
                </Label>
                <div className="text-2xl font-bold">
                  ${Math.round(monthlyPaymentNew).toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-success">
                  <TrendingDown className="h-4 w-4" />
                  Save ${Math.round(monthlySavings).toLocaleString()}/month
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-success/5 border-success/20">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-success" />
                  Total Savings
                </Label>
                <div className="text-2xl font-bold text-success">
                  ${Math.round(savings).toLocaleString()}
                </div>
                <Progress value={(savings / (loanAmount * 0.1)) * 100} className="bg-success/20" />
              </div>
            </Card>
          </div>

          <Alert className="bg-success/5 border-success/20">
            <Calculator className="h-4 w-4 text-success" />
            <AlertDescription>
              Securing this lead at {rate}% will save your customer ${Math.round(savings).toLocaleString()} over the life of their loan.
            </AlertDescription>
          </Alert>

          <Button 
            className={cn(
              "w-full animate-gradient animate-secure-pulse border-none",
              "text-success-foreground font-medium h-12"
            )}
            onClick={handleSecure}
            disabled={isSecuring}
          >
            {isSecuring ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Securing Lead...
              </>
            ) : (
              <>
                Secure Guaranteed Lead
                <CheckCircle2 className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}