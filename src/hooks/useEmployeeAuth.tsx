
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Employee {
  id: string;
  username: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
}

interface EmployeeAuthContextType {
  employee: Employee | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined);

export const EmployeeAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if employee is already logged in
    const storedEmployee = localStorage.getItem('employee');
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee));
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      // Call edge function for employee authentication
      const { data, error } = await supabase.functions.invoke('employee-auth', {
        body: { username, password, action: 'login' }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.error) {
        return { error: data.error };
      }

      if (data.employee) {
        setEmployee(data.employee);
        localStorage.setItem('employee', JSON.stringify(data.employee));
        return { error: null };
      }

      return { error: 'Invalid credentials' };
    } catch (error) {
      return { error: 'Authentication failed' };
    }
  };

  const signOut = async () => {
    setEmployee(null);
    localStorage.removeItem('employee');
  };

  return (
    <EmployeeAuthContext.Provider value={{ employee, loading, signIn, signOut }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

export const useEmployeeAuth = () => {
  const context = useContext(EmployeeAuthContext);
  if (context === undefined) {
    throw new Error('useEmployeeAuth must be used within an EmployeeAuthProvider');
  }
  return context;
};
