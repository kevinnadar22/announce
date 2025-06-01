import { useState } from "react";
import { Tag, Building2, Users, Globe, MapPin } from "lucide-react";
import type { DateRange } from "react-day-picker";

import SearchBar from "./filters/SearchBar";
import SearchableFilterSelect from "./filters/SearchableFilterSelect";
import DateRangeFilter from "./filters/DateRangeFilter";
import ActiveFilters from "./filters/ActiveFilters";
import { useCategoriesForFilter } from "@/hooks/useCategories";
import { useMinistriesForFilter } from "@/hooks/useMinistries";
import { useAudienceTypesForFilter } from "@/hooks/useAudienceTypes";
import { useLanguagesForFilter } from "@/hooks/useLanguages";
import { usePibHqForFilter } from "@/hooks/usePibHq";

interface AnnouncementFiltersProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedMinistry: string;
  onMinistryChange: (value: string) => void;
  selectedAudience: string;
  onAudienceChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  dateRange: DateRange | undefined;
  onDateRangeChange: (value: DateRange | undefined) => void;
  onClearFilters: () => void;
}

const AnnouncementFilters = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onCategoryChange,
  selectedMinistry,
  onMinistryChange,
  selectedAudience,
  onAudienceChange,
  selectedLanguage,
  onLanguageChange,
  selectedLocation,
  onLocationChange,
  dateRange,
  onDateRangeChange,
  onClearFilters
}: AnnouncementFiltersProps) => {
  // Fetch data from APIs
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategoriesForFilter();
  const { data: ministries = [], isLoading: ministriesLoading, error: ministriesError } = useMinistriesForFilter();
  const { data: audiences = [], isLoading: audiencesLoading, error: audiencesError } = useAudienceTypesForFilter();
  const { data: languages = [], isLoading: languagesLoading, error: languagesError } = useLanguagesForFilter();
  const { data: locations = [], isLoading: locationsLoading, error: locationsError } = usePibHqForFilter();

  const getSelectedCategoryLabel = () => {
    return categories.find(c => c.value === selectedCategory)?.label;
  };

  const getSelectedMinistryLabel = () => {
    return ministries.find(m => m.value === selectedMinistry)?.label;
  };

  const getSelectedAudienceLabel = () => {
    return audiences.find(a => a.value === selectedAudience)?.label;
  };

  const getSelectedLanguageLabel = () => {
    return languages.find(l => l.value === selectedLanguage)?.label;
  };

  const getSelectedLocationLabel = () => {
    return locations.find(l => l.value === selectedLocation)?.label;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <SearchBar value={searchTerm} onChange={onSearchTermChange} />

      {/* Filter Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <SearchableFilterSelect
          value={selectedCategory}
          onValueChange={onCategoryChange}
          placeholder={categoriesLoading ? "Loading categories..." : categoriesError ? "Failed to load categories" : "Category"}
          icon={Tag}
          options={categories}
          disabled={categoriesLoading || !!categoriesError}
          maxLabelLength={20}
          searchPlaceholder="Search categories..."
          allOptionLabel="All Categories"
        />

        {/* <SearchableFilterSelect
          value={selectedMinistry}
          onValueChange={onMinistryChange}
          placeholder={ministriesLoading ? "Loading ministries..." : ministriesError ? "Failed to load ministries" : "Ministry"}
          icon={Building2}
          options={ministries}
          disabled={ministriesLoading || !!ministriesError}
          maxLabelLength={20}
          searchPlaceholder="Search ministries..."
          allOptionLabel="All Ministries"
        /> */}

        <SearchableFilterSelect
          value={selectedAudience}
          onValueChange={onAudienceChange}
          placeholder={audiencesLoading ? "Loading audiences..." : audiencesError ? "Failed to load audiences" : "Audience"}
          icon={Users}
          options={audiences}
          disabled={audiencesLoading || !!audiencesError}
          maxLabelLength={20}
          searchPlaceholder="Search audiences..."
          allOptionLabel="All Audiences"
        />

        <SearchableFilterSelect
          value={selectedLanguage}
          onValueChange={onLanguageChange}
          placeholder={languagesLoading ? "Loading languages..." : languagesError ? "Failed to load languages" : "Language"}
          icon={Globe}
          options={languages}
          disabled={languagesLoading || !!languagesError}
          maxLabelLength={20}
          searchPlaceholder="Search languages..."
          allOptionLabel="All Languages"
        />

        <SearchableFilterSelect
          value={selectedLocation}
          onValueChange={onLocationChange}
          placeholder={locationsLoading ? "Loading locations..." : locationsError ? "Failed to load locations" : "Location"}
          icon={MapPin}
          options={locations}
          disabled={locationsLoading || !!locationsError}
          maxLabelLength={20}
          searchPlaceholder="Search locations..."
          allOptionLabel="All Locations"
        />

        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
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
        ministryLabel={getSelectedMinistryLabel()}
        audienceLabel={getSelectedAudienceLabel()}
        languageLabel={getSelectedLanguageLabel()}
        locationLabel={getSelectedLocationLabel()}
        onClear={onClearFilters}
      />
    </div>
  );
};

export default AnnouncementFilters;
