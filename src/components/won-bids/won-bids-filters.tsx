import { Search, Download, SlidersHorizontal } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface WonBidsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  filters: {
    status: string;
    loanType: string;
    location: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function WonBidsFilters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  filters,
  onFiltersChange,
}: WonBidsFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 flex-1 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, or loan type..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Refine your search with additional filters
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Loan Amount Range</Label>
                  <Slider
                    defaultValue={[200000, 800000]}
                    max={1000000}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$200k</span>
                    <span>$1M</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Follow-up Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Conversion Probability</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select probability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Probabilities</SelectItem>
                      <SelectItem value="high">High (&gt;75%)</SelectItem>
                      <SelectItem value="medium">Medium (25-75%)</SelectItem>
                      <SelectItem value="low">Low (&lt;25%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <DateRangePicker date={dateRange} setDate={onDateRangeChange} />
      </div>

      <div className="flex flex-wrap gap-2 bg-accent/50 p-2 rounded-lg">
        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value })
          }
        >
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.loanType}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, loanType: value })
          }
        >
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Loan Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="purchase">Purchase</SelectItem>
            <SelectItem value="refinance">Refinance</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.location}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, location: value })
          }
        >
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="seattle">Seattle, WA</SelectItem>
            <SelectItem value="portland">Portland, OR</SelectItem>
            <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}