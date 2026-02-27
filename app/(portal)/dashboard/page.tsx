import { MATERIALS_ORDER, WEEK_CONFIG, PRE_WORK, ANNOUNCEMENT, DISCORD_URL, PREMIUM_BOOKING_URL, PREMIUM_CONTACT_URL, PREMIUM_RESOURCES, RECORDINGS } from '@/lib/constants'
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
  let fullName = ''
  let cohort = 1
  let plan = 'basic'
  let continueSlug = 'curriculum'

  if (hasSupabase) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, cohort, plan')
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
      fullName = profile?.full_name || ''
      cohort = profile?.cohort || 1
      plan = profile?.plan || 'basic'
      continueSlug = lastRead?.material_slug || 'curriculum'
    }
  }
  // Calculate current week from cohort start date (env var) — 0 if not started, clamp to 1-4 after
  const cohortStart = process.env.NEXT_PUBLIC_COHORT_START_DATE
  let currentWeek = 0
  if (cohortStart) {
    const start = new Date(cohortStart)
    const now = new Date()
    const diffMs = now.getTime() - start.getTime()
    if (diffMs >= 0) {
      const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
      currentWeek = Math.max(1, Math.min(4, diffWeeks + 1))
    }
  }
  const hasStarted = currentWeek > 0
  const currentWeekConfig = hasStarted ? WEEK_CONFIG[currentWeek - 1] : null
  const continueMaterial = MATERIALS_ORDER.find((m) => m.slug === continueSlug)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Announcement banner */}
      {ANNOUNCEMENT && (
        <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-foreground">
          <svg className="w-4 h-4 mt-0.5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <span>{ANNOUNCEMENT}</span>
        </div>
      )}

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {firstName}.
        </h1>
        <p className="text-muted mt-1 flex items-center gap-2">
          <span>Cohort {cohort} &middot; {hasStarted ? `Week ${currentWeek}` : 'Starts soon'}</span>
          {plan === 'premium' ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 rounded-full">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide border border-border text-muted rounded-full">
              Basic
            </span>
          )}
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted">
          {WEEK_CONFIG.map((w) => (
            <span key={w.week} className={hasStarted && w.week === currentWeek ? 'text-accent font-medium' : ''}>
              Week {w.week}
            </span>
          ))}
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: hasStarted ? `${(currentWeek / 4) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        {DISCORD_URL && (
          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
            <Card hover className="h-full">
              <div className="text-accent mb-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-foreground text-sm">Join the community</h3>
              <p className="text-xs text-muted mt-1">Discord channel</p>
            </Card>
          </a>
        )}
      </div>

      {/* Premium Perks */}
      {plan === 'premium' && (PREMIUM_BOOKING_URL || PREMIUM_CONTACT_URL || PREMIUM_RESOURCES.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Your Premium Perks
          </h2>
          <p className="text-sm text-muted mb-4">Exclusive to your plan.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {PREMIUM_BOOKING_URL && (
              <a href={PREMIUM_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Card hover className="h-full border-amber-500/30 hover:border-amber-500/50">
                  <div className="text-amber-500 mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">Book a session</h3>
                  <p className="text-xs text-muted mt-1">Schedule a personal 1-on-1 session</p>
                </Card>
              </a>
            )}
            {PREMIUM_CONTACT_URL && (
              <a href={PREMIUM_CONTACT_URL} target="_blank" rel="noopener noreferrer">
                <Card hover className="h-full border-amber-500/30 hover:border-amber-500/50">
                  <div className="text-amber-500 mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">Direct contact</h3>
                  <p className="text-xs text-muted mt-1">Priority async support</p>
                </Card>
              </a>
            )}
            {PREMIUM_RESOURCES.map((resource) => (
              <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer">
                <Card hover className="h-full border-amber-500/30 hover:border-amber-500/50">
                  <div className="text-amber-500 mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{resource.title}</h3>
                  <p className="text-xs text-muted mt-1">{resource.description}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Pre-work checklist or This Week's Focus */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          {hasStarted ? 'This Week\u2019s Focus' : 'Pre-Work Checklist'}
        </h2>
        <p className="text-sm text-muted mb-4">
          {hasStarted ? currentWeekConfig!.theme : PRE_WORK.theme}
        </p>
        <DashboardProgress
          week={currentWeek}
          milestones={hasStarted ? currentWeekConfig!.milestones : PRE_WORK.milestones}
        />
      </div>

      {/* Course Materials */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Course Materials</h2>
        <div className="grid gap-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          <Link href="/recordings">
            <FolderCard
              title="Session Recordings"
              description={RECORDINGS.length > 0 ? `${RECORDINGS.length} recording${RECORDINGS.length === 1 ? '' : 's'}` : 'Live session recordings'}
            />
          </Link>
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
