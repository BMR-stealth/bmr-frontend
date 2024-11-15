import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MapPin, CreditCard, Percent } from 'lucide-react';

interface LeadInfoProps {
  lead: {
    location: string;
    loanAmount: string;
    currentRate: string;
    creditScore?: string; // Make optional
    dti?: string; // Make optional
  };
}

export function LeadInfo({ lead }: LeadInfoProps) {
  // Safely parse credit score
  const creditScoreValue = lead.creditScore 
    ? parseInt(lead.creditScore.split('-')[0]) / 8.5 
    : 0;

  // Safely parse DTI
  const dtiValue = lead.dti 
    ? parseInt(lead.dti) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{lead.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <span>{lead.loanAmount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{lead.currentRate} Current Rate</span>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium mb-2">Credit Score Range</h3>
              <p className="text-2xl font-bold mb-2">
                {lead.creditScore || 'N/A'}
              </p>
              <Progress value={creditScoreValue} />
            </div>
            <div>
              <h3 className="font-medium mb-2">Debt-to-Income Ratio</h3>
              <p className="text-2xl font-bold mb-2">
                {lead.dti || 'N/A'}
              </p>
              <Progress value={dtiValue} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}