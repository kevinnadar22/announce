import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CompactTooltip from "@/components/ui/compact-tooltip";
import { ExternalLink, Calendar, Building2, Users, Globe, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { decodeLanguages } from "@/lib/languageMapping";
import { useRef, useEffect, useState } from "react";

interface AnnouncementCardProps {
  id: number;
  title: string;
  originalText: string;
  sourceUrl: string;
  datePublished: string;
  pibHq?: string;
  ministry: string;
  audienceTypes: string[];
  categories: string[];
  availableLanguages: string[];
}

const AnnouncementCard = ({ 
  id,
  title, 
  originalText, 
  sourceUrl,
  datePublished,
  pibHq,
  ministry, 
  audienceTypes,
  categories,
  availableLanguages,
}: AnnouncementCardProps) => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);

  // Check if title is truncated
  useEffect(() => {
    const checkTruncation = () => {
      if (titleRef.current) {
        const element = titleRef.current;
        setIsTitleTruncated(element.scrollHeight > element.clientHeight);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [title]);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  const getLocationDisplay = (pibLocation?: string) => {
    if (!pibLocation) return null;
    // Remove "PIB" prefix and just show the city
    return pibLocation.replace(/^PIB\s+/, "");
  };

  // Decode language codes to proper language names
  const decodedLanguages = decodeLanguages(availableLanguages);

  const handleCardClick = () => {
    navigate(`/announcement/${id}`);
    window.scrollTo(0, 0);
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(sourceUrl, '_blank');
  };

  const handleReadFullClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/announcement/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer relative overflow-hidden flex flex-col h-full"
      onClick={handleCardClick}
    >
      {/* Header with Language Count - Section 1 */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
            <Globe className="h-3 w-3 text-emerald-600" />
            <span className="text-xs text-emerald-700 font-medium">
              {decodedLanguages.length} Languages
            </span>
          </div>
        </div>
      </div>
      
      {/* Title - Section 2 */}
      <div className="mb-6">
        {isTitleTruncated ? (
          <CompactTooltip content={title}>
            <h3 
              ref={titleRef}
              className="text-xl font-bold text-gray-900 transition-colors duration-300 line-clamp-2 leading-tight cursor-pointer"
            >
              {title}
            </h3>
          </CompactTooltip>
        ) : (
          <h3 
            ref={titleRef}
            className="text-xl font-bold text-gray-900 transition-colors duration-300 line-clamp-2 leading-tight"
          >
            {title}
          </h3>
        )}
      </div>
      
      {/* Content Preview and Details - Section 3 */}
      <div className="flex-grow space-y-6">
        {/* Content Preview */}
        <div>
          <p className="text-gray-600 line-clamp-4 leading-relaxed text-sm">
            {originalText}
          </p>
        </div>

        {/* Categories */}
        <div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 3).map((category, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="text-xs bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors duration-300 px-3 py-1"
              >
                {category}
              </Badge>
            ))}
            {categories.length > 3 && (
              <CompactTooltip content={categories.slice(3)}>
                <span 
                  className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 cursor-pointer hover:bg-emerald-100 hover:text-emerald-700 hover:border-emerald-300 transition-all duration-300 relative z-30 min-w-[60px] justify-center"
                  role="button"
                  tabIndex={0}
                  aria-label={`Show all ${categories.length} categories`}
                >
                  +{categories.length - 3} more
                </span>
              </CompactTooltip>
            )}
          </div>
        </div>

        {/* Ministry and Location */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Building2 className="h-4 w-4 mr-3 text-emerald-600" />
            <span className="font-medium">{ministry}</span>
          </div>
          {pibHq && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-3 text-emerald-600" />
              <span>{getLocationDisplay(pibHq)}</span>
            </div>
          )}
        </div>

        {/* Audience Types */}
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-3 text-emerald-600 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {audienceTypes.slice(0, 2).map((audience, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors duration-300"
              >
                {audience}
              </Badge>
            ))}
            {audienceTypes.length > 2 && (
              <CompactTooltip content={audienceTypes.slice(2)}>
                <span 
                  className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 cursor-pointer hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300 relative z-30 min-w-[60px] justify-center"
                  role="button"
                  tabIndex={0}
                  aria-label={`Show all ${audienceTypes.length} audience types`}
                >
                  +{audienceTypes.length - 2} more
                </span>
              </CompactTooltip>
            )}
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
            <span className="font-medium">{formatDate(datePublished)}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1 text-emerald-600" />
            <span>{formatTime(datePublished)}</span>
          </div>
        </div>

        {/* Available Languages */}
        <div>
          <div className="text-xs text-gray-500 mb-3 font-medium">Available in:</div>
          <div className="flex flex-wrap gap-2">
            {decodedLanguages.slice(0, 4).map((language, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors duration-300"
              >
                {language}
              </Badge>
            ))}
            {decodedLanguages.length > 4 && (
              <CompactTooltip content={decodedLanguages.slice(4)}>
                <span 
                  className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 cursor-pointer hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300 relative z-30 min-w-[60px] justify-center"
                  role="button"
                  tabIndex={0}
                  aria-label={`Show all ${decodedLanguages.length} available languages`}
                >
                  +{decodedLanguages.length - 4} more
                </span>
              </CompactTooltip>
            )}
          </div>
        </div>
      </div>
      
      {/* Action Buttons - Section 4 - Always at bottom */}
      <div className="pt-6 border-t border-gray-100 relative z-10 mt-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-semibold text-sm transition-all duration-300 group/btn"
            onClick={handleReadFullClick}
          >
            <span>Read Full Announcement</span>
            <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-2 rounded-full transition-all duration-300"
            onClick={handleExternalLinkClick}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
