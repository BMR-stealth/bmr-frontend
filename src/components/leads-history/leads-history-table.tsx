import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
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
import { Button } from '@/components/ui/button';
import { Eye, MapPin, Download } from 'lucide-react';
import { LeadDetailsModal } from './lead-details-modal';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LeadsHistoryTableProps {
  searchQuery: string;
  dateRange: DateRange | undefined;
  filters: {
    type: string;
    status: string;
    location: string;
    loanType: string;
  };
}

const historicalLeads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: {
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
    },
    contact: {
      email: 'sarah.j@example.com',
      phone: '(555) 123-4567',
    },
    creditScore: '720-740',
    dti: '35%',
    employment: {
      status: 'Employed',
      yearsEmployed: 5,
      annualIncome: '$120,000',
    },
    loan: {
      type: 'Purchase',
      amount: '$450,000',
      finalRate: '4.5%',
      term: '30 years',
      status: 'won',
      closeDate: new Date(2024, 2, 15),
      outcomeReason: 'Competitive rate and quick response',
      competition: {
        totalLenders: 4,
        rank: 1,
        winningRate: '4.5%',
      },
    },
    history: {
      contacts: [
        {
          date: new Date(2024, 2, 10),
          type: 'Phone Call',
          notes: 'Initial consultation',
        },
        {
          date: new Date(2024, 2, 12),
          type: 'Email',
          notes: 'Sent rate quote',
        },
      ],
      notes: [
        {
          date: new Date(2024, 2, 10),
          author: 'John Smith',
          content: 'Strong candidate, very responsive',
        },
      ],
      documents: [
        {
          name: 'Rate Quote.pdf',
          url: '/documents/rate-quote.pdf',
          date: new Date(2024, 2, 12),
        },
      ],
    },
  },
  // Add more historical leads here...
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'won':
      return 'success';
    case 'lost':
      return 'destructive';
    case 'withdrawn':
      return 'secondary';
    default:
      return 'outline';
  }
};

export function LeadsHistoryTable({
  searchQuery,
  dateRange,
  filters,
}: LeadsHistoryTableProps) {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const { toast } = useToast();

  const filteredLeads = historicalLeads.filter((lead) => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(searchLower) ||
        `${lead.location.city}, ${lead.location.state}`.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleDownload = (documentUrl: string, documentName: string) => {
    // In a real app, this would handle document downloads
    toast({
      title: 'Downloading Document',
      description: `Downloading ${documentName}...`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Past Leads</CardTitle>
        <CardDescription>
          Review and analyze your historical lead interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Loan Type</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead>Final Rate</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Close Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {lead.location.city}, {lead.location.state}
                  </div>
                </TableCell>
                <TableCell>{lead.loan.type}</TableCell>
                <TableCell>{lead.loan.amount}</TableCell>
                <TableCell>{lead.loan.finalRate}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(lead.loan.status)}>
                    {lead.loan.status.charAt(0).toUpperCase() + lead.loan.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(lead.loan.closeDate, 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {lead.history.documents.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDownload(
                            lead.history.documents[0].url,
                            lead.history.documents[0].name
                          )
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedLead && (
          <LeadDetailsModal
            lead={selectedLead}
            isOpen={!!selectedLead}
            onClose={() => setSelectedLead(null)}
            onDownload={handleDownload}
          />
        )}
      </CardContent>
    </Card>
  );
}