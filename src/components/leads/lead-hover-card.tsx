import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Building2, 
  Clock,
  CreditCard, 
  CheckCircle2,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadHoverCardProps {
  children: React.ReactNode;
  lead: {
    creditScore: string;
    dti: string;
    propertyDetails: {
      type: string;
      bedrooms: number;
      bathrooms: number;
      yearBuilt: number;
    };
    location: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    loanTerm: string;
    purpose: string;
  };
}

function getCreditScoreInfo(score: string) {
  const [min] = score.split('-').map(Number);
  
  if (min >= 740) return { label: 'Excellent', color: 'success', progress: 100 };
  if (min >= 670) return { label: 'Good', color: 'primary', progress: 75 };
  if (min >= 580) return { label: 'Fair', color: 'warning', progress: 50 };
  return { label: 'Poor', color: 'destructive', progress: 25 };
}

function getDTIInfo(dti: string) {
  const value = parseInt(dti);
  
  if (value <= 28) return { label: 'Excellent', color: 'success', progress: 100 };
  if (value <= 36) return { label: 'Good', color: 'primary', progress: 75 };
  if (value <= 43) return { label: 'Fair', color: 'warning', progress: 50 };
  return { label: 'High', color: 'destructive', progress: 25 };
}

function LoanDetails({ lead }: { lead: LeadHoverCardProps['lead'] }) {
  const creditScoreInfo = getCreditScoreInfo(lead.creditScore);
  const dtiInfo = getDTIInfo(lead.dti);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Credit Score</span>
          <Badge variant={creditScoreInfo.color as any}>{creditScoreInfo.label}</Badge>
        </div>
        <div className="text-lg font-semibold">{lead.creditScore}</div>
        <Progress value={creditScoreInfo.progress} className="h-1" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">DTI Ratio</span>
          <Badge variant={dtiInfo.color as any}>{dtiInfo.label}</Badge>
        </div>
        <div className="text-lg font-semibold">{lead.dti}</div>
        <Progress value={dtiInfo.progress} className="h-1" />
      </div>
    </div>
  );
}

function PropertyDetails({ details }: { details: LeadHoverCardProps['lead']['propertyDetails'] }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Property Details</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Type:</span> {details.type}
        </div>
        <div>
          <span className="text-muted-foreground">Year Built:</span> {details.yearBuilt}
        </div>
        <div>
          <span className="text-muted-foreground">Beds:</span> {details.bedrooms}
        </div>
        <div>
          <span className="text-muted-foreground">Baths:</span> {details.bathrooms}
        </div>
      </div>
    </div>
  );
}

function LocationInfo({ location }: { location: LeadHoverCardProps['lead']['location'] }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Location</span>
      </div>
      <div className="text-sm">
        <div>{location.street}</div>
        <div>{location.city}, {location.state} {location.zip}</div>
      </div>
    </div>
  );
}

export function LeadHoverCard({ children, lead }: LeadHoverCardProps) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
        side="right" 
        align="start" 
        className="w-[350px] p-4"
        sideOffset={10}
      >
        <div className="space-y-4">
          <LoanDetails lead={lead} />
          <PropertyDetails details={lead.propertyDetails} />
          <LocationInfo location={lead.location} />

          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lead.loanTerm}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{lead.purpose}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}