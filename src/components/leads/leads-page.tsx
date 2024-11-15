import { useState } from 'react';
import { LeadsSection } from './leads-section';
import { LeadsHeader } from './leads-header';
import { LeadsFilters } from './leads-filters';
import { useToast } from '@/hooks/use-toast';

export function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    location: 'all',
    loanType: 'all',
    propertyType: 'all',
    region: 'all',
    state: 'all',
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'submittedAt',
    direction: 'desc' as const,
  });
  const { toast } = useToast();

  const handleBulkAction = (action: string, selectedLeads: string[]) => {
    toast({
      title: 'Bulk Action Completed',
      description: `${action} applied to ${selectedLeads.length} leads`,
    });
  };

  const handleSortChange = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Calculate number of active filters
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value !== 'all'
  ).length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <LeadsHeader />
      <LeadsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
        sortConfig={sortConfig}
        onSortChange={handleSortChange}
        activeFilters={activeFilters}
      />
      <LeadsSection
        searchQuery={searchQuery}
        filters={filters}
        onBulkAction={handleBulkAction}
        sortConfig={sortConfig}
        onSortChange={handleSortChange}
      />
    </div>
  );
}