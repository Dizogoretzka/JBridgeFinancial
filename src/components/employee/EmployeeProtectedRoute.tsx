
import { useEmployeeAuth } from "@/hooks/useEmployeeAuth";
import { Navigate } from "react-router-dom";

interface EmployeeProtectedRouteProps {
  children: React.ReactNode;
}

export const EmployeeProtectedRoute = ({ children }: EmployeeProtectedRouteProps) => {
  const { employee, loading } = useEmployeeAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!employee) {
    return <Navigate to="/employee/signin" replace />;
  }

  return <>{children}</>;
};
