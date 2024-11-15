import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PriorityLeadCard } from './priority-lead-card';
import { useToast } from '@/hooks/use-toast';
import { priorityLeads } from './mock-data';

export function PriorityLeads() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (action: string, leadId: string) => {
    const lead = priorityLeads.find(l => l.id === leadId);
    if (!lead) return;

    switch (action) {
      case 'secure':
        toast({
          title: 'Securing Lead',
          description: `Securing guaranteed lead for ${lead.name}...`,
        });
        navigate('/leads');
        break;
      case 'bid':
        toast({
          title: 'Place Bid',
          description: `Opening bidding interface for ${lead.name}...`,
        });
        navigate('/leads');
        break;
      default:
        break;
    }
  };

  // Sort leads by priority and expiry time
  const sortedLeads = [...priorityLeads].sort((a, b) => {
    // Priority order
    const priorityOrder = { high: 1, medium: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Then by expiry time
    return a.expiryTime.getTime() - b.expiryTime.getTime();
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">Priority Leads</CardTitle>
          <p className="text-sm text-muted-foreground">
            Leads requiring immediate attention
          </p>
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
          {sortedLeads.map((lead) => (
            <PriorityLeadCard
              key={lead.id}
              lead={lead}
              onAction={handleAction}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}