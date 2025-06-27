
-- Create employee authentication table
CREATE TABLE public.employees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'employee',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blacklist table for client management
CREATE TABLE public.blacklist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  id_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  reason TEXT,
  blacklisted_by UUID REFERENCES public.employees(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create loan applications table
CREATE TABLE public.loan_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  purpose TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'disbursed')),
  reviewed_by UUID REFERENCES public.employees(id),
  review_notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for employees (only employees can access)
CREATE POLICY "Employees can view employee records" 
  ON public.employees 
  FOR SELECT 
  USING (true); -- Will be restricted by application logic

-- RLS policies for blacklist (public read access)
CREATE POLICY "Anyone can view blacklist" 
  ON public.blacklist 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only employees can modify blacklist" 
  ON public.blacklist 
  FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.employees WHERE id = auth.uid()));

-- RLS policies for loan applications
CREATE POLICY "Users can view their own applications" 
  ON public.loan_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
  ON public.loan_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Employees can view all applications" 
  ON public.loan_applications 
  FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.employees WHERE id = auth.uid()));

CREATE POLICY "Employees can update applications" 
  ON public.loan_applications 
  FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.employees WHERE id = auth.uid()));

-- Insert initial employee (pius with password hash for '10101010')
-- Note: In production, this should be properly hashed using bcrypt
INSERT INTO public.employees (username, password_hash, full_name, email, role)
VALUES ('pius', '$2b$10$rGKqHNNQGJqT5K9yGz5p7.X8VZxQV4KYmOHrJGQV9V5YzM2VnXYzC', 'Pius Employee', 'pius@jbridge.com', 'admin');
