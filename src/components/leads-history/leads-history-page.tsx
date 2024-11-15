import { useState } from 'react';
import { LeadsHistoryHeader } from './leads-history-header';
import { LeadsHistoryTable } from './leads-history-table';
import { LeadsHistoryFilters } from './leads-history-filters';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

export function LeadsHistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    location: 'all',
    loanType: 'all',
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <LeadsHistoryHeader />
      <LeadsHistoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        filters={filters}
        onFiltersChange={setFilters}
      />
      <LeadsHistoryTable
        searchQuery={searchQuery}
        dateRange={dateRange}
        filters={filters}
      />
    </div>
  );
}