type PaystackConfig = {
  currency: string
  amount: number // in smallest unit (kobo/pesewas), with processing fee included
}

const PAYSTACK_COUNTRY_CONFIG: Record<string, PaystackConfig> = {
  NG: { currency: 'NGN', amount: 7_624_400 },  // ₦75,000 + 1.5% + ₦100 fee
  GH: { currency: 'GHS', amount: 89_750 },      // GHS 880 + 1.95% fee
  ZA: { currency: 'ZAR', amount: 105_300 },      // ZAR 1,000 + 2.9% + R3 fee
  KE: { currency: 'KES', amount: 750_000 },      // KES 7,100 + 2.9% fee (~KES 7,500)
}

export function getPaymentProvider(request: Request): 'paystack' | 'stripe' {
  // Allow overriding via env var for testing (set to 'stripe' or 'paystack')
  const override = process.env.FORCE_PAYMENT_PROVIDER
  if (override === 'stripe' || override === 'paystack') {
    return override
  }

  const country = getCountry(request)
  if (country && country in PAYSTACK_COUNTRY_CONFIG) {
    return 'paystack'
  }
  return 'stripe'
}

export function getCountry(request: Request): string | null {
  return request.headers.get('x-vercel-ip-country')?.toUpperCase() || null
}

export function getPaystackConfig(request: Request): PaystackConfig {
  const country = getCountry(request)
  if (country && country in PAYSTACK_COUNTRY_CONFIG) {
    return PAYSTACK_COUNTRY_CONFIG[country]
  }
  // Default to NGN
  return PAYSTACK_COUNTRY_CONFIG.NG
}
