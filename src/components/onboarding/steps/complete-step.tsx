import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

export function CompleteStep() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold">You're All Set!</h3>
        <p className="text-muted-foreground mt-2">
          You've completed the onboarding process and are ready to start using the Loan Officer Dashboard.
        </p>
      </div>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Quick Reference Guide</h4>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
              <span className="font-semibold">1</span>
            </div>
            <div>
              <p className="font-medium">View Your Dashboard</p>
              <p className="text-sm text-muted-foreground">
                Get an overview of your performance and active leads
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
              <span className="font-semibold">2</span>
            </div>
            <div>
              <p className="font-medium">Manage Leads</p>
              <p className="text-sm text-muted-foreground">
                Track and respond to new leads in the Leads section
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
              <span className="font-semibold">3</span>
            </div>
            <div>
              <p className="font-medium">Place Bids</p>
              <p className="text-sm text-muted-foreground">
                Compete for leads by placing competitive bids
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 shrink-0">
              <span className="font-semibold">4</span>
            </div>
            <div>
              <p className="font-medium">Track Performance</p>
              <p className="text-sm text-muted-foreground">
                Monitor your metrics and improve your success rate
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}