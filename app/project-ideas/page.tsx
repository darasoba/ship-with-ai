import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '25 Project Ideas — Ship With AI',
  description: 'Project ideas you can build in 4 weeks using AI coding tools.',
}

const ideas = [
  { title: 'SaaS App', description: 'A project management tool with workspaces, kanban boards, and Stripe subscriptions.' },
  { title: 'Portfolio Site', description: 'A personal portfolio with project showcase, blog, contact form, and dark mode.' },
  { title: 'Chrome Extension', description: 'A productivity tool that blocks distracting websites during focus sessions.' },
  { title: 'Figma Plugin', description: 'A design token manager to define, organize, and export tokens from Figma.' },
  { title: 'Mobile App', description: 'A habit tracker with daily completions, streaks, and statistics.' },
  { title: 'API Service', description: 'A URL shortener with analytics, click tracking, and geographic data.' },
  { title: 'E-Commerce Store', description: 'An online store with product listings, cart, Stripe checkout, and order management.' },
  { title: 'Analytics Dashboard', description: 'A SaaS dashboard with key metrics, charts, user activity, and reports.' },
  { title: 'Blog / CMS', description: 'A blogging platform with rich text editor, categories, tags, and public pages.' },
  { title: 'Real-Time Chat App', description: 'A messaging app with rooms, DMs, typing indicators, and online presence.' },
  { title: 'AI Writing Assistant', description: 'A tool that helps users draft emails, blog posts, and social media content with AI.' },
  { title: 'Invoice Generator', description: 'Create, send, and track invoices with PDF export and payment reminders.' },
  { title: 'Booking System', description: 'An appointment scheduler with calendar view, email confirmations, and availability management.' },
  { title: 'Recipe App', description: 'Save, organize, and share recipes with ingredient scaling and meal planning.' },
  { title: 'Job Board', description: 'A niche job board with company profiles, applicant tracking, and email alerts.' },
  { title: 'Expense Tracker', description: 'Track personal or business expenses with categories, charts, and CSV export.' },
  { title: 'Link-in-Bio Tool', description: 'A customizable landing page for social media links with analytics.' },
  { title: 'Survey Builder', description: 'Create forms and surveys with multiple question types and response analytics.' },
  { title: 'Fitness Tracker', description: 'Log workouts, track progress over time, and visualize gains with charts.' },
  { title: 'Event Landing Page', description: 'A page for events with RSVP, countdown timer, speaker bios, and schedule.' },
  { title: 'Flashcard App', description: 'Spaced repetition flashcards for learning anything, with progress tracking.' },
  { title: 'Social Proof Widget', description: 'An embeddable widget showing recent purchases or signups on any website.' },
  { title: 'Changelog Page', description: 'A public changelog for your product with email notifications for updates.' },
  { title: 'Customer Feedback Tool', description: 'Collect and organize user feedback with voting, tags, and status updates.' },
  { title: 'Personal Finance Dashboard', description: 'Visualize spending, savings goals, and net worth from connected accounts.' },
]

export default function ProjectIdeasPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <Logo className="h-8 w-auto" />
          </Link>
          <h1 className="text-[28px] md:text-[32px] font-[600] tracking-tight text-foreground">
            25 project ideas
          </h1>
          <p className="mt-3 text-[15px] text-foreground-secondary max-w-md mx-auto">
            Pick one and build it in 4 weeks with AI coding tools and hands-on mentorship.
          </p>
        </div>

        <div className="space-y-3">
          {ideas.map((idea, i) => (
            <Card key={idea.title} className="p-4 sm:p-5">
              <div className="flex gap-3">
                <span className="text-xs font-medium text-foreground-tertiary mt-0.5 shrink-0 w-5 text-right">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{idea.title}</p>
                  <p className="text-sm text-foreground-secondary mt-0.5">{idea.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-sm text-foreground-secondary">
            Have your own idea? Even better.
          </p>
          <Link href="/apply">
            <Button>Apply to join</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
