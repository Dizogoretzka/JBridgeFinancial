-- Enable real-time for all tables to ensure proper synchronization
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.loan_applications REPLICA IDENTITY FULL; 
ALTER TABLE public.blacklist REPLICA IDENTITY FULL;

-- Add tables to realtime publication for real-time updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.loan_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blacklist;