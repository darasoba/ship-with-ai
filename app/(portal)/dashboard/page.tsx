import { MATERIALS_ORDER, WEEK_CONFIG } from '@/lib/constants'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { FolderCard } from '@/components/ui/folder-card'
import { DashboardProgress } from './dashboard-progress'

const hasSupabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http') &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const metadata = {
  title: 'Dashboard — Ship With AI',
}

export default async function DashboardPage() {
  let firstName = 'there'
  let cohort = 1
  let continueSlug = 'curriculum'

  if (hasSupabase) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, cohort')
        .eq('id', user.id)
        .single()

      const { data: lastRead } = await supabase
        .from('reading_progress')
        .select('material_slug')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()

      firstName = profile?.full_name?.split(' ')[0] || 'there'
      cohort = profile?.cohort || 1
      continueSlug = lastRead?.material_slug || 'curriculum'
    }
  }
  // Calculate current week from cohort start date (env var) — clamp to 1-4
  const cohortStart = process.env.NEXT_PUBLIC_COHORT_START_DATE
  let currentWeek = 1
  if (cohortStart) {
    const start = new Date(cohortStart)
    const now = new Date()
    const diffMs = now.getTime() - start.getTime()
    const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
    currentWeek = Math.max(1, Math.min(4, diffWeeks + 1))
  }
  const currentWeekConfig = WEEK_CONFIG[currentWeek - 1]
  const continueMaterial = MATERIALS_ORDER.find((m) => m.slug === continueSlug)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {firstName}.
        </h1>
        <p className="text-muted mt-1">
          Cohort {cohort} &middot; Week {currentWeek}
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted">
          {WEEK_CONFIG.map((w) => (
            <span key={w.week} className={w.week === currentWeek ? 'text-accent font-medium' : ''}>
              Week {w.week}
            </span>
          ))}
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${(currentWeek / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href={`/materials/${continueSlug}`}>
          <Card hover className="h-full">
            <div className="text-accent mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground text-sm">Continue where you left off</h3>
            <p className="text-xs text-muted mt-1">{continueMaterial?.title || 'Curriculum'}</p>
          </Card>
        </Link>

        <Link href="/materials/student-handbook">
          <Card hover className="h-full">
            <div className="text-accent mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground text-sm">Today&apos;s check-in</h3>
            <p className="text-xs text-muted mt-1">Post your daily standup</p>
          </Card>
        </Link>

        <Link href="/materials/troubleshooting">
          <Card hover className="h-full">
            <div className="text-accent mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-foreground text-sm">Get help</h3>
            <p className="text-xs text-muted mt-1">Troubleshooting guide</p>
          </Card>
        </Link>
      </div>

      {/* This Week's Focus */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          This Week&apos;s Focus
        </h2>
        <p className="text-sm text-muted mb-4">{currentWeekConfig.theme}</p>
        <DashboardProgress
          week={currentWeek}
          milestones={currentWeekConfig.milestones}
        />
      </div>

      {/* Course Materials */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Course Materials</h2>
        <div className="grid gap-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {MATERIALS_ORDER.map((m) => (
            <Link key={m.slug} href={`/materials/${m.slug}`}>
              <FolderCard
                title={m.title}
                description={m.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
