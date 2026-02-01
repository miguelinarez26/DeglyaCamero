-- Allow guests (anon) and authenticated users to create patient records
-- This is necessary for the public booking flow
CREATE POLICY "Allow public insert for booking"
ON public.patients
FOR INSERT
To public
WITH CHECK (true);

-- Ensure the policy is applied
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
