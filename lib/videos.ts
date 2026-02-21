export interface Video {
  id: string
  title: string
  channel: string
  category: VideoCategory
}

export type VideoCategory =
  | 'vibe-coding'
  | 'ai-tips'
  | 'prompting'
  | 'shipping'
  | 'ai-tools'
  | 'javascript-react'
  | 'nextjs'
  | 'databases'
  | 'styling'
  | 'typescript'
  | 'git'
  | 'building'

export const VIDEO_CATEGORY_LABELS: Record<VideoCategory, string> = {
  'vibe-coding': 'Vibecoding with Cursor, Claude Code & Codex',
  'ai-tips': 'Tips & Tricks for AI Coding',
  'prompting': 'AI Prompting',
  'shipping': 'Shipping a Full App with AI',
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
  'vibe-coding',
  'ai-tips',
  'prompting',
  'shipping',
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
  // Vibecoding with Cursor, Claude Code & Codex
  {
    id: 'fu7NZ3t3sLM',
    title: 'Ditch Unity: How I Vibe Code 3D Games With AI – Full Tutorial (Codex CLI, Claude Code, Cursor)',
    channel: 'AI Oriented Dev',
    category: 'vibe-coding',
  },
  {
    id: 'iLCDSY2XX7E',
    title: 'Vibe Coding Fundamentals In 33 Minutes',
    channel: 'Tina Huang',
    category: 'vibe-coding',
  },
  {
    id: 'qEs7UHZSfrg',
    title: 'Codex vs Claude Code: Which AI Coding Agent is Better?',
    channel: 'Builder.io',
    category: 'vibe-coding',
  },
  {
    id: 'mwDUYR8SjJs',
    title: 'GPT-5.2-Codex vs Claude Code Opus 4.5 – Vibe Coding a Physical Product',
    channel: 'Bijan Bowen',
    category: 'vibe-coding',
  },
  {
    id: 'NnYLzGMk8Tg',
    title: 'We Built 2 FULL Video Games In 7 Prompts (Claude Code vs GPT-5 Codex)',
    channel: 'Riley Brown',
    category: 'vibe-coding',
  },
  {
    id: 'vxFurJzG58Y',
    title: 'How I Use AI for Laravel: Cursor, Claude Code, Codex (1-Hour Course)',
    channel: 'Laravel Daily',
    category: 'vibe-coding',
  },
  {
    id: 'PLKrSVuT-Dg',
    title: 'How to Make Vibe Coding Not Suck…',
    channel: 'Fireship',
    category: 'vibe-coding',
  },

  // Tips & Tricks for AI Coding
  {
    id: 'uwA3MMYBfAQ',
    title: 'AI Coding 101: Ultimate Prompt Guide (37 Tips)',
    channel: 'Volo Builds',
    category: 'ai-tips',
  },
  {
    id: 'WVeYLlKOWc0',
    title: 'Cursor Agent: 10 Pro Tips!',
    channel: 'Cursor',
    category: 'ai-tips',
  },
  {
    id: 'Ffh9OeJ7yxw',
    title: '800+ Hours of Learning Claude Code in 8 Minutes (2026 Tutorial / Unknown Tricks)',
    channel: 'Edmund Yong',
    category: 'ai-tips',
  },
  {
    id: 'WwdIYp5fuxY',
    title: 'My Top 6 Tips & Ways of Using Claude Code Efficiently',
    channel: 'Academind',
    category: 'ai-tips',
  },
  {
    id: 'iltdFNpl73I',
    title: '900+ Hours of Learning Claude Code/Cursor in 10 Minutes',
    channel: 'Andrew Codesmith',
    category: 'ai-tips',
  },
  {
    id: 'qA6zfVDuXmI',
    title: 'It Took Me 847 Hours in Cursor to Learn These 15 Hacks',
    channel: 'Robin Ebers',
    category: 'ai-tips',
  },
  {
    id: 'YtTWNzOtkxU',
    title: '5 Tips to Make You a PRO at Cursor',
    channel: 'Supabase',
    category: 'ai-tips',
  },
  {
    id: 'ukgAjLLQg2A',
    title: 'This Cursor Setup Changes Everything (Claude Code)',
    channel: 'Robin Ebers',
    category: 'ai-tips',
  },
  {
    id: 'rfDvkSkelhg',
    title: '6 Months of Claude Code Lessons in 27 Minutes',
    channel: 'AI with Avthar',
    category: 'ai-tips',
  },
  {
    id: 'wsIb_EdhcY8',
    title: 'The AI Workflow Nobody\'s Talking About (Claude Code + Cursor)',
    channel: 'Ankita Kulkarni',
    category: 'ai-tips',
  },

  // AI Prompting
  {
    id: '7WuKgc3-_-s',
    title: 'You\'re Prompting Claude Code Wrong. Here\'s How to Do It Correctly…',
    channel: 'Alex Finn',
    category: 'prompting',
  },
  {
    id: '4m8AgfeK6kU',
    title: 'CLAUDE.md and Agents.md Explained: Stop Repeating Yourself to AI',
    channel: 'GritAI Studio',
    category: 'prompting',
  },
  {
    id: '-uW5-TaVXu4',
    title: 'Most Devs Don\'t Understand How Context Windows Work',
    channel: 'Matt Pocock',
    category: 'prompting',
  },
  {
    id: 'H3M95i4iS5c',
    title: 'Essential AI Prompts for Developers',
    channel: 'Visual Studio Code',
    category: 'prompting',
  },

  // Shipping a Full App with AI
  {
    id: '2JEzjfs6Kew',
    title: 'Full Claude Code App Building Course in One Video (2+ Hours)',
    channel: 'Build Great Products',
    category: 'shipping',
  },
  {
    id: 'Qcxq4iXLZbY',
    title: 'Full App Building Course with Cursor (3+ Hours)',
    channel: 'Build Great Products',
    category: 'shipping',
  },
  {
    id: 'li788UL1qyI',
    title: 'Be a 10x Vibe Coder (Claude Code + Cursor + MCP)',
    channel: 'Greg Isenberg',
    category: 'shipping',
  },
  {
    id: 'MZjW7mlRgdw',
    title: 'Build Better Apps with AI Using This One Simple Document (PRD Guide)',
    channel: 'jordanUrbsAI',
    category: 'shipping',
  },
  {
    id: '2FJlhoDYNPE',
    title: 'AI Coding Masterclass: From Beginner to Expert in 90 Minutes',
    channel: 'Riley Brown',
    category: 'shipping',
  },
  {
    id: 'VxD7_MRPebY',
    title: 'Vibe Coding Masterclass: Build Your First App with AI in 37 Minutes (Claude Code)',
    channel: 'Alex Finn',
    category: 'shipping',
  },
  {
    id: 'dH4mc9VQ96g',
    title: 'TaskMaster AI and Cursor Setup Guide for Vibe Coding Entire Apps with Claude Sonnet',
    channel: 'Morning Maker Show',
    category: 'shipping',
  },

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
    title: 'The "Vibe Coding" Mind Virus Explained',
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
    title: "Next.js in 100 Seconds // Plus Full Beginner's Tutorial",
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
