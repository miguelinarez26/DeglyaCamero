-- ==========================================
-- MIGRATION: 20260126_add_payment_method.sql
-- DESCRIPTION: Add payment_method column for payment validation by reception.
-- ==========================================

BEGIN;

ALTER TABLE public.appointments 
ADD COLUMN IF NOT EXISTS payment_method TEXT;

COMMIT;
