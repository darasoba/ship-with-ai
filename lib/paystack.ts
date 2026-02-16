import crypto from 'crypto'

const PAYSTACK_BASE_URL = 'https://api.paystack.co'

function getSecretKey() {
  const key = process.env.PAYSTACK_SECRET_KEY
  if (!key) throw new Error('PAYSTACK_SECRET_KEY is not set')
  return key
}

export async function initializeTransaction({
  email,
  amount,
  reference,
  callbackUrl,
  metadata,
}: {
  email: string
  amount: number // in kobo
  reference: string
  callbackUrl: string
  metadata?: Record<string, unknown>
}) {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: String(amount),
      reference,
      callback_url: callbackUrl,
      metadata,
    }),
  })

  const data = await res.json()

  if (!data.status) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction')
  }

  return data.data as {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export async function verifyTransaction(reference: string) {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getSecretKey()}`,
      },
    }
  )

  const data = await res.json()

  if (!data.status) {
    throw new Error(data.message || 'Failed to verify transaction')
  }

  return data.data as {
    id: number
    status: string
    reference: string
    amount: number
    paid_at: string | null
    customer: { email: string }
  }
}

export function validateWebhookSignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac('sha512', getSecretKey())
    .update(body)
    .digest('hex')
  return hash === signature
}

export function generateReference(): string {
  const hex = crypto.randomBytes(8).toString('hex')
  return `swai_${Date.now()}_${hex}`
}
