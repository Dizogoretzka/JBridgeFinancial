
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignIn: () => void;
}

const RegisterModal = ({ open, onOpenChange, onSwitchToSignIn }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    cellPhone: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration attempt:", formData);
    // Handle registration logic here
  };

  const handleSwitchToSignIn = () => {
    onOpenChange(false);
    onSwitchToSignIn();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-slate-800">
            Create your account
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full bg-gray-50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cellPhone">Cell phone number *</Label>
            <Input
              id="cellPhone"
              type="tel"
              placeholder="Enter your cell phone number"
              value={formData.cellPhone}
              onChange={(e) => handleInputChange("cellPhone", e.target.value)}
              className="w-full bg-gray-50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-gray-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full bg-gray-50"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repeatPassword">Repeat password</Label>
            <Input
              id="repeatPassword"
              type="password"
              placeholder="Repeat your password"
              value={formData.repeatPassword}
              onChange={(e) => handleInputChange("repeatPassword", e.target.value)}
              className="w-full bg-gray-50"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Sign up
          </Button>
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={handleSwitchToSignIn}
              className="text-blue-600 hover:underline"
            >
              Log in
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
