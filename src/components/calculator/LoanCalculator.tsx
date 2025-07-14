import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { CreditCard, Calculator, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoanCalculatorProps {
  onApplyLoan?: (loanData: {
    amount: number;
    term: number;
    monthlyPayment: number;
    totalCost: number;
  }) => void;
}

const LoanCalculator = ({ onApplyLoan }: LoanCalculatorProps) => {
  const [loanAmount, setLoanAmount] = useState([10000]);
  const [loanTerm, setLoanTerm] = useState([12]);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Enhanced calculation logic with proper validation
  const calculateLoanDetails = () => {
    const amount = loanAmount[0];
    const term = loanTerm[0];
    
    // Validate inputs
    if (amount < 1000 || amount > 500000) {
      setErrors(prev => ({ ...prev, amount: 'Loan amount must be between N$1,000 and N$500,000' }));
      return null;
    }
    
    if (term < 1 || term > 60) {
      setErrors(prev => ({ ...prev, term: 'Loan term must be between 1 and 60 months' }));
      return null;
    }

    // Clear errors
    setErrors({});

    // Traditional loan calculation (30% annual interest rate)
    const monthlyInterestRate = 0.30 / 12; // 30% annual rate / 12 months
    const traditionalMonthlyPayment = amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) / (Math.pow(1 + monthlyInterestRate, term) - 1);
    const traditionalTotalCost = traditionalMonthlyPayment * term;

    // J Bridge subscription model (fixed N$299 monthly subscription)
    const subscriptionFee = 299;
    const bridgeMonthlyPayment = (amount / term) + subscriptionFee;
    const bridgeTotalCost = amount + (subscriptionFee * term);

    // Calculate savings
    const totalSavings = traditionalTotalCost - bridgeTotalCost;
    const savingsPercentage = ((totalSavings / traditionalTotalCost) * 100);

    return {
      amount,
      term,
      traditional: {
        monthlyPayment: Math.round(traditionalMonthlyPayment),
        totalCost: Math.round(traditionalTotalCost),
        interestPaid: Math.round(traditionalTotalCost - amount)
      },
      bridge: {
        monthlyPayment: Math.round(bridgeMonthlyPayment),
        totalCost: Math.round(bridgeTotalCost),
        subscriptionTotal: subscriptionFee * term
      },
      savings: {
        amount: Math.round(totalSavings),
        percentage: Math.round(savingsPercentage)
      }
    };
  };

  const calculationResult = calculateLoanDetails();

  // Format currency as Namibian Dollar (NAD)
  const formatNAD = (amount: number) => {
    return `N$${amount.toLocaleString()}`;
  };

  // Validate affordability
  const validateAffordability = () => {
    const income = parseFloat(monthlyIncome);
    if (!income || income <= 0) {
      toast({
        title: "Income Required",
        description: "Please enter your monthly income to check affordability.",
        variant: "destructive",
      });
      return false;
    }

    if (calculationResult && calculationResult.bridge.monthlyPayment > income * 0.4) {
      toast({
        title: "Affordability Warning",
        description: "This loan payment exceeds 40% of your income. Consider a smaller amount or longer term.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleApplyLoan = () => {
    if (!calculationResult) return;
    
    if (!validateAffordability()) return;

    if (onApplyLoan) {
      onApplyLoan({
        amount: calculationResult.amount,
        term: calculationResult.term,
        monthlyPayment: calculationResult.bridge.monthlyPayment,
        totalCost: calculationResult.bridge.totalCost
      });
    }

    toast({
      title: "Loan Application",
      description: "Your loan application has been prepared. Complete the process in your dashboard.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <Calculator className="h-6 w-6 mr-3" />
              Enhanced Loan Calculator
            </h3>
            {calculationResult && (
              <div className="bg-green-400 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm">
                Save {calculationResult.savings.percentage}%
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-white font-medium">Loan Amount</Label>
                  <span className="text-xl font-bold text-blue-200">{formatNAD(loanAmount[0])}</span>
                </div>
                <Slider 
                  value={loanAmount} 
                  onValueChange={setLoanAmount} 
                  max={500000} 
                  min={1000} 
                  step={1000} 
                  className="mb-2" 
                />
                <div className="flex justify-between text-sm text-blue-200">
                  <span>N$1,000</span>
                  <span>N$500,000</span>
                </div>
                {errors.amount && (
                  <div className="flex items-center text-red-300 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.amount}
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-white font-medium">Loan Term</Label>
                  <span className="text-xl font-bold text-blue-200">{loanTerm[0]} months</span>
                </div>
                <Slider 
                  value={loanTerm} 
                  onValueChange={setLoanTerm} 
                  max={60} 
                  min={1} 
                  step={1} 
                  className="mb-2" 
                />
                <div className="flex justify-between text-sm text-blue-200">
                  <span>1 month</span>
                  <span>60 months</span>
                </div>
                {errors.term && (
                  <div className="flex items-center text-red-300 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.term}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-white font-medium">Monthly Income (Optional)</Label>
                <Input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="Enter your monthly income"
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder-white/70"
                />
              </div>

              <div>
                <Label className="text-white font-medium">Employment Status (Optional)</Label>
                <Select value={employmentStatus} onValueChange={setEmploymentStatus}>
                  <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self_employed">Self Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {calculationResult && (
                <>
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-red-600 mb-2">Traditional Loan</h4>
                      <p className="text-sm text-red-500 mb-4">With 30% annual interest</p>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monthly Payment:</span>
                          <span className="font-bold text-red-600">{formatNAD(calculationResult.traditional.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Cost:</span>
                          <span className="font-bold text-red-600">{formatNAD(calculationResult.traditional.totalCost)}</span>
                        </div>
                        <p className="text-xs text-red-500">
                          💡 Interest adds {formatNAD(calculationResult.traditional.interestPaid)} to your loan
                        </p>
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
                          <span className="font-bold text-green-600">{formatNAD(calculationResult.bridge.monthlyPayment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Total Cost:</span>
                          <span className="font-bold text-green-600">{formatNAD(calculationResult.bridge.totalCost)}</span>
                        </div>
                        <p className="text-xs text-green-500">
                          💡 Subscription fee: N$299/month
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="text-center mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-lg font-bold text-blue-800 mb-2">Your Total Savings</h4>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{formatNAD(calculationResult.savings.amount)}</p>
                    <p className="text-blue-600 text-sm">
                      Save {calculationResult.savings.percentage}% with our subscription model
                    </p>
                  </div>

                  <Button 
                    onClick={handleApplyLoan}
                    className="w-full bg-green-600 hover:bg-green-700 mt-4"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Apply for This Loan
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanCalculator;