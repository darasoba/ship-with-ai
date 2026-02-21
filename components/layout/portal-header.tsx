'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/ui/logo'

const CARD_FILTERS = ['none', 'hue-rotate(160deg)', 'hue-rotate(270deg)']

function getCardFilter(name: string, plan: string): string {
  if (plan === 'premium') return 'none'
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  return CARD_FILTERS[Math.abs(hash) % CARD_FILTERS.length]
}

interface PortalHeaderProps {
  userName?: string
  plan?: string
  cohortLabel?: string
}

export function PortalHeader({ userName, plan, cohortLabel = '' }: PortalHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [badgeOpen, setBadgeOpen] = useState(false)
  const badgeTimeout = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close menu and badge when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
        setBadgeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const showBadge = () => {
    if (badgeTimeout.current) clearTimeout(badgeTimeout.current)
    setBadgeOpen(true)
  }

  const hideBadge = () => {
    badgeTimeout.current = setTimeout(() => setBadgeOpen(false), 200)
  }

  const fullName = userName || 'Student'

  // Load SVG directly to canvas — bypasses html2canvas and its Tailwind v4 lab() color errors
  const handleDownload = useCallback(async () => {
    try {
      const svgPath = plan === 'premium' ? '/card/card-bg-premium.svg' : '/card/card-bg.svg'

      const img = new Image()
      img.crossOrigin = 'anonymous'
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load card SVG'))
        img.src = svgPath
      })

      const scale = 4
      const W = img.naturalWidth * scale
      const H = img.naturalHeight * scale

      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!

      const cssFilter = getCardFilter(fullName, plan || 'basic')
      if (cssFilter !== 'none') ctx.filter = cssFilter
      ctx.drawImage(img, 0, 0, W, H)
      ctx.filter = 'none'

      const name = (fullName || 'Cohort Member').toUpperCase()
      const cohort = `${cohortLabel}${plan === 'premium' ? ' · Premium' : ''}`

      const textX = W * 0.13
      const textY = W * 0.055 + H * 0.23
      const maxW = W * 0.58

      let nameFontSize = W * 0.055
      ctx.font = `700 ${nameFontSize}px Inter, sans-serif`
      while (ctx.measureText(name.split(' ').sort((a, b) => b.length - a.length)[0] || name).width > maxW && nameFontSize > W * 0.03) {
        nameFontSize -= 1
        ctx.font = `700 ${nameFontSize}px Inter, sans-serif`
      }

      const words = name.split(' ')
      const lines: string[] = []
      let currentLine = ''
      for (const word of words) {
        const test = currentLine ? `${currentLine} ${word}` : word
        if (ctx.measureText(test).width > maxW && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = test
        }
      }
      if (currentLine) lines.push(currentLine)
      const nameLines = lines.slice(0, 2)

      ctx.save()
      ctx.translate(textX, textY)
      ctx.rotate(-1.75 * Math.PI / 180)

      ctx.fillStyle = '#000000'
      ctx.textBaseline = 'top'
      const lineHeight = nameFontSize * 1.2
      nameLines.forEach((line, i) => {
        ctx.font = `700 ${nameFontSize}px Inter, sans-serif`
        ctx.fillText(line, 0, i * lineHeight)
      })

      const cohortY = nameLines.length * lineHeight + nameFontSize * 0.15
      const cohortFontSize = W * 0.03
      ctx.font = `500 ${cohortFontSize}px Inter, sans-serif`
      ctx.fillStyle = 'rgba(0,0,0,0.52)'
      ctx.fillText(cohort, 0, cohortY)

      ctx.restore()

      const link = document.createElement('a')
      link.download = 'ship-with-ai-card.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to download card:', err)
    }
  }, [fullName, plan, cohortLabel])

  const initials = userName
    ? userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  const chipClasses = plan === 'premium'
    ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400'
    : 'bg-muted/10 text-muted border border-border'

  const cohortText = `${cohortLabel}${plan === 'premium' ? ' · Premium' : ''}`

  const badgePopover = (
    <div
      className="absolute top-full mt-4 right-0 z-50 bg-surface border border-border rounded-xl shadow-lg p-3 w-[200px]"
      onMouseEnter={showBadge}
      onMouseLeave={hideBadge}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Card preview */}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: '784 / 931', filter: getCardFilter(fullName, plan || 'basic') }}
      >
        <img
          src={plan === 'premium' ? '/card/card-bg-premium.svg' : '/card/card-bg.svg'}
          alt=""
          className="absolute inset-0 w-full h-full pointer-events-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        {/* Text overlay — covers baked-in SVG sample text on screen */}
        <div
          className="absolute flex flex-col justify-start pointer-events-none"
          style={{ left: '13%', top: '28%', width: '60%', paddingTop: '1.5%', backgroundColor: '#FBF6EE' }}
        >
          <p
            className="font-semibold text-left w-full uppercase line-clamp-2"
            style={{
              fontSize: '0.52rem',
              transform: 'rotate(-1.75deg)',
              lineHeight: 1.2,
              fontFamily: 'Inter, sans-serif',
              color: '#000000',
            }}
          >
            {fullName || 'Cohort Member'}
          </p>
          <p
            className="font-medium text-left w-full"
            style={{
              fontSize: '0.28rem',
              transform: 'rotate(-1.75deg)',
              lineHeight: 1.1,
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(0,0,0,0.52)',
              marginTop: '1.5%',
            }}
          >
            {cohortText}
          </p>
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleDownload() }}
        className="mt-2 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground bg-background hover:bg-surface-raised border border-border rounded-lg transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download card
      </button>
    </div>
  )

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
            <Link href="/videos" className="text-sm text-muted hover:text-foreground transition-colors">
              Videos
            </Link>
          </nav>
        </div>

        {/* Center — Search trigger */}
        <div className="hidden md:flex items-center justify-center flex-1">
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
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Desktop user menu */}
          <div className="relative flex items-center gap-2" ref={menuRef}>
            {/* Plan chip with hover badge — separate from menu button */}
            <span
              className={`relative px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full cursor-default ${chipClasses}`}
              onMouseEnter={showBadge}
              onMouseLeave={hideBadge}
            >
              {plan === 'premium' ? 'Premium' : 'Basic'}
              {badgeOpen && badgePopover}
            </span>

            <button
              onClick={() => { setMenuOpen(!menuOpen); setBadgeOpen(false) }}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-medium">
                {initials}
              </div>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-lg py-1">
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
          <div className="flex items-center gap-2 pb-2 mb-1 border-b border-border">
            <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full ${chipClasses}`}>
              {plan === 'premium' ? 'Premium' : 'Basic'}
            </span>
            <span className="text-xs text-muted">{userName}</span>
          </div>
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
            href="/videos"
            className="block text-sm text-muted hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Videos
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
