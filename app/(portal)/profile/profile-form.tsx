'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ProfileFormProps {
  userId: string
  initialName: string
  email: string
  cohort: number
  initialProject: string
}

export function ProfileForm({ userId, initialName, email, cohort, initialProject }: ProfileFormProps) {
  const [name, setName] = useState(initialName)
  const [project, setProject] = useState(initialProject)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError('')

    const supabase = createClient()
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        full_name: name,
        project: project,
      })
      .eq('id', userId)

    setSaving(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setSaved(true)
    router.refresh()
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <Input
        id="name"
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        id="email"
        label="Email"
        value={email}
        disabled
        className="opacity-60"
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-foreground">Cohort</label>
        <p className="text-sm text-muted">Cohort {cohort}</p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="project" className="block text-sm font-medium text-foreground">
          Project Description
        </label>
        <textarea
          id="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          rows={4}
          placeholder="What are you building?"
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-foreground placeholder:text-muted text-sm transition-colors resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
        {saved && <span className="text-sm text-green-500">Saved</span>}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </form>
  )
}
