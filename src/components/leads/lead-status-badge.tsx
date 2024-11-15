import { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const statusConfig = {
  'new': {
    label: 'New',
    variant: 'default' as const,
    description: 'This lead is new and waiting for your bid',
  },
  'bidding': {
    label: 'Bidding',
    variant: 'secondary' as const,
    description: 'This lead has active bids in progress',
  },
} as const;

type StatusType = keyof typeof statusConfig;

interface LeadStatusBadgeProps {
  status: StatusType;
}

export const LeadStatusBadge = forwardRef<HTMLDivElement, LeadStatusBadgeProps>(
  ({ status }, ref) => {
    const config = statusConfig[status];

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div ref={ref}>
              <Badge variant={config.variant} className="whitespace-nowrap">
                {config.label}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{config.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);