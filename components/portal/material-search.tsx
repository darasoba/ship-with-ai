'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Input } from '@/components/ui/input'
import { FolderCard } from '@/components/ui/folder-card'
import type { SearchIndexItem } from '@/lib/materials'
import { CATEGORY_LABELS, type MaterialCategory } from '@/lib/constants'

interface MaterialMeta {
  slug: string
  title: string
  description: string
  category: string
  readingTime: number
}

interface MaterialSearchProps {
  searchIndex: SearchIndexItem[]
  materials: MaterialMeta[]
}

const CATEGORIES: MaterialCategory[] = ['core', 'build', 'ship']

export function MaterialSearch({ searchIndex, materials }: MaterialSearchProps) {
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

  const filteredSlugs = useMemo(() => {
    if (!query.trim()) return null
    return new Set(fuse.search(query).map((r) => r.item.slug))
  }, [query, fuse])

  const displayMaterials = filteredSlugs
    ? materials.filter((m) => filteredSlugs.has(m.slug))
    : materials

  return (
    <div className="space-y-10">
      <Input
        placeholder="Search materials..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-md"
      />

      {query.trim() && displayMaterials.length === 0 ? (
        <p className="text-sm text-muted">No results found for &ldquo;{query}&rdquo;</p>
      ) : (
        CATEGORIES.map((category) => {
          const categoryMaterials = displayMaterials.filter((m) => m.category === category)
          if (categoryMaterials.length === 0) return null

          return (
            <div key={category}>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {CATEGORY_LABELS[category]}
              </h2>
              <div className="grid gap-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {categoryMaterials.map((material) => (
                  <Link key={material.slug} href={`/materials/${material.slug}`}>
                    <FolderCard
                      title={material.title}
                      description={material.description}
                      meta={`${material.readingTime} min read`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
