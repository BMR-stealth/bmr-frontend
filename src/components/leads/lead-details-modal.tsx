import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BiddingForm } from './bidding/bidding-form';
import { LeadStats } from './bidding/lead-stats';
import { BiddingStatus } from './bidding/bidding-status';

interface LeadDetailsModalProps {
  lead: {
    id: string;
    name: string;
    type: string;
    location: string;
    loanAmount: string;
    currentRate: string;
    creditScore?: string;
    dti?: string;
    timeLeft: string;
    expiryTime: Date;
  };
  isOpen: boolean;
  onClose: () => void;
  currentBid: number | null;
  rank: number;
  previousRank?: number;
  onBidSubmit: (amount: number) => void;
  onBidWithdraw: () => void;
}

export function LeadDetailsModal({
  lead,
  isOpen,
  onClose,
  currentBid,
  rank,
  previousRank,
  onBidSubmit,
  onBidWithdraw,
}: LeadDetailsModalProps) {
  // Parse current rate from string to number
  const currentRate = parseFloat(lead.currentRate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl">{lead.name}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant={lead.type === 'Guaranteed' ? 'default' : 'secondary'}
                >
                  {lead.type}
                </Badge>
              </div>
            </div>
            {rank > 0 && (
              <BiddingStatus
                rank={rank}
                previousRank={previousRank}
                totalBids={5}
              />
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 h-[calc(90vh-8rem)]">
          <div className="p-6 space-y-6">
            <LeadStats lead={lead} />
            
            <Separator />

            {lead.type === 'Competitive' && (
              <BiddingForm
                currentRate={currentRate}
                currentBid={currentBid}
                loanAmount={lead.loanAmount}
                onBidSubmit={onBidSubmit}
                onBidWithdraw={onBidWithdraw}
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}