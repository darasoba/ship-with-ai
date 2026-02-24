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

  // OpenCode
  {
    id: 'Z0HglpK20ec',
    title: 'OpenCode: NEW Agentic AI Coder! Open-Source Claude Code Alternative!',
    channel: 'WorldofAI',
    category: 'vibe-coding',
  },
  {
    id: 'ipY_e9sldFM',
    title: 'OpenCode: The BEST AI Coding Agent Ever! BYE Gemini CLI & Claude Code!',
    channel: 'WorldofAI',
    category: 'vibe-coding',
  },
  {
    id: 'v4j1_qHLq9s',
    title: 'OpenCode Desktop: BEST AI Coding Agent Ever + FULLY FREE!',
    channel: 'WorldofAI',
    category: 'vibe-coding',
  },
  {
    id: 'MsQACpcuTkU',
    title: 'AI in the Terminal — Complete Guide (Gemini CLI, Claude Code, Codex, OpenCode)',
    channel: 'NetworkChuck',
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

// ─── Curriculum-aligned videos ───────────────────────────────────────────────

export interface CurriculumVideo {
  id: string
  title: string
  channel?: string
}

export interface CurriculumTopic {
  topic: string
  videos: CurriculumVideo[]
}

export interface CurriculumWeek {
  week: string
  label: string
  topics: CurriculumTopic[]
}

export const CURRICULUM_SECTIONS: CurriculumWeek[] = [
  {
    week: 'prework',
    label: 'Pre-Work',
    topics: [
      {
        topic: 'Environment Setup',
        videos: [
          { id: 'ocMOZpuAMw4', title: 'Cursor Tutorial for Beginners (AI Code Editor)', channel: 'Tech With Tim' },
          { id: 'fG6HV3pxtOI', title: 'The VS Code/Cursor Setup to INCREASE Productivity (2025)' },
        ],
      },
      {
        topic: 'Accounts Needed & Cost Expectations',
        videos: [
          { id: '5ctJiEQmdng', title: "GitHub Account Setup for AI Development: Beginner's Guide 2024" },
          { id: 'sqj2ATbL7x8', title: 'Best AI Coding Tool in 2025? (Cursor vs Claude Code)' },
        ],
      },
      {
        topic: 'Git & GitHub Basics',
        videos: [
          { id: 'a9u2yZvsqHA', title: 'How To Use GitHub For Beginners' },
          { id: 'mAFoROnOfHs', title: 'Git & GitHub Crash Course for Beginners [2026]' },
        ],
      },
      {
        topic: 'Pre-Read + Project Brief / PRD Setup',
        videos: [
          { id: 'MZjW7mlRgdw', title: 'Build Better Apps with AI Using This One Simple Document (PRD Guide)', channel: 'jordanUrbsAI' },
          { id: 'nbnD2h4IP8I', title: 'Claude Code + Cursor + GitHub: The New AI Environment Setup' },
        ],
      },
    ],
  },
  {
    week: 'week1',
    label: 'Week 1: Foundations',
    topics: [
      {
        topic: 'Day 1 — AI Coding Mental Model: Assistants vs. Agents vs. Pair Programmers',
        videos: [
          { id: '5fhcklZe-qE', title: 'Everything You Need to Know About Coding with AI // NOT Vibe Coding' },
          { id: 'BAig5L3EM44', title: 'Top 10 AI Coding Assistants That Will 10x Your Development in 2025' },
        ],
      },
      {
        topic: 'Day 2 — Deep Dive into Cursor, Claude Code, Codex, and OpenCode',
        videos: [
          { id: '97FYys-kj58', title: "I Used Both Claude Code and Codex for Weeks — Here's What Surprised Me" },
          { id: 'vxFurJzG58Y', title: 'How I Use AI for Laravel: Cursor, Claude Code, Codex (1-Hour Course)', channel: 'Laravel Daily' },
          { id: 'Z0HglpK20ec', title: 'OpenCode: NEW Agentic AI Coder! Open-Source Claude Code Alternative!', channel: 'WorldofAI' },
          { id: 'MsQACpcuTkU', title: 'AI in the Terminal — Complete Guide (Gemini CLI, Claude Code, Codex, OpenCode)', channel: 'NetworkChuck' },
        ],
      },
      {
        topic: 'Day 3 — Supplementary Tools: Bolt.new, Lovable, v0, Windsurf, Replit Agent',
        videos: [
          { id: '48_MlEfci_M', title: 'Lovable vs Replit (2025) | Which One is Better?' },
          { id: 'ud0bv2J3xWY', title: 'The Best Vibe Coding Tools in 2026' },
        ],
      },
      {
        topic: 'Day 4 — Prompting for Code: 5 Prompting Principles + Prompt Templates',
        videos: [
          { id: 'P08jrZhyNxw', title: 'How to Write Perfect AI Prompts in 2025 (Complete Guide)' },
          { id: 'uwA3MMYBfAQ', title: 'AI Coding 101: Ultimate Prompt Guide (37 Tips)', channel: 'Volo Builds' },
        ],
      },
      {
        topic: 'Day 5 — Writing Your PRD + Setting Up CLAUDE.md / Cursor Rules',
        videos: [
          { id: 'i_OHQH4-M2Y', title: 'Claude Code Tutorial #2 — CLAUDE.md Files & /init' },
          { id: 'iltdFNpl73I', title: '900+ Hours of Learning Claude Code/Cursor in 10 Minutes', channel: 'Andrew Codesmith' },
        ],
      },
      {
        topic: 'Day 6 — Project Scaffolding: From PRD to Running Code + First Real Feature',
        videos: [
          { id: '-LFB8D9WV-g', title: 'Learn to Vibe Code in 10 Minutes (Full Beginners Tutorial)' },
        ],
      },
    ],
  },
  {
    week: 'week2',
    label: 'Week 2: Build',
    topics: [
      {
        topic: 'Day 8 — Design-to-Code: Figma → Code (MCP), Screenshot-to-Code, Component Libraries',
        videos: [
          { id: 'yO3Wr7DEWF0', title: 'The OFFICIAL Figma MCP Server — Tutorial & Demo' },
          { id: 'riFFyTRljic', title: 'Claude Code to Figma' },
        ],
      },
      {
        topic: 'Day 9 — Responsive Design + UI Polish Sprint',
        videos: [
          { id: 'aQoJNVZcPSc', title: 'Setup VS Code for Web & AI App Building!' },
        ],
      },
      {
        topic: 'Day 10 — Backend & Data: Supabase Setup, Auth, API Routes',
        videos: [
          { id: 'kyphLGnSz6Q', title: 'Supabase Full Course 2025 | Become a Supabase Pro in 1.5 Hours' },
          { id: 'pmJNbRl1tZ8', title: 'Supabase Is INSANE in 2025 — Build Your Entire Backend in Minutes' },
        ],
      },
      {
        topic: 'Day 11 — Backend Sprint Continues: Common Backend Patterns',
        videos: [
          { id: 'eur8dUO9mvE', title: 'What is MCP? Integrate AI Agents with Databases & APIs' },
          { id: 'oHhv-0bm2is', title: 'Google AI Studio Just Replaced Every AI App Builder (It\'s FREE)' },
        ],
      },
      {
        topic: 'Days 12–13 — Feature Building Sprint: Breaking Features Down, Prompting Strategies',
        videos: [
          { id: 'WVeYLlKOWc0', title: 'Cursor Agent: 10 Pro Tips!', channel: 'Cursor' },
        ],
      },
      {
        topic: 'Day 14 — Week 2 Milestone Check-In + Bug Fixing with AI',
        videos: [
          { id: 'NuKrtiJqW3Y', title: 'Claude Released Something To Fix Your Errors' },
          { id: 'HIp8sFB2GGw', title: "Cursor 2.0 is Here... 5 Things You Didn't Know It Can Do" },
        ],
      },
    ],
  },
  {
    week: 'week3',
    label: 'Week 3: Polish & Expand',
    topics: [
      {
        topic: 'Day 15 — UI/UX Polish: Animations, Framer Motion, Design Details',
        videos: [
          { id: '9-fO_2xTpgY', title: 'React Animation Course with Motion — Become an Animations Pro in 1 Hour' },
          { id: '1w6HIurOqjw', title: 'Framer Complete Course 2025' },
        ],
      },
      {
        topic: 'Day 16 — Testing & Error Handling: AI-Generated Tests, Edge Cases',
        videos: [
          { id: 'wl6ORZBXGis', title: 'AI-Powered Test Automation: Self-Healing + Visual Testing' },
          { id: 'MNQUxkpD95g', title: 'Should You Prioritize AI Generated Test Cases For Debugging?' },
        ],
      },
      {
        topic: 'Days 17–18 — Advanced Features: AI-Powered Features + Third-Party Integrations',
        videos: [
          { id: 'eur8dUO9mvE', title: 'What is MCP? Integrate AI Agents with Databases & APIs' },
          { id: 'eMZmDH3T2bY', title: 'Claude Code Tutorial for Beginners' },
        ],
      },
      {
        topic: 'Days 19–20 — Performance, Security Audit, Code Cleanup',
        videos: [
          { id: '0fONene3OIA', title: 'The Ultimate Guide to Web Performance' },
          { id: 'KUdqbIHn8Ic', title: 'Frontend System Design: The 2025 Web Performance Roadmap' },
        ],
      },
      {
        topic: 'Day 21 — Week 3 Review + Final Feature Push',
        videos: [
          { id: 'WwdIYp5fuxY', title: 'My Top 6 Tips & Ways of Using Claude Code Efficiently', channel: 'Academind' },
          { id: 'Ffh9OeJ7yxw', title: '800+ Hours of Learning Claude Code in 8 Minutes (2026 Tutorial)', channel: 'Edmund Yong' },
        ],
      },
    ],
  },
  {
    week: 'week4',
    label: 'Week 4: Ship It',
    topics: [
      {
        topic: 'Day 22 — Deployment: Vercel, Custom Domain, Deployment Options',
        videos: [
          { id: 'D9eTEwNzqw0', title: 'How to Add Domain in Vercel [2026 Full Guide]' },
          { id: 'k0cjBuQFFYA', title: 'How to Add a Custom Domain on Vercel in 2025 (Updated)' },
        ],
      },
      {
        topic: 'Day 23 — Documentation: README, Case Study, Screenshots',
        videos: [
          { id: 'eJW4cFNGCh8', title: 'How To Create README File For GitHub Repository' },
          { id: 'z6bzwjwRZPE', title: 'README Files Explained: Key Elements for Every Project' },
        ],
      },
      {
        topic: 'Days 24–25 — Demo Video + Demo Day Presentation Prep',
        videos: [
          { id: 'Edj_zj4U_9s', title: 'How to Make a SaaS Product Demo Video [2026]' },
          { id: 'ZK-rNEhJIDs', title: 'Product Demo Video | SaaS Explainer Video | Infinity' },
        ],
      },
      {
        topic: 'Days 26–27 — Peer Review Workshop + Final Polish + Launch Checklist',
        videos: [
          { id: 'Oaj3RBIoGFc', title: "GitHub Basics Made Easy: A Fast Beginner's Tutorial!" },
        ],
      },
    ],
  },
  {
    week: 'reference',
    label: 'Reference Sections',
    topics: [
      {
        topic: 'Tool Cheat Sheets: Claude Code, Cursor, Codex',
        videos: [
          { id: 'eMZmDH3T2bY', title: 'Claude Code Tutorial for Beginners' },
          { id: 'WwdIYp5fuxY', title: 'My Top 6 Tips & Ways of Using Claude Code Efficiently', channel: 'Academind' },
        ],
      },
      {
        topic: 'Prompt Library: Scaffold, CRUD, Debug, Refactor, Auth, Deploy',
        videos: [
          { id: 'uwA3MMYBfAQ', title: 'AI Coding 101: Ultimate Prompt Guide (37 Tips)', channel: 'Volo Builds' },
          { id: 'P08jrZhyNxw', title: 'How to Write Perfect AI Prompts in 2025 (Complete Guide)' },
        ],
      },
      {
        topic: 'Project Ideas by Track (Designer / Developer / Product)',
        videos: [
          { id: 'Uk_AJMhIkZY', title: 'Build These 3 AI Projects for AI Product Managers With Examples That Will Get You Hired' },
          { id: 'ud0bv2J3xWY', title: 'The Best Vibe Coding Tools in 2026' },
        ],
      },
      {
        topic: 'Schedule Overview, Mentorship Principles, FAQ',
        videos: [
          { id: '5fhcklZe-qE', title: 'Everything You Need to Know About Coding with AI // NOT Vibe Coding' },
          { id: 'sqj2ATbL7x8', title: 'Best AI Coding Tool in 2025? (Cursor vs Claude Code)' },
        ],
      },
    ],
  },
]
