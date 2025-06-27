
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Shield, TrendingUp, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import RegisterModal from "@/components/auth/RegisterModal";
import SignInModal from "@/components/auth/SignInModal";
import FAQSection from "@/components/faq/FAQSection";
import WaitingListProcess from "@/components/process/WaitingListProcess";
import CompanyInfo from "@/components/company/CompanyInfo";
import MainNavigation from "@/components/navigation/MainNavigation";

const Index = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Quick Application",
      description: "Apply for loans in minutes with our streamlined process"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Secure Platform",
      description: "Your data is protected with bank-level security"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Competitive Rates",
      description: "Get the best rates based on your credit profile"
    }
  ];

  const subscriptionTiers = [
    {
      name: "Basic",
      price: "Free",
      features: ["Credit score monitoring", "Basic loan eligibility", "Educational resources"],
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99/month",
      features: ["Everything in Basic", "Priority loan processing", "Lower interest rates", "Personal loan advisor"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Everything in Premium", "Business loans", "Dedicated account manager", "Custom terms"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Financial Bridge to Success
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Get fast, secure loans with competitive rates. Join thousands of satisfied customers who trust J Bridge Financial Services.
            </p>
            <div className="space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started Today
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => navigate('/employee/signin')}
                    className="cursor-pointer"
                  >
                    Employee Portal
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setIsRegisterOpen(true)}
                    className="cursor-pointer"
                  >
                    Client
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose J Bridge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with the best financial services and support
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Select the subscription that best fits your financial needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-blue-500 border-2' : ''}`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">{tier.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6"
                    variant={tier.popular ? "default" : "outline"}
                    onClick={() => setIsRegisterOpen(true)}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <WaitingListProcess />
      <CompanyInfo />
      <FAQSection />

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to start your financial journey? Contact us today.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@jbridge.com</p>
            </div>
            <div className="text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Financial District<br />New York, NY 10004</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/lovable-uploads/91f08756-7121-4d45-8a4e-ad048eb44dc0.png" 
                  alt="J Bridge Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">J Bridge</span>
              </div>
              <p className="text-gray-400">
                Your trusted financial partner for loans and credit services.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personal Loans</li>
                <li>Business Loans</li>
                <li>Credit Monitoring</li>
                <li>Financial Advice</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 J Bridge Financial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <RegisterModal 
        open={isRegisterOpen} 
        onOpenChange={setIsRegisterOpen}
        onSwitchToSignIn={() => {
          setIsRegisterOpen(false);
          setIsSignInOpen(true);
        }}
      />
      <SignInModal 
        open={isSignInOpen} 
        onOpenChange={setIsSignInOpen}
        onSwitchToRegister={() => {
          setIsSignInOpen(false);
          setIsRegisterOpen(true);
        }}
      />
    </div>
  );
};

export default Index;
