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
import Loans from "./pages/dashboard/Loans";
import CreditScore from "./pages/dashboard/CreditScore";
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeClients from "./pages/employee/EmployeeClients";
import EmployeeLoans from "./pages/employee/EmployeeLoans";
import EmployeeBlacklist from "./pages/employee/EmployeeBlacklist";
import { EmployeeAuthProvider } from "@/hooks/useEmployeeAuth";
import { EmployeeProtectedRoute } from "@/components/employee/EmployeeProtectedRoute";
import { EmployeeDashboardLayout } from "@/components/employee/EmployeeDashboardLayout";

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
      <Route path="/employee-login" element={<EmployeeLogin />} />
      
      {/* Protected client dashboard routes */}
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
            <Loans />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/credit" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CreditScore />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Protected employee dashboard routes */}
      <Route path="/employee/dashboard" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <EmployeeDashboard />
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/clients" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <EmployeeClients />
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/loans" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <EmployeeLoans />
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      <Route path="/employee/blacklist" element={
        <EmployeeProtectedRoute>
          <EmployeeDashboardLayout>
            <EmployeeBlacklist />
          </EmployeeDashboardLayout>
        </EmployeeProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
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
};

export default App;
