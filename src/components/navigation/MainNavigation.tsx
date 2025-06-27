
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, UserCheck, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmployeePortalDropdown from "./EmployeePortalDropdown";

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blacklist", href: "/blacklist" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/91f08756-7121-4d45-8a4e-ad048eb44dc0.png" 
              alt="J Bridge Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">J Bridge Financial Services</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                {item.name}
              </button>
            ))}
            <EmployeePortalDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-blue-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white hover:text-blue-200 transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2">
                <button
                  onClick={() => {
                    navigate('/employee/signin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Employee Portal</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
