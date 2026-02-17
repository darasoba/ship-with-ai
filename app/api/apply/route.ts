import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { initializeTransaction, generateReference } from '@/lib/paystack'
import { createCheckoutSession } from '@/lib/stripe'
import { getPaymentProvider } from '@/lib/geo'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.fullName?.trim() || !body.email?.trim() || !body.role || !body.projectIdea?.trim()) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Detect payment provider based on geo
    const provider = getPaymentProvider(request)

    // Insert application and get the ID back
    const { data: application, error } = await getSupabaseAdmin()
      .from('applications')
      .insert({
        full_name: body.fullName,
        email: body.email,
        current_role: body.role,
        project_description: body.projectIdea,
        referral_source: body.hearAbout || null,
        payment_provider: provider,
      })
      .select('id')
      .single()

    if (error || !application) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save application. Please try again.' },
        { status: 500 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    if (provider === 'stripe') {
      // Stripe flow — $55 USD
      const session = await createCheckoutSession({
        email: body.email,
        reference: `swai_${application.id}`,
        successUrl: `${baseUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/apply`,
        metadata: {
          application_id: application.id,
          full_name: body.fullName,
        },
      })

      // Store Stripe session ID as the payment reference
      await getSupabaseAdmin()
        .from('applications')
        .update({ payment_reference: session.id })
        .eq('id', application.id)

      return NextResponse.json({
        authorizationUrl: session.url,
        provider: 'stripe',
      })
    }

    // Paystack flow — ₦75,000
    const reference = generateReference()

    const { error: updateError } = await getSupabaseAdmin()
      .from('applications')
      .update({ payment_reference: reference })
      .eq('id', application.id)

    if (updateError) {
      console.error('Failed to set payment reference:', updateError)
      return NextResponse.json(
        { error: 'Failed to initialize payment. Please try again.' },
        { status: 500 }
      )
    }

    const transaction = await initializeTransaction({
      email: body.email,
      amount: 7_624_400, // ₦75,000 + Paystack processing fee (1.5% + ₦100)
      reference,
      callbackUrl: `${baseUrl}/welcome`,
      metadata: {
        application_id: application.id,
        full_name: body.fullName,
        custom_fields: [
          {
            display_name: 'Full Name',
            variable_name: 'full_name',
            value: body.fullName,
          },
        ],
      },
    })

    return NextResponse.json({
      authorizationUrl: transaction.authorization_url,
      provider: 'paystack',
    })
  } catch (error) {
    console.error('Application API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
