import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Timer, 
  TrendingDown, 
  Shield, 
  Gavel, 
  MapPin, 
  CreditCard,
  Star,
  ArrowUpRight,
  Clock,
  Home,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { LeadDetailsModal } from '@/components/leads/lead-details-modal';
import { GuaranteedLeadModal } from '@/components/leads/guaranteed-lead-modal';

interface PriorityLeadCardProps {
  lead: {
    id: string;
    name: string;
    location: string;
    amount: string;
    currentRate: string;
    timeLeft: string;
    type: 'Guaranteed' | 'Competitive';
    priority: 'high' | 'medium';
    lastContacted?: Date;
    lastNote?: string;
    propertyType?: string;
    loanTerm?: string;
    expiryTime: Date;
    isHighValue?: boolean;
    creditScore?: string;
    dti?: string;
    purpose?: string;
  };
  onAction: (action: string, leadId: string) => void;
}

export function PriorityLeadCard({ lead, onAction }: PriorityLeadCardProps) {
  const navigate = useNavigate();
  const [showBiddingModal, setShowBiddingModal] = useState(false);
  const [showGuaranteedModal, setShowGuaranteedModal] = useState(false);
  const timeLeftMs = lead.expiryTime.getTime() - new Date().getTime();
  const isExpiringSoon = timeLeftMs < 30 * 60 * 1000; // Less than 30 minutes
  const progress = (timeLeftMs / (2 * 60 * 60 * 1000)) * 100; // 2 hours total
  const isGuaranteed = lead.type === 'Guaranteed';

  const getTimeLeftColor = () => {
    if (isExpiringSoon) return 'text-destructive';
    if (timeLeftMs < 60 * 60 * 1000) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = () => {
    if (isExpiringSoon) return 'bg-destructive/20';
    if (timeLeftMs < 60 * 60 * 1000) return 'bg-warning/20';
    return 'bg-success/20';
  };

  const handleModalClose = () => {
    setShowBiddingModal(false);
    setShowGuaranteedModal(false);
  };

  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Card 
            className={cn(
              "cursor-pointer transition-all relative group overflow-visible",
              isGuaranteed ? [
                "bg-success/5 hover:bg-success/10",
                "border-success/30 hover:border-success",
                "shadow-[0_0_0_1px] shadow-success/10",
              ] : [
                "hover:bg-accent/5",
                "hover:border-primary",
                "hover:shadow-md"
              ]
            )}
            onClick={() => navigate('/leads')}
          >
            {/* High Value Badge */}
            {lead.isHighValue && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <Badge 
                  variant="warning" 
                  className={cn(
                    "px-3 py-1 shadow-lg font-semibold",
                    "animate-high-value animate-high-value-glow",
                    "border-transparent"
                  )}
                >
                  <Star className="h-3.5 w-3.5 mr-1.5 fill-current animate-star-spin" />
                  High Value Lead
                </Badge>
              </div>
            )}

            {/* Guaranteed Indicator */}
            {isGuaranteed && (
              <div className="absolute top-0 left-0 w-full h-1 bg-success" />
            )}

            <CardContent className="p-4 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isGuaranteed ? (
                    <div className="flex items-center gap-1.5 bg-success text-success-foreground px-2.5 py-1 rounded-md font-medium text-sm">
                      <Shield className="h-3.5 w-3.5" />
                      Guaranteed
                    </div>
                  ) : (
                    <Badge variant="secondary" className="gap-1.5">
                      <Gavel className="h-3.5 w-3.5" />
                      Competitive
                    </Badge>
                  )}
                </div>
                <Badge 
                  variant={lead.priority === 'high' ? 'secondary' : 'outline'}
                  className="capitalize"
                >
                  {lead.priority} Priority
                </Badge>
              </div>

              {/* Lead Info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{lead.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {lead.location}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={cn(
                      "opacity-0 group-hover:opacity-100 transition-opacity",
                      isGuaranteed && "hover:text-success"
                    )}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CreditCard className="h-3 w-3" />
                      Loan Amount
                    </div>
                    <p className="font-semibold">{lead.amount}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <TrendingDown className="h-3 w-3" />
                      Current Rate
                    </div>
                    <p className="font-semibold">{lead.currentRate}</p>
                  </div>
                </div>

                {/* Time Remaining Section */}
                <div className={cn(
                  "space-y-2 p-3 rounded-lg",
                  isGuaranteed ? "bg-success/10" : "bg-accent/50"
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Timer className={cn(
                        "h-4 w-4",
                        getTimeLeftColor()
                      )} />
                      <span className={cn(
                        "text-sm font-medium",
                        isExpiringSoon && "text-destructive"
                      )}>
                        {lead.timeLeft} remaining
                      </span>
                    </div>
                    {isExpiringSoon && (
                      <div className="flex items-center gap-1 text-destructive">
                        <AlertTriangle className="h-3 w-3" />
                        <span className="text-xs font-medium">Expiring Soon!</span>
                      </div>
                    )}
                  </div>
                  <Progress 
                    value={progress} 
                    className={cn(
                      "h-1.5",
                      "[&>div]:transition-all [&>div]:duration-500",
                      getProgressColor()
                    )} 
                  />
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className={cn(
                  "w-full font-medium",
                  isGuaranteed ? [
                    "animate-gradient animate-secure-pulse",
                    "text-success-foreground",
                    "border-none"
                  ] : [
                    "animate-bid-gradient animate-bid-pulse",
                    "text-primary-foreground",
                    "border-none"
                  ]
                )}
                variant={isGuaranteed ? 'default' : 'default'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isGuaranteed) {
                    setShowGuaranteedModal(true);
                  } else {
                    setShowBiddingModal(true);
                  }
                }}
              >
                {isGuaranteed ? (
                  <>
                    Secure Guaranteed Lead
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Place Competitive Bid
                    <Gavel className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Lead Details</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Home className="h-3 w-3" />
                    Property Type
                  </div>
                  <p className="font-medium">{lead.propertyType || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Loan Term
                  </div>
                  <p className="font-medium">{lead.loanTerm || 'N/A'}</p>
                </div>
                {lead.creditScore && (
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Credit Score:</span>
                    <p className="font-medium">{lead.creditScore}</p>
                  </div>
                )}
                {lead.dti && (
                  <div className="space-y-1">
                    <span className="text-muted-foreground">DTI Ratio:</span>
                    <p className="font-medium">{lead.dti}</p>
                  </div>
                )}
                {lead.purpose && (
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Purpose:</span>
                    <p className="font-medium">{lead.purpose}</p>
                  </div>
                )}
              </div>
            </div>

            {lead.lastContacted && (
              <div className="space-y-1 text-sm">
                <span className="text-muted-foreground">Last Contact:</span>
                <p className="font-medium">
                  {formatDistanceToNow(lead.lastContacted, { addSuffix: true })}
                </p>
              </div>
            )}

            {lead.lastNote && (
              <div className="space-y-1 text-sm">
                <span className="text-muted-foreground">Latest Note:</span>
                <p className="font-medium">{lead.lastNote}</p>
              </div>
            )}

            <Button 
              className={cn(
                "w-full",
                isGuaranteed && "text-success hover:text-success"
              )}
              variant="ghost"
              size="sm"
              onClick={() => navigate('/leads')}
            >
              View Full Details
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Modals */}
      {showBiddingModal && (
        <LeadDetailsModal
          lead={{
            id: lead.id,
            name: lead.name,
            type: lead.type,
            location: lead.location,
            loanAmount: lead.amount,
            currentRate: lead.currentRate,
            creditScore: lead.creditScore || '',
            dti: lead.dti || '',
            timeLeft: lead.timeLeft,
            expiryTime: lead.expiryTime,
          }}
          isOpen={showBiddingModal}
          onClose={handleModalClose}
          currentBid={null}
          rank={0}
          onBidSubmit={() => {}}
          onBidWithdraw={() => {}}
        />
      )}

      {showGuaranteedModal && (
        <GuaranteedLeadModal
          lead={{
            id: lead.id,
            name: lead.name,
            loanAmount: lead.amount,
            currentRate: lead.currentRate,
          }}
          isOpen={showGuaranteedModal}
          onClose={handleModalClose}
          onSecure={() => onAction('secure', lead.id)}
        />
      )}
    </>
  );
}