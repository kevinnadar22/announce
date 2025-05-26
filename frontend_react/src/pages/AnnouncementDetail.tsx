import { useParams, useNavigate } from "react-router-dom";
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
  Mail
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AnnouncementDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [readingProgress, setReadingProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Enhanced announcement data
  const announcement = {
    id: 1,
    title: "Pradhan Mantri Scholarship Scheme for Rural Students - Enhanced Benefits and Simplified Application Process",
    description: "The Government of India announces significant enhancements to the Pradhan Mantri Scholarship Scheme for Rural Students, aimed at providing comprehensive financial support to meritorious students from rural areas pursuing higher education.",
    originalText: `The Government of India announces significant enhancements to the Pradhan Mantri Scholarship Scheme for Rural Students, aimed at providing comprehensive financial support to meritorious students from rural areas pursuing higher education. This initiative represents a major step towards bridging the educational gap between urban and rural areas and ensuring equal opportunities for all students regardless of their geographical location.

The enhanced scheme now offers increased scholarship amounts, expanded eligibility criteria, and a streamlined application process designed to make higher education more accessible to rural students. The government has allocated ₹2,500 crores for this initiative, which is expected to benefit over 5 lakh students across the country in the current academic year.

Key features of the enhanced scheme include full tuition fee coverage for selected courses, monthly stipends for living expenses, one-time laptop grants, and additional support for research and project work. The scheme also introduces a mentorship program connecting rural students with industry professionals and alumni from premier institutions.

The application process has been completely digitized and simplified, with dedicated help desks established in all district headquarters to assist students and their families. Special provisions have been made for students from tribal areas and those belonging to economically weaker sections of society.

This initiative aligns with the government's vision of creating an inclusive education system that empowers every student to achieve their full potential, regardless of their background or location. The scheme is expected to significantly increase the enrollment of rural students in higher education institutions and contribute to the overall development of rural areas through education.`,
    
    sourceUrl: "https://pib.gov.in/press-release-scholarship-2024",
    datePublished: "2024-12-15T10:30:00Z",
    location: "New Delhi",
    ministry: "Ministry of Education",
    pibHq: "PIB Delhi",
    views: "12,847",
    
    categories: ["Education", "Scholarships", "Rural Development", "Student Welfare"],
    audienceTypes: ["Students", "Rural Population", "Parents", "Educational Institutions"],
    availableLanguages: ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi", "Odia", "Assamese"],
    
    keyPoints: [
      "Full tuition fee coverage for eligible courses",
      "Monthly stipend of ₹5,000 for living expenses", 
      "One-time laptop grant worth ₹25,000",
      "₹2,000 monthly allowance for books and study materials",
      "Travel allowance for attending examinations",
      "Mentorship program with industry professionals",
      "Dedicated help desks in all district headquarters",
      "Special provisions for tribal and economically weaker students"
    ],
    
    eligibilityRequirements: [
      "Must be a resident of rural area (as per census definition)",
      "Minimum 75% marks in previous qualifying examination",
      "Age limit: 17-25 years for undergraduate, 22-28 years for postgraduate",
      "Family income should not exceed ₹3 lakh per annum",
      "Should be enrolled in recognized educational institution"
    ],
    
    applicationProcess: [
      "Visit the official portal: scholarship.gov.in",
      "Register with Aadhaar number and basic details",
      "Fill the online application form with required information",
      "Upload necessary documents (income certificate, marks sheets, etc.)",
      "Submit application before the deadline",
      "Track application status through the portal"
    ],
    
    importantDates: {
      applicationStart: "May 15, 2025",
      applicationDeadline: "June 30, 2025", 
      documentVerification: "July 1-15, 2025",
      resultDeclaration: "August 1, 2025",
      firstDisbursement: "September 1, 2025"
    },
    
    contactInfo: {
      helplineNumber: "1800-XXX-XXXX",
      email: "rural.scholarship@education.gov.in",
      website: "scholarship.gov.in"
    },

    oversimplifiedContent: `🎓 **New Money Help for Village Students!**

**What is this?**
The government is giving money to smart students from villages to study in college.

**How much money?**
• All college fees - FREE! 
• ₹5,000 every month for food and living
• ₹2,000 every month for books
• One laptop worth ₹25,000 - FREE!
• Travel money for tests

**Who can get this?**
• Students from villages
• Must have 75% marks or more
• Age: 17-25 years (college), 22-28 years (higher studies)
• Family should not be very rich (less than ₹3 lakh per year)

**What papers do you need?**
• Aadhaar card
• Income proof
• Address proof
• School/college marks sheet
• Bank details
• Photos

**How to apply?**
1. Go to scholarship.gov.in website
2. Fill the form with your details
3. Upload your documents
4. Submit before June 30, 2025

**Need help?**
Call: 1800-XXX-XXXX (Free call)
Email: rural.scholarship@education.gov.in

**Important dates:**
• Start: May 15, 2025
• Last date: June 30, 2025
• Results: August 1, 2025

**Remember:**
✅ Apply early
✅ Keep all documents ready
✅ Check your email regularly
✅ Call helpline if you have questions`
  };

  const suggestedAnnouncements = [
    {
      id: 2,
      title: "New Healthcare Initiative for Rural Areas",
      ministry: "Ministry of Health",
      datePublished: "2024-12-14T14:20:00Z"
    },
    {
      id: 3,
      title: "Digital Literacy Program for Senior Citizens",
      ministry: "Ministry of IT",
      datePublished: "2024-12-13T09:15:00Z"
    },
    {
      id: 4,
      title: "Agricultural Subsidy Updates for 2025",
      ministry: "Ministry of Agriculture",
      datePublished: "2024-12-12T16:45:00Z"
    }
  ];

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

  // Handle click outside share menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: announcement.title,
          text: `Check out this government announcement: ${announcement.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(announcement.title);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      copy: () => {
        navigator.clipboard.writeText(window.location.href);
        setShowShareMenu(false);
      }
    };

    if (platform === 'copy') {
      shareUrls.copy();
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls] as string, '_blank');
      setShowShareMenu(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <Header />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readingProgress} className="h-1 rounded-none bg-emerald-100" />
      </div>
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/20 rounded-full -translate-y-32 translate-x-32"></div>
              
              <div className="relative z-10">
                {/* Ministry Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Building2 className="h-4 w-4 mr-2" />
                    {announcement.ministry}
                  </span>
                </div>
                
                {/* Title and Description */}
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                    {announcement.title}
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed font-light max-w-4xl">
                    {announcement.description}
                  </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-xl border border-gray-100">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Published</p>
                      <p className="text-gray-900 font-semibold">{formatDate(announcement.datePublished)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-xl border border-gray-100">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Location</p>
                      <p className="text-gray-900 font-semibold">{announcement.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-white/80 rounded-xl border border-gray-100">
                    <Eye className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Views</p>
                      <p className="text-gray-900 font-semibold">{announcement.views}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative" ref={shareMenuRef}>
                    <Button 
                      variant="outline" 
                      onClick={handleShare}
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    {showShareMenu && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-[100] min-w-[220px]">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSocialShare('twitter')}
                          className="w-full justify-start text-blue-500 hover:bg-blue-50"
                        >
                          <Twitter className="h-4 w-4 mr-3" />
                          Share on Twitter
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSocialShare('facebook')}
                          className="w-full justify-start text-blue-600 hover:bg-blue-50"
                        >
                          <Facebook className="h-4 w-4 mr-3" />
                          Share on Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSocialShare('linkedin')}
                          className="w-full justify-start text-blue-700 hover:bg-blue-50"
                        >
                          <Linkedin className="h-4 w-4 mr-3" />
                          Share on LinkedIn
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSocialShare('copy')}
                          className="w-full justify-start text-gray-600 hover:bg-gray-50"
                        >
                          <Copy className="h-4 w-4 mr-3" />
                          Copy Link
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Categories and Audience */}
            <div className="bg-white rounded-2xl p-8 mb-10 shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-emerald-600" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {announcement.categories.map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-emerald-600" />
                    Target Audience
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {announcement.audienceTypes.map((audience, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points Section */}
            <Card className="mb-10 shadow-lg border-0">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl text-emerald-700">
                  <Lightbulb className="h-6 w-6" />
                  Key Highlights
                </CardTitle>
                <CardDescription className="text-base">
                  Essential information about this announcement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {announcement.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Full Announcement</CardTitle>
                <CardDescription className="text-base">
                  Read the complete details in your preferred format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="English" value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-emerald-50 p-1 h-auto">
                    <TabsTrigger 
                      value="English" 
                      className="flex items-center gap-2 text-base py-4 px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-emerald-700 transition-all duration-200 hover:bg-emerald-100"
                    >
                      <Info className="h-4 w-4" />
                      Original Text
                    </TabsTrigger>
                    <TabsTrigger 
                      value="Simplified" 
                      className="flex items-center gap-2 text-base py-4 px-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-emerald-700 transition-all duration-200 hover:bg-emerald-100"
                    >
                      <Lightbulb className="h-4 w-4" />
                      Simplified Version
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="English" className="mt-0">
                    <div className="prose prose-lg prose-gray max-w-none">
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                        {announcement.originalText}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="Simplified" className="mt-0">
                    <div className="prose prose-lg prose-gray max-w-none">
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg bg-emerald-50/30 p-6 rounded-xl border-l-4 border-emerald-500">
                        {announcement.oversimplifiedContent}
                      </div>
                    </div>
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
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Published by:</span> {announcement.pibHq}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-900">Last Updated:</span> {formatDate(announcement.datePublished)}
                    </p>
                  </div>
                  <Button variant="outline" asChild className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    <a href={announcement.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Original Source
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">


            {/* Language Dropdown */}
            <Card className="mb-8 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Available Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage} defaultValue="English">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {announcement.availableLanguages.map((language, index) => (
                      <SelectItem key={index} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Suggested Announcements */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg">Related Announcements</CardTitle>
                <CardDescription>
                  You might also be interested in these
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedAnnouncements.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:shadow-md"
                      onClick={() => navigate(`/announcement/${suggestion.id}`)}
                    >
                      <div className="mb-2">
                        <span className="text-xs text-gray-500 font-medium">{formatDateShort(suggestion.datePublished)}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-gray-600">{suggestion.ministry}</p>
                    </div>
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