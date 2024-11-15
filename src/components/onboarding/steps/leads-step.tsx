import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Timer } from 'lucide-react';

const demoLeads = [
  {
    name: 'Sarah Johnson',
    type: 'Guaranteed',
    amount: '$450,000',
    status: 'New',
    timeLeft: '2h 15m',
  },
  {
    name: 'Michael Chen',
    type: 'Competitive',
    amount: '$325,000',
    status: 'Bidding',
    timeLeft: '45m',
  },
];

export function LeadsStep() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        The Leads page is where you'll manage your active leads and track their progress.
      </p>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time Left</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoLeads.map((lead) => (
              <TableRow key={lead.name}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={lead.type === 'Guaranteed' ? 'default' : 'secondary'}
                  >
                    {lead.type}
                  </Badge>
                </TableCell>
                <TableCell>{lead.amount}</TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.status}</Badge>
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  {lead.timeLeft}
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">
                    View <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}