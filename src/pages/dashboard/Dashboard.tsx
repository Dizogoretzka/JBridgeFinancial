
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { CreditCard, FileText, TrendingUp, DollarSign } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Active Loans",
      value: "0",
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      title: "Documents Uploaded",
      value: "0",
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "J Bridge Credit Score",
      value: "650",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Available Credit",
      value: "N$ 0",
      icon: DollarSign,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.user_metadata?.full_name || 'Client'}!
        </h2>
        <p className="text-gray-600 mt-2">
          Here's an overview of your financial profile with J Bridge Financials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="font-medium">Apply for a Loan</h3>
              <p className="text-sm text-gray-600">Submit a new loan application</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="font-medium">Upload Documents</h3>
              <p className="text-sm text-gray-600">Upload your ID and verification documents</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <h3 className="font-medium">Update Profile</h3>
              <p className="text-sm text-gray-600">Keep your personal information current</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity to display</p>
              <p className="text-sm">Complete your profile to get started</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
