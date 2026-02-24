---
title: "Tool Reference"
slug: "tool-reference"
---

# AI Tool Reference -- Ship With AI

Your complete reference for every AI coding tool in the program. Cheatsheets, comparisons, and decision guides all in one place. Whether you need a quick shortcut reminder or you're trying to decide which tool to use for a specific task, this is where you look.

---

## Table of Contents

### Part 1: Tool Cheatsheets
- [Claude Code Cheatsheet](#claude-code-cheatsheet)
  - [Starting a Session](#starting-a-session)
  - [Keyboard Shortcuts](#keyboard-shortcuts-inside-a-session)
  - [Slash Commands](#slash-commands)
  - [Custom Slash Commands](#custom-slash-commands)
  - [CLAUDE.md Setup](#claudemd-setup)
  - [MCP Server Management](#mcp-server-management)
  - [Hooks](#hooks)
  - [Permission Modes](#permission-modes)
  - [Sub-agents](#sub-agents)
  - [Agent Teams](#agent-teams-experimental)
  - [Context Files](#context-files)
  - [Useful Patterns](#useful-patterns)
- [Cursor Cheatsheet](#cursor-cheatsheet)
  - [Core AI Shortcuts](#core-ai-shortcuts)
  - [Inline Edit](#inline-edit-cmd--k)
  - [Chat Panel](#chat-panel-cmd--l)
  - [Composer / Agent Mode](#composer--agent-mode-cmd--i)
  - [Tab Completion](#tab-completion)
  - [Context Management](#context-management)
  - [Project Rules](#project-rules-cursorrules)
  - [Cursor Context Files](#cursor-context-files)
  - [Useful Keyboard Shortcuts](#useful-keyboard-shortcuts-general)
- [OpenAI Codex Cheatsheet](#openai-codex-cheatsheet)
  - [Starting Codex](#starting-codex)
  - [Approval Modes](#approval-modes)
  - [Key Features](#key-features)
  - [Common Commands](#common-commands)
  - [Model Selection](#model-selection)
  - [Configuration](#configuration)
- [OpenCode Cheatsheet](#opencode-cheatsheet)
  - [Installation](#installation)
  - [Starting OpenCode](#starting-opencode)
  - [Supported Providers](#supported-providers)
  - [Key Features](#opencode-key-features)
  - [Common Usage](#common-usage)
  - [Configuration](#opencode-configuration)
- [Side-by-Side Quick Reference](#side-by-side-quick-reference)
- [Git and GitHub Cheatsheet](#git-and-github-cheatsheet)
  - [First-Time Setup](#first-time-setup-once-per-computer)
  - [Starting a New Project](#starting-a-new-project)
  - [The Daily Workflow](#the-daily-workflow)
  - [Undoing Things](#undoing-things-your-safety-net)
  - [Branches](#branches-for-risky-experiments)
  - [Pull Requests](#pull-requests-for-clean-project-history)
  - [Common Issues and Fixes](#common-issues-and-fixes)
  - [Git + AI Tools Quick Reference](#git--ai-tools-quick-reference)
  - [The Golden Rule](#the-golden-rule)
- [Pro Tips](#pro-tips)

### Part 2: Tool Comparison & Selection Guide
- [The Big Four: Claude Code vs Cursor vs Codex vs OpenCode](#the-big-four-claude-code-vs-cursor-vs-codex-vs-opencode)
  - [Claude Code (Anthropic)](#claude-code-anthropic)
  - [Cursor (Anysphere)](#cursor-anysphere)
  - [OpenAI Codex](#openai-codex)
  - [OpenCode (Open Source)](#opencode-open-source)
- [Head-to-Head Comparison Table](#head-to-head-comparison-table)
- [Decision Flowchart](#decision-flowchart)
- [Supplementary Tools](#supplementary-tools)
  - [v0 by Vercel](#v0-by-vercel)
  - [Bolt.new](#boltnew)
  - [Lovable](#lovable)
  - [Windsurf](#windsurf-formerly-codeium)
  - [Replit Agent](#replit-agent)
- [Tool Combinations That Work Well](#tool-combinations-that-work-well)
- [Pricing Summary Table](#pricing-summary-table)
- [Bottom Line](#bottom-line)

---

## Part 1: Tool Cheatsheets

Quick-reference sheets for Claude Code, Cursor, and Codex. Print these out or keep them open in a tab.

---

## Claude Code Cheatsheet

### Starting a Session

| Command | What it does |
|---------|-------------|
| `claude` | Start interactive mode |
| `claude "fix the login bug"` | Start with a prompt |
| `claude -c` | Continue your last session |
| `claude -r` | Resume a specific session |
| `claude --model opus` | Use a specific model |
| `claude -p "explain this"` | Print mode (no interactive session) |
| `claude --verbose` | Show detailed output |

### Keyboard Shortcuts (Inside a Session)

| Shortcut | What it does |
|----------|-------------|
| `Cmd + T` | Toggle Extended Thinking |
| `Cmd + P` | Switch model (model picker) |
| `Ctrl + G` | Open external editor for long prompts |
| `Shift + Tab` | Cycle through permission modes |
| `Escape` | Stop Claude mid-response |
| `Escape` x2 | Jump to previous messages |
| `Ctrl + C` | Cancel current input |
| `Up Arrow` | Scroll through prompt history |

### Slash Commands

| Command | What it does |
|---------|-------------|
| `/help` | Show all available commands |
| `/init` | Create a CLAUDE.md for your project |
| `/compact` | Compress conversation to save context |
| `/clear` | Clear conversation history |
| `/cost` | Show token usage and costs |
| `/model` | Switch the active model |
| `/permissions` | View and manage tool permissions |
| `/hooks` | Configure event hooks |
| `/review` | Get code review on recent changes |
| `/commit` | Create a git commit with AI message |
| `/pr` | Create a pull request |
| `/bug` | Report a bug to Anthropic |
| `/memory` | Edit CLAUDE.md memory files |
| `/login` | Authenticate your account |
| `/logout` | Sign out |
| `/doctor` | Diagnose common issues |
| `/vim` | Toggle vim keybindings |

### Custom Slash Commands

Create your own commands:

```
# Project-level (shared with team)
.claude/commands/my-command.md

# Personal (works everywhere)
~/.claude/commands/my-command.md
```

Inside the file, write natural language instructions. Use `$ARGUMENTS` to pass arguments:

```markdown
<!-- .claude/commands/test-file.md -->
Run the test suite for $ARGUMENTS and fix any failures.
Show me the test output when done.
```

Then use it: `/project:test-file src/auth.ts`

### CLAUDE.md Setup

```markdown
<!-- CLAUDE.md in project root -->
# Project: My SaaS App

## Tech Stack
- Next.js 14 with App Router
- TypeScript strict mode
- Tailwind CSS
- Prisma with PostgreSQL

## Conventions
- Use named exports, not default exports
- Write tests for all new functions
- Use server components by default
- Keep components under 100 lines

## Commands
- `npm run dev` to start dev server
- `npm test` to run tests
- `npm run lint` to check linting
```

### MCP Server Management

```bash
# Add an MCP server
claude mcp add my-server npx -y @my/mcp-server

# Add with environment variables
claude mcp add my-server -e API_KEY=xxx npx -y @my/mcp-server

# Add SSE transport
claude mcp add --transport sse my-server https://my-server.com/sse

# List configured servers
claude mcp list

# Remove a server
claude mcp remove my-server
```

### Hooks

```bash
# Configure hooks interactively
/hooks

# Or edit .claude/settings.json directly
```

Example hook in settings:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "tool": "write_file",
        "command": "npx prettier --write $FILE_PATH"
      }
    ]
  }
}
```

### Permission Modes

| Mode | Behavior |
|------|----------|
| Default | Asks before file writes and commands |
| Trusted | Auto-approves safe operations |
| YOLO | Approves everything (use with caution) |

### Sub-agents

Built-in sub-agent types that Claude spawns automatically for complex tasks:

| Type | What it does | Can edit files? |
|------|-------------|-----------------|
| Explore | Fast codebase search, file reading, pattern finding | No |
| Plan | Designs implementation strategies, identifies tradeoffs | No |
| General-purpose | Full capabilities: read, write, edit, run commands | Yes |

Create custom sub-agents in `.claude/agents/` with markdown files defining their name, description, instructions, and tool access.

### Agent Teams (Experimental)

Enable: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

| Shortcut / Action | What it does |
|-------------------|-------------|
| `Shift+Tab` | Switch to Delegate mode (lead manages, doesn't code) |
| `Shift+Up` / `Shift+Down` | Switch between teammate views (in-process mode) |

Key concepts:
- **Team Lead**: Your main session. Spawns teammates, assigns tasks, synthesizes results.
- **Teammates**: Separate Claude instances with their own context. They read CLAUDE.md and MCP config but NOT the lead's chat history.
- **Shared Task List**: Tasks with dependency tracking. Tasks auto-unblock when dependencies finish.
- **Direct Messaging**: Teammates can message each other, not just the lead.

Example:
```
Create a team of 3 agents:
1. Build the auth system using Supabase Auth
2. Build the dashboard UI
3. Build the API routes for task CRUD

Agent 3 should wait for agent 1 to finish before adding
auth middleware to routes.
```

### Context Files

| File / Directory | Purpose |
|-----------------|---------|
| `CLAUDE.md` | Project instructions, auto-read every session |
| `docs/PRD.md` | Full product requirements (reference from CLAUDE.md) |
| `.claude/settings.json` | MCP servers, hooks, permissions |
| `.claude/skills/` | Custom reusable workflows |
| `.claude/agents/` | Custom sub-agent definitions |

### Useful Patterns

```bash
# Pipe input to Claude
cat error.log | claude "what's causing this error?"

# Process multiple files
claude "refactor all components in src/components to use TypeScript"

# Git workflow
claude "review the diff and suggest improvements" < <(git diff)

# Generate from template
claude "create a REST API endpoint for users following the pattern in src/api/posts.ts"

# PRD-driven development
claude "Read docs/PRD.md and build the data model described in it"
```

---

## Cursor Cheatsheet

### Core AI Shortcuts

| Shortcut | Feature | When to use it |
|----------|---------|---------------|
| `Cmd + K` | Inline Edit | Quick fixes on the current block |
| `Cmd + L` | Chat Panel | Ask questions, get explanations |
| `Cmd + I` | Composer | Multi-file features and edits |
| `Cmd + Shift + I` | Full Composer | Large refactors across modules |

### Inline Edit (Cmd + K)

1. Select code (or place cursor in a block)
2. Press `Cmd + K`
3. Type your instruction: "convert to async/await"
4. Press Enter
5. Review the diff and press `Cmd + Y` to accept

Works in terminal too: press `Cmd + K` in the terminal to generate commands.

### Chat Panel (Cmd + L)

| Action | How |
|--------|-----|
| Open chat | `Cmd + L` |
| Add file to context | `@filename` in chat |
| Add folder to context | `@foldername` in chat |
| Reference docs | `@docs` then select |
| Add selection to chat | Select code, then `Cmd + Shift + L` |
| New conversation | `Cmd + N` in chat |

### Composer / Agent Mode (Cmd + I)

| Action | How |
|--------|-----|
| Open Composer | `Cmd + I` |
| Switch to Agent mode | Click "Agent" in the Composer dropdown |
| Switch to Plan mode | Click "Plan" in the Composer dropdown |
| Accept all changes | `Cmd + Y` |
| Reject all changes | `Cmd + N` |
| Accept single file | Click checkmark on file |

Agent Mode can:
- Edit multiple files at once
- Run terminal commands
- Install packages
- Run tests and fix failures
- Launch a browser to test UI
- Iterate until the task is done

### Tab Completion

| Action | How |
|--------|-----|
| Accept suggestion | `Tab` |
| Reject suggestion | `Escape` |
| See next suggestion | `Alt + ]` |
| See previous suggestion | `Alt + [` |

### Context Management

| Symbol | What it adds |
|--------|-------------|
| `@file` | A specific file |
| `@folder` | An entire folder |
| `@codebase` | Full codebase search |
| `@docs` | Documentation reference |
| `@web` | Web search results |
| `@git` | Git history and diffs |
| `@definitions` | Symbol definitions |

### Project Rules (.cursor/rules/)

The old `.cursorrules` file still works but is deprecated. The new approach uses `.cursor/rules/` directory with `.mdc` files. Each rule file can target specific parts of your project.

Create `.cursor/rules/project.mdc`:
```
---
description: Project-wide rules
globs:
alwaysApply: true
---

Tech stack: Next.js 15 App Router, TypeScript (strict), Tailwind CSS, Prisma ORM.
Server components by default, "use client" only when needed.
Zod schemas for all API inputs. Named exports. Files under 150 lines.
Read docs/PRD.md for full product requirements.
```

Create targeted rules for specific file types:

`.cursor/rules/components.mdc`:
```
---
description: Component rules
globs: src/components/**/*.tsx
---

Use shadcn/ui primitives. All components must have aria labels.
Include loading and error states for async components.
```

`.cursor/rules/api.mdc`:
```
---
description: API route rules
globs: src/app/api/**/*.ts
---

Validate all input with Zod. Return proper HTTP status codes.
Check auth on every protected route. Use server-side Supabase client.
```

### Cursor Context Files

| File / Directory | Purpose |
|-----------------|---------|
| `.cursor/rules/*.mdc` | Project rules (replaces .cursorrules) |
| `docs/PRD.md` | Reference with @docs/PRD.md in chat |
| `.cursorignore` | Files to exclude from AI context |

### Useful Keyboard Shortcuts (General)

| Shortcut | Action |
|----------|--------|
| `Cmd + Shift + P` | Command palette |
| `Cmd + P` | Quick file open |
| `Cmd + Shift + F` | Search across files |
| `Cmd + B` | Toggle sidebar |
| `Cmd + J` | Toggle terminal |
| `Cmd + \` | Split editor |
| `Ctrl + ~` | Toggle terminal |
| `Cmd + Shift + E` | File explorer |
| `Cmd + Shift + X` | Extensions |

---

## OpenAI Codex Cheatsheet

### Starting Codex

```bash
# Install
npm install -g @openai/codex

# Start interactive mode
codex

# Start with a prompt
codex "add error handling to the auth module"

# Continue last session
codex --continue
```

### Approval Modes

| Mode | What it allows |
|------|---------------|
| `read-only` | Reads files, asks before any changes |
| `auto` | Full workspace access, asks for outside-workspace actions |
| `full-access` | Reads anywhere, runs commands with network access |

```bash
# Set approval mode
codex --mode auto

# Or set in config
codex config set mode auto
```

### Key Features

| Feature | How to use |
|---------|-----------|
| Image input | Drag screenshots/wireframes into CLI |
| Web search | Available automatically during tasks |
| MCP servers | Connect external tools |
| Code review | `codex review` before commits |
| Progress tracking | Auto-generated todo list for complex tasks |

### Common Commands

```bash
# Fix a bug
codex "fix the failing test in tests/auth.test.ts"

# Generate code
codex "create a REST API for user management with Express"

# Refactor
codex "refactor the database module to use connection pooling"

# Explain code
codex "explain what src/utils/parser.ts does"

# Review changes
codex review
```

### Model Selection

Codex uses GPT-5.3-Codex by default (the most capable coding model). You can also use:

```bash
# Use a specific model
codex --model gpt-5.2-codex

# Check current model
codex config get model
```

### Configuration

```bash
# Set API key
export OPENAI_API_KEY=sk-...

# Or configure directly
codex config set api_key sk-...

# View config
codex config list
```

---

## OpenCode Cheatsheet

OpenCode is a free, open-source, terminal-based AI coding agent. It works with any major AI provider — bring your own API key.

### Installation

```bash
# Install globally
npm install -g opencode-ai

# Or run without installing
npx opencode-ai
```

### Starting OpenCode

```bash
# Start interactive session
opencode

# Start with a prompt
opencode "refactor the auth module to use async/await"

# Start with a specific model
opencode --model claude-opus-4-6
```

### Supported Providers

| Provider | How to Set Key |
|----------|---------------|
| Anthropic (Claude) | `export ANTHROPIC_API_KEY=sk-ant-...` |
| OpenAI | `export OPENAI_API_KEY=sk-...` |
| Google Gemini | `export GOOGLE_API_KEY=...` |
| Local (Ollama) | Configure in opencode config |

### OpenCode Key Features

| Feature | What It Does |
|---------|-------------|
| Multi-provider | Switch between Claude, GPT, Gemini, local models |
| Interactive TUI | Clean terminal interface with real-time output |
| MCP support | Connect to external tools via MCP servers |
| Context files | Persistent project instructions (like CLAUDE.md) |
| Open source | Fully transparent, community-driven |
| BYOK | No extra subscription — pay only for API usage |

### Common Usage

```bash
# Fix a bug
opencode "fix the authentication error in src/auth.ts"

# Build a feature
opencode "add a dark mode toggle to the settings page"

# Explain code
opencode "explain what the middleware in proxy.ts does"

# Refactor
opencode "refactor src/utils to use TypeScript strict mode"
```

### OpenCode Configuration

Create an `opencode.json` in your project root:

```json
{
  "provider": "anthropic",
  "model": "claude-sonnet-4-6",
  "context": [
    "CLAUDE.md",
    "docs/PRD.md"
  ]
}
```

Or use a project context file (works like CLAUDE.md):

```markdown
<!-- opencode-context.md -->
# Project: My App

## Stack
- Next.js 15, TypeScript, Tailwind, Supabase

## Rules
- Use functional components
- No any types
- Handle loading and error states
```

### OpenCode Tips

1. **BYOK saves money.** With your own API key, you pay only for what you use. Great for lighter tasks.
2. **Switch models per task.** Use a cheaper, faster model for simple edits and a smarter one for architecture.
3. **Same mental model as Claude Code.** If you know Claude Code, OpenCode feels familiar instantly.
4. **Open source means customizable.** Fork it, modify it, or contribute features you need.
5. **MCP support.** Connect to Figma, databases, or any MCP server — same as Claude Code.

---

## Side-by-Side Quick Reference

### "I want to..." Decision Table

| Task | Claude Code | Cursor | Codex | OpenCode |
|------|------------|--------|-------|---------|
| Fix a single bug | `claude "fix the bug in auth.ts"` | `Cmd+K` on the code | `codex "fix the bug in auth.ts"` | `opencode "fix the bug in auth.ts"` |
| Build a new feature | `claude "add user profiles"` | `Cmd+I` Agent mode | `codex "add user profiles"` | `opencode "add user profiles"` |
| Explain code | `claude "explain this function"` | `Cmd+L` with selection | `codex "explain this function"` | `opencode "explain this function"` |
| Refactor a module | `claude "refactor to TypeScript"` | `Cmd+Shift+I` Composer | `codex "refactor to TypeScript"` | `opencode "refactor to TypeScript"` |
| Run tests and fix | `claude "run tests, fix failures"` | Agent mode auto-runs | `codex "run tests and fix"` | `opencode "run tests and fix"` |
| Quick inline edit | N/A (terminal-based) | `Cmd+K` inline | N/A (terminal-based) | N/A (terminal-based) |
| Review a PR | `/review` | `@git` in chat | `codex review` | Via prompt |
| Create a commit | `/commit` | Standard git | `codex "commit these changes"` | `opencode "commit changes"` |
| Search codebase | Built-in grep/glob | `@codebase` or `Cmd+Shift+F` | Built-in search | Built-in search |
| Add to project rules | Edit CLAUDE.md | Edit .cursorrules | Config file | Context file |

### Setup Commands

```bash
# Claude Code
npm install -g @anthropic-ai/claude-code
claude  # starts session

# Cursor
# Download from cursor.com
# Import VS Code settings on first launch

# Codex
npm install -g @openai/codex
export OPENAI_API_KEY=sk-...
codex  # starts session

# OpenCode
npm install -g opencode-ai
export ANTHROPIC_API_KEY=sk-ant-...  # or any supported provider
opencode  # starts session
```

---

## Git and GitHub Cheatsheet

Git is your safety net. Every time the AI writes code that works, you save a snapshot. When it breaks something (and it will), you go back. No Git = no undo button.

### First-Time Setup (Once Per Computer)

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Install GitHub CLI
brew install gh            # Mac
# Or download from https://cli.github.com/

# Log into GitHub
gh auth login
```

### Starting a New Project

```bash
# Option A: Create locally, then push to GitHub
mkdir my-project && cd my-project
git init
# ... add some files ...
git add .
git commit -m "Initial commit"
gh repo create my-project --public --source=. --push

# Option B: Create on GitHub first, then clone
gh repo create my-project --public --clone
cd my-project
```

### The Daily Workflow

These are the commands you'll run dozens of times per project:

| Command | What it does | When to use it |
|---------|-------------|----------------|
| `git status` | Shows what changed since last save | Before every commit, to see what's different |
| `git add .` | Stages all changes for saving | After you've tested and it works |
| `git add filename` | Stages one specific file | When you only want to save certain changes |
| `git commit -m "message"` | Saves a snapshot with a description | Every time something works |
| `git push` | Uploads snapshots to GitHub | After committing, to back up your work |
| `git log --oneline` | Shows your save history | To see what you've done or find a save point |
| `git diff` | Shows exactly what changed | To review changes before committing |

**The pattern:**
```bash
# 1. Make changes (or let AI make changes)
# 2. Check what changed
git status
git diff

# 3. Stage and save
git add .
git commit -m "Added login page with email/password form"

# 4. Push to GitHub
git push
```

**With Claude Code, it's even simpler:**
```bash
# Inside a Claude Code session:
/commit          # Claude auto-writes the commit message
/pr              # Claude creates a pull request
```

### Undoing Things (Your Safety Net)

| Situation | Command | What happens |
|-----------|---------|-------------|
| AI broke something, haven't committed yet | `git checkout .` | Throws away all uncommitted changes |
| Want to save broken changes "just in case" | `git stash` | Puts changes aside, restores last commit |
| Get stashed changes back | `git stash pop` | Brings the stashed changes back |
| Committed but want to undo the commit | `git reset --soft HEAD~1` | Undoes the commit but keeps the file changes |
| Need to see an old version of a file | `git show HEAD~3:src/app.tsx` | Shows the file from 3 commits ago |

### Branches (For Risky Experiments)

Branches let you try something without touching your working code.

```bash
# Create a new branch and switch to it
git checkout -b feature/dark-mode

# Work as usual: edit, add, commit
git add .
git commit -m "Dark mode: added toggle and theme variables"

# If it works, merge it into main
git checkout main
git merge feature/dark-mode
git push

# If it failed, just delete the branch
git checkout main
git branch -d feature/dark-mode
```

### Pull Requests (For Clean Project History)

```bash
# Push your branch
git push -u origin feature/dark-mode

# Create a PR
gh pr create --title "Add dark mode" --body "Toggle + localStorage persistence"

# Or with Claude Code:
/pr
```

### Common Issues and Fixes

**"I forgot to commit before the AI made more changes and now it's broken"**
```bash
# If you have NO uncommitted changes you want to keep:
git checkout .

# If some changes are good and some are bad:
git diff                    # Review what changed
git checkout -- badfile.ts  # Undo just the bad file
```

**"I accidentally committed something I shouldn't have"**
```bash
git reset --soft HEAD~1     # Undo the commit, keep the changes
# Fix the issue, then commit again
```

**"I need to pull someone else's changes"**
```bash
git pull origin main
```

**"Git says there's a merge conflict"**
```bash
# Open the conflicted file, look for <<<< and >>>> markers
# Decide which version to keep
# Remove the conflict markers
# Then:
git add .
git commit -m "Resolved merge conflict"
```

### Git + AI Tools Quick Reference

| Action | Claude Code | Cursor | Codex |
|--------|------------|--------|-------|
| Commit changes | `/commit` | Use terminal or Git panel | `codex "commit these changes"` |
| Create a PR | `/pr` | Use terminal or GitHub extension | PR via GitHub integration |
| Review changes | `/review` | `@git` in chat panel | `codex review` |
| See diff | `git diff` in terminal | Built-in Git diff viewer | View in Codex sandbox |
| Undo AI mess-up | `git checkout .` | Same, or Cmd+Z in editor | Revert in sandbox |

### The Golden Rule

**Commit every time something works.** Not every hour. Not at the end of the day. Every. Single. Time. Something. Works.

```bash
# AI just built your login page and it's working? Immediately:
git add .
git commit -m "Login page working: email/password + Google OAuth"
git push
```

This way, the next AI prompt can break everything and you won't care. You're one command away from a working version.

---

## Pro Tips

### Claude Code Tips

1. **Use `/compact` often.** When your conversation gets long, compress it to free up context window space.
2. **CLAUDE.md is your best friend.** The more specific your project context, the better the output.
3. **Chain operations.** "Run the tests, fix any failures, then run them again" works as a single prompt.
4. **Use Extended Thinking (Cmd+T)** for architecture decisions and complex debugging.
5. **Custom slash commands** save you from retyping common workflows.

### Cursor Tips

1. **Agent mode is the default.** Use it for anything that touches multiple files.
2. **Plan mode first.** For big features, use Plan mode to review the approach before Agent mode executes it.
3. **@ references are powerful.** Add `@codebase` for full context, `@docs` for library docs.
4. **Tab completion learns your style.** The more you use it, the better it predicts.
5. **Use .cursorrules** to set consistent coding standards across your team.

### Codex Tips

1. **Image input is underrated.** Drag in a screenshot of a UI and say "build this."
2. **Auto mode for trusted projects.** Skip the approval prompts when you trust the output.
3. **Use code review.** Run `codex review` before every push to catch issues early.
4. **Progress tracking.** For complex tasks, Codex creates a todo list and checks things off.
5. **Combine with your editor.** Codex works great alongside VS Code or any editor.

---

## Part 2: Tool Comparison & Selection Guide

A straight-up comparison of every AI coding tool you should know about. No fluff, just what each tool does well, where it falls short, and when to pick it.

---

## The Big Four: Claude Code vs Cursor vs Codex vs OpenCode

### Claude Code (Anthropic)

**What it is:** A terminal-based AI coding agent. You run it in your shell and it reads, writes, and executes code on your machine.

**Best for:**
- Developers who live in the terminal
- Complex multi-file refactors
- Projects that need deep codebase understanding
- CI/CD integration and automation
- Working with large codebases (up to 1M token context in beta)

**Strengths:**
- Deep context awareness across your entire project
- MCP protocol connects to 300+ external services (Jira, Slack, Google Drive, etc.)
- Custom slash commands and skills for repeatable workflows
- Hooks system for automating formatting, linting, and testing
- Multi-agent collaboration for parallel task execution
- CLAUDE.md files let you define project conventions once
- Uses 5.5x fewer tokens than Cursor for identical tasks (independent testing)

**Weaknesses:**
- No visual IDE (terminal only)
- No inline code suggestions or tab completion
- Steeper learning curve for developers not used to CLI tools
- Higher subscription cost for teams

**Pricing:**
- Claude Pro: ~$20/month (rate-limited usage)
- Claude Code Max: $100-200/month (heavy usage)
- Pooled Max (teams): ~$85/month per seat
- Teams Premium: $125/user/month

**Setup:**
```bash
npm install -g @anthropic-ai/claude-code
claude
# Follow the auth flow
```

---

### Cursor (Anysphere)

**What it is:** A VS Code fork with AI built into every interaction. The editor itself is the AI interface.

**Best for:**
- Developers who want AI inside their editor
- Visual learners who prefer seeing diffs inline
- Teams already using VS Code (100% extension compatible)
- Rapid prototyping with instant feedback
- Developers who want tab completion + chat + agent in one place

**Strengths:**
- Inline editing with Cmd+K (change code right where you are)
- Agent mode handles multi-file edits, terminal commands, and testing
- Tab completion that learns your coding style
- Built-in browser for testing web apps
- Plan mode lets you review an approach before execution
- Full VS Code compatibility (extensions, themes, keybindings)
- Great onboarding for developers new to AI coding

**Weaknesses:**
- Hijacks some keyboard shortcuts (Cmd+K no longer clears terminal)
- Can be token-hungry compared to CLI tools
- Agent mode sometimes makes unnecessary changes
- Background agents can run up costs if not monitored

**Pricing:**
- Free tier: Limited usage
- Pro: $20/month
- Pro+: $60/month (3x usage across all models)
- Teams: $40/user/month

**Setup:**
1. Download from cursor.com
2. Import VS Code settings on first launch
3. Sign in and pick a plan
4. Create `.cursorrules` in your project root

---

### OpenAI Codex

**What it is:** A terminal-based coding agent from OpenAI. Open source, built in Rust.

**Best for:**
- Developers in the OpenAI ecosystem
- Teams already paying for ChatGPT Plus/Pro
- Image-to-code workflows (paste wireframes directly)
- Code review workflows before pushing
- Developers who want an open-source agent they can customize

**Strengths:**
- Open source and built in Rust (fast)
- Image input (paste screenshots, wireframes, diagrams)
- Built-in code review (run `codex review` before pushing)
- Progress tracking with auto-generated todo lists
- Web search built in for looking up docs
- Three clear approval modes (read-only, auto, full-access)
- Included with ChatGPT Plus ($20/mo)

**Weaknesses:**
- No IDE integration (terminal only, like Claude Code)
- Windows support is experimental
- Newer product, less mature ecosystem
- Fewer third-party integrations than Claude Code's MCP

**Pricing:**
- Included with ChatGPT Plus: $20/month
- ChatGPT Pro: $200/month
- Business/Enterprise: custom pricing

**Setup:**
```bash
npm install -g @openai/codex
export OPENAI_API_KEY=sk-...
codex
```

---

### OpenCode (Open Source)

**What it is:** A free, open-source, terminal-based AI coding agent. Works with any major AI provider via your own API key.

**Best for:**
- Developers who want Claude Code's power without an extra subscription
- Teams that want BYOK (bring your own key) flexibility
- Developers who prefer open-source tools they can inspect and modify
- Switching between different AI models depending on task complexity and cost

**Strengths:**
- Completely free and open source
- Multi-provider: Claude, GPT-4, Gemini, local models (Ollama), and more
- No separate subscription — pay only for API usage
- Active community with rapid development
- MCP server support for external tool connections
- Familiar terminal-based workflow (same mental model as Claude Code)
- Full source code transparency

**Weaknesses:**
- Less mature than Claude Code (newer project)
- No built-in IDE integration
- Smaller ecosystem than Claude Code's MCP library
- You manage your own API keys and costs

**Pricing:**
- Free and open source
- Pay only for API usage (e.g., Anthropic API, OpenAI API)
- Anthropic API: usage-based, roughly $0.003–$0.015 per 1K tokens depending on model

**Setup:**
```bash
npm install -g opencode-ai
export ANTHROPIC_API_KEY=sk-ant-...
opencode
```

---

## Head-to-Head Comparison Table

| Feature | Claude Code | Cursor | Codex | OpenCode |
|---------|------------|--------|-------|---------|
| **Interface** | Terminal (CLI) | IDE (VS Code fork) | Terminal (CLI) | Terminal (CLI) |
| **Tab completion** | No | Yes | No | No |
| **Inline editing** | No | Yes (Cmd+K) | No | No |
| **Multi-file edits** | Yes | Yes (Agent mode) | Yes | Yes |
| **Terminal commands** | Yes | Yes (Agent mode) | Yes | Yes |
| **Image input** | No | Limited | Yes | No |
| **Code review** | Yes (/review) | Via chat | Yes (codex review) | Via prompt |
| **Custom rules** | CLAUDE.md | .cursorrules | Config file | Context file |
| **Plugin system** | MCP + Hooks | VS Code extensions | MCP support | MCP support |
| **Open source** | No | No | Yes | Yes |
| **Context window** | Up to 1M tokens | ~100K tokens | Large (GPT-5.3) | Depends on model |
| **Best model** | Claude Opus 4.6 | Multiple (picks best) | GPT-5.3-Codex | Any (BYOK) |
| **Starting price** | $20/mo | Free tier | $20/mo (with Plus) | Free (BYOK) |

---

## Decision Flowchart

```
Do you want AI inside your editor?
|-- YES --> Do you use VS Code?
|   |-- YES --> Use Cursor
|   +-- NO --> Use Cursor (it imports VS Code settings) or Windsurf
+-- NO --> Do you prefer terminal workflows?
    |-- YES --> Are you in the OpenAI ecosystem?
    |   |-- YES --> Use Codex
    |   +-- NO --> Use Claude Code
    +-- NO --> Do you want to build without coding?
        |-- YES --> Need a full app?
        |   |-- YES --> Use Lovable or Replit Agent
        |   +-- NO --> Need just UI components?
        |       |-- YES --> Use v0
        |       +-- NO --> Use Bolt.new
        +-- NO --> Start with Cursor (lowest learning curve)
```

---

## Supplementary Tools

These tools fill specific gaps. You will often use them alongside the Big Three.

### v0 by Vercel

**What it is:** An AI that generates React components from text or image prompts. Lives at v0.dev.

**Best for:** Quickly generating UI components with shadcn/ui and Tailwind CSS.

**How it works:**
1. Go to v0.dev
2. Describe a component: "a pricing page with three tiers"
3. Get production-ready React code with Tailwind
4. Copy into your project

**Pricing:** Free tier available. Pro at $20/month.

**When to use it:** You need a specific UI component fast. A landing page hero, a dashboard layout, a settings form. v0 generates components, not full apps.

**When NOT to use it:** You need backend logic, database connections, or full application architecture.

---

### Bolt.new

**What it is:** An open-source AI app builder that runs in the browser. Build full-stack apps from prompts.

**Best for:** Rapid prototyping of full-stack web apps.

**How it works:**
1. Describe your app
2. Bolt generates the frontend, backend, and configuration
3. Preview in the browser
4. Deploy or download the code

**Pricing:** Free and open source. Cloud-hosted version has usage limits.

**Key strength:** Uses "diffs" to only update changed code, making it faster than competitors for iterative work.

**When to use it:** Quick prototypes, hackathons, proof of concepts. When you want to go from idea to working app in minutes.

**When NOT to use it:** Production apps that need careful architecture, complex backend logic, or enterprise-grade security.

---

### Lovable

**What it is:** An AI app builder that generates full-stack web applications from natural language.

**Best for:** Non-technical founders and designers who want working apps without writing code.

**How it works:**
1. Describe your app in plain English
2. Lovable generates UI, backend, database schema, auth, and deployment
3. Everything runs in the browser
4. One-click deploy

**Pricing:** Free tier. Pro at $39/month.

**Key strength:** Best at planning and structuring complex, multi-layered applications. Hit $100M ARR in 8 months.

**When to use it:** You have a clear app idea and want a working prototype fast. Great for MVPs and landing pages.

**When NOT to use it:** You need fine-grained control over architecture or have complex custom requirements.

---

### Windsurf (formerly Codeium)

**What it is:** An AI-powered code editor with an agent called Cascade.

**Best for:** Developers who want a Cursor alternative with different model options.

**How it works:** Similar to Cursor. IDE with built-in AI chat, inline editing, and an agent mode (Cascade).

**Pricing:**
- Free: 25 credits/month
- Pro: $15/month (500 credits)
- Teams: $30/user/month
- Enterprise: $60/user/month

**Key strength:** Supports 9 major editors (VS Code, JetBrains, Neovim, Vim, etc.) and has "Memories" that learn your codebase over time. Auto-fixes linting errors.

**When to use it:** You want Cursor-like features but use JetBrains or another editor. Or you want a cheaper alternative.

**When NOT to use it:** You already have Cursor Pro and are happy with it. Not worth paying for both.

---

### Replit Agent

**What it is:** A cloud-based AI coding agent that builds, tests, and deploys apps entirely in the browser.

**Best for:** People who want zero local setup. Everything runs in the cloud.

**How it works:**
1. Describe what you want to build
2. The agent plans, writes code, and iterates
3. Test in the browser
4. Deploy with one click (hosting included)

**Pricing:**
- Starter: Free
- Core: $25/month (includes credits)
- Teams: $40/user/month

**Key strength:** Fully cloud-based. No local environment needed. Includes hosting, auth, and database services. Effort-based pricing (pay for what the AI actually does).

**When to use it:** You want to go from zero to deployed app without installing anything. Great for learning and quick projects.

**When NOT to use it:** Large production codebases, enterprise projects, or when you need local development tools.

---

## Tool Combinations That Work Well

### Combo 1: Claude Code + Cursor
Use Claude Code for big refactors, architecture decisions, and CI/CD automation. Use Cursor for day-to-day coding with inline edits and tab completion. Best of both worlds.

### Combo 2: v0 + Claude Code
Use v0 to generate UI components quickly, then use Claude Code to build the backend, connect the database, and deploy. Fast frontend, solid backend.

### Combo 3: Lovable + Claude Code
Use Lovable to prototype the app and get a working MVP. Then pull the code into a real repo and use Claude Code to refine, add tests, and prepare for production.

### Combo 4: Cursor + Codex
Use Cursor as your daily IDE. Use Codex for code reviews before pushing (`codex review`) and for image-to-code workflows when you have wireframes.

### Combo 5: OpenCode + Cursor
Use OpenCode in the terminal for heavy agentic tasks (it's free with your own API key). Use Cursor for day-to-day inline editing and tab completion. Best of both worlds at lower cost.

---

## Pricing Summary Table

| Tool | Free Tier | Pro/Individual | Teams |
|------|----------|---------------|-------|
| Claude Code | Limited | $20-200/mo | $85-125/user/mo |
| Cursor | Yes | $20/mo | $40/user/mo |
| Codex | With Plus ($20/mo) | $20-200/mo | Enterprise pricing |
| OpenCode | Free (BYOK) | Free (pay API costs) | Free (BYOK) |
| Windsurf | 25 credits/mo | $15/mo | $30/user/mo |
| v0 | Yes | $20/mo | N/A |
| Bolt.new | Yes (open source) | Usage-based | N/A |
| Lovable | Yes | $39/mo | N/A |
| Replit | Yes | $25/mo | $40/user/mo |

---

## Bottom Line

**If you write code daily and want maximum power:** Claude Code or Codex in the terminal, Cursor as your editor.

**If you want terminal power without a subscription:** OpenCode. Bring your own API key and use any model you like.

**If you are new to AI coding:** Start with Cursor. Lowest learning curve, most visual feedback.

**If you want to build without coding:** Lovable for full apps, v0 for UI components, Replit for cloud-based development.

**If you are on a budget:** Windsurf Free or Cursor Free tier to start. Codex comes free with ChatGPT Plus.

**If you are building a team:** Cursor Teams ($40/user) is the most affordable. Claude Code Teams ($125/user) gives you the most power.
