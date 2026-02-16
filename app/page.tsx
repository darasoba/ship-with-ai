import Image from 'next/image'
import Link from 'next/link'
import { ENROLLMENT_CLOSED } from '@/lib/constants'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FadeIn } from '@/components/landing/fade-in'
import { Card } from '@/components/ui/card'
import { AccordionItem } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { MentorshipAnimation } from '@/components/mentorship-animation'

const projects = [
  {
    type: 'SaaS MVP',
    description:
      'A task management app with AI prioritization. Next.js, Supabase, deployed to Vercel.',
  },
  {
    type: 'Chrome Extension',
    description:
      'An email summarizer for Gmail. From idea to Chrome Web Store in 3 weeks.',
  },
  {
    type: 'Internal Tool',
    description:
      'A client dashboard that replaced 4 spreadsheets. Used by a real team daily.',
  },
  {
    type: 'Mobile App',
    description:
      'A habit tracker with smart reminders. React Native, deployed to TestFlight.',
  },
  {
    type: 'Portfolio Site',
    description:
      "A designer's portfolio with an AI-powered case study generator. Figma to live site.",
  },
  {
    type: 'AI Bot',
    description:
      'A customer support agent trained on company docs. Handling real tickets within 2 weeks.',
  },
]

const weeks = [
  {
    number: '01',
    title: 'Learn the tools, start your project',
    description:
      'Pick your AI coding tool. Write your PRD. Scaffold your project. By Friday, you have a running app on localhost.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Core features, database, real data. Your AI tool does the heavy lifting. You direct, review, and iterate.',
  },
  {
    number: '03',
    title: 'Polish and expand',
    description:
      'Responsive design. Loading states. Error handling. Cut what you won\'t finish. Focus on what matters.',
  },
  {
    number: '04',
    title: 'Ship',
    description:
      'Deploy to a live URL. Record your demo. Present on Demo Day. Your project is on the internet.',
  },
]

const testimonials = [
  {
    quote:
      "I'd been sitting on my app idea for six months. Shipped it in three weeks during the program.",
    name: 'Amara K.',
    role: 'Product Designer',
    company: 'Figma',
    gradient: 'from-pink-400 to-orange-400',
  },
  {
    quote:
      "I'm a PM who can't code. Or couldn't. I built and launched an internal tool my team uses every day.",
    name: 'James R.',
    role: 'Product Manager',
    company: 'Shopify',
    gradient: 'from-blue-400 to-cyan-400',
  },
  {
    quote:
      "The prompting techniques and MCP setup changed everything. I was barely scratching the surface before.",
    name: 'Priya S.',
    role: 'Full-Stack Developer',
    company: 'Vercel',
    gradient: 'from-violet-400 to-indigo-400',
  },
]

const faqs = [
  {
    question: 'Do I need to know how to code?',
    answer:
      "Not necessarily. Designers and product people join every cohort. The AI tools handle most of the coding. If you can describe what you want clearly, you can build it.",
  },
  {
    question: 'How much time do I need per week?',
    answer:
      'Plan for 8 to 10 hours. That includes live sessions (about 2 hours) and your own building time.',
  },
  {
    question: "What if I don't finish in 4 weeks?",
    answer:
      "You keep lifetime access to all materials and the community, so you can keep going. The goal is progress, not perfection.",
  },
  {
    question: 'Is this just a course with videos?',
    answer:
      'No. The core is mentorship, live sessions, and building your own project. Think workshop, not lecture.',
  },
  {
    question: 'Is there a refund policy?',
    answer:
      "Yes. If you're not satisfied after the first week, full refund, no questions.",
  },
]

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* ── Hero (full viewport) ── */}
        <div className="min-h-dvh flex flex-col justify-center">
          {/* ── Mentorship Illustration ── */}
          <div className="relative pt-20 md:pt-28 overflow-hidden">
            <div className="edge-fade max-w-md mx-auto px-6 opacity-60">
              <MentorshipAnimation className="w-full h-auto" />
            </div>
          </div>

          {/* ── Hero Copy ── */}
          <section className="px-6 pt-8 pb-10 md:pt-12 md:pb-16">
            <div className="max-w-[660px] mx-auto text-center">
              <FadeIn>
                <div className="flex items-center justify-center gap-3 mb-10">
                  <Image
                    src="/dara.jpg"
                    alt="Dara Sobaloju"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <p className="text-[15px] text-foreground-secondary">
                    Taught by{' '}
                    <a
                      href="https://x.com/darasoba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground font-medium hover:underline underline-offset-[3px]"
                    >
                      Dara Sobaloju
                    </a>
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={80}>
                <h1 className="text-[40px] leading-[44px] md:text-[48px] md:leading-[52px] font-[650] tracking-tight text-foreground">
                  Go from idea to shipped product in 4&nbsp;weeks.
                </h1>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="mt-8 text-lg md:text-xl text-foreground-secondary leading-relaxed max-w-[520px] mx-auto">
                  A hands-on mentorship where you learn AI coding tools and ship
                  your own project. Not a course. Not a tutorial. You build
                  something real.
                </p>
              </FadeIn>
              <FadeIn delay={350}>
                <div className="mt-12 flex flex-col items-center gap-5">
                  <Link href="/apply">
                    <Button size="lg">Apply now&nbsp;&mdash;&nbsp;$55</Button>
                  </Link>
                  <p className="text-[13px] text-foreground-tertiary">
                    Next cohort starts March 2026. Limited to 50 spots.
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>
        </div>

        {/* ── Enrollment Status (only when closed) ── */}
        {ENROLLMENT_CLOSED && (
          <section className="px-6 mt-20 md:mt-32">
            <div className="max-w-[580px] mx-auto">
              <FadeIn>
                <h2 className="text-[28px] leading-[34px] md:text-[32px] md:leading-[38px] font-[600] tracking-tight text-foreground">
                  Enrollment is closed
                </h2>
                <p className="mt-6 text-[17px] leading-[28px] text-foreground-secondary">
                  <span className="text-foreground font-semibold">20 designers, developers, and product people</span>{' '}
                  shipped real projects in our last cohort. The next enrollment opens on{' '}
                  <span className="text-foreground font-semibold">March 15<sup>th</sup></span>, for 7 days.
                </p>
                <p className="mt-5 text-[17px] leading-[28px] text-foreground-secondary">
                  Join the waitlist to get <span className="text-foreground font-semibold">early access</span> and
                  behind-the-scenes updates. No spam, no nonsense.
                </p>
                <form className="mt-8 flex gap-2" action="/api/waitlist" method="POST">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-surface border border-border text-foreground text-[15px] placeholder:text-foreground-tertiary"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-[#F5D76E] text-[#1a1a1a] text-[14px] font-semibold hover:bg-[#f0cf4e] transition-colors whitespace-nowrap"
                  >
                    Notify me
                  </button>
                </form>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ── Problem ── */}
        <section className="px-6 mt-12 md:mt-20">
          <div className="max-w-[580px] mx-auto">
            <FadeIn>
              <h2 className="text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-[600] tracking-tight text-foreground">
                AI tools are powerful. But watching demos isn&apos;t building.
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="mt-8 space-y-5 text-foreground-secondary text-[17px] leading-[28px]">
                <p>
                  You&apos;ve seen the threads. You&apos;ve bookmarked the
                  tutorials. Maybe you&apos;ve played around with Claude Code or
                  Cursor for an afternoon.
                </p>
                <p className="text-foreground font-medium">
                  But you still don&apos;t have a shipped project.
                </p>
                <p>
                  Building a real product requires more than a tool&nbsp;&mdash;
                  it requires a plan, a process, and the discipline to finish.
                  That&apos;s what this program provides.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── What People Build ── */}
        <section className="px-6 mt-24 md:mt-[120px]">
          <div className="max-w-[580px] mx-auto">
            <FadeIn>
              <h2 className="text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-[600] tracking-tight text-foreground">
                Real projects, built during the program.
              </h2>
            </FadeIn>
          </div>
          <div className="max-w-5xl mx-auto mt-12">
            <FadeIn delay={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.map((project) => (
                  <Card key={project.type} hover>
                    <p className="text-[13px] font-medium text-accent tracking-wide">
                      {project.type}
                    </p>
                    <p className="mt-2.5 text-sm text-foreground-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section id="curriculum" className="px-6 mt-24 md:mt-[120px]">
          <div className="max-w-[580px] mx-auto">
            <FadeIn>
              <h2 className="text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-[600] tracking-tight text-foreground">
                4 weeks. One project. Shipped.
              </h2>
            </FadeIn>
            <div className="mt-16 space-y-16">
              {weeks.map((week, i) => (
                <FadeIn key={week.number} delay={i * 80}>
                  <div className="flex gap-8">
                    <div className="flex-shrink-0 pt-1">
                      <span className="text-[13px] font-mono text-foreground-tertiary">
                        W{week.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-foreground tracking-tight">
                        {week.title}
                      </h3>
                      <p className="mt-2 text-[15px] text-foreground-secondary leading-[26px]">
                        {week.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social Proof ── */}
        <section className="px-6 mt-24 md:mt-[120px]">
          <div className="max-w-[580px] mx-auto">
            <FadeIn>
              <h2 className="text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-[600] tracking-tight text-foreground">
                What participants say.
              </h2>
            </FadeIn>
          </div>
          <div className="max-w-5xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {testimonials.map((t, i) => (
                <FadeIn key={t.name} delay={i * 80}>
                  <Card className="h-full flex flex-col justify-between">
                    <p className="text-[15px] text-foreground-secondary leading-[26px]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex-shrink-0`} />
                      <div>
                        <p className="text-[14px] font-medium text-foreground">
                          {t.name}
                        </p>
                        <p className="text-[12px] text-foreground-tertiary">
                          {t.role} at {t.company}
                        </p>
                      </div>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="px-6 mt-24 md:mt-[120px]">
          <div className="max-w-sm mx-auto">
            <FadeIn>
              <Card className="text-center p-8 md:p-10">
                <p className="text-[13px] font-medium text-foreground-tertiary uppercase tracking-widest">
                  One-time payment
                </p>
                <p className="mt-4 text-[56px] font-bold text-foreground tracking-tight leading-none">
                  $55
                </p>
                <p className="mt-2 text-[15px] text-foreground-tertiary">
                  ~&#8358;75,000
                </p>
                <p className="mt-3 text-[15px] text-foreground-secondary">
                  Everything included. No upsells.
                </p>
                <ul className="mt-8 space-y-2.5 text-left max-w-[240px] mx-auto">
                  {[
                    '4 weeks of mentorship',
                    'Live sessions + recordings',
                    '1-on-1 check-ins',
                    'Full curriculum & templates',
                    'Study materials + 1 year of updates',
                    'Private community',
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-[14px] text-foreground-secondary"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-accent flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/apply" className="block mt-8">
                  <Button size="lg" className="w-full">
                    Apply now
                  </Button>
                </Link>
                <p className="mt-4 text-[13px] text-foreground-tertiary">
                  Full refund after Week 1. No questions.
                </p>
              </Card>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="px-6 mt-24 md:mt-[120px]">
          <div className="max-w-[580px] mx-auto">
            <FadeIn>
              <h2 className="text-[28px] leading-[34px] md:text-[36px] md:leading-[42px] font-[600] tracking-tight text-foreground">
                Questions.
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="mt-10">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.question} title={faq.question}>
                    {faq.answer}
                  </AccordionItem>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-6 mt-32 mb-20 md:mt-[120px] md:mb-24">
          <div className="max-w-[580px] mx-auto text-center">
            <FadeIn>
              <h2 className="text-[32px] leading-[38px] md:text-[44px] md:leading-[48px] font-[650] tracking-tight text-foreground">
                You&apos;ve got the idea.{' '}
                <span className="text-foreground-secondary">
                  Now build&nbsp;it.
                </span>
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-5 text-[17px] text-foreground-secondary">
                Apply in 5 minutes. We&apos;ll get back to you within 48 hours.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="mt-8">
                <Link href="/apply">
                  <Button size="lg">Apply now&nbsp;&mdash;&nbsp;$55</Button>
                </Link>
                <p className="mt-4 text-[13px] text-foreground-tertiary">
                  Next cohort starts March 2026.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/90 backdrop-blur-md border-t border-border-subtle md:hidden">
        <Link href="/apply" className="block">
          <Button size="lg" className="w-full">
            Apply now&nbsp;&mdash;&nbsp;$55
          </Button>
        </Link>
      </div>
    </>
  )
}
