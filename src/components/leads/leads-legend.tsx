import { Shield, Gavel } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function LeadsLegend() {
  return (
    <div className="flex items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm">Guaranteed Lead</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Premium leads with guaranteed conversion potential</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Gavel className="h-4 w-4 text-primary" />
              <span className="text-sm">Competitive Lead</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open market leads available for competitive bidding</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}