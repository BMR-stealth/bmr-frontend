import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Bid {
  amount: number;
  timestamp: Date;
}

interface BiddingHistoryProps {
  bids: Bid[];
}

export function BiddingHistory({ bids }: BiddingHistoryProps) {
  // Group similar bids
  const groupedBids = bids.reduce((acc, bid) => {
    const key = bid.amount.toString();
    if (!acc[key]) {
      acc[key] = {
        amount: bid.amount,
        count: 1,
        lastUpdate: bid.timestamp,
      };
    } else {
      acc[key].count++;
      if (bid.timestamp > acc[key].lastUpdate) {
        acc[key].lastUpdate = bid.timestamp;
      }
    }
    return acc;
  }, {} as Record<string, { amount: number; count: number; lastUpdate: Date }>);

  if (bids.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No bids placed yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Bid History</h2>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter bids" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All bids</SelectItem>
            <SelectItem value="recent">Last 5 bids</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bid Amount</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Last Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.values(groupedBids).map((bid, index) => (
            <TableRow key={index} className={index === 0 ? 'bg-muted/50' : ''}>
              <TableCell className="font-medium">
                {bid.amount}%
                {index === 0 && <Badge className="ml-2">Latest</Badge>}
              </TableCell>
              <TableCell>
                {bid.count} {bid.count === 1 ? 'time' : 'times'}
              </TableCell>
              <TableCell>{format(bid.lastUpdate, 'MMM d, h:mm a')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}