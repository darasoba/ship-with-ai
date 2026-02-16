import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-bold text-foreground-tertiary">404</div>
        <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
        <p className="text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md">Go home</Button>
          </Link>
          <Link href="/materials">
            <Button variant="secondary" size="md">Browse materials</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
