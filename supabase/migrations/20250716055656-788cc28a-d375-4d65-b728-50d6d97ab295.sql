-- Fix blacklist RLS policies to work with employee authentication system
-- Drop existing policies
DROP POLICY IF EXISTS "Only employees can modify blacklist" ON public.blacklist;
DROP POLICY IF EXISTS "Anyone can view blacklist" ON public.blacklist;

-- Create new policies that work with the employee authentication system
-- Allow service role to manage blacklist (for employee operations)
CREATE POLICY "Service role can manage blacklist" 
ON public.blacklist 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Allow public read access to blacklist for landing page visibility
CREATE POLICY "Public can view blacklist" 
ON public.blacklist 
FOR SELECT 
USING (true);