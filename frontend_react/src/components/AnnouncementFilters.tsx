
import { useState } from "react";
import { Tag, Building2, Users, Globe, MapPin } from "lucide-react";
import type { DateRange } from "react-day-picker";

import SearchBar from "./filters/SearchBar";
import FilterSelect from "./filters/FilterSelect";
import DateRangeFilter from "./filters/DateRangeFilter";
import ActiveFilters from "./filters/ActiveFilters";
import { categories, ministries, audiences, languages, locations } from "./filters/FilterData";

const AnnouncementFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedMinistry("");
    setSelectedAudience("");
    setSelectedLanguage("");
    setSelectedLocation("");
    setDateRange(undefined);
  };

  const getSelectedCategoryLabel = () => {
    return categories.find(c => c.value === selectedCategory)?.label;
  };

  const getSelectedLanguageLabel = () => {
    return languages.find(l => l.value === selectedLanguage)?.label;
  };

  const ministryOptions = ministries.map(ministry => ({ value: ministry, label: ministry }));
  const audienceOptions = audiences.map(audience => ({ value: audience, label: audience }));
  const locationOptions = locations.map(location => ({ value: location, label: location }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <FilterSelect
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          placeholder="Category"
          icon={Tag}
          options={categories}
        />

        <FilterSelect
          value={selectedMinistry}
          onValueChange={setSelectedMinistry}
          placeholder="Ministry"
          icon={Building2}
          options={ministryOptions}
        />

        <FilterSelect
          value={selectedAudience}
          onValueChange={setSelectedAudience}
          placeholder="Audience"
          icon={Users}
          options={audienceOptions}
        />

        <FilterSelect
          value={selectedLanguage}
          onValueChange={setSelectedLanguage}
          placeholder="Language"
          icon={Globe}
          options={languages}
        />

        <FilterSelect
          value={selectedLocation}
          onValueChange={setSelectedLocation}
          placeholder="Location"
          icon={MapPin}
          options={locationOptions}
        />

        <DateRangeFilter value={dateRange} onChange={setDateRange} />
      </div>

      <ActiveFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedMinistry={selectedMinistry}
        selectedAudience={selectedAudience}
        selectedLanguage={selectedLanguage}
        selectedLocation={selectedLocation}
        dateRange={dateRange}
        categoryLabel={getSelectedCategoryLabel()}
        languageLabel={getSelectedLanguageLabel()}
        onClear={clearFilters}
      />
    </div>
  );
};

export default AnnouncementFilters;
