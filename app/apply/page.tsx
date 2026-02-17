'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'

const ROLE_OPTIONS = [
  'Designer',
  'Developer',
  'Product Manager',
  'Founder',
  'Student',
  'Other',
]

const HEAR_ABOUT_OPTIONS = [
  'Twitter/X',
  'LinkedIn',
  'Friend or colleague',
  'Google search',
  'Other',
]

type FormData = {
  fullName: string
  email: string
  role: string
  projectIdea: string
  hearAbout: string
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  role: '',
  projectIdea: '',
  hearAbout: '',
}

type Errors = Partial<Record<keyof FormData, string>>

function validate(data: FormData): Errors {
  const errors: Errors = {}
  if (!data.fullName.trim()) errors.fullName = 'Name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email'
  if (!data.role) errors.role = 'Please select your role'
  if (!data.projectIdea.trim()) errors.projectIdea = 'Tell us what you want to build'
  return errors
}

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formErrors = validate(form)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
        return
      }

      // Redirect to payment checkout
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <Logo className="h-8 w-auto" />
          </Link>
          <h1 className="text-[28px] md:text-[32px] font-[600] tracking-tight text-foreground">
            Apply to join
          </h1>
          <p className="mt-2 text-[15px] text-foreground-secondary">
            Takes less than 2 minutes.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="fullName"
              label="Name"
              required
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              error={errors.fullName}
              placeholder="Your full name"
            />

            <Input
              id="email"
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                What do you do? <span className="text-red-500 ml-0.5">*</span>
              </label>
              <select
                value={form.role}
                onChange={(e) => update('role', e.target.value)}
                className={`w-full px-4 py-2.5 bg-surface border rounded-xl text-foreground text-sm transition-colors appearance-none ${
                  errors.role ? 'border-red-500' : 'border-border'
                } ${!form.role ? 'text-foreground-tertiary' : ''}`}
              >
                <option value="">Select your role</option>
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-baseline justify-between text-sm font-medium text-foreground">
                <span>What do you want to build? <span className="text-red-500 ml-0.5">*</span></span>
                <Link href="/project-ideas" target="_blank" className="text-[13px] font-normal text-accent hover:underline underline-offset-[3px]">
                  25 project ideas
                </Link>
              </label>
              <textarea
                value={form.projectIdea}
                onChange={(e) => update('projectIdea', e.target.value)}
                placeholder="A quick description of your project idea..."
                rows={3}
                className={`w-full px-4 py-2.5 bg-surface border rounded-xl text-foreground placeholder:text-foreground-tertiary text-sm transition-colors resize-none ${
                  errors.projectIdea ? 'border-red-500' : 'border-border'
                }`}
              />
              {errors.projectIdea && <p className="text-sm text-red-500">{errors.projectIdea}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                How did you hear about us?
              </label>
              <select
                value={form.hearAbout}
                onChange={(e) => update('hearAbout', e.target.value)}
                className={`w-full px-4 py-2.5 bg-surface border border-border rounded-xl text-foreground text-sm transition-colors appearance-none ${
                  !form.hearAbout ? 'text-foreground-tertiary' : ''
                }`}
              >
                <option value="">Select an option</option>
                {HEAR_ABOUT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {submitError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-500">{submitError}</p>
              </div>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Redirecting to payment...' : 'Proceed to Pay'}
            </Button>
          </form>
        </Card>

        <p className="text-center text-[12px] text-foreground-tertiary mt-6">
          You&apos;ll be redirected to complete payment securely.
        </p>
      </div>
    </div>
  )
}
