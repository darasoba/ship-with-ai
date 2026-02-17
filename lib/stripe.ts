import Stripe from 'stripe'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key)
}

export async function createCheckoutSession({
  email,
  reference,
  successUrl,
  cancelUrl,
  metadata,
}: {
  email: string
  reference: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  const stripe = getStripe()

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 5695, // $55 + Stripe processing fee (2.9% + $0.30)
          product_data: {
            name: 'Ship With AI — Cohort Access',
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      ...metadata,
      payment_reference: reference,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  })

  return session
}

export function constructWebhookEvent(body: string, signature: string) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  return stripe.webhooks.constructEvent(body, signature, secret)
}
