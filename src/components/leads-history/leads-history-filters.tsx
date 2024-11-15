import { Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LeadsHistoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  filters: {
    type: string;
    status: string;
    location: string;
    loanType: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function LeadsHistoryFilters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  filters,
  onFiltersChange,
}: LeadsHistoryFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 flex-1 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads by name or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <DateRangePicker date={dateRange} setDate={onDateRangeChange} />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.type}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, type: value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Lead Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="guaranteed">Guaranteed</SelectItem>
            <SelectItem value="competitive">Competitive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.loanType}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, loanType: value })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Loan Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="purchase">Purchase</SelectItem>
            <SelectItem value="refinance">Refinance</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}