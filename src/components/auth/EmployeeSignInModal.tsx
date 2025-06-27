
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface EmployeeSignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmployeeSignInModal = ({ open, onOpenChange }: EmployeeSignInModalProps) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call edge function to authenticate employee
      const { data, error } = await supabase.functions.invoke('employee-auth', {
        body: {
          username: loginData.username,
          password: loginData.password,
        }
      });

      if (error) {
        toast({
          title: "Sign In Error",
          description: "Invalid username or password",
          variant: "destructive",
        });
      } else if (data?.success) {
        toast({
          title: "Success",
          description: "Successfully signed in! Redirecting to employee dashboard...",
        });
        // Store employee session
        localStorage.setItem('employee_session', JSON.stringify(data.employee));
        onOpenChange(false);
        navigate('/employee/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('employee-password-reset', {
        body: { email: forgotPasswordEmail }
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to send password reset email",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Password reset email sent successfully",
        });
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/91f08756-7121-4d45-8a4e-ad048eb44dc0.png" 
              alt="J Bridge Logo" 
              className="w-12 h-12"
            />
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-slate-800">
            {showForgotPassword ? "Reset Password" : "Employee Portal"}
          </DialogTitle>
          {!showForgotPassword && (
            <p className="text-center text-gray-600 text-sm">
              J Bridge Financial Services
            </p>
          )}
        </DialogHeader>
        
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4 px-2">
            <div className="space-y-2">
              <Label htmlFor="forgotEmail">Email Address</Label>
              <Input
                id="forgotEmail"
                type="email"
                placeholder="Enter your email address"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="text-blue-600 hover:underline text-sm"
                disabled={isLoading}
              >
                Back to Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-2">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-slate-700 hover:from-blue-600 hover:to-slate-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Login"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
