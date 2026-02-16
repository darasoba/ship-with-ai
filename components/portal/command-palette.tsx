'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { semanticSearch, getEmbedder, loadSearchIndex, type SearchResult } from '@/lib/semantic-search'
import { CATEGORY_LABELS, type MaterialCategory } from '@/lib/constants'

type Status = 'idle' | 'loading-model' | 'searching' | 'ready'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const router = useRouter()

  // Global keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Listen for custom event from header button
  useEffect(() => {
    function handleOpen() {
      setOpen(true)
    }
    window.addEventListener('open-command-palette', handleOpen)
    return () => window.removeEventListener('open-command-palette', handleOpen)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      // Preload the index in background
      loadSearchIndex().catch(() => {})
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setResults([])
      setActiveIndex(0)
      setStatus('idle')
    }
  }, [open])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const active = listRef.current.children[activeIndex] as HTMLElement
    if (active) {
      active.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      setStatus('idle')
      return
    }

    // Check if model is already loaded
    try {
      setStatus('loading-model')
      await getEmbedder()
    } catch {
      setStatus('idle')
      return
    }

    setStatus('searching')
    try {
      const res = await semanticSearch(q, { limit: 8 })
      setResults(res)
      setActiveIndex(0)
    } catch {
      setResults([])
    }
    setStatus('ready')
  }, [])

  // Debounced search
  useEffect(() => {
    if (!open) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(query), 300)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, open, search])

  function navigate(href: string) {
    setOpen(false)
    router.push(href)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault()
      navigate(results[activeIndex].href)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="relative w-full max-w-xl mx-4 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <svg
            className="w-5 h-5 text-muted shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search course materials..."
            className="flex-1 py-4 bg-transparent text-foreground placeholder:text-muted text-sm outline-none"
            style={{ border: 'none', boxShadow: 'none' }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-muted hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto">
          {status === 'loading-model' && query.trim() && (
            <div className="px-4 py-8 text-center">
              <div className="inline-block w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin mb-3" />
              <p className="text-sm text-muted">Loading search model...</p>
              <p className="text-xs text-foreground-tertiary mt-1">First time only (~23MB)</p>
            </div>
          )}

          {status === 'searching' && (
            <div className="px-4 py-8 text-center">
              <div className="inline-block w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin mb-3" />
              <p className="text-sm text-muted">Searching...</p>
            </div>
          )}

          {status === 'ready' && results.length === 0 && query.trim() && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-muted">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}

          {results.length > 0 &&
            results.map((result, i) => (
              <button
                key={result.chunk.id}
                onClick={() => navigate(result.href)}
                className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                  i === activeIndex
                    ? 'bg-accent-subtle'
                    : 'hover:bg-surface-raised'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate">
                      {result.chunk.heading}
                    </span>
                    <span className="text-[11px] text-accent font-medium uppercase tracking-wider shrink-0">
                      {CATEGORY_LABELS[result.chunk.category as MaterialCategory]}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5 truncate">
                    {result.chunk.materialTitle}
                  </p>
                  <p className="text-xs text-foreground-tertiary mt-1 line-clamp-2">
                    {result.chunk.snippet}
                  </p>
                </div>
                {i === activeIndex && (
                  <span className="shrink-0 mt-1 text-xs text-muted">
                    &crarr;
                  </span>
                )}
              </button>
            ))}
        </div>

        {/* Footer with keyboard hints */}
        <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-[11px] text-foreground-tertiary">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-surface-raised border border-border rounded text-[10px] font-mono">
              &uarr;&darr;
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-surface-raised border border-border rounded text-[10px] font-mono">
              &crarr;
            </kbd>
            open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-surface-raised border border-border rounded text-[10px] font-mono">
              esc
            </kbd>
            close
          </span>
          <span className="ml-auto text-foreground-tertiary">semantic search</span>
        </div>
      </div>
    </div>
  )
}
