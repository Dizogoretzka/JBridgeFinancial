
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CreditCard, Shield, TrendingUp, Clock, CheckCircle } from "lucide-react";

const EmployeeDashboard = () => {
  const stats = [
    {
      title: "Pending Applications",
      value: "12",
      description: "Awaiting review",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Approved Today",
      value: "8",
      description: "Loans approved",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Active Clients",
      value: "245",
      description: "Total registered",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Blacklisted",
      value: "23",
      description: "Total blacklisted",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  const recentApplications = [
    {
      id: "1",
      clientName: "John Doe",
      amount: "N$ 5,000",
      purpose: "Emergency expenses",
      status: "pending",
      appliedAt: "2024-01-15"
    },
    {
      id: "2",
      clientName: "Jane Smith",
      amount: "N$ 10,000",
      purpose: "Home improvement",
      status: "approved",
      appliedAt: "2024-01-14"
    },
    {
      id: "3",
      clientName: "Mike Johnson",
      amount: "N$ 3,500",
      purpose: "Medical bills",
      status: "under_review",
      appliedAt: "2024-01-13"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-600">Approved</Badge>;
      case 'under_review':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Under Review</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Welcome to your employee dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Recent Loan Applications</span>
            </CardTitle>
            <CardDescription>Latest applications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{application.clientName}</h4>
                    <p className="text-sm text-gray-600">{application.purpose}</p>
                    <p className="text-xs text-gray-500">Applied: {application.appliedAt}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-gray-900">{application.amount}</p>
                    {getStatusBadge(application.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium text-gray-900">Review Pending Applications</h4>
                <p className="text-sm text-gray-600">12 applications waiting for review</p>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium text-gray-900">Update Client Records</h4>
                <p className="text-sm text-gray-600">Manage client information and documents</p>
              </button>
              <button className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <h4 className="font-medium text-gray-900">Generate Reports</h4>
                <p className="text-sm text-gray-600">Create performance and analytics reports</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
