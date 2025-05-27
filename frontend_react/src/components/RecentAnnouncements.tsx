import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Building2, ExternalLink } from "lucide-react";
import { usePressReleases } from "@/hooks/usePressReleases";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const RecentAnnouncements = () => {
  const navigate = useNavigate();

  // Fetch recent announcements
  const { data: recentData, isLoading: recentLoading } = usePressReleases({
    params: {
      page: 1,
      page_size: 3,
      ordering: '-date_published',
    },
  });

  // Fetch trending announcements (you can adjust criteria as needed)
  const { data: trendingData, isLoading: trendingLoading } = usePressReleases({
    params: {
      page: 1,
      page_size: 2,
      ordering: '-date_published', // You could use different ordering for trending
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

  const topAnnouncements = trendingData?.results?.slice(0, 2) || [];
  const otherRecent = recentData?.results?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Announcements */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-emerald-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Top Announcements</h3>
            </div>
            <div className="space-y-4">
              {trendingLoading ? (
                <div className="flex justify-center py-4">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                topAnnouncements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleAnnouncementClick(announcement.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-emerald-600 text-white text-xs">TRENDING</Badge>
                      <span className="text-xs text-gray-500">{formatTimeAgo(announcement.date_published)}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{announcement.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="h-3 w-3 mr-1" />
                        <span className="text-xs">{announcement.ministry_name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {announcement.category_names?.[0] || 'General'}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Timeline */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Clock className="h-6 w-6 text-emerald-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Recent Updates</h3>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200 z-0"></div>
              
              <div className="space-y-6">
                {recentLoading ? (
                  <div className="flex justify-center py-4">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  otherRecent.map((announcement, index) => (
                    <div 
                      key={announcement.id} 
                      className="relative flex items-start space-x-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors z-10"
                      onClick={() => handleAnnouncementClick(announcement.id)}
                    >
                      {/* Timeline dot */}
                      <div className="relative z-20 w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500 font-medium">{formatTimeAgo(announcement.date_published)}</span>
                          <Badge variant="outline" className="text-xs">
                            {announcement.category_names?.[0] || 'General'}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">{announcement.title}</h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Building2 className="h-3 w-3 mr-1" />
                          <span>{announcement.ministry_name}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentAnnouncements;
