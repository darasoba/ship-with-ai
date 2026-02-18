import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { constructWebhookEvent } from '@/lib/stripe'
import { sendSignupEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature') || ''

    let event
    try {
      event = constructWebhookEvent(body, signature)
    } catch {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    if (event.type !== 'checkout.session.completed') {
      return NextResponse.json({ received: true })
    }

    const session = event.data.object
    const sessionId = session.id

    // Look up the application by payment_reference
    const { data: application } = await getSupabaseAdmin()
      .from('applications')
      .select('id, email, full_name, status, plan')
      .eq('payment_reference', sessionId)
      .single()

    if (!application || application.status === 'paid') {
      return NextResponse.json({ received: true })
    }

    // Update application status
    await getSupabaseAdmin()
      .from('applications')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', application.id)

    // Generate invite token
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await getSupabaseAdmin().from('invite_tokens').insert({
      token,
      email: application.email,
      application_id: application.id,
      expires_at: expiresAt.toISOString(),
    })

    // Send signup email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ship.darasoba.com'
    const signupUrl = `${baseUrl}/signup?token=${token}`

    await sendSignupEmail({
      to: application.email,
      fullName: application.full_name,
      signupUrl,
      plan: application.plan || 'basic',
    })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    // Always return 200 so Stripe doesn't retry
    return NextResponse.json({ received: true })
  }
}
