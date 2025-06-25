import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-medium cursor-pointer" onClick={() => navigate("/")}>
                <span className="font-bold">J Bridge</span> 
                <span className="text-cyan-400 text-sm ml-2">Financial Services</span>
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About J Bridge Financial Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bridging the gap between financial needs and affordable solutions through our 
            innovative subscription-based loan model.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
          </div>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              J Bridge Financial Services was founded with a clear mission: to revolutionize the short-term loan 
              industry in Namibia by providing affordable alternatives to the high-interest loans that often 
              trap borrowers in cycles of debt.
            </p>
            
            <p>
              We identified a critical problem in the market: traditional short-term loans charge up to 30% 
              monthly interest, creating unsustainable debt burdens for many borrowers. Our innovative 
              approach replaces this predatory interest model with a simple subscription system and a modest 
              transaction fee, making loans more affordable and accessible.
            </p>
            
            <p>
              By combining financial technology with responsible lending practices, we aim to empower 
              individuals to meet their immediate financial needs while building healthier financial habits for 
              the future.
            </p>
          </div>
        </div>
      </section>

      {/* How J Bridge Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">How J Bridge Works</h2>
          </div>

          {/* Subscription Model */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">The Subscription Model</h3>
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-gray-700 leading-relaxed mb-8">
                Instead of charging high interest rates on loans, J Bridge operates on a 
                subscription model. Members pay a fixed monthly fee based on their 
                chosen tier, which gives them access to loans within specific limits.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A simple 6% transaction fee is applied to each loan, regardless of the 
                repayment period. This replaces traditional interest charges, making loans 
                significantly cheaper.
              </p>
            </div>

            {/* Subscription Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Basic</h4>
                  <div className="text-3xl font-bold text-cyan-500 mb-2">N$50</div>
                  <p className="text-sm text-gray-600 mb-4">per month</p>
                  <p className="text-gray-700">Loans up to N$7,500</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 border-cyan-400">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Standard</h4>
                  <div className="text-3xl font-bold text-cyan-500 mb-2">N$100</div>
                  <p className="text-sm text-gray-600 mb-4">per month</p>
                  <p className="text-gray-700">Loans up to N$15,000</p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Premium</h4>
                  <div className="text-3xl font-bold text-cyan-500 mb-2">N$500</div>
                  <p className="text-sm text-gray-600 mb-4">per month</p>
                  <p className="text-gray-700">Loans up to N$50,000</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* The Loan Process */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-12 text-center">The Loan Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">1. Register & Subscribe</h4>
                <p className="text-gray-600">
                  Create an account, verify your identity, and choose a subscription tier that fits your borrowing needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-slate-800 font-bold text-xl">2</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">2. Apply for a Loan</h4>
                <p className="text-gray-600">
                  Submit a loan application through your dashboard, including the amount and purpose within your tier's limits.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">3. Receive Funds</h4>
                <p className="text-gray-600">
                  After approval, funds are deposited directly to your account, usually within 24 hours.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">4. Repayment</h4>
                <p className="text-gray-600">
                  Repay your loan according to the agreed schedule. No compounding interest or penalty fees.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">5</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">5. Build Your Score</h4>
                <p className="text-gray-600">
                  Timely repayments improve your J Bridge Credit Score (JBCS), unlocking higher loan limits.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">6</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">6. Access More</h4>
                <p className="text-gray-600">
                  As your credit score grows, you can access larger loans or upgrade your subscription tier for greater benefits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience a Better Way to Borrow?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join J Bridge today and access affordable loans with our innovative subscription model.
          </p>
          <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-medium px-8 py-3">
            Create Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
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
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/blacklist")}>Blacklist</p>
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

export default About;
