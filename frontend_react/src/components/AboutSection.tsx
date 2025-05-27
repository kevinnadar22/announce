import { Search, FileText, Bell, Filter, Globe, Smartphone, Languages, BookOpen, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: <Languages className="h-6 w-6" />,
      title: "Multi-language Support",
      description: "Access announcements in 10+ regional languages including Hindi, Tamil, Bengali, Telugu, and more for inclusive communication"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Simplified Content",
      description: "Complex government policies and announcements translated into easy-to-understand language for all citizens"
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Search & Filters",
      description: "Powerful search functionality with advanced filters by ministry, location, audience, and announcement type"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Real-time Notifications",
      description: "Get instant notifications about the latest government announcements and policy updates as they're published"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile-First Design",
      description: "Responsive design optimized for mobile devices, ensuring seamless access on smartphones and tablets"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Nationwide Coverage",
      description: "Comprehensive coverage of announcements from central and state governments across all ministries and departments"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Discover & Search",
      description: "Browse the latest announcements or use our advanced search and filtering system to find specific information relevant to your needs",
      icon: <Search className="h-8 w-8" />
    },
    {
      step: "2",
      title: "Read & Understand",
      description: "Access complete announcement details in your preferred language with simplified explanations and official source links",
      icon: <FileText className="h-8 w-8" />
    },
    {
      step: "3",
      title: "Stay Connected",
      description: "Subscribe to categories that matter to you and receive real-time notifications for new announcements and policy updates",
      icon: <Bell className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* About Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Announce
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Announce is your trusted platform for accessing official government announcements, 
            policies, and schemes. We make government communication accessible, searchable, and 
            user-friendly for all citizens across India.
          </p>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            How it Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                  <div className="text-emerald-600">
                    {step.icon}
                  </div>
                </div>
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold shadow-md">
                  {step.step}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                <div className="text-emerald-600 mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
