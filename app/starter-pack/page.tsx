import Link from 'next/link'

export const metadata = {
  title: 'Starter Pack — Ship With AI',
  description: 'Everything you need before Day 1. Pre-work checklist, tools to install, and how the 4-week mentorship works.',
}

export default function StarterPackPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 px-6">
      <div className="max-w-xl mx-auto">
        {/* Back link */}
        <Link
          href="/welcome"
          className="inline-flex items-center gap-1.5 text-[13px] text-foreground-tertiary hover:text-foreground transition-colors mb-12"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Header */}
        <p className="text-[11px] font-semibold text-foreground-tertiary uppercase tracking-[0.2em] mb-3">
          Starter Pack
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Everything you need before Day&nbsp;1.
        </h1>
        <p className="text-[17px] text-foreground-secondary mt-4 leading-relaxed">
          The cohort starts <span className="text-foreground font-semibold">March 2, 2026</span>.
          Here&rsquo;s what to do while you wait.
        </p>

        {/* ── How it works ── */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            How it works
          </h2>
          <p className="text-[15px] text-foreground-secondary mt-3 leading-relaxed">
            4 weeks of intensive, cohort-based mentorship. You come with a project
            idea &mdash; we teach you the AI tools, workflows, and thinking patterns
            to build and ship it. Not a course. Not tutorials. You build something real.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <p className="text-[14px] font-medium text-foreground">Format</p>
              <p className="text-[14px] text-foreground-secondary mt-1.5 leading-relaxed">
                Live sessions (~2hrs/week), async support, 1-on-1 check-ins,
                and a private community.
              </p>
            </div>
            <div>
              <p className="text-[14px] font-medium text-foreground">Time commitment</p>
              <p className="text-[14px] text-foreground-secondary mt-1.5 leading-relaxed">
                8&ndash;10 hours per week. Includes live sessions and your own
                building time.
              </p>
            </div>
            <div>
              <p className="text-[14px] font-medium text-foreground">What you&rsquo;ll ship</p>
              <p className="text-[14px] text-foreground-secondary mt-1.5 leading-relaxed">
                YOUR project. A website, app, extension, or tool &mdash; live on
                the internet by Week&nbsp;4.
              </p>
            </div>
            <div>
              <p className="text-[14px] font-medium text-foreground">Demo Day</p>
              <p className="text-[14px] text-foreground-secondary mt-1.5 leading-relaxed">
                End of Week 4. Present your project in 3 minutes to the cohort.
                Record your demo.
              </p>
            </div>
          </div>
        </section>

        {/* ── The 4 Weeks ── */}
        <section className="mt-20">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            The 4 weeks
          </h2>
          <div className="mt-8 space-y-8">
            {[
              {
                week: '01',
                title: 'Learn the tools, start your project',
                desc: 'Pick your AI coding tool. Write your PRD. Scaffold your project. By Friday, you have a running app on localhost.',
              },
              {
                week: '02',
                title: 'Build',
                desc: 'Core features, database, real data. Your AI tool does the heavy lifting. You direct, review, and iterate.',
              },
              {
                week: '03',
                title: 'Polish and expand',
                desc: "Responsive design. Loading states. Error handling. Cut what you won't finish. Focus on what matters.",
              },
              {
                week: '04',
                title: 'Ship',
                desc: 'Deploy to a live URL. Record your demo. Present on Demo Day. Your project is on the internet.',
              },
            ].map((w) => (
              <div key={w.week} className="flex gap-6">
                <span className="text-[13px] font-mono text-foreground-tertiary pt-1 shrink-0">
                  W{w.week}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-foreground">{w.title}</p>
                  <p className="text-[14px] text-foreground-secondary mt-1.5 leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pre-work Checklist ── */}
        <section className="mt-20">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Pre-work checklist
          </h2>
          <p className="text-[14px] text-foreground-secondary mt-3 leading-relaxed">
            Complete before the first live session. Takes about 3&ndash;4 hours.
          </p>

          <div className="mt-10 space-y-10">
            {/* Install tools */}
            <div>
              <p className="text-[14px] font-medium text-foreground mb-4">
                Install your tools
              </p>
              <div className="space-y-3">
                {[
                  {
                    name: 'Cursor',
                    note: 'AI-powered code editor (recommended)',
                    link: 'https://cursor.com',
                  },
                  {
                    name: 'Claude Code CLI',
                    note: 'Terminal AI coding tool',
                    link: 'https://docs.anthropic.com/en/docs/claude-code',
                  },
                  {
                    name: 'Node.js',
                    note: 'LTS version (v22)',
                    link: 'https://nodejs.org',
                  },
                  {
                    name: 'Git',
                    note: 'Version control (non-negotiable)',
                    link: 'https://git-scm.com',
                  },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded border border-foreground/15 shrink-0 mt-0.5" />
                    <p className="text-[14px] text-foreground-secondary leading-relaxed">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground font-medium hover:underline underline-offset-2"
                      >
                        {item.name}
                      </a>{' '}
                      &mdash; {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Create accounts */}
            <div>
              <p className="text-[14px] font-medium text-foreground mb-4">
                Create accounts
              </p>
              <div className="space-y-3">
                {[
                  {
                    name: 'GitHub',
                    note: 'Your code lives here (free)',
                    link: 'https://github.com',
                  },
                  {
                    name: 'Anthropic',
                    note: 'For Claude Code API access',
                    link: 'https://console.anthropic.com',
                  },
                  {
                    name: 'Vercel',
                    note: 'For deployment (free tier)',
                    link: 'https://vercel.com',
                  },
                  {
                    name: 'Supabase',
                    note: 'If your app needs a database (free tier)',
                    link: 'https://supabase.com',
                  },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded border border-foreground/15 shrink-0 mt-0.5" />
                    <p className="text-[14px] text-foreground-secondary leading-relaxed">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground font-medium hover:underline underline-offset-2"
                      >
                        {item.name}
                      </a>{' '}
                      &mdash; {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Think about your project */}
            <div>
              <p className="text-[14px] font-medium text-foreground mb-4">
                Think about your project
              </p>
              <div className="space-y-3">
                {[
                  'What do you want to build? A website, app, extension, tool?',
                  'Who is it for? What problem does it solve?',
                  "Don\u2019t overthink it \u2014 we\u2019ll help you scope it in Week 1.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded border border-foreground/15 shrink-0 mt-0.5" />
                    <p className="text-[14px] text-foreground-secondary leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Tool Costs ── */}
        <section className="mt-20">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Tool costs to expect
          </h2>
          <p className="text-[14px] text-foreground-secondary mt-3 mb-8 leading-relaxed">
            Most tools have free tiers. Budget ~$20/month for AI tool access
            during the program.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { name: 'Claude Code', cost: '~$20/mo' },
              { name: 'Cursor', cost: 'Free tier' },
              { name: 'Vercel', cost: 'Free tier' },
              { name: 'Supabase', cost: 'Free tier' },
            ].map((t) => (
              <div key={t.name}>
                <p className="text-[14px] font-medium text-foreground">
                  {t.name}
                </p>
                <p className="text-[13px] text-foreground-tertiary mt-0.5">
                  {t.cost}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Closing ── */}
        <section className="mt-20 pt-12 border-t border-foreground/[0.06]">
          <p className="text-[17px] text-foreground-secondary leading-relaxed">
            That&rsquo;s it. Get your tools installed, think about what you want
            to build, and we&rsquo;ll see you on{' '}
            <span className="text-foreground font-semibold">March 2nd</span>.
          </p>
          <Link
            href="/"
            className="inline-block mt-8 text-[13px] font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            &larr; Back to homepage
          </Link>
        </section>
      </div>
    </div>
  )
}
