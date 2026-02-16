'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Status = 'verifying' | 'success' | 'error'

function CallbackContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<Status>('verifying')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const reference = searchParams.get('reference') || searchParams.get('trxref')
    if (!reference) {
      setStatus('error')
      setErrorMessage('No payment reference found.')
      return
    }

    async function verify(ref: string) {
      try {
        const res = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference: ref }),
        })

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

    verify(reference)
  }, [searchParams])

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
    <div className="text-center space-y-4 max-w-sm">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-foreground">Payment confirmed!</h1>
      <p className="text-sm text-foreground-secondary leading-relaxed">
        Check your email{email ? ` at ${email}` : ''} for your signup link to create your account.
      </p>
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
