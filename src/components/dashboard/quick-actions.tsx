import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Gavel, 
  PhoneCall, 
  Bell, 
  Trophy,
  ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QuickAction {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: () => void;
  variant?: 'default' | 'success' | 'warning' | 'info';
  badge?: {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'outline';
  };
}

export function QuickActions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFollowUp = () => {
    toast({
      title: "Follow-up Scheduled",
      description: "A reminder has been set for your next follow-up call."
    });
  };

  const actions: QuickAction[] = [
    {
      icon: <Gavel className="h-4 w-4" />,
      title: "Active Leads",
      description: "3 leads require your attention",
      action: () => navigate('/leads'),
      variant: 'info',
      badge: {
        text: "3 New",
        variant: 'default'
      }
    },
    {
      icon: <PhoneCall className="h-4 w-4" />,
      title: "Follow-ups Due",
      description: "2 follow-ups scheduled today",
      action: handleFollowUp,
      variant: 'warning',
      badge: {
        text: "2 Due",
        variant: 'warning'
      }
    },
    {
      icon: <Bell className="h-4 w-4" />,
      title: "Recent Outbids",
      description: "You've been outbid on 2 leads",
      action: () => navigate('/leads'),
      variant: 'warning',
      badge: {
        text: "Action Needed",
        variant: 'warning'
      }
    },
    {
      icon: <Trophy className="h-4 w-4" />,
      title: "Recent Wins",
      description: "View your recently won leads",
      action: () => navigate('/won'),
      variant: 'success',
      badge: {
        text: "2 New",
        variant: 'success'
      }
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "h-auto flex-col items-stretch gap-2 p-4 hover:bg-primary/5",
              action.variant === 'success' && "border-success/30 hover:border-success/50 hover:bg-success/5",
              action.variant === 'warning' && "border-warning/30 hover:border-warning/50 hover:bg-warning/5",
              action.variant === 'info' && "border-primary/30 hover:border-primary/50"
            )}
            onClick={action.action}
          >
            <div className="flex items-center justify-between w-full">
              <div className={cn(
                "p-2 rounded-full",
                action.variant === 'success' && "bg-success/10 text-success",
                action.variant === 'warning' && "bg-warning/10 text-warning",
                action.variant === 'info' && "bg-primary/10 text-primary"
              )}>
                {action.icon}
              </div>
              {action.badge && (
                <Badge variant={action.badge.variant}>
                  {action.badge.text}
                </Badge>
              )}
            </div>
            <div className="text-left space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{action.title}</h3>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                {action.description}
              </p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}