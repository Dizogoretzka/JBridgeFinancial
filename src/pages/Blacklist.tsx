import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Search, Info, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface BlacklistEntry {
  id: string;
  id_number: string;
  full_name: string;
  phone_number: string | null;
  reason: string | null;
  created_at: string;
}

const Blacklist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch blacklist data
  const { data: blacklistEntries, isLoading, refetch } = useQuery({
    queryKey: ['blacklist-entries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blacklist')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Real-time subscription for blacklist updates
  useEffect(() => {
    const channel = supabase
      .channel('blacklist-changes')
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

  // Filter entries based on search query
  const filteredEntries = blacklistEntries?.filter(entry =>
    entry.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.id_number.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/logo.png" 
                alt="J Bridge Logo" 
                className="w-8 h-8"
              />
              <h1 className="text-xl font-medium cursor-pointer" onClick={() => navigate("/")}>
                <span className="font-bold">J Bridge</span> 
                <span className="text-cyan-400 text-sm ml-2">Financial Services</span>
              </h1>
            </div>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Blacklist Registry</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A public registry of individuals who have defaulted on loans or violated the terms of 
            our financial agreements.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blacklist Results Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading blacklist entries...</p>
                </div>
              </CardContent>
            </Card>
          ) : searchQuery && filteredEntries.length === 0 ? (
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No results found for "{searchQuery}"
                  </h3>
                  <p className="text-gray-600">
                    The person you're looking for is not currently on our blacklist.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : !searchQuery ? (
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Enter a name to search
                  </h3>
                  <p className="text-gray-600">
                    Use the search bar above to check if someone is on our blacklist registry.
                  </p>
                  {blacklistEntries && blacklistEntries.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Currently {blacklistEntries.length} entries in registry
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Search Results ({filteredEntries.length} found)
                </h3>
              </div>
              {filteredEntries.map((entry) => (
                <Card key={entry.id} className="border-l-4 border-l-red-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <User className="h-5 w-5 text-red-500 mr-2" />
                          <h4 className="text-lg font-semibold text-gray-900">
                            {entry.full_name}
                          </h4>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>ID Number:</strong> {entry.id_number}</p>
                          {entry.phone_number && (
                            <p><strong>Phone:</strong> {entry.phone_number}</p>
                          )}
                          {entry.reason && (
                            <p><strong>Reason:</strong> {entry.reason}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(entry.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Blacklist Policy */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">About Our Blacklist Policy</h2>
          </div>
          
          <div className="space-y-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              At J Bridge Financial Services, we believe in responsible lending and borrowing. Our blacklist 
              registry serves several important purposes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Transparency</h3>
                  <p className="text-gray-600">
                    We maintain transparency about individuals who have defaulted on their loans, helping 
                    other financial institutions make informed decisions.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Accountability</h3>
                  <p className="text-gray-600">
                    The registry encourages borrowers to honor their financial commitments and maintain 
                    good standing with lenders.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">Risk Management</h3>
                  <p className="text-gray-600">
                    By identifying individuals with poor repayment history, we work to reduce defaults 
                    and maintain the sustainability of our lending program.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-50 p-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Getting Removed from the Blacklist</h3>
                <p className="text-gray-700">
                  Individuals listed in our blacklist registry can be removed once they have settled their outstanding 
                  debts and demonstrated improved financial behavior. For inquiries about resolving blacklist status, 
                  please contact our customer service team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Maintain Good Financial Standing</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join J Bridge and experience a lending model that prioritizes fairness, transparency, and 
            financial well-being. Our subscription-based approach helps you avoid the pitfalls that lead to 
            blacklisting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-medium px-8 py-3">
              Learn More
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-8 py-3">
              Create Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">J Bridge</h3>
              <p className="text-gray-300 mb-4">
                Affordable loans with a subscription model. Replacing 30% monthly interest loans.
              </p>
              <div className="space-y-2 text-gray-300">
                <p>📞 +264 81 219 1482</p>
                <p>✉️ info@jbridgefinance.online</p>
                <p>📍 123 Independence Avenue, Windhoek</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-300">
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/")}>Home</p>
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/about")}>About Us</p>
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/contact")}>Contact</p>
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/careers")}>Careers</p>
                <p className="hover:text-cyan-400 cursor-pointer">Blacklist</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-gray-300">
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/terms-of-service")}>Terms of Service</p>
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/privacy-policy")}>Privacy Policy</p>
                <p className="hover:text-cyan-400 cursor-pointer">Loan Agreement</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
            <p className="text-gray-300">© 2025 J Bridge Financial Services. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <p className="text-gray-300">Developed by</p>
              <a href="https://www.aisod.tech" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-medium">AISOD</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blacklist;
