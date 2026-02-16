'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

const hasSupabase =
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('http') &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

interface DashboardProgressProps {
  week: number
  milestones: readonly string[]
}

export function DashboardProgress({ week, milestones }: DashboardProgressProps) {
  const [completed, setCompleted] = useState<Record<number, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      if (!hasSupabase) {
        setLoading(false)
        return
      }

      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data } = await supabase
        .from('progress')
        .select('milestone_index, completed')
        .eq('user_id', user.id)
        .eq('week', week)

      if (data) {
        const map: Record<number, boolean> = {}
        data.forEach((row) => {
          map[row.milestone_index] = row.completed
        })
        setCompleted(map)
      }
      setLoading(false)
    }

    fetchProgress()
  }, [week])

  async function toggle(index: number, checked: boolean) {
    setCompleted((prev) => ({ ...prev, [index]: checked }))

    if (!hasSupabase) return

    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase
      .from('progress')
      .upsert(
        {
          user_id: user.id,
          week,
          milestone_index: index,
          completed: checked,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,week,milestone_index' }
      )
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {milestones.map((_, i) => (
          <div key={i} className="h-6 bg-surface rounded animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {milestones.map((milestone, i) => (
        <Checkbox
          key={i}
          checked={!!completed[i]}
          onChange={(checked) => toggle(i, checked)}
          label={milestone}
        />
      ))}
    </div>
  )
}
