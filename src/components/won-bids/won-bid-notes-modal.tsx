import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
}

interface WonBidNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  bid: {
    name: string;
    notes: Note[];
  };
  onAddNote: (note: string) => void;
}

export function WonBidNotesModal({
  isOpen,
  onClose,
  bid,
  onAddNote,
}: WonBidNotesModalProps) {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Notes for {bid.name}</DialogTitle>
          <DialogDescription>
            View and add notes for this lead
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            <Textarea
              placeholder="Add a new note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={handleSubmit} disabled={!newNote.trim()}>
              Add Note
            </Button>
          </div>
          <ScrollArea className="h-[300px] rounded-md border p-4">
            {bid.notes.length > 0 ? (
              <div className="space-y-4">
                {bid.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border p-4 space-y-2"
                  >
                    <p className="text-sm">{note.content}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{note.author}</span>
                      <span>{format(note.timestamp, 'MMM d, yyyy h:mm a')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No notes yet. Add your first note above.
              </p>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}