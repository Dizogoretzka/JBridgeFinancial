
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { UserX, Plus, Trash2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface BlacklistEntry {
  id: string;
  id_number: string;
  full_name: string;
  phone_number: string | null;
  reason: string | null;
  blacklisted_by: string | null;
  created_at: string;
  employees?: {
    full_name: string | null;
    username: string;
  };
}

const EmployeeBlacklist = () => {
  const { employee } = useEmployeeAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    id_number: "",
    full_name: "",
    phone_number: "",
    reason: ""
  });

  // Fetch blacklist entries
  const { data: blacklistEntries, isLoading, refetch } = useQuery({
    queryKey: ['employee-blacklist'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blacklist')
        .select(`
          *,
          employees (
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Mutation to add blacklist entry
  const addBlacklistMutation = useMutation({
    mutationFn: async (entry: typeof newEntry) => {
      const { error } = await supabase
        .from('blacklist')
        .insert({
          id_number: entry.id_number,
          full_name: entry.full_name,
          phone_number: entry.phone_number || null,
          reason: entry.reason || null,
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
      setIsAddDialogOpen(false);
      setNewEntry({ id_number: "", full_name: "", phone_number: "", reason: "" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add client to blacklist. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mutation to remove blacklist entry
  const removeBlacklistMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('blacklist')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee-blacklist'] });
      toast({
        title: "Client Removed",
        description: "The client has been successfully removed from the blacklist.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to remove client from blacklist. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('employee-blacklist-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blacklist'
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

  // Filter blacklist entries based on search term
  const filteredEntries = blacklistEntries?.filter(entry =>
    entry.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.id_number.includes(searchTerm) ||
    entry.phone_number?.includes(searchTerm)
  ) || [];

  const handleAddBlacklist = () => {
    if (!newEntry.id_number || !newEntry.full_name) {
      toast({
        title: "Missing Information",
        description: "ID number and full name are required.",
        variant: "destructive",
      });
      return;
    }
    addBlacklistMutation.mutate(newEntry);
  };

  const handleRemoveBlacklist = (id: string) => {
    if (confirm("Are you sure you want to remove this client from the blacklist?")) {
      removeBlacklistMutation.mutate(id);
    }
  };

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
        <h2 className="text-2xl font-bold text-gray-900">Blacklist Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blacklist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Add to Blacklist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Client to Blacklist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="id_number">ID Number *</Label>
                  <Input
                    id="id_number"
                    value={newEntry.id_number}
                    onChange={(e) => setNewEntry({...newEntry, id_number: e.target.value})}
                    placeholder="Enter client ID number"
                  />
                </div>
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={newEntry.full_name}
                    onChange={(e) => setNewEntry({...newEntry, full_name: e.target.value})}
                    placeholder="Enter client full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    value={newEntry.phone_number}
                    onChange={(e) => setNewEntry({...newEntry, phone_number: e.target.value})}
                    placeholder="Enter client phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    value={newEntry.reason}
                    onChange={(e) => setNewEntry({...newEntry, reason: e.target.value})}
                    placeholder="Enter reason for blacklisting"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleAddBlacklist}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={addBlacklistMutation.isPending}
                >
                  {addBlacklistMutation.isPending ? "Adding..." : "Add to Blacklist"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blacklisted Clients ({filteredEntries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.length > 0 ? (
              filteredEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <UserX className="h-5 w-5 text-red-600" />
                    <div>
                      <h3 className="font-medium">{entry.full_name}</h3>
                      <p className="text-sm text-gray-600">ID: {entry.id_number}</p>
                      {entry.phone_number && (
                        <p className="text-sm text-gray-600">Phone: {entry.phone_number}</p>
                      )}
                      {entry.reason && (
                        <p className="text-sm text-gray-600">Reason: {entry.reason}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Added by: {entry.employees?.full_name || entry.employees?.username || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveBlacklist(entry.id)}
                      disabled={removeBlacklistMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <UserX className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No blacklisted clients found</p>
                {searchTerm && (
                  <p className="text-sm">Try adjusting your search terms</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeBlacklist;
