import { useState } from 'react';
import { WonBidsHeader } from './won-bids-header';
import { WonBidsTable } from './won-bids-table';
import { WonBidsFilters } from './won-bids-filters';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';

export function WonBidsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [filters, setFilters] = useState({
    status: 'all',
    loanType: 'all',
    location: 'all',
  });

  return (
    <div className="container mx-auto space-y-6">
      <WonBidsHeader />
      <WonBidsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        filters={filters}
        onFiltersChange={setFilters}
      />
      <WonBidsTable
        searchQuery={searchQuery}
        dateRange={dateRange}
        filters={filters}
      />
    </div>
  );
}