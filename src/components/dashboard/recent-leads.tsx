import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

const recentLeads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    type: 'Guaranteed',
    amount: '$450,000',
    status: 'New',
  },
  {
    id: 2,
    name: 'Michael Chen',
    type: 'Competitive',
    amount: '$325,000',
    status: 'Bidding',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    type: 'Guaranteed',
    amount: '$275,000',
    status: 'New',
  },
];

export function RecentLeads() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Your latest lead opportunities</CardDescription>
        </div>
        <Button variant="ghost" className="gap-2">
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {lead.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {lead.amount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={lead.type === 'Guaranteed' ? 'default' : 'secondary'}
                >
                  {lead.type}
                </Badge>
                <Badge variant="outline">{lead.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}