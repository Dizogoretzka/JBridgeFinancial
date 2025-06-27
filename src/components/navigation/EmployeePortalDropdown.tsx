
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeePortalDropdown = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1 text-white hover:text-blue-200">
          <UserCheck className="h-4 w-4" />
          <span>Employee Portal</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => navigate('/employee/signin')}
          className="cursor-pointer"
        >
          <UserCheck className="mr-2 h-4 w-4" />
          Sign In
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmployeePortalDropdown;
