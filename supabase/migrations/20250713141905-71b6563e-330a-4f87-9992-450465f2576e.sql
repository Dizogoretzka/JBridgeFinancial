
-- Create documents table for file uploads
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('id_front', 'id_back', 'proof_of_income', 'bank_statement', 'other')),
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Add Row Level Security (RLS) to documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policies for documents
CREATE POLICY "Users can view their own documents" 
  ON public.documents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents" 
  ON public.documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
  ON public.documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false);

-- Storage policies for documents bucket
CREATE POLICY "Users can upload their own documents" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Update profiles table to include more fields for complete profile management
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS nationality TEXT DEFAULT 'Namibian';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS id_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;

-- Add credit score tracking table
CREATE TABLE public.credit_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 300 AND score <= 850),
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  factors JSONB,
  UNIQUE(user_id, calculated_at)
);

-- Add Row Level Security (RLS) to credit_scores table
ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;

-- Create policies for credit_scores
CREATE POLICY "Users can view their own credit scores" 
  ON public.credit_scores 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Update loan_applications table to include more fields
ALTER TABLE public.loan_applications ADD COLUMN IF NOT EXISTS monthly_income NUMERIC;
ALTER TABLE public.loan_applications ADD COLUMN IF NOT EXISTS employment_status TEXT;
ALTER TABLE public.loan_applications ADD COLUMN IF NOT EXISTS loan_term INTEGER; -- in months
ALTER TABLE public.loan_applications ADD COLUMN IF NOT EXISTS interest_rate NUMERIC DEFAULT 12.5;

-- Enable realtime for real-time updates
ALTER TABLE public.documents REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.loan_applications REPLICA IDENTITY FULL;
ALTER TABLE public.credit_scores REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.documents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.loan_applications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.credit_scores;
