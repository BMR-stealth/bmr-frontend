import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  FileText,
  CreditCard,
  Percent,
  Clock,
  Plus,
} from 'lucide-react';
import { format } from 'date-fns';
import { WonBidStatusBadge } from './won-bid-status-badge';
import { useState } from 'react';

interface WonBidDetailsModalProps {
  bid: {
    name: string;
    email: string;
    phone: string;
    location: string;
    loanType: string;
    loanAmount: string;
    finalRate: string;
    status: 'contacted' | 'in-progress' | 'closed';
    wonDate: Date;
    lastContacted: Date;
    nextFollowUp: Date | null;
    notes: Array<{
      id: string;
      content: string;
      timestamp: Date;
      author: string;
    }>;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function WonBidDetailsModal({
  bid,
  isOpen,
  onClose,
}: WonBidDetailsModalProps) {
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      // Handle adding note
      setNote('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{bid.name}</DialogTitle>
            <WonBidStatusBadge status={bid.status} />
          </div>
          <DialogDescription>
            View and manage lead details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => window.location.href = `mailto:${bid.email}`}
            >
              <Mail className="h-4 w-4" />
              {bid.email}
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2"
              onClick={() => window.location.href = `tel:${bid.phone}`}
            >
              <Phone className="h-4 w-4" />
              {bid.phone}
            </Button>
          </div>

          <Separator />

          {/* Loan Details */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{bid.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>{bid.loanAmount}</span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <span>{bid.finalRate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Won {format(bid.wonDate, 'MMM d, yyyy')}</span>
            </div>
          </div>

          <Separator />

          {/* Follow-up Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Follow-up Timeline</h3>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Follow-up
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Last Contact</p>
                <p className="font-medium">
                  {bid.lastContacted ? format(bid.lastContacted, 'MMM d, yyyy') : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Follow-up</p>
                <p className="font-medium">
                  {bid.nextFollowUp ? format(bid.nextFollowUp, 'MMM d, yyyy') : '-'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notes</h3>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View All Notes
              </Button>
            </div>
            <div className="space-y-4">
              {bid.notes.map((note) => (
                <div key={note.id} className="rounded-lg border p-4">
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Added by {note.author} on {format(note.timestamp, 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a new note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button className="shrink-0" onClick={handleAddNote}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}