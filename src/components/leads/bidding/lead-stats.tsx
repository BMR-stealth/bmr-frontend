import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MapPin, CreditCard, Percent, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface LeadStatsProps {
  lead: {
    location: string | { city: string; state: string; zip: string };
    loanAmount: string;
    currentRate: string;
    creditScore?: string;
    dti?: string;
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

export function LeadStats({ lead }: LeadStatsProps) {
  const creditScoreInfo = lead.creditScore ? getCreditScoreInfo(lead.creditScore) : null;
  const dtiInfo = lead.dti ? getDTIInfo(lead.dti) : null;

  // Format location string if it's an object
  const locationString = typeof lead.location === 'string' 
    ? lead.location 
    : `${lead.location.city}, ${lead.location.state} ${lead.location.zip}`;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="truncate">{locationString}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="truncate">{lead.loanAmount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="font-semibold truncate">{lead.currentRate}% Current Rate</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Credit Score Range</h3>
            {creditScoreInfo && (
              <Badge variant={creditScoreInfo.color as any}>
                {creditScoreInfo.label}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{lead.creditScore || 'N/A'}</span>
            {creditScoreInfo && (
              <div className={cn(
                "rounded-full p-1",
                creditScoreInfo.color === 'success' && "text-success bg-success/10",
                creditScoreInfo.color === 'primary' && "text-primary bg-primary/10",
                creditScoreInfo.color === 'warning' && "text-warning bg-warning/10",
                creditScoreInfo.color === 'destructive' && "text-destructive bg-destructive/10"
              )}>
                {creditScoreInfo.color === 'success' && <CheckCircle2 className="h-4 w-4" />}
                {creditScoreInfo.color === 'primary' && <CheckCircle2 className="h-4 w-4" />}
                {creditScoreInfo.color === 'warning' && <AlertTriangle className="h-4 w-4" />}
                {creditScoreInfo.color === 'destructive' && <AlertCircle className="h-4 w-4" />}
              </div>
            )}
          </div>
          {creditScoreInfo && (
            <Progress 
              value={creditScoreInfo.progress} 
              className={cn(
                "h-2",
                creditScoreInfo.color === 'success' && "bg-success/20",
                creditScoreInfo.color === 'primary' && "bg-primary/20",
                creditScoreInfo.color === 'warning' && "bg-warning/20",
                creditScoreInfo.color === 'destructive' && "bg-destructive/20"
              )}
            />
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Debt-to-Income Ratio</h3>
            {dtiInfo && (
              <Badge variant={dtiInfo.color as any}>
                {dtiInfo.label}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{lead.dti || 'N/A'}</span>
            {dtiInfo && (
              <div className={cn(
                "rounded-full p-1",
                dtiInfo.color === 'success' && "text-success bg-success/10",
                dtiInfo.color === 'primary' && "text-primary bg-primary/10",
                dtiInfo.color === 'warning' && "text-warning bg-warning/10",
                dtiInfo.color === 'destructive' && "text-destructive bg-destructive/10"
              )}>
                {dtiInfo.color === 'success' && <CheckCircle2 className="h-4 w-4" />}
                {dtiInfo.color === 'primary' && <CheckCircle2 className="h-4 w-4" />}
                {dtiInfo.color === 'warning' && <AlertTriangle className="h-4 w-4" />}
                {dtiInfo.color === 'destructive' && <AlertCircle className="h-4 w-4" />}
              </div>
            )}
          </div>
          {dtiInfo && (
            <Progress 
              value={dtiInfo.progress}
              className={cn(
                "h-2",
                dtiInfo.color === 'success' && "bg-success/20",
                dtiInfo.color === 'primary' && "bg-primary/20",
                dtiInfo.color === 'warning' && "bg-warning/20",
                dtiInfo.color === 'destructive' && "bg-destructive/20"
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}