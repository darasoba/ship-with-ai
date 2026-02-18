import { NextResponse } from 'next/server'
import crypto from 'crypto'
import Stripe from 'stripe'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { sendSignupEmail } from '@/lib/email'

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key)
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Look up the application by payment_reference (we store stripe session ID there)
    const { data: application, error: lookupError } = await getSupabaseAdmin()
      .from('applications')
      .select('id, email, full_name, status, plan')
      .eq('payment_reference', sessionId)
      .single()

    if (lookupError || !application) {
      return NextResponse.json(
        { error: 'Application not found for this payment session' },
        { status: 404 }
      )
    }

    // If already processed, return early
    if (application.status === 'paid') {
      return NextResponse.json({ success: true, alreadyProcessed: true, email: application.email, fullName: application.full_name, plan: application.plan || 'basic' })
    }

    // Verify with Stripe
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      )
    }

    // Update application status
    const { error: updateError } = await getSupabaseAdmin()
      .from('applications')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', application.id)

    if (updateError) {
      console.error('Failed to update application status:', updateError)
      return NextResponse.json(
        { error: 'Payment verified but failed to update records. Please contact support.' },
        { status: 500 }
      )
    }

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

    return NextResponse.json({ success: true, email: application.email, fullName: application.full_name, plan: application.plan || 'basic' })
  } catch (error) {
    console.error('Stripe verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed. Please try again.' },
      { status: 500 }
    )
  }
}
