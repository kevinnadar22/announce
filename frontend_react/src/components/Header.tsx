import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <img 
              src="/logo-modified.png" 
              alt="Announce Logo" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Announce</h1>
              <p className="text-xs text-gray-600">Simplified Announcements</p>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#announcements" className="text-gray-600 hover:text-emerald-600 transition-colors">Announcements</a>
          <a href="#faq" className="text-gray-600 hover:text-emerald-600 transition-colors">FAQ</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
