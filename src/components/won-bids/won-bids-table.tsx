import { useState } from 'react';
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
import { MapPin } from 'lucide-react';
import { WonBidStatusBadge } from './won-bid-status-badge';
import { WonBidDetailsModal } from './won-bid-details-modal';
import { WonBidContactModal } from './won-bid-contact-modal';
import { WonBidNotesModal } from './won-bid-notes-modal';
import { WonBidActions } from './won-bid-actions';
import { useToast } from '@/hooks/use-toast';

interface WonBidsTableProps {
  searchQuery: string;
  dateRange: DateRange | undefined;
  filters: {
    status: string;
    loanType: string;
    location: string;
  };
}

const wonBids = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    loanType: 'Purchase',
    loanAmount: '$450,000',
    finalRate: '4.5%',
    status: 'contacted',
    wonDate: new Date(2024, 2, 15),
    lastContacted: new Date(2024, 2, 16),
    nextFollowUp: new Date(2024, 2, 20),
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    notes: [
      {
        id: '1',
        content: 'Initial contact made. Very interested in proceeding.',
        timestamp: new Date(2024, 2, 16),
        author: 'John Smith',
      },
    ],
  },
  // Add more mock data as needed
];

export function WonBidsTable({
  searchQuery,
  dateRange,
  filters,
}: WonBidsTableProps) {
  const [selectedBid, setSelectedBid] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const { toast } = useToast();

  const handleContactMethodSelected = (method: string) => {
    setShowContactModal(false);
    toast({
      title: 'Contact Initiated',
      description: `Initiating ${method} contact with ${selectedBid?.name}`,
    });
  };

  const handleAddNote = (note: string) => {
    toast({
      title: 'Note Added',
      description: 'Your note has been saved successfully.',
    });
  };

  const filteredBids = wonBids.filter((bid) => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        bid.name.toLowerCase().includes(searchLower) ||
        bid.location.toLowerCase().includes(searchLower) ||
        bid.loanType.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Won Opportunities</CardTitle>
        <CardDescription>
          Manage and track your successful bids
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
              <TableHead>Last Contact</TableHead>
              <TableHead>Next Follow-up</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell className="font-medium">{bid.name}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {bid.location}
                </TableCell>
                <TableCell>{bid.loanType}</TableCell>
                <TableCell>{bid.loanAmount}</TableCell>
                <TableCell>{bid.finalRate}</TableCell>
                <TableCell>
                  <WonBidStatusBadge status={bid.status} />
                </TableCell>
                <TableCell>
                  {bid.lastContacted ? format(bid.lastContacted, 'MMM d, yyyy') : '-'}
                </TableCell>
                <TableCell>
                  {bid.nextFollowUp ? format(bid.nextFollowUp, 'MMM d, yyyy') : '-'}
                </TableCell>
                <TableCell>
                  <WonBidActions
                    bid={bid}
                    onViewDetails={() => setSelectedBid(bid)}
                    onContact={() => {
                      setSelectedBid(bid);
                      setShowContactModal(true);
                    }}
                    onSchedule={() => {
                      toast({
                        title: 'Schedule Follow-up',
                        description: 'Opening scheduler...',
                      });
                    }}
                    onNotes={() => {
                      setSelectedBid(bid);
                      setShowNotesModal(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedBid && (
          <>
            <WonBidDetailsModal
              bid={selectedBid}
              isOpen={!!selectedBid && !showContactModal && !showNotesModal}
              onClose={() => setSelectedBid(null)}
            />
            <WonBidContactModal
              isOpen={showContactModal}
              onClose={() => setShowContactModal(false)}
              bid={selectedBid}
              onContactMethodSelected={handleContactMethodSelected}
            />
            <WonBidNotesModal
              isOpen={showNotesModal}
              onClose={() => setShowNotesModal(false)}
              bid={selectedBid}
              onAddNote={handleAddNote}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}