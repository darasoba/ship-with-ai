'use client'

import { useState, useEffect } from 'react'
import type { TocItem } from '@/lib/materials'

interface TocProps {
  toc: TocItem[]
}

export function TableOfContents({ toc }: TocProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const headings = toc.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[]
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [toc])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  if (toc.length === 0) return null

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Table of Contents
          <svg
            className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <nav className="mt-3 pl-2 border-l border-border space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block text-sm py-1 transition-colors text-left ${
                  item.level === 3 ? 'pl-4' : ''
                } ${
                  activeId === item.id
                    ? 'text-accent font-medium'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {item.text}
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop sidebar */}
      <nav className="toc-scroll hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 border-r border-border space-y-1">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
          On this page
        </p>
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`block text-sm py-1 transition-colors text-left ${
              item.level === 3 ? 'pl-4' : ''
            } ${
              activeId === item.id
                ? 'text-accent font-medium'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </>
  )
}
