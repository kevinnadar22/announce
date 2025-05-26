
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Search announcements, schemes, policies..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-3 text-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
      />
    </div>
  );
};

export default SearchBar;
