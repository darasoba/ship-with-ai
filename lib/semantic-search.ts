export interface SearchChunk {
  id: string
  slug: string
  materialTitle: string
  category: string
  heading: string
  headingId: string
  snippet: string
  embedding: number[]
}

interface SearchIndex {
  version: number
  model: string
  dimensions: number
  chunks: SearchChunk[]
}

export interface SearchResult {
  chunk: SearchChunk
  score: number
  href: string
}

let cachedIndex: SearchIndex | null = null
let embedderPromise: Promise<EmbedderFn> | null = null

type EmbedderFn = (text: string) => Promise<number[]>

export async function loadSearchIndex(): Promise<SearchIndex> {
  if (cachedIndex) return cachedIndex
  const res = await fetch('/search-index.json')
  if (!res.ok) throw new Error('Failed to load search index')
  cachedIndex = await res.json()
  return cachedIndex!
}

export async function getEmbedder(): Promise<EmbedderFn> {
  if (embedderPromise) return embedderPromise

  embedderPromise = (async () => {
    const { pipeline } = await import('@huggingface/transformers')
    const extractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2',
      { dtype: 'fp32' }
    )

    return async (text: string): Promise<number[]> => {
      const result = await extractor(text, {
        pooling: 'mean',
        normalize: true,
      })
      return Array.from(result.data as Float32Array)
    }
  })()

  return embedderPromise
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

export async function semanticSearch(
  query: string,
  options: { limit?: number; threshold?: number } = {}
): Promise<SearchResult[]> {
  const { limit = 8, threshold = 0.25 } = options

  const [index, embed] = await Promise.all([loadSearchIndex(), getEmbedder()])
  const queryEmbedding = await embed(query)

  const scored = index.chunks
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
      href: `/materials/${chunk.slug}#${chunk.headingId}`,
    }))
    .filter((r) => r.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return scored
}
