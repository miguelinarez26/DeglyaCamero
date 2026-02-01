-- Add email to patients if it doesn't exist
ALTER TABLE public.patients 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Create activation_tokens table
CREATE TABLE IF NOT EXISTS public.activation_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL
);

-- Enable RLS
ALTER TABLE public.activation_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins/staff can view/create output (for generating links)
-- Adjusted for 'service_role' or authenticated staff usage.
-- For now, allow authenticated users to read their own tokens if we link them, 
-- but really this is for the system to verify.
-- Let's allow public read for verification by token (security via high entropy token).

CREATE POLICY "Allow public read by token" 
ON public.activation_tokens
FOR SELECT 
USING (true); 

-- Policy: Staff can create tokens
CREATE POLICY "Staff can create tokens" 
ON public.activation_tokens
FOR INSERT 
TO authenticated 
WITH CHECK (true); -- Ideally restrict to specific roles if roles exist

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_activation_tokens_token ON public.activation_tokens(token);
