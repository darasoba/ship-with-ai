export const PAYSTACK_COUNTRIES = ['NG', 'GH', 'ZA', 'KE']

export function getPaymentProvider(request: Request): 'paystack' | 'stripe' {
  const country = request.headers.get('x-vercel-ip-country')
  if (country && PAYSTACK_COUNTRIES.includes(country.toUpperCase())) {
    return 'paystack'
  }
  return 'stripe'
}
