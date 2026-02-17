ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS payment_provider text DEFAULT 'paystack';
