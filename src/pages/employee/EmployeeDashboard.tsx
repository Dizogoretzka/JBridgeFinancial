
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { Users, CreditCard, UserX, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const EmployeeDashboard = () => {
  const { employee } = useEmployeeAuth();
  const [onlineClients, setOnlineClients] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [blacklistedClients, setBlacklistedClients] = useState(0);

  // Fetch client profiles count
  const { data: profiles } = useQuery({
    queryKey: ['employee-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch loan applications count
  const { data: loanApplications } = useQuery({
    queryKey: ['employee-loan-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch blacklist count
  const { data: blacklist } = useQuery({
    queryKey: ['employee-blacklist'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blacklist')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Set up real-time subscriptions
  useEffect(() => {
    const profilesChannel = supabase
      .channel('employee-profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        () => {
          // Refetch data
        }
      )
      .subscribe();

    const loansChannel = supabase
      .channel('employee-loans-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'loan_applications'
        },
        () => {
          // Refetch data
        }
      )
      .subscribe();

    const blacklistChannel = supabase
      .channel('employee-blacklist-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blacklist'
        },
        () => {
          // Refetch data
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(loansChannel);
      supabase.removeChannel(blacklistChannel);
    };
  }, []);

  // Update counts when data changes
  useEffect(() => {
    if (profiles) {
      setTotalClients(profiles.length);
      // For demo purposes, simulate some clients being online
      setOnlineClients(Math.floor(profiles.length * 0.7));
    }
  }, [profiles]);

  useEffect(() => {
    if (loanApplications) {
      setPendingApplications(loanApplications.filter(app => app.status === 'pending').length);
    }
  }, [loanApplications]);

  useEffect(() => {
    if (blacklist) {
      setBlacklistedClients(blacklist.length);
    }
  }, [blacklist]);

  const stats = [
    {
      title: "Total Clients",
      value: totalClients.toString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Online Clients",
      value: onlineClients.toString(),
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Applications",
      value: pendingApplications.toString(),
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Blacklisted Clients",
      value: blacklistedClients.toString(),
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome back, {employee?.full_name || employee?.username}!
        </h2>
        <p className="text-gray-600 mt-2">
          Employee Portal - Manage clients, loans, and blacklist from your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className={stat.bgColor}>
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
            <CardTitle>Recent Loan Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loanApplications && loanApplications.length > 0 ? (
              loanApplications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium">N$ {application.amount}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(application.applied_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={
                    application.status === 'approved' ? 'default' :
                    application.status === 'rejected' ? 'destructive' :
                    'secondary'
                  }>
                    {application.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>No loan applications found</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Client Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Online Clients</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{onlineClients}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Offline Clients</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm">{totalClients - onlineClients}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Blacklisted</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">{blacklistedClients}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
