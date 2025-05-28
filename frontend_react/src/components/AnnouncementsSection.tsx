import { useState, useMemo, useEffect } from "react";
import { type DateRange } from "react-day-picker";
import AnnouncementFilters from "./AnnouncementFilters";
import AnnouncementCard from "./AnnouncementCard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Globe, Languages, AlertCircle } from "lucide-react";
import { usePressReleases } from "@/hooks/usePressReleases";
import { useDebounce } from "@/hooks/useDebounce";
import { PressReleaseListParams } from "@/lib/api";

const AnnouncementsSection = () => {
  // Constants
  const DEFAULT_PAGE_SIZE = 6; // Default page size for API requests
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Build API parameters from filter state
  const apiParams: PressReleaseListParams = useMemo(() => {
    const params: PressReleaseListParams = {
      page: currentPage,
      page_size: DEFAULT_PAGE_SIZE,
      ordering: '-date_published', // Newest first
    };

    if (debouncedSearchTerm.trim()) {
      params.search = debouncedSearchTerm.trim();
    }

    if (selectedCategory) {
      params.category = parseInt(selectedCategory);
    }

    if (selectedMinistry) {
      params.ministry = parseInt(selectedMinistry);
    }

    if (selectedAudience) {
      params.audience_type = parseInt(selectedAudience);
    }

    if (selectedLocation) {
      params.pib_hq = selectedLocation;
    }

    if (dateRange?.from) {
      if (!dateRange.to) {
        // For single date selection, use date_published parameter
        // Format as YYYY-MM-DD for exact date match
        params.date_published = dateRange.from.toISOString().split('T')[0];
      } else {
        // For date range, use min and max parameters
        // Set start of day for min date (00:00:00)
        params.date_published_min = new Date(
          dateRange.from.getFullYear(),
          dateRange.from.getMonth(),
          dateRange.from.getDate(),
          0, 0, 0
        ).toISOString();
        
        // Set end of day for max date (23:59:59)
        params.date_published_max = new Date(
          dateRange.to.getFullYear(),
          dateRange.to.getMonth(),
          dateRange.to.getDate(),
          23, 59, 59
        ).toISOString();
      }
    }

    if (selectedLanguage) {
      params.has_translation_language = [selectedLanguage];
      // Also add the language parameter for title and description language
      params.language = selectedLanguage;
    }

    return params;
  }, [debouncedSearchTerm, selectedCategory, selectedMinistry, selectedAudience, selectedLocation, selectedLanguage, dateRange, currentPage]);

  // Fetch press releases
  const { data, isLoading, error, isFetching } = usePressReleases({
    params: apiParams,
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedMinistry("");
    setSelectedAudience("");
    setSelectedLanguage("");
    setSelectedLocation("");
    setDateRange(undefined);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    // Validate page number
    if (page < 1 || (totalPages > 0 && page > totalPages)) {
      return;
    }
    
    setCurrentPage(page);
    // Scroll to top of announcements section
    const element = document.getElementById('announcements');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate pagination info dynamically from API response
  const pageSize = data?.results?.length || 0;
  const totalPages = data && pageSize > 0 ? Math.ceil(data.count / DEFAULT_PAGE_SIZE) : 0;
  const hasFilters = debouncedSearchTerm || selectedCategory || selectedMinistry || selectedAudience || selectedLanguage || selectedLocation || dateRange?.from;

  // Calculate display range for current page
  const startItem = data && data.count > 0 ? ((currentPage - 1) * DEFAULT_PAGE_SIZE) + 1 : 0;
  const endItem = data ? Math.min(currentPage * DEFAULT_PAGE_SIZE, data.count) : 0;

  // Transform API data to component props format
  const transformedAnnouncements = data?.results?.map(release => ({
    id: release.id,
    title: release.title,
    originalText: release.description || release.original_text,
    sourceUrl: release.source_url,
    datePublished: release.date_published,
    pibHq: release.pib_hq,
    ministry: release.ministry_name,
    audienceTypes: release.audience_type_names,
    categories: release.category_names,
    availableLanguages: release.available_languages,
  })) || [];

  // Reset page when filters change (except when page itself changes)
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedCategory, selectedMinistry, selectedAudience, selectedLanguage, selectedLocation, dateRange]);

  // Adjust current page if it becomes invalid due to data changes
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [totalPages, currentPage]);

  return (
    <section id="announcements" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Government Announcements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Stay informed with the most recent updates, policies, and schemes from various government ministries
          </p>
          
          {/* Language Support Highlight */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
              <Globe className="h-5 w-5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Available in 10+ Regional Languages</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <Languages className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-medium">हिंदी, தமிழ், বাংলা & More</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <AnnouncementFilters
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedMinistry={selectedMinistry}
            onMinistryChange={setSelectedMinistry}
            selectedAudience={selectedAudience}
            onAudienceChange={setSelectedAudience}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <LoadingSpinner size="lg" />
              <p className="text-gray-600">Loading announcements...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">Unable to load announcements</h3>
              <p className="text-gray-600 max-w-md">
                There was an error loading the announcements. Please try again later.
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {data && !isLoading && (
          <>
            {/* Results Summary with Loading Indicator */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600 flex items-center space-x-2">
                {isFetching && <LoadingSpinner size="sm" />}
                <span>
                  {data.count === 0 ? (
                    hasFilters ? "No announcements match your filters" : "No announcements available"
                  ) : (
                    <>
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {startItem}-{endItem}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-900">{data.count}</span>{" "}
                      announcements
                      {totalPages > 1 && (
                        <span className="text-gray-500">
                          {" "}(Page {currentPage} of {totalPages})
                        </span>
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>

            {/* Announcements Grid or Empty State */}
            {transformedAnnouncements.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {transformedAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      {...announcement}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center space-y-4">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => handlePageChange(currentPage - 1)}
                              className={`cursor-pointer ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}
                            />
                          </PaginationItem>
                        )}
                        
                        {/* Show first page if not in first few pages */}
                        {currentPage > 3 && (
                          <>
                            <PaginationItem>
                              <PaginationLink 
                                onClick={() => handlePageChange(1)}
                                className={`cursor-pointer ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                            {currentPage > 4 && (
                              <PaginationItem>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                          </>
                        )}
                        
                        {/* Show current page and immediate neighbors */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let page;
                          if (totalPages <= 5) {
                            // If total pages is 5 or less, show all pages
                            page = i + 1;
                          } else if (currentPage <= 3) {
                            // If current page is in first 3, show pages 1-5
                            page = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            // If current page is in last 3, show last 5 pages
                            page = totalPages - 4 + i;
                          } else {
                            // Otherwise, show current page in the middle
                            page = currentPage - 2 + i;
                          }
                          
                          if (page >= 1 && page <= totalPages) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink 
                                  onClick={() => handlePageChange(page)}
                                  isActive={page === currentPage}
                                  className={`cursor-pointer ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                          return null;
                        })}
                        
                        {/* Show last page if not in last few pages */}
                        {currentPage < totalPages - 2 && totalPages > 5 && (
                          <>
                            {currentPage < totalPages - 3 && (
                              <PaginationItem>
                                <PaginationEllipsis />
                              </PaginationItem>
                            )}
                            <PaginationItem>
                              <PaginationLink 
                                onClick={() => handlePageChange(totalPages)}
                                className={`cursor-pointer ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => handlePageChange(currentPage + 1)}
                              className={`cursor-pointer ${isFetching ? 'opacity-50 pointer-events-none' : ''}`}
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                    
                    {/* Additional pagination info */}
                    <div className="text-sm text-gray-500 text-center">
                      {isFetching ? (
                        <span className="flex items-center justify-center space-x-2">
                          <LoadingSpinner size="sm" />
                          <span>Loading page {currentPage}...</span>
                        </span>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>Jump to page:</span>
                          <select
                            value={currentPage}
                            onChange={(e) => handlePageChange(parseInt(e.target.value))}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm min-w-[70px] font-medium"
                            disabled={isFetching}
                          >
                            {Array.from({ length: totalPages }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {hasFilters ? "No matching announcements" : "No announcements available"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {hasFilters 
                      ? "Try adjusting your filters to see more results."
                      : "There are currently no announcements to display."
                    }
                  </p>
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection;
