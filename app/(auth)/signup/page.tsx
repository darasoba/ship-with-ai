'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Logo } from '@/components/ui/logo'
import { createClient } from '@/lib/supabase/client'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [validating, setValidating] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [tokenId, setTokenId] = useState('')

  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [applicationId, setApplicationId] = useState('')

  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setValidating(false)
        return
      }

      const supabase = createClient()
      const { data, error: queryError } = await supabase
        .from('invite_tokens')
        .select('id, email, application_id')
        .eq('token', token)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (queryError || !data) {
        setTokenValid(false)
      } else {
        setTokenValid(true)
        setInviteEmail(data.email)
        setTokenId(data.id)
        if (data.application_id) setApplicationId(data.application_id)
      }

      setValidating(false)
    }

    validateToken()
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email: inviteEmail,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Sync plan from application to profile via server-side route (bypasses RLS)
    if (applicationId) {
      await fetch('/api/auth/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, applicationId }),
      })
    }

    await supabase
      .from('invite_tokens')
      .update({ used: true })
      .eq('id', tokenId)

    router.push('/dashboard')
  }

  if (validating) {
    return <p className="text-muted text-sm">Validating invite...</p>
  }

  if (!token || !tokenValid) {
    return (
      <div className="w-full max-w-sm text-center space-y-4">
        <div className="flex justify-center">
          <Link href="/"><Logo className="h-8 w-auto" /></Link>
        </div>
        <p className="text-red-500 text-sm">
          Invalid or expired invite link.
        </p>
        <p className="text-muted text-sm">
          Need access?{' '}
          <Link href="/apply" className="text-accent hover:underline">
            Apply here
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Link href="/"><Logo className="h-8 w-auto" /></Link>
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome aboard
        </h1>
        <p className="text-muted text-sm">
          You&apos;re in. Create your account to access the curriculum and community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="fullName"
          label="Full name"
          type="text"
          placeholder="Jane Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />

        <Input
          id="email"
          label="Email"
          type="email"
          value={inviteEmail}
          readOnly
          className="opacity-60 cursor-not-allowed"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Min 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-muted text-sm">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  )
}
