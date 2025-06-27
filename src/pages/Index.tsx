import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Users, Clock, CheckCircle, Star, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignInModal from "@/components/auth/SignInModal";
import RegisterModal from "@/components/auth/RegisterModal";
import { EmployeeSignInModal } from "@/components/auth/EmployeeSignInModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Index = () => {
  const [email, setEmail] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showEmployeeSignIn, setShowEmployeeSignIn] = useState(false);
  const navigate = useNavigate();

  const handleWaitingListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/91f08756-7121-4d45-8a4e-ad048eb44dc0.png" 
                alt="J Bridge Logo" 
                className="w-8 h-8"
              />
              <h1 className="text-xl font-medium">
                <span className="font-bold">J Bridge</span> 
                <span className="text-cyan-400 text-sm ml-2">Financial Services</span>
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">How it Works</a>
              <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <button onClick={() => navigate("/blacklist")} className="hover:text-cyan-400 transition-colors">Blacklist</button>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 hover:text-cyan-400 transition-colors">
                  <span>Employee Portal</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setShowEmployeeSignIn(true)}>
                    Employee Sign In
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800"
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </Button>
              <Button 
                className="bg-cyan-400 hover:bg-cyan-500 text-slate-800"
                onClick={() => setShowRegister(true)}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Affordable loans with a <span className="text-cyan-400">subscription model</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Replacing 30% monthly interest loans
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-medium"
                  onClick={() => setShowRegister(true)}
                >
                  Get Started Today
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800"
                >
                  Learn More
                </Button>
              </div>
              
              {/* Waiting List Form */}
              <form onSubmit={handleWaitingListSubmit} className="flex gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email for updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-slate-800"
                  required
                />
                <Button type="submit" className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 whitespace-nowrap">
                  Join Waitlist
                </Button>
              </form>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/lovable-uploads/91f08756-7121-4d45-8a4e-ad048eb44dc0.png" 
                alt="J Bridge Financial Services" 
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Get access to affordable loans in three simple steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">1. Sign Up</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create an account and complete your profile.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">2. Subscribe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Choose a subscription plan that fits your needs.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">3. Get a Loan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Apply for a loan and receive funds quickly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Choose the subscription plan that's right for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">Basic</CardTitle>
                <CardDescription className="text-gray-600">
                  For small loans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-slate-800 mb-4">N$99</div>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  <li>Access to loans up to N$5,000</li>
                  <li>Standard interest rates</li>
                  <li>Basic support</li>
                </ul>
                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-800">
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">Standard</CardTitle>
                <CardDescription className="text-gray-600">
                  For medium-sized loans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-slate-800 mb-4">N$199</div>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  <li>Access to loans up to N$15,000</li>
                  <li>Reduced interest rates</li>
                  <li>Priority support</li>
                </ul>
                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-800">
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">Premium</CardTitle>
                <CardDescription className="text-gray-600">
                  For large loans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-slate-800 mb-4">N$299</div>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  <li>Access to loans up to N$50,000</li>
                  <li>Lowest interest rates</li>
                  <li>24/7 premium support</li>
                </ul>
                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-800">
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the J Bridge difference: affordable loans, transparent terms, and a
              commitment to your financial well-being.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Affordable Rates</h3>
                <p className="text-gray-600">
                  Enjoy competitive interest rates and flexible repayment options.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Transparent Terms</h3>
                <p className="text-gray-600">
                  We provide clear, easy-to-understand loan agreements with no hidden fees.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  Our priority is your financial success. We're here to support you every step of
                  the way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">About Us</h2>
              <p className="text-xl text-gray-600 mb-8">
                J Bridge Financial Services is revolutionizing the lending industry with our
                innovative subscription-based model. We're committed to providing affordable,
                transparent, and customer-focused financial solutions.
              </p>
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800">Learn More</Button>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/500x300"
                alt="About J Bridge Financial Services"
                className="rounded-lg shadow-lg"
              />
            </div>
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

      {/* Modals */}
      <SignInModal 
        open={showSignIn} 
        onOpenChange={setShowSignIn}
        onSwitchToRegister={() => {
          setShowSignIn(false);
          setShowRegister(true);
        }}
      />
      
      <RegisterModal 
        open={showRegister} 
        onOpenChange={setShowRegister}
        onSwitchToSignIn={() => {
          setShowRegister(false);
          setShowSignIn(true);
        }}
      />

      <EmployeeSignInModal 
        open={showEmployeeSignIn} 
        onOpenChange={setShowEmployeeSignIn}
      />
    </div>
  );
};

export default Index;
