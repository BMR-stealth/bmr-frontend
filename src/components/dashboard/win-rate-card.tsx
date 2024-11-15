import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function WinRateCard() {
  const navigate = useNavigate();
  const winRate = 68;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Win Rate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{winRate}%</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            <span>+12%</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Top 15% in your region
          </p>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={() => navigate('/performance')}
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}