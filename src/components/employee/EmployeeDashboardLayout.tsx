
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { Home, Users, CreditCard, UserX, LogOut } from "lucide-react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", url: "/employee/dashboard", icon: Home },
  { title: "Clients", url: "/employee/clients", icon: Users },
  { title: "Loan Applications", url: "/employee/loans", icon: CreditCard },
  { title: "Blacklist", url: "/employee/blacklist", icon: UserX }
];

export const EmployeeSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;
  
  return (
    <Sidebar className="bg-slate-800 text-white border-r-0">
      <SidebarHeader className="p-4 bg-slate-900">
        <div className="flex items-center space-x-2">
          <img 
            src="/assets/logo.png" 
            alt="J Bridge Logo" 
            className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
          />
          <span className="font-semibold text-sm sm:text-lg truncate">J Bridge Employee Portal</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-slate-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300 text-xs sm:text-sm">Employee Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => 
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg transition-colors ${isActive(item.url) ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base truncate">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
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
    navigate('/employee-login');
  };
  
  const getEmployeeInitials = () => {
    if (employee?.full_name) {
      return employee.full_name.split(' ').map(name => name[0]).join('').toUpperCase();
    }
    return employee?.username?.[0]?.toUpperCase() || 'E';
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <EmployeeSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
                <SidebarTrigger className="lg:hidden flex-shrink-0" />
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Employee Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarFallback className="bg-slate-600 text-white text-xs sm:text-sm">
                          {getEmployeeInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 sm:w-56" align="end">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none min-w-0">
                        <p className="font-medium text-xs sm:text-sm truncate">
                          {employee?.full_name || employee?.username}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
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
          
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
