'use client'

import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { COHORT_LABEL } from '@/lib/constants'

type Status = 'verifying' | 'success' | 'error'

const CARD_FILTERS = [
  'none',                // Original warm cream
  'hue-rotate(160deg)',  // Cool blue
  'hue-rotate(270deg)',  // Rose / pink
]

function getCardFilter(name: string, plan: string): string {
  if (plan === 'premium') return 'none'
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  return CARD_FILTERS[Math.abs(hash) % CARD_FILTERS.length]
}

function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 60,
    origin: { y: 0.6 },
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    gravity: 1.2,
    ticks: 150,
  })
}

function CallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [plan, setPlan] = useState<string>('basic')
  const [errorMessage, setErrorMessage] = useState('')

  const cardRef = useRef<HTMLDivElement>(null)

  const triggerConfetti = useCallback(() => {
    fireConfetti()
  }, [])

  const handleDownloadCard = useCallback(async () => {
    try {
      const svgPath = plan === 'premium' ? '/card/card-bg-premium.svg' : '/card/card-bg.svg'

      // Load SVG directly into an Image — bypasses html2canvas and its lab() color errors
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

      // Apply CSS filter if needed
      const cssFilter = getCardFilter(fullName, plan)
      if (cssFilter !== 'none') ctx.filter = cssFilter
      ctx.drawImage(img, 0, 0, W, H)
      ctx.filter = 'none'

      // Draw text directly on canvas (matches the overlay position)
      const name = (fullName || 'Cohort Member').toUpperCase()
      const cohort = `${COHORT_LABEL}${plan === 'premium' ? ' · Premium' : ''}`

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
  }, [fullName, plan])

  useEffect(() => {
    // Preview mode for testing — use ?preview=true&variant=0|1|2 to force a color
    if (searchParams.get('preview') === 'true') {
      const v = searchParams.get('variant')
      const names = ['Tolu Ade', 'Dára Sobaloju', 'Jesudamimola Olorunnimomo']
      const name = v != null ? (names[Number(v)] || names[0]) : names[0]
      setStatus('success')
      setFullName(name)
      setEmail('dara@example.com')
      setPlan(searchParams.get('plan') || 'basic')
      return
    }

    const reference = searchParams.get('reference') || searchParams.get('trxref')
    const sessionId = searchParams.get('session_id')

    if (!reference && !sessionId) {
      setStatus('error')
      setErrorMessage('No payment reference found.')
      return
    }

    async function verify() {
      try {
        let res: Response

        if (sessionId) {
          // Stripe flow
          res = await fetch('/api/payment/verify-stripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          })
        } else {
          // Paystack flow
          res = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference }),
          })
        }

        const data = await res.json()

        if (!res.ok) {
          setStatus('error')
          setErrorMessage(data.error || 'Verification failed.')
          return
        }

        setStatus('success')
        setEmail(data.email || '')
        setFullName(data.fullName || '')
        setPlan(data.plan || 'basic')
      } catch {
        setStatus('error')
        setErrorMessage('Network error. Please try again.')
      }
    }

    verify()
  }, [searchParams])

  useEffect(() => {
    if (status === 'success') {
      triggerConfetti()
    }
  }, [status, triggerConfetti])

  if (status === 'verifying') {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto" />
        <h1 className="text-xl font-semibold text-foreground">Verifying payment...</h1>
        <p className="text-sm text-foreground-secondary">This will only take a moment.</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-foreground">Payment verification failed</h1>
        <p className="text-sm text-foreground-secondary">{errorMessage}</p>
        <Link href="/apply">
          <Button variant="secondary" className="mt-2">Try again</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      {/* Centered header */}
      <div className="flex flex-col items-center gap-3 mb-10 md:mb-14">
        <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          You&apos;re in!
        </h1>
      </div>

      {/* Two-column: card left, text right */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-16 items-center max-w-3xl mx-auto">
        {/* Left — illustration (untouched) */}
        <div className="mx-auto w-full max-w-[300px] md:max-w-none">
          <div
            ref={cardRef}
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: '784 / 931', filter: searchParams.get('filter') ?? getCardFilter(fullName, plan) }}
          >
            <img
              src={plan === 'premium' ? '/card/card-bg-premium.svg' : '/card/card-bg.svg'}
              alt=""
              className="absolute inset-0 w-full h-full pointer-events-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            {/* Dynamic name + cohort overlay */}
            <div
              data-text-overlay
              className="absolute flex flex-col justify-start pointer-events-none"
              style={{ left: '13%', top: '25%', width: '60%', paddingTop: '1.5%' }}
            >
              <p
                className="font-semibold text-left w-full uppercase line-clamp-2"
                style={{
                  fontSize: 'clamp(0.75rem, 4vw, 1.4rem)',
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
                  fontSize: 'clamp(0.45rem, 2.2vw, 0.8rem)',
                  transform: 'rotate(-1.75deg)',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(0,0,0,0.52)',
                  marginTop: '1.5%',
                }}
              >
                {COHORT_LABEL}{plan === 'premium' ? ' · Premium' : ''}
              </p>
            </div>
          </div>

          {/* Download — lives under card */}
          <button
            onClick={handleDownloadCard}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-foreground-secondary hover:text-foreground transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download card
          </button>
        </div>

        {/* Right — text directly on bg, no card */}
        <div className="space-y-6 text-left">
          <div>
            <p className="text-[11px] font-semibold text-foreground-tertiary uppercase tracking-[0.15em] mb-2">
              Next step
            </p>
            <h2 className="text-xl font-semibold text-foreground tracking-tight">
              Check your email
            </h2>
            <p className="text-[15px] text-foreground-secondary mt-3 leading-relaxed">
              We sent a signup link to
              {email
                ? <span className="font-medium text-foreground"> {email}</span>
                : ' your email'
              }. Click it to complete your registration.
            </p>
            <p className="text-[13px] text-foreground-tertiary mt-2">
              The link expires in 7 days.
            </p>
          </div>

          <div className="w-8 h-px bg-foreground/10" />

          <p className="text-[13px] text-foreground-tertiary leading-relaxed">
            Share your card on socials and let people know you&apos;re shipping with AI this cohort.
          </p>

          <Link href="/starter-pack">
            <Button variant="secondary" size="sm">View starter pack</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function PaymentCallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <Suspense
        fallback={
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto" />
            <p className="text-sm text-foreground-secondary">Loading...</p>
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </div>
  )
}
