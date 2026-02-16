---
title: "Project Templates"
slug: "project-templates"
---

# Project Templates

10 detailed project templates you can build during the mentorship. Each template includes the project description, tech stack, database schema, folder structure, starter prompts, and milestones.

Pick one, follow the prompts, and ship it.

---

## Template 1: SaaS App (Subscription-Based Tool)

### Description
A project management tool where teams can create workspaces, manage tasks with kanban boards, and track progress. Includes user authentication, team invitations, and Stripe subscription billing.

### Tech Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js Route Handlers (API routes)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js v5 (email/password + Google OAuth)
- **Payments:** Stripe (checkout, subscriptions, webhooks)
- **Deployment:** Vercel (app) + Railway (database)

### Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  hashedPassword String?
  image         String?
  stripeCustomerId String?
  workspaces    WorkspaceMember[]
  assignedTasks Task[]    @relation("assignee")
  comments      Comment[]
  createdAt     DateTime  @default(now())
}

model Workspace {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  plan      Plan     @default(FREE)
  ownerId   String
  members   WorkspaceMember[]
  projects  Project[]
  createdAt DateTime @default(now())
}

model WorkspaceMember {
  workspaceId String
  userId      String
  role        MemberRole @default(MEMBER)
  workspace   Workspace  @relation(fields: [workspaceId], references: [id])
  user        User       @relation(fields: [userId], references: [id])
  joinedAt    DateTime   @default(now())
  @@id([workspaceId, userId])
}

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  tasks       Task[]
  createdAt   DateTime @default(now())
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  assigneeId  String?
  assignee    User?      @relation("assignee", fields: [assigneeId], references: [id])
  projectId   String
  project     Project    @relation(fields: [projectId], references: [id])
  comments    Comment[]
  dueDate     DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

model Comment {
  id       String   @id @default(cuid())
  content  String
  taskId   String
  task     Task     @relation(fields: [taskId], references: [id])
  authorId String
  author   User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}

enum Plan { FREE, PRO, TEAM }
enum MemberRole { ADMIN, MEMBER, VIEWER }
enum TaskStatus { TODO, IN_PROGRESS, REVIEW, DONE }
enum Priority { LOW, MEDIUM, HIGH, URGENT }
```

### Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── [workspace]/
│   │   │   ├── page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── [project]/
│   │   │       ├── page.tsx
│   │   │       └── board/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── workspaces/route.ts
│   │   ├── projects/route.ts
│   │   ├── tasks/route.ts
│   │   └── webhooks/stripe/route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── KanbanBoard.tsx
│   ├── TaskCard.tsx
│   ├── Sidebar.tsx
│   └── InviteModal.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── stripe.ts
│   └── validations.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
```

### Starter Prompts

**Prompt 1 (Setup):**
```
Create a Next.js 14 project with TypeScript, Tailwind CSS, and Prisma.
Set up the folder structure for a SaaS project management app.
Install shadcn/ui and add Button, Card, Input, Dialog, DropdownMenu components.
Set up Prisma with PostgreSQL. Add the database URL to .env.local.
```

**Prompt 2 (Auth):**
```
Add NextAuth.js v5 authentication with email/password and Google OAuth.
Create login and register pages with form validation.
Add a middleware.ts that protects all /dashboard routes.
Create the User model in Prisma with the fields I specified.
```

**Prompt 3 (Core Feature):**
```
Build the kanban board for task management.
Create a drag-and-drop board with columns: TODO, IN_PROGRESS, REVIEW, DONE.
Each task card shows title, priority badge, assignee avatar, and due date.
Clicking a card opens a detail panel on the right side.
Use @hello-pangea/dnd for drag and drop.
```

**Prompt 4 (Payments):**
```
Integrate Stripe subscriptions.
Create a pricing page with Free, Pro ($19/mo), and Team ($49/mo) tiers.
Add a Stripe checkout session API route.
Add a webhook handler for checkout.session.completed and subscription events.
Update the workspace plan when payment succeeds.
```

### Milestones

1. **Week 1:** Project setup, auth, database schema, basic layout
2. **Week 2:** Workspace CRUD, team invitations, project management
3. **Week 3:** Kanban board, task CRUD, comments, assignees
4. **Week 4:** Stripe billing, settings pages, polish, deploy

---

## Template 2: Portfolio Site

### Description
A personal portfolio website that showcases your projects, skills, and experience. Includes a blog section, contact form, and dark mode.

### Tech Stack
- **Framework:** Next.js 14 (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX for blog posts
- **Email:** Resend for contact form
- **Animations:** Framer Motion
- **Deployment:** Vercel

### Database Schema
None needed. Content lives in MDX files.

### Folder Structure

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── blog/
│   │   ├── page.tsx          # Blog list
│   │   └── [slug]/page.tsx   # Blog post
│   ├── contact/page.tsx
│   └── layout.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── BlogCard.tsx
│   ├── ContactForm.tsx
│   ├── ThemeToggle.tsx
│   └── AnimatedSection.tsx
├── content/
│   └── posts/
│       ├── first-post.mdx
│       └── second-post.mdx
├── lib/
│   ├── mdx.ts
│   └── resend.ts
├── data/
│   └── projects.ts           # Project data as TypeScript
```

### Starter Prompts

**Prompt 1:**
```
Build a portfolio site with Next.js 14, TypeScript, and Tailwind CSS.
Pages: Home, About, Projects, Blog, Contact.
Add dark mode with next-themes that persists in localStorage.
Add Framer Motion page transitions.
The home page should have a hero with my name, title, and a brief intro,
followed by a featured projects grid (3 cards) and latest blog posts (3 cards).
```

**Prompt 2:**
```
Set up MDX blog functionality.
Blog posts live in /content/posts/ as .mdx files.
Each post has frontmatter: title, date, excerpt, tags, coverImage.
The /blog page lists all posts sorted by date with title, excerpt, and reading time.
The /blog/[slug] page renders MDX with syntax highlighting via rehype-pretty-code.
Add a table of contents generated from headings.
```

**Prompt 3:**
```
Add a working contact form on the /contact page.
Fields: name, email, message.
Validate all fields client-side. Show inline errors.
On submit, send the email using Resend to my email address.
Show a success message after sending.
Add rate limiting: max 3 submissions per hour per IP.
```

### Milestones

1. **Day 1-2:** Project setup, layout, home page, dark mode
2. **Day 3-4:** Projects page, About page with timeline
3. **Day 5-6:** Blog with MDX, syntax highlighting
4. **Day 7:** Contact form, SEO, deploy

---

## Template 3: Chrome Extension

### Description
A productivity extension that blocks distracting websites during focus sessions. Users set a timer, pick sites to block, and the extension prevents access until the timer ends.

### Tech Stack
- **Platform:** Chrome Extension (Manifest V3)
- **Language:** TypeScript
- **Build:** esbuild
- **UI:** Vanilla HTML/CSS (or Preact for something lightweight)
- **Storage:** chrome.storage.local

### Database Schema
No database. Data stored in chrome.storage.local:

```typescript
interface StorageSchema {
  blockedSites: string[];           // ["twitter.com", "reddit.com"]
  focusSession: {
    active: boolean;
    endTime: number;                // Unix timestamp
    duration: number;               // Minutes
  } | null;
  stats: {
    totalSessions: number;
    totalMinutes: number;
    sitesBlocked: Record<string, number>; // { "twitter.com": 42 }
  };
  presets: Array<{
    name: string;
    sites: string[];
    duration: number;
  }>;
}
```

### Folder Structure

```
src/
├── manifest.json
├── background.ts          # Service worker
├── content.ts             # Content script (shows blocked page)
├── popup/
│   ├── popup.html
│   ├── popup.ts
│   └── popup.css
├── blocked/
│   ├── blocked.html       # Page shown when site is blocked
│   └── blocked.css
├── options/
│   ├── options.html
│   ├── options.ts
│   └── options.css
├── lib/
│   ├── storage.ts         # Type-safe storage wrapper
│   └── timer.ts           # Focus timer logic
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
```

### Starter Prompts

**Prompt 1:**
```
Create a Chrome extension (Manifest V3) project structure for a focus/site blocker.
Set up TypeScript with esbuild for building.
Create the manifest.json with permissions: storage, tabs, declarativeNetRequest, alarms.
Create a popup with: timer display, start/stop button, list of blocked sites with add/remove, and preset buttons.
Style it clean with system fonts and a minimal design.
```

**Prompt 2:**
```
Implement the site blocking logic.
When a focus session starts, use chrome.declarativeNetRequest to block the listed sites.
When a blocked site is visited, redirect to a custom blocked.html page that shows:
"Stay focused! X minutes remaining" with a countdown timer.
When the timer ends, remove all blocking rules and show a notification.
Use chrome.alarms for the timer (service workers can't use setInterval).
```

**Prompt 3:**
```
Add a stats/history page in the options view.
Track: total focus sessions, total minutes focused, most blocked sites.
Show a simple bar chart of daily focus time for the past 7 days.
Add preset management: users can save and load site lists with custom names.
Store everything in chrome.storage.local.
```

### Milestones

1. **Day 1:** Project setup, popup UI, basic storage
2. **Day 2:** Site blocking with declarativeNetRequest, blocked page
3. **Day 3:** Timer with alarms, notifications, preset management
4. **Day 4:** Stats page, polish, testing, publish to Chrome Web Store

---

## Template 4: Figma Plugin

### Description
A design token manager that lets designers define, organize, and export design tokens (colors, typography, spacing) directly from Figma.

### Tech Stack
- **Platform:** Figma Plugin API
- **Language:** TypeScript
- **Build:** esbuild
- **UI:** HTML/CSS (matching Figma's design patterns)
- **Linting:** ESLint with @figma/eslint-plugin-figma-plugins

### Database Schema
No database. Tokens stored in `figma.clientStorage` and `figma.root.setPluginData()`.

```typescript
interface TokenStore {
  colors: Array<{
    name: string;       // "primary/500"
    value: string;      // "#3B82F6"
    description?: string;
  }>;
  typography: Array<{
    name: string;       // "heading/h1"
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
  }>;
  spacing: Array<{
    name: string;       // "spacing/md"
    value: number;      // 16
  }>;
  shadows: Array<{
    name: string;
    offsetX: number;
    offsetY: number;
    blur: number;
    spread: number;
    color: string;
  }>;
}
```

### Folder Structure

```
my-figma-plugin/
├── manifest.json
├── package.json
├── tsconfig.json
├── src/
│   ├── code.ts              # Main plugin logic
│   ├── ui.html              # Plugin UI
│   ├── ui.ts                # UI logic (bundled into ui.html)
│   ├── scanner.ts           # Scans Figma file for tokens
│   ├── exporter.ts          # Exports tokens in different formats
│   └── types.ts             # TypeScript interfaces
├── dist/
│   ├── code.js
│   └── ui.html
```

### Starter Prompts

**Prompt 1:**
```
Create a Figma plugin project for a design token manager.
Set up TypeScript with esbuild. Create the manifest.json and basic file structure.
The plugin UI should have 4 tabs: Colors, Typography, Spacing, Shadows.
Each tab shows a list of defined tokens with name, value, and edit/delete buttons.
Add an "Add Token" button on each tab that opens an inline form.
Style the UI to match Figma's native look (system fonts, neutral colors, 8px grid).
```

**Prompt 2:**
```
Add a "Scan File" feature that reads the current Figma file and extracts:
- All paint styles as color tokens
- All text styles as typography tokens
- Auto Layout gaps and paddings as spacing tokens
- Effect styles as shadow tokens

Show the scan results in a preview list before importing.
Let users select which tokens to import with checkboxes.
```

**Prompt 3:**
```
Add export functionality.
Users can export tokens in 3 formats:
1. CSS custom properties (--color-primary-500: #3B82F6)
2. Tailwind CSS config (colors, fontSize, spacing objects)
3. JSON (Design Tokens Community Group format)

Add a format dropdown and an "Export" button.
Copy the output to clipboard and show a success toast.
Also add a "Download" option that triggers a file download.
```

### Milestones

1. **Day 1:** Project setup, UI with tabs, token CRUD
2. **Day 2:** File scanner, token extraction
3. **Day 3:** Export in 3 formats, clipboard/download
4. **Day 4:** Polish, error handling, publish to Figma Community

---

## Template 5: Mobile App (React Native)

### Description
A habit tracking app where users create habits, mark daily completions, and view streaks and statistics.

### Tech Stack
- **Framework:** React Native with Expo (SDK 51+)
- **Navigation:** Expo Router (file-based)
- **State:** Zustand
- **Storage:** AsyncStorage
- **Charts:** react-native-chart-kit
- **Notifications:** expo-notifications
- **Deployment:** EAS Build + App Store / Google Play

### Database Schema
No server database. Local storage with AsyncStorage:

```typescript
interface Habit {
  id: string;
  name: string;
  icon: string;            // Emoji
  color: string;           // Hex color
  frequency: "daily" | "weekdays" | "weekends" | "custom";
  customDays?: number[];   // [0,1,2,3,4,5,6] for custom
  reminderTime?: string;   // "09:00"
  completedDates: string[];// ["2026-02-14", "2026-02-13"]
  createdAt: string;
}

interface AppState {
  habits: Habit[];
  settings: {
    theme: "light" | "dark" | "system";
    notificationsEnabled: boolean;
    weekStartsOn: 0 | 1;  // Sunday or Monday
  };
}
```

### Folder Structure

```
app/
├── (tabs)/
│   ├── _layout.tsx        # Tab navigator
│   ├── index.tsx           # Today view
│   ├── stats.tsx           # Statistics
│   └── settings.tsx        # Settings
├── habits/
│   ├── new.tsx             # Create habit
│   └── [id].tsx            # Edit habit
├── _layout.tsx             # Root layout
src/
├── stores/
│   └── habitStore.ts       # Zustand store
├── components/
│   ├── HabitCard.tsx
│   ├── StreakBadge.tsx
│   ├── WeeklyChart.tsx
│   └── CompletionRing.tsx
├── lib/
│   ├── notifications.ts
│   ├── storage.ts
│   └── dates.ts            # Date utility functions
```

### Starter Prompts

**Prompt 1:**
```
Create an Expo React Native app with Expo Router for a habit tracker.
Set up tab navigation with 3 tabs: Today, Stats, Settings.
Use icons from @expo/vector-icons.
Set up Zustand store for habits with:
- addHabit, updateHabit, deleteHabit
- toggleCompletion(habitId, date)
- getStreak(habitId)
- getCompletionRate(habitId, days)
Persist the store with AsyncStorage.
```

**Prompt 2:**
```
Build the Today screen.
Show a list of today's habits with:
- Habit name and icon
- Completion checkbox (animated)
- Current streak count with a fire emoji
- A circular progress ring at the top showing X/Y habits completed today

Tapping a habit toggles its completion for today.
Long pressing opens the edit screen.
Add a floating action button to create a new habit.
Use smooth animations for check/uncheck.
```

**Prompt 3:**
```
Build the Stats screen.
Show:
- Overall completion rate for the past 30 days (percentage + ring chart)
- Weekly bar chart showing completions per day
- Longest streak across all habits
- Individual habit stats: tap a habit to see its completion calendar (GitHub-style grid)
- Monthly view with a heat map

Use react-native-chart-kit for the charts.
```

### Milestones

1. **Week 1:** Project setup, navigation, store, Today screen
2. **Week 2:** Create/edit habit forms, completion tracking
3. **Week 3:** Stats screen, charts, streak calculations
4. **Week 4:** Notifications, settings, polish, EAS build

---

## Template 6: API Service

### Description
A URL shortener API with analytics. Users create short links, and the API tracks clicks with geographic and device data.

### Tech Stack
- **Framework:** Next.js 14 Route Handlers (or Express if you prefer standalone)
- **Database:** PostgreSQL via Prisma
- **Cache:** Redis via Upstash (for redirect speed)
- **Rate Limiting:** Upstash Rate Limit
- **Auth:** API keys (simple) or JWT
- **Deployment:** Railway (API + DB + Redis)

### Database Schema

```prisma
model Link {
  id          String   @id @default(cuid())
  shortCode   String   @unique
  originalUrl String
  title       String?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  clicks      Click[]
  expiresAt   DateTime?
  createdAt   DateTime @default(now())

  @@index([shortCode])
}

model Click {
  id        String   @id @default(cuid())
  linkId    String
  link      Link     @relation(fields: [linkId], references: [id])
  ip        String?
  country   String?
  city      String?
  device    String?  // mobile, desktop, tablet
  browser   String?
  referer   String?
  clickedAt DateTime @default(now())

  @@index([linkId, clickedAt])
}

model User {
  id       String @id @default(cuid())
  email    String @unique
  apiKey   String @unique @default(cuid())
  links    Link[]
  plan     Plan   @default(FREE)
  createdAt DateTime @default(now())
}

enum Plan { FREE, PRO }
```

### Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── links/
│   │   │   ├── route.ts            # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       ├── route.ts        # GET, PATCH, DELETE
│   │   │       └── stats/route.ts  # GET analytics
│   │   ├── auth/
│   │   │   └── register/route.ts
│   │   └── health/route.ts
│   ├── [shortCode]/
│   │   └── route.ts                # GET redirect handler
│   └── page.tsx                     # API docs landing page
├── lib/
│   ├── db.ts
│   ├── redis.ts
│   ├── rate-limit.ts
│   ├── auth.ts                     # API key validation
│   ├── analytics.ts                # GeoIP, device detection
│   └── validations.ts              # Zod schemas
```

### Starter Prompts

**Prompt 1:**
```
Build a URL shortener API with Next.js 14 Route Handlers and Prisma.
Endpoints:
- POST /api/links: create short link (body: { url, customCode? })
- GET /api/links: list user's links with click counts
- GET /[shortCode]: redirect to original URL (302)

Generate random 6-character short codes.
Validate URLs with Zod.
Return proper HTTP status codes and JSON responses.
```

**Prompt 2:**
```
Add click analytics.
When someone visits a short link:
- Record the click with IP, user agent, referer
- Parse the user agent to get device type and browser
- Use a free GeoIP service to get country and city
- Cache the redirect URL in Redis for fast lookups

Add a stats endpoint: GET /api/links/[id]/stats
Return: total clicks, clicks by day (last 30 days), top countries, top devices, top referers.
```

**Prompt 3:**
```
Add API key authentication and rate limiting.
- Register endpoint: POST /api/auth/register (email, returns API key)
- All /api/links endpoints require X-API-Key header
- Rate limit: Free plan 100 req/hr, Pro 1000 req/hr
- Return 429 with retry-after header when limited
Use Upstash Redis for rate limiting.
```

### Milestones

1. **Day 1-2:** Core link CRUD, redirect handler
2. **Day 3-4:** Click tracking, analytics, Redis caching
3. **Day 5-6:** Auth, rate limiting, API docs page
4. **Day 7:** Deploy to Railway, custom domain

---

## Template 7: E-Commerce Store

### Description
A small online store with product listings, shopping cart, checkout with Stripe, and order management.

### Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js Route Handlers
- **Database:** PostgreSQL via Prisma
- **Payments:** Stripe Checkout
- **Images:** Cloudinary or Vercel Blob
- **State:** Zustand (cart)
- **Deployment:** Vercel + Railway (DB)

### Database Schema

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  price       Int      // Price in cents
  images      String[] // URLs
  category    String
  stock       Int      @default(0)
  featured    Boolean  @default(false)
  orderItems  OrderItem[]
  createdAt   DateTime @default(now())
}

model Order {
  id              String      @id @default(cuid())
  userId          String?
  email           String
  status          OrderStatus @default(PENDING)
  total           Int         // Total in cents
  stripeSessionId String?     @unique
  shippingAddress Json
  items           OrderItem[]
  createdAt       DateTime    @default(now())
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Int     // Price at time of purchase (cents)
}

enum OrderStatus { PENDING, PAID, SHIPPED, DELIVERED, CANCELLED }
```

### Folder Structure

```
src/
├── app/
│   ├── page.tsx                    # Home / featured products
│   ├── products/
│   │   ├── page.tsx                # All products with filters
│   │   └── [slug]/page.tsx         # Product detail
│   ├── cart/page.tsx
│   ├── checkout/
│   │   ├── page.tsx                # Shipping form
│   │   └── success/page.tsx        # Order confirmation
│   ├── orders/page.tsx             # Order history
│   ├── api/
│   │   ├── products/route.ts
│   │   ├── checkout/route.ts       # Creates Stripe session
│   │   └── webhooks/stripe/route.ts
├── components/
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── CartDrawer.tsx
│   ├── CartItem.tsx
│   ├── CheckoutForm.tsx
│   └── OrderSummary.tsx
├── stores/
│   └── cartStore.ts
├── lib/
│   ├── db.ts
│   ├── stripe.ts
│   └── formatPrice.ts
```

### Starter Prompts

**Prompt 1:**
```
Set up a Next.js e-commerce store with product listings.
Create the Product model in Prisma and seed 12 products across 3 categories.
Build a product grid on the home page showing featured products.
Build a /products page with category filters and sorting (price low-high, high-low, newest).
Build a /products/[slug] detail page with image gallery, description, price, and "Add to Cart" button.
```

**Prompt 2:**
```
Build the shopping cart.
Use Zustand with localStorage persistence.
Cart store: addItem, removeItem, updateQuantity, clearCart, getTotal.
Show a cart icon in the header with item count badge.
Clicking the icon opens a slide-over drawer showing cart items.
Each item has quantity controls (+/-), price, and a remove button.
Show subtotal and a "Checkout" button that goes to /checkout.
```

**Prompt 3:**
```
Add Stripe Checkout for payments.
The /checkout page shows an order summary and shipping form (name, email, address).
On submit, create a Stripe Checkout Session via POST /api/checkout.
Redirect to Stripe's hosted checkout page.
Handle the webhook at /api/webhooks/stripe:
- checkout.session.completed: create the Order in the database, reduce stock
On success, redirect to /checkout/success with the order details.
```

### Milestones

1. **Week 1:** Product catalog, detail pages, category filters
2. **Week 2:** Cart with Zustand, cart drawer
3. **Week 3:** Checkout flow, Stripe integration, order creation
4. **Week 4:** Order history, admin page, deploy

---

## Template 8: Dashboard

### Description
An analytics dashboard for a SaaS product that shows key metrics, charts, user activity, and reports.

### Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Charts:** Recharts
- **Tables:** TanStack Table
- **Data:** Mock data (or connect to a real API later)
- **Deployment:** Vercel

### Database Schema
Not needed for the dashboard itself. Use mock data or connect to an existing API.

### Folder Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx           # Sidebar + top nav
│   │   ├── page.tsx             # Overview
│   │   ├── analytics/page.tsx   # Detailed analytics
│   │   ├── users/page.tsx       # User management table
│   │   ├── reports/page.tsx     # Downloadable reports
│   │   └── settings/page.tsx
├── components/
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── TopNav.tsx
│   │   ├── StatCard.tsx
│   │   ├── RevenueChart.tsx
│   │   ├── UserGrowthChart.tsx
│   │   ├── TrafficSources.tsx
│   │   ├── RecentActivity.tsx
│   │   └── DataTable.tsx
├── data/
│   └── mock.ts                  # Mock data generators
├── lib/
│   └── utils.ts
```

### Starter Prompts

**Prompt 1:**
```
Build a dashboard layout with Next.js 14 and Tailwind CSS.
Create a collapsible sidebar with navigation: Overview, Analytics, Users, Reports, Settings.
Add a top bar with search input, notification bell (with badge), and user avatar dropdown.
The sidebar should collapse to icons only on mobile.
Use shadcn/ui components.
```

**Prompt 2:**
```
Build the Overview page with these sections:
1. Four stat cards in a row: Total Revenue ($), Active Users, New Signups, Conversion Rate.
   Each card shows the number, percentage change from last period (green up, red down), and a sparkline.
2. Revenue chart: area chart showing monthly revenue for the past 12 months.
3. User growth: bar chart showing new vs returning users per month.
4. Traffic sources: donut chart (Direct, Organic, Social, Referral, Email).
5. Recent activity table: 10 rows with user avatar, action, timestamp, and status badge.
Use Recharts for all charts. Use mock data with realistic numbers.
```

**Prompt 3:**
```
Build the Users page with a data table.
Use TanStack Table with:
- Columns: avatar, name, email, role, status (active/inactive), joined date, last active
- Search by name or email
- Filter by role and status
- Sort by any column
- Pagination (10, 25, 50 per page)
- Bulk select with checkboxes
- Row actions dropdown: View, Edit, Deactivate, Delete

Generate 100 mock users with realistic data.
```

### Milestones

1. **Day 1-2:** Layout, sidebar, top nav
2. **Day 3-4:** Overview page with charts
3. **Day 5-6:** Users table with filters and pagination
4. **Day 7:** Reports page, settings, polish

---

## Template 9: Blog / CMS

### Description
A blogging platform where users can create accounts, write posts with a rich text editor, and publish content. Includes categories, tags, and a public-facing blog.

### Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Editor:** Tiptap (rich text editor)
- **Database:** PostgreSQL via Prisma
- **Auth:** NextAuth.js v5
- **File Upload:** Vercel Blob or Cloudinary
- **Deployment:** Vercel + Railway

### Database Schema

```prisma
model User {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  hashedPassword String
  bio           String?
  avatar        String?
  role          Role     @default(AUTHOR)
  posts         Post[]
  createdAt     DateTime @default(now())
}

model Post {
  id          String     @id @default(cuid())
  title       String
  slug        String     @unique
  content     String     // HTML from Tiptap
  excerpt     String?
  coverImage  String?
  status      PostStatus @default(DRAFT)
  authorId    String
  author      User       @relation(fields: [authorId], references: [id])
  categoryId  String?
  category    Category?  @relation(fields: [categoryId], references: [id])
  tags        TagOnPost[]
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

model Category {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  posts Post[]
}

model Tag {
  id    String      @id @default(cuid())
  name  String      @unique
  slug  String      @unique
  posts TagOnPost[]
}

model TagOnPost {
  postId String
  tagId  String
  post   Post @relation(fields: [postId], references: [id])
  tag    Tag  @relation(fields: [tagId], references: [id])
  @@id([postId, tagId])
}

enum Role { ADMIN, AUTHOR }
enum PostStatus { DRAFT, PUBLISHED, ARCHIVED }
```

### Folder Structure

```
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx               # Public blog home
│   │   ├── blog/
│   │   │   ├── page.tsx           # All posts
│   │   │   └── [slug]/page.tsx    # Single post
│   │   ├── category/[slug]/page.tsx
│   │   └── tag/[slug]/page.tsx
│   ├── (admin)/
│   │   ├── dashboard/page.tsx     # Post management
│   │   ├── posts/
│   │   │   ├── new/page.tsx       # Create post
│   │   │   └── [id]/edit/page.tsx # Edit post
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── posts/route.ts
│   │   ├── upload/route.ts
│   │   └── auth/[...nextauth]/route.ts
├── components/
│   ├── editor/
│   │   ├── TiptapEditor.tsx
│   │   └── Toolbar.tsx
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   ├── PostContent.tsx
│   │   └── CategoryFilter.tsx
```

### Starter Prompts

**Prompt 1:**
```
Set up a blogging platform with Next.js 14.
Create the Prisma schema with User, Post, Category, and Tag models.
Add NextAuth.js v5 for authentication (email/password).
Create the admin layout with sidebar: Dashboard, Posts, Categories, Settings.
Create the public layout with header (logo, nav links) and footer.
```

**Prompt 2:**
```
Build the post editor at /admin/posts/new.
Use Tiptap as the rich text editor with these features:
- Headings (h1, h2, h3)
- Bold, italic, underline, strikethrough
- Bullet and numbered lists
- Code blocks with syntax highlighting
- Image upload (drag and drop into editor)
- Link insertion
- Block quotes

Add a sidebar panel with: title input, slug (auto-generated from title), category dropdown,
tag multi-select, cover image upload, excerpt textarea, and publish/draft toggle.
```

**Prompt 3:**
```
Build the public blog pages.
/blog: grid of post cards showing cover image, title, excerpt, author, date, and category badge.
Add pagination (12 posts per page).
/blog/[slug]: full post page with cover image, title, author info, date, content, and tags.
/category/[slug]: filtered posts by category.
/tag/[slug]: filtered posts by tag.
Add Open Graph meta tags for social sharing on each post.
```

### Milestones

1. **Week 1:** Setup, auth, admin layout, database schema
2. **Week 2:** Tiptap editor, post CRUD, image uploads
3. **Week 3:** Public blog pages, categories, tags, pagination
4. **Week 4:** SEO, RSS feed, polish, deploy

---

## Template 10: Real-Time Chat App

### Description
A real-time messaging app with rooms, direct messages, typing indicators, and online presence.

### Tech Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Real-time:** Socket.io
- **Database:** PostgreSQL via Prisma
- **Auth:** NextAuth.js v5
- **File sharing:** Vercel Blob
- **Deployment:** Railway (server needs persistent WebSocket connections)

### Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  hashedPassword String
  avatar        String?
  status        String?   // "Available", "Busy", "Away"
  lastSeen      DateTime  @default(now())
  roomMembers   RoomMember[]
  messages      Message[]
  createdAt     DateTime  @default(now())
}

model Room {
  id        String       @id @default(cuid())
  name      String?      // null for DMs
  type      RoomType     @default(GROUP)
  members   RoomMember[]
  messages  Message[]
  createdAt DateTime     @default(now())
}

model RoomMember {
  roomId    String
  userId    String
  room      Room     @relation(fields: [roomId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  joinedAt  DateTime @default(now())
  lastRead  DateTime @default(now())
  @@id([roomId, userId])
}

model Message {
  id        String      @id @default(cuid())
  content   String
  type      MessageType @default(TEXT)
  roomId    String
  room      Room        @relation(fields: [roomId], references: [id])
  senderId  String
  sender    User        @relation(fields: [senderId], references: [id])
  fileUrl   String?
  fileName  String?
  createdAt DateTime    @default(now())

  @@index([roomId, createdAt])
}

enum RoomType { DM, GROUP }
enum MessageType { TEXT, IMAGE, FILE, SYSTEM }
```

### Folder Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (chat)/
│   │   ├── layout.tsx            # Chat layout (sidebar + main)
│   │   ├── page.tsx              # Default: select a conversation
│   │   └── [roomId]/page.tsx     # Chat room
│   ├── api/
│   │   ├── rooms/route.ts
│   │   ├── messages/route.ts
│   │   ├── upload/route.ts
│   │   └── auth/[...nextauth]/route.ts
├── components/
│   ├── chat/
│   │   ├── RoomList.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   ├── TypingIndicator.tsx
│   │   ├── OnlineStatus.tsx
│   │   └── CreateRoomModal.tsx
├── lib/
│   ├── socket.ts               # Socket.io client setup
│   └── db.ts
├── server/
│   └── socket.ts               # Socket.io server setup
```

### Starter Prompts

**Prompt 1:**
```
Set up a real-time chat app with Next.js 14 and Socket.io.
Create a custom server.ts file that attaches Socket.io to the Next.js HTTP server.
Set up the Prisma schema with User, Room, RoomMember, and Message models.
Add NextAuth.js for authentication.
Create the chat layout: left sidebar (room list), main area (messages), right panel (room info).
```

**Prompt 2:**
```
Build the messaging functionality.
Socket events:
- "join-room": user joins a room, receive message history
- "send-message": send a message, broadcast to room members
- "typing-start" / "typing-stop": typing indicators
- "user-online" / "user-offline": presence updates

The message list should:
- Load last 50 messages on room join
- Infinite scroll up to load more
- Auto-scroll to bottom on new messages
- Group messages by sender (consecutive messages from same user)
- Show timestamps between message groups
- Show a "New messages" divider for unread messages
```

**Prompt 3:**
```
Add these features:
1. Direct messages: click a user to start a DM (creates a DM room)
2. Group rooms: create room with name, invite members by email
3. File sharing: drag and drop files into the message input, upload to Vercel Blob
4. Unread counts: show unread badge next to each room in the sidebar
5. Online status: green dot for online, gray for offline, last seen time
6. Search: search messages within a room
```

### Milestones

1. **Week 1:** Setup, auth, room list, basic Socket.io connection
2. **Week 2:** Messaging, typing indicators, message history
3. **Week 3:** DMs, group rooms, file sharing
4. **Week 4:** Unread counts, search, polish, deploy
