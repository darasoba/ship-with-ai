'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/ui/logo'

interface PortalHeaderProps {
  userName?: string
  plan?: string
}

export function PortalHeader({ userName, plan }: PortalHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="text-foreground">
            <Logo className="h-6" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/materials" className="text-sm text-muted hover:text-foreground transition-colors">
              Materials
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Search trigger */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted hover:text-foreground bg-surface border border-border rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
            <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-surface-raised border border-border rounded">
              &#8984;K
            </kbd>
          </button>

          {/* Desktop user menu */}
          <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-medium">
              {initials}
            </div>
            <span>{userName || 'Student'}</span>
            {plan === 'premium' && (
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 rounded-full">
                Premium
              </span>
            )}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-lg py-1">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-background transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-muted hover:text-foreground hover:bg-background transition-colors"
              >
                Log out
              </button>
            </div>
          )}
        </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {plan === 'premium' && (
            <div className="flex items-center gap-2 pb-2 mb-1 border-b border-border">
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 rounded-full">
                Premium
              </span>
              <span className="text-xs text-muted">{userName}</span>
            </div>
          )}
          <button
            onClick={() => {
              setMobileOpen(false)
              window.dispatchEvent(new CustomEvent('open-command-palette'))
            }}
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search materials
          </button>
          <Link
            href="/dashboard"
            className="block text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/materials"
            className="block text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Materials
          </Link>
          <Link
            href="/profile"
            className="block text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="block text-sm text-muted hover:text-foreground"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  )
}
