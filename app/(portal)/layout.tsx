import { redirect } from 'next/navigation'
import { PortalHeader } from '@/components/layout/portal-header'
import { CommandPalette } from '@/components/portal/command-palette'

const hasSupabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http') &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let userName = 'Student'

  if (hasSupabase) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      redirect('/login')
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()

    userName = profile?.full_name || user.email?.split('@')[0] || 'Student'
  }

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader userName={userName} />
      <CommandPalette />
      <main>{children}</main>
    </div>
  )
}
