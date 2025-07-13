
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
    // Check if employee is already signed in
    const savedEmployee = localStorage.getItem('employee');
    if (savedEmployee) {
      setEmployee(JSON.parse(savedEmployee));
    }
    setLoading(false);
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      // Query the employees table to verify credentials
      const { data: employees, error } = await supabase
        .from('employees')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !employees) {
        return { error: 'Invalid credentials' };
      }

      // For demo purposes, use simple credential check
      // In production, implement proper password verification
      if (username === 'pius' && password === '10101010') {
        const employeeData = {
          id: employees.id,
          username: employees.username,
          full_name: employees.full_name,
          email: employees.email,
          role: employees.role
        };
        setEmployee(employeeData);
        localStorage.setItem('employee', JSON.stringify(employeeData));
        return { error: null };
      }

      return { error: 'Invalid credentials' };
    } catch (error) {
      return { error: 'An error occurred during sign in' };
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
