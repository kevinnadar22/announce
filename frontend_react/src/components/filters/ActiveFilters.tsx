import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface ActiveFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  selectedMinistry: string;
  selectedAudience: string;
  selectedLanguage: string;
  selectedLocation: string;
  dateRange: DateRange | undefined;
  categoryLabel?: string;
  ministryLabel?: string;
  audienceLabel?: string;
  languageLabel?: string;
  locationLabel?: string;
  onClear: () => void;
}

const ActiveFilters = ({
  searchTerm,
  selectedCategory,
  selectedMinistry,
  selectedAudience,
  selectedLanguage,
  selectedLocation,
  dateRange,
  categoryLabel,
  ministryLabel,
  audienceLabel,
  languageLabel,
  locationLabel,
  onClear
}: ActiveFiltersProps) => {
  const hasActiveFilters = searchTerm || selectedCategory || selectedMinistry || selectedAudience || selectedLanguage || selectedLocation || dateRange?.from;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">Active filters:</span>
        <div className="flex flex-wrap gap-1.5">
          {searchTerm && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 max-w-[120px] sm:max-w-none">
              <span className="truncate">Search: {searchTerm}</span>
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 max-w-[100px] sm:max-w-none">
              <span className="truncate">{categoryLabel}</span>
            </Badge>
          )}
          {selectedMinistry && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 max-w-[100px] sm:max-w-none">
              <span className="truncate">{ministryLabel}</span>
            </Badge>
          )}
          {selectedAudience && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 max-w-[100px] sm:max-w-none">
              <span className="truncate">{audienceLabel}</span>
            </Badge>
          )}
          {selectedLanguage && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 max-w-[80px] sm:max-w-none">
              <span className="truncate">{languageLabel}</span>
            </Badge>
          )}
          {selectedLocation && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 max-w-[100px] sm:max-w-none">
              <span className="truncate">{locationLabel}</span>
            </Badge>
          )}
          {dateRange?.from && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs px-2 py-0.5 max-w-[120px] sm:max-w-none">
              <span className="truncate">
                {dateRange.to ? 
                  `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}` :
                  format(dateRange.from, "MMM dd, yyyy")
                }
              </span>
            </Badge>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClear}
        className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm w-fit self-start sm:self-auto"
      >
        <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
        <span className="hidden sm:inline">Clear All</span>
        <span className="sm:hidden">Clear</span>
      </Button>
    </div>
  );
};

export default ActiveFilters;
