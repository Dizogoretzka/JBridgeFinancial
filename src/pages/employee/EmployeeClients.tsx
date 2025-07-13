
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, Eye, Phone, Mail, Calendar, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ClientProfile {
  id: string;
  full_name: string | null;
  phone_number: string | null;
  email?: string;
  date_of_birth: string | null;
  gender: string | null;
  nationality: string | null;
  id_number: string | null;
  address: string | null;
  created_at: string;
  online_status?: boolean;
}

const EmployeeClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);

  // Fetch all client profiles
  const { data: profiles, isLoading, refetch } = useQuery({
    queryKey: ['employee-all-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Add simulated online status for demo
      return (data || []).map(profile => ({
        ...profile,
        online_status: Math.random() > 0.3 // 70% chance of being online
      }));
    },
  });

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('employee-profiles-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
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

  // Filter profiles based on search term
  const filteredProfiles = profiles?.filter(profile =>
    profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.phone_number?.includes(searchTerm) ||
    profile.id_number?.includes(searchTerm)
  ) || [];

  const ClientDetailsDialog = ({ client }: { client: ClientProfile }) => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Client Details</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{client.full_name || 'Unknown'}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${client.online_status ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">
                {client.online_status ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{client.phone_number || 'Not provided'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{client.email || 'Not provided'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                {client.date_of_birth ? new Date(client.date_of_birth).toLocaleDateString() : 'Not provided'}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">ID Number:</span>
              <span className="text-sm ml-2">{client.id_number || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Gender:</span>
              <span className="text-sm ml-2">{client.gender || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Nationality:</span>
              <span className="text-sm ml-2">{client.nationality || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {client.address && (
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-400 mt-1" />
            <span className="text-sm">{client.address}</span>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="text-xs text-gray-500">
            Client since: {new Date(client.created_at).toLocaleDateString()}
          </div>
        </div>
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
        <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clients ({filteredProfiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${client.online_status ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <div>
                      <h3 className="font-medium">{client.full_name || 'Unknown'}</h3>
                      <p className="text-sm text-gray-600">{client.phone_number || 'No phone'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={client.online_status ? "default" : "secondary"}>
                      {client.online_status ? 'Online' : 'Offline'}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <ClientDetailsDialog client={client} />
                    </Dialog>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No clients found</p>
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

export default EmployeeClients;
