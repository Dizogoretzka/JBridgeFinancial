
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface EmployeeProtectedRouteProps {
  children: React.ReactNode;
}

export const EmployeeProtectedRoute = ({ children }: EmployeeProtectedRouteProps) => {
  const { employee, loading } = useEmployeeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !employee) {
      navigate('/employee-login');
    }
  }, [employee, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return <>{children}</>;
};
