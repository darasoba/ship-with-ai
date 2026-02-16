---
title: "Curriculum"
slug: "curriculum"
---

# SHIP WITH AI -- 4-Week Intensive Mentorship

## Build your project from idea to deployed product using AI coding tools. In 4 weeks.

**Created by [@darasoba](https://x.com/darasoba)**

---

## Program Overview

**Program:** Ship With AI
**Duration:** 4 weeks (intensive, daily work expected)
**Format:** Cohort-based mentorship with live sessions, async support, and 1-on-1 guidance
**Price:** Under $100 (one-time payment for the full 4 weeks)
**Who it's for:** Designers, developers, and product people at any skill level
**What you'll build:** YOUR project -- a website, app, plugin, or tool -- from idea to deployed product
**Primary tools:** Claude Code, Cursor, OpenAI Codex
**Supplementary tools:** Windsurf, Bolt.new, Lovable, v0, Replit Agent

### The Promise

By the end of 4 weeks, every participant will have a fully functional, deployed project they conceived, built, and shipped -- using AI as their co-builder. Not a tutorial project. YOUR project. YOUR idea. Live on the internet.

### What Makes This Different

This is not a course where you follow along building a todo app. You come in with your own project idea. We teach you the tools, the workflows, and the thinking patterns. You apply them to your own thing every single day. By the end, you have a real product in your portfolio.

---

## How It Works

### Application and Onboarding

Every applicant must submit:

1. **What they want to build** -- A clear description of their project (website, app, extension, plugin, tool, etc.)
2. **Why it matters** -- Who is it for? What problem does it solve?
3. **Their current skill level** -- Beginner (no code experience), Intermediate (some HTML/CSS/JS or design tool experience), Advanced (can code but wants to speed up with AI)
4. **Their role** -- Designer, Developer, or Product Person (this determines their learning track)

Once accepted, each participant is matched with:
- A **primary AI tool track** (Claude Code, Codex, or Cursor) based on their project and skill level
- A **project roadmap** broken into 4 weekly milestones
- A **mentor checkpoint schedule** with clear dates

### Recommended Tool Matching

| Profile | Recommended Primary Tool | Why |
|---|---|---|
| Designer with no code experience | Cursor | Visual IDE, inline AI, easy onboarding |
| Developer wanting CLI power | Claude Code | Terminal-native, agentic, full codebase awareness |
| Product person prototyping fast | Codex (ChatGPT) | Conversational, cloud-based, low setup |
| Advanced dev building complex apps | Claude Code + Cursor | Combine CLI power with IDE comfort |
| Designer building a plugin | Cursor + Claude Code | Cursor for UI, Claude Code for logic and APIs |
| Non-technical founder with an MVP idea | Bolt.new or Lovable | Browser-based, zero setup, instant preview |

> **Note:** All participants learn ALL three primary tools. The primary tool is their daily driver, but cross-training is built into the program. We also cover supplementary tools like Bolt.new, Lovable, v0, Windsurf, and Replit Agent so you know when to reach for each one.

---

## Pre-Work (Before Week 1)

Complete before the first live session. Estimated time: 3-4 hours.

### Environment Setup

- [ ] Install [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.com/) (Cursor recommended -- it's a VS Code fork with AI built in)
- [ ] Install [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) -- run: `npm install -g @anthropic-ai/claude-code`
- [ ] Get access to [OpenAI Codex](https://openai.com/codex/) (ChatGPT Plus/Pro or API access)
- [ ] Install [Node.js](https://nodejs.org/) (LTS version, currently v22)
- [ ] Install [Git](https://git-scm.com/) and create a [GitHub](https://github.com/) account
- [ ] Install a package manager: npm (comes with Node) or [bun](https://bun.sh/) (faster, recommended)
- [ ] (Optional) Install [Windsurf](https://windsurf.com/) to try as an alternative IDE
- [ ] (Optional) Install [Docker](https://docker.com/) for backend projects
- [ ] (Optional) Install [Figma](https://figma.com/) desktop app for design-to-code workflows

### Accounts Needed

- GitHub account (free)
- Anthropic API key (for Claude Code) -- sign up at [console.anthropic.com](https://console.anthropic.com/)
- OpenAI account (for Codex) -- sign up at [platform.openai.com](https://platform.openai.com/)
- Cursor account (free tier works)
- Vercel or Netlify account (for deployment, both have free tiers)
- Supabase or Firebase account (if building an app with a database, both have free tiers)

### Cost Expectations for AI Tools

| Tool | Cost | Notes |
|---|---|---|
| Claude Code | ~$20/month (Anthropic API) or Claude Pro subscription | API usage-based; a typical project costs $5-15 total |
| Cursor | Free tier available, Pro is $20/month | Free tier gives limited requests |
| Codex | ChatGPT Plus ($20/month) or API usage | Codex in ChatGPT requires Plus or Pro |
| Bolt.new / Lovable / v0 | Free tiers available | Good for quick prototypes |

### Git and GitHub: Why You Need This (Non-Negotiable)

If you've never used Git before, don't skip this section. Git is the single most important tool you'll use alongside AI coding. Here's why:

**What is Git?**
Git is version control for your code. Think of it as "save points" for your project. Every time you make a change that works, you save a snapshot. If the AI breaks something (it will), you can go back to the last working version in seconds. Without Git, you lose work. With Git, you never lose work.

**What is GitHub?**
GitHub is where your Git snapshots live online. It's like Google Drive for code. Your project gets a URL (like github.com/yourname/your-project) that you can share, that AI tools can connect to, and that deployment services like Vercel can pull from.

**Why this matters for AI coding specifically:**
- AI tools frequently break things while trying to fix them. Git lets you undo.
- Claude Code has built-in Git support (/commit, /pr, branch creation)
- Codex connects directly to GitHub repos
- Deployment services (Vercel, Netlify) auto-deploy when you push to GitHub
- Your project lives in one place, backed up, with full history

**Setup (do this now):**

1. Install Git (if you haven't already):
   ```bash
   # Check if Git is installed
   git --version

   # If not installed, download from https://git-scm.com/
   # Or on Mac: xcode-select --install
   ```

2. Set your identity (one-time setup):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. Install the GitHub CLI (makes everything easier):
   ```bash
   # Mac
   brew install gh

   # Or download from https://cli.github.com/
   ```

4. Log into GitHub from your terminal:
   ```bash
   gh auth login
   # Follow the prompts, choose HTTPS, authenticate via browser
   ```

**The 10 Git Commands You'll Use Every Day:**

```bash
# 1. Create a new Git project
git init

# 2. Check what's changed since your last save
git status

# 3. Stage files for saving (add specific files)
git add index.html style.css
# Or stage everything that changed:
git add .

# 4. Save a snapshot with a message describing what you did
git commit -m "Added hero section and navigation"

# 5. Create a GitHub repo and link it (first time only)
gh repo create my-project --public --source=. --push

# 6. Push your latest saves to GitHub
git push

# 7. See your save history
git log --oneline

# 8. Undo the last change to a file (before committing)
git checkout -- filename.html

# 9. Go back to a previous save point (careful with this)
git checkout abc1234

# 10. Create a branch (for trying something risky)
git checkout -b experiment/new-feature
```

**The workflow you'll use in this program:**

```
1. Make changes (or let AI make changes)
2. Test that it works
3. git add .
4. git commit -m "What you just did"
5. git push
6. Repeat
```

**With Claude Code, it's even simpler:**
```bash
# Claude Code has a built-in commit command
# Just type this inside a Claude session:
/commit
# Claude writes the commit message for you based on what changed
```

**Key concept: commit early, commit often.** Every time something works, commit. Added a new page? Commit. Fixed a bug? Commit. AI just built a feature that's working? Commit immediately before you ask it to do the next thing. This way, if the AI breaks something on the next change, you just go back to the last commit.

```bash
# If the AI broke something and you want to undo ALL uncommitted changes:
git stash
# Your code goes back to the last commit. The broken changes are saved
# in the stash in case you want them back later.

# If you definitely don't want the changes:
git checkout .
# This throws away all uncommitted changes. Only do this if you're sure.
```

**Branches (for when you want to try something risky):**

Branches let you try something without risking your working code. Think of it as "save my current game, try a boss fight, and go back to the save if I die."

```bash
# Create a new branch and switch to it
git checkout -b feature/dark-mode

# Work on the feature, commit as usual
git add .
git commit -m "Added dark mode toggle"

# If it works, merge it back into your main branch
git checkout main
git merge feature/dark-mode

# If it didn't work out, just switch back and delete the branch
git checkout main
git branch -d feature/dark-mode
```

**GitHub Pull Requests (for when you want a clean history):**

When you push a branch to GitHub, you can create a Pull Request (PR). This is useful for reviewing changes before merging them.

```bash
# Push your branch to GitHub
git push -u origin feature/dark-mode

# Create a Pull Request using GitHub CLI
gh pr create --title "Add dark mode" --body "Added dark mode toggle
with localStorage persistence"

# Or with Claude Code, just type:
/pr
```

**Don't worry about memorizing all of this.** The cheatsheet in the study materials has all the commands. And Claude Code handles most Git operations for you. But understanding the basics means you won't panic when something goes wrong.

### Pre-Read and Pre-Watch

- Read: [What is Vibe Coding?](https://en.wikipedia.org/wiki/Vibe_coding) -- understand the philosophy behind AI-assisted building
- Watch: Intro videos on Claude Code, Cursor, and Codex (links provided upon enrollment)
- Complete the Git and GitHub setup above (test it by creating a test repo and pushing a file)
- Write: A 1-page project brief covering:
  - What you're building
  - Who it's for
  - What the MVP (minimum viable product) looks like
  - 3-5 core features you want in the first version

### Pre-Work Deliverable

Submit your completed project brief to the cohort channel before Day 1. This is required to participate.

---

## WEEK 1: Foundations -- Learn the Tools, Start Your Project

> **Theme:** Understand how AI coding tools work, pick your primary tool, set up your project, and build your first working prototype.

**Study materials to keep open all week:**
- `materials/TOOL_REFERENCE.md` -- Quick reference for Claude Code, Cursor, and Codex commands
- `materials/TROUBLESHOOTING.md` -- When something goes wrong during setup, check here first
- `materials/STUDENT_HANDBOOK.md` -- Start posting daily standups from Day 1. The template is in this doc.

---

### Day 1: Orientation and the AI Coding Mental Model

**Learning Objectives:**
- Understand the three categories of AI coding tools: assistants (autocomplete), agents (autonomous), and pair programmers (collaborative)
- Know what each tool is best at so you can pick the right one for each task
- Shift your mental model from "writing code" to "directing AI to write code"

**Live Session: Welcome to Ship With AI**

The most important concept in this program: you are no longer a coder. You are a **director**. Think of yourself as a film director. The AI is your crew. You decide what gets built, how it should look, what order things happen in, and whether the result is good enough. The AI does the actual construction.

This does not mean you don't need to understand code. You absolutely do. But your primary skill is now **communication** -- telling the AI exactly what you want, reviewing what it gives you, and steering it toward the right outcome.

#### The Three Types of AI Coding Tools

**1. Autocomplete Assistants (Copilot-style)**
- Predict your next lines of code as you type
- Examples: GitHub Copilot, Cursor's Tab completion, Windsurf's autocomplete
- Best for: Small edits, boilerplate, finishing your thought
- Limitation: No understanding of your full project, just local context

**2. Chat-Based Pair Programmers**
- You describe what you want in natural language, they generate code
- Examples: Cursor's Cmd+K and chat panel, ChatGPT, Claude.ai
- Best for: Generating components, explaining code, debugging
- Limitation: You still need to copy/paste code into the right place manually

**3. Agentic AI Coders**
- Autonomous agents that read your codebase, write code, run commands, fix errors, and iterate
- Examples: Claude Code, Codex, Cursor Agent Mode, Windsurf Cascade, Replit Agent
- Best for: Multi-file features, project scaffolding, full-stack work
- Limitation: Need clear instructions; can go off-track if you're vague

#### When to Use What

| Task | Best Tool Type | Example |
|---|---|---|
| Quick one-line fix | Autocomplete | Cursor Tab, Copilot |
| Generate a component | Chat pair programmer | Cursor Cmd+K, ChatGPT |
| Build a full feature across multiple files | Agentic AI | Claude Code, Codex, Cursor Agent |
| Scaffold an entire project | Agentic AI | Claude Code, Bolt.new, Replit Agent |
| Debug an error | Chat or Agent | Claude Code, Cursor chat |
| Refactor existing code | Agent | Claude Code Agent, Cursor Agent |

**Homework for Day 1:**
1. Install all three primary tools (Claude Code, Cursor, Codex access)
2. Open each one and try asking it to write a simple function: "Write a JavaScript function that takes an array of numbers and returns the top 3 largest values"
3. Note the differences in how each tool responds, where the code ends up, and how you'd use it in a real project
4. Post your observations in the cohort channel

---

### Day 2: Deep Dive into the Three Primary Tools

**Learning Objectives:**
- Know the specific features, shortcuts, and workflows for Cursor, Claude Code, and Codex
- Understand what MCP (Model Context Protocol) is and why it matters
- Set up your primary tool with proper configuration

**Session Part 1: Cursor -- The AI-Powered IDE**

Cursor is a fork of VS Code with AI baked into every interaction. If you already use VS Code, you'll feel at home. The AI features are layered on top of the editor you already know.

**Key Features and How to Use Them:**

| Feature | Shortcut | What It Does | When to Use It |
|---|---|---|---|
| Tab Completion | `Tab` | AI predicts your next edit, sometimes multiple lines | Writing code normally, filling in boilerplate |
| Inline Edit | `Cmd+K` | Select code, describe a change, AI rewrites it in place | Quick modifications to existing code |
| Chat Panel | `Cmd+L` | Chat about your code with full file context | Asking questions, debugging, getting explanations |
| Composer/Agent | `Cmd+I` | Multi-file autonomous editing | Building features that touch many files |
| @ Mentions | `@file`, `@docs`, `@web`, `@codebase` | Pull specific context into your prompt | When the AI needs more context to do a good job |
| Background Agents | `&` prefix in Composer | Run a task in the cloud while you keep working | Long-running tasks, parallel workstreams |

**Cursor Rules Setup:**

Cursor now uses `.cursor/rules/` directory with `.mdc` files instead of the old `.cursorrules` file. Each rule file has a YAML frontmatter and markdown body.

Create `.cursor/rules/project.mdc`:
```
---
description: "Project-wide rules for [Your Project Name]"
globs: "**/*"
alwaysApply: true
---

# Project: [Your Project Name]

## Stack
- Next.js 15 with App Router
- TypeScript (strict mode)
- Tailwind CSS for styling
- Supabase for database and auth

## Conventions
- Use functional components with hooks
- Name files in kebab-case (my-component.tsx)
- Put components in src/components/
- Put API routes in src/app/api/
- Always handle loading and error states
- Write accessible HTML (proper ARIA labels, semantic elements)

## Style
- Use Tailwind utility classes, not custom CSS
- Follow the existing color palette in tailwind.config.ts
- Mobile-first responsive design

## What NOT to do
- Never use `any` type in TypeScript
- Never leave console.log statements in production code
- Never hardcode API keys or secrets
```

**Hands-On Exercise: Cursor Sprint (30 minutes)**
1. Open Cursor and create a new folder called `cursor-test`
2. Use Cmd+I (Composer/Agent Mode) and type: "Create a simple task tracker app with HTML, Tailwind CSS, and vanilla JavaScript. Include the ability to add tasks, mark them as done, and delete them. Make it look clean and modern."
3. Watch Cursor create the files
4. Open the HTML file in your browser
5. Now use Cmd+K on the task list code and say: "Add local storage so tasks persist between page refreshes"
6. Test that it works

---

**Session Part 2: Claude Code -- The Terminal-Native Agent**

Claude Code runs in your terminal. No IDE required. You type natural language, and it reads your codebase, writes code, runs commands, installs packages, commits to git, and fixes errors -- all autonomously.

**Key Commands:**

| Command | What It Does |
|---|---|
| `claude` | Start an interactive session in the current directory |
| `claude "do something"` | One-shot command (does the thing and exits) |
| `claude -c` | Continue your last conversation |
| `claude -r SESSION_ID` | Resume a specific session |
| `claude --model sonnet` | Use a specific model (sonnet is faster, opus is smarter) |
| `claude --add-dir ../other-folder` | Give Claude access to additional directories |
| `claude -p "prompt" --output-format json` | Pipe mode for scripting |

**In-Session Slash Commands:**

| Command | What It Does |
|---|---|
| `/init` | Generate a starter CLAUDE.md for your project |
| `/commit` | Create a git commit with an AI-generated message |
| `/review` | Review your recent code changes |
| `/compact` | Summarize the conversation to save context space |
| `/cost` | Show how much this session has cost so far |
| `/clear` | Wipe conversation history |
| `/help` | Show all available commands |

**CLAUDE.md -- Your Project's Memory:**

This is the most important file when using Claude Code. It lives in your project root and gets loaded automatically every time you start a session. Think of it as persistent instructions that Claude always follows.

Create `CLAUDE.md` in your project root:
```markdown
# Project: [Your Project Name]

## What This Is
[One paragraph describing your project]

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Hosting: Vercel

## Project Structure
- src/app/ -- Pages and API routes (Next.js App Router)
- src/components/ -- Reusable UI components
- src/lib/ -- Utility functions and configurations
- src/types/ -- TypeScript type definitions
- supabase/ -- Database migrations and seed files

## Commands
- `npm run dev` -- Start dev server
- `npm run build` -- Build for production
- `npm run lint` -- Run linter
- `npm test` -- Run tests

## Coding Conventions
- Use TypeScript strict mode, no `any` types
- Tailwind for all styling, no custom CSS files
- Functional components with hooks, no class components
- File names in kebab-case
- Use server components by default, add "use client" only when needed
- Handle all loading and error states in UI

## Current Status
[Update this as your project progresses]
- [x] Project scaffolded
- [ ] Auth implemented
- [ ] Core features built
- [ ] UI polished
- [ ] Deployed
```

**Claude Code Advanced Features:**

**Sub-agents:** Claude Code can spawn specialized sub-agents to handle specific tasks. When you give it a complex request, it might delegate parts to sub-agents that run in parallel. You don't need to configure this -- it happens automatically for complex tasks. But you can create custom sub-agents for specific workflows.

Built-in sub-agent types:
- **Explore** -- Fast read-only agent for searching codebases, finding files, reading docs
- **Plan** -- Designs implementation strategies, identifies files to change, considers tradeoffs
- **General-purpose** -- Full-capability agent that can read, write, edit, and run commands

You can also create custom sub-agents by adding agent definition files in `.claude/agents/`. Each file defines a name, description, and what tools/instructions the agent gets.

**Agent Teams (Experimental):** This is the most powerful feature in Claude Code right now. Agent teams let you run multiple Claude Code sessions in parallel, all working on the same project.

To enable: set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in your environment.

How it works:
- **Team Lead** -- Your main Claude session. It creates the team, spawns teammates, assigns tasks, and pulls results together.
- **Teammates** -- Separate Claude instances that each get their own context window. They can work independently and message each other directly.
- **Shared Task List** -- All teammates share a task list with dependency tracking. When task A is done, task B that depends on it automatically unblocks.
- **Direct Messaging** -- Teammates can talk to each other, not just report back to the lead.

Example: you're building an app and need to add auth, a dashboard, and API routes. Instead of doing them one at a time:

```bash
# In your Claude Code session, switch to Delegate mode (Shift+Tab)
# This forces the lead to manage instead of coding itself

"Create a team of 3 agents:
1. One to build the auth system (signup, login, forgot password) using Supabase Auth
2. One to build the dashboard UI with the sidebar and main content area
3. One to build the API routes for task CRUD operations

They should all follow the conventions in CLAUDE.md. The API agent should
wait for the auth agent to finish before adding auth checks to the routes."
```

The team lead creates tasks, assigns them, and the three agents work simultaneously. They all read your CLAUDE.md and project context, so they follow the same conventions.

**Display modes:**
- In-process (default): All teammates run in your terminal. Use Shift+Up/Shift+Down to switch between agent views.
- tmux mode: Each teammate gets its own pane (if you use tmux).

**When to use agent teams:**
- Big features that touch many files and can be split into parallel work
- Refactoring multiple parts of a codebase at once
- Research + implementation in parallel (one agent researches, another codes)
- Building frontend + backend simultaneously

**When NOT to use agent teams:**
- Small changes (overkill)
- Tightly coupled work where everything depends on everything else
- When you're still figuring out what to build (use a single session first)

**Hooks:** These are shell commands that run automatically when certain events happen. You configure them in `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit)",
        "command": "npm run lint && npm test",
        "description": "Run lint and tests before any git commit"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "command": "echo 'File written: $CLAUDE_FILE_PATH'",
        "description": "Log when Claude writes a file"
      }
    ]
  }
}
```

Available hook events include: `PreToolUse`, `PostToolUse`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `Stop`, and more. Use hooks to enforce rules that must always run (like linting before commits).

**MCP (Model Context Protocol):** MCP lets Claude Code connect to external tools and data sources. Think of it as plugins. For example, you can connect Claude Code to your Figma files, your database, or a browser automation tool.

Configure MCP servers in `.claude/settings.json`:
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

**Skills:** Skills are folders containing instructions, scripts, and resources that Claude discovers and uses when relevant. They live in `.claude/skills/` and let you teach Claude specialized workflows that any session can use. For example, you could create a "deploy" skill that knows your specific deployment process.

**Hands-On Exercise: Claude Code Sprint (30 minutes)**
1. Open your terminal and navigate to a new folder: `mkdir claude-test && cd claude-test`
2. Run `claude` to start a session
3. Type: "Create a personal portfolio website with HTML, Tailwind CSS (via CDN), and vanilla JavaScript. Include a hero section with my name and a short bio, a projects section with 3 project cards, and a contact section with a form. Use a dark theme with blue accents. Make it responsive."
4. Watch Claude create the files, and then open `index.html` in your browser
5. Type: "Add smooth scroll navigation and a sticky header that changes opacity on scroll"
6. Type: `/commit` to commit the changes
7. Type: `/cost` to see what this session cost

---

**Session Part 3: OpenAI Codex -- The Cloud-Based Agent**

Codex runs in the cloud through ChatGPT or the API. You describe what you want, it works in a sandboxed environment, and delivers the result. The latest model is GPT-5.3-Codex.

**Key Features:**

| Feature | What It Does |
|---|---|
| Chat interface | Describe tasks in plain English |
| GitHub integration | Connect repos, create branches, open PRs directly |
| Cloud sandbox | Runs code securely in the cloud, nothing runs on your machine |
| Parallel tasks | Start multiple tasks at once, each runs independently |
| AGENTS.md | Like CLAUDE.md but for Codex -- project instructions file |
| Real-time collaboration | See the agent's progress, steer it while it works |
| MCP support | Connect to external tools and context sources |

**Using Codex Effectively:**

The key difference with Codex is that it runs in the cloud. You don't need a local dev environment. This makes it great for:
- Quick prototyping when you don't want to set up a project locally
- Working from any device (phone, tablet, Chromebook)
- Running multiple tasks in parallel (Codex can work on 3-4 things at once)

**AGENTS.md Setup:**
```markdown
# Project: [Your Project Name]

## Description
[What this project does]

## Stack
- [Your tech stack]

## Structure
- [Key directories and their purposes]

## Rules
- [Coding conventions]
- [What to avoid]
```

**Hands-On Exercise: Codex Sprint (30 minutes)**
1. Open ChatGPT and go to the Codex tab (or use Codex at codex.openai.com)
2. Connect your GitHub account if you haven't already
3. Type: "Create a new repository called 'portfolio-test'. Build a personal portfolio page with a hero section, projects grid, and contact form. Use Next.js, TypeScript, and Tailwind CSS. Deploy-ready structure."
4. Watch Codex work in its cloud sandbox
5. When done, check the GitHub repo it created
6. Start a parallel task: "Add dark mode toggle to the portfolio" while the first task finishes

**Day 2 Homework:**
1. Pick your primary tool based on your comfort level and project type
2. Set up the configuration file for your primary tool (CLAUDE.md, .cursor/rules/project.mdc, or AGENTS.md)
3. Write a 1-paragraph description of your project in the configuration file
4. Post a screenshot of your tool setup in the cohort channel

---

### Day 3: The Supplementary Tools -- Know Your Options

**Learning Objectives:**
- Understand when to use browser-based tools (Bolt.new, Lovable, v0) vs. IDE/CLI tools
- Try each supplementary tool with a quick exercise
- Build a mental map of the full AI coding toolkit

**Session: The Wider Toolkit**

Beyond the three primary tools, there's a growing set of browser-based AI builders. These are great for specific situations:

#### Bolt.new (by StackBlitz)
**What it is:** A browser-based AI builder that runs a full Node.js environment in your browser using WebContainer technology. No local setup needed at all.

**Best for:**
- Quick full-stack prototypes
- Trying out ideas before committing to a full project
- People who can't install tools locally (Chromebook, work computer, etc.)
- Framework exploration (supports React, Vue, Svelte, Angular, and more)

**How to use it:**
1. Go to [bolt.new](https://bolt.new)
2. Describe what you want to build
3. Bolt generates the code AND runs it in your browser
4. Edit and iterate directly in the browser
5. Deploy from Bolt or export the code

**Try it now:** Go to bolt.new and type: "Build a simple habit tracker app where users can add daily habits, check them off, and see a weekly streak counter. Use React and Tailwind."

#### Lovable
**What it is:** An AI-powered app builder focused on beautiful, production-quality UI. Fastest growing startup in European history -- hit $20M ARR in 2 months.

**Best for:**
- Designers who want pixel-perfect results fast
- MVPs that need to look great from day one
- Landing pages and marketing sites
- Apps where the visual quality matters as much as the functionality

**How to use it:**
1. Go to [lovable.dev](https://lovable.dev)
2. Describe your app or paste a design/screenshot
3. Lovable generates a full-stack app with beautiful defaults
4. Iterate on the design and functionality
5. Connect a backend (Supabase integration is built in)

**Try it now:** Go to lovable.dev and type: "Build a recipe sharing app where users can post recipes with photos, ingredients, and steps. Other users can save favorites. Make it look like a premium food magazine."

#### v0 by Vercel
**What it is:** Vercel's AI tool that generates production-ready React components with Tailwind and shadcn/ui. Now supports full Next.js apps with built-in databases.

**Best for:**
- React/Next.js component generation
- UI that uses shadcn/ui (the most popular React component library)
- Quick iterations on specific components or pages
- Developers already in the Vercel/Next.js ecosystem

**How to use it:**
1. Go to [v0.dev](https://v0.dev)
2. Describe a component or page
3. v0 generates the code using React, Tailwind, and shadcn/ui
4. Copy the code into your project OR deploy directly

**Try it now:** Go to v0.dev and type: "A pricing page with three tiers (Free, Pro, Enterprise) with a monthly/yearly toggle. Use cards with feature lists and highlighted recommended plan."

#### Windsurf
**What it is:** An AI IDE (like Cursor) with a feature called Cascade that provides deep project-level context awareness. Supports parallel multi-agent sessions.

**Best for:**
- Developers who want an alternative to Cursor
- Projects where you need the AI to track your intent across many interactions
- Side-by-side model comparison (Arena Mode)
- Teams exploring different AI models for different tasks

**Key Feature -- Cascade:** Unlike simple chat, Cascade tracks everything you do (edits, commands, clipboard, terminal) and uses that context to help you better. It remembers your intent across a long session.

#### Replit Agent
**What it is:** The most autonomous AI builder with 30+ integrations. Cloud-based, runs everything in the browser.

**Best for:**
- Complete beginners who want the easiest possible starting experience
- Projects that need hosting included (Replit hosts your app for you)
- Quick experiments and prototyping
- Mobile development (works on phone/tablet)

#### Quick Reference: When to Reach for Each Tool

| Situation | Reach For |
|---|---|
| "I need to build a full feature in my existing project" | Claude Code or Cursor Agent |
| "I want to quickly prototype an idea before committing" | Bolt.new or Lovable |
| "I need a specific React component" | v0 |
| "I want to build and deploy with zero local setup" | Replit Agent or Bolt.new |
| "I need to work on my project from my phone" | Codex or Replit Agent |
| "I want the AI to handle everything while I describe what I want" | Claude Code or Codex |
| "I need beautiful UI fast" | Lovable or v0 |
| "I want to compare different AI models on the same task" | Windsurf Arena Mode |

**Day 3 Homework:**
1. Try at least TWO supplementary tools (Bolt.new, Lovable, v0, Windsurf, or Replit Agent)
2. Build the same simple thing in both (like a todo list or landing page)
3. Write 3 sentences in the cohort channel: which one did you prefer and why?

---

### Day 4: Prompting for Code -- The Core Skill

**Learning Objectives:**
- Write prompts that produce production-quality code on the first try
- Understand why context, specificity, and iteration matter
- Build a personal prompt template library for your project type

**Session: How to Talk to AI So It Builds What You Actually Want**

The #1 skill in AI-assisted development is prompting. Not coding. Prompting. The quality of what the AI produces is directly tied to the quality of your instructions. Garbage in, garbage out. Specific in, specific out.

#### The Five Prompting Principles

**Principle 1: Be Specific About the End Result**

Bad prompt:
```
Make a landing page
```

Good prompt:
```
Create a landing page for "Flowboard", a project management tool for design teams.

Sections (in this order):
1. Hero: Headline "Design projects, managed beautifully", subheadline explaining the tool,
   a "Start Free Trial" CTA button, and a product screenshot placeholder
2. Features: 3-column grid with icons -- "Visual Boards", "Design Handoff", "Team Chat"
3. Testimonials: 2 customer quotes with names and company names
4. Pricing: Two tiers -- Free and Pro ($12/month) with feature comparison
5. Footer: Links, social icons, copyright

Tech: HTML, Tailwind CSS (via CDN), vanilla JavaScript
Color scheme: Indigo (#4F46E5) as primary, slate grays for text
Typography: Inter font from Google Fonts
Must be fully responsive (mobile, tablet, desktop)
```

The second prompt will produce something you can actually use. The first will produce something generic that needs 10 rounds of revision.

**Principle 2: State Your Stack and Constraints**

Always tell the AI:
- What framework/library you're using
- What styling system (Tailwind, CSS modules, styled-components)
- What conventions your project follows
- What should NOT be used

Example:
```
This is a Next.js 15 app using the App Router, TypeScript strict mode,
Tailwind CSS, and Supabase. Components use shadcn/ui. Do not use the
Pages Router. Do not use CSS modules. Do not use class components.
Server components by default, "use client" only when there's interactivity.
```

**Principle 3: Reference Existing Code**

When working in an existing project, point the AI at your existing code:

In Cursor:
```
Look at @src/components/Button.tsx and @src/components/Card.tsx.
Create a new ProductCard component that matches the same coding style,
uses the same Tailwind patterns, and follows the same prop interface pattern.
```

In Claude Code:
```
Read the existing components in src/components/ and the layout in
src/app/layout.tsx. Then create a new DashboardPage component that
matches the existing code style and uses the same design patterns.
```

**Principle 4: Iterate, Don't Start Over**

Your first prompt gets you ~70% of the way there. The remaining 30% comes from follow-up prompts:

```
Prompt 1: "Build the dashboard page with a sidebar and main content area"
[AI builds it]

Prompt 2: "The sidebar should be collapsible on mobile. Add a hamburger menu toggle."
[AI modifies it]

Prompt 3: "The cards in the main content area are too wide. Make them a 3-column grid on desktop, 2 on tablet, 1 on mobile."
[AI adjusts it]

Prompt 4: "Add loading skeletons that show while the data is fetching"
[AI adds them]
```

Each follow-up prompt is small and focused. This is much better than trying to get everything perfect in one giant prompt.

**Principle 5: Use Screenshot Feedback**

All three primary tools can process images. When something doesn't look right:

1. Take a screenshot of the problem
2. Paste it into the chat (Cursor, Codex) or describe it (Claude Code accepts images too)
3. Say: "Here's what it looks like. The spacing between the cards is too big and the header text is overlapping on mobile. Fix these issues."

This is one of the most powerful techniques. Visual feedback is worth a thousand words of description.

#### Prompt Templates

**Template 1: Website / Landing Page**
```
Build a [type] page for [product/service name].
Target audience: [who].
Sections needed: [list each section with specific content].
Design style: [modern/minimal/bold/playful/corporate].
Color scheme: [specific hex codes or describe].
Tech stack: [HTML/React/Next.js/etc + styling approach].
Must be responsive and accessible.
Reference design: [URL or paste screenshot].
```

**Template 2: Full-Stack App Feature**
```
Add [feature name] to this app.

What it should do:
- [Specific behavior 1]
- [Specific behavior 2]
- [Specific behavior 3]

Database changes needed:
- [New table or column if any]

API endpoints needed:
- [POST/GET/PUT/DELETE with paths]

UI needed:
- [Describe the UI components]

This should work with the existing auth system.
Follow the patterns in [reference file].
```

**Template 3: Bug Fix**
```
There's a bug: [describe what happens].
Expected behavior: [what should happen instead].
Steps to reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

The relevant code is in [file path].
Here's the error message: [paste error]
```

**Template 4: Refactor / Improve**
```
Refactor [file or component name] to:
- [Improvement 1, e.g., "extract repeated logic into a custom hook"]
- [Improvement 2, e.g., "add proper TypeScript types instead of any"]
- [Improvement 3, e.g., "split into smaller sub-components"]

Keep the same functionality. Don't change the API/props interface.
Make sure existing usage still works.
```

**Hands-On Exercise: Prompt Engineering Challenge (45 minutes)**

Take your actual project idea and write three prompts:

1. **The Lazy Prompt** (intentionally vague) -- e.g., "Build my app"
2. **The Detailed Prompt** (specific sections, features, stack, constraints)
3. **The Expert Prompt** (detailed + references to existing code patterns, iterative plan, screenshot references)

Run all three through Claude Code or Cursor Agent Mode. Compare:
- How much of the output is usable?
- How many follow-up prompts did you need?
- Which produced code closest to what you actually wanted?

**Day 4 Homework:**
1. Create a file called `PROMPTS.md` in your project repo
2. Save your best prompt templates in it (at least 3 templates)
3. Save 2-3 actual prompts you used today that worked well
4. This becomes your personal prompt library you'll add to throughout the program

---

### Day 5: Writing Your PRD and Setting Up AI Context

**Learning Objectives:**
- Write a PRD (Product Requirements Document) that serves as the foundation for your entire build
- Understand why a PRD is the single most important input for AI-assisted development
- Set up `.claude/`, `.cursor/`, and project context files that keep AI on track across every session
- Learn how context management separates good vibe coders from bad ones

**Session: The PRD-First Workflow**

Here's the thing most people get wrong with AI coding: they jump straight into prompting without a plan. They type "build me a dashboard" and wonder why the AI produces something generic and useless. The fix is simple: write a PRD first, then feed it to the AI as context.

A PRD is not a corporate formality. It's the blueprint that tells the AI exactly what you're building. Without it, every new chat session starts from zero. With it, the AI has full context every single time.

#### The Vibe Coding Project Kickoff Workflow

This is the workflow you'll use for every project from now on:

```
1. Start with your raw idea (in your own words, messy is fine)
2. Talk it through with AI (get feedback, check feasibility, refine)
3. Generate a Product PRD (what you're building and why)
4. Generate a Technical PRD (how to build it, for the AI that will code it)
5. Set up context files (CLAUDE.md, .cursor/rules/) that reference your PRDs
6. Start building with full context from prompt #1
7. Update the PRDs and context files as you go
```

Most people skip steps 1-4 and go straight to "build me a thing." That's why their results are mediocre. The 20-30 minutes you spend on PRDs will save you hours of rework.

---

#### Step 1: Start With Your Raw Idea

You don't need a polished pitch. You need to get the idea out of your head and into text. Open Claude Code, Cursor chat, or Codex and just talk.

**The first prompt -- just describe your idea in your own words:**

```
I have an idea for a project and I want your help thinking it through
before we build anything.

Here's what I'm thinking: I want to build a tool that helps freelancers
manage their projects and clients. Like, they could track what tasks
they're working on, how much time they spend, and then generate invoices
from the tracked time. I'm a freelance designer myself and I use
spreadsheets for this right now which sucks.

I don't want this to be complicated. Just the basics. Something I'd
actually use every day.

Don't write any code yet. Just tell me:
1. What do you think of this idea?
2. What questions would you ask to make it more specific?
3. Are there existing tools like this, and what would make mine different?
```

**Why this works:** You're not asking the AI to build anything yet. You're having a conversation. The AI will point out things you haven't thought about, ask clarifying questions, and help you see the shape of your project before you write a single line of code.

**What you'll get back:** The AI will usually give you honest feedback about the idea, ask 5-10 follow-up questions, and mention competitors (Toggl, Harvest, FreshBooks). This is good. You want to know what exists so you can decide what makes yours different.

#### Step 2: Refine Through Conversation

Now have a back-and-forth. Answer the AI's questions. Push back on its suggestions if they don't feel right. This is YOUR project.

**Prompt 2 -- Answer questions and check feasibility:**

```
Good questions. Let me answer:

- Target users: solo freelancers, not agencies. People who have 2-5
  clients at a time.
- The difference from Toggl/Harvest: those are bloated. I want something
  that takes 30 seconds to log time, not 5 minutes of clicking through
  menus. And I want the invoicing to be dead simple, not a full
  accounting system.
- Budget: I'm building this myself using AI tools over 4 weeks. No
  budget for paid APIs except maybe $20/month for hosting and database.

Now, be honest with me:
1. Is this realistic to build as an MVP in 4 weeks using AI coding tools?
2. What features should I cut to make it achievable?
3. What's the minimum set of features that would make this actually usable?
```

**Why this matters:** The feasibility check is where most project ideas get saved from failure. Without it, people scope a 6-month project into a 4-week timeline and end up with nothing finished. The AI will help you cut ruthlessly.

**Prompt 3 -- Refine the scope:**

```
OK, based on your feedback, here's what I'm thinking for the MVP:

Core features (must have):
- Dashboard that shows active projects and today's tasks
- Simple time tracking (start/stop timer or manual entry)
- Basic invoicing (generate a PDF from tracked time)
- Client management (name, email, hourly rate)

Not in MVP:
- No team features
- No recurring invoices
- No integrations with other tools
- No mobile app (web only is fine)

Does this scope feel right for 4 weeks? What am I missing?
What would you change?
```

Keep going back and forth until you feel solid about the scope. This conversation usually takes 3-5 rounds. Don't rush it.

#### Step 3: Generate the Product PRD

Once your idea is refined, ask the AI to write the formal Product PRD. This is the "what and why" document.

**Prompt to generate the Product PRD:**

```
Now I want you to write a full Product PRD (Product Requirements Document)
based on everything we've discussed. This PRD is for ME to reference
throughout the build. It should be clear enough that if I read it in
2 weeks, I'd know exactly what I'm building and why.

Use this structure:

# [Project Name] -- Product Requirements Document

## Overview
One paragraph. What is this, who's it for, what problem does it solve.

## Target User
Who they are, their current workflow, their pain points. Be specific.

## Problem Statement
What sucks about the current solutions. Why a new tool is needed.

## Core Features (MVP)
Numbered list. Each feature gets a name, one-sentence description,
and a priority (P0 = must have, P1 = should have, P2 = nice to have).

## Pages / Screens
Every page in the app. For each page describe:
- What the user sees
- What actions they can take
- What data is displayed

## User Flows
Step-by-step journeys:
1. First-time user flow (signup to first value)
2. Daily use flow (the thing they do every day)
3. Key action flows (invoicing, adding clients, etc.)

## Out of Scope (NOT in MVP)
Be explicit about what we're not building.

## Success Metrics
How do we know if this is working? What does "done" look like?

## Design Direction
Describe the look and feel. Reference existing products if helpful.

## Open Questions
Anything we still need to decide.

Write it based on our conversation. Don't add features we didn't
discuss. Don't make it corporate-sounding. Write it like I'd write
it myself.
```

**What you get:** A 2-4 page Product PRD that captures everything you've discussed. Read through it carefully. Edit anything that doesn't match your vision. Delete anything the AI added that you didn't ask for (AI loves to add extra features).

Save this as `docs/PRD.md` in your project repo.

#### Step 4: Generate the Technical PRD

Here's the part most people miss entirely. The Product PRD says WHAT to build. The Technical PRD says HOW to build it. This is the document that the AI coding agent will actually use to write code.

**If you know your tech stack:**

```
Now create a Technical PRD based on the Product PRD. This document is
specifically for the AI coding agent that will implement the project.
It should contain everything the agent needs to start building
without asking me questions.

My tech preferences:
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS with shadcn/ui components
- Supabase for database, auth, and storage
- Vercel for hosting

Include these sections:

## Tech Stack (with specific versions)
List every dependency with its version and why it's used.

## Project Structure
Full folder structure with descriptions of what goes where.

## Database Schema
Every table, every column, data types, relationships, constraints.
Include the actual SQL or Prisma schema.

## API Routes
Every endpoint: method, path, request body, response, auth required.

## Authentication Flow
Step by step: what happens on signup, login, logout, password reset.
Include which Supabase Auth methods to use.

## Component Hierarchy
Map out the main components and how they nest.
Which are server components, which are client components.

## State Management
How data flows through the app. What state lives where.

## Third-Party Services
Every external service, what it's used for, how to configure it.

## Environment Variables
Every env var needed, with descriptions (not actual values).

## Build and Deploy
How to run locally, how to build for production, how to deploy.

## Implementation Order
What to build first, second, third. Dependencies between features.
This is the order the AI agent should follow.

Be extremely specific. The AI agent reading this should be able to
start coding immediately without guessing or making assumptions.
```

**If you DON'T know what tech to use:**

This is common, especially for designers and product people. Ask the AI to recommend a stack:

```
I need your help choosing the right tech stack for this project.
Here's what matters to me:

- I'm a [designer / product person / beginner developer]
- I want to build and deploy this in 4 weeks using AI coding tools
- I need [auth / database / file uploads / payments / real-time features]
- I want it to be easy to deploy and cheap to host
- I'll be using [Claude Code / Cursor / Codex] as my primary tool

Based on the Product PRD we wrote, recommend a tech stack.
For each choice, explain:
1. What it is in plain English
2. Why it's the right choice for this project
3. What it costs
4. How well it works with AI coding tools

Give me 2 options:
- Option A: The simplest possible stack (fewest moving parts)
- Option B: A more capable stack if I want to grow the project later

Don't assume I know what these technologies do. Explain like
I'm smart but new to this.
```

After picking your stack, THEN generate the Technical PRD with the prompt above.

**The Technical PRD should include actual code snippets.** Here's an example of what the database schema section should look like:

```sql
-- Users table (handled by Supabase Auth, extended with profiles)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  hourly_rate DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time entries table
CREATE TABLE time_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  description TEXT,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Save the Technical PRD as `docs/TECHNICAL_PRD.md` in your project repo.

#### Why Two PRDs?

The Product PRD is for you. It's the "what and why" that keeps you focused when you get lost in code. You'll reference it when making decisions: "Should I add this feature? Let me check the PRD. It's not in scope for MVP. Skip it."

The Technical PRD is for the AI. When you start a new Claude Code session or Cursor chat, you point it at the Technical PRD and say "build this." The AI doesn't need to know why you chose these features. It needs to know the exact database schema, API routes, and component structure.

Together, they're the difference between "I built something in 4 weeks" and "I spent 4 weeks going in circles."

#### Quick Reference: The Full Prompt Sequence

Here's the complete sequence from idea to Technical PRD. You can copy these:

```
PROMPT 1 (The Idea Dump):
"I have an idea for [project]. Here's what I'm thinking: [describe in
your own words, messy is fine]. Don't write code. Tell me what you think,
what questions you'd ask, and what similar tools exist."

PROMPT 2 (Feasibility + Scope):
"[Answer the AI's questions]. Now be honest: is this realistic to build
in 4 weeks with AI tools? What should I cut? What's the minimum feature
set that would make this usable?"

PROMPT 3 (Refine):
"Based on your feedback, here's my updated scope: [list features].
Does this feel right? What am I missing?"

PROMPT 4 (Product PRD):
"Write a full Product PRD based on our conversation. Use this structure:
[paste the template from Step 3 above]. Don't add features we didn't
discuss."

PROMPT 5 (Tech Stack, if unsure):
"Recommend a tech stack for this project. I'm a [role], building with
[AI tool], need to deploy in 4 weeks. Give me 2 options: simplest
possible vs. more capable."

PROMPT 6 (Technical PRD):
"Create a Technical PRD based on the Product PRD. This is for the AI
agent that will code the project. Include: tech stack with versions,
folder structure, database schema with actual SQL, API routes, auth
flow, component hierarchy, environment variables, and implementation
order. Be extremely specific."
```

This whole process takes 30-60 minutes. It will save you days.

#### Step 2: Set Up Your Context Files

Context files are what keep the AI aligned with your project across sessions. Without them, every new session is a stranger walking into your codebase.

**For Claude Code -- the `.claude/` directory and `CLAUDE.md`:**

`CLAUDE.md` sits at the root of your project. Claude reads it automatically at the start of every session. This is your most powerful tool for maintaining context.

```markdown
# TaskFlow

## PRD Summary
TaskFlow is a project management app for freelancers. Read the full PRD
at docs/PRD.md for complete details.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- Supabase (auth, database, storage)
- Vercel (hosting)

## Project Structure
src/
  app/           -- Pages and API routes (App Router)
    (auth)/      -- Auth pages (login, signup, forgot-password)
    dashboard/   -- Main dashboard and sub-pages
    api/         -- API routes
  components/
    ui/          -- shadcn/ui base components (don't edit these)
    forms/       -- Form components
    layout/      -- Layout components (nav, sidebar, footer)
  lib/           -- Utility functions, Supabase client, types
  hooks/         -- Custom React hooks

## Coding Conventions
- Use "use client" only when the component needs interactivity
- Server Components by default
- All database queries go through lib/queries/
- Form validation with Zod schemas in lib/schemas/
- Error handling: try/catch in API routes, error boundaries in UI
- Use path aliases: @/components, @/lib, @/hooks

## Current Status
Week 1: Scaffolding complete. Auth working. Dashboard layout done.
Working on: Task CRUD and project management pages.

## Known Issues
- Google OAuth callback URL needs updating for production
- Dark mode toggle not persisting preference
```

The `.claude/` directory holds additional config:

```
.claude/
  settings.json    -- MCP servers, permissions, hook configurations
  skills/          -- Custom skills (reusable workflows)
    deploy/        -- Your deployment workflow
    db-migrate/    -- Database migration workflow
```

**For Cursor -- the `.cursor/` directory:**

Cursor uses `.cursor/rules/` with `.mdc` (Markdown Config) files. Each file can target specific parts of your project.

Create `.cursor/rules/project.mdc`:
```
---
description: Project-wide rules for TaskFlow
globs:
alwaysApply: true
---

# TaskFlow Project Context

Read docs/PRD.md for the full product requirements.

## Tech Stack
Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Supabase, Vercel.

## Conventions
- Server Components by default, "use client" only when needed
- Database queries in lib/queries/
- Form validation with Zod in lib/schemas/
- Always use path aliases (@/components, @/lib, @/hooks)
- Follow existing patterns in the codebase
```

Create `.cursor/rules/components.mdc` for component-specific rules:
```
---
description: Rules for building UI components
globs: src/components/**/*.tsx
---

- Use shadcn/ui primitives when possible
- All components must be accessible (aria labels, keyboard nav)
- Use Tailwind for styling, no CSS modules or styled-components
- Include loading and error states for async components
- Props should use TypeScript interfaces, not inline types
```

Create `.cursor/rules/api.mdc` for API-specific rules:
```
---
description: Rules for API routes
globs: src/app/api/**/*.ts
---

- Always validate input with Zod
- Return proper HTTP status codes
- Include error messages in response body
- Check auth on every protected route
- Use Supabase server client (not browser client)
```

#### Step 3: Put Your PRD in the Project

Save your PRD as `docs/PRD.md` in your project repo. Then reference it from your context files (as shown above).

Why a separate file instead of pasting the whole PRD into CLAUDE.md?
- CLAUDE.md should be a summary and quick reference
- The full PRD can be long and detailed
- Claude Code can read the full file when it needs to: just ask "read the PRD at docs/PRD.md"
- Cursor can reference it with @docs/PRD.md in any chat

#### Step 4: Using the PRD in AI Chat

Now that everything is set up, here's how the PRD flows into your daily building:

**In Claude Code:**
```bash
# Claude auto-reads CLAUDE.md, which points to the PRD
claude "Based on the PRD, build the dashboard page with the task list
and project sidebar."

# Or explicitly reference it
claude "Read docs/PRD.md and build the data model. Create the Supabase
migration with all the tables described in the PRD."
```

**In Cursor:**
```
# In Cursor chat, reference the PRD directly
@docs/PRD.md Build the user flows described in section "User Flows".
Start with the signup and onboarding flow.

# Or in Composer (agent mode)
Based on the PRD in @docs/PRD.md, build the complete auth flow
including signup, login, forgot password, and Google OAuth.
```

**In Codex:**
```
# Attach your repo (which contains the PRD)
# Then reference it in chat
Look at docs/PRD.md in this repo. Build the API routes for the
task management feature described in the PRD.
```

#### Step 5: Keep Context Updated

Your PRD and context files are living documents. Update them as you build:

- Finished a feature? Update the "Current Status" section in CLAUDE.md
- Changed your tech stack? Update both the PRD and context files
- Found a pattern that works? Add it to your conventions
- Hit a dead end? Document it so the AI doesn't go down the same path

**Hands-On Exercise: Write Your PRD (60 minutes)**

1. Using the template above, write a full PRD for your project
2. Save it as `docs/PRD.md` in your project repo
3. Create your context files:
   - `CLAUDE.md` at the project root
   - `.cursor/rules/project.mdc`
   - Any additional `.mdc` files for specific areas of your project
4. Test it: open Claude Code or Cursor chat, give it a prompt that requires project context, and see if the response matches your project

**Day 5 Homework:**
1. Finalize your PRD and get feedback from at least one other cohort member
2. Commit your PRD and all context files to your repo
3. Practice updating CLAUDE.md: add a "Current Status" entry after every work session from now on

---

### Day 6: Project Scaffolding -- Building Your Foundation

**Learning Objectives:**
- Set up your actual project repo with proper structure
- Configure your primary AI tool for your specific project
- Generate the initial scaffold and get it running locally

**Session: From PRD to Running Code**

Yesterday you wrote the PRD and set up your context files. Today you turn that plan into a running project. Everything from here on is about your actual deliverable.

#### Step 1: Create Your Repo

```bash
# Create the project directory
mkdir my-project-name
cd my-project-name

# Initialize git
git init

# Create a GitHub repo (using the gh CLI)
gh repo create my-project-name --public --source=. --push
```

Or create the repo on GitHub first and clone it:
```bash
gh repo create my-project-name --public --clone
cd my-project-name
```

#### Step 2: Set Up Your AI Configuration

**For Claude Code users** -- create `CLAUDE.md`:
```markdown
# Project: TaskFlow

## What This Is
TaskFlow is a project management app for freelancers who juggle multiple
clients. It lets them track tasks, set deadlines, log time, and generate
simple invoices from tracked time.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS + shadcn/ui components
- Supabase (PostgreSQL database + auth + storage)
- Vercel (deployment)

## Project Structure
src/
  app/           -- Pages and API routes
    (auth)/      -- Auth pages (login, signup)
    dashboard/   -- Main dashboard
    projects/    -- Project management pages
    api/         -- API routes
  components/
    ui/          -- shadcn/ui base components
    shared/      -- Shared components (Header, Sidebar, etc.)
    features/    -- Feature-specific components
  lib/           -- Utility functions, Supabase client, etc.
  types/         -- TypeScript type definitions

## Database Tables
- users (managed by Supabase Auth)
- projects (id, user_id, name, client_name, status, created_at)
- tasks (id, project_id, title, description, status, priority, due_date)
- time_entries (id, task_id, duration_minutes, date, notes)

## Conventions
- Server components by default
- "use client" only for interactive components
- Use Supabase server client in server components, browser client in client components
- All forms use React Hook Form + Zod validation
- Toast notifications for user feedback (sonner)
- Loading states use skeleton components from shadcn/ui
```

**For Cursor users** -- create `.cursor/rules/project.mdc`:
```
---
description: "TaskFlow project rules"
globs: "**/*"
alwaysApply: true
---

# TaskFlow - Freelancer Project Management App

## Stack
Next.js 15 App Router, TypeScript strict, Tailwind CSS, shadcn/ui, Supabase

## Key Rules
- Server components by default, "use client" only when needed
- Use Supabase for all data operations
- Tailwind only, no custom CSS
- React Hook Form + Zod for all forms
- shadcn/ui for all base UI components
- Handle loading, error, and empty states in every page
```

**For Codex users** -- create `AGENTS.md`:
```markdown
# TaskFlow

## About
Freelancer project management app. Next.js 15, TypeScript, Tailwind,
Supabase. See package.json for full dependencies.

## Rules
- TypeScript strict, no any types
- Tailwind CSS only, no custom stylesheets
- Server components by default
- All database operations go through Supabase client in src/lib/supabase.ts
```

#### Step 3: Generate Your Scaffold

**Using Claude Code:**
```bash
cd my-project-name
claude

# Then type:
"Set up this project based on the CLAUDE.md file. Initialize a Next.js 15
project with TypeScript and Tailwind CSS. Install and configure shadcn/ui.
Set up the Supabase client. Create the basic folder structure from CLAUDE.md.
Create a basic layout with a sidebar navigation and a main content area.
Don't set up auth yet -- just get the structure and layout working."
```

**Using Cursor:**
1. Open the project folder in Cursor
2. Press Cmd+I (Composer/Agent Mode)
3. Type the same scaffolding prompt
4. Let Cursor create all the files

**Using Codex:**
1. Open Codex in ChatGPT
2. Connect your GitHub repo
3. Describe the scaffold you want
4. Let Codex generate it and push to your repo

#### Step 4: Run It Locally

```bash
npm install    # or: bun install
npm run dev    # or: bun dev
```

Open `http://localhost:3000` in your browser. You should see your basic layout.

#### Step 5: Fix Any Issues

Your scaffold will almost certainly have some issues on first run. This is normal. Common problems:

- Missing dependencies: "Run `npm install [package-name]`"
- TypeScript errors: Ask the AI to fix them
- Import path issues: Ask the AI to check and fix import paths
- Styling not loading: Make sure Tailwind is configured correctly

Tell the AI: "The dev server shows these errors: [paste errors]. Fix all of them."

#### Step 6: Make Your First Commit

```bash
# If using Claude Code:
claude
/commit

# Or manually:
git add -A
git commit -m "Initial project scaffold"
git push origin main
```

#### Project Milestone 1 Checklist

- [ ] Repo created and pushed to GitHub
- [ ] AI tool configuration file in place (CLAUDE.md / .cursor/rules/ / AGENTS.md)
- [ ] Project scaffold generated and running locally at localhost:3000
- [ ] Basic folder structure matches your project plan
- [ ] Basic layout visible (sidebar, header, or whatever your app needs)
- [ ] README.md with project description and setup instructions
- [ ] No errors in the terminal or browser console

**Day 5 Deliverable:** Post your GitHub repo link and a screenshot of your project running locally in the cohort channel.

---

### Day 6: Building Your First Real Feature

**Learning Objectives:**
- Use the AI development loop (describe, generate, review, test, refine) on a real feature
- Practice reviewing AI-generated code before accepting it
- Ship your first working feature

**Session: The Build Loop in Practice**

Today you build your first real feature. Not a practice project. A real feature in YOUR app.

#### The AI Development Loop

```
1. DESCRIBE -- Tell the AI exactly what you want
2. GENERATE -- Let the AI write the code
3. REVIEW -- Read the code. Does it make sense? Any issues?
4. TEST -- Run it. Click through it. Try to break it.
5. REFINE -- Tell the AI what to fix
6. COMMIT -- Save your progress with a git commit
7. REPEAT -- Move to the next feature
```

#### Worked Example: Building a "Create Project" Feature

Let's walk through building a feature step by step.

**Step 1: DESCRIBE**

In Claude Code:
```
Add a "Create New Project" feature. Here's what I need:

1. A "New Project" button on the dashboard that opens a modal
2. The modal has a form with these fields:
   - Project name (required, text input)
   - Client name (required, text input)
   - Description (optional, textarea)
   - Deadline (optional, date picker)
3. On submit, it saves to the Supabase "projects" table
4. After saving, close the modal and show the new project in the list
5. Show a success toast notification
6. If there's an error, show an error toast

Use shadcn/ui Dialog for the modal, shadcn/ui form components,
React Hook Form + Zod for validation, and sonner for toasts.
```

**Step 2: GENERATE**

Let the AI write all the code. It will likely create or modify:
- A new `CreateProjectDialog` component
- The dashboard page (to add the button and dialog)
- A server action or API route for saving to Supabase
- Zod validation schema
- Database query function

**Step 3: REVIEW**

Before accepting, check:
- Does the form validation make sense?
- Is the Supabase query correct?
- Is there error handling?
- Does it follow your project conventions?

If something looks wrong, ask: "In the CreateProjectDialog component, why are you using a direct fetch call instead of a server action? Change it to use a server action."

**Step 4: TEST**

Run your app and test the feature:
- Does the modal open?
- Does the form validate correctly?
- Does it save to the database?
- Does the success toast show?
- What happens if you submit with empty fields?
- What happens if the database is down (simulate by disconnecting)?

**Step 5: REFINE**

After testing, you'll probably find issues:
```
The create project form works, but:
1. The modal doesn't close after successful submission
2. The project list doesn't refresh -- I have to manually reload the page
3. The date picker doesn't have a minimum date (it should be today or later)
Fix all three issues.
```

**Step 6: COMMIT**
```bash
# Using Claude Code:
/commit

# The AI generates: "Add create project feature with form validation and Supabase integration"
```

#### What to Build Today

Pick the MOST IMPORTANT feature of your project and build it using this loop. Not the flashiest feature. The one that makes your app actually useful.

Examples by project type:
- **Dashboard app:** The main data display (list/grid of items)
- **Blog/CMS:** The post editor
- **E-commerce:** Product listing page
- **Portfolio:** The project showcase section
- **Chat app:** The message sending and display
- **Task tracker:** The task creation and listing

**Day 6 Homework:**
1. Build one core feature using the full AI Development Loop
2. Make at least 3 commits showing your progress
3. Post a short screen recording (30-60 seconds) showing the feature working

---

### Day 7: Week 1 Review and Project Check-in

**Learning Objectives:**
- Review what you've learned about AI tools and prompting
- Get feedback on your project from the mentor and cohort
- Plan your Week 2 goals

**Session: Week 1 Retrospective**

#### Review Questions
1. Which AI tool feels most natural to you? Why?
2. What was the hardest part of building with AI this week?
3. What prompting technique made the biggest difference in code quality?
4. What did the AI get wrong that you had to fix manually?

#### Peer Review (30 minutes)
Share your GitHub repo with two other participants. Each person reviews and provides:
- One thing that looks great
- One thing that could be improved
- One question about how they built it

#### Week 2 Planning
List the features you need to build in Week 2, ordered by priority:
1. [Most critical feature]
2. [Second most critical]
3. [Third]
4. [Nice to have]

This becomes your Week 2 roadmap.

**Week 1 Deliverable:** A GitHub repo with your running scaffold and at least one working feature. Share the repo link and a 1-minute screen recording.

---

## WEEK 2: Build -- Go From Scaffold to Functional Product

> **Theme:** Build out your core features. This is where most of the actual coding happens. AI does the heavy lifting, you direct, review, and iterate.

**Required reading before Week 2:**
- `materials/TROUBLESHOOTING.md` -- You WILL hit errors this week. Read this first so you know how to handle them.
- `materials/SETUP_AND_DEPLOY.md` -- If your project uses Supabase, Stripe, or any external service, read the setup guide for that service before starting.
- `materials/TROUBLESHOOTING.md` -- Skim the Common Issues section for Next.js, npm, and Supabase. You'll probably need them.

---

### Day 8: Design-to-Code Workflows

**Learning Objectives:**
- Turn designs, sketches, and screenshots into working code using AI
- Use Figma-to-code pipelines with MCP
- Use visual references to steer AI output quality

**Session: From Visual to Functional**

You don't need to be a designer to build something that looks good. And if you ARE a designer, you can now turn your designs into code without writing it yourself. Here are four approaches:

#### Approach 1: Figma to Code with MCP

If you have Figma designs, you can connect Figma directly to your AI tools via MCP.

**Setting up Figma MCP in Claude Code:**

1. Get a Figma access token from Figma > Settings > Personal Access Tokens
2. Add to your `.claude/settings.json`:
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token"
      }
    }
  }
}
```
3. In Claude Code, you can now say: "Look at the Figma frame at [Figma URL] and build that component using React and Tailwind"

**Setting up Figma MCP in Cursor:**

1. Go to Cursor Settings > MCP
2. Add a new MCP server with the Figma configuration
3. In Cursor chat, reference Figma frames: "@figma [frame name or URL]"

#### Approach 2: Screenshot to Code

This is the fastest approach and works with any tool. No Figma required.

Steps:
1. Find a website or app that looks like what you want
2. Take a screenshot
3. Paste it into Cursor chat, drop it into Claude Code, or upload to Codex
4. Say: "Recreate this UI using React and Tailwind CSS. Match the layout and spacing as closely as possible. Use [your component library] for the base components."

**Pro tip:** You can screenshot parts of multiple websites and combine them: "Use the navigation style from screenshot 1, the card layout from screenshot 2, and the footer from screenshot 3."

#### Approach 3: Description to Code (No Design Files)

For people without designs who have a clear vision:

```
Build a dashboard page with:
- A left sidebar (240px wide, dark background) with:
  - Logo at top
  - Navigation links: Dashboard, Projects, Tasks, Time Tracking, Invoices
  - User avatar and name at bottom with a logout button
- A top header bar with:
  - Page title on the left
  - Search bar in the center
  - Notification bell and user dropdown on the right
- A main content area with:
  - A row of 4 stat cards (Total Projects, Active Tasks, Hours This Week, Revenue)
  - Below that, a 2-column layout:
    - Left: Recent activity feed
    - Right: Upcoming deadlines list

Use a clean, professional look. White background, subtle borders,
rounded corners. Blue (#2563EB) as the accent color.
```

#### Approach 4: Component Library Approach

Tell the AI which component library to use, and it generates code using those components:

```
Build this page using shadcn/ui components. Use:
- Card for the stat cards
- Table for the data table
- Dialog for the create/edit modals
- Button (variant="default" for primary, variant="outline" for secondary)
- Input and Select for form fields
- Skeleton for loading states

Follow shadcn/ui conventions for theming and variants.
```

**Hands-On Exercise: Build 3 Key Screens (2-3 hours)**

Build the three most important screens of your project:

1. **Screen 1 -- The Main View** (what users see first or most often)
2. **Screen 2 -- A Core Feature View** (the thing that makes your app useful)
3. **Screen 3 -- A Secondary View** (settings, profile, detail page, etc.)

Use whichever design-to-code approach fits your situation. You can mix approaches across screens.

**Day 8 Homework:**
1. Have at least 3 screens/pages built with real UI (not placeholder text everywhere)
2. Screenshots of all 3 screens posted to the cohort channel
3. Commit and push to GitHub

---

### Day 9: Responsive Design and UI Polish Sprint

**Learning Objectives:**
- Make your app look good on mobile, tablet, and desktop
- Add loading states, error states, and empty states
- Use AI to rapidly iterate on visual polish

**Session: Making It Look Real**

A common mistake with AI-built apps: they look fine on desktop but break on mobile. And they're missing the "real app" touches like loading spinners, empty state messages, and smooth transitions.

#### Mobile-First Responsive Prompt

```
Review all pages and components in this project and make sure they are
fully responsive:

Mobile (< 640px):
- Sidebar should be hidden by default, shown via hamburger menu
- Cards should stack vertically (1 column)
- Font sizes should be slightly smaller
- Padding should be reduced
- Tables should be horizontally scrollable

Tablet (640px - 1024px):
- Sidebar can be collapsed (icons only) or hidden
- Cards in 2-column grid
- Full navigation visible

Desktop (> 1024px):
- Full sidebar visible
- Cards in 3 or 4-column grid
- All features visible

Use Tailwind responsive prefixes (sm:, md:, lg:, xl:).
Test by checking that nothing overflows or overlaps at each breakpoint.
```

#### The States Checklist

Every page in your app should handle these states. Give this to the AI:

```
For every page and data-fetching component in this project, make sure
we handle all four states:

1. LOADING: Show a skeleton loader or spinner while data is being fetched.
   Use the Skeleton component from shadcn/ui. Match the layout shape.

2. ERROR: If the data fetch fails, show a friendly error message with a
   "Try Again" button. Don't show raw error messages to users.

3. EMPTY: If the data fetch succeeds but returns no items, show a helpful
   message like "No projects yet. Create your first project to get started."
   Include an illustration or icon and a CTA button.

4. SUCCESS: The normal view with data displayed.

Check every page: dashboard, projects list, tasks list, etc.
```

#### Quick Polish Prompts

Run these one at a time for immediate improvement:

```
"Add subtle hover effects to all clickable elements -- buttons should
scale slightly, cards should get a shadow, links should change color"
```

```
"Add page transitions using CSS transitions -- when navigating between
pages, the content should fade in smoothly (200ms)"
```

```
"Add a toast notification system. Use sonner. Show success toasts for
create/update/delete actions, and error toasts when something fails."
```

```
"Add proper favicon, page titles, and meta descriptions to every page.
The favicon should be a simple emoji or letter matching the app name."
```

**Day 9 Homework:**
1. Every screen should be responsive (test by resizing your browser)
2. Loading and error states added to at least the main data-fetching pages
3. Commit and push

---

### Day 10: Backend and Data -- APIs, Databases, Auth

**Learning Objectives:**
- Set up a real database and authentication using AI
- Create API routes or server actions for CRUD operations
- Connect your frontend to real data

**Session: Building the Backend**

Time to connect your pretty UI to real data. If your project needs a backend (most do), today is the day.

#### Database Setup with Supabase (Recommended)

**Step 1: Create the Supabase project**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy the project URL and anon key
3. Create `.env.local` in your project root:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Step 2: Generate the database schema with AI**

```
Create the Supabase database schema for my project. Here are the tables I need:

1. projects
   - id (uuid, primary key, auto-generated)
   - user_id (uuid, references auth.users, not null)
   - name (text, not null)
   - client_name (text, not null)
   - description (text, nullable)
   - status (text, default 'active', one of: 'active', 'completed', 'archived')
   - deadline (date, nullable)
   - created_at (timestamptz, default now())
   - updated_at (timestamptz, default now())

2. tasks
   - id (uuid, primary key, auto-generated)
   - project_id (uuid, references projects.id, on delete cascade)
   - title (text, not null)
   - description (text, nullable)
   - status (text, default 'todo', one of: 'todo', 'in_progress', 'done')
   - priority (text, default 'medium', one of: 'low', 'medium', 'high')
   - due_date (date, nullable)
   - created_at (timestamptz, default now())

Generate:
1. The SQL migration file
2. Row-level security (RLS) policies so users can only see their own data
3. The TypeScript types matching this schema
4. A Supabase client setup file for Next.js (both server and browser clients)
```

**Step 3: Run the migration**

You can paste the generated SQL directly into the Supabase SQL editor (Dashboard > SQL Editor), or use the Supabase CLI:

```bash
npx supabase init
npx supabase db push
```

#### Authentication

**Using Supabase Auth with Next.js:**

```
Set up Supabase Auth in this Next.js project:

1. Install @supabase/ssr
2. Create middleware.ts that refreshes the auth session on every request
3. Create a login page at /login with email/password and Google OAuth
4. Create a signup page at /signup with email/password
5. Add a protected layout that redirects to /login if not authenticated
6. Add a logout button in the sidebar
7. Create an auth context/hook that provides the current user

Use Supabase's PKCE auth flow for security. Follow the official
Supabase + Next.js App Router guide pattern.
```

#### API Routes / Server Actions

For Next.js projects, you can use Server Actions (recommended) or API routes:

**Server Actions approach (simpler):**
```
Create server actions for the projects feature:

1. createProject(formData) -- validates with Zod, inserts into Supabase, revalidates the path
2. updateProject(id, formData) -- validates, updates in Supabase, revalidates
3. deleteProject(id) -- deletes from Supabase, revalidates
4. getProjects() -- fetches all projects for the current user

Put these in src/app/actions/projects.ts
Use the Supabase server client for all database operations.
Add proper error handling -- return { error: string } on failure.
```

**API Routes approach (when you need it):**
```
Create API routes for the projects feature:

POST   /api/projects      -- Create a new project
GET    /api/projects      -- List all projects for the authenticated user
GET    /api/projects/[id] -- Get a single project
PUT    /api/projects/[id] -- Update a project
DELETE /api/projects/[id] -- Delete a project

Each route should:
- Check that the user is authenticated
- Validate input with Zod
- Use Supabase server client for database operations
- Return proper status codes (201 for create, 200 for success, 400 for bad input, 401 for unauthorized, 404 for not found)
- Include error messages in the response body
```

#### Connecting Frontend to Backend

```
Connect the projects page to real data:

1. The projects list page should fetch projects from Supabase using a server component
2. The create project dialog should call the createProject server action on submit
3. After creating a project, the list should update without a full page reload
4. The delete button on each project card should call deleteProject with a confirmation dialog first
5. Loading state: show skeleton cards while projects are loading
6. Empty state: show "No projects yet" with a "Create your first project" button
7. Error state: show a friendly error message with a retry button
```

**Day 10 Homework:**
1. Database schema created and migrated in Supabase (or your chosen backend)
2. Authentication working (login, signup, logout, protected routes)
3. At least one CRUD feature connected to real data (create + list at minimum)
4. Commit and push

---

### Day 11: The Backend Sprint Continues

**Learning Objectives:**
- Complete all core CRUD operations
- Handle file uploads if your project needs them
- Wire up all remaining frontend pages to real data

**Session: Finishing the Backend**

Continue where yesterday left off. By the end of today, every page in your app should be connected to real data.

#### Common Backend Patterns You Might Need

**File Uploads (images, documents):**
```
Add image upload to the project creation form:
1. Use Supabase Storage to store uploaded files
2. Create a "project-images" bucket in Supabase
3. Add an image upload field to the create project form
4. Show a preview of the selected image before upload
5. On form submit, upload the image first, get the URL, then save the project with the image URL
6. Display the project image on the project card
7. Limit file size to 5MB, accept only .jpg, .png, .webp
```

**Search and Filtering:**
```
Add search and filtering to the projects list:
1. A search bar that filters projects by name (client-side filter is fine for now)
2. A status dropdown filter: All, Active, Completed, Archived
3. A sort dropdown: Newest first, Oldest first, Name A-Z, Deadline soonest
4. The URL should update with query params (?status=active&sort=newest) so the
   filter state is shareable and persists on refresh
```

**Pagination:**
```
Add pagination to the projects list:
1. Show 12 projects per page
2. Add "Previous" and "Next" buttons at the bottom
3. Show the current page number and total pages
4. Use cursor-based pagination with Supabase for performance
5. Update the URL with ?page=2 so pagination state persists on refresh
```

**Day 11 Homework:**
1. All core data operations working (CRUD for all main entities)
2. All pages connected to real data (no more dummy/placeholder data)
3. At least one search, filter, or sort feature working
4. Commit and push

---

### Day 12-13: Feature Building Sprint

**Learning Objectives:**
- Build 2-3 additional features using the AI Development Loop
- Handle complex features that span multiple files
- Learn to break big features into smaller, buildable pieces

**Session: The Feature Sprint**

These two days are pure building time. Pick 2-3 features from your project roadmap and build them using the development loop. The mentor is available for help, but the goal is for you to work independently using your AI tools.

#### Feature Breaking Strategy

Big features are hard for AI (and humans). Break them down:

**Bad:** "Add a complete invoicing system"

**Good:**
1. First: "Create the invoice data model (database table) with fields for: invoice number, project id, line items (as JSON), total amount, status (draft/sent/paid), due date, created date"
2. Then: "Build the invoice list page showing all invoices with status badges, sorted by date"
3. Then: "Build the create invoice form that lets you select a project, add line items with description and amount, and see a running total"
4. Then: "Build the invoice detail/preview page that shows the invoice in a printable format"
5. Then: "Add the ability to mark an invoice as sent or paid"
6. Finally: "Add a PDF export button using @react-pdf/renderer"

Each of these is one prompt. One commit. One testable piece. This is how you build complex features with AI: break them into pieces that fit in one conversation turn.

#### Tips for the Feature Sprint

1. **One feature per conversation.** Don't try to build three features in one Claude Code session. Start a new session for each feature to keep the context clean.

2. **Commit after each feature.** Don't build three things and then commit. Commit after each one. This way if something breaks, you can rollback to the last working state.

3. **Test before moving on.** Click through the feature. Try to break it. Enter weird data. Resize your browser. Only move to the next feature when this one works.

4. **Use Claude Code for multi-file features, Cursor for single-file tweaks.** Claude Code excels at features that touch many files (new page + API route + database query + component). Cursor's inline edit (Cmd+K) is faster for tweaking one file.

#### Example Feature Prompts for Common Project Types

**For a SaaS dashboard:**
```
Add a notifications system:
1. Create a notifications table in Supabase (id, user_id, title, message, read, created_at)
2. Add a bell icon in the header that shows a count of unread notifications
3. Clicking the bell opens a dropdown showing the 10 most recent notifications
4. Each notification has a "mark as read" button
5. Add a "Mark all as read" link at the top
6. When a new project is created, generate a notification for the user
```

**For a portfolio site:**
```
Add a blog section:
1. Create a new page at /blog that lists blog posts
2. Create individual blog post pages at /blog/[slug]
3. Use MDX files in a /content/blog directory for the actual posts
4. Each post has: title, date, description, tags, and the content body
5. The blog list page shows posts sorted by date with title, description, date, and tags
6. Add a tag filter at the top of the blog list
7. Style the blog content with good typography (prose class from Tailwind Typography plugin)
```

**For a Chrome extension:**
```
Add the popup UI:
1. Create popup.html with a clean modern design using Tailwind (CDN)
2. Show the current tab's URL and title at the top
3. Add a "Summarize" button that sends the page content to the AI
4. Show a loading spinner while waiting
5. Display the summary in a nice readable format
6. Add a "Copy" button to copy the summary to clipboard
7. Store the last 5 summaries in Chrome storage and show them in a "History" tab
```

**Day 12-13 Homework:**
1. At least 2-3 new features built and working
2. Each feature committed separately with a descriptive commit message
3. Updated CLAUDE.md / .cursor/rules/ with any new conventions or structure changes
4. Post a 2-minute screen recording demoing all your working features

---

### Day 14: Week 2 Review and Milestone Check

**Learning Objectives:**
- Assess your project progress against the Week 2 milestone
- Identify and fix any blocking issues
- Plan Week 3 priorities

**Session: Milestone 2 Check-in**

#### Project Milestone 2 Checklist

- [ ] Core UI screens built and styled (at least 3-4 main pages)
- [ ] Backend working (database, auth, core API routes/server actions)
- [ ] Frontend connected to real data on all pages
- [ ] At least 3-4 core features fully functional
- [ ] App runs locally without errors
- [ ] All code pushed to GitHub with clean commit history
- [ ] CLAUDE.md / cursor rules updated to reflect current project state

#### Fixing Bugs with AI

If you have bugs, now is the time to fix them. Use this pattern:

```
I'm having a bug. Here's what happens:

1. I go to the projects page
2. I click "Create New Project"
3. I fill in the form and click Submit
4. The modal closes but the project doesn't appear in the list
5. If I refresh the page, the project IS there

Expected: The project should appear in the list immediately after creation
without needing to refresh.

The relevant files are:
- src/app/dashboard/projects/page.tsx (the projects list page)
- src/components/features/CreateProjectDialog.tsx (the form modal)
- src/app/actions/projects.ts (the server actions)

Fix this bug.
```

**Week 2 Deliverable:** Screen recording (2-3 min) demoing all your working features. This should show a real app with real data, not dummy content.

---

## WEEK 3: Polish and Expand -- Make It Production-Ready

> **Theme:** Go beyond "it works" to "it's good." Polish the UI, handle edge cases, optimize, and add features that make your project stand out.

**Required reading before Week 3:**
- `materials/STUDENT_HANDBOOK.md` (Part 2: Scope Cutting) -- If you're behind, read this NOW. It'll help you cut smartly and still ship something great.
- `materials/QUICK_WINS.md` -- 18 small additions (5-15 min each) that make any project look 10x more polished. Pick 5-8 to add this week.
- `materials/TROUBLESHOOTING.md` (Part 2: When You're Stuck) -- If you've been stuck on something for more than 15 minutes, follow the unstuck ladder.

**Week 3 Reality Check:**
Before starting Week 3, answer honestly:
- [ ] Is my core feature working? (If no, focus on that. Skip polish.)
- [ ] Can I demo the main workflow end-to-end? (If no, that's your priority.)
- [ ] Am I on track to deploy by end of Week 4? (If no, read the Scope Cutting Guide.)

If you checked all three, you're in great shape. Time to polish. If not, cut scope first, then polish what remains.

---

### Day 15: UI/UX Polish Day

**Learning Objectives:**
- Level up your UI from "prototype" to "product"
- Add micro-interactions and animations
- Create consistent visual patterns across your app

**Session: From Prototype to Polished Product**

Your app works. But does it FEEL good to use? Today we focus on the details that separate a prototype from a product.

#### The Polish Checklist

Give this to your AI tool and work through it:

```
Review the entire project and add the following polish. Go through each
item one at a time:

1. RESPONSIVE DESIGN
   - Every page works on mobile (375px), tablet (768px), and desktop (1280px)
   - No horizontal scrolling on any screen size
   - Touch targets are at least 44x44px on mobile

2. LOADING STATES
   - Every page that fetches data has a skeleton loader
   - Buttons show a spinner when their action is processing
   - Forms disable their submit button while submitting

3. ERROR STATES
   - Every data fetch has error handling with a user-friendly message
   - Form validation errors show inline under the relevant field
   - Network errors show a "Something went wrong. Try again." message

4. EMPTY STATES
   - Every list/grid has an empty state message when there are no items
   - Empty states include an icon/illustration and a CTA to create the first item

5. TRANSITIONS AND ANIMATIONS
   - Page transitions: content fades in on route change (200ms)
   - Modal/dialog: slides up and fades in on open (200ms)
   - List items: subtle fade-in when they appear
   - Buttons: slight scale on hover (scale-105)
   - Cards: shadow elevation increase on hover

6. DARK MODE (optional but impressive)
   - Toggle in the header or settings
   - Persists in localStorage
   - All colors adapt properly
   - No jarring white flashes on route change

7. CONSISTENT DESIGN
   - Same border-radius everywhere (use rounded-lg consistently)
   - Same shadow values (shadow-sm for cards, shadow-lg for modals)
   - Same spacing scale (p-4 for card padding, gap-4 for grids, gap-6 for sections)
   - Same font sizes for the same types of content

8. META AND BRANDING
   - Proper page titles for every route
   - Favicon that matches the app
   - Open Graph meta tags for social sharing
   - Proper 404 page
```

Work through these one at a time. Don't try to do all of them in one prompt. Each item is one conversation turn.

#### Animation with Framer Motion

If you want more advanced animations:

```bash
npm install framer-motion
```

Then ask the AI:
```
Add Framer Motion animations to the dashboard:
1. The stat cards should stagger in from below when the page loads (each card delayed by 50ms)
2. List items should animate in one by one
3. Page transitions should have a subtle fade and slide effect
4. The sidebar should animate open/close on mobile

Use framer-motion. Don't overdo it -- keep animations subtle and fast (under 300ms).
```

**Day 15 Homework:**
1. Work through the Polish Checklist (at least items 1-5)
2. Screenshots before/after posted in the cohort channel
3. Commit and push

---

### Day 16: Testing and Error Handling

**Learning Objectives:**
- Use AI to write tests for your critical features
- Add proper error handling throughout the app
- Handle edge cases that could crash your app

**Session: Bulletproofing Your App**

Your app works when everything goes right. But what about when things go wrong? Users will find the edge cases. Let's find them first.

#### AI-Generated Tests

**Using Claude Code:**
```bash
claude "Write tests for the projects feature. Include:

1. Unit tests for the project validation schema (Zod):
   - Valid input should pass
   - Missing required fields should fail
   - Invalid status values should fail

2. Component tests for CreateProjectDialog:
   - Renders the form correctly
   - Shows validation errors for empty required fields
   - Calls the submit handler with correct data
   - Shows loading state while submitting

3. Server action tests for createProject:
   - Creates a project successfully with valid input
   - Returns error for invalid input
   - Returns error for unauthenticated users

Use Vitest for the test runner and React Testing Library for component tests.
Create a test setup file if one doesn't exist."
```

**Using Cursor:**
1. Open a component file
2. Press Cmd+L to open chat
3. Type: "Write tests for this component. Cover the happy path, validation errors, loading state, and error handling. Use Vitest and React Testing Library."

#### Error Handling Patterns

```
Add proper error handling throughout the app:

1. API/Server Action errors:
   - Wrap all database operations in try/catch
   - Return typed error objects, never throw raw errors
   - Log errors server-side with enough context to debug

2. Frontend error handling:
   - Add an error boundary component at the app layout level
   - When a server action fails, show the error in a toast
   - When a page fails to load, show a friendly error page with a "Go Home" button

3. Form error handling:
   - Server-side validation errors should map to specific form fields
   - Network errors should show a generic "Could not save. Please try again."
   - Prevent double-submission by disabling the button during submit

4. Auth error handling:
   - Expired sessions should redirect to login with a "Session expired" message
   - Unauthorized access should redirect to login
   - OAuth errors should show a friendly message
```

#### Edge Cases to Test

Go through your app and test these:
- What happens with very long text inputs? (Does it overflow?)
- What happens with special characters in names? (Emoji, quotes, HTML)
- What happens if you double-click the submit button fast?
- What happens if you navigate away during a save operation?
- What happens on a slow network? (Use Chrome DevTools to throttle)
- What happens if JavaScript is slow to load? (Does the page flash?)

For each bug you find, tell the AI: "I found a bug: [description]. Fix it."

**Day 16 Homework:**
1. Tests written for at least your most critical feature
2. Error handling added to all server actions and data fetching
3. At least 3 edge case bugs found and fixed
4. Commit and push

---

### Day 17-18: Advanced Features and Integrations

**Learning Objectives:**
- Add a "wow" feature to your project using AI
- Integrate with external services (Stripe, email, analytics, AI APIs)
- Build features that use AI inside your product

**Session: Level Up Your Product**

These two days are about adding features that make your project stand out. Pick ONE from each category that makes sense for your project.

#### Category 1: AI-Powered Features (Using AI Inside Your App)

Yes, you can use AI to build features that themselves use AI. Here are patterns:

**AI-Powered Search:**
```
Add semantic search to the app:
1. When a user creates content (project, task, etc.), generate an embedding
   using OpenAI's text-embedding-3-small model
2. Store embeddings in Supabase using the pgvector extension
3. Add a search bar that converts the user's query to an embedding and
   finds the most similar content
4. This lets users search with natural language like "that project for the
   restaurant client" instead of exact keyword matching
```

**AI Content Generation:**
```
Add an AI writing assistant:
1. Add a "Generate with AI" button next to text fields (descriptions, etc.)
2. When clicked, open a small dialog asking "What should this say?"
3. Send the user's input to the Anthropic API (Claude) with context about
   the project
4. Stream the response back and fill in the text field
5. User can accept, regenerate, or edit the result

Use the Anthropic SDK. Put the API key in an environment variable.
Call the API from a server action, not from the browser.
```

**AI Chatbot:**
```
Add a help chatbot:
1. A floating chat button in the bottom-right corner
2. Opens a chat panel where users can ask questions
3. The chatbot uses the Claude API with a system prompt that knows about
   your app's features
4. Stream responses for a real-time feel
5. Store chat history in localStorage so it persists between page loads
```

#### Category 2: Third-Party Integrations

**Stripe Payments:**
```
Add Stripe subscription payments:
1. Create a pricing page with two plans: Free and Pro ($12/month)
2. Use Stripe Checkout for the payment flow
3. Create a webhook handler at /api/webhooks/stripe that listens for:
   - checkout.session.completed (activate subscription)
   - customer.subscription.deleted (deactivate subscription)
4. Store the subscription status in the user's profile in Supabase
5. Gate premium features behind a subscription check
6. Add a "Manage Subscription" link that opens the Stripe Customer Portal

Use the stripe npm package. Store STRIPE_SECRET_KEY and
STRIPE_WEBHOOK_SECRET in environment variables.
```

**Email Notifications (Resend):**
```
Add email notifications using Resend:
1. Install the resend package
2. Create email templates using React Email:
   - Welcome email (sent on signup)
   - Project deadline reminder (sent 1 day before deadline)
   - Weekly summary (sent every Monday)
3. Create server-side functions to send each email type
4. Trigger the welcome email from the signup flow
5. Set up a cron job (Vercel Cron) for deadline reminders and weekly summaries

Use RESEND_API_KEY from environment variables.
```

**Analytics (PostHog):**
```
Add analytics tracking with PostHog:
1. Install posthog-js
2. Initialize PostHog in the app layout
3. Track these events:
   - User signed up
   - User created a project
   - User completed a task
   - User generated an invoice
4. Add a simple analytics dashboard page that shows:
   - Total users (from Supabase)
   - Projects created this week
   - Tasks completed this week
```

#### Category 3: Platform-Specific Features

**For Chrome Extensions:**
```
Add a keyboard shortcut (Ctrl+Shift+S) that:
1. Captures the selected text on any webpage
2. Sends it to the extension's background script
3. The background script calls an AI API to summarize it
4. Shows the summary in a clean notification or popup
```

**For Figma Plugins:**
```
Add a "Generate Color Palette" feature:
1. User enters a primary color hex code
2. The plugin generates a full color palette (50-950 shades)
3. Creates color swatches on the Figma canvas
4. Also creates a color styles set in the Figma file
```

**Day 17-18 Homework:**
1. At least one "wow" feature added (AI feature, integration, or advanced functionality)
2. The feature is fully working and tested
3. Updated your CLAUDE.md / cursor rules if you added new dependencies or patterns
4. Commit and push

---

### Day 19-20: Performance and Optimization

**Learning Objectives:**
- Optimize your app for production performance
- Fix common performance issues in Next.js apps
- Prepare your codebase for deployment

**Session: Getting Production-Ready**

Before we deploy, let's make sure your app is fast and clean.

#### Performance Audit Prompt

```
Audit this project for performance issues and fix them:

1. IMAGES
   - Use next/image for all images (lazy loading, sizing, format optimization)
   - Add width and height to prevent layout shift
   - Use WebP format where possible

2. DATA FETCHING
   - Server components should fetch data at the page level, not deep in components
   - Add proper caching with revalidate times where appropriate
   - Use Suspense boundaries for parallel data loading

3. BUNDLE SIZE
   - Check for unnecessarily large dependencies
   - Use dynamic imports (next/dynamic) for heavy components that aren't above the fold
   - Make sure shadcn/ui components are tree-shaken properly

4. RENDERING
   - "use client" should only be on components that actually need interactivity
   - Move state management as close to the leaf components as possible
   - Memoize expensive computations

5. SEO AND META
   - Add metadata export to every page
   - Add proper Open Graph tags for social sharing
   - Create a sitemap.xml
   - Add robots.txt
```

#### Security Audit Prompt

```
Audit this project for security issues:

1. All API keys and secrets are in environment variables, not in code
2. SQL injection: All database queries use parameterized inputs (Supabase does this by default)
3. XSS: User-generated content is properly escaped before rendering
4. CSRF: Forms use proper tokens (Next.js Server Actions handle this)
5. Auth: All protected routes check for authentication
6. RLS: Supabase Row Level Security is enabled on all tables
7. Input validation: All inputs are validated with Zod before processing
8. Rate limiting: API routes have basic rate limiting (optional)
9. CORS: Proper CORS headers are set (Vercel handles this for same-origin)
10. No sensitive data in client-side code or browser console
```

#### Code Cleanup Prompt

```
Clean up the codebase:
1. Remove all console.log statements (except in error handlers)
2. Remove any commented-out code
3. Remove unused imports
4. Remove unused variables and functions
5. Make sure all TypeScript types are correct (no "any" types remaining)
6. Standardize file naming (all kebab-case)
7. Add missing "use client" directives where needed
8. Remove duplicate code -- extract shared logic into utility functions
```

**Day 19-20 Homework:**
1. Run through the performance audit and fix at least the top 3 issues
2. Run through the security audit and fix any issues found
3. Clean up the codebase
4. Commit and push

---

### Day 21: Week 3 Review and Final Feature Push

**Learning Objectives:**
- Complete any remaining features
- Fix any remaining bugs
- Prepare for deployment

#### Project Milestone 3 Checklist

- [ ] UI polished (responsive, loading/error/empty states, transitions)
- [ ] All core features complete and working with real data
- [ ] Error handling in place for all user-facing operations
- [ ] At least one "wow" feature (AI feature, animation, integration)
- [ ] Tests written for critical paths
- [ ] No console errors or warnings
- [ ] Performance audit completed
- [ ] Security audit completed
- [ ] Code cleaned up (no leftover console.logs, unused code, etc.)

**Week 3 Deliverable:** Updated screen recording showing the polished product with all features working.

---

## WEEK 4: Ship It -- Deploy, Present, and Launch

> **Theme:** Get your project live on the internet, document it, prepare your presentation, and launch to the world.

**Required reading before Week 4:**
- `materials/SETUP_AND_DEPLOY.md` -- Step-by-step deployment instructions for Vercel, Netlify, Railway, Cloudflare Workers, Chrome Web Store, and Figma plugins.
- `materials/SETUP_AND_DEPLOY.md` (the "Vercel" section) -- You'll need to add all your env variables to Vercel's dashboard.
- `materials/STUDENT_HANDBOOK.md` (the "Ship It Checklist") -- Make sure you can check every box before Demo Day.

---

### Day 22: Deployment Day

**Learning Objectives:**
- Deploy your project to production
- Set up environment variables and production configuration
- Verify everything works in production

**Session: Going Live**

Today your project goes from localhost to the real internet.

#### Deployment with Vercel (Recommended for Next.js)

**Step 1: Prepare for deployment**

Tell your AI tool:
```
Prepare this project for production deployment on Vercel:
1. Make sure the build succeeds: run "npm run build" and fix any errors
2. List all environment variables that need to be set in Vercel
3. Make sure there are no hardcoded localhost URLs
4. Add a proper production error page (error.tsx at the app root)
5. Add a proper 404 page (not-found.tsx at the app root)
6. Update the metadata in layout.tsx with the real app name and description
7. Make sure all images have proper sizes and alt text
```

**Step 2: Deploy**

Option A: Via Vercel CLI
```bash
npm install -g vercel
vercel
# Follow the prompts
# When asked about environment variables, set them
```

Option B: Via GitHub integration (recommended)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Add your environment variables in the Vercel dashboard
5. Click "Deploy"

**Step 3: Set up environment variables**

In the Vercel dashboard, go to Settings > Environment Variables and add:
```
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key
STRIPE_SECRET_KEY=your-stripe-key (if using Stripe)
RESEND_API_KEY=your-resend-key (if using email)
```

**Step 4: Test in production**

After deployment, go through your app on the production URL:
- [ ] Login/signup works
- [ ] Can create, read, update, delete data
- [ ] Images load correctly
- [ ] No console errors
- [ ] Works on mobile (test on your actual phone)
- [ ] All environment-dependent features work (email, payments, etc.)

#### Deployment Options by Project Type

| Project Type | Recommended Host | Notes |
|---|---|---|
| Next.js app | Vercel | Best integration, free tier is generous |
| Static site | Vercel, Netlify, or Cloudflare Pages | All free, all fast |
| Full-stack with custom backend | Railway or Fly.io | For non-Next.js backends |
| Chrome Extension | Chrome Web Store | Requires a $5 developer account |
| Figma Plugin | Figma Plugin Hub | Free to publish |
| API only | Railway, Render, or Fly.io | For standalone APIs |

#### Custom Domain (Optional)

If you have a custom domain:
```
1. In Vercel, go to Settings > Domains
2. Add your domain
3. Update your DNS records as instructed by Vercel
4. Wait for SSL certificate (usually under 5 minutes)
```

If you don't have a domain, the `.vercel.app` subdomain is perfectly fine for a portfolio project.

**Day 22 Homework:**
1. Project deployed and accessible via a public URL
2. All features tested on the production URL
3. Share your live URL in the cohort channel

---

### Day 23: Documentation and Portfolio Prep

**Learning Objectives:**
- Document your project for your portfolio
- Write a project case study
- Create a README that makes people want to try your project

**Session: Tell Your Story**

Your project is live. Now you need to document it so other people (employers, clients, collaborators) understand what you built and how.

#### Generate a Professional README

```
Generate a professional README.md for this project. Include:

1. Project name and one-line description
2. A screenshot or GIF of the app (placeholder for now)
3. "Features" section listing key features with brief descriptions
4. "Tech Stack" section listing all technologies used
5. "Getting Started" section with:
   - Prerequisites
   - Installation steps
   - Environment variables needed (without actual values)
   - How to run locally
6. "Architecture" section briefly explaining the project structure
7. "Deployment" section explaining how it's deployed
8. "Acknowledgments" section mentioning Ship With AI by @darasoba

Format it cleanly with proper markdown. Keep it concise but informative.
Don't use fluffy language -- just the facts.
```

#### Write a Case Study

This is for your portfolio. Ask the AI to help you draft it, then edit it in your own voice:

```
Help me write a case study for my portfolio about this project. Structure:

1. THE PROBLEM (2-3 sentences)
   What problem does this solve? Who has this problem?

2. THE SOLUTION (2-3 sentences)
   What did you build? What are the key features?

3. THE PROCESS (1 paragraph)
   How did you build it? Which AI tools did you use?
   What was your workflow?

4. TECHNICAL HIGHLIGHTS (bullet points)
   What are the interesting technical decisions?
   What was the hardest part to build?

5. RESULTS (2-3 sentences)
   What's the current state? Any users or traction?
   What would you build next?

Keep it under 500 words. Write in first person. Be specific about the
AI tools and how you used them -- this is a selling point.
```

#### Take Good Screenshots

Your README and portfolio need screenshots. Tips:
- Use a clean browser window (hide bookmarks bar, use incognito)
- Show the app with real-looking data (not "test" and "asdf")
- Capture key screens: the main view, a feature in action, mobile view
- Use a tool like [screely.com](https://screely.com) to add a browser frame mockup

**Day 23 Homework:**
1. Professional README.md in your repo
2. Case study written (save as CASE_STUDY.md or in your portfolio site)
3. At least 3 good screenshots/GIFs of your app
4. Commit and push

---

### Day 24-25: Demo Video and Presentation Prep

**Learning Objectives:**
- Record a compelling demo video of your project
- Prepare a 5-minute Demo Day presentation
- Practice presenting your project confidently

**Session: Preparing Your Demo**

#### Demo Video (3-5 minutes)

Record a screen recording showing your app in action. Structure:

1. **The Hook (15 seconds):** "I built [app name] -- it's a [one-line description]"
2. **The Problem (30 seconds):** Show the problem your app solves
3. **The Demo (2-3 minutes):** Walk through the key features. Actually use the app -- create data, click buttons, show real functionality
4. **Technical Highlight (30 seconds):** Show one impressive technical thing (AI feature, real-time updates, etc.)
5. **The Close (15 seconds):** "Built in 4 weeks with AI tools as part of Ship With AI by @darasoba"

**Recording Tools:**
- Loom (free, easy screen recording with camera)
- OBS Studio (free, more control)
- QuickTime Player (Mac built-in screen recording)
- Cursor has a built-in sharing feature for recordings

**Tips:**
- Practice once before recording
- Use real data, not test data
- Keep your mouse movements deliberate (don't flail around)
- Narrate what you're doing as you do it
- Record at 1080p or higher

#### Demo Script

Ask the AI to help you write a script:
```
Write a 5-minute demo script for my project [name]. The app does [description].

Key features to show:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]
4. [Feature 4]

Structure: Hook, Problem, Demo walkthrough, Technical highlight, Close.
Include specific click-by-click instructions so I know exactly what to
show and when. Mark approximate timestamps.
```

#### Demo Day Presentation (5 minutes, live)

| Section | Time | What to Cover |
|---|---|---|
| The Problem | 30 sec | What you set out to build and why |
| The Product | 2 min | Live demo of your working product |
| The Process | 1.5 min | How you used AI tools. What worked, what surprised you. |
| The Lessons | 1 min | What you learned about building with AI |

**Day 24-25 Homework:**
1. Demo video recorded (3-5 minutes)
2. Demo Day presentation prepared (slides optional, live demo required)
3. Practiced the presentation at least twice

---

### Day 26: Peer Review Day

**Learning Objectives:**
- Give and receive constructive feedback on projects
- Learn from how others used AI tools differently
- Improve your project based on peer feedback

**Session: Peer Review Workshop**

Each participant reviews 2-3 other projects. Use this framework:

#### Peer Review Template

**Project:** [Name]
**Builder:** [Name]

**Functionality (1-5):** Does it work? Can you complete the core user flow?

**Design (1-5):** Is it visually polished? Does it feel professional?

**Best Feature:** What impressed you most?

**One Bug:** Did you find any bug? (Describe steps to reproduce)

**One Improvement:** What's one specific thing that would make it better?

**AI Tool Usage:** What's interesting about how they used AI to build it?

#### After Receiving Feedback

Spend 1-2 hours fixing the most critical feedback:
1. Fix any bugs that were found
2. Address the most common improvement suggestion
3. Commit, push, and redeploy

**Day 26 Homework:**
1. Complete peer reviews for 2-3 projects
2. Fix top feedback issues in your own project
3. Redeploy with fixes

---

### Day 27: Final Polish and Launch Prep

**Learning Objectives:**
- Make final fixes and improvements
- Prepare for Demo Day
- Set up any last-minute features

**Session: Final Sprint**

This is your last day to make changes. Focus on:

1. **Fix any remaining bugs** from peer review
2. **Final visual polish** (check on mobile one more time)
3. **Update your README** with the final screenshot
4. **Test the production deployment** one more time
5. **Practice your Demo Day presentation** one more time

#### Launch Checklist

```
Final launch checklist -- verify each item:
- [ ] Production URL works and loads fast
- [ ] All features work on the production URL
- [ ] Mobile experience is good
- [ ] No console errors in production
- [ ] README is complete with screenshots
- [ ] GitHub repo is public
- [ ] Demo video is uploaded (Loom, YouTube, etc.)
- [ ] Case study is written
- [ ] Presentation is prepared for Demo Day
```

---

### Day 28: Demo Day and Graduation

**The Final Event**

Each participant presents their project (5 minutes) to the cohort.

#### Demo Day Schedule
1. Each person presents (5 min presentation + 2 min Q&A)
2. Peer voting during presentations
3. Mentor feedback and awards

#### Cohort Awards
- **Best Product** -- Most useful and well-built
- **Best Design** -- Most polished and beautiful
- **Best Use of AI** -- Most creative use of AI tools
- **Most Ambitious** -- Biggest scope and execution
- **People's Choice** -- Voted by the cohort

#### What You Leave With

1. A **deployed, working product** on a public URL
2. A **GitHub repo** with clean code and documentation
3. A **demo video** for your portfolio
4. A **case study** telling the story of how you built it
5. The **skill to build with AI tools** -- which you'll use for the rest of your career
6. A **cohort network** of other builders

#### After the Program

- Keep building. The tools you've learned will keep getting better.
- Share your project on X (Twitter) and tag @darasoba
- Join the alumni community for ongoing support
- Consider mentoring in the next cohort

---

## Tool Deep Dives -- Quick Reference

### Claude Code Cheat Sheet

| Command / Feature | What It Does |
|---|---|
| `claude` | Start an interactive session |
| `claude "prompt"` | Run a one-shot command |
| `claude -c` | Continue the last conversation |
| `claude -r SESSION_ID` | Resume a specific session |
| `claude --model sonnet` | Use Sonnet (faster, cheaper) |
| `claude --model opus` | Use Opus (smarter, more expensive) |
| `claude --add-dir ../other` | Give access to another directory |
| `CLAUDE.md` | Project instructions (auto-read every session) |
| `/init` | Generate a starter CLAUDE.md |
| `/commit` | Create a git commit with AI message |
| `/review` | Review recent code changes |
| `/compact` | Summarize conversation to save context |
| `/cost` | Show session cost |
| `/clear` | Clear conversation history |
| Hooks | Shell commands triggered on events (PreToolUse, PostToolUse, etc.) |
| MCP | Connect to external tools (Figma, databases, browsers) |
| Sub-agents | Specialized workers for complex tasks |
| Skills | Reusable instruction folders Claude loads when relevant |
| Agent Teams | Multiple Claude sessions coordinating with shared tasks (experimental) |

**Power Tips:**
- CLAUDE.md is your project's memory. Update it as your project evolves.
- Use `/compact` when the conversation gets long to free up context space.
- For large features, give Claude a numbered step-by-step plan.
- Claude Code reads images. Paste screenshots for UI bugs.
- Use hooks to enforce rules (like running lint before every commit).

---

### Cursor Cheat Sheet

| Shortcut / Feature | What It Does |
|---|---|
| `Tab` | Accept AI autocomplete |
| `Cmd+K` | Inline edit (select code, describe change) |
| `Cmd+L` | Open AI chat panel |
| `Cmd+I` | Open Composer (multi-file agent mode) |
| `.cursor/rules/*.mdc` | Project rules files (replaces old .cursorrules) |
| `@file` | Reference a file in chat |
| `@docs` | Reference documentation |
| `@web` | Search the web for context |
| `@codebase` | Search your entire codebase |
| Agent Mode | Autonomous multi-file editing in Composer |
| Background Agents | Run tasks in the cloud with `&` prefix |
| Memories | Cursor remembers facts across sessions |
| MCP | Connect to external tools |
| BugBot | Automated PR code review |
| Plan Mode | Design before coding in Cursor CLI |

**Power Tips:**
- `.cursor/rules/` with `.mdc` files is the new way to configure rules (the old `.cursorrules` still works but is deprecated).
- Use `@docs` to reference library documentation for accurate code.
- Background Agents let you work on multiple things at once.
- Use Agent Mode (Composer) for anything that touches more than one file.

---

### OpenAI Codex Cheat Sheet

| Feature | What It Does |
|---|---|
| Chat interface | Describe tasks in plain English |
| GitHub integration | Connect repos, create branches, open PRs |
| Cloud sandbox | Runs code in a secure cloud environment |
| Parallel tasks | Run 3-4 coding tasks simultaneously |
| AGENTS.md | Project instructions file (like CLAUDE.md) |
| Real-time steering | Give feedback while the agent is working |
| MCP support | Connect to external tools and context |
| GPT-5.3-Codex | Latest and most capable coding model |

**Power Tips:**
- Codex runs in the cloud. No local setup needed.
- Run parallel tasks for independent features to save time.
- Use AGENTS.md to give Codex context about your project.
- You can steer Codex while it's working by sending messages mid-task.

---

### Supplementary Tools Quick Reference

| Tool | Best For | URL |
|---|---|---|
| Windsurf | Alternative AI IDE with Cascade deep-context AI | [windsurf.com](https://windsurf.com) |
| Bolt.new | Browser-based full-stack prototyping, no local setup | [bolt.new](https://bolt.new) |
| Lovable | Beautiful UI generation, fast full-stack apps | [lovable.dev](https://lovable.dev) |
| v0 | React/Next.js component generation with shadcn/ui | [v0.dev](https://v0.dev) |
| Replit Agent | Most autonomous, 30+ integrations, cloud-based | [replit.com](https://replit.com) |

---

## Prompt Library -- Templates You Can Copy and Use

### Scaffold a New Project
```
Create a new [framework] project with:
- Language: [TypeScript/JavaScript]
- Styling: [Tailwind CSS / CSS Modules / styled-components]
- UI Library: [shadcn/ui / Radix / Material UI / none]
- Database: [Supabase / Firebase / Prisma+PostgreSQL / none]
- Auth: [Supabase Auth / NextAuth / Clerk / none]
- Deployment target: [Vercel / Netlify / Railway]

Set up the project structure, install dependencies, and create a basic
layout with [describe layout: sidebar + header, simple navbar, etc.].
Get it running on localhost.
```

### Add a CRUD Feature
```
Add [feature name] with full CRUD operations:

Data model:
- [field 1]: [type, required/optional]
- [field 2]: [type, required/optional]

Pages needed:
- List page at [/path] showing all items in a [table/grid/list]
- Detail page at [/path/[id]] showing a single item
- Create form (modal or page)
- Edit form (modal or page)
- Delete with confirmation dialog

Include: Zod validation, loading states, error handling, empty state,
toast notifications for success/error.
```

### Debug an Error
```
I'm getting this error:

[paste the full error message]

It happens when I [describe what you were doing].
The relevant code is in [file path].
Here's what I expect to happen: [expected behavior].
Here's what actually happens: [actual behavior].

Fix this error.
```

### Refactor Code
```
Refactor [file/component] to:
- [specific improvement 1]
- [specific improvement 2]
- [specific improvement 3]

Keep the same external API (props, exports, etc.).
Make sure all existing usage still works.
Don't change behavior, only improve code quality.
```

### Add Authentication
```
Add authentication to this [framework] app using [auth provider]:
1. Login page with [email/password, Google OAuth, GitHub OAuth]
2. Signup page with [email/password]
3. Protected routes that redirect to login if not authenticated
4. Logout functionality
5. Current user available throughout the app (context or hook)
6. Middleware that refreshes the session on every request
```

### Deploy to Production
```
Prepare this project for production deployment on [Vercel/Netlify/Railway]:
1. Fix all build errors (run npm run build)
2. List all required environment variables
3. Remove hardcoded localhost URLs
4. Add proper error and 404 pages
5. Add metadata and Open Graph tags
6. Make sure all images use proper optimization
7. Create a production-ready README
```

---

## Project Ideas by Track

### Designer Track
- Portfolio website with scroll animations and interactive project showcases
- Design system documentation site (auto-generated from Figma tokens)
- Figma plugin that automates design tasks (color palette generator, layout helper)
- Interactive case study site with before/after comparisons
- Component library showcase with live previews and code snippets
- Design agency landing page with micro-interactions

### Developer Track
- SaaS dashboard with auth, CRUD, analytics, and Stripe billing
- API service with documentation portal and developer keys
- Chrome extension for developer productivity (code screenshots, API testing)
- Real-time collaborative tool (shared whiteboard, code editor, task board)
- Open-source CLI tool or library published to npm
- Full-stack app with AI-powered features (search, recommendations, chat)

### Product Track
- MVP landing page with waitlist, analytics, and email capture
- Internal tool for team workflows (standup tracker, feedback collector)
- Customer feedback platform with sentiment analysis
- Product analytics dashboard connected to real data
- Prototype for an investor demo or pitch deck companion
- Content management system for a specific niche (recipes, courses, events)

---

## Schedule Overview

| Week | Theme | Key Activities | Deliverable |
|---|---|---|---|
| Pre-work | Setup | Install tools, create accounts, write project brief | Project brief submitted |
| Week 1 (Days 1-7) | Foundations | Learn tools, prompting, scaffold project, build first feature | GitHub repo with running scaffold + 1 feature |
| Week 2 (Days 8-14) | Build | Design-to-code, backend, core features | Screen recording of 3-4 working features |
| Week 3 (Days 15-21) | Polish | UI polish, testing, advanced features, performance | Polished product recording |
| Week 4 (Days 22-28) | Ship | Deploy, document, present, launch | Live URL + Demo Day presentation |

---

## Mentorship Principles

1. **You drive, AI co-pilots.** AI writes the code, but you make the decisions. You decide what to build, how it should work, and what's good enough to ship.

2. **Understanding matters.** Don't blindly accept AI output. Read the code. If you can't explain what it does, ask the AI to explain it. You don't need to memorize syntax, but you need to understand the logic.

3. **Ship over perfect.** A deployed, working project beats a perfect local prototype every time. Get it live, then iterate. The world doesn't see your localhost.

4. **Cross-train across tools.** Use all three primary tools during the program. Each has strengths. Knowing WHEN to use which tool is the real superpower.

5. **Document your process.** Your ability to build with AI is a skill that employers and clients value right now. Document what you built, how you built it, and what you learned.

6. **Break things down.** The best AI results come from specific, focused requests. "Build me an app" produces garbage. "Add a login form with email and Google OAuth, using Supabase Auth, with proper error handling" produces gold.

7. **Iterate fast.** First prompt gets you 70% there. The next 5 prompts get you to 95%. Manual tweaks get you to 100%. This is the rhythm: generate, review, refine, repeat.

---

## FAQ

**Q: Do I need coding experience?**
A: No, but you need to be comfortable using a computer, installing software, and following technical instructions. Complete beginners are welcome. The AI does the coding -- you direct it.

**Q: How much time should I spend per day?**
A: Plan for 2-3 hours per day. Some days (especially build days) you might spend more. Some days (review days) might be shorter.

**Q: What if I get stuck?**
A: Post in the cohort channel. The mentor and other participants will help. Also, try a different AI tool -- sometimes Cursor explains something better than Claude Code, or vice versa.

**Q: Can I change my project idea mid-program?**
A: We'd recommend adjusting scope rather than changing the entire idea. If your project is too ambitious, we'll help you cut it down to a shippable MVP. If it's too simple, we'll help you add features.

**Q: What happens after the 4 weeks?**
A: You keep your project, your code, your portfolio materials, and your skills. You also join the alumni community for ongoing support and networking.

**Q: Is the under-$100 price a one-time payment?**
A: Yes. One payment, full 4-week access, including all live sessions, async support, and 1-on-1 mentor time.

---

*Ship With AI -- a mentorship by [@darasoba](https://x.com/darasoba)*
*Built for the era of AI-assisted creation. Updated February 2026.*
*Tools change fast. This curriculum teaches principles and workflows that transfer across any AI tool, today and tomorrow.*
