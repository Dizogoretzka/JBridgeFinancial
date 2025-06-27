
-- Check if blacklist table exists, if not create it
CREATE TABLE IF NOT EXISTS public.blacklist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  id_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  reason TEXT,
  blacklisted_by UUID REFERENCES public.employees(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Check if loan_applications table exists, if not create it  
CREATE TABLE IF NOT EXISTS public.loan_applications (
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

-- Enable RLS on tables (will only apply if not already enabled)
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Employees can view employee records" ON public.employees;
DROP POLICY IF EXISTS "Anyone can view blacklist" ON public.blacklist;
DROP POLICY IF EXISTS "Only employees can modify blacklist" ON public.blacklist;
DROP POLICY IF EXISTS "Users can view their own applications" ON public.loan_applications;
DROP POLICY IF EXISTS "Users can create their own applications" ON public.loan_applications;
DROP POLICY IF EXISTS "Employees can view all applications" ON public.loan_applications;
DROP POLICY IF EXISTS "Employees can update applications" ON public.loan_applications;

-- Create RLS policies
CREATE POLICY "Employees can view employee records" 
  ON public.employees 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view blacklist" 
  ON public.blacklist 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only employees can modify blacklist" 
  ON public.blacklist 
  FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.employees WHERE id = auth.uid()));

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

-- Insert initial employee if not exists
INSERT INTO public.employees (username, password_hash, full_name, email, role)
SELECT 'pius', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Pius Employee', 'pius@jbridge.com', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM public.employees WHERE username = 'pius');
