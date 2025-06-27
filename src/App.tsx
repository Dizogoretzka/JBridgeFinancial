
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { EmployeeAuthProvider } from "@/hooks/useEmployeeAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { EmployeeProtectedRoute } from "@/components/employee/EmployeeProtectedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EmployeeDashboardLayout } from "@/components/employee/EmployeeDashboardLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Blacklist from "./pages/Blacklist";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Documents from "./pages/dashboard/Documents";
import Profile from "./pages/dashboard/Profile";
import EmployeeSignInPage from "./pages/employee/EmployeeSignInPage";
import EmployeeDashboardPage from "./pages/employee/EmployeeDashboardPage";

const queryClient = new QueryClient();

// Component to handle authenticated routing
const AuthenticatedApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/blacklist" element={<Blacklist />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/careers" element={<Careers />} />
      
      {/* Employee routes */}
      <Route path="/employee/signin" element={<EmployeeSignInPage />} />
      <Route path="/employee/dashboard" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <EmployeeDashboardPage />
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/applications" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Loan Applications</h1>
              <p className="text-gray-600">Review and process client loan applications</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/disbursements" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Disbursements</h1>
              <p className="text-gray-600">Manage fund releases and payments</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/clients" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Client Management</h1>
              <p className="text-gray-600">Update and manage client records</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/blacklist" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Blacklist Management</h1>
              <p className="text-gray-600">Manage restricted users and accounts</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/credit" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Credit Score Management</h1>
              <p className="text-gray-600">Monitor and adjust JBCS credit scores</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/settings" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">System Settings</h1>
              <p className="text-gray-600">Administrative tools and configuration</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      
      {/* Protected dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/documents" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Documents />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/profile" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/loans" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Loan Management</h2>
              <p className="text-gray-600 mt-2">Coming soon - Apply and manage your loans</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/credit" element={
        <ProtectedRoute>
          <DashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Credit Score</h2>
              <p className="text-gray-600 mt-2">Track your J Bridge Credit Score (JBCS)</p>
            </div>
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <EmployeeAuthProvider>
          <BrowserRouter>
            <AuthenticatedApp />
          </BrowserRouter>
        </EmployeeAuthProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
