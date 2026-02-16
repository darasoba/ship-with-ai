import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { initializeTransaction, generateReference } from '@/lib/paystack'

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

    // Insert application and get the ID back
    const { data: application, error } = await getSupabaseAdmin()
      .from('applications')
      .insert({
        full_name: body.fullName,
        email: body.email,
        current_role: body.role,
        project_description: body.projectIdea,
        referral_source: body.hearAbout || null,
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

    // Generate payment reference and update the application
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

    // Initialize Paystack transaction (₦75,000 = 7,500,000 kobo)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const transaction = await initializeTransaction({
      email: body.email,
      amount: 7_500_000,
      reference,
      callbackUrl: `${baseUrl}/payment/callback`,
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

    return NextResponse.json({ authorizationUrl: transaction.authorization_url })
  } catch (error) {
    console.error('Application API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
