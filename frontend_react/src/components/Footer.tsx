import { Facebook, Twitter, Youtube, Globe, Languages, Mail, Phone, MapPin, ExternalLink, Shield, Award, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Footer = () => {
  return (
    <footer className="bg-emerald-50 border-t border-emerald-200 text-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">GA</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">GovAnnounce</h3>
                <p className="text-emerald-600 text-sm font-medium">Government of India</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Your trusted platform for accessing official government announcements, 
              policies, and schemes. Making government communication accessible to all citizens 
              with AI-powered simplification and multilingual support.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200 hover:border-emerald-400 transition-colors">
                <Shield className="h-3 w-3 mr-1" />
                Verified Official
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
              <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="group flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all duration-300">
                  <div className="p-2 bg-white rounded-lg group-hover:bg-blue-100 transition-colors shadow-sm">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Facebook</span>
                </a>
                <a href="#" className="group flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all duration-300">
                  <div className="p-2 bg-white rounded-lg group-hover:bg-blue-100 transition-colors shadow-sm">
                    <Twitter className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Twitter</span>
                </a>
                <a href="#" className="group flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-all duration-300">
                  <div className="p-2 bg-white rounded-lg group-hover:bg-red-100 transition-colors shadow-sm">
                    <Youtube className="h-5 w-5" />
                  </div>
                  <span className="text-sm">YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-emerald-700">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Latest Announcements
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Government Schemes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Policy Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Digital Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Employment Opportunities
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-emerald-700">Support & Contact</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center group">
                  <ExternalLink className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Accessibility
                </a>
              </li>
            </ul>

            {/* Contact Information */}
            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Contact Info</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>1800-XXX-XXXX (Toll Free)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>support@govannounce.gov.in</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-emerald-300 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-sm">
                © 2024 GovAnnounce - Government of India. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Last updated: December 15, 2024 | Version 2.1.0
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
