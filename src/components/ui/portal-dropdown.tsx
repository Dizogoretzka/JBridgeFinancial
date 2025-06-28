
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortalDropdownProps {
  className?: string;
}

export const PortalDropdown = ({ className }: PortalDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmployeePortal = () => {
    navigate("/employee-login");
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-transparent border-white text-white hover:bg-white hover:text-slate-800 px-4 py-2 rounded border transition-colors"
      >
        <span>Portal</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[160px]">
          <div className="py-1">
            <button
              onClick={handleEmployeePortal}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Employee Portal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
