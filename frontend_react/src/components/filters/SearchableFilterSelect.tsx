import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createTruncatedDisplay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FilterOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface SearchableFilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  options: FilterOption[];
  disabled?: boolean;
  maxLabelLength?: number;
  searchPlaceholder?: string;
  showAllOption?: boolean;
  allOptionLabel?: string;
}

const SearchableFilterSelect = ({
  value,
  onValueChange,
  placeholder,
  icon: Icon,
  options,
  disabled = false,
  maxLabelLength = 25,
  searchPlaceholder = "Search...",
  showAllOption = true,
  allOptionLabel = "All"
}: SearchableFilterSelectProps) => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // Create the options list with "All" option if enabled
  const allOptions = showAllOption 
    ? [{ value: "", label: allOptionLabel }, ...options]
    : options;
  
  // Filter options based on search value
  const filteredOptions = searchValue
    ? allOptions.filter(option => 
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : allOptions;
  
  const selectedOption = allOptions.find(option => option.value === value);
  const selectedDisplay = selectedOption ? createTruncatedDisplay(selectedOption.label, maxLabelLength) : null;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setShowSearch(false);
      setSearchValue("");
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
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
              <span className="truncate">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          {!showSearch ? (
            <div className="p-2 border-b border-gray-200">
              <button
                className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2 px-3 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowSearch(true)}
              >
                🔍 Search...
              </button>
            </div>
          ) : (
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                autoFocus
              />
            </div>
          )}
          <CommandList>
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-600">No results found.</div>
            ) : (
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      onValueChange(option.value === value ? "" : option.value);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-2 w-full">
                      {option.icon && <option.icon className="h-4 w-4 flex-shrink-0" />}
                      <span className="flex-1">{option.label}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableFilterSelect; 