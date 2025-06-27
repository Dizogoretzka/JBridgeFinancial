
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EmployeeProtectedRouteProps {
  children: React.ReactNode;
}

export const EmployeeProtectedRoute = ({ children }: EmployeeProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem('employee_session');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          setIsAuthenticated(!!parsed.id);
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
