import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Globe, Clock, Search, Filter, Bell, Zap, Shield, Star } from "lucide-react";
import { useState } from "react";
import { useStats } from "@/hooks/useStats";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const { data: stats, isLoading: statsLoading } = useStats();

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k+`;
    }
    // close to nearest 0 or 5 multiple
    return `${Math.round(num / 5) * 5}+`;
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-16 md:py-24 overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-green-300 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-emerald-300 rounded-full opacity-15 animate-bounce delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-32 w-3 h-3 bg-green-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute top-40 left-1/2 w-1 h-1 bg-teal-400 rounded-full animate-ping delay-300"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span>🇮🇳 </span><span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">Government</span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"> Announcements</span>
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">Made Simple</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Access, filter, and stay updated with the latest government announcements in your preferred language. 
            Your one-stop platform for official communications and policy updates with AI-powered simplification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <span>Explore Announcements</span>
              <Search className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Enhanced Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Globe className="h-10 w-10 text-emerald-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Multilingual Support</h3>
              <p className="text-sm text-gray-600">Available in 11+ regional languages with real-time translation</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Zap className="h-10 w-10 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">AI Simplification</h3>
              <p className="text-sm text-gray-600">Complex policies simplified using advanced AI for better understanding</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Shield className="h-10 w-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Verified Sources</h3>
              <p className="text-sm text-gray-600">All content verified from official government sources and PIB releases</p>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {statsLoading ? '...' : formatNumber(stats?.press_releases)}
              </div>
              <div className="text-sm text-gray-600">Live Announcements</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {statsLoading ? '...' : formatNumber(stats?.ministries)}
              </div>
              <div className="text-sm text-gray-600">Ministries</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-3">
                <Globe className="h-8 w-8 text-teal-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {statsLoading ? '...' : formatNumber(stats?.languages)}
              </div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Real-time Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
