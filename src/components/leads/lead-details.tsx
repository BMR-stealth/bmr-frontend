import {
  Card,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface LeadDetailsProps {
  lead: {
    creditScore: string;
    dti: string;
    [key: string]: any;
  };
}

export function LeadDetails({ lead }: LeadDetailsProps) {
  return (
    <Card className="mt-2">
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <CardDescription>Credit Score Range</CardDescription>
            <p className="text-lg font-semibold">{lead.creditScore}</p>
            <Progress
              value={parseInt(lead.creditScore.split('-')[0]) / 8.5}
              className="mt-2"
            />
          </div>
          <div>
            <CardDescription>Debt-to-Income Ratio</CardDescription>
            <p className="text-lg font-semibold">{lead.dti}</p>
            <Progress
              value={parseInt(lead.dti)}
              className="mt-2"
            />
          </div>
          <div>
            <CardDescription>Additional Notes</CardDescription>
            <p className="text-sm text-muted-foreground">
              Pre-approved by another lender. Looking to close within 45 days.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}