import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageSquare } from 'lucide-react';

interface WonBidContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  bid: {
    name: string;
    email: string;
    phone: string;
  };
  onContactMethodSelected: (method: 'email' | 'phone' | 'message') => void;
}

export function WonBidContactModal({
  isOpen,
  onClose,
  bid,
  onContactMethodSelected,
}: WonBidContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact {bid.name}</DialogTitle>
          <DialogDescription>
            Choose how you would like to contact this lead
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => onContactMethodSelected('phone')}
          >
            <Phone className="h-4 w-4" />
            Call {bid.phone}
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => onContactMethodSelected('email')}
          >
            <Mail className="h-4 w-4" />
            Email {bid.email}
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => onContactMethodSelected('message')}
          >
            <MessageSquare className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}