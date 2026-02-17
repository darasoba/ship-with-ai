export function getPaymentProvider(request: Request): 'paystack' | 'stripe' {
  // Allow overriding via env var for testing (set to 'stripe' or 'paystack')
  const override = process.env.FORCE_PAYMENT_PROVIDER
  if (override === 'stripe' || override === 'paystack') {
    return override
  }

  // Only Nigeria uses Paystack (NGN), everyone else uses Stripe
  const country = request.headers.get('x-vercel-ip-country')?.toUpperCase()
  if (country === 'NG') {
    return 'paystack'
  }
  return 'stripe'
}
