
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { CheckCircle, XCircle, Clock, DollarSign, Ban } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface LoanApplication {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  applied_at: string;
  purpose: string | null;
  monthly_income: number | null;
  employment_status: string | null;
  loan_term: number | null;
  interest_rate: number | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  profiles?: {
    full_name: string | null;
    phone_number: string | null;
  };
}

const EmployeeLoans = () => {
  const { employee } = useEmployeeAuth();
  const queryClient = useQueryClient();
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [blacklistDialog, setBlacklistDialog] = useState<{ open: boolean; application: LoanApplication | null }>({ open: false, application: null });
  const [blacklistReason, setBlacklistReason] = useState("");

  // Fetch all loan applications with user profiles
  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ['employee-loan-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .order('applied_at', { ascending: false });
      
      if (error) throw error;
      
      // Fetch profiles separately to avoid join issues
      if (data && data.length > 0) {
        const userIds = data.map(app => app.user_id);
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, phone_number')
          .in('id', userIds);
        
        if (!profilesError && profiles) {
          return data.map(app => ({
            ...app,
            profiles: profiles.find(p => p.id === app.user_id) || { full_name: 'Unknown', phone_number: 'N/A' }
          }));
        }
      }
      
      return data?.map(app => ({
        ...app,
        profiles: { full_name: 'Unknown', phone_number: 'N/A' }
      })) || [];
    },
  });

  // Mutation to update loan application status
  const updateApplicationMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status: string; notes: string }) => {
      // Create service role client for employee operations
      const { createClient } = await import('@supabase/supabase-js');
      const serviceClient = createClient(
        'https://qjnxycgbnvovucrulrpn.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbnh5Y2dibnZvdnVjcnVscnBuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDYyOTU0MSwiZXhwIjoyMDY2MjA1NTQxfQ.HJdKh7YydHjWpZ2QJSLSfYCQT3T_v1fLftm5DbEcjWM'
      );
      
      const { error } = await serviceClient
        .from('loan_applications')
        .update({
          status,
          reviewed_by: employee?.id,
          reviewed_at: new Date().toISOString(),
          review_notes: notes
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-loan-applications'] });
      toast({
        title: "Application Updated",
        description: "The loan application has been successfully updated.",
      });
      setSelectedApplication(null);
      setReviewNotes("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update the application. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation to add client to blacklist
  const addToBlacklistMutation = useMutation({
    mutationFn: async ({ application, reason }: { application: LoanApplication; reason: string }) => {
      // Create service role client for employee operations
      const { createClient } = await import('@supabase/supabase-js');
      const serviceClient = createClient(
        'https://qjnxycgbnvovucrulrpn.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbnh5Y2dibnZvdnVjcnVscnBuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDYyOTU0MSwiZXhwIjoyMDY2MjA1NTQxfQ.HJdKh7YydHjWpZ2QJSLSfYCQT3T_v1fLftm5DbEcjWM'
      );

      // First get client ID from profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('id_number')
        .eq('id', application.user_id)
        .single();

      const { error } = await serviceClient
        .from('blacklist')
        .insert({
          id_number: profile?.id_number || 'Unknown',
          full_name: application.profiles?.full_name || 'Unknown',
          phone_number: application.profiles?.phone_number || null,
          reason: reason,
          blacklisted_by: employee?.id
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-blacklist'] });
      toast({
        title: "Client Blacklisted",
        description: "The client has been successfully added to the blacklist.",
      });
      setBlacklistDialog({ open: false, application: null });
      setBlacklistReason("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add client to blacklist. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('employee-loans-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'loan_applications'
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  // Filter applications based on status
  const filteredApplications = applications?.filter(app => 
    filterStatus === "all" || app.status === filterStatus
  ) || [];

  const handleApprove = (application: LoanApplication) => {
    setSelectedApplication(application);
  };

  const handleReject = (application: LoanApplication) => {
    setSelectedApplication(application);
  };

  const confirmAction = (status: string) => {
    if (selectedApplication) {
      updateApplicationMutation.mutate({
        id: selectedApplication.id,
        status,
        notes: reviewNotes
      });
    }
  };

  const LoanDetailsDialog = ({ application }: { application: LoanApplication }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Loan Application Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg">
              {application.profiles?.full_name || 'Unknown Client'}
            </h3>
            <p className="text-sm text-gray-600">{application.profiles?.phone_number}</p>
          </div>
          <div className="text-right">
            <Badge variant={
              application.status === 'approved' ? 'default' :
              application.status === 'rejected' ? 'destructive' :
              'secondary'
            }>
              {application.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Loan Amount:</span>
              <p className="text-lg font-semibold">N$ {application.amount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Purpose:</span>
              <p className="text-sm">{application.purpose || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Applied Date:</span>
              <p className="text-sm">{new Date(application.applied_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Monthly Income:</span>
              <p className="text-sm">N$ {application.monthly_income?.toLocaleString() || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Employment Status:</span>
              <p className="text-sm">{application.employment_status || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Loan Term:</span>
              <p className="text-sm">{application.loan_term ? `${application.loan_term} months` : 'Not specified'}</p>
            </div>
          </div>
        </div>

        {application.review_notes && (
          <div className="pt-4 border-t">
            <span className="text-sm font-medium">Review Notes:</span>
            <p className="text-sm mt-1">{application.review_notes}</p>
          </div>
        )}

        {application.status === 'pending' && (
          <div className="flex space-x-2 pt-4 border-t">
            <Button
              onClick={() => handleApprove(application)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button
              onClick={() => handleReject(application)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Loan Applications</h2>
        <div className="flex space-x-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              onClick={() => setFilterStatus(status)}
              size="sm"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-medium">
                        {application.profiles?.full_name || 'Unknown Client'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        N$ {application.amount.toLocaleString()} - {new Date(application.applied_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      application.status === 'approved' ? 'default' :
                      application.status === 'rejected' ? 'destructive' :
                      'secondary'
                    }>
                      {application.status}
                    </Badge>
                    <Button
                      onClick={() => setBlacklistDialog({ open: true, application })}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Ban className="h-4 w-4 mr-1" />
                      Blacklist
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <LoanDetailsDialog application={application} />
                    </Dialog>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No loan applications found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={selectedApplication !== null} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Application from:</p>
              <p className="text-lg">{selectedApplication?.profiles?.full_name || 'Unknown Client'}</p>
              <p className="text-sm text-gray-600">Amount: N$ {selectedApplication?.amount.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Review Notes:</label>
              <Textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Enter your review notes here..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => confirmAction('approved')}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={updateApplicationMutation.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => confirmAction('rejected')}
                variant="destructive"
                className="flex-1"
                disabled={updateApplicationMutation.isPending}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blacklist Dialog */}
      <Dialog open={blacklistDialog.open} onOpenChange={(open) => setBlacklistDialog({ open, application: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Client to Blacklist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Client:</p>
              <p className="text-lg">{blacklistDialog.application?.profiles?.full_name || 'Unknown Client'}</p>
              <p className="text-sm text-gray-600">{blacklistDialog.application?.profiles?.phone_number}</p>
            </div>
            <div>
              <Label htmlFor="blacklist-reason">Reason for blacklisting:</Label>
              <Textarea
                id="blacklist-reason"
                value={blacklistReason}
                onChange={(e) => setBlacklistReason(e.target.value)}
                placeholder="Enter the reason for blacklisting this client..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setBlacklistDialog({ open: false, application: null })}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (blacklistDialog.application) {
                    addToBlacklistMutation.mutate({
                      application: blacklistDialog.application,
                      reason: blacklistReason
                    });
                  }
                }}
                variant="destructive"
                className="flex-1"
                disabled={addToBlacklistMutation.isPending || !blacklistReason.trim()}
              >
                <Ban className="h-4 w-4 mr-2" />
                Blacklist Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeLoans;
