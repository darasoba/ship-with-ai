import Link from 'next/link'
import { FolderCard } from '@/components/ui/folder-card'
import { getAllMaterialsMeta, buildSearchIndex } from '@/lib/materials'
import { CATEGORY_LABELS, type MaterialCategory } from '@/lib/constants'
import { MaterialSearch } from '@/components/portal/material-search'

export const metadata = {
  title: 'Course Materials — Ship With AI',
}

export default function MaterialsPage() {
  const materials = getAllMaterialsMeta()
  const searchIndex = buildSearchIndex()

  const categories: MaterialCategory[] = ['core', 'build', 'ship']

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Course Materials</h1>
        <p className="text-muted mt-1">
          Everything you need to build and ship your project in 4 weeks.
        </p>
      </div>

      <MaterialSearch searchIndex={searchIndex} />

      {categories.map((category) => {
        const categoryMaterials = materials.filter((m) => m.category === category)
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
      })}
    </div>
  )
}
