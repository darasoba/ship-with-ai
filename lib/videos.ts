export interface Video {
  id: string
  title: string
  channel: string
  category: VideoCategory
}

export type VideoCategory =
  | 'ai-tools'
  | 'javascript-react'
  | 'nextjs'
  | 'databases'
  | 'styling'
  | 'typescript'
  | 'git'
  | 'building'

export const VIDEO_CATEGORY_LABELS: Record<VideoCategory, string> = {
  'ai-tools': 'AI Tools',
  'javascript-react': 'JavaScript & React',
  'nextjs': 'Next.js',
  'databases': 'Databases & Backend',
  'styling': 'Styling & CSS',
  'typescript': 'TypeScript',
  'git': 'Git & Version Control',
  'building': 'Building & Shipping',
}

export const VIDEO_CATEGORIES: VideoCategory[] = [
  'ai-tools',
  'javascript-react',
  'nextjs',
  'databases',
  'styling',
  'typescript',
  'git',
  'building',
]

export const VIDEOS: Video[] = [
  // AI Tools
  {
    id: 'GepHGs_CZdk',
    title: "Claude Code Beginner's Tutorial: Build a Movie App in 15 Minutes",
    channel: 'Peter Yang',
    category: 'ai-tools',
  },
  {
    id: '0lL94h1z72A',
    title: 'Getting Started with Claude Code with VS Code',
    channel: 'Krish Naik',
    category: 'ai-tools',
  },
  {
    id: 'ocMOZpuAMw4',
    title: 'Cursor Tutorial for Beginners (AI Code Editor)',
    channel: 'Tech With Tim',
    category: 'ai-tools',
  },
  {
    id: '8AWEPx5cHWQ',
    title: 'Cursor Vibe Coding Tutorial — For Complete Beginners',
    channel: 'Tech With Tim',
    category: 'ai-tools',
  },
  {
    id: 'Tw18-4U7mts',
    title: "The \"Vibe Coding\" Mind Virus Explained",
    channel: 'Fireship',
    category: 'ai-tools',
  },
  {
    id: '3jxfk6nH5qk',
    title: 'Why You Suck at Prompt Engineering (and How to Fix It)',
    channel: 'Liam Ottley',
    category: 'ai-tools',
  },

  // JavaScript & React
  {
    id: 'DHjqpvDnNGE',
    title: 'JavaScript in 100 Seconds',
    channel: 'Fireship',
    category: 'javascript-react',
  },
  {
    id: 'Tn6-PIqc4UM',
    title: 'React in 100 Seconds',
    channel: 'Fireship',
    category: 'javascript-react',
  },
  {
    id: 'LDB4uaJ87e0',
    title: 'React Crash Course 2024',
    channel: 'Traversy Media',
    category: 'javascript-react',
  },

  // Next.js
  {
    id: 'Sklc_fQBmcs',
    title: 'Next.js in 100 Seconds // Plus Full Beginner\'s Tutorial',
    channel: 'Fireship',
    category: 'nextjs',
  },
  {
    id: 'Y6KDk5iyrYE',
    title: 'Next.js 13 Crash Course — App Directory, React Server Components & More',
    channel: 'Traversy Media',
    category: 'nextjs',
  },
  {
    id: 'wm5gMKuwSYk',
    title: 'Next.js Full Course 2024 | Build and Deploy a Full Stack App',
    channel: 'JavaScript Mastery',
    category: 'nextjs',
  },

  // Databases & Backend
  {
    id: 'zBZgdTb-dns',
    title: 'Supabase in 100 Seconds',
    channel: 'Fireship',
    category: 'databases',
  },
  {
    id: 'WiwfiVdfRIc',
    title: 'Is Supabase Legit? Firebase Alternative Breakdown',
    channel: 'Fireship',
    category: 'databases',
  },
  {
    id: '7uKQBl9uZ00',
    title: 'Supabase Crash Course',
    channel: 'Traversy Media',
    category: 'databases',
  },
  {
    id: 'dU7GwCOgvNY',
    title: 'Learn Supabase (Firebase Alternative) — Full Tutorial for Beginners',
    channel: 'freeCodeCamp',
    category: 'databases',
  },
  {
    id: '32M1al-Y6Ag',
    title: 'Node.js Crash Course 2024 — From Basics to Building APIs',
    channel: 'Traversy Media',
    category: 'databases',
  },

  // Styling & CSS
  {
    id: 'UB1O30fR-EE',
    title: 'HTML Crash Course For Absolute Beginners',
    channel: 'Traversy Media',
    category: 'styling',
  },
  {
    id: 'yfoY53QXEnI',
    title: 'CSS Crash Course For Absolute Beginners',
    channel: 'Traversy Media',
    category: 'styling',
  },
  {
    id: '0xMQfmVU6oo',
    title: 'CSS Grid Crash Course 2022',
    channel: 'Traversy Media',
    category: 'styling',
  },
  {
    id: 'UBOj6rqRUME',
    title: 'Tailwind CSS Crash Course',
    channel: 'Traversy Media',
    category: 'styling',
  },
  {
    id: 'mr15Xzb1Ook',
    title: 'Tailwind in 100 Seconds',
    channel: 'Fireship',
    category: 'styling',
  },

  // TypeScript
  {
    id: 'zQnBQ4tB3ZA',
    title: 'TypeScript in 100 Seconds',
    channel: 'Fireship',
    category: 'typescript',
  },
  {
    id: 'BCg4U1FzODs',
    title: 'TypeScript Crash Course',
    channel: 'Traversy Media',
    category: 'typescript',
  },
  {
    id: '30LWjhZzg50',
    title: 'Programming in TypeScript — Full Course for Beginners',
    channel: 'freeCodeCamp',
    category: 'typescript',
  },

  // Git & Version Control
  {
    id: '8JJ101D3knE',
    title: 'Git Tutorial for Beginners: Learn Git in 1 Hour',
    channel: 'Programming with Mosh',
    category: 'git',
  },
  {
    id: 'tRZGeaHPoaw',
    title: 'Git and GitHub for Beginners Tutorial',
    channel: 'Kevin Stratvert',
    category: 'git',
  },
  {
    id: 'RGOj5yH7evk',
    title: 'Git and GitHub for Beginners — Crash Course',
    channel: 'freeCodeCamp',
    category: 'git',
  },

  // Building & Shipping
  {
    id: 'XUkNR-JfHwo',
    title: 'SaaS App Full Course — Launch Your SaaS in Under 7 Days with Next.js & Supabase',
    channel: 'JavaScript Mastery',
    category: 'building',
  },
  {
    id: 'oFtjKbXKqbg',
    title: 'Pieter Levels: Programming, Viral AI Startups, and Digital Nomad Life',
    channel: 'Lex Fridman Podcast',
    category: 'building',
  },
]

export function getVideoThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export function getVideoUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}
