import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Download } from 'lucide-react';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your leads today.
        </p>
      </div>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Download Report
      </Button>
    </div>
  );
}