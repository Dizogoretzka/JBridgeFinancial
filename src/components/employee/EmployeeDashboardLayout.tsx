
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { 
  Home, 
  FileText, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Settings, 
  LogOut,
  DollarSign
} from "lucide-react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/employee/dashboard", icon: Home },
  { title: "Applications", url: "/employee/applications", icon: FileText },
  { title: "Disbursements", url: "/employee/disbursements", icon: DollarSign },
  { title: "Clients", url: "/employee/clients", icon: Users },
  { title: "Blacklist", url: "/employee/blacklist", icon: Shield },
  { title: "Credit Scores", url: "/employee/credit", icon: TrendingUp },
  { title: "Settings", url: "/employee/settings", icon: Settings },
];

export const EmployeeSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  
  return (
    <Sidebar className="bg-blue-600 text-white border-r-0">
      <SidebarHeader className="p-4 bg-sky-950">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/91f08756-7121-4d45-8a4e-ad048eb44dc0.png" 
            alt="J Bridge Logo" 
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg">J Bridge Employee</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-sky-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-100">Employee Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        isActive(item.url) 
                          ? 'bg-blue-700 text-white' 
                          : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

interface EmployeeDashboardLayoutProps {
  children: React.ReactNode;
}

export const EmployeeDashboardLayout = ({ children }: EmployeeDashboardLayoutProps) => {
  const { employee, signOut } = useEmployeeAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/employee/signin');
  };

  const getUserInitials = () => {
    if (employee?.full_name) {
      return employee.full_name.split(' ').map((name: string) => name[0]).join('').toUpperCase();
    }
    return employee?.username?.[0]?.toUpperCase() || 'E';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <EmployeeSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-xl font-semibold text-gray-800">Employee Portal</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-600 text-white">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">
                          {employee?.full_name || employee?.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {employee?.email || 'Employee'}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
