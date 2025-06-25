import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Check, Shield, Clock, CreditCard, X } from "lucide-react";
import SignInModal from "@/components/auth/SignInModal";
import RegisterModal from "@/components/auth/RegisterModal";
const Index = () => {
  const [loanAmount, setLoanAmount] = useState([5000]);
  const [loanTerm, setLoanTerm] = useState([12]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Format currency as Namibian Dollar (NAD)
  const formatNAD = (amount: number) => {
    return `N$${amount.toLocaleString()}`;
  };
  const traditionalMonthlyPayment = Math.round(loanAmount[0] * 1.3 / loanTerm[0]);
  const traditionalTotalCost = Math.round(loanAmount[0] * 1.3);
  const bridgeMonthlyPayment = Math.round((loanAmount[0] + 249 * loanTerm[0]) / loanTerm[0]);
  const bridgeTotalCost = loanAmount[0] + 249 * loanTerm[0];
  const totalSavings = traditionalTotalCost - bridgeTotalCost;
  const handleSwitchToRegister = () => {
    setShowSignIn(false);
    setShowRegister(true);
  };
  const handleSwitchToSignIn = () => {
    setShowRegister(false);
    setShowSignIn(true);
  };
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-medium">
                <span className="font-bold">J Bridge</span> 
                <span className="text-cyan-400 text-sm ml-2">Financial Services</span>
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800" onClick={() => setShowSignIn(true)}>
                Sign In
              </Button>
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-medium" onClick={() => setShowRegister(true)}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to J Bridge Financial Services
            </h2>
            <p className="text-xl mb-6">
              Get affordable financing through our innovative subscription model — <span className="text-cyan-400 font-medium">no interest charges, ever.</span>
            </p>
            <p className="text-lg mb-8 text-gray-300">
              We're replacing traditional 30% monthly interest loans with a transparent, fair subscription approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-medium px-6 py-3" onClick={() => setShowRegister(true)}>
                Get Started →
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800 px-6 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-700 font-medium">Zero Interest Loans</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-700 font-medium">Transparent Subscription Model</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-700 font-medium">Reg. No: CC/2019/02711</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose J Bridge */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Choose J Bridge?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Interest-Free Financing</h3>
              <p className="text-gray-600 leading-relaxed">
                Our subscription-based model eliminates interest charges, making loans more affordable and ethical.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Fast Approval</h3>
              <p className="text-gray-600 leading-relaxed">
                Get approved quickly with our streamlined application process and responsive support team.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Subscription Model</h3>
              <p className="text-gray-600 leading-relaxed">
                Our unique subscription approach makes loan repayments more manageable and predictable, with no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">See How Much You Can Save</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare our subscription model with traditional interest-based loans and see the difference for yourself.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto bg-slate-800 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <CreditCard className="h-6 w-6 mr-3" />
                  Loan Calculator
                </h3>
                <div className="bg-cyan-400 text-slate-800 px-4 py-2 rounded-lg font-bold text-sm">
                  Save up to 65%
                </div>
              </div>
              <p className="text-gray-300 mb-8">Compare traditional loans with our interest-free subscription model</p>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-medium">Loan Amount</label>
                    <span className="text-xl font-bold text-cyan-400">{formatNAD(loanAmount[0])}</span>
                  </div>
                  <Slider value={loanAmount} onValueChange={setLoanAmount} max={50000} min={1000} step={1000} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>N$1,000</span>
                    <span>N$50,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-medium">Loan Term (months)</label>
                    <span className="text-xl font-bold text-cyan-400">{loanTerm[0]} months</span>
                  </div>
                  <Slider value={loanTerm} onValueChange={setLoanTerm} max={24} min={1} step={1} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>1 month</span>
                    <span>24 months</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-red-600 mb-2">Traditional Loan</h4>
                      <p className="text-sm text-red-500 mb-4">With 30% monthly interest</p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monthly Payment:</span>
                          <span className="font-bold text-red-600">{formatNAD(traditionalMonthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Cost:</span>
                          <span className="font-bold text-red-600">{formatNAD(traditionalTotalCost)}</span>
                        </div>
                        <p className="text-xs text-red-500">💡 Interest adds {formatNAD(traditionalTotalCost - loanAmount[0])} to your loan</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-green-600 mb-2">J Bridge Subscription</h4>
                      <p className="text-sm text-green-500 mb-4">Interest-free financing</p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monthly Payment:</span>
                          <span className="font-bold text-green-600">{formatNAD(bridgeMonthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Cost:</span>
                          <span className="font-bold text-green-600">{formatNAD(bridgeTotalCost)}</span>
                        </div>
                        <p className="text-xs text-green-500">💡 Subscription is just N$249 per month</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center mt-8 p-6 bg-cyan-50 rounded-lg border border-cyan-200">
                  <h4 className="text-2xl font-bold text-slate-800 mb-2">Your Total Savings</h4>
                  <p className="text-4xl font-bold text-cyan-500 mb-2">{formatNAD(totalSavings)}</p>
                  <p className="text-slate-600">By choosing our subscription model over traditional interest-based loans</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative subscription model replaces traditional interest-based loans with a simpler, more transparent approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Register an Account</h3>
                  <p className="text-gray-600">Create your account and complete your profile with basic information.</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Choose a Subscription</h3>
                  <p className="text-gray-600">Select the subscription plan that fits your financial needs—no interest charges, just a fixed monthly fee.</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Apply for a Loan</h3>
                  <p className="text-gray-600">Submit your loan application with the required documentation.</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Receive Funds</h3>
                  <p className="text-gray-600">After approval, funds are quickly transferred to your account—with no interest to worry about.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it—hear from real customers who have experienced the J Bridge difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="text-cyan-400 text-4xl mb-4">"</div>
              <p className="text-gray-600 mb-6">
                "J Bridge transformed my business financing experience. With no interest charges, I was able to expand my shop without the stress of growing debt."
              </p>
              <div className="flex text-cyan-400 mb-4">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <p className="font-bold text-slate-800">Maria Nakanyala</p>
                  <p className="text-sm text-gray-600">Small Business Owner</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-cyan-400 text-4xl mb-4">"</div>
              <p className="text-gray-600 mb-6">
                "I needed a quick loan for medical expenses. The subscription model made it affordable and the approval was fast. I'll never go back to traditional loans."
              </p>
              <div className="flex text-cyan-400 mb-4">
                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  T
                </div>
                <div>
                  <p className="font-bold text-slate-800">Thomas Shilongo</p>
                  <p className="text-sm text-gray-600">Teacher</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-cyan-400 text-4xl mb-4">"</div>
              <p className="text-gray-600 mb-6">
                "The transparency of J Bridge is refreshing. I knew exactly what I was paying each month with no surprises or hidden fees."
              </p>
              <div className="flex text-cyan-400 mb-4">
                {[...Array(4)].map((_, i) => <span key={i}>★</span>)}
                <span className="text-gray-300">★</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  S
                </div>
                <div>
                  <p className="font-bold text-slate-800">Selma Amutenya</p>
                  <p className="text-sm text-gray-600">Government Employee</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-cyan-400 font-medium">Join thousands of satisfied customers across Namibia</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Our Subscription Model Beats Traditional Loans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-red-50 border-red-200">
              <h3 className="text-xl font-bold text-red-600 mb-6">Traditional Interest-Based Loans</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <X className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Up to 30% monthly interest charges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <X className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Compounding debt that grows over time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <X className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Hidden fees and charges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <X className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Paying more than you borrowed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <X className="h-5 w-5 text-red-500" />
                  <span className="text-gray-700">Difficult to predict total costs</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-green-50 border-green-200">
              <h3 className="text-xl font-bold text-green-600 mb-6">J Bridge Subscription Model</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Zero interest charges—ever</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Fixed, predictable monthly payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Transparent fee structure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Never pay more than expected</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Know the total cost upfront</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-cyan-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Interest-Free Financing?
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join thousands of customers who trust J Bridge for their financial needs—without the burden of interest charges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-cyan-400 hover:bg-gray-100 font-medium px-8 py-3" onClick={() => setShowRegister(true)}>
              Register Now
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white font-medium px-8 py-3 text-cyan-400">
              Check Blacklist
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">J Bridge</h3>
              <p className="text-gray-300 mb-4">Interest-free loans with a subscription model. Reg. No: CC/2019/02711</p>
              <div className="space-y-2 text-gray-300">
                <p>Contact Us: info@jbridgefinance.online</p>
                <p>Phone: +264 81 219 1482</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <div className="space-y-2 text-gray-300">
                  <p className="hover:text-cyan-400 cursor-pointer">About Us</p>
                  <p className="hover:text-cyan-400 cursor-pointer">Blacklist</p>
                  <p className="hover:text-cyan-400 cursor-pointer" onClick={() => setShowSignIn(true)}>Sign In</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <div className="space-y-2 text-gray-300">
                  <p className="hover:text-cyan-400 cursor-pointer" onClick={() => setShowRegister(true)}>Register</p>
                  <p className="hover:text-cyan-400 cursor-pointer">Privacy Policy</p>
                  <p className="hover:text-cyan-400 cursor-pointer">Terms of Service</p>
                </div>
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
      <SignInModal open={showSignIn} onOpenChange={setShowSignIn} onSwitchToRegister={handleSwitchToRegister} />
      <RegisterModal open={showRegister} onOpenChange={setShowRegister} onSwitchToSignIn={handleSwitchToSignIn} />
    </div>;
};
export default Index;