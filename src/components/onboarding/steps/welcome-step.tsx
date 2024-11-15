import { Card } from '@/components/ui/card';
import { CircleUserRound, BarChart3, Timer } from 'lucide-react';

export function WelcomeStep() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Welcome to the Loan Officer Dashboard! Let's get you set up to manage your leads and track your performance effectively.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 space-y-4">
          <CircleUserRound className="h-12 w-12 text-primary" />
          <h3 className="font-semibold">Lead Management</h3>
          <p className="text-sm text-muted-foreground">
            Easily track and manage your leads from initial contact through to closing.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <Timer className="h-12 w-12 text-primary" />
          <h3 className="font-semibold">Real-time Bidding</h3>
          <p className="text-sm text-muted-foreground">
            Place and track bids in real-time, with instant updates on your bid status.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <BarChart3 className="h-12 w-12 text-primary" />
          <h3 className="font-semibold">Performance Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your success with detailed analytics and performance metrics.
          </p>
        </Card>
      </div>
    </div>
  );
}