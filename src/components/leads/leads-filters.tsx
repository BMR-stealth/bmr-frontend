import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';

interface LeadsFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    type: string;
    status: string;
    location: string;
    loanType: string;
    propertyType: string;
    region: string;
    state: string;
  };
  onFiltersChange: (filters: any) => void;
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSortChange: (key: string) => void;
  activeFilters: number;
}

const regions = [
  { value: 'all', label: 'All Regions' },
  { value: 'west', label: 'West Coast' },
  { value: 'midwest', label: 'Midwest' },
  { value: 'northeast', label: 'Northeast' },
  { value: 'southeast', label: 'Southeast' },
  { value: 'southwest', label: 'Southwest' },
];

const states = [
  { value: 'all', label: 'All States' },
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
  { value: 'FL', label: 'Florida' },
  // Add more states as needed
];

const propertyTypes = [
  { value: 'all', label: 'All Properties' },
  { value: 'single-family', label: 'Single Family' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'co-op', label: 'Co-op' },
  { value: 'manufactured', label: 'Manufactured' },
  { value: 'secondary', label: 'Secondary Residence' },
  { value: 'investment', label: 'Investment Property' },
];

export function LeadsFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  sortConfig,
  onSortChange,
  activeFilters,
}: LeadsFiltersProps) {
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <SlidersHorizontal className="h-4 w-4" />
                {activeFilters > 0 && (
                  <Badge 
                    variant="primary" 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {activeFilters}
                  </Badge>
                )}
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
                  <Label>Region</Label>
                  <Select
                    value={filters.region}
                    onValueChange={(value) =>
                      onFiltersChange({ ...filters, region: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.value} value={region.value}>
                          {region.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>State</Label>
                  <Select
                    value={filters.state}
                    onValueChange={(value) =>
                      onFiltersChange({ ...filters, state: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select
                    value={filters.propertyType}
                    onValueChange={(value) =>
                      onFiltersChange({ ...filters, propertyType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Lead Type</Label>
                  <Select
                    value={filters.type}
                    onValueChange={(value) =>
                      onFiltersChange({ ...filters, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="guaranteed">Guaranteed</SelectItem>
                      <SelectItem value="competitive">Competitive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      onFiltersChange({ ...filters, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="bidding">Bidding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 bg-accent/50 p-2 rounded-lg">
        <Select
          value={filters.region}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, region: value })
          }
        >
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.state}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, state: value })
          }
        >
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.propertyType}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, propertyType: value })
          }
        >
          <SelectTrigger className="w-[160px] bg-background">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}