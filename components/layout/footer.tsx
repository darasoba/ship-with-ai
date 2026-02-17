import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link href="/"><Logo className="h-7 w-auto" /></Link>
            <p className="text-sm text-muted mt-2">
              Build and ship your project in 4 weeks.
            </p>
            <p className="text-sm text-muted mt-4">&copy; 2026 Ship With AI</p>
          </div>
          <nav className="flex flex-col gap-3">
            <Link href="/apply" className="text-sm text-muted hover:text-foreground transition-colors">
              Apply
            </Link>
            <Link href="/login" className="text-sm text-muted hover:text-foreground transition-colors">
              Login
            </Link>
            <a href="#faq" className="text-sm text-muted hover:text-foreground transition-colors">
              FAQ
            </a>
            <a
              href="https://x.com/darasoba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              @darasoba
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
