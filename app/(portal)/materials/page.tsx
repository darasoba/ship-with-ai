import { getAllMaterialsMeta, buildSearchIndex } from '@/lib/materials'
import { MaterialSearch } from '@/components/portal/material-search'

export const metadata = {
  title: 'Course Materials — Ship With AI',
}

export default function MaterialsPage() {
  const materials = getAllMaterialsMeta()
  const searchIndex = buildSearchIndex()

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Course Materials</h1>
        <p className="text-muted mt-1">
          Everything you need to build and ship your project in 4 weeks.
        </p>
      </div>

      <MaterialSearch searchIndex={searchIndex} materials={materials} />
    </div>
  )
}
