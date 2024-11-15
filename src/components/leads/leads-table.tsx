import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { LeadTimer } from './lead-timer';
import { LeadStatusBadge } from './lead-status-badge';
import { LeadHoverCard } from './lead-hover-card';
import { LeadDetailsModal } from './lead-details-modal';
import { GuaranteedLeadModal } from './guaranteed-lead-modal';
import { cn } from '@/lib/utils';
import { Shield, Gavel, MapPin, CreditCard, Percent, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface LeadsTableProps {
  leads: any[];
  onLeadClick: (lead: any) => void;
  securingLead: string | null;
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSortChange: (key: string) => void;
}

const ITEMS_PER_PAGE = 10;

export function LeadsTable({
  leads,
  onLeadClick,
  securingLead,
  sortConfig,
  onSortChange,
}: LeadsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showGuaranteedModal, setShowGuaranteedModal] = useState(false);
  const [showCompetitiveModal, setShowCompetitiveModal] = useState(false);
  
  const totalPages = Math.ceil(leads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLeads = leads.slice(startIndex, endIndex);

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    if (lead.type === 'Guaranteed') {
      setShowGuaranteedModal(true);
    } else {
      setShowCompetitiveModal(true);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px]">Lead</TableHead>
              <TableHead className="w-[180px]">Amount</TableHead>
              <TableHead className="w-[100px]">Rate</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">Time Left</TableHead>
              <TableHead className="w-[120px]">Location</TableHead>
              <TableHead className="w-[120px]">Age</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLeads.map((lead) => (
              <TableRow 
                key={lead.id}
                className={cn(
                  "hover:bg-accent/5 cursor-pointer transition-colors group relative",
                  lead.type === 'Guaranteed' && "bg-success/5 dark:bg-success/10"
                )}
                onClick={() => handleLeadClick(lead)}
              >
                <TableCell className="relative">
                  <LeadHoverCard lead={lead}>
                    <div className="flex items-center gap-3">
                      {lead.type === 'Guaranteed' ? (
                        <Shield className="h-4 w-4 text-success shrink-0" />
                      ) : (
                        <Gavel className="h-4 w-4 text-primary shrink-0" />
                      )}
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {`${lead.location.city}, ${lead.location.state}`}
                        </div>
                      </div>
                    </div>
                  </LeadHoverCard>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <CreditCard className="h-3 w-3 text-muted-foreground shrink-0" />
                    {lead.loanAmount}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Percent className="h-3 w-3 text-muted-foreground shrink-0" />
                    {lead.currentRate}%
                  </div>
                </TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status as 'new' | 'bidding'} />
                </TableCell>
                <TableCell>
                  <LeadTimer
                    timeLeft={lead.timeLeft}
                    expiryTime={lead.expiryTime}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{lead.location.city}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="text-sm text-muted-foreground">
                        {Math.floor((Date.now() - lead.submittedDate.getTime()) / (1000 * 60 * 60))}h ago
                      </TooltipTrigger>
                      <TooltipContent>
                        Submitted on {lead.submittedDate.toLocaleDateString()}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Button
                    variant={lead.type === 'Guaranteed' ? 'success' : 'default'}
                    size="sm"
                    className={cn(
                      "w-full",
                      lead.type === 'Competitive' && "text-primary-foreground hover:text-primary-foreground",
                      lead.type === 'Guaranteed' && "animate-gradient animate-secure-pulse border-none"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLeadClick(lead);
                    }}
                  >
                    {securingLead === lead.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Securing...
                      </>
                    ) : lead.type === 'Guaranteed' ? (
                      <>
                        Secure Lead
                        <Shield className="ml-1 h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Place Bid
                        <Gavel className="ml-1 h-3 w-3" />
                      </>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {getPageNumbers().map((page, index) => (
                page === 'ellipsis' ? (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page as number)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {selectedLead && selectedLead.type === 'Guaranteed' && (
        <GuaranteedLeadModal
          lead={selectedLead}
          isOpen={showGuaranteedModal}
          onClose={() => {
            setShowGuaranteedModal(false);
            setSelectedLead(null);
          }}
          onSecure={onLeadClick}
        />
      )}

      {selectedLead && selectedLead.type === 'Competitive' && (
        <LeadDetailsModal
          lead={selectedLead}
          isOpen={showCompetitiveModal}
          onClose={() => {
            setShowCompetitiveModal(false);
            setSelectedLead(null);
          }}
          currentBid={null}
          rank={0}
          onBidSubmit={() => {}}
          onBidWithdraw={() => {}}
        />
      )}
    </div>
  );
}