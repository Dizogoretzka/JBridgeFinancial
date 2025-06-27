
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  FileText, 
  Settings,
  DollarSign,
  Clock,
  AlertTriangle
} from "lucide-react";

const EmployeeDashboard = () => {
  const { employee } = useEmployeeAuth();
  const navigate = useNavigate();

  const dashboardStats = [
    { title: "Pending Applications", value: "12", icon: Clock, color: "text-yellow-600" },
    { title: "Approved Today", value: "8", icon: CreditCard, color: "text-green-600" },
    { title: "Total Disbursements", value: "$45,230", icon: DollarSign, color: "text-blue-600" },
    { title: "Blacklisted Users", value: "3", icon: AlertTriangle, color: "text-red-600" },
  ];

  const quickActions = [
    { title: "Review Applications", description: "Process pending loan applications", icon: FileText, path: "/employee/applications" },
    { title: "Manage Disbursements", description: "Handle fund releases", icon: DollarSign, path: "/employee/disbursements" },
    { title: "Client Records", description: "Update and manage client data", icon: Users, path: "/employee/clients" },
    { title: "Blacklist Management", description: "Manage restricted users", icon: Shield, path: "/employee/blacklist" },
    { title: "Credit Scores", description: "Monitor JBCS credit scores", icon: TrendingUp, path: "/employee/credit" },
    { title: "System Settings", description: "Administrative tools", icon: Settings, path: "/employee/settings" },
  ];

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {employee?.full_name || employee?.username}
            <Badge variant="secondary" className="ml-2">{employee?.role}</Badge>
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleQuickAction(action.path)}
                >
                  Access
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Loan Application Approved</p>
                <p className="text-sm text-gray-600">Application #LA-2024-001 - $5,000</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">2 min ago</div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                <DollarSign className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">Disbursement Completed</p>
                <p className="text-sm text-gray-600">$3,500 transferred to John Doe</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">15 min ago</div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">New Application Received</p>
                <p className="text-sm text-gray-600">Application #LA-2024-002 - $7,500</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">1 hour ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
