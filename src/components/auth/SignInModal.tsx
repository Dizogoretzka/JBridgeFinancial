
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
}

const SignInModal = ({ open, onOpenChange, onSwitchToRegister }: SignInModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt:", { email, password });
    // Handle sign in logic here
  };

  const handleSwitchToRegister = () => {
    onOpenChange(false);
    onSwitchToRegister();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-slate-800">
            Welcome back
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Cell phone number or email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Cell phone number or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="text-sm text-blue-600 hover:underline cursor-pointer">
            Forgot password?
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Sign In
          </Button>
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSwitchToRegister}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
