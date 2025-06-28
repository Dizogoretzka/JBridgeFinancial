import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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
      <Route path="/employee/dashboard" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <EmployeeDashboard />
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/loan-applications" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Loan Applications</h2>
              <p className="text-gray-600 mt-2">Review and manage client loan applications</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/clients" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
              <p className="text-gray-600 mt-2">Manage client records and information</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/blacklist" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Blacklist Management</h2>
              <p className="text-gray-600 mt-2">Manage blacklisted clients</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/credit-scores" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Credit Score Management</h2>
              <p className="text-gray-600 mt-2">Monitor and adjust client credit scores</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/reports" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
              <p className="text-gray-600 mt-2">Generate performance and analytics reports</p>
            </div>
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/settings" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <p className="text-gray-600 mt-2">Configure system settings and preferences</p>
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
        <BrowserRouter>
          <AuthenticatedApp />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
