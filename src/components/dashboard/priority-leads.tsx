import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, TrendingDown, Shield, Gavel, AlertTriangle, MapPin, ArrowUpRight, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const priorityLeads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    amount: '$450,000',
    currentRate: '4.5%',
    timeLeft: '2h 15m',
    type: 'Guaranteed',
    priority: 'urgent',
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Seattle, WA',
    amount: '$325,000',
    currentRate: '5.2%',
    timeLeft: '45m',
    type: 'Competitive',
    priority: 'high',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'Los Angeles, CA',
    amount: '$275,000',
    currentRate: '4.8%',
    timeLeft: '1h 30m',
    type: 'Guaranteed',
    priority: 'medium',
  },
];

export function PriorityLeads() {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-destructive';
      case 'high': return 'text-success';
      default: return 'text-primary';
    }
  };

  const getTimeLeftColor = (timeLeft: string) => {
    const hours = parseInt(timeLeft);
    if (hours < 1) return 'text-destructive';
    if (hours < 2) return 'text-warning';
    return 'text-success';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">Priority Leads</CardTitle>
          <p className="text-sm text-muted-foreground">Leads requiring immediate attention</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/leads')}
          className="gap-2"
        >
          View All
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {priorityLeads.map((lead) => (
            <TooltipProvider key={lead.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      lead.type === 'Guaranteed' && "bg-success/5 border-success/20",
                      lead.priority === 'urgent' && "animate-pulse"
                    )}
                    onClick={() => navigate('/leads')}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {lead.type === 'Guaranteed' ? (
                            <Shield className="h-4 w-4 text-success" />
                          ) : (
                            <Gavel className="h-4 w-4 text-primary" />
                          )}
                          <Badge variant={lead.type === 'Guaranteed' ? 'success' : 'default'}>
                            {lead.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Timer className={cn(
                            "h-4 w-4",
                            getTimeLeftColor(lead.timeLeft)
                          )} />
                          <span className="text-sm">{lead.timeLeft}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm">{lead.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {lead.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span>{lead.amount}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <TrendingDown className="h-3 w-3" />
                              {lead.currentRate}
                            </div>
                          </div>
                        </div>

                        {lead.priority === 'urgent' && (
                          <div className="flex items-center gap-1 text-xs text-destructive">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Urgent attention needed!</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to view lead details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}