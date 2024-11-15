import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, CreditCard, Percent, Calendar } from 'lucide-react';
import { BiddingRank } from './bidding-rank';

export interface BiddingHeaderProps {
  leadId: string;
  expiryTime: Date;
  rank: number;
  previousRank?: number;
}
export function BiddingHeader({ leadId, expiryTime, rank, previousRank }: BiddingHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Lead {leadId}</h1>
              <Badge variant={rank === 1 ? 'default' : 'secondary'}>
                {rank === 0 ? 'No Active Bid' : `Rank #${rank}`}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Seattle, WA</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Purchase</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>$325,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span>5.2% Current</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-6">
            <BiddingRank
              rank={rank}
              previousRank={previousRank}
              expiryTime={expiryTime}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}