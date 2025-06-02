import { Badge } from "@/components/ui/badge";
import { Clock, Building2 } from "lucide-react";
import { usePressReleases } from "@/hooks/usePressReleases";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useNavigate } from "react-router-dom";

const RecentAnnouncements = () => {
  const navigate = useNavigate();

  const { data: announcementsData, isLoading } = usePressReleases({
    params: {
      page: 1,
      page_size: 5,
      ordering: '-date_published',
    },
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  const handleAnnouncementClick = (id: number) => {
    navigate(`/announcement/${id}`);
    window.scrollTo(0, 0);
  };

  const announcements = announcementsData?.results || [];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <div className="bg-emerald-100 p-2 rounded-lg mr-3">
              <Clock className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Recent Updates</h3>
          </div>
          
          <div className="relative">
            {/* Horizontal Timeline line with gradient */}
            <div className="absolute top-[27px] left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-200 rounded-full z-0"></div>
            
            <div className="flex space-x-8 overflow-x-auto pb-4">
              {isLoading ? (
                <div className="flex justify-center py-4 w-full">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className="relative flex flex-col items-center min-w-[300px] cursor-pointer group"
                    onClick={() => handleAnnouncementClick(announcement.id)}
                  >
                    {/* Enhanced Timeline dot with ring */}
                    <div className="relative z-20">
                      <div className="w-[14px] h-[14px] bg-emerald-500 rounded-full ring-4 ring-white group-hover:ring-emerald-50 transition-all duration-300"></div>
                      <div className="absolute w-[14px] h-[14px] bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                    </div>
                    
                    <div className="mt-6 w-full bg-gray-50 group-hover:bg-emerald-50 rounded-xl p-4 transition-all duration-300 border border-gray-100 group-hover:border-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {formatTimeAgo(announcement.date_published)}
                        </span>
                        <Badge variant="outline" className="text-xs bg-white group-hover:bg-emerald-100 transition-colors">
                          {announcement.category_names?.[0] || 'General'}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-800 transition-colors">{announcement.title}</h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <Building2 className="h-3 w-3 mr-1.5" />
                        <span className="truncate">{announcement.ministry_name}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentAnnouncements;
