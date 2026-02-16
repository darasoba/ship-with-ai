import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

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

    const supabase = await createClient()

    const { error } = await supabase.from('applications').insert({
      full_name: body.fullName,
      email: body.email,
      current_role: body.role,
      project_description: body.projectIdea,
      referral_source: body.hearAbout || null,
    })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save application. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Application submitted successfully' })
  } catch (error) {
    console.error('Application API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
