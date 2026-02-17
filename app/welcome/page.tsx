'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'

type Status = 'verifying' | 'success' | 'error'

function fireConfetti() {
  const duration = 3000
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  // Big initial burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
  })

  frame()
}

function CallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const triggerConfetti = useCallback(() => {
    fireConfetti()
  }, [])

  useEffect(() => {
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
    <div className="text-center space-y-6 max-w-md">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">You&apos;re in!</h1>
      </div>

      <div className="bg-foreground/[0.03] border border-foreground/10 rounded-xl p-6 space-y-3">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground">Check your email</p>
        <p className="text-sm text-foreground-secondary leading-relaxed">
          We&apos;ve sent a signup link to{email ? <span className="font-medium text-foreground"> {email}</span> : ' your email'}. Click it to create your account and access the course dashboard.
        </p>
        <p className="text-xs text-foreground-secondary/70">
          Don&apos;t see it? Check your spam folder. The link expires in 7 days.
        </p>
      </div>

      <Link href="/">
        <Button variant="secondary" className="mt-2">Back to homepage</Button>
      </Link>
    </div>
  )
}

export default function PaymentCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
