import { Twitter, Mail,  Github} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emerald-50 border-t border-emerald-200 text-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
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

            <p className="text-gray-600 mb-6 leading-relaxed">
              An independent platform for accessing government announcements,
              policies, and schemes. Making government communication accessible to all citizens
              with AI-powered simplification and multilingual support.
            </p>
          </div>

          {/* Connect With Us Section */}
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-6">Connect With Us</h5>
            <div className="flex flex-col space-y-3">
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

          {/* Disclaimer Section */}
          <div>
            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-100 border border-emerald-200 rounded-lg p-4 mb-6 shadow-sm">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
