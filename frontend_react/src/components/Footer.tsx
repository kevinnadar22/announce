import { Twitter, Globe, Languages, Mail, Shield, Award, Clock, Github, Phone, MapPin, FileText, HelpCircle, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="bg-emerald-50 border-t border-emerald-200 text-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo-modified.png" 
                alt="Announce Logo" 
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Announce</h3>
                <p className="text-emerald-600 text-sm font-medium">Independent Platform</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              An independent platform for accessing government announcements, 
              policies, and schemes. Making government communication accessible to all citizens 
              with AI-powered simplification and multilingual support.
            </p>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-100 border border-emerald-200 rounded-lg p-4 mb-6 shadow-sm max-w-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold text-gray-800">Important Note:</span> This platform is an independent service and is not affiliated with the Government of India. We aggregate publicly available information for educational and informational purposes only.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200 hover:border-emerald-400 transition-colors">
                <Shield className="h-3 w-3 mr-1" />
                Independent
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200 hover:border-blue-400 transition-colors">
                <Award className="h-3 w-3 mr-1" />
                Trusted by 1M+
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200 hover:border-purple-400 transition-colors">
                <Clock className="h-3 w-3 mr-1" />
                24/7 Updates
              </Badge>
            </div>

            {/* Enhanced Social Media */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Connect with us</h5>
              <div className="flex space-x-4">
                <a href="https://github.com/kevinnadar22" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 text-gray-500 hover:text-gray-900 transition-all duration-300">
                  <div className="p-2 bg-white rounded-lg group-hover:bg-gray-100 transition-colors shadow-sm">
                    <Github className="h-5 w-5" />
                  </div>
                  <span className="text-sm">GitHub</span>
                </a>
                <a href="https://x.com/kvnn22" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all duration-300">
                  <div className="p-2 bg-white rounded-lg group-hover:bg-blue-100 transition-colors shadow-sm">
                    <Twitter className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Twitter</span>
                </a>
                <a href="mailto:jesikamaraj@gmail.com" className="group flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-all duration-300">
                  <div className="p-2 bg-white rounded-lg group-hover:bg-red-100 transition-colors shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#announcements" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>All Announcements</span>
                </a>
              </li>

              <li>
                <a href="#faq" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQ</span>
                </a>
              </li>

            </ul>
          </div>

          {/* Government Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Official Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>India.gov.in</span>
                </a>
              </li>
              <li>
                <a href="https://pib.gov.in" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Press Information Bureau</span>
                </a>
              </li>
              <li>
                <a href="https://www.mygov.in" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>MyGov Portal</span>
                </a>
              </li>
              <li>
                <div className="text-gray-600 flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Helpline: 1800-111-000</span>
                </div>
              </li>
              <li>
                <div className="text-gray-600 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>New Delhi, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-emerald-300 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-sm">
                © 2025 Announce - All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Last updated: May 27, 2025 | Version 2.1.0 | Not affiliated with Government of India
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              {/* Language Selector */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-600 text-sm flex items-center space-x-2">
                  <Languages className="h-4 w-4" />
                  <span>Available in:</span>
                </span>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="text-xs border-emerald-400 text-emerald-600 hover:bg-emerald-100 hover:border-emerald-500 transition-colors">
                    <Globe className="h-3 w-3 mr-1" />
                    EN
                  </Badge>
                  <Badge variant="outline" className="text-xs border-gray-400 text-gray-600 hover:bg-gray-100 hover:border-gray-500 transition-colors">हिं</Badge>
                  <Badge variant="outline" className="text-xs border-gray-400 text-gray-600 hover:bg-gray-100 hover:border-gray-500 transition-colors">তা</Badge>
                  <Badge variant="outline" className="text-xs border-gray-400 text-gray-600 hover:bg-gray-100 hover:border-gray-500 transition-colors">தமிழ்</Badge>
                  <Badge variant="outline" className="text-xs border-gray-400 text-gray-600 hover:bg-gray-100 hover:border-gray-500 transition-colors">+12</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
