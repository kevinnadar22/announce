import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CompactTooltip from "@/components/ui/compact-tooltip";
import { ExternalLink, Calendar, Building2, Users, MapPin, Clock, Languages } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { decodeLanguages } from "@/lib/languageMapping";
import { useRef } from "react";

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
      className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      {/* Header: Date + External Link */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{formatDate(datePublished)}</span>
          <span className="mx-2">•</span>
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{formatTime(datePublished)}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-gray-600 p-1 h-auto"
          onClick={handleExternalLinkClick}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      {/* Title */}
      <h3
        ref={titleRef}
        className="text-lg font-semibold text-gray-900 leading-tight mb-3 line-clamp-2"
      >
        {title}
      </h3>

      {/* Content Preview */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
        {originalText}
      </p>

      {/* Metadata Grid - Compact layout */}
      <div className="space-y-3">
        {/* Row 1: Ministry + Location */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-600">
            <Building2 className="h-3.5 w-3.5 mr-1.5" />
            <span className="truncate max-w-[120px]" title={ministry}>{ministry}</span>
          </div>
          {pibHq && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{getLocationDisplay(pibHq)}</span>
            </div>
          )}
        </div>

        {/* Row 2: Categories (max 2) + Language count */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {categories.slice(0, 2).map((category, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
              >
                {category}
              </Badge>
            ))}
            {categories.length > 2 && (
              <CompactTooltip content={categories.slice(2)}>
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200"
                >
                  +{categories.length - 2}
                </Badge>
              </CompactTooltip>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Audience type indicator */}
            <CompactTooltip content={audienceTypes}>
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-3.5 w-3.5 mr-1" />
                <span>{audienceTypes[0]}</span>
                {audienceTypes.length > 1 && <span className="ml-1">+{audienceTypes.length - 1}</span>}
              </div>
            </CompactTooltip>

            {/* Language count */}



          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
