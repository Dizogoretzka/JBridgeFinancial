
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { CreditCard, FileText, TrendingUp, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [documentsCount, setDocumentsCount] = useState(0);
  const [loansCount, setLoansCount] = useState(0);
  const [creditScore, setCreditScore] = useState(650);

  // Fetch user documents count
  const { data: documents } = useQuery({
    queryKey: ['user-documents', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch user loans count
  const { data: loans } = useQuery({
    queryKey: ['user-loans', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch user credit score
  const { data: creditScores } = useQuery({
    queryKey: ['user-credit-score', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('calculated_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    // Documents subscription
    const documentsChannel = supabase
      .channel('documents-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Refetch documents when changes occur
          setDocumentsCount(documents?.length || 0);
        }
      )
      .subscribe();

    // Loans subscription
    const loansChannel = supabase
      .channel('loans-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'loan_applications',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          // Refetch loans when changes occur
          setLoansCount(loans?.length || 0);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(documentsChannel);
      supabase.removeChannel(loansChannel);
    };
  }, [user, documents, loans]);

  // Update counts when data changes
  useEffect(() => {
    setDocumentsCount(documents?.length || 0);
  }, [documents]);

  useEffect(() => {
    setLoansCount(loans?.length || 0);
  }, [loans]);

  useEffect(() => {
    if (creditScores && creditScores.length > 0) {
      setCreditScore(creditScores[0].score);
    }
  }, [creditScores]);

  const stats = [
    {
      title: "Active Loans",
      value: loansCount.toString(),
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      title: "Documents Uploaded",
      value: documentsCount.toString(),
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "J Bridge Credit Score",
      value: creditScore.toString(),
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
            <div className="space-y-3">
              {documents && documents.length > 0 ? (
                documents.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <p className="text-sm font-medium">{doc.file_name}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(doc.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                      doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <p>No recent activity to display</p>
                  <p className="text-sm">Complete your profile to get started</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
