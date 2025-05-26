import AnnouncementFilters from "./AnnouncementFilters";
import AnnouncementCard from "./AnnouncementCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Globe, Languages } from "lucide-react";

const AnnouncementsSection = () => {
  const announcements = [
    {
      id: 1,
      title: "Digital India Initiative: New Online Services Launched",
      originalText: "Government launches comprehensive digital services platform to streamline citizen interactions and reduce paperwork for government procedures. This initiative aims to digitize all government services and make them accessible to citizens across the country.",
      sourceUrl: "https://pib.gov.in/press-release-1",
      datePublished: "2024-12-15T10:30:00Z",
      pibHq: "PIB Delhi",
      ministry: "Ministry of Electronics & IT",
      audienceTypes: ["Citizens", "Businesses"],
      categories: ["Digital Services", "Technology"],
      availableLanguages: ["English", "Hindi", "Tamil", "Telugu", "Bengali"]
    },
    {
      id: 2,
      title: "Pradhan Mantri Kisan Samman Nidhi - New Enrollment Window",
      originalText: "Farmers can now register for PM-KISAN scheme benefits. Direct benefit transfer of ₹6000 annually to eligible farmer families. The scheme aims to provide income support to all landholding farmer families across the country.",
      sourceUrl: "https://pib.gov.in/press-release-2",
      datePublished: "2024-12-14T09:15:00Z",
      pibHq: "PIB Delhi",
      ministry: "Ministry of Agriculture",
      audienceTypes: ["Farmers", "Rural Population"],
      categories: ["Schemes", "Agriculture"],
      availableLanguages: ["English", "Hindi", "Punjabi", "Marathi", "Gujarati"]
    },
    {
      id: 3,
      title: "National Health Mission Updates and New Guidelines",
      originalText: "Updated healthcare guidelines and expansion of health services under National Health Mission for improved rural healthcare access. New protocols for telemedicine and mobile health units have been introduced.",
      sourceUrl: "https://pib.gov.in/press-release-3",
      datePublished: "2024-12-13T14:20:00Z",
      pibHq: "PIB Mumbai",
      ministry: "Ministry of Health",
      audienceTypes: ["Healthcare Workers", "Citizens"],
      categories: ["Health", "Policy"],
      availableLanguages: ["English", "Hindi", "Tamil", "Kannada", "Malayalam"]
    },
    {
      id: 4,
      title: "Skill Development Programs for Youth Employment",
      originalText: "Launch of new skill development initiatives aimed at enhancing employability of youth in emerging technology sectors. The program includes AI, data science, and digital marketing courses.",
      sourceUrl: "https://pib.gov.in/press-release-4",
      datePublished: "2024-12-12T11:45:00Z",
      pibHq: "PIB Delhi",
      ministry: "Ministry of Skill Development",
      audienceTypes: ["Youth", "Students"],
      categories: ["Employment", "Education"],
      availableLanguages: ["English", "Hindi", "Bengali", "Assamese", "Odia"]
    },
    {
      id: 5,
      title: "Environmental Protection Guidelines Updated",
      originalText: "New environmental regulations and guidelines for industrial compliance to ensure sustainable development and pollution control. Industries must adopt new emission standards by March 2025.",
      sourceUrl: "https://pib.gov.in/press-release-5",
      datePublished: "2024-12-11T16:30:00Z",
      pibHq: "PIB Chennai",
      ministry: "Ministry of Environment",
      audienceTypes: ["Industries", "Environmental Groups"],
      categories: ["Policy", "Environment"],
      availableLanguages: ["English", "Hindi", "Tamil", "Telugu", "Marathi"]
    },
    {
      id: 6,
      title: "Education Policy Implementation Status Update",
      originalText: "Progress report on National Education Policy implementation across states with focus on digital education infrastructure. Over 50,000 schools have been equipped with smart classrooms.",
      sourceUrl: "https://pib.gov.in/press-release-6",
      datePublished: "2024-12-10T08:00:00Z",
      pibHq: "PIB Delhi",
      ministry: "Ministry of Education",
      audienceTypes: ["Teachers", "Students", "Parents"],
      categories: ["Education", "Policy"],
      availableLanguages: ["English", "Hindi", "Gujarati", "Punjabi", "Urdu"]
    }
  ];

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

        {/* Filters Section - Vertical Layout */}
        <div className="mb-8">
          <AnnouncementFilters />
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">
            Showing <span className="font-medium text-gray-900">1-6</span> of <span className="font-medium text-gray-900">42</span> announcements
          </div>
          <div className="text-sm text-gray-500">
            Last updated: Dec 15, 2024
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              {...announcement}
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">7</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
