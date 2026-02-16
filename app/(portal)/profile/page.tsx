import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from './profile-form'
import { PasswordForm } from './password-form'

export const metadata = {
  title: 'Profile — Ship With AI',
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, cohort, project_description')
    .eq('id', user!.id)
    .single()

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      <ProfileForm
        userId={user!.id}
        initialName={profile?.full_name || ''}
        email={user!.email || ''}
        cohort={profile?.cohort || 1}
        initialProject={profile?.project_description || ''}
      />

      <div className="border-t border-border pt-10">
        <PasswordForm />
      </div>
    </div>
  )
}
