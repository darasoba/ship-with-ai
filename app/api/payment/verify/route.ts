import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { verifyTransaction } from '@/lib/paystack'
import { sendSignupEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json(
        { error: 'Payment reference is required' },
        { status: 400 }
      )
    }

    // Look up the application by payment reference
    const { data: application, error: lookupError } = await getSupabaseAdmin()
      .from('applications')
      .select('id, email, full_name, status, plan')
      .eq('payment_reference', reference)
      .single()

    if (lookupError || !application) {
      return NextResponse.json(
        { error: 'Application not found for this payment reference' },
        { status: 404 }
      )
    }

    // If already processed, return early
    if (application.status === 'paid') {
      return NextResponse.json({ success: true, alreadyProcessed: true, email: application.email, fullName: application.full_name, plan: application.plan || 'basic' })
    }

    // Verify with Paystack
    const transaction = await verifyTransaction(reference)

    if (transaction.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment has not been completed' },
        { status: 400 }
      )
    }

    // Update application status
    const { error: updateError } = await getSupabaseAdmin()
      .from('applications')
      .update({ status: 'paid', paid_at: transaction.paid_at })
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
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Payment verification failed. Please try again.' },
      { status: 500 }
    )
  }
}
