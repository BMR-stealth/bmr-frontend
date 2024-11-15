import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Timer } from 'lucide-react';

const leads = [
  {
    id: 1,
    name: 'Sarah Johnson',
    type: 'Guaranteed',
    loanAmount: '$450,000',
    currentRate: '4.5%',
    status: 'New',
    timeLeft: '2h 15m',
  },
  {
    id: 2,
    name: 'Michael Chen',
    type: 'Competitive',
    loanAmount: '$325,000',
    currentRate: '5.2%',
    status: 'Bidding',
    timeLeft: '45m',
  },
  // Add more leads as needed
];

export function LeadsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Leads</CardTitle>
        <CardDescription>
          Manage your guaranteed and competitive leads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead>Current Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time Left</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={lead.type === 'Guaranteed' ? 'default' : 'secondary'}
                  >
                    {lead.type}
                  </Badge>
                </TableCell>
                <TableCell>{lead.loanAmount}</TableCell>
                <TableCell>{lead.currentRate}</TableCell>
                <TableCell>
                  <Badge
                    variant={lead.status === 'New' ? 'default' : 'secondary'}
                  >
                    {lead.status}
                  </Badge>
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
      </CardContent>
    </Card>
  );
}