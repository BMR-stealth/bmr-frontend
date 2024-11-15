import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Gavel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BidPurchaseModal } from './bid-purchase-modal';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BidCreditsIndicatorProps {
  credits: number;
  onPurchase: (amount: number) => void;
}

export function BidCreditsIndicator({
  credits,
  onPurchase,
}: BidCreditsIndicatorProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const guaranteedCredits = 3; // Monthly guaranteed leads
  const isLowCompetitiveCredits = credits < 10;
  const isLowGuaranteedCredits = guaranteedCredits < 2;

  return (
    <>
      <div className="mt-4 space-y-3">
        {/* Guaranteed Bids */}
        <div className={cn(
          'p-3 rounded-lg transition-colors',
          isLowGuaranteedCredits ? 'bg-warning/10' : 'bg-accent/50'
        )}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className={cn(
                        'h-4 w-4',
                        isLowGuaranteedCredits ? 'text-warning' : 'text-success'
                      )} />
                      <span className="font-medium text-sm">Guaranteed Leads</span>
                    </div>
                    <Badge variant={isLowGuaranteedCredits ? 'destructive' : 'default'} className="ml-2">
                      {guaranteedCredits}
                    </Badge>
                  </div>
                  <Progress
                    value={(guaranteedCredits / 5) * 100}
                    className={cn(
                      'h-1',
                      isLowGuaranteedCredits ? 'bg-warning/20' : 'bg-success/20'
                    )}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-sm">Monthly guaranteed leads remaining</p>
                <p className="text-xs text-muted-foreground">Resets on the 1st of each month</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Competitive Bids */}
        <div className={cn(
          'p-3 rounded-lg transition-colors',
          isLowCompetitiveCredits ? 'bg-destructive/10' : 'bg-accent/50'
        )}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gavel className={cn(
                'h-4 w-4',
                isLowCompetitiveCredits ? 'text-destructive' : 'text-primary'
              )} />
              <span className="font-medium text-sm">Competitive Bids</span>
            </div>
            <Badge variant={isLowCompetitiveCredits ? 'destructive' : 'default'}>
              {credits}
            </Badge>
          </div>

          <Progress
            value={(credits / 100) * 100}
            className={cn(
              'h-1 mb-2',
              isLowCompetitiveCredits && 'bg-destructive/20'
            )}
          />

          {isLowCompetitiveCredits && (
            <div className="flex items-center gap-1 text-xs text-destructive mb-2">
              <AlertTriangle className="h-3 w-3" />
              <span>Low balance! Purchase more credits.</span>
            </div>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => setShowPurchaseModal(true)}
        >
          Purchase Credits
        </Button>
      </div>

      <BidPurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchase={onPurchase}
        currentCredits={credits}
      />
    </>
  );
}