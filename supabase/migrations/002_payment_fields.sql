ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS payment_reference text,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS idx_applications_payment_ref
  ON public.applications(payment_reference) WHERE payment_reference IS NOT NULL;
