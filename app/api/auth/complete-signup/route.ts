import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

// Called client-side right after signUp() to sync the plan from the application
// to the new user's profile. Uses the admin client to bypass RLS.
export async function POST(request: Request) {
  try {
    const { email, applicationId } = await request.json()

    if (!email || !applicationId) {
      return NextResponse.json({ error: 'Missing email or applicationId' }, { status: 400 })
    }

    const admin = getSupabaseAdmin()

    // Look up the plan from the application
    const { data: application } = await admin
      .from('applications')
      .select('plan')
      .eq('id', applicationId)
      .single()

    const plan = application?.plan || 'basic'

    // Find the auth user by email
    const { data: { users } } = await admin.auth.admin.listUsers({ perPage: 1000 })
    const user = users.find(u => u.email === email)

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update the profile plan
    const { error } = await admin
      .from('profiles')
      .update({ plan })
      .eq('id', user.id)

    if (error) {
      console.error('Failed to update profile plan:', error)
      return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
    }

    return NextResponse.json({ plan })
  } catch (error) {
    console.error('complete-signup error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
