import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

export function BiddingStep() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Learn how to place competitive bids and track your bidding performance.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-6">
          <div>
            <Label>Your Bid Rate</Label>
            <div className="flex items-center gap-4 mt-2">
              <Input
                type="number"
                value="4.5"
                className="text-2xl font-bold"
                readOnly
              />
              <span className="text-2xl font-bold">%</span>
            </div>
          </div>

          <div className="space-y-4">
            <Slider
              defaultValue={[4.5]}
              max={8}
              min={3}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>3.0%</span>
              <span>8.0%</span>
            </div>
          </div>

          <Button className="w-full">Place Bid</Button>
        </Card>

        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Trophy className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Current Rank</span>
                <span className="text-primary">#2</span>
              </div>
              <Progress value={75} />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Bidding Tips:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Lower rates increase your chances of winning</li>
              <li>• Monitor your rank to stay competitive</li>
              <li>• Quick response times improve your score</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}