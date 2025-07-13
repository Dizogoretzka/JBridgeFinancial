
-- Create employees table for authentication and management
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'employee' CHECK (role IN ('admin', 'employee')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to employees table
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Create policy for employees to view employee records
CREATE POLICY "Employees can view employee records" 
  ON public.employees 
  FOR SELECT 
  USING (true);

-- Create blacklist table for employee management
CREATE TABLE public.blacklist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  id_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  reason TEXT,
  blacklisted_by UUID REFERENCES public.employees(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to blacklist table
ALTER TABLE public.blacklist ENABLE ROW LEVEL SECURITY;

-- Create policies for blacklist management
CREATE POLICY "Anyone can view blacklist" 
  ON public.blacklist 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only employees can modify blacklist" 
  ON public.blacklist 
  FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.employees WHERE id = auth.uid()));

-- Update loan_applications table to add employee review fields
ALTER TABLE public.loan_applications ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES public.employees(id);
ALTER TABLE public.loan_applications ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.loan_applications ADD COLUMN IF NOT EXISTS review_notes TEXT;

-- Add policies for employees to view and update loan applications
CREATE POLICY "Employees can view all applications" 
  ON public.loan_applications 
  FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.employees WHERE id = auth.uid()));

CREATE POLICY "Employees can update applications" 
  ON public.loan_applications 
  FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.employees WHERE id = auth.uid()));

-- Insert test employee (username: pius, password: 10101010)
-- Note: In production, use proper password hashing
INSERT INTO public.employees (username, password_hash, full_name, email, role)
VALUES ('pius', crypt('10101010', gen_salt('bf')), 'Pius Employee', 'pius@jbridge.com', 'admin');

-- Enable realtime for employee dashboard
ALTER TABLE public.employees REPLICA IDENTITY FULL;
ALTER TABLE public.blacklist REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.employees;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blacklist;
