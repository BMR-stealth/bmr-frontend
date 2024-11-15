import { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const statusConfig = {
  'contacted': {
    label: 'Contacted',
    variant: 'default' as const,
    description: 'Initial contact made with the lead',
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'secondary' as const,
    description: 'Actively working with the lead',
  },
  'closed': {
    label: 'Closed',
    variant: 'success' as const,
    description: 'Successfully closed the loan',
  },
} as const;

type StatusType = keyof typeof statusConfig;

interface WonBidStatusBadgeProps {
  status: StatusType;
}

export const WonBidStatusBadge = forwardRef<HTMLDivElement, WonBidStatusBadgeProps>(
  ({ status }, ref) => {
    const config = statusConfig[status];

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span ref={ref}>
              <Badge variant={config.variant}>
                {config.label}
              </Badge>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{config.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);