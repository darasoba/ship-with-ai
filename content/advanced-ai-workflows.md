---
title: "Advanced AI Workflows"
slug: "advanced-ai-workflows"
---

# Advanced AI Workflows -- Ship With AI

MCP servers, multi-agent coding, and AI-generated testing. These are the techniques that separate people who use AI as a fancy autocomplete from people who use it as a full development team.

You don't need any of this in Week 1. But by Week 2-3, when you're building real features and want to move faster, come back to this guide.

---

## Table of Contents

### Part 1: MCP (Model Context Protocol)

1. [What Is MCP and Why It Matters](#1-what-is-mcp-and-why-it-matters)
2. [How MCP Works](#2-how-mcp-works)
3. [Setting Up MCP in Claude Code](#3-setting-up-mcp-in-claude-code)
4. [Setting Up MCP in Cursor](#4-setting-up-mcp-in-cursor)
5. [Essential MCP Servers](#5-essential-mcp-servers)
6. [Building With MCP -- Practical Examples](#6-building-with-mcp----practical-examples)
7. [Finding More MCP Servers](#7-finding-more-mcp-servers)
8. [Figma Make and Design-to-Code Workflows](#8-figma-make-and-design-to-code-workflows)

### Part 2: Multi-Agent Workflows

9. [What Are AI Agents and Sub-Agents](#9-what-are-ai-agents-and-sub-agents)
10. [Sub-Agents in Claude Code](#10-sub-agents-in-claude-code)
11. [Agent Teams in Claude Code](#11-agent-teams-in-claude-code)
12. [Practical Multi-Agent Workflows](#12-practical-multi-agent-workflows)
13. [When to Use Multi-Agent vs. Single Agent](#13-when-to-use-multi-agent-vs-single-agent)

### Part 3: AI-Generated Testing

14. [Why You Should Test (Even for an MVP)](#14-why-you-should-test-even-for-an-mvp)
15. [Testing Frameworks -- What to Use](#15-testing-frameworks----what-to-use)
16. [Getting AI to Write Unit Tests](#16-getting-ai-to-write-unit-tests)
17. [Getting AI to Write Integration Tests](#17-getting-ai-to-write-integration-tests)
18. [Getting AI to Write End-to-End Tests](#18-getting-ai-to-write-end-to-end-tests)
19. [The Testing Workflow That Actually Works](#19-the-testing-workflow-that-actually-works)
20. [Testing Prompts Cheat Sheet](#20-testing-prompts-cheat-sheet)

---

# Part 1: MCP (Model Context Protocol)

---

## 1. What Is MCP and Why It Matters

MCP stands for Model Context Protocol. It's an open standard (created by Anthropic) that lets AI coding tools connect directly to external services -- databases, APIs, design tools, documentation, and more.

**Without MCP:** You copy data from Supabase, paste it into the AI chat, explain your schema, and hope the AI understands the context.

**With MCP:** The AI connects to Supabase directly, reads your actual schema, queries your real data, and writes code that matches exactly what's in your database. No copy-pasting. No explaining.

Think of MCP servers as plugins for your AI. Each server gives the AI a new ability:

- **Supabase MCP server** -- The AI can read your tables, schemas, and RLS policies directly
- **GitHub MCP server** -- The AI can read issues, PRs, and repo contents
- **Figma MCP server** -- The AI can read your designs and generate matching code
- **Filesystem MCP server** -- The AI can read and write files outside the current project
- **Browser MCP server** -- The AI can read and interact with web pages
- **Postgres MCP server** -- The AI can run queries against your database

The key insight: MCP gives the AI real context instead of you manually providing it. Better context means better code.

---

## 2. How MCP Works

MCP uses a client-server model:

```
Your AI Tool (Client)          MCP Server              External Service
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│                  │    │                  │    │                  │
│  Claude Code     │───>│  Supabase MCP    │───>│  Your Supabase   │
│  or Cursor       │<───│  Server          │<───│  Database        │
│                  │    │                  │    │                  │
└──────────────────┘    └──────────────────┘    └──────────────────┘
```

1. You ask the AI something like "show me all users who signed up this week"
2. The AI sees it has a Supabase MCP server available
3. It calls the MCP server with the appropriate query
4. The MCP server talks to your actual Supabase database
5. Results come back to the AI
6. The AI uses the real data to answer your question or write code

You don't need to understand the protocol details. You just need to set up the servers and let the AI use them.

---

## 3. Setting Up MCP in Claude Code

Claude Code supports MCP servers natively. You configure them in your project settings or global settings.

### Project-Level MCP (Recommended)

Create or edit `.claude/settings.json` in your project root:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://yourproject.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
      }
    }
  }
}
```

### Global MCP (Applies to All Projects)

Edit `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-personal-access-token"
      }
    }
  }
}
```

### Verifying It Works

After adding an MCP server config, restart Claude Code. Then ask:

```
What MCP tools do you have available?
```

Claude will list all connected MCP servers and what they can do. If a server isn't showing up, check:

- Is the package name correct?
- Are the environment variables set?
- Did you restart Claude Code?

### Adding Multiple Servers

You can have as many MCP servers as you want:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://yourproject.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-key"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem", "/path/to/allowed/directory"]
    }
  }
}
```

---

## 4. Setting Up MCP in Cursor

Cursor also supports MCP servers. The configuration goes in your Cursor settings.

### Setting Up

1. Open Cursor
2. Go to **Settings** (gear icon) > **MCP**
3. Click **Add new MCP server**
4. Fill in the server details:
   - **Name:** Whatever you want to call it (e.g., "supabase")
   - **Type:** `command` (for most servers)
   - **Command:** The command to start the server

Or edit the config file directly. On Mac it's at `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://yourproject.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "your-key"
      }
    }
  }
}
```

### Using MCP in Cursor Chat

Once connected, you can reference MCP tools in Cursor's chat:

- "Using the Supabase connection, show me my database schema"
- "Query the users table and build a component to display the results"
- "Check my GitHub issues and create a task list from them"

Cursor will use the MCP server automatically when it's relevant to your question.

---

## 5. Essential MCP Servers

Here are the MCP servers most useful for this cohort, organized by what they do.

### Database: Supabase

Connects the AI directly to your Supabase project. The AI can read your schema, query data, manage RLS policies, and more.

```json
{
  "supabase": {
    "command": "npx",
    "args": ["-y", "@supabase/mcp-server"],
    "env": {
      "SUPABASE_URL": "https://yourproject.supabase.co",
      "SUPABASE_SERVICE_ROLE_KEY": "your-service-role-key"
    }
  }
}
```

**What the AI can do with it:**
- Read your table schemas and relationships
- Query real data to understand the structure
- Generate migration files that match your actual database
- Debug RLS policy issues by testing policies directly
- Create new tables based on your PRD

**Example prompt:** "Look at my Supabase schema. I need an API route that returns all tasks for the current user, sorted by due date. Use the actual column names from my database."

### Code: GitHub

Connects the AI to your GitHub repos, issues, and PRs.

```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-server-github"],
    "env": {
      "GITHUB_TOKEN": "your-personal-access-token"
    }
  }
}
```

To get a token: GitHub > Settings > Developer Settings > Personal Access Tokens > Generate New Token. Give it `repo` scope.

**What the AI can do with it:**
- Read and create issues
- Read PR diffs and leave comments
- Search code across your repos
- Read repo file contents

### Design: Figma

Connects the AI to your Figma files so it can read designs and generate matching code.

```json
{
  "figma": {
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-server-figma"],
    "env": {
      "FIGMA_ACCESS_TOKEN": "your-figma-token"
    }
  }
}
```

To get a token: Figma > Settings > Personal Access Tokens > Create.

**What the AI can do with it:**
- Read component properties, colors, spacing, and typography from your designs
- Generate React/HTML components that match your Figma designs
- Extract design tokens (colors, fonts, spacing values)

**Example prompt:** "Look at the dashboard design in my Figma file. Build the sidebar component matching those exact colors and spacing."

### Files: Filesystem

Lets the AI read and write files in directories you specify. Useful when you need the AI to work with files outside your current project.

```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y", "@anthropic/mcp-server-filesystem",
      "/Users/you/Documents/designs",
      "/Users/you/Documents/specs"
    ]
  }
}
```

The paths you list are the only directories the AI can access. It can't reach outside those boundaries.

### Web: Fetch

Lets the AI fetch and read web pages. Useful for pulling in documentation, API references, or any web content.

```json
{
  "fetch": {
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-server-fetch"]
  }
}
```

**Example prompt:** "Fetch the Stripe API docs for creating a checkout session and write me the API route based on the latest documentation."

### Database: Postgres (Direct)

If you're using Postgres directly (not through Supabase), this server connects the AI to your database.

```json
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-server-postgres"],
    "env": {
      "DATABASE_URL": "postgresql://user:pass@host:5432/dbname"
    }
  }
}
```

### Search: Brave Search

Lets the AI search the web for current information.

```json
{
  "brave-search": {
    "command": "npx",
    "args": ["-y", "@anthropic/mcp-server-brave-search"],
    "env": {
      "BRAVE_API_KEY": "your-brave-api-key"
    }
  }
}
```

Get a free API key at brave.com/search/api.

---

## 6. Building With MCP -- Practical Examples

### Example 1: Database-Aware Code Generation

Without MCP:
```
Build a function to get all tasks for a user.
My schema has a tasks table with columns: id, title, description,
status, user_id, created_at.
```

With MCP:
```
Look at my Supabase schema. Build a function to get all tasks
for the current user. Match the actual column names and types.
```

The AI reads your real schema -- including column types, relationships, and RLS policies -- and writes code that works on the first try.

### Example 2: Design-to-Code With Real Figma Data

Without MCP:
```
Build a card component with a blue header (#3B82F6),
white body, 16px padding, rounded corners (8px),
and a subtle shadow.
```

With MCP:
```
Look at the "Task Card" component in my Figma file
and build a React component that matches it exactly.
```

The AI pulls the actual design values from Figma -- no manual copying of hex codes and pixel values.

### Example 3: Documentation-Driven Development

```
Fetch the latest Resend documentation for sending emails
with React Email templates. Then build me an API route
that sends a welcome email when a user signs up.
```

The AI reads the current docs (not its training data, which might be outdated) and writes code using the latest API.

---

## 7. Finding More MCP Servers

The MCP ecosystem is growing fast. Here's where to find servers:

- **mcp.so** -- Community directory of MCP servers
- **github.com/anthropics/mcp-servers** -- Official Anthropic-maintained servers
- **npmjs.com** -- Search for "mcp-server" to find published servers
- **Smithery (smithery.ai)** -- Another MCP server registry

Most servers are installed with `npx -y package-name` so you don't need to install anything globally. The `-y` flag auto-confirms the install.

**Before installing a third-party MCP server:** Check the GitHub repo. Read what permissions it needs. Only give it access to what it actually needs (don't hand your database service role key to a random npm package).

---

## 8. Figma Make and Design-to-Code Workflows

This section covers two things: **Figma Make** (Figma's built-in AI prototyping tool) and the **Figma MCP server** (connecting Figma directly to your AI coding tool for pixel-perfect implementation).

These are different tools that work together:
- **Figma Make** = build working prototypes inside Figma using AI prompts
- **Figma MCP** = give Claude Code, Cursor, or Codex direct access to your Figma designs so they generate code that matches your mockups

### What Is Figma Make?

Figma Make is Figma's AI-powered environment (launched at Config 2025) that turns designs and plain-language prompts into working prototypes -- complete with real React/TypeScript code you can export and use.

Unlike regular Figma files (which are static designs), Make files are interactive. You type what you want in plain English, and Figma generates a working prototype with navigation, logic, animations, and responsiveness. The code it generates is structured React with TypeScript and CSS that you can view, copy, and download.

**What Figma Make can do:**
- Turn a design into a working clickable prototype with real logic
- Add interactivity (tabs, modals, form validation) from text prompts
- Generate React/TypeScript code for every component
- Pull in your existing design system components for consistent output
- Publish prototypes as live web apps via Figma Sites

**What Figma Make is good for:**
- Rapid prototyping before you start building in your IDE
- Testing user flows with real interactivity (not just linked frames)
- Getting a head start on component code -- export from Make, refine in your editor
- Internal tools and MVPs where "good enough" code ships fast
- Demo Day prototypes if you're short on time

### Using Figma Make

1. In Figma, create a new **Make file** (not a regular Design file)
2. Start with a prompt or paste in an existing design from your Figma files
3. Describe what you want: "A dashboard with a sidebar, a task list that filters by status, and a modal for creating new tasks"
4. Figma generates the working prototype
5. Iterate with follow-up prompts: "Add a dark mode toggle" or "Make the sidebar collapsible on mobile"
6. Open the **Code tab** to see the generated React/TypeScript code
7. Copy the code into your project, or download it

**Tips for better Make output:**
- Be specific about layout: "Two-column layout, sidebar on the left (240px wide), main content on the right"
- Reference your design system: "Use the same blue as my primary color variable"
- Describe interactions: "Clicking a task opens a detail panel that slides in from the right"
- Iterate in small steps rather than one giant prompt

### Figma Make + Your Development Workflow

Figma Make generates code, but it's not production-ready. Here's how to use it effectively:

1. **Prototype in Make** -- Get the design and interactions right
2. **Export the code** -- Copy the React components from the Code tab
3. **Paste into your project** -- Put the components in your `src/components/` folder
4. **Refine with Claude Code or Cursor** -- "Here's a component exported from Figma Make. Refactor it to use our Supabase data and match our project's patterns."

The exported code gives your AI coding tool a massive head start. Instead of describing what you want from scratch, you're handing it working code to adapt.

### Setting Up Figma MCP -- All Three Tools

The Figma MCP server gives your AI coding tool direct access to your Figma files. The AI can read component properties, colors, spacing, typography, variables, auto-layout rules, and more -- then generate code that matches your designs pixel for pixel.

Figma offers two server options:
- **Remote server** (recommended) -- Hosted by Figma, works without the desktop app
- **Desktop server** -- Runs locally through the Figma desktop app

#### Figma MCP in Claude Code

**Option A: Remote server (recommended)**

Run this in your terminal:

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Then authenticate:
1. Type `/mcp` in Claude Code
2. Select **figma**
3. Click **Authenticate**
4. Click **Allow Access** in the browser window that opens

That's it. Claude Code can now read your Figma files.

**Option B: Desktop server**

1. Open the Figma desktop app
2. Go to a file > open the **Inspect panel** (right sidebar)
3. In the MCP server section, click **Enable desktop MCP server**
4. Add to your `.claude/settings.json`:

```json
{
  "mcpServers": {
    "figma": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

#### Figma MCP in Cursor

**Option A: Remote server**

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

Or go to Cursor Settings > MCP > Add new MCP server:
- Name: `figma`
- Type: `url`
- URL: `https://mcp.figma.com/mcp`

You'll be prompted to authenticate with Figma on first use.

**Option B: Desktop server**

Same as above but use the local URL:

```json
{
  "mcpServers": {
    "figma": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

#### Figma MCP in Codex (OpenAI CLI)

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
```

You'll need a Figma OAuth token. Generate one at: Figma > Settings > Personal Access Tokens > Create.

Then set the environment variable:

```bash
export FIGMA_OAUTH_TOKEN="your-figma-token"
```

Add that line to your `~/.zshrc` or `~/.bashrc` so it persists.

### The Pixel-Perfect Workflow

Here's the full workflow from Figma design to matching code:

**Step 1: Get your Figma file URL**

Open your design in Figma and copy the URL. It looks like:
```
https://figma.com/design/abc123/MyProject?node-id=1-2
```

**Step 2: Ask the AI to read the design**

In Claude Code:
```
Look at this Figma design: [paste URL]
Describe what you see -- the layout, colors, spacing, and components.
```

The AI reads the actual design properties through MCP -- not a screenshot, but the real Figma data: auto-layout rules, color variables, spacing values, font sizes, everything.

**Step 3: Generate the code**

```
Build a React component that matches this Figma frame exactly:
[paste Figma URL with specific node-id]

Use Tailwind CSS. Match the exact colors, spacing, font sizes,
and border radius from the design. Use our project's existing
component patterns.
```

**Step 4: Iterate on specific elements**

```
The header section doesn't match the Figma design. Look at node 5-12
in the Figma file and fix the spacing and font weight to match.
```

**Step 5: Handle responsive behavior**

```
Look at the mobile variant of this component in Figma (node 8-3).
Add responsive breakpoints so the component matches both the
desktop and mobile designs.
```

### Prompts for Design-to-Code

**Full page from Figma:**
```
Look at this Figma page: [URL]
Build the full page as a React component with Tailwind CSS.
Match the exact layout, colors, typography, and spacing.
Use the color variables from the Figma file as Tailwind classes.
```

**Single component:**
```
Look at the [component name] in this Figma file: [URL with node-id]
Create a reusable React component that matches it exactly.
Include all variants shown in the design (hover, active, disabled).
```

**Design tokens extraction:**
```
Look at the variables defined in this Figma file: [URL]
Generate a Tailwind config that maps to these design tokens --
colors, spacing, font sizes, and border radius values.
```

**Compare and fix:**
```
Here's my current component: src/components/TaskCard.tsx
Here's the Figma design it should match: [URL with node-id]
Compare them and fix any differences in spacing, colors,
font sizes, or layout.
```

**Full design system:**
```
Look at the component library page in my Figma file: [URL]
Generate React components for: Button, Input, Card, Badge, and Avatar.
Match the exact styles and include all variants (sizes, colors, states).
Save each as a separate file in src/components/ui/.
```

### Tips for Better Design-to-Code Results

1. **Use Figma's auto-layout.** Designs built with auto-layout translate to flexbox/grid much more accurately than absolute-positioned frames.
2. **Name your layers.** If your Figma layers are "Frame 47" and "Rectangle 12", the AI has less context. "Header", "TaskCard", "StatusBadge" produce better code.
3. **Use Figma variables for colors and spacing.** The MCP server reads these and the AI can map them directly to your Tailwind config or CSS variables.
4. **Point to specific nodes.** Don't ask the AI to "look at the whole file." Give it the specific frame or component URL with the node-id parameter.
5. **Iterate, don't redo.** If the first pass is 80% right, ask the AI to fix the specific parts that are off. Don't regenerate the whole thing.

---

# Part 2: Multi-Agent Workflows

---

## 9. What Are AI Agents and Sub-Agents

When you use Claude Code normally, you're talking to one AI agent. It reads your code, makes changes, runs commands, and reports back. That's a single agent.

A **sub-agent** is a second AI that the main agent spins up to handle a specific task. The main agent keeps working while the sub-agent does its thing in the background.

An **agent team** is multiple agents working together on the same project, coordinated by a lead agent.

**Why this matters:** Building software involves a lot of independent tasks. While one agent builds the dashboard UI, another could be writing the API routes, and a third could be setting up the database schema. Instead of doing these one at a time, you do them in parallel.

---

## 10. Sub-Agents in Claude Code

Claude Code can spawn sub-agents to handle tasks in parallel. You don't need to configure anything -- it's built in.

### How to Trigger Sub-Agents

Just ask Claude Code to do multiple things:

```
Build the following in parallel:
1. The task list component with filtering by status
2. The API route for fetching tasks with pagination
3. The Supabase migration for the tasks table
```

Claude Code will decide whether to handle these sequentially or spin up sub-agents for parallel work. You can also be explicit:

```
Use sub-agents to build these three things in parallel:
1. src/components/TaskList.tsx - Task list with status filters
2. src/app/api/tasks/route.ts - GET endpoint with pagination
3. supabase/migrations/001_tasks.sql - Tasks table schema
```

### What Sub-Agents Can Do

Each sub-agent can:
- Read and write files
- Run terminal commands
- Search the codebase
- Make independent decisions about implementation

They can NOT:
- See what other sub-agents are doing in real time
- Coordinate changes to the same file (the main agent handles merging)

### When Sub-Agents Help

- **Independent features.** Building a sidebar component and a settings page at the same time.
- **Research tasks.** "Look through the codebase and find all places where we handle authentication" while you keep building.
- **Boilerplate generation.** Creating multiple similar files (API routes, components, test files) in parallel.

### When to Avoid Sub-Agents

- **Tightly coupled changes.** If Task B depends on the output of Task A, they need to run sequentially.
- **Shared files.** If two tasks need to edit the same file, let one agent handle both.
- **Small tasks.** Spinning up a sub-agent for a 3-line change is overkill.

---

## 11. Agent Teams in Claude Code

Agent teams are a step beyond sub-agents. Instead of one main agent spawning temporary helpers, you create a team of named agents that work together, communicate with each other, and coordinate through a shared task list.

### Setting Up a Team

You can ask Claude Code to create a team:

```
Create a team to build the user dashboard feature.
I need:
- A frontend agent to build the React components
- A backend agent to build the API routes
- A test agent to write tests for everything
```

Claude Code will:
1. Create the team with named agents
2. Set up a shared task list
3. Assign tasks to each agent
4. Coordinate their work

### How Teams Work

The team has a **lead agent** (the one you're talking to) and **teammate agents** (the ones doing the work):

```
Team Lead (you talk to this one)
├── frontend-dev (builds UI components)
├── backend-dev (builds API routes)
└── tester (writes and runs tests)
```

The lead agent:
- Creates and assigns tasks
- Reviews work from teammates
- Merges results
- Resolves conflicts between agents

Teammate agents:
- Pick up assigned tasks
- Do the work independently
- Report back when done
- Can message each other for coordination

### Practical Example

```
I need to build a complete task management feature. Create a team
and assign the work:

Frontend:
- TaskList component with drag-and-drop status changes
- TaskForm component for creating/editing tasks
- TaskDetail modal

Backend:
- GET /api/tasks (list with filters and pagination)
- POST /api/tasks (create)
- PATCH /api/tasks/:id (update)
- DELETE /api/tasks/:id (delete)

Tests:
- Unit tests for all API routes
- Component tests for TaskList and TaskForm
```

The lead agent splits this into tasks, assigns them to the right team member, and coordinates the work. You can check in with individual agents or let the lead handle everything.

### Checking on Progress

While the team works, you can ask the lead:

```
What's the status of each team member?
```

Or talk to a specific agent:

```
@frontend-dev How's the drag-and-drop coming along?
```

### When to Use Teams vs. Sub-Agents

| Situation | Use |
|---|---|
| 2-3 quick parallel tasks | Sub-agents |
| A big feature with multiple parts | Agent team |
| Tasks that need coordination | Agent team |
| One-off research or generation | Sub-agent |
| Full-stack feature development | Agent team |

---

## 12. Practical Multi-Agent Workflows

### Workflow 1: The Full-Stack Sprint

You're building a new feature that touches frontend, backend, and database.

```
Create a team for building the invoicing feature:

1. Database agent: Create the Supabase migration for invoices
   and line_items tables. Set up RLS policies.
2. Backend agent: Build CRUD API routes for invoices. Wait for
   the database agent to finish the schema first.
3. Frontend agent: Build the invoice list page and invoice
   creation form. Wait for the API routes to be ready.
4. Test agent: Write tests for the API routes and key
   component interactions. Run after everything else is done.
```

The lead agent handles the dependencies -- database first, then backend, then frontend, then tests.

### Workflow 2: The Bug Bash

You have 5 bugs to fix before demo day. Instead of fixing them one by one:

```
Fix these bugs in parallel. Each is independent:

1. The sidebar doesn't collapse on mobile (src/components/Sidebar.tsx)
2. Date picker shows wrong timezone (src/components/DatePicker.tsx)
3. Logout doesn't clear the session cookie (src/app/api/auth/logout/route.ts)
4. Empty state shows "undefined" instead of a message (src/components/TaskList.tsx)
5. The favicon is missing (public/)
```

Five sub-agents, five bugs, done at the same time.

### Workflow 3: The Refactor + Test

You want to refactor a module without breaking anything:

```
Create a team:

1. Test agent: First, write tests for the current behavior of
   src/lib/auth.ts. Make sure they all pass.
2. Refactor agent: Once tests pass, refactor src/lib/auth.ts
   to use the new Supabase auth helpers. Run the tests after
   each change to make sure nothing breaks.
```

The test agent builds a safety net. The refactor agent works within it.

### Workflow 4: Research + Build

You're not sure how to implement something:

```
Do these in parallel:

1. Research agent: Look at how our codebase currently handles
   file uploads. Check all files in src/lib/ and src/app/api/.
   Summarize what exists and what patterns we use.

2. Research agent: Fetch the Uploadthing docs and summarize
   the setup process for Next.js App Router.

After both finish, create an implementation plan for adding
profile picture uploads.
```

Two research agents gather context, then the main agent synthesizes and builds.

---

## 13. When to Use Multi-Agent vs. Single Agent

Multi-agent is powerful but it's not always the right call.

### Use Single Agent When:

- The task is straightforward (one file, one feature)
- You need tight control over every decision
- Tasks are small and sequential
- You're still learning and want to understand every change

### Use Sub-Agents When:

- You have 2-4 independent tasks
- The tasks don't share files
- You want to speed up repetitive work (generating multiple similar files)
- You need research done while you keep building

### Use Agent Teams When:

- You're building a multi-part feature (frontend + backend + database)
- The work naturally splits into roles (UI, API, tests)
- Tasks have dependencies (database before API before frontend)
- You want coordinated parallel work across many files

### The Honest Truth

For most students in this cohort, **single agent is enough for Week 1-2.** You're still learning the tools and your projects aren't big enough to benefit from parallelism.

By **Week 3**, when you're adding multiple features and fixing bugs before demo day, sub-agents start saving real time.

Agent teams are most useful for **larger projects** or when you're comfortable enough with the tools to direct multiple agents without getting confused by the output.

Start simple. Scale up when you feel the bottleneck.

---

# Part 3: AI-Generated Testing

---

## 14. Why You Should Test (Even for an MVP)

Let's be real: most of you won't write tests during this cohort. You're focused on shipping features, not writing test suites. That's fine.

But here's why knowing about AI-generated tests is still worth your time:

1. **The AI can write them in minutes.** What used to take hours is now a 30-second prompt. The effort-to-value ratio is completely different when AI writes your tests.
2. **Tests catch the bugs AI introduced.** AI coding tools are fast but they're not perfect. They introduce subtle bugs -- wrong variable names, off-by-one errors, missing edge cases. Tests catch these before your users do.
3. **Tests let you refactor fearlessly.** Want the AI to rewrite a component? If you have tests, you'll know immediately if it broke something.
4. **Demo Day insurance.** Nothing is worse than your app crashing during a live demo. A few tests on your critical paths give you confidence it won't.

You don't need 100% test coverage. You need tests on the things that would be embarrassing if they broke.

---

## 15. Testing Frameworks -- What to Use

### For a Next.js / React Project

| Type | Framework | What It Tests |
|------|-----------|---------------|
| Unit tests | **Vitest** | Individual functions and utilities |
| Component tests | **Vitest** + **React Testing Library** | React components in isolation |
| API route tests | **Vitest** | Your `/api/` route handlers |
| End-to-end tests | **Playwright** | Full user flows in a real browser |

### Quick Setup

**Vitest (unit + component + API tests):**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

Add `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
});
```

Create `tests/setup.ts`:

```typescript
import "@testing-library/jest-dom";
```

**Playwright (end-to-end tests):**

```bash
npm install -D @playwright/test
npx playwright install
```

Add to `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

### Ask the AI to Set It Up

If the setup feels like too much, just ask:

```
Set up Vitest with React Testing Library for my Next.js project.
Create the config files and a sample test to verify it works.
```

The AI will create all the config files, install the packages, and write a sample test you can run to confirm everything is working.

---

## 16. Getting AI to Write Unit Tests

Unit tests check that individual functions work correctly. They're the fastest to run and the easiest for AI to generate.

### The Basic Prompt

```
Write unit tests for src/lib/utils.ts. Test every exported function
with at least 3 test cases each: a normal case, an edge case,
and an error case. Use Vitest.
```

### Example: Testing a Utility Function

Say you have this function:

```typescript
// src/lib/format.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
}
```

Ask the AI:

```
Write tests for the formatCurrency function in src/lib/format.ts.
Cover: normal amounts, zero, negative numbers, very large numbers,
and decimal precision.
```

The AI generates:

```typescript
// src/lib/__tests__/format.test.ts
import { describe, it, expect } from "vitest";
import { formatCurrency } from "../format";

describe("formatCurrency", () => {
  it("formats a normal amount", () => {
    expect(formatCurrency(1999)).toBe("$19.99");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats negative amounts", () => {
    expect(formatCurrency(-500)).toBe("-$5.00");
  });

  it("formats large amounts with commas", () => {
    expect(formatCurrency(1000000)).toBe("$10,000.00");
  });

  it("handles single cents", () => {
    expect(formatCurrency(1)).toBe("$0.01");
  });
});
```

Run with:

```bash
npm test
```

### Prompting Tips for Better Unit Tests

- **Point the AI at the actual file.** Don't describe the function -- let the AI read it.
- **Ask for edge cases explicitly.** "Include edge cases" gets you better tests than "write tests."
- **Specify the test framework.** "Use Vitest" or "Use Jest" avoids the AI guessing.
- **Ask for negative tests.** "What inputs should throw errors? Test those too."

---

## 17. Getting AI to Write Integration Tests

Integration tests check that multiple parts of your app work together -- usually an API route that talks to a database.

### Testing API Routes

```
Write integration tests for the tasks API at src/app/api/tasks/route.ts.
Test:
- GET returns a list of tasks
- POST creates a new task and returns it
- POST with missing fields returns a 400 error
Use Vitest. Mock the Supabase client.
```

### Example Output

```typescript
// src/app/api/tasks/__tests__/route.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "../route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

describe("Tasks API", () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn(),
    single: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as any).mockReturnValue(mockSupabase);
  });

  describe("GET /api/tasks", () => {
    it("returns a list of tasks", async () => {
      const mockTasks = [
        { id: 1, title: "Task 1", status: "todo" },
        { id: 2, title: "Task 2", status: "done" },
      ];
      mockSupabase.order.mockResolvedValue({
        data: mockTasks,
        error: null,
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockTasks);
    });
  });

  describe("POST /api/tasks", () => {
    it("creates a new task", async () => {
      const newTask = { title: "New Task", status: "todo" };
      mockSupabase.single.mockResolvedValue({
        data: { id: 3, ...newTask },
        error: null,
      });

      const request = new Request("http://localhost/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
      });

      const response = await POST(request);
      expect(response.status).toBe(201);
    });

    it("returns 400 for missing title", async () => {
      const request = new Request("http://localhost/api/tasks", {
        method: "POST",
        body: JSON.stringify({ status: "todo" }),
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });
});
```

### The "Read and Test" Prompt

This is the most effective prompt for integration tests:

```
Read src/app/api/tasks/route.ts. Then write integration tests
that cover every code path -- every if/else branch, every error
handler, every response status code. Mock external dependencies
(Supabase, Stripe, etc). Use Vitest.
```

The AI reads the actual code and writes tests that match its real behavior, including branches you might forget about.

---

## 18. Getting AI to Write End-to-End Tests

End-to-end (E2E) tests simulate a real user clicking through your app in a browser. They're the most realistic but also the slowest.

### When E2E Tests Are Worth It

For this cohort, write E2E tests for exactly two things:

1. **Your critical user flow.** The one thing your app does -- the path from landing page to completing the core action.
2. **Auth flow.** Login and signup, if your app has them.

That's it. Two E2E tests give you Demo Day confidence without eating your entire afternoon.

### The Prompt

```
Write a Playwright end-to-end test for the main user flow of my app:

1. Go to the home page
2. Click "Sign In"
3. Log in with test credentials
4. Create a new task with title "E2E Test Task"
5. Verify the task appears in the task list
6. Mark the task as complete
7. Verify the task shows as completed

Use realistic selectors (data-testid attributes or accessible roles).
```

### Example Output

```typescript
// tests/e2e/task-flow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Task Management Flow", () => {
  test("user can create and complete a task", async ({ page }) => {
    // Go to home page
    await page.goto("/");
    await expect(page).toHaveTitle(/TaskFlow/);

    // Sign in
    await page.click('[data-testid="sign-in-button"]');
    await page.fill('[data-testid="email-input"]', "test@example.com");
    await page.fill('[data-testid="password-input"]', "testpassword123");
    await page.click('[data-testid="submit-login"]');

    // Wait for dashboard to load
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

    // Create a new task
    await page.click('[data-testid="new-task-button"]');
    await page.fill('[data-testid="task-title-input"]', "E2E Test Task");
    await page.click('[data-testid="save-task-button"]');

    // Verify task appears
    await expect(page.locator("text=E2E Test Task")).toBeVisible();

    // Complete the task
    await page.click('[data-testid="task-checkbox-E2E Test Task"]');

    // Verify completion
    await expect(
      page.locator('[data-testid="task-status-E2E Test Task"]')
    ).toHaveText("Completed");
  });
});
```

### Running E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run with browser visible (useful for debugging)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/e2e/task-flow.spec.ts
```

### The data-testid Pattern

You'll notice the tests use `data-testid` attributes. These are stable selectors that don't break when you change CSS classes or text content.

Ask the AI to add them:

```
Add data-testid attributes to all interactive elements in
src/components/TaskList.tsx and src/components/TaskForm.tsx.
Use descriptive names like "new-task-button", "task-title-input", etc.
```

---

## 19. The Testing Workflow That Actually Works

Here's the realistic testing workflow for this cohort. It takes about 30 minutes to set up and saves you from Demo Day disasters.

### Step 1: Set Up the Framework (10 minutes)

```
Set up Vitest with React Testing Library for my Next.js project.
Create the config files, install dependencies, and write one
sample test that passes to verify the setup works.
```

### Step 2: Test Your API Routes (10 minutes)

```
Write tests for all my API routes in src/app/api/.
For each route, test: success cases, validation errors,
and auth failures. Mock Supabase. Use Vitest.
```

### Step 3: Test Your Critical Flow (10 minutes)

```
Set up Playwright and write one E2E test that covers the main
user flow: sign in, do the core action, verify the result.
```

### Step 4: Run Before Every Deploy

Add to your pre-deploy routine:

```bash
npm run test:run && npm run build
```

If tests fail, don't deploy. Fix the failing test (or the bug it found) first.

### What Not to Test

Don't waste time testing:

- UI layout and styling (visual stuff changes constantly)
- Third-party libraries (they test themselves)
- Simple getter functions with no logic
- Components that just render props without transformation

Test the stuff that would break your demo: API routes, data transformations, auth flows, and your core feature's main path.

---

## 20. Testing Prompts Cheat Sheet

Copy-paste these when you need tests fast.

### Unit Tests for a File

```
Write unit tests for [filename]. Test every exported function.
Include normal cases, edge cases, and error cases. Use Vitest.
```

### Integration Tests for API Routes

```
Read [api-route-file]. Write integration tests covering every
response status code and every code branch. Mock all external
services (Supabase, Stripe, etc). Use Vitest.
```

### Component Tests

```
Write component tests for [component-file]. Test:
- Renders correctly with default props
- Renders correctly with different prop values
- User interactions (clicks, form submissions) trigger the right callbacks
- Loading and error states display correctly
Use Vitest and React Testing Library.
```

### E2E Test for a User Flow

```
Write a Playwright E2E test for this user flow:
1. [Step 1]
2. [Step 2]
3. [Step 3]
Use data-testid selectors. Add the data-testid attributes
to my components if they're missing.
```

### Generate Tests for Everything

```
Look at my entire src/ directory. Identify the most critical
files that should have tests (API routes, utility functions,
data transformations). Write tests for the top 5 most important
files. Use Vitest.
```

### Test After AI Changes

```
You just made changes to [files]. Write tests that verify
the new behavior works correctly. Also check that existing
functionality wasn't broken.
```

### Fix a Failing Test

```
This test is failing:
[paste the error output]

Read the test file and the source file it's testing.
Figure out whether the bug is in the test or the source code.
Fix whichever one is wrong.
```

---

## Remember

These are power-user techniques. You don't need all of them on Day 1.

- **Week 1-2:** Focus on learning your primary tool. Single agent is fine. No tests yet.
- **Week 2-3:** Set up one or two MCP servers (Supabase and GitHub are the most useful). Try sub-agents for parallel tasks.
- **Week 3-4:** Write a few critical tests before Demo Day. Use agent teams if you're juggling multiple features.

The goal isn't to use every technique in this guide. It's to know they exist so you can reach for them when you need them.
