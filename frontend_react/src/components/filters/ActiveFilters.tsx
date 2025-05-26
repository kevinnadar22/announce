
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
  languageLabel?: string;
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
  languageLabel,
  onClear
}: ActiveFiltersProps) => {
  const hasActiveFilters = searchTerm || selectedCategory || selectedMinistry || selectedAudience || selectedLanguage || selectedLocation || dateRange?.from;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Active filters:</span>
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
              Search: {searchTerm}
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
              {categoryLabel}
            </Badge>
          )}
          {selectedMinistry && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
              {selectedMinistry}
            </Badge>
          )}
          {selectedAudience && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
              {selectedAudience}
            </Badge>
          )}
          {selectedLanguage && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
              {languageLabel}
            </Badge>
          )}
          {selectedLocation && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
              {selectedLocation}
            </Badge>
          )}
          {dateRange?.from && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
              {dateRange.to ? 
                `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}` :
                format(dateRange.from, "MMM dd, yyyy")
              }
            </Badge>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClear}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4 mr-1" />
        Clear All
      </Button>
    </div>
  );
};

export default ActiveFilters;
