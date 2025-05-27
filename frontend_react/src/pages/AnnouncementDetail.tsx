import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Calendar, 
  Building2, 
  Users, 
  Globe, 
  ExternalLink, 
  Share2, 
  Download,
  MapPin,
  Tag,
  CheckCircle,
  Info,
  Lightbulb,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Eye,
  Phone,
  Mail,
  Loader2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePressRelease, usePressReleases, useTranslatedText } from "@/hooks/usePressReleases";
import { decodeLanguages, decodeLanguage } from "@/lib/languageMapping";
import { TranslatedText } from "@/lib/api";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [readingProgress, setReadingProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCopiedTick, setShowCopiedTick] = useState(false);

  const announcementId = id ? parseInt(id) : 0;

  // Fetch the main press release data
  const { data: pressRelease, isLoading: pressReleaseLoading, error: pressReleaseError } = usePressRelease(
    announcementId,
    { 
      language: selectedLanguage,
      enabled: !!announcementId
    }
  );

  // Fetch translated text for keypoints (simplified in API = original in UI)
  const { data: originalTextData, isLoading: originalTextLoading } = useTranslatedText({
    params: {
      press_release: announcementId,
      language: selectedLanguage,
      text_type: 'simplified'
    },
    enabled: !!announcementId
  });

  // Fetch translated text for simplified version (oversimplified in API = simplified in UI)
  const { data: simplifiedTextData, isLoading: simplifiedTextLoading } = useTranslatedText({
    params: {
      press_release: announcementId,
      language: selectedLanguage,
      text_type: 'oversimplified'
    },
    enabled: !!announcementId
  });

  // Fetch keypoints
  const { data: keypointsData, isLoading: keypointsLoading } = useTranslatedText({
    params: {
      press_release: announcementId,
      language: selectedLanguage,
      text_type: 'keypoints'
    },
    enabled: !!announcementId
  });

  // Fetch related announcements
  const { data: relatedData } = usePressReleases({
    params: {
      page: 1,
      page_size: 3,
      ordering: '-date_published',
    },
  });

  // Simulate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth language changes
  const handleLanguageChange = (newLanguage: string) => {
    if (newLanguage === selectedLanguage) return;
    
    setIsTransitioning(true);
    // Small delay to show loading state before changing language
    setTimeout(() => {
      setSelectedLanguage(newLanguage);
      // Reset transition state after content loads
      setTimeout(() => setIsTransitioning(false), 100);
    }, 50);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopiedTick(true);
      setTimeout(() => {
        setShowCopiedTick(false);
      }, 1000);
    } catch (err) {
      console.log('Error copying to clipboard:', err);
    }
  };

  // Function to render bullet points from translated content
  const renderBulletPoints = (translatedTextItems: TranslatedText[]) => {
    if (!translatedTextItems || translatedTextItems.length === 0) {
      return (
        <div className="text-gray-500 text-center py-8">
          <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No content available in {decodeLanguage(selectedLanguage)}</p>
        </div>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        {translatedTextItems.map((item) => (
          <div key={item.id} className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3 transition-all duration-200 hover:shadow-sm">
            <h3 className="text-sm font-semibold text-emerald-800 mb-2 leading-tight">
              {item.title}
            </h3>
            <div 
              className="prose prose-sm prose-emerald max-w-none text-gray-700 leading-relaxed text-xs"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        ))}
      </div>
    );
  };

  // Function to render plain text content without cards
  const renderPlainContent = (translatedTextItems: TranslatedText[]) => {
    if (!translatedTextItems || translatedTextItems.length === 0) {
      return (
        <div className="text-gray-500 text-center py-8">
          <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No content available in {decodeLanguage(selectedLanguage)}</p>
        </div>
      );
    }

    return (
      <div className={`space-y-6 transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        {translatedTextItems.map((item) => (
          <div key={item.id}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {item.title}
            </h3>
            <div 
              className="prose prose-lg prose-gray max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        ))}
      </div>
    );
  };

  // Show loading state
  if (pressReleaseLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-gray-600">Loading announcement details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (pressReleaseError || !pressRelease) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12 max-w-7xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-emerald-50 group text-emerald-700 hover:text-emerald-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Announcements
          </Button>
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-red-800 mb-4">Announcement Not Found</h2>
              <p className="text-red-600 mb-6">
                The announcement you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-700">
                Return to Home
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const availableLanguages = pressRelease.available_languages || ['en'];
  const decodedLanguages = decodeLanguages(availableLanguages);
  const relatedAnnouncements = relatedData?.results?.filter(item => item.id !== announcementId)?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Reading Progress Bar */}
      <Progress value={readingProgress} className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent" />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/#announcements')}
          className="mb-8 hover:bg-emerald-50 group text-emerald-700 hover:text-emerald-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Announcements
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Enhanced Header Section */}
            <div className="bg-white rounded-2xl p-10 mb-10 shadow-lg border border-gray-100 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30"></div>
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-emerald-100/20 rounded-full -translate-y-16 translate-x-16 sm:-translate-y-24 sm:translate-x-24 lg:-translate-y-32 lg:translate-x-32 hidden sm:block"></div>
              
              <div className="relative z-10">
                {/* Top section with Ministry Badge and Language Selector */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
                  <div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Building2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{pressRelease.ministry_name}</span>
                    </span>
                  </div>
                  
                  {/* Language Selector - Responsive */}
                  <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-sm rounded-lg border border-emerald-200 px-2.5 py-1.5 shadow-sm w-fit">
                    <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600 flex-shrink-0" />
                    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="w-28 sm:w-32 h-6 sm:h-8 border-0 bg-transparent focus:ring-0 text-xs sm:text-sm p-0">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableLanguages.map((languageCode, index) => (
                          <SelectItem key={index} value={languageCode} className="text-xs sm:text-sm">
                            {decodeLanguage(languageCode)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isTransitioning && (
                      <Loader2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 animate-spin text-emerald-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
                
                {/* Title and Description */}
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                    {pressRelease.title}
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed font-light max-w-4xl">
                    {pressRelease.description}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Published</p>
                      <p className="text-gray-900 font-semibold">{formatDate(pressRelease.date_published)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Location</p>
                      <p className="text-gray-900 font-semibold">{pressRelease.pib_hq}</p>
                    </div>
                  </div>
                </div>

                {/* Categories and Audience (Merged) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-emerald-600" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pressRelease.category_names.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-emerald-600" />
                      Target Audience
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pressRelease.audience_type_names.map((audience, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {audience}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Points Section (Merged) */}
                {keypointsData && keypointsData.results.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-base font-semibold text-gray-700 mb-3 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 text-emerald-600" />
                      Key Highlights
                    </h3>
                    {keypointsLoading || isTransitioning ? (
                      <div className="flex items-center justify-center py-8">
                        <LoadingSpinner />
                        <span className="ml-2 text-gray-600">Loading highlights...</span>
                      </div>
                    ) : (
                      <div className="transition-all duration-300">
                        {renderBulletPoints(keypointsData.results)}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="outline" asChild className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    <a href={pressRelease.source_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Original Source
                    </a>
                  </Button>
                  
                  {/* New Share UI */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-emerald-700">Share:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(pressRelease.title || 'Check out this announcement')}`,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                        title="Share on Twitter"
                        className="p-2 rounded-full text-sky-500 hover:bg-emerald-50 hover:text-sky-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      >
                        <Twitter className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                        title="Share on Facebook"
                        className="p-2 rounded-full text-blue-600 hover:bg-emerald-50 hover:text-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      >
                        <Facebook className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(pressRelease.title || 'Check out this announcement')}`,
                            '_blank',
                            'noopener,noreferrer'
                          )
                        }
                        title="Share on LinkedIn"
                        className="p-2 rounded-full text-blue-700 hover:bg-emerald-50 hover:text-blue-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      >
                        <Linkedin className="h-5 w-5" />
                      </button>
                      <button
                        onClick={copyToClipboard}
                        title="Copy Link"
                        className="p-2 rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-300 relative"
                      >
                        {showCopiedTick ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Full Announcement</CardTitle>
                <CardDescription className="text-base">
                  Read the complete details in your preferred format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="original" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-emerald-50 p-2 h-auto gap-2 rounded-xl">
                    <TabsTrigger 
                      value="original" 
                      className="flex items-center gap-2 text-sm sm:text-base py-3 px-4 sm:px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-emerald-700 data-[state=inactive]:hover:bg-emerald-100 transition-all duration-200 rounded-lg font-medium"
                    >
                      <Info className="h-4 w-4" />
                      <span className="hidden sm:inline">Simplified Version</span>
                      <span className="sm:hidden">Simplified</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="simplified" 
                      className="flex items-center gap-2 text-sm sm:text-base py-3 px-4 sm:px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-emerald-700 data-[state=inactive]:hover:bg-emerald-100 transition-all duration-200 rounded-lg font-medium"
                    >
                      <Lightbulb className="h-4 w-4" />
                      <span className="hidden sm:inline">Kid's Version</span>
                      <span className="sm:hidden">Kid's</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="original" className="mt-0">
                    {originalTextLoading || isTransitioning ? (
                      <div className="flex items-center justify-center py-12">
                        <LoadingSpinner />
                        <span className="ml-2 text-gray-600">Loading content...</span>
                      </div>
                    ) : (
                    <div className="prose prose-lg prose-gray max-w-none transition-all duration-300">
                        {originalTextData && originalTextData.results.length > 0 ? (
                          renderPlainContent(originalTextData.results)
                        ) : (
                          <div 
                            className="prose prose-lg prose-gray max-w-none text-gray-700 leading-relaxed bg-gray-50/30 p-6 rounded-xl border-l-4 border-gray-500 transition-all duration-300"
                            dangerouslySetInnerHTML={{ __html: pressRelease.original_text }}
                          />
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="simplified" className="mt-0">
                    {simplifiedTextLoading || isTransitioning ? (
                      <div className="flex items-center justify-center py-12">
                        <LoadingSpinner />
                        <span className="ml-2 text-gray-600">Loading content...</span>
                      </div>
                    ) : (
                    <div className="prose prose-lg prose-gray max-w-none transition-all duration-300">
                        {simplifiedTextData && simplifiedTextData.results.length > 0 ? (
                          renderPlainContent(simplifiedTextData.results)
                        ) : (
                          <div className="text-gray-500 text-center py-8">
                            <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Simplified version not available in {decodeLanguage(selectedLanguage)}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Source Information */}
            <Card className="mt-10 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Source Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-semibold text-gray-900">Published by:</span> {pressRelease.pib_hq}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-semibold text-gray-900">Last Updated:</span> {formatDate(pressRelease.updated_at)}
                    </p>
                  </div>
                  <Button variant="outline" asChild className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 w-full sm:w-auto">
                    <a href={pressRelease.source_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span className="truncate">View Original Source</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Announcements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Related Announcements</CardTitle>
                <CardDescription>
                  You might also be interested in these
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relatedAnnouncements.map((suggestion) => (
                    <Link 
                      to={`/announcement/${suggestion.id}`} 
                      key={suggestion.id} 
                      className="block p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-md group"
                    >
                      <div className="mb-1.5">
                        <span className="text-xs text-emerald-600 font-medium bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          {formatDateShort(suggestion.date_published)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 mb-1 line-clamp-2 leading-tight text-sm">
                        {suggestion.title}
                      </h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 line-clamp-1">{suggestion.ministry_name}</p>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnnouncementDetail; 