
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Building2, ExternalLink } from "lucide-react";

const RecentAnnouncements = () => {
  const recentAnnouncements = [
    {
      id: 1,
      title: "Digital India Initiative: New Online Services Launched",
      ministry: "Ministry of Electronics & IT",
      timeAgo: "2 hours ago",
      category: "Digital Services",
      isTop: true
    },
    {
      id: 2,
      title: "PM-KISAN Scheme: New Enrollment Window Opens",
      ministry: "Ministry of Agriculture",
      timeAgo: "4 hours ago",
      category: "Schemes",
      isTop: true
    },
    {
      id: 3,
      title: "National Health Mission Updates Released",
      ministry: "Ministry of Health",
      timeAgo: "6 hours ago",
      category: "Health",
      isTop: false
    },
    {
      id: 4,
      title: "Skill Development Programs for Youth",
      ministry: "Ministry of Skill Development",
      timeAgo: "8 hours ago",
      category: "Employment",
      isTop: false
    },
    {
      id: 5,
      title: "Environmental Protection Guidelines Updated",
      ministry: "Ministry of Environment",
      timeAgo: "12 hours ago",
      category: "Policy",
      isTop: false
    }
  ];

  const topAnnouncements = recentAnnouncements.filter(item => item.isTop);
  const otherRecent = recentAnnouncements.filter(item => !item.isTop);

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
              {topAnnouncements.map((announcement) => (
                <div key={announcement.id} className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-emerald-600 text-white text-xs">TRENDING</Badge>
                    <span className="text-xs text-gray-500">{announcement.timeAgo}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{announcement.title}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-3 w-3 mr-1" />
                      <span className="text-xs">{announcement.ministry}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{announcement.category}</Badge>
                  </div>
                </div>
              ))}
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
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
              
              <div className="space-y-6">
                {otherRecent.map((announcement, index) => (
                  <div key={announcement.id} className="relative flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 font-medium">{announcement.timeAgo}</span>
                        <Badge variant="outline" className="text-xs">{announcement.category}</Badge>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">{announcement.title}</h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <Building2 className="h-3 w-3 mr-1" />
                        <span>{announcement.ministry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentAnnouncements;
