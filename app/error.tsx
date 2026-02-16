'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-4xl font-bold text-foreground-tertiary">Oops</div>
        <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
        <p className="text-muted">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="md" onClick={reset}>
            Try again
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => (window.location.href = '/')}
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
