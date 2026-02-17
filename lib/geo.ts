export const PAYSTACK_COUNTRIES = ['NG', 'GH', 'ZA', 'KE']

export function getPaymentProvider(request: Request): 'paystack' | 'stripe' {
  // Allow overriding via env var for testing (set to 'stripe' or 'paystack')
  const override = process.env.FORCE_PAYMENT_PROVIDER
  if (override === 'stripe' || override === 'paystack') {
    return override
  }

  const country = request.headers.get('x-vercel-ip-country')
  if (country && PAYSTACK_COUNTRIES.includes(country.toUpperCase())) {
    return 'paystack'
  }
  return 'stripe'
}
