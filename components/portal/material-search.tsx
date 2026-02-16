'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import type { SearchIndexItem } from '@/lib/materials'
import { CATEGORY_LABELS, type MaterialCategory } from '@/lib/constants'

interface MaterialSearchProps {
  searchIndex: SearchIndexItem[]
}

export function MaterialSearch({ searchIndex }: MaterialSearchProps) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'description', weight: 2 },
          { name: 'headings', weight: 1 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [searchIndex]
  )

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).map((r) => r.item)
  }, [query, fuse])

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search materials..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-md"
      />

      {query.trim() && (
        <div>
          {results.length === 0 ? (
            <p className="text-sm text-muted">No results found for &ldquo;{query}&rdquo;</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <Link key={item.slug} href={`/materials/${item.slug}`}>
                  <Card hover className="h-full">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {CATEGORY_LABELS[item.category as MaterialCategory]}
                    </span>
                    <h3 className="text-foreground font-semibold mt-2">{item.title}</h3>
                    <p className="text-sm text-muted mt-1 line-clamp-2">{item.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
