// Flip this to true when enrollment is closed
export const ENROLLMENT_CLOSED = false

// Set to false to hide premium plan and show single-plan pricing
export const SHOW_PREMIUM_PLAN = false

// Update this each cohort
export const COHORT_LABEL = "March '26 Cohort"

export const PLANS = {
  basic: {
    name: 'Basic',
    priceUSD: 55,
    priceNGN: 75_000,
    stripeAmount: 5852,
    paystackAmount: 7_624_400,
    stripeName: 'Ship With AI — Cohort Access',
    features: [
      '4 weeks of mentorship',
      'Live sessions + recordings',
      '1-on-1 check-ins',
      'Full curriculum & templates',
      'Study materials + 1 year of updates',
      'Private community',
    ],
  },
  premium: {
    name: 'Premium',
    priceUSD: 80,
    priceNGN: 110_000,
    stripeAmount: 8470,
    paystackAmount: 11_175_000,
    stripeName: 'Ship With AI — Premium Cohort Access',
    features: [
      'Everything in Basic',
      '1hr 30min personal sessions',
      'Code reviews',
      '3 weeks post-program support',
      'Custom starter template',
      'Priority async support',
    ],
  },
} as const

export type PlanId = keyof typeof PLANS

export function formatPrice(plan: typeof PLANS[PlanId], isNigeria: boolean) {
  if (isNigeria) {
    return `₦${plan.priceNGN.toLocaleString()}`
  }
  return `$${plan.priceUSD}`
}

export const MATERIALS_ORDER = [
  {
    slug: 'onboarding',
    title: 'Onboarding',
    description: 'Everything you need to get started. Pre-work checklist, communication channels, and expectations.',
    category: 'core' as const,
  },
  {
    slug: 'curriculum',
    title: 'Curriculum',
    description: 'The full 4-week day-by-day guide. Start here.',
    category: 'core' as const,
  },
  {
    slug: 'tool-reference',
    title: 'Tool Reference',
    description: 'Cheatsheets and comparison guide for Claude Code, Cursor, and Codex.',
    category: 'core' as const,
  },
  {
    slug: 'prompting-playbook',
    title: 'Prompting Playbook',
    description: 'How to write prompts that produce useful code.',
    category: 'core' as const,
  },
  {
    slug: 'setup-and-deploy',
    title: 'Setup & Deploy',
    description: 'Environment variables, API keys, and deployment to Vercel, Netlify, Railway, and Cloudflare.',
    category: 'build' as const,
  },
  {
    slug: 'git-basics',
    title: 'Git Basics',
    description: 'Git for beginners. Branches, commits, worktrees for AI coding.',
    category: 'build' as const,
  },
  {
    slug: 'project-templates',
    title: 'Project Templates',
    description: 'Starter templates for SaaS apps, Chrome extensions, mobile apps, and more.',
    category: 'build' as const,
  },
  {
    slug: 'advanced-ai-workflows',
    title: 'Advanced AI Workflows',
    description: 'MCP servers, Figma Make, multi-agent coding, and AI-generated testing.',
    category: 'build' as const,
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Debugging, getting unstuck, and fixes for 48 common issues.',
    category: 'ship' as const,
  },
  {
    slug: 'quick-wins',
    title: 'Quick Wins',
    description: 'Small additions (5-15 minutes each) that make your project look polished.',
    category: 'ship' as const,
  },
  {
    slug: 'student-handbook',
    title: 'Student Handbook',
    description: 'Daily check-ins, accountability, scope cutting, and the Demo Day checklist.',
    category: 'ship' as const,
  },
] as const

export type MaterialCategory = 'core' | 'build' | 'ship'

export const CATEGORY_LABELS: Record<MaterialCategory, string> = {
  core: 'Core',
  build: 'Build',
  ship: 'Ship',
}

export const WEEK_CONFIG = [
  {
    week: 1,
    theme: 'Learn the tools, start your project',
    milestones: [
      'PRD written (both Product and Technical sections)',
      'Repo created on GitHub',
      'Project scaffolded and running locally',
      'CLAUDE.md or .cursor/rules file set up with project context',
      'Auth working (if your app needs it)',
      'Basic layout and navigation in place',
    ],
  },
  {
    week: 2,
    theme: 'Build',
    milestones: [
      'Core feature #1 working',
      'Core feature #2 working (or in progress)',
      'Database connected with real data',
      'Frontend showing real data (not hardcoded dummy data)',
      'Can demo the core workflow end-to-end',
    ],
  },
  {
    week: 3,
    theme: 'Polish and expand',
    milestones: [
      'All core features working',
      'UI polished (responsive, loading states, error handling)',
      'At least one "wow" detail (animation, AI-powered feature, nice UX touch)',
      'No major bugs',
      'Tested on mobile',
    ],
  },
  {
    week: 4,
    theme: 'Ship',
    milestones: [
      'Deployed to a live URL',
      'Demo video recorded (2-3 minutes)',
      'README with screenshots on GitHub',
      'Can demo for 3 minutes without it crashing',
      'Demo Day presentation ready',
    ],
  },
]
