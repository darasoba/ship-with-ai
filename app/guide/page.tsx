import Link from 'next/link'
import { renderContentFile } from '@/lib/materials'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { TableOfContents } from '@/components/portal/toc'

export const metadata = {
  title: 'The Ship With AI Starter Kit — Free Guide',
  description:
    'Build your first project with AI in a weekend. A free step-by-step guide covering Claude Code, Cursor, Codex, and the 10 prompting principles that make AI coding work.',
}

const hasSupabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http') &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default async function GuidePage() {
  const { html, toc } = await renderContentFile('free-guide.md')

  let isLoggedIn = false
  if (hasSupabase) {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    isLoggedIn = !!user
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
          {/* Desktop TOC sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents toc={toc} />
          </aside>

          <div>
            {/* Mobile TOC */}
            <div className="lg:hidden mb-10">
              <TableOfContents toc={toc} />
            </div>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* CTA */}
            <div className="mt-16 pt-10 border-t border-border text-center">
              <p className="text-lg font-semibold text-foreground mb-2">
                Ready to go deeper?
              </p>
              <p className="text-sm text-foreground-secondary mb-6 max-w-md mx-auto">
                The Ship With AI mentorship takes you from idea to shipped product in 4 weeks with live sessions, code reviews, and a community of builders.
              </p>
              <Link href="/apply?plan=basic">
                <Button size="lg">Apply now</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
