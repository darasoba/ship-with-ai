import { RECORDINGS } from '@/lib/constants'

export const metadata = {
  title: 'Session Recordings — Ship With AI',
}

export default function RecordingsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Session Recordings</h1>
        <p className="text-muted mt-1">Recordings from all live cohort sessions.</p>
      </div>

      {RECORDINGS.length === 0 ? (
        <p className="text-muted text-sm">No recordings yet — check back after the first session.</p>
      ) : (
        <div className="space-y-3">
          {RECORDINGS.map((rec, i) => (
            <a
              key={i}
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-border bg-surface hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <svg className="w-4 h-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-sm text-foreground truncate">{rec.title}</span>
              </div>
              <span className="text-xs text-muted shrink-0">{new Date(rec.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
