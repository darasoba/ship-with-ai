import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMaterial, getAdjacentMaterials } from '@/lib/materials'
import { MATERIALS_ORDER } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { TableOfContents } from '@/components/portal/toc'

export async function generateStaticParams() {
  return MATERIALS_ORDER.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const material = await getMaterial(slug)
  if (!material) return { title: 'Not Found' }
  return { title: `${material.title} — Ship With AI` }
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const material = await getMaterial(slug)

  if (!material) {
    notFound()
  }

  const { previous, next } = getAdjacentMaterials(slug)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link
        href="/materials"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Materials
      </Link>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
        {/* Desktop TOC sidebar — left */}
        <aside className="hidden lg:block">
          <TableOfContents toc={material.toc} />
        </aside>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{material.title}</h1>
          <p className="text-muted mb-8">
            {material.readingTime} min read
          </p>

          {/* Mobile TOC */}
          <div className="lg:hidden">
            <TableOfContents toc={material.toc} />
          </div>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: material.html }}
          />

          {/* Previous/Next navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
            {previous ? (
              <Link href={`/materials/${previous.slug}`}>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {previous.title}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/materials/${next.slug}`}>
                <Button variant="ghost" size="sm">
                  {next.title}
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
