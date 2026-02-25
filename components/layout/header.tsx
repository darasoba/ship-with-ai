'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ENROLLMENT_CLOSED } from '@/lib/constants'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-3 sm:mx-6 sm:mt-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-foreground"
            >
              <Logo className="h-6" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              <button
                onClick={() => scrollTo('curriculum')}
                className="text-[13px] text-foreground-tertiary hover:text-foreground transition-colors"
              >
                Curriculum
              </button>
              <button
                onClick={() => scrollTo('pricing')}
                className="text-[13px] text-foreground-tertiary hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="text-[13px] text-foreground-tertiary hover:text-foreground transition-colors"
              >
                FAQ
              </button>
              {ENROLLMENT_CLOSED ? (
                <Link href="/login">
                  <Button size="sm">Login</Button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[13px] text-foreground-tertiary hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                  <Link href="/apply">
                    <Button size="sm">Apply</Button>
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-foreground-tertiary hover:text-foreground transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20 px-6 md:hidden">
          <nav className="flex flex-col gap-8">
            <button
              onClick={() => scrollTo('curriculum')}
              className="text-lg text-foreground-secondary hover:text-foreground text-left transition-colors"
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="text-lg text-foreground-secondary hover:text-foreground text-left transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="text-lg text-foreground-secondary hover:text-foreground text-left transition-colors"
            >
              FAQ
            </button>
            {ENROLLMENT_CLOSED ? (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button size="lg" className="w-full">Login</Button>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-lg text-foreground-secondary hover:text-foreground transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link href="/apply" onClick={() => setMobileOpen(false)}>
                  <Button size="lg" className="w-full">Apply</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  )
}
