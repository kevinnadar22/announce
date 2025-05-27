import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import { createTruncatedDisplay } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  options: FilterOption[];
  disabled?: boolean;
  maxLabelLength?: number; // For truncating selected value only
}

const FilterSelect = ({ 
  value, 
  onValueChange, 
  placeholder, 
  icon: Icon, 
  options, 
  disabled = false,
  maxLabelLength = 25 
}: FilterSelectProps) => {
  const selectedOption = options.find(option => option.value === value);
  const selectedDisplay = selectedOption ? createTruncatedDisplay(selectedOption.label, maxLabelLength) : null;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <div className="flex items-center space-x-2 min-w-0">
          <Icon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          {selectedDisplay?.isTruncated ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="truncate min-w-0">
                  {selectedDisplay.displayText}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">{selectedDisplay.fullText}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <SelectValue placeholder={placeholder} className="truncate" />
          )}
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center space-x-2 w-full">
              {option.icon && <option.icon className="h-4 w-4 flex-shrink-0" />}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
