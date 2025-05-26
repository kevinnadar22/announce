import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Calendar, Building2, Users, Globe, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

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
    <TooltipProvider>
      <div 
        className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
        onClick={handleCardClick}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-green-50/0 group-hover:from-emerald-50/50 group-hover:to-green-50/30 transition-all duration-500 rounded-3xl"></div>
        
        {/* Header with Language Count */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
              <Globe className="h-3 w-3 text-emerald-600" />
              <span className="text-xs text-emerald-700 font-medium">
                {availableLanguages.length} Languages
              </span>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2 cursor-pointer leading-tight">
              {title}
            </h3>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-sm">
            <div className="text-sm">
              <p className="font-medium mb-2">Quick Preview:</p>
              <p className="text-gray-600 line-clamp-3">{originalText.substring(0, 150)}...</p>
              <p className="text-emerald-600 text-xs mt-2">Click to read full announcement</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Content Preview */}
        <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed text-sm">
          {originalText}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-5">
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
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 px-3 py-1">
              +{categories.length - 3} more
            </Badge>
          )}
        </div>

        {/* Ministry and Location */}
        <div className="space-y-3 mb-5">
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
        <div className="flex items-center mb-5">
          <Users className="h-4 w-4 mr-3 text-emerald-600 flex-shrink-0" />
          <div className="flex flex-wrap gap-2">
            {audienceTypes.slice(0, 2).map((audience, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors duration-300"
              >
                {audience}
              </Badge>
            ))}
            {audienceTypes.length > 2 && (
              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                +{audienceTypes.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
            <span className="font-medium">{formatDate(datePublished)}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1 text-emerald-600" />
            <span>{formatTime(datePublished)}</span>
          </div>
        </div>

        {/* Available Languages with Tooltip */}
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-3 font-medium">Available in:</div>
          <div className="flex flex-wrap gap-2">
            {availableLanguages.slice(0, 4).map((language, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors duration-300"
              >
                {language}
              </Badge>
            ))}
            {availableLanguages.length > 4 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs bg-emerald-50 border-emerald-200 text-emerald-700 cursor-help hover:bg-emerald-100 transition-colors duration-300">
                    +{availableLanguages.length - 4} more
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-sm">
                    <p className="font-medium mb-1">All available languages:</p>
                    <div className="max-w-xs">
                      {availableLanguages.join(", ")}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 relative z-10">
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
    </TooltipProvider>
  );
};

export default AnnouncementCard;
