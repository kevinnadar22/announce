
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideIcon } from "lucide-react";

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
}

const FilterSelect = ({ value, onValueChange, placeholder, icon: Icon, options }: FilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <div className="flex items-center space-x-2">
          <Icon className="h-4 w-4 text-emerald-600" />
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center space-x-2">
              {option.icon && <option.icon className="h-4 w-4" />}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
