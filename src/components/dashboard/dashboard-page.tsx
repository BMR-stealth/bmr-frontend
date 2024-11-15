import { DashboardHeader } from './dashboard-header';
import { PriorityLeads } from './priority-leads/priority-leads';
import { QuickActions } from './quick-actions';
import { PerformanceInsights } from './performance-insights';
import { UpcomingFollowUps } from './upcoming-follow-ups';
import { DashboardMetrics } from './dashboard-metrics';

export function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <DashboardHeader />
      
      {/* Quick Actions - Full Width */}
      <QuickActions />

      {/* Priority Leads - Full Width */}
      <PriorityLeads />

      {/* Three Column Layout for Analytics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-1">
          <DashboardMetrics />
        </div>
        <PerformanceInsights />
        <UpcomingFollowUps />
      </div>
    </div>
  );
}