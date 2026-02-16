import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'
import { MATERIALS_ORDER } from './constants'

const contentDirectory = path.join(process.cwd(), 'content')

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface Material {
  slug: string
  title: string
  description: string
  category: 'core' | 'build' | 'ship'
  content: string
  html: string
  toc: TocItem[]
  wordCount: number
  readingTime: number
}

export interface MaterialMeta {
  slug: string
  title: string
  description: string
  category: 'core' | 'build' | 'ship'
  wordCount: number
  readingTime: number
}

function extractToc(html: string): TocItem[] {
  const toc: TocItem[] = []
  const headingRegex = /<h([2-3])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-3]>/g
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const id = match[2]
    // Strip HTML tags from heading text
    const text = match[3].replace(/<[^>]*>/g, '')
    toc.push({ id, text, level })
  }

  return toc
}

async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'wrap',
      properties: {
        className: ['heading-link'],
      },
    })
    .use(rehypePrismPlus, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return result.toString()
}

export async function getMaterial(slug: string): Promise<Material | null> {
  const materialInfo = MATERIALS_ORDER.find((m) => m.slug === slug)
  if (!materialInfo) return null

  const filePath = path.join(contentDirectory, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const html = await renderMarkdown(content)
  const toc = extractToc(html)
  const wordCount = content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return {
    slug,
    title: (data.title as string) || materialInfo.title,
    description: (data.description as string) || materialInfo.description,
    category: materialInfo.category,
    content,
    html,
    toc,
    wordCount,
    readingTime,
  }
}

export async function getAllMaterials(): Promise<Material[]> {
  const materials: Material[] = []

  for (const info of MATERIALS_ORDER) {
    const material = await getMaterial(info.slug)
    if (material) {
      materials.push(material)
    }
  }

  return materials
}

export function getAllMaterialsMeta(): MaterialMeta[] {
  return MATERIALS_ORDER.map((info) => {
    const filePath = path.join(contentDirectory, `${info.slug}.md`)
    let wordCount = 0
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      const { content: body } = matter(content)
      wordCount = body.split(/\s+/).length
    }

    return {
      slug: info.slug,
      title: info.title,
      description: info.description,
      category: info.category,
      wordCount,
      readingTime: Math.ceil(wordCount / 200),
    }
  })
}

export function getAdjacentMaterials(slug: string) {
  const index = MATERIALS_ORDER.findIndex((m) => m.slug === slug)
  return {
    previous: index > 0 ? MATERIALS_ORDER[index - 1] : null,
    next: index < MATERIALS_ORDER.length - 1 ? MATERIALS_ORDER[index + 1] : null,
  }
}

export interface SearchIndexItem {
  slug: string
  title: string
  description: string
  category: string
  headings: string[]
}

export function buildSearchIndex(): SearchIndexItem[] {
  return MATERIALS_ORDER.map((info) => {
    const filePath = path.join(contentDirectory, `${info.slug}.md`)
    let headings: string[] = []

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      const headingRegex = /^#{1,3}\s+(.+)$/gm
      let match
      while ((match = headingRegex.exec(content)) !== null) {
        headings.push(match[1])
      }
    }

    return {
      slug: info.slug,
      title: info.title,
      description: info.description,
      category: info.category,
      headings,
    }
  })
}
