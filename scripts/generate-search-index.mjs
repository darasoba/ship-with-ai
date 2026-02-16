import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pipeline } from '@huggingface/transformers'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')
const OUTPUT = path.join(ROOT, 'public', 'search-index.json')

const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2'
const MIN_CHUNK_CHARS = 50
const MAX_EMBED_CHARS = 2000
const SNIPPET_LENGTH = 200

const MATERIALS_ORDER = [
  { slug: 'curriculum', title: 'Curriculum', category: 'core' },
  { slug: 'tool-reference', title: 'Tool Reference', category: 'core' },
  { slug: 'prompting-playbook', title: 'Prompting Playbook', category: 'core' },
  { slug: 'setup-and-deploy', title: 'Setup & Deploy', category: 'build' },
  { slug: 'git-basics', title: 'Git Basics', category: 'build' },
  { slug: 'project-templates', title: 'Project Templates', category: 'build' },
  { slug: 'advanced-ai-workflows', title: 'Advanced AI Workflows', category: 'build' },
  { slug: 'troubleshooting', title: 'Troubleshooting', category: 'ship' },
  { slug: 'quick-wins', title: 'Quick Wins', category: 'ship' },
  { slug: 'student-handbook', title: 'Student Handbook', category: 'ship' },
]

/** Strip markdown syntax to plain text */
function stripMarkdown(md) {
  return md
    // Remove code blocks (fenced)
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove headings markers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    // Remove strikethrough
    .replace(/~~([^~]+)~~/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Remove table pipes
    .replace(/\|/g, ' ')
    // Remove list markers
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    // Collapse whitespace
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

/** Split markdown by H2 headings, skipping those inside code fences */
function splitByH2(markdownBody) {
  const lines = markdownBody.split('\n')
  const chunks = []
  let currentHeading = null
  let currentLines = []
  let inCodeFence = false

  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeFence = !inCodeFence
      currentLines.push(line)
      continue
    }

    if (!inCodeFence && line.startsWith('## ')) {
      // Save previous chunk
      if (currentLines.length > 0) {
        chunks.push({
          heading: currentHeading,
          content: currentLines.join('\n'),
        })
      }
      currentHeading = line.replace(/^##\s+/, '').trim()
      currentLines = [line]
    } else {
      currentLines.push(line)
    }
  }

  // Don't forget the last chunk
  if (currentLines.length > 0) {
    chunks.push({
      heading: currentHeading,
      content: currentLines.join('\n'),
    })
  }

  return chunks
}

async function main() {
  console.log('Loading embedding model...')
  const embedder = await pipeline('feature-extraction', MODEL_NAME, {
    dtype: 'fp32',
  })
  console.log('Model loaded.')

  const allChunks = []

  for (const mat of MATERIALS_ORDER) {
    const filePath = path.join(CONTENT_DIR, `${mat.slug}.md`)
    if (!fs.existsSync(filePath)) {
      console.warn(`  Skipping ${mat.slug}: file not found`)
      continue
    }

    const raw = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(raw)

    const slugger = new GithubSlugger()
    const sections = splitByH2(content)

    for (const section of sections) {
      const heading = section.heading || 'Introduction'
      const headingId = slugger.slug(heading)
      const plainText = stripMarkdown(section.content)

      if (plainText.length < MIN_CHUNK_CHARS) {
        continue
      }

      const textForEmbed = plainText.slice(0, MAX_EMBED_CHARS)

      allChunks.push({
        id: `${mat.slug}#${headingId}`,
        slug: mat.slug,
        materialTitle: mat.title,
        category: mat.category,
        heading,
        headingId,
        snippet: plainText.slice(0, SNIPPET_LENGTH),
        textForEmbed,
      })
    }

    console.log(`  ${mat.slug}: ${sections.length} sections`)
  }

  console.log(`\nTotal chunks to embed: ${allChunks.length}`)
  console.log('Generating embeddings...')

  const BATCH_SIZE = 16
  const chunksWithEmbeddings = []

  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE)
    const texts = batch.map((c) => c.textForEmbed)

    const results = await embedder(texts, { pooling: 'mean', normalize: true })

    for (let j = 0; j < batch.length; j++) {
      const embedding = Array.from(results[j].data)
      const { textForEmbed, ...rest } = batch[j]
      chunksWithEmbeddings.push({
        ...rest,
        embedding,
      })
    }

    const done = Math.min(i + BATCH_SIZE, allChunks.length)
    process.stdout.write(`  ${done}/${allChunks.length} chunks embedded\r`)
  }

  console.log('\n')

  const index = {
    version: 1,
    model: MODEL_NAME,
    dimensions: 384,
    chunks: chunksWithEmbeddings,
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(index))
  const sizeKB = Math.round(fs.statSync(OUTPUT).size / 1024)
  console.log(`Written ${OUTPUT}`)
  console.log(`  ${chunksWithEmbeddings.length} chunks, ${sizeKB}KB`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
