import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { validateWebhookSignature } from '@/lib/paystack'
import { sendSignupEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-paystack-signature') || ''

    if (!validateWebhookSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)

    if (event.event !== 'charge.success') {
      return NextResponse.json({ received: true })
    }

    const reference = event.data?.reference
    if (!reference) {
      return NextResponse.json({ received: true })
    }

    // Look up the application
    const { data: application } = await getSupabaseAdmin()
      .from('applications')
      .select('id, email, full_name, status, plan')
      .eq('payment_reference', reference)
      .single()

    if (!application || application.status === 'paid') {
      // Already processed or not found — return 200 to acknowledge
      return NextResponse.json({ received: true })
    }

    // Update application status
    await getSupabaseAdmin()
      .from('applications')
      .update({ status: 'paid', paid_at: event.data.paid_at })
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
    console.error('Paystack webhook error:', error)
    // Always return 200 so Paystack doesn't retry
    return NextResponse.json({ received: true })
  }
}
