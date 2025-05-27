import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, subDays } from "date-fns";
import type { DateRange } from "react-day-picker";

interface DateRangeFilterProps {
  value: DateRange | undefined;
  onChange: (dateRange: DateRange | undefined) => void;
}

const DateRangeFilter = ({ value, onChange }: DateRangeFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const setQuickDateRange = (days: number) => {
    const to = new Date();
    const from = subDays(to, days);
    onChange({ from, to });
    setIsOpen(false);
  };

  const clearDateRange = () => {
    onChange(undefined);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (!value?.from) return "Date Range";
    
    if (value.to) {
      const fromText = format(value.from, "MMM dd");
      const toText = format(value.to, "MMM dd");
      const fullText = `${fromText} - ${toText}`;
      
      // Truncate if too long (more than 15 characters)
      if (fullText.length > 15) {
        return `${format(value.from, "MM/dd")} - ${format(value.to, "MM/dd")}`;
      }
      return fullText;
    }
    
    return format(value.from, "MMM dd, yyyy");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span className="truncate">{getDisplayText()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b bg-emerald-50">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setQuickDateRange(7)}
              className="text-xs hover:bg-emerald-100 hover:border-emerald-300"
            >
              Last 7 Days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setQuickDateRange(30)}
              className="text-xs hover:bg-emerald-100 hover:border-emerald-300"
            >
              Last 30 Days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setQuickDateRange(90)}
              className="text-xs hover:bg-emerald-100 hover:border-emerald-300"
            >
              Last 3 Months
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setQuickDateRange(365)}
              className="text-xs hover:bg-emerald-100 hover:border-emerald-300"
            >
              Last Year
            </Button>
          </div>
          {value && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearDateRange}
              className="w-full text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
            >
              Clear Selection
            </Button>
          )}
        </div>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={1}
          className="rounded-lg"
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
