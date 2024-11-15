import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadsTable } from './leads-table';
import { LeadsLegend } from './leads-legend';
import { LeadDetailsModal } from './lead-details-modal';
import { GuaranteedLeadModal } from './guaranteed-lead-modal';
import { useToast } from '@/hooks/use-toast';
import { mockLeads } from './mock-data';

interface LeadsSectionProps {
  searchQuery: string;
  filters: {
    type: string;
    status: string;
    location: string;
    loanType: string;
    propertyType: string;
    region: string;
    state: string;
  };
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSortChange: (key: string) => void;
}

export function LeadsSection({
  searchQuery,
  filters,
  sortConfig,
  onSortChange,
}: LeadsSectionProps) {
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showGuaranteedModal, setShowGuaranteedModal] = useState(false);
  const [showCompetitiveModal, setShowCompetitiveModal] = useState(false);
  const [securingLead, setSecuringLead] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter and sort leads
  const filteredLeads = mockLeads
    .filter(lead => {
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          lead.name.toLowerCase().includes(searchLower) ||
          `${lead.location.city}, ${lead.location.state}`.toLowerCase().includes(searchLower)
        );
      }
      if (filters.type !== 'all' && lead.type.toLowerCase() !== filters.type) return false;
      if (filters.propertyType !== 'all' && lead.propertyType.toLowerCase() !== filters.propertyType) return false;
      if (filters.region !== 'all' && lead.region !== filters.region) return false;
      if (filters.state !== 'all' && lead.location.state !== filters.state) return false;
      return true;
    })
    .sort((a, b) => {
      // Always show Guaranteed leads first
      if (a.type === 'Guaranteed' && b.type !== 'Guaranteed') return -1;
      if (b.type === 'Guaranteed' && a.type !== 'Guaranteed') return 1;

      // Then apply the selected sort
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      switch (sortConfig.key) {
        case 'submittedAt':
          return (b.submittedDate.getTime() - a.submittedDate.getTime()) * direction;
        case 'loanAmount':
          return (parseInt(b.loanAmount.replace(/\D/g, '')) - parseInt(a.loanAmount.replace(/\D/g, ''))) * direction;
        default:
          return 0;
      }
    });

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
    if (lead.type === 'Guaranteed') {
      setShowGuaranteedModal(true);
    } else {
      setShowCompetitiveModal(true);
    }
  };

  const handleSecureLead = async (leadId: string) => {
    setSecuringLead(leadId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      toast({
        title: 'Lead Secured!',
        description: 'You have successfully secured this lead.',
      });
    } finally {
      setSecuringLead(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Active Leads</CardTitle>
            <CardDescription>Manage your guaranteed and competitive leads</CardDescription>
          </div>
          <LeadsLegend />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <LeadsTable
          leads={filteredLeads}
          onLeadClick={handleLeadClick}
          securingLead={securingLead}
          sortConfig={sortConfig}
          onSortChange={onSortChange}
        />

        {selectedLead && selectedLead.type === 'Guaranteed' && (
          <GuaranteedLeadModal
            lead={selectedLead}
            isOpen={showGuaranteedModal}
            onClose={() => {
              setShowGuaranteedModal(false);
              setSelectedLead(null);
            }}
            onSecure={handleSecureLead}
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
      </CardContent>
    </Card>
  );
}