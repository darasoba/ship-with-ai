'use client'

import { MentorshipAnimation } from '@/components/mentorship-animation'

export default function AnimationDemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-foreground text-center mb-8">
          Mentorship Animation Preview
        </h1>
        <div className="border border-border rounded-2xl p-8 bg-surface">
          <MentorshipAnimation className="w-full h-auto" />
        </div>
      </div>
    </div>
  )
}
