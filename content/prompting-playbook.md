---
title: "Prompting Playbook"
slug: "prompting-playbook"
---

# Prompting Playbook

30+ real prompt examples organized by project type. Each prompt includes why it works and what to expect. These work across Claude Code, Cursor, and Codex unless noted otherwise.

---

## How to Write Good Prompts

Before the examples, here are the rules:

1. **Be specific about what you want.** "Build a login page" is vague. "Build a login page with email/password fields, Google OAuth button, and a forgot password link using Next.js and Tailwind" is useful.

2. **Reference existing code.** "Follow the pattern in src/api/posts.ts" gives the AI a concrete template.

3. **State your tech stack up front.** Don't make the AI guess. Say "Using Next.js 14 App Router, TypeScript, Prisma, PostgreSQL."

4. **Break big tasks into steps.** Instead of "build me a SaaS app," start with "set up the project structure" then "add authentication" then "build the dashboard."

5. **Tell it what NOT to do.** "Don't use any external state management library" or "Don't add comments to the code" saves you from unwanted output.

6. **Include acceptance criteria.** "The form should validate email format, show inline errors, and disable the submit button while loading."

---

## Section 0: From Idea to PRD to Code

This is the most important section in this playbook. The prompts below walk you through the full workflow: start with a raw idea, refine it through conversation, generate a Product PRD, then generate a Technical PRD that the AI agent can build from.

Skip this workflow and you'll spend hours fixing AI output that missed the mark. Do it properly and the AI nails it from the first prompt.

### Phase 1: Get Your Idea Out of Your Head

Don't try to write a formal document. Just talk to the AI like you'd explain your idea to a friend.

**Prompt: The Idea Dump**

```
I have an idea for a project and I want to think it through with you
before we write any code.

Here's what I'm thinking: [describe your idea in plain language. Be
messy. Be informal. Just get it out.]

For example: "I want to build a tool where freelancers can track their
time on different client projects and generate invoices at the end of
the month. I'm a freelance designer and I currently use spreadsheets
for this and it's painful."

Don't write code. Don't suggest a tech stack yet. Just:
1. Tell me what you think of this idea honestly
2. Ask me 5-10 questions that would help make it more specific
3. Tell me about existing tools that do something similar
4. Tell me what would make mine worth building despite the competition
```

**Why this works:** You're treating the AI as a thinking partner, not a code generator. You'll get honest feedback, blind spots you missed, and a clearer picture of what you're actually building.

**What happens next:** The AI asks you questions. Answer them honestly. If you don't know the answer, say "I don't know, what do you suggest?" Go back and forth for 3-5 rounds.

### Phase 2: Check Feasibility and Cut Scope

Most project ideas are too big for 4 weeks. This prompt gets you to a realistic MVP.

**Prompt: The Reality Check**

```
Based on our conversation, here's what I think the core features are:
[list them]

Now be straight with me:
1. Can I realistically build this in 4 weeks using AI coding tools
   (Claude Code / Cursor / Codex)?
2. What should I cut to make it achievable?
3. What's the absolute minimum set of features that would make this
   usable? Not impressive, just usable.
4. What's the riskiest part (the thing most likely to take longer
   than expected)?
5. What would you build first, second, and third?
```

**Follow-up after the AI responds:**

```
OK, I agree with cutting [features X and Y]. But I want to keep
[feature Z] because [reason]. Can we make that work?

Here's my updated feature list for the MVP:
[your revised list]

Does this feel right for 4 weeks?
```

### Phase 3: Generate the Product PRD

Once your scope is solid, ask the AI to write the formal Product PRD. This document is for YOU. It captures what you're building and why.

**Prompt: Generate Product PRD**

```
Write a Product PRD based on everything we've discussed. This is for
me to reference throughout the build. Make it specific enough that if
I re-read it in 2 weeks, I know exactly what I'm building.

Structure:

# [Project Name] -- Product Requirements Document

## Overview
One paragraph. What, who, why.

## Target User
Be specific: who they are, current workflow, pain points.

## Problem Statement
What sucks about current solutions.

## Core Features (MVP)
Numbered. Each feature gets: name, one-sentence description, priority
(P0 = must have, P1 = should have, P2 = nice to have for MVP).

## Pages / Screens
Every page. For each: what the user sees, what they can do, what data
is shown.

## User Flows
The key journeys, step by step:
1. First-time user (signup to first value)
2. Returning user (daily use)
3. Key actions (whatever the core thing is)

## Out of Scope
What we are NOT building. Be explicit.

## Design Direction
Look and feel. Reference existing products if helpful.

## Open Questions
Anything we haven't decided yet.

Rules:
- Don't add features we didn't discuss
- Don't make it sound corporate
- Write it like I would write it
- Keep it under 3 pages
```

**After you get the PRD:** Read every line. Delete anything the AI added that you didn't agree to (AI loves to sneak in extra features). Edit anything that doesn't match your mental picture. This is YOUR document. Save it as `docs/PRD.md`.

### Phase 4: Generate the Technical PRD

This is the document the AI coding agent will use to actually build the project. It translates "what to build" into "how to build it."

**If you know your tech stack:**

```
Now create a Technical PRD based on the Product PRD we just wrote.
This document is for the AI coding agent that will implement the
project. It needs to be specific enough that the agent can start
coding without asking me questions.

Tech stack:
- [list your chosen technologies]

Include these sections:

## Tech Stack
Every dependency with its version and what it's used for.

## Project Structure
Full folder tree with what goes in each directory.

## Database Schema
Every table, every column, data types, relationships, foreign keys,
indexes, constraints. Write the actual SQL CREATE TABLE statements.

## API Routes
Every endpoint. Format:
- Method + Path: POST /api/tasks
- Auth: Required
- Request body: { title: string, project_id: string, due_date?: string }
- Response: { task: Task }
- Notes: Creates a new task, assigns to current user

## Authentication
Step-by-step: signup, login, logout, password reset. Which auth
methods and providers to use. How sessions work.

## Component Hierarchy
Main components and how they nest. Mark which are server components
and which need "use client".

## Environment Variables
Every env var needed. Format:
- NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
- SUPABASE_SERVICE_ROLE_KEY: Server-side only, for admin operations

## Implementation Order
What to build first, second, third. List dependencies between features.
The AI agent should follow this order exactly.

Make this extremely specific. No hand-waving. If the agent needs to
know a table name, column type, or API response shape, put it in here.
```

**If you DON'T know what tech to use:**

```
I need help picking the right tech stack before we create the
Technical PRD. I'm [describe yourself: "a designer with basic HTML
knowledge" / "a product manager who's never coded" / "a developer
who mainly uses Python"].

Based on the Product PRD, here's what I need:
- [List technical needs: auth, database, file uploads, payments, etc.]
- I'm building with [Claude Code / Cursor / Codex]
- I want to deploy this in 4 weeks
- I want hosting to cost under $20/month

Give me 2 options:

Option A: The simplest stack (fewest things to learn, fewest things
that can break)

Option B: A more capable stack (more powerful but more to set up)

For each option, tell me:
1. What each technology is in plain English (assume I don't know)
2. Why it's the right fit for this specific project
3. What it costs
4. How well AI coding tools work with it (do they generate good
   code for it?)

After I pick, we'll create the Technical PRD.
```

**Why this prompt works for non-technical people:** It doesn't assume knowledge. It gives two clear options with tradeoffs. And it explicitly asks about AI tool compatibility, because some stacks work way better with AI than others (Next.js + Supabase generates much better AI code than something obscure).

### Phase 5: Feed PRDs Into Your AI Tools

Now you have two documents: `docs/PRD.md` (Product) and `docs/TECHNICAL_PRD.md` (Technical). Here's how to wire them into each tool:

**Claude Code** -- Reference both in CLAUDE.md (auto-read every session):
```markdown
# TaskFlow

## Quick Summary
Time tracking and invoicing app for solo freelancers.

## Documents
- Product PRD: docs/PRD.md (what we're building and why)
- Technical PRD: docs/TECHNICAL_PRD.md (how to build it)

## Current Status
[Update this after every work session]

## Conventions
[Add coding patterns as you discover them]
```

Then prompt with:
```
Read docs/TECHNICAL_PRD.md. Build the database schema exactly as
specified in the "Database Schema" section. Create the Supabase
migration file.
```

**Cursor** -- Reference in `.cursor/rules/project.mdc` and use @mentions:
```
---
description: Project context
alwaysApply: true
---
Product requirements: docs/PRD.md
Technical spec: docs/TECHNICAL_PRD.md
Follow the implementation order in the Technical PRD.
```

Then in Cursor chat:
```
@docs/TECHNICAL_PRD.md Build the API routes listed in the
"API Routes" section. Follow the exact method, path, and
response format specified.
```

**Codex** -- Reference in AGENTS.md:
```markdown
# TaskFlow
Product PRD: docs/PRD.md
Technical PRD: docs/TECHNICAL_PRD.md
Follow the implementation order in docs/TECHNICAL_PRD.md.
```

### Phase 6: Build Using the Technical PRD

Once your PRDs are wired up, your build prompts become surgical:

```
Following the implementation order in docs/TECHNICAL_PRD.md, build
step 1: the database schema. Use the exact SQL from the "Database
Schema" section.
```

```
Build the auth flow described in docs/TECHNICAL_PRD.md. Follow the
"Authentication" section step by step.
```

```
Build the dashboard page. Refer to docs/PRD.md for what the user
should see, and docs/TECHNICAL_PRD.md for the component hierarchy
and data fetching approach.
```

### Phase 7: Keep Everything Updated

After every work session:
- Update "Current Status" in CLAUDE.md
- If you changed something from the PRD (cut a feature, changed a design), update the PRD
- If you found a coding pattern that works, add it to your conventions
- If the AI kept making a mistake, add a rule to prevent it

This means tomorrow's session starts with full context of where you left off.

---

## Section 1: Website and Landing Page Prompts

### Prompt 1: Portfolio Site

```
Build a personal portfolio site using Next.js 14 App Router and Tailwind CSS.

Pages needed:
- Home with hero section, brief intro, and featured projects grid
- Projects page with filterable project cards (categories: web, mobile, design)
- About page with bio, skills list, and timeline of experience
- Contact page with a working contact form (use Resend for email)

Requirements:
- Dark mode toggle that persists in localStorage
- Smooth scroll animations using Framer Motion
- Mobile responsive (test at 375px, 768px, 1440px)
- SEO metadata on every page
- Deploy-ready for Vercel
```

**Why it works:** Specifies the framework, lists every page with details, includes technical requirements, and sets responsive breakpoints.

**What to expect:** A complete project with all pages, components, and configuration. You will need to add your own content and Resend API key.

---

### Prompt 2: SaaS Landing Page

```
Create a SaaS landing page for a project management tool called "ShipIt."

Sections (in order):
1. Hero: headline "Ship faster with AI", subheading, email capture form, and product screenshot placeholder
2. Social proof: logo bar with 6 placeholder company logos
3. Features: 3-column grid with icon, title, description for each feature
4. Pricing: 3 tiers (Free, Pro $19/mo, Team $49/mo) with feature comparison
5. Testimonials: 3 cards with avatar, quote, name, and company
6. FAQ: accordion with 6 questions
7. CTA: "Start free trial" with email input
8. Footer: links, social icons, copyright

Tech: Next.js, Tailwind CSS, shadcn/ui components.
Make it look polished. Use a blue/indigo color scheme.
```

**Why it works:** Ordered sections, specific copy, named color scheme, and component library choice. The AI knows exactly what to build and in what order.

---

### Prompt 3: Blog with CMS

```
Set up a blog using Next.js 14 App Router with MDX for content.

Structure:
- /blog - list of all posts with title, date, excerpt, and reading time
- /blog/[slug] - individual post page with MDX rendering
- Posts stored as .mdx files in /content/posts/

Each post frontmatter:
title, date, excerpt, tags, author, coverImage

Features:
- Tag filtering on the blog list page
- Table of contents auto-generated from headings
- Code syntax highlighting with rehype-pretty-code
- RSS feed at /feed.xml
- Sitemap at /sitemap.xml

Create 3 sample posts to demonstrate the setup.
```

**Why it works:** Clear file structure, explicit frontmatter schema, and specific packages for syntax highlighting. Sample content means you can test immediately.

---

## Section 2: Full-Stack App Prompts

### Prompt 4: Authentication System

```
Add authentication to my Next.js app using NextAuth.js v5.

Providers needed:
- Email/password with bcrypt hashing
- Google OAuth
- GitHub OAuth

Database: PostgreSQL with Prisma.

Create these files:
- lib/auth.ts (NextAuth config)
- app/api/auth/[...nextauth]/route.ts
- app/(auth)/login/page.tsx
- app/(auth)/register/page.tsx
- middleware.ts (protect /dashboard/* routes)

The login page should have email/password fields and social login buttons.
The register page should have name, email, password, confirm password.
Both pages should show validation errors inline.

Add a Prisma schema for User with id, name, email, hashedPassword, image, createdAt.
```

**Why it works:** Names every file that needs to be created, specifies the auth providers, defines the database schema, and describes the UI behavior.

---

### Prompt 5: REST API with CRUD

```
Build a REST API for a task management app using Next.js 14 Route Handlers.

Endpoints:
- GET /api/tasks - list all tasks (support ?status=todo|in_progress|done filter)
- GET /api/tasks/[id] - get single task
- POST /api/tasks - create task
- PATCH /api/tasks/[id] - update task
- DELETE /api/tasks/[id] - delete task

Task schema (Prisma):
- id: String (cuid)
- title: String
- description: String?
- status: Enum (TODO, IN_PROGRESS, DONE)
- priority: Enum (LOW, MEDIUM, HIGH)
- dueDate: DateTime?
- createdAt: DateTime
- updatedAt: DateTime

Validate all inputs with Zod. Return proper HTTP status codes.
Return JSON responses in this format: { success: boolean, data: T, error?: string }

Write the Prisma schema, API routes, and Zod validation schemas.
```

**Why it works:** Every endpoint is specified with its method and path. The schema is fully defined. Response format is standardized. No ambiguity.

---

### Prompt 6: Dashboard with Charts

```
Build a dashboard page at /dashboard using Next.js, Tailwind, and Recharts.

Layout:
- Top bar with user avatar dropdown (name, email, logout)
- Sidebar with navigation: Overview, Analytics, Users, Settings
- Main content area

Overview page content:
- 4 stat cards at the top: Total Users, Revenue, Active Projects, Conversion Rate
- Line chart: Revenue over last 12 months
- Bar chart: New users per month
- Pie chart: Traffic sources (Direct, Organic, Referral, Social)
- Recent activity table: 10 rows with user, action, date, status badge

Use mock data. Make it responsive. Sidebar should collapse to a hamburger menu on mobile.
```

**Why it works:** Describes the exact layout, every chart type with its data, and responsive behavior. Mock data means you get a working demo immediately.

---

### Prompt 7: Real-time Chat Feature

```
Add real-time chat to my Next.js app using Socket.io.

Features:
- Chat rooms (users can create and join rooms)
- Real-time message sending and receiving
- Typing indicators ("John is typing...")
- Online/offline user status
- Message history loaded from database on room join
- Unread message count badge

Tech:
- Socket.io for WebSocket connections
- Prisma with PostgreSQL for message persistence
- Next.js API routes for REST endpoints

Create:
- A Socket.io server setup in a custom server file
- Prisma models: ChatRoom, Message, RoomMember
- React components: ChatWindow, MessageList, MessageInput, RoomList, UserStatus
- A context provider for socket connection state

Keep the UI simple. No need for fancy styling, just functional.
```

---

### Prompt 8: E-commerce Cart and Checkout

```
Build a shopping cart and checkout flow for a Next.js e-commerce site.

Pages:
1. /products - grid of product cards with image, name, price, "Add to cart" button
2. /cart - cart items with quantity controls, remove button, subtotal, total
3. /checkout - shipping form and order summary
4. /checkout/success - order confirmation with order number

State management: Use Zustand for cart state. Persist cart in localStorage.

Cart store should have:
- items: array of { productId, name, price, quantity, image }
- addItem(product)
- removeItem(productId)
- updateQuantity(productId, quantity)
- clearCart()
- getTotal()

Products come from a static JSON file (create 8 sample products).
No real payment processing. The checkout form just validates and shows success.
```

**Why it works:** Every page is defined, the state management approach is chosen, the store interface is specified, and the scope is limited (no real payments).

---

## Section 3: Chrome Extension Prompts

### Prompt 9: Tab Manager Extension

```
Build a Chrome extension (Manifest V3) that helps manage browser tabs.

Features:
- Popup UI showing all open tabs grouped by domain
- Search bar to filter tabs by title or URL
- Click a tab to switch to it
- Close button on each tab
- "Close duplicates" button that removes duplicate URLs
- "Save session" button that saves all tab URLs to localStorage
- "Restore session" dropdown to reopen a saved session

File structure:
- manifest.json (Manifest V3)
- popup.html + popup.js (or popup.tsx if using build step)
- background.js (service worker)
- styles.css

Keep it simple. Vanilla JS, no framework. Style it to look clean with system fonts.
Only request the "tabs" and "storage" permissions.
```

**Why it works:** Specifies Manifest V3, lists exact features, defines the file structure, limits scope (vanilla JS), and names the permissions needed.

---

### Prompt 10: Content Highlighter Extension

```
Build a Chrome extension that lets users highlight text on any webpage and save highlights.

Features:
- User selects text on any page, right-clicks, and chooses "Highlight" from context menu
- Highlighted text gets a yellow background
- Highlights persist when revisiting the page (stored in chrome.storage.local)
- Popup shows a list of all highlights grouped by page URL
- Click a highlight in the popup to open that page
- Delete individual highlights or clear all

Manifest V3 required.
Permissions: activeTab, storage, contextMenus
Content script: handles text selection and highlight rendering
Service worker: handles context menu and storage
Popup: displays saved highlights

No build tools needed. Plain HTML/CSS/JS.
```

---

### Prompt 11: Page Speed Checker Extension

```
Build a Chrome extension that shows page load performance metrics.

When clicked, the popup should display:
- Page load time (from Performance API)
- DOM content loaded time
- Number of network requests
- Total page size (sum of all resource sizes)
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

Show each metric with a color indicator:
- Green: good
- Yellow: needs improvement
- Red: poor

Use the thresholds from Google's Core Web Vitals documentation.

Manifest V3. Permissions: activeTab only.
Content script reads Performance API data and sends it to the popup.
```

---

## Section 4: Figma Plugin Prompts

### Prompt 12: Color Palette Generator

```
Build a Figma plugin that generates color palettes.

UI (in the plugin window):
- Input field for a base hex color
- Dropdown to select palette type: Analogous, Complementary, Triadic, Split-Complementary
- "Generate" button
- Display the generated colors as swatches with hex values
- "Apply to Page" button that creates color swatches as rectangles on the canvas

When "Apply to Page" is clicked:
- Create a frame called "Color Palette"
- Inside, create 5 rectangles (80x80) side by side with 16px gap
- Fill each rectangle with a generated color
- Add a text label below each with the hex value

Tech: TypeScript, Figma Plugin API
Use the figma.ui API for the interface.
Build with esbuild or webpack.
```

---

### Prompt 13: Design Token Exporter

```
Build a Figma plugin that exports design tokens from the current Figma file.

The plugin should scan the file for:
- Color styles (name and hex value)
- Text styles (font family, size, weight, line height)
- Effect styles (shadows, blurs)
- Spacing values from Auto Layout frames

Export formats (user picks one):
1. CSS custom properties (--color-primary: #3B82F6)
2. Tailwind CSS config (extend.colors, extend.fontSize, etc.)
3. JSON tokens (following the Design Tokens Community Group format)

UI:
- Checkboxes to select which token types to export
- Dropdown for export format
- "Scan File" button to preview tokens
- "Export" button that copies to clipboard or downloads a file

Show a count of found tokens before exporting.
```

---

### Prompt 14: Auto Layout Helper

```
Build a Figma plugin that applies consistent Auto Layout settings to selected frames.

Presets:
- "Card": padding 24, gap 16, vertical, fill container
- "Row": padding 0, gap 12, horizontal, hug contents
- "Section": padding 48 horizontal / 64 vertical, gap 32, vertical, fill container
- "Button": padding 12 vertical / 24 horizontal, gap 8, horizontal, hug contents
- "Nav": padding 16, gap 24, horizontal, fill container width

UI:
- List of presets as clickable buttons
- Custom preset form: padding (top, right, bottom, left), gap, direction, sizing
- "Save Custom Preset" button that saves to figma.clientStorage
- "Apply" button

When applied, update the selected frame's Auto Layout properties.
Show an error message if no frame is selected.
```

---

## Section 5: API and Backend Prompts

### Prompt 15: API with Rate Limiting

```
Build a Next.js API with rate limiting using Upstash Redis.

Setup:
- Install @upstash/ratelimit and @upstash/redis
- Create a rate limiter utility in lib/rate-limit.ts
- Apply rate limiting as middleware to all /api/* routes

Rate limit rules:
- Free tier: 10 requests per minute per IP
- Authenticated users: 100 requests per minute per API key
- Return 429 Too Many Requests with a JSON body: { error: "Rate limit exceeded", retryAfter: seconds }
- Include X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers

Create a sample protected endpoint at /api/data that returns mock JSON.
Include a middleware.ts that checks rate limits before handling requests.
```

---

### Prompt 16: Webhook Handler

```
Build a webhook receiver for Stripe events in Next.js.

Endpoint: POST /api/webhooks/stripe

Handle these events:
- checkout.session.completed: Create order in database, send confirmation email
- customer.subscription.created: Update user subscription status to "active"
- customer.subscription.deleted: Update user subscription status to "cancelled"
- invoice.payment_failed: Send payment failure email, flag account

Security:
- Verify the Stripe webhook signature using stripe.webhooks.constructEvent
- Return 400 if signature verification fails
- Return 200 immediately after processing

Create Prisma models for Order and Subscription.
Create an email utility function (just log the email content for now, we'll add Resend later).
```

---

### Prompt 17: Background Job Queue

```
Set up a background job queue using BullMQ with Redis in a Next.js app.

Jobs to create:
1. sendEmail: takes { to, subject, body }, simulates sending
2. generateReport: takes { userId, reportType }, simulates a 10-second process
3. processImage: takes { imageUrl, transformations }, simulates image processing

Setup:
- lib/queue.ts: Queue and Worker setup
- lib/jobs/: Individual job processors
- /api/jobs/[type]/route.ts: API endpoint to enqueue a job

The API endpoint should accept POST with job data and return { jobId, status: "queued" }.
Add a GET endpoint at /api/jobs/[jobId]/status that returns the job status.

Include retry logic: 3 retries with exponential backoff.
Log job start, completion, and failure.
```

---

## Section 6: Database and Data Prompts

### Prompt 18: Database Schema Design

```
Design a Prisma schema for a project management app.

Models needed:
- User: id, name, email, avatar, role (ADMIN, MEMBER), createdAt
- Workspace: id, name, slug, ownerId (User), createdAt
- Project: id, name, description, workspaceId, createdAt, updatedAt
- Task: id, title, description, status (TODO, IN_PROGRESS, REVIEW, DONE), priority (LOW, MEDIUM, HIGH, URGENT), assigneeId (User), projectId, dueDate, createdAt, updatedAt
- Comment: id, content, taskId, authorId (User), createdAt
- WorkspaceMember: workspaceId, userId, role (ADMIN, MEMBER, VIEWER), joinedAt

Relations:
- A User can belong to many Workspaces through WorkspaceMember
- A Workspace has many Projects
- A Project has many Tasks
- A Task has many Comments
- A Task has one assignee (User)

Add indexes on: Task.status, Task.assigneeId, Task.projectId, WorkspaceMember composite key.
Use PostgreSQL as the provider.
```

---

### Prompt 19: Seed Script

```
Write a Prisma seed script for the project management schema.

Create:
- 3 users (one admin, two members)
- 1 workspace with all 3 users as members
- 2 projects in the workspace
- 10 tasks across both projects with varying statuses and priorities
- 5 comments spread across different tasks

Use realistic data (not lorem ipsum). Use names like "Sarah Chen", "Alex Rivera", "Jordan Park".
Project names like "Mobile App Redesign" and "API Migration".
Task titles like "Set up CI/CD pipeline" and "Design onboarding flow".

Use Prisma's createMany where possible for performance.
Export the seed function and add it to package.json scripts: "prisma:seed": "tsx prisma/seed.ts"
```

---

## Section 7: Testing Prompts

### Prompt 20: Unit Tests

```
Write unit tests for the auth utility functions in lib/auth.ts.

Test these functions:
- hashPassword(password): should return a bcrypt hash
- verifyPassword(password, hash): should return true for correct password, false for wrong
- generateToken(userId): should return a valid JWT with userId in payload
- verifyToken(token): should return decoded payload for valid token, throw for expired/invalid

Use Vitest as the test runner.
Use describe/it blocks with clear test names.
Test both happy paths and error cases.
Mock any external dependencies.

Expected file: __tests__/lib/auth.test.ts
```

---

### Prompt 21: Integration Tests for API

```
Write integration tests for the tasks API at /api/tasks.

Test file: __tests__/api/tasks.test.ts
Test runner: Vitest
HTTP client: Use the Next.js test helpers or supertest

Tests needed:
- GET /api/tasks returns 200 with array of tasks
- GET /api/tasks?status=TODO returns only TODO tasks
- GET /api/tasks/[id] returns 200 with single task
- GET /api/tasks/[id] returns 404 for non-existent id
- POST /api/tasks creates a task and returns 201
- POST /api/tasks returns 400 for invalid input (missing title)
- PATCH /api/tasks/[id] updates and returns 200
- DELETE /api/tasks/[id] returns 204

Use a test database. Set up beforeAll to seed data, afterAll to clean up.
```

---

### Prompt 22: E2E Tests

```
Write end-to-end tests for the authentication flow using Playwright.

Test file: e2e/auth.spec.ts

Tests:
1. "user can register with email and password"
   - Navigate to /register
   - Fill in name, email, password, confirm password
   - Click register
   - Should redirect to /dashboard
   - Should show welcome message with user name

2. "user sees validation errors for invalid input"
   - Navigate to /register
   - Submit empty form
   - Should show required field errors
   - Enter invalid email
   - Should show email format error

3. "user can log in with existing account"
   - Navigate to /login
   - Enter email and password
   - Click login
   - Should redirect to /dashboard

4. "user can log out"
   - Log in first
   - Click user avatar dropdown
   - Click logout
   - Should redirect to /login

Use test fixtures for creating test users.
Run against the dev server.
```

---

## Section 8: Mobile App Prompts

### Prompt 23: React Native Setup

```
Set up a React Native app using Expo with the following structure:

App: A habit tracker

Screens (using Expo Router file-based routing):
- (tabs)/index.tsx - Today's habits with checkboxes
- (tabs)/stats.tsx - Weekly/monthly completion stats with charts
- (tabs)/settings.tsx - App settings (notifications, theme)
- habits/new.tsx - Add new habit form
- habits/[id].tsx - Edit habit details

State: Zustand store for habits
Storage: AsyncStorage for persistence
UI: React Native Paper for components

Habit data shape:
{ id, name, icon, color, frequency (daily/weekly), completedDates: string[], createdAt }

Set up the tab navigation with icons.
Create the Zustand store with addHabit, toggleCompletion, deleteHabit actions.
```

---

### Prompt 24: Push Notifications Setup

```
Add push notifications to my Expo React Native app.

Setup needed:
1. Install expo-notifications
2. Create a notifications utility in lib/notifications.ts with:
   - registerForPushNotifications(): requests permission and returns the Expo push token
   - scheduleLocalNotification(title, body, trigger): schedules a local notification
   - cancelAllNotifications(): cancels all scheduled notifications

3. Create a NotificationProvider component that:
   - Registers for notifications on mount
   - Handles incoming notifications (foreground and background)
   - Stores the push token in AsyncStorage

4. Add daily reminder notifications:
   - Schedule a notification for 9:00 AM daily: "Time to check your habits!"
   - Allow users to change the reminder time in settings
   - Allow users to disable reminders

Handle permission denied gracefully (show a message, don't crash).
```

---

## Section 9: DevOps and Deployment Prompts

### Prompt 25: GitHub Actions CI/CD

```
Create a GitHub Actions workflow for a Next.js app.

File: .github/workflows/ci.yml

Triggers: push to main, pull requests to main

Jobs:
1. lint:
   - Run ESLint
   - Fail if any errors

2. type-check:
   - Run TypeScript compiler (tsc --noEmit)
   - Fail if any type errors

3. test:
   - Run Vitest
   - Upload coverage report as artifact
   - Fail if coverage below 80%

4. build:
   - Run next build
   - Depends on lint, type-check, and test passing

5. deploy (only on push to main, not PRs):
   - Deploy to Vercel using the Vercel CLI
   - Use VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID from secrets

Use Node.js 20. Cache node_modules with actions/cache.
Use a PostgreSQL service container for tests.
```

---

### Prompt 26: Docker Setup

```
Create a Docker setup for a Next.js app with PostgreSQL.

Files needed:
- Dockerfile (multi-stage build for production)
- docker-compose.yml (dev environment)
- docker-compose.prod.yml (production)
- .dockerignore

Dockerfile stages:
1. deps: install node_modules
2. builder: run next build
3. runner: copy built app, run as non-root user

docker-compose.yml should include:
- app service: Next.js dev server with hot reload (mount ./src as volume)
- db service: PostgreSQL 16 with persistent volume
- redis service: Redis 7 for caching/sessions

Environment variables:
- DATABASE_URL: postgresql://user:pass@db:5432/myapp
- REDIS_URL: redis://redis:6379

Add a health check for each service.
The app should wait for db to be healthy before starting.
```

---

## Section 10: Refactoring and Migration Prompts

### Prompt 27: JavaScript to TypeScript Migration

```
Convert the Express.js API in /src from JavaScript to TypeScript.

Steps:
1. Add tsconfig.json with strict mode enabled
2. Rename all .js files to .ts
3. Add type annotations to all function parameters and return types
4. Create interfaces for all request/response shapes in /src/types/
5. Replace require() with import/export
6. Add types for Express req, res, next parameters
7. Fix any type errors that come up

Don't change any business logic. Just add types.
Keep the same file structure.
Run tsc --noEmit at the end to verify zero errors.
```

---

### Prompt 28: Component Refactor

```
Refactor the UserProfile component at src/components/UserProfile.tsx.

Current problems:
- It's 400 lines long
- Mixes data fetching, state management, and UI
- Has 3 useEffect hooks doing unrelated things
- Inline styles everywhere

Refactor into:
1. src/components/user-profile/UserProfileContainer.tsx - data fetching and state
2. src/components/user-profile/UserProfileView.tsx - pure UI component (props only)
3. src/components/user-profile/UserAvatar.tsx - avatar display with fallback
4. src/components/user-profile/UserStats.tsx - stats grid component
5. src/hooks/useUserProfile.ts - custom hook for fetching user data

Move inline styles to Tailwind classes.
Keep the same visual output. Don't change what the user sees.
Write a barrel export in src/components/user-profile/index.ts.
```

---

## Section 11: Cursor-Specific Prompts

### Prompt 29: Using Cmd+K (Inline Edit)

Select a block of code, press Cmd+K, and type:

```
Convert this to use async/await instead of .then() chains
```

```
Add error handling with try/catch and return a typed error object
```

```
Make this function generic so it works with any type T
```

```
Optimize this loop - it's running O(n^2) and can be O(n)
```

```
Add JSDoc comments with @param and @return types
```

These work best for targeted, single-block changes. If your edit touches more than one file, use Composer (Cmd+I) instead.

---

### Prompt 30: Using @ References in Chat (Cmd+L)

```
@src/lib/auth.ts @src/middleware.ts
Why is the middleware not catching unauthenticated requests to /api/admin routes?
```

```
@src/components/Dashboard.tsx @package.json
The chart library is causing a hydration mismatch. How do I fix it?
```

```
@codebase
Find all places where we're making database calls without error handling
```

```
@docs nextjs
What's the correct way to implement parallel routes in Next.js 14?
```

---

## Section 12: Complex Multi-Step Prompts

### Prompt 31: Full Feature Build

```
Build a notification system for the app. Here's the plan:

Step 1 - Database:
Create a Notification model in Prisma: id, userId, type (SYSTEM, MENTION, UPDATE),
title, message, isRead (default false), link (optional URL), createdAt.
Run the migration.

Step 2 - API:
- GET /api/notifications - return current user's notifications, newest first, paginated (20 per page)
- PATCH /api/notifications/[id]/read - mark single notification as read
- POST /api/notifications/mark-all-read - mark all as read
- GET /api/notifications/unread-count - return { count: number }

Step 3 - UI:
- Bell icon in the top nav with unread count badge
- Dropdown panel showing recent notifications
- Click notification to navigate to the link and mark as read
- "Mark all as read" button at the top of the dropdown

Step 4 - Real-time:
- Use server-sent events (SSE) at /api/notifications/stream
- When a new notification is created, push it to the connected client
- Update the badge count in real time

Do each step in order. Show me the code after each step so I can review.
```

---

### Prompt 32: Performance Audit

```
Audit the performance of my Next.js app and fix the issues.

Check for:
1. Components that should be server components but are marked "use client"
2. Images not using next/image
3. Missing React.memo on expensive list item components
4. API calls that could be cached with unstable_cache or fetch cache
5. Bundles that could be code-split with dynamic imports
6. Missing loading.tsx and error.tsx files in route segments
7. Fonts not using next/font

For each issue you find:
- Tell me the file and line
- Explain why it's a problem
- Fix it

Start by scanning the entire src/ directory.
```

---

### Prompt 33: Security Audit

```
Review my Next.js app for security issues.

Check for:
1. API routes without authentication checks
2. SQL injection risks (raw queries without parameterization)
3. Missing input validation on API endpoints
4. Sensitive data in client-side code (API keys, secrets)
5. Missing CSRF protection on form submissions
6. Missing rate limiting on auth endpoints
7. Environment variables exposed to the client (should use NEXT_PUBLIC_ prefix only for public ones)
8. Missing Content Security Policy headers

For each issue:
- Show the vulnerable code
- Explain the attack vector
- Provide the fix

Don't add unnecessary security theater. Only flag real risks.
```

---

## Quick Reference: Prompt Templates

### Bug Fix Template
```
Bug: [describe the bug]
Expected: [what should happen]
Actual: [what's happening]
File: [which file(s)]
Steps to reproduce: [if applicable]

Fix this bug. Explain what caused it.
```

### Feature Template
```
Feature: [what to build]
Tech: [stack and libraries]
Files to create/modify: [list them]
Requirements: [specific behaviors]
Don't: [things to avoid]
```

### Refactor Template
```
Refactor [file/module].
Current problem: [what's wrong]
Goal: [what it should look like after]
Keep: [what not to change]
Output: [list of files to create]
```

### Debug Template
```
This error occurs when [context]:

[paste error message]

Relevant files:
- [file1]
- [file2]

What I've tried: [list attempts]
What should I check next?
```
