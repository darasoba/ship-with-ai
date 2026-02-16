---
title: "Setup & Deploy"
slug: "setup-and-deploy"
---

# Setup & Deployment Guide -- Ship With AI

From local environment to live URL. This guide covers setting up your dev environment, managing API keys, and deploying your project.

Whether you are wiring up Supabase for the first time or pushing a finished app to Vercel, everything you need is here in one place. Part 1 handles environment variables, secrets, and service configuration. Part 2 walks through deployment to every platform we use -- Vercel, Netlify, Railway, Chrome Web Store, and Figma plugins -- plus CI/CD and domain setup.

---

## Table of Contents

### Part 1: Environment Setup & API Keys

1. [What Are Environment Variables and Why Do They Exist](#1-what-are-environment-variables-and-why-do-they-exist)
2. [The .env File](#2-the-env-file)
3. [.gitignore: Keeping Secrets Out of GitHub](#3-gitignore-keeping-secrets-out-of-github)
4. [Service-by-Service Setup Guides](#4-service-by-service-setup-guides)
5. [Accessing Env Variables in Your Code](#5-accessing-env-variables-in-your-code)
6. [Common Env Variable Issues](#6-common-env-variable-issues)
7. [Prompt to Ask AI for Help With Env Setup](#7-prompt-to-ask-ai-for-help-with-env-setup)
8. [Quick Reference: All Environment Variables](#quick-reference-all-environment-variables)
9. [Checklist Before You Ship](#checklist-before-you-ship)

### Part 2: Deployment

9. [How to Deploy Your App](#9-how-to-deploy-your-app)
10. [Deploying to Vercel](#10-deploying-to-vercel)
11. [Deploying to Netlify](#11-deploying-to-netlify)
12. [Deploying to Railway](#12-deploying-to-railway)
13. [Deploying to Cloudflare Workers](#13-deploying-to-cloudflare-workers)
15. [Publishing a Chrome Extension](#15-publishing-a-chrome-extension)
16. [Publishing a Figma Plugin](#16-publishing-a-figma-plugin)
17. [Environment Variable Best Practices](#17-environment-variable-best-practices)
18. [Domain and DNS Quick Reference](#18-domain-and-dns-quick-reference)
19. [CI/CD Basics](#19-cicd-basics)

---

# Part 1: Environment Setup & API Keys

---

## 1. What Are Environment Variables and Why Do They Exist

Environment variables are secret settings your app needs to work -- things like API keys, database URLs, and passwords. Think of them as a locked drawer where you keep all the keys to the services your app talks to.

**Why are they separate from your code?**

If you hardcode an API key directly into your source code, that key ends up in your Git history. Push that to GitHub and anyone can see it. Bots actively scan public repos for exposed keys. People have woken up to thousands of dollars in AWS charges because a bot found their key and spun up crypto miners. This is not hypothetical -- it happens regularly.

**The .env file pattern:**

Instead of putting secrets in your code, you put them in a special file (`.env` or `.env.local`) that lives in your project folder. Your app reads from this file at startup. You then tell Git to ignore this file so it never gets committed. Your code stays clean, your secrets stay local, and everyone on the team can have their own copy of the file with their own keys.

---

## 2. The .env File

### Creating Your .env.local File

In your project root (the same folder where `package.json` lives), create a file called `.env.local`. Next.js automatically reads this file when you run `npm run dev`.

```bash
# From your project root
touch .env.local
```

### Format Rules

Each line is a key-value pair. Follow these rules:

- **No spaces** around the `=` sign
- **No quotes** around values unless the value itself contains spaces
- **One variable per line**
- **Comments** start with `#`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe
STRIPE_SECRET_KEY=sk_test_51ABC123...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...
```

### The NEXT_PUBLIC_ Prefix

This is important and a common source of confusion:

| Prefix | Where It's Available | Use For |
|--------|---------------------|---------|
| `NEXT_PUBLIC_` | Browser AND server | Non-secret values (Supabase URL, publishable keys) |
| No prefix | Server only | Secret keys (service role keys, secret API keys) |

**Rule of thumb:** If someone having this value could do damage, do NOT put `NEXT_PUBLIC_` in front of it.

- `NEXT_PUBLIC_SUPABASE_URL` -- This is fine. The URL isn't secret.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` -- This is fine. The anon key is designed to be public (Row Level Security protects your data).
- `SUPABASE_SERVICE_ROLE_KEY` -- No prefix. This key bypasses all security. Never expose it to the browser.

---

## 3. .gitignore: Keeping Secrets Out of GitHub

### What .gitignore Does

The `.gitignore` file tells Git which files and folders to skip when tracking changes. Any file listed here will not be committed or pushed to GitHub, even if it sits right there in your project folder.

### Setting Up Your .gitignore

Most Next.js starters include a `.gitignore`, but double-check that it has these entries. If you don't have one, create it in your project root:

```gitignore
# Environment variables (NEVER commit these)
.env
.env.local
.env.production
.env*.local

# Dependencies
node_modules/

# Next.js build output
.next/

# macOS files
.DS_Store

# Vercel
.vercel

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### How to Check If Your .env Is Being Tracked

Run this in your terminal:

```bash
git status
```

If you see `.env.local` listed under "Untracked files" -- that's good. Git sees the file but isn't tracking it.

If you see `.env.local` listed under "Changes to be committed" or "Changes not staged for commit" -- that's bad. Git is tracking it.

You can also check explicitly:

```bash
git ls-files --cached | grep .env
```

If this returns nothing, you're safe. If it returns `.env.local` or similar, the file is tracked.

### What to Do If You Accidentally Committed a Secret

**Stop and do this immediately:**

1. **Rotate the key first.** Go to the service dashboard (Supabase, Stripe, whatever) and generate a new key. The old one is compromised the moment it hit GitHub, even if you delete it from the repo. Git history keeps everything.

2. **Remove the file from Git tracking** (but keep it on your machine):
   ```bash
   git rm --cached .env.local
   ```

3. **Make sure .gitignore includes the file**, then commit:
   ```bash
   git add .gitignore
   git commit -m "Remove .env.local from tracking, add to .gitignore"
   ```

4. **Update your .env.local** with the new rotated keys.

The key point: deleting the file from your repo does NOT delete it from Git history. Anyone who clones your repo can find it. That's why you rotate the key -- the old one becomes useless.

---

## 4. Service-by-Service Setup Guides

### Supabase (Database + Auth)

Supabase gives you a Postgres database, authentication, and real-time subscriptions. Most of your projects will use this.

**Step 1: Create your account**

Go to [supabase.com](https://supabase.com) and sign up (GitHub login works).

**Step 2: Create a new project**

- Click "New Project" from the dashboard
- Choose your organization (or create one)
- Give your project a name
- Set a database password -- save this somewhere, you'll need it if you ever connect directly to Postgres
- Choose a region close to your users (if you're in the US, pick East US or West US)
- Click "Create new project"
- Wait about 2 minutes for it to spin up

**Step 3: Find your API keys**

Once your project is ready:

1. Click the **gear icon** (Settings) in the left sidebar
2. Click **API** under the "Configuration" section
3. You'll see three things you need:
   - **Project URL** -- looks like `https://abcdefgh.supabase.co`
   - **anon (public) key** -- a long JWT string starting with `eyJ...`
   - **service_role key** -- another long JWT string (click "Reveal" to see it)

**Step 4: Add to your .env.local**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im...
```

**Step 5: Install the client library**

```bash
npm install @supabase/supabase-js
```

**Step 6: Set up Google OAuth (if your project needs social login)**

This one takes a few more steps because you need to configure both Google Cloud and Supabase.

**In Google Cloud Console:**

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project (or select an existing one) using the project dropdown at the top
3. In the left sidebar, go to **APIs & Services > OAuth consent screen**
4. Choose "External" user type, click Create
5. Fill in the required fields (App name, user support email, developer email). You can skip optional fields for now.
6. Click "Save and Continue" through the Scopes and Test Users sections
7. Now go to **APIs & Services > Credentials**
8. Click **"+ Create Credentials"** at the top, then **"OAuth client ID"**
9. Application type: **Web application**
10. Under "Authorized redirect URIs", add your Supabase callback URL:
    ```
    https://abcdefgh.supabase.co/auth/v1/callback
    ```
    (Replace `abcdefgh` with your actual Supabase project reference)
11. Click Create. You'll get a **Client ID** and **Client Secret** -- copy both.

**In Supabase:**

1. Go to **Authentication** in the left sidebar
2. Click **Providers**
3. Find **Google** and toggle it on
4. Paste your **Client ID** and **Client Secret** from Google Cloud
5. Click Save

Now your users can sign in with Google.

---

### Vercel (Deployment)

Vercel is where you deploy your Next.js app to the internet.

**Step 1: Create your account**

Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.

**Step 2: Import your repo**

- Click "Add New..." > "Project"
- Select your GitHub repo from the list
- Vercel will auto-detect that it's a Next.js project
- Before you click Deploy, set up your environment variables (next step)

**Step 3: Add environment variables**

This is the part people forget. Your `.env.local` file does NOT get deployed. You need to manually add every variable to Vercel.

1. In your project on Vercel, go to **Settings** (tab at the top)
2. Click **Environment Variables** in the left sidebar
3. For each variable in your `.env.local`:
   - Type the **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Paste the **Value**
   - Select which environments it applies to: **Production**, **Preview**, **Development**
   - For most variables, check all three
   - Click **Save**
4. Repeat for every variable

**Step 4: Redeploy after adding variables**

If you already deployed before adding the variables, you need to trigger a redeploy:

1. Go to the **Deployments** tab
2. Find the latest deployment
3. Click the three dots menu (...) and choose **Redeploy**

**Pro tip:** You can paste multiple variables at once. If you copy your entire `.env.local` content and paste it into the Key field, Vercel will automatically split them into separate key-value pairs.

---

### Stripe (Payments)

Only set this up if your project involves taking payments.

**Step 1: Create your account**

Go to [stripe.com](https://stripe.com) and sign up.

**Step 2: Switch to test mode**

In the Stripe dashboard, look at the top-right area. There's a **"Test mode"** toggle. Make sure it's ON. You'll see an orange "TEST" badge when it's active. Always develop in test mode -- no real money moves.

**Step 3: Find your API keys**

1. Click **Developers** in the top navigation bar
2. Click **API keys**
3. You'll see:
   - **Publishable key** -- starts with `pk_test_`
   - **Secret key** -- starts with `sk_test_` (click "Reveal test key" to see it)

**Step 4: Add to your .env.local**

```bash
STRIPE_SECRET_KEY=sk_test_51ABC123...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...
```

**Step 5: Set up webhooks (for subscription/payment confirmation)**

If you need Stripe to notify your app when payments happen:

1. Go to **Developers > Webhooks**
2. Click **"Add endpoint"**
3. Enter your endpoint URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events to listen for (common ones: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`)
5. Click "Add endpoint"
6. Click on the endpoint, then click **"Reveal"** under Signing secret
7. Add this to your `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

**Test card numbers:**

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 0002` | Card declined |
| `4000 0025 0000 3155` | Requires 3D Secure authentication |

Use any future expiration date and any 3-digit CVC.

---

### Resend (Email)

Use this if your project sends transactional emails (welcome emails, password resets, notifications).

**Step 1: Create your account**

Go to [resend.com](https://resend.com) and sign up.

**Step 2: Get your API key**

1. From the dashboard, click **API Keys** in the left sidebar
2. Click **"Create API Key"**
3. Give it a name (e.g., "my-project-dev")
4. Choose permissions -- "Full access" is fine for development
5. Copy the key immediately. You won't see it again.

**Step 3: Add to your .env.local**

```bash
RESEND_API_KEY=re_123abc...
```

**Step 4: Set up a sender**

You have two options:

- **Free/quick option:** Use `onboarding@resend.dev` as the sender email. This works immediately but can only send to your own email address (good for testing).
- **Custom domain:** Go to **Domains** in the sidebar, add your domain, and add the DNS records Resend gives you. This lets you send from `hello@yourdomain.com` to anyone.

**Step 5: Install the SDK**

```bash
npm install resend
```

---

### Uploadthing (File Uploads)

Use this if your project needs file uploads (profile pictures, documents, etc.). Uploadthing is built specifically for Next.js and is the easiest option.

**Step 1: Create your account**

Go to [uploadthing.com](https://uploadthing.com) and sign up.

**Step 2: Create an app**

Click "Create App" from the dashboard and give it a name.

**Step 3: Get your keys**

From your app dashboard, go to **API Keys**. You'll see:

- **UPLOADTHING_TOKEN** -- used for authentication

**Step 4: Add to your .env.local**

```bash
UPLOADTHING_TOKEN=your-token-here
```

**Step 5: Install the packages**

```bash
npm install uploadthing @uploadthing/react
```

---

### Cloudinary (File Uploads -- Alternative)

If you need more control over image/video transformations, Cloudinary is the go-to.

**Step 1: Create your account**

Go to [cloudinary.com](https://cloudinary.com) and sign up. The free tier is generous.

**Step 2: Find your credentials**

From the dashboard, you'll see your account details right on the main page:

- **Cloud name**
- **API Key**
- **API Secret**

**Step 3: Add to your .env.local**

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret
```

**Step 4: Install the SDK**

```bash
npm install cloudinary
```

---

## 5. Accessing Env Variables in Your Code

### Server-Side (API Routes, Server Components, Server Actions)

Use `process.env.VARIABLE_NAME` directly:

```typescript
// app/api/example/route.ts
export async function POST(request: Request) {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // This works because API routes run on the server
}
```

```typescript
// app/page.tsx (Server Component -- the default in App Router)
export default async function Page() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  // This works because server components run on the server
}
```

### Client-Side (Client Components)

Only variables prefixed with `NEXT_PUBLIC_` are available:

```typescript
"use client";

export default function MyComponent() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // This works -- it has the NEXT_PUBLIC_ prefix

  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // This will be undefined -- no NEXT_PUBLIC_ prefix
  // Next.js strips it out to protect you
}
```

### Creating a Typed Env Helper

Instead of typing `process.env.NEXT_PUBLIC_SUPABASE_URL` everywhere and hoping you didn't make a typo, create a helper file:

```typescript
// lib/env.ts

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// Server-side variables (only import this in server code)
export const env = {
  supabase: {
    url: getEnvVar("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    serviceRoleKey: getEnvVar("SUPABASE_SERVICE_ROLE_KEY"),
  },
  stripe: {
    secretKey: getEnvVar("STRIPE_SECRET_KEY"),
    webhookSecret: getEnvVar("STRIPE_WEBHOOK_SECRET"),
  },
};
```

```typescript
// lib/env.client.ts

// Client-safe variables (safe to import anywhere)
export const clientEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
};
```

Now you get autocomplete and immediate errors if a variable is missing, instead of mysterious `undefined` bugs at runtime.

---

## 6. Common Env Variable Issues

### "My env variable is undefined"

**Most likely cause:** You didn't restart the dev server.

Next.js reads `.env.local` once at startup. If you add or change a variable, you need to stop the server (`Ctrl + C`) and run `npm run dev` again.

```bash
# Stop the server (Ctrl + C), then:
npm run dev
```

### "It works locally but not on Vercel"

**Most likely cause:** You didn't add the variable to Vercel's dashboard.

Your `.env.local` file stays on your machine. Vercel knows nothing about it. Go to your Vercel project > Settings > Environment Variables and add every variable manually. Then redeploy.

### "My API key is showing in the browser"

**Most likely cause:** You put `NEXT_PUBLIC_` on a secret key.

Open your browser's DevTools (F12), go to the Network tab, and check what's being sent. If a secret key is visible in the browser, remove the `NEXT_PUBLIC_` prefix from that variable in `.env.local`, update your code to only use it on the server, and rotate the key (since it's been exposed).

### "CORS error when calling my API"

**Possible cause:** The URL in your env variable doesn't match your actual domain.

Check these things:
- Is there a trailing slash mismatch? (`https://example.com` vs `https://example.com/`)
- Are you using `http` locally but `https` in production?
- Is the Supabase URL correct? Copy it fresh from your Supabase dashboard.

### "Environment variable works in one file but not another"

**Possible cause:** You're trying to use a server-only variable in a client component.

Remember: variables without `NEXT_PUBLIC_` are only available in:
- `app/api/` routes
- Server Components (files without `"use client"`)
- Server Actions
- `middleware.ts`

They are NOT available in:
- Any file with `"use client"` at the top
- Code that runs in the browser

### "I just cloned the repo and nothing works"

You need to create your own `.env.local` file. It's not in the repo (because `.gitignore` keeps it out). Ask your teammate for the list of required variables, or check if there's an `.env.example` file in the repo that shows the variable names without real values.

---

## 7. Prompt to Ask AI for Help With Env Setup

When you're stuck on environment variable issues, use this prompt template with Claude Code, Cursor, or ChatGPT:

```
I'm setting up [Supabase / Stripe / Resend / etc] for my Next.js project.

Here's my current .env.local (with placeholder values -- I've replaced my real keys):
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-key

I'm getting this error:
[paste the full error message here]

My setup:
- Next.js version: [14 / 15]
- App Router or Pages Router: [App Router]
- The error happens when I: [describe what you're doing when the error appears]

Help me figure out which env variable is wrong or missing.
Don't show me your own API keys. Just tell me where to find mine
and what format they should be in.
```

**Tips for good debugging prompts:**

- Always include the actual error message -- don't paraphrase it
- Mention whether it works locally or only fails on deployment
- Say which file the error occurs in
- Replace your real keys with placeholders before pasting (just in case)

---

## Quick Reference: All Environment Variables

Here's every variable you might need, depending on your project:

```bash
# === Supabase (Database + Auth) ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# === Stripe (Payments) ===
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# === Resend (Email) ===
RESEND_API_KEY=

# === Uploadthing (File Uploads) ===
UPLOADTHING_TOKEN=

# === Cloudinary (File Uploads -- Alternative) ===
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# === App Config ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Copy the variables you need into your `.env.local` and fill in the values from each service's dashboard.

---

## Checklist Before You Ship

- [ ] Every secret key does NOT have the `NEXT_PUBLIC_` prefix
- [ ] `.env.local` is listed in your `.gitignore`
- [ ] Running `git status` does NOT show `.env.local` as tracked
- [ ] All variables are added to Vercel's Environment Variables dashboard
- [ ] You've tested the deployed version (not just localhost)
- [ ] You have an `.env.example` file in your repo with variable names but no real values
- [ ] If you ever committed a secret by accident, you've rotated that key

---

# Part 2: Deployment

---

## 9. How to Deploy Your App

Deployment means putting your app on the internet so anyone with the URL can use it. Right now your app runs on `localhost:3000` -- only you can see it. After deployment, it lives at a real URL like `yourapp.vercel.app` or `yourapp.com`.

This section walks through the general process. The sections after this one cover platform-specific steps.

### Pre-Deployment Checklist

Before you deploy anything, run through this:

- [ ] **Your app builds without errors.** Run `npm run build` locally. If it fails, fix the errors before deploying. The build will fail on the server too.
- [ ] **No hardcoded localhost URLs.** Search your code for `localhost:3000` or `127.0.0.1`. Replace them with environment variables or relative paths.
- [ ] **Environment variables are documented.** You know exactly which variables your app needs. Write them down -- you'll add them to your hosting platform.
- [ ] **Secrets are not in your code.** Run `git log --all -p | grep -i "sk_"` or similar to check that no API keys slipped into your Git history.
- [ ] **Your `.gitignore` includes `.env.local`.** Double-check. See Section 3 above.
- [ ] **The app works in production mode locally.** Run `npm run build && npm start` (not `npm run dev`). Some bugs only show up in production builds -- missing environment variables, broken imports, server/client mismatches.

### Which Platform Should You Use?

| If you're building... | Use this | Why |
|---|---|---|
| A Next.js app | **Vercel** | Made by the same team. Zero-config deployment. Free tier is generous. |
| A static site or React SPA | **Netlify**, **Vercel**, or **Cloudflare Workers** | All three work great. Cloudflare has the best free tier (unlimited bandwidth). |
| A backend API or full-stack app with a database | **Railway** | Gives you a server process + managed Postgres in one place. |
| A fast, globally distributed site | **Cloudflare Workers** | Deploys to 300+ edge locations. Best performance for static/SPA apps. |
| A Chrome extension | **Chrome Web Store** | That's the only option. See Section 15. |
| A Figma plugin | **Figma Community** | Also the only option. See Section 16. |

If you're not sure, **pick Vercel.** It handles the most common case (Next.js app with a database hosted elsewhere like Supabase) and the free tier covers everything you need for this cohort.

### The General Deployment Process

Every platform works slightly differently, but the process is always the same five steps:

**Step 1: Push your code to GitHub.**

Your hosting platform pulls code from your repo. Make sure your latest changes are committed and pushed.

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

**Step 2: Connect your repo to the hosting platform.**

Sign up on Vercel/Netlify/Railway, click "New Project," and select your GitHub repo. The platform detects your framework and configures the build automatically.

**Step 3: Add your environment variables.**

Your `.env.local` file does NOT get deployed. You need to manually add every variable to the platform's dashboard. This is the step people forget, and it's the #1 reason deployments fail.

**Step 4: Deploy.**

Click the deploy button (or push to `main` -- most platforms auto-deploy on push). The platform installs your dependencies, runs `npm run build`, and serves the result.

**Step 5: Test the live URL.**

Open the URL the platform gives you. Click through your app. Check that:
- Pages load without blank screens
- Auth works (login, signup, logout)
- Data loads from your database
- Forms submit correctly
- It looks right on mobile

If something breaks, check the deployment logs on the platform's dashboard. 9 times out of 10, it's a missing environment variable.

### Common Deployment Mistakes

**"It works on localhost but not in production."**

This is almost always one of these:

1. **Missing environment variable.** You added it to `.env.local` but forgot to add it to Vercel/Netlify/Railway. Go to the platform dashboard and check.
2. **Hardcoded localhost URL.** You have `http://localhost:3000/api/something` somewhere in your code. Replace it with a relative path (`/api/something`) or use an environment variable.
3. **Server vs. client mismatch.** Code that uses `window` or `document` is running on the server during build. Wrap it in `if (typeof window !== 'undefined')` or use `"use client"` in Next.js.
4. **Build error you didn't catch locally.** Run `npm run build` on your machine first. If it fails locally, it will fail on the server.

**"My deploy succeeded but the page is blank."**

Check the browser console (F12 > Console tab). You'll usually see one of:
- A JavaScript error pointing to a missing variable
- A failed network request to an API that doesn't exist at the deployed URL
- A hydration mismatch error (server HTML doesn't match client HTML)

**"My database queries work locally but fail in production."**

- Is `DATABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) set correctly on the platform?
- Are you using the production database URL, not the local one?
- If using Supabase, did you set up Row Level Security (RLS) policies? Without them, reads return empty results in production.

**"My images/assets aren't loading."**

- Are you using absolute paths that include `localhost`?
- Did you put images in the `public/` folder? That's where static assets go in Next.js.
- Are image URLs stored in the database still pointing to local paths?

### After Deployment

Once your app is live:

1. **Save the URL.** You'll need it for your demo, README, and portfolio.
2. **Set up auto-deploy.** Most platforms auto-deploy when you push to `main`. Verify this is working -- push a small change and check that the live site updates.
3. **Test on your phone.** Pull up the URL on your actual phone, not just the browser's responsive mode. Tap around. Make sure nothing is broken.
4. **Share with one person.** Send the link to your buddy, a friend, or your mentor. Ask them to try it. Fresh eyes catch things you've gone blind to.

---

## 10. Deploying to Vercel

Vercel is the best option for Next.js apps. It is made by the same team.

### First-Time Setup

#### Option A: Deploy from GitHub (Recommended)

1. Go to vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects your framework (Next.js, React, etc.)
5. Click "Deploy"

That is it. Every push to `main` will trigger a new production deploy. Pull requests get preview deployments automatically.

#### Option B: Deploy from CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (first time: follow the setup wizard)
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

#### In the Dashboard

1. Go to your project on vercel.com
2. Settings > Environment Variables
3. Add each variable with its value
4. Select the environments: Production, Preview, Development

#### From CLI

```bash
# Add a variable
vercel env add DATABASE_URL

# Pull variables to local .env file
vercel env pull .env.local

# List all variables
vercel env ls
```

#### Common Variables for Next.js

```
DATABASE_URL=postgresql://user:pass@host:5432/dbname
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

Important: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets in `NEXT_PUBLIC_` variables.

### Custom Domain

1. Go to project Settings > Domains
2. Enter your domain name (e.g., myapp.com)
3. Add the DNS records Vercel gives you:
   - For root domain: A record pointing to `76.76.21.21`
   - For www: CNAME record pointing to `cname.vercel-dns.com`
4. Wait for DNS propagation (usually 5-30 minutes)
5. SSL certificate is generated automatically

### Build Configuration

Edit `vercel.json` in your project root (optional):

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

### Preview Deployments

Every pull request gets its own URL:
- `your-project-git-branch-name-username.vercel.app`

Preview deploys use your "Preview" environment variables, not production ones. This is useful for testing with a staging database.

### CI/CD with GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Deploy
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

To get these secrets:
1. `VERCEL_TOKEN`: Account Settings > Tokens > Create
2. `VERCEL_ORG_ID`: Run `vercel link` then check `.vercel/project.json`
3. `VERCEL_PROJECT_ID`: Same `.vercel/project.json` file

---

## 11. Deploying to Netlify

Netlify is great for static sites, Jamstack apps, and serverless functions.

### First-Time Setup

#### From GitHub

1. Go to netlify.com and sign in
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub repo
4. Set the build command and publish directory:
   - Next.js: Build `next build`, Publish `.next`
   - React (CRA): Build `npm run build`, Publish `build`
   - Static: Build `` (empty), Publish `public` or `dist`
5. Click "Deploy site"

#### From CLI

```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Initialize (link to existing site or create new)
netlify init

# Deploy draft (preview)
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Environment Variables

#### From CLI

```bash
# Set a variable
netlify env:set DATABASE_URL "postgresql://..."

# Set for specific context
netlify env:set API_KEY "staging-key" --context deploy-preview

# Import from .env file
netlify env:import .env

# List all variables
netlify env:list

# Get a specific variable
netlify env:get DATABASE_URL

# Delete a variable
netlify env:unset OLD_VARIABLE
```

#### Deploy Contexts

Netlify has different contexts for different environments:

| Context | When it applies |
|---------|----------------|
| `production` | Deploys from your production branch |
| `deploy-preview` | Pull request preview deploys |
| `branch-deploy` | Deploys from non-production branches |
| `dev` | Local development with `netlify dev` |

```bash
# Set variable for production only
netlify env:set API_URL "https://api.prod.com" --context production

# Set for preview deploys
netlify env:set API_URL "https://api.staging.com" --context deploy-preview
```

### Custom Domain

1. Go to Site Settings > Domain Management
2. Click "Add custom domain"
3. Enter your domain
4. Update DNS: Add a CNAME record pointing to `your-site.netlify.app`
5. SSL is automatic via Let's Encrypt

### Netlify Functions (Serverless)

Create serverless functions in `netlify/functions/`:

```javascript
// netlify/functions/hello.js
export default async (req, context) => {
  return new Response(JSON.stringify({ message: "Hello!" }), {
    headers: { "content-type": "application/json" },
  });
};
```

Access at: `/.netlify/functions/hello`

### Build Configuration

`netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
```

### Local Development

```bash
# Run your site locally with Netlify's environment
netlify dev

# This gives you:
# - Access to environment variables from Netlify
# - Serverless functions at /.netlify/functions/
# - Edge functions
# - Redirect and header rules
```

---

## 12. Deploying to Railway

Railway is great for backends, databases, and anything that needs a server process running.

### First-Time Setup

#### From Dashboard

1. Go to railway.app and sign in with GitHub
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository
5. Railway detects the language and starts deploying

#### From CLI

```bash
# Install
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Link to existing project
railway link

# Deploy
railway up
```

### Adding a Database

#### PostgreSQL

1. In your project dashboard, click "+ New"
2. Select "Database" > "PostgreSQL"
3. Railway creates the database and adds the `DATABASE_URL` variable automatically
4. Use the variable in your app:

```bash
# The DATABASE_URL is auto-injected into your service
# Format: postgresql://user:pass@host:port/dbname
```

#### Redis

Same process: "+ New" > "Database" > "Redis"

The `REDIS_URL` variable is automatically available to your services.

### Environment Variables

```bash
# Set a variable
railway variables set DATABASE_URL="postgresql://..."

# List variables
railway variables list

# Open the variables dashboard
railway variables
```

Or set them in the Railway dashboard under your service's "Variables" tab.

### Custom Domain

1. Go to your service in the Railway dashboard
2. Settings > Networking > Custom Domain
3. Add your domain
4. Add the CNAME record Railway gives you
5. SSL is automatic

Railway also gives you a free `*.up.railway.app` domain for each service.

### Railway Configuration

`railway.json`:

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

Or use a `Procfile`:

```
web: npm start
worker: npm run worker
```

### Deploying a Full-Stack App

A typical Railway project has multiple services:

```
Railway Project
├── Web Service (Next.js frontend + API)
├── PostgreSQL Database
├── Redis (caching/sessions)
└── Worker Service (background jobs)
```

Each service gets its own container. Services can communicate using internal networking with Railway's private DNS.

### Health Checks

Add a health check endpoint:

```typescript
// app/api/health/route.ts
export function GET() {
  return Response.json({ status: "ok", timestamp: Date.now() });
}
```

Configure in Railway: Settings > Deploy > Health Check Path: `/api/health`

---

## 13. Deploying to Cloudflare Workers

Cloudflare recently merged Pages into Workers, so everything now lives under **Cloudflare Workers**. If you see old tutorials referencing "Cloudflare Pages" -- that still works for existing projects, but new projects should use Workers directly.

Workers deploys your app to 300+ edge locations worldwide. The free tier is generous -- 100,000 requests/day, unlimited static asset bandwidth, and 500 builds per month.

### First-Time Setup

#### From the Dashboard

1. Go to dash.cloudflare.com and sign up (or log in)
2. In the left sidebar, click **Workers & Pages**
3. Click **Create** > **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select your repository
6. Configure your build settings:
   - **Framework preset:** Select your framework (Next.js, React, etc.) -- Cloudflare auto-fills the build command and output directory
   - **Build command:** `npm run build` (usually auto-detected)
   - **Build output directory:** Depends on your framework:

| Framework | Output directory |
|-----------|-----------------|
| Next.js | `.open-next/` |
| React (CRA) | `build` |
| Vite | `dist` |
| Static HTML | `/` or `public` |

7. Click **Save and Deploy**

#### From CLI (Wrangler)

```bash
# Install Wrangler (Cloudflare's CLI)
npm install -g wrangler

# Login
wrangler login

# Deploy (from your project root)
npm run build && npx wrangler deploy
```

### Static Sites and SPAs

For a static site or single-page app (React, Vite, etc.), add a `wrangler.toml` to your project root:

```toml
name = "my-project"
compatibility_date = "2025-01-01"

[assets]
directory = "./dist"
```

Replace `./dist` with your actual build output folder (`build` for CRA, `dist` for Vite, `public` for static HTML).

For SPAs that use client-side routing (React Router, etc.), add this so all routes serve `index.html`:

```toml
[assets]
directory = "./dist"
not_found_handling = "single-page-application"
```

Then deploy:

```bash
npm run build && npx wrangler deploy
```

### Next.js on Cloudflare Workers

The old `@cloudflare/next-on-pages` package is deprecated. Use the **OpenNext adapter** instead:

```bash
npm install -D @opennextjs/cloudflare
```

Add a build script to your `package.json`:

```json
{
  "scripts": {
    "build": "npx @opennextjs/cloudflare",
    "dev": "next dev"
  }
}
```

Add a `wrangler.jsonc` to your project root:

```jsonc
{
  "name": "my-nextjs-app",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

Deploy:

```bash
npm run build && npx wrangler deploy
```

**Key difference from the old adapter:** OpenNext uses the Node.js runtime instead of the Edge runtime. This means most Node.js APIs work out of the box, which is a big improvement over `@cloudflare/next-on-pages`.

**Limitations to know about:**
- Some advanced Next.js features (like ISR with `revalidate`) may behave differently than on Vercel
- Image optimization (`next/image`) needs a custom loader or Cloudflare Images
- If you hit weird issues, switch to Vercel -- it's the path of least resistance for Next.js

For most student projects, these limitations won't matter.

### Environment Variables

#### In the Dashboard

1. Go to your Workers project
2. **Settings** > **Variables and Secrets**
3. Add each variable with its value
4. Click **Save**

Important: You need to redeploy after adding or changing variables.

#### From CLI

```bash
# Set a secret (you'll be prompted for the value)
npx wrangler secret put MY_SECRET

# Or set non-secret variables in wrangler.toml
```

```toml
# wrangler.toml
[vars]
NEXT_PUBLIC_APP_URL = "https://myapp.workers.dev"
```

Note: Don't put secrets in `wrangler.toml` -- it gets committed to Git. Use the dashboard or `wrangler secret put` for secret values.

### Custom Domain

1. Go to your Workers project > **Settings** > **Domains & Routes**
2. Click **Add** > **Custom domain**
3. Enter your domain (e.g., `myapp.com`)
4. If your domain is already on Cloudflare DNS, the records are added automatically
5. If your domain is elsewhere, add the CNAME record Cloudflare gives you
6. SSL is automatic and free

Cloudflare also gives you a free `*.workers.dev` domain for every project.

### Preview Deployments

Every pull request gets its own preview URL when you deploy via Git integration. Preview deploys use your "Preview" environment variables.

### Why Choose Cloudflare Workers?

- **Speed.** 300+ edge locations worldwide. Users get served from the closest one.
- **Free tier.** 100,000 requests/day, unlimited static asset bandwidth, 500 builds/month. Hard to beat.
- **The ecosystem.** KV (key-value storage), D1 (SQLite database), R2 (file storage), Queues, Durable Objects -- all available as add-ons. If you outgrow Supabase or need something specific, Cloudflare probably has it.
- **Simple for static sites.** For a Vite or React SPA, it's a `wrangler.toml` and one command.

---

## 15. Publishing a Chrome Extension

### Before You Start

Requirements:
- A Google developer account ($5 one-time fee)
- Your extension built with Manifest V3
- All code bundled locally (no remote code execution)
- Icons: 16x16, 48x48, 128x128 PNG files
- At least one screenshot (1280x800 or 640x400)
- A description (up to 132 characters for short, longer for full)

### Manifest V3 Checklist

```json
{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0.0",
  "description": "A short description of what it does",
  "permissions": ["storage", "activeTab"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

**Permission tips:**
- Only request what you actually use. Broad permissions (`<all_urls>`) get flagged.
- Use `activeTab` instead of broad host permissions when possible.
- If you need `<all_urls>`, explain why in the review notes.

### Building for Production

```bash
# If using a bundler (webpack/vite)
npm run build

# Create a zip of the dist folder
cd dist
zip -r ../my-extension.zip .
```

### Publishing Steps

1. Go to the Chrome Developer Dashboard: https://chrome.google.com/webstore/devconsole
2. Sign up for a developer account ($5 fee)
3. Click "New Item"
4. Upload your `.zip` file
5. Fill in the store listing:
   - Title
   - Description
   - Category
   - Language
   - Screenshots (1280x800 recommended)
   - Promo tile (440x280)
6. Set distribution: Public, Unlisted, or Private
7. Submit for review

### Review Process

- Automated + manual review
- Typical review: 1-3 business days
- Over 40% of rejections are technical issues
- 30% are policy violations
- Check your developer dashboard for review status

### Common Rejection Reasons (and How to Avoid Them)

| Reason | Fix |
|--------|-----|
| Overly broad permissions | Only request what you use |
| No clear purpose | Write a clear description |
| Missing privacy policy | Add one if you collect any data |
| Remote code execution | Bundle all code locally |
| Misleading description | Match description to actual functionality |
| Extension too large (>3MB) | Optimize assets, minimize code |

### Updating Your Extension

1. Bump the version in `manifest.json`
2. Build and zip
3. Go to Developer Dashboard
4. Click your extension > "Package" > Upload new zip
5. Submit for review

### Testing Before Publishing

```bash
# Load unpacked in Chrome
1. Go to chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select your extension's build folder
5. Test all features
6. Check the console for errors (click "Inspect views")
```

---

## 16. Publishing a Figma Plugin

### Before You Start

Requirements:
- A Figma account
- Figma desktop app (required for development)
- Your plugin code (TypeScript/JavaScript)
- Plugin icon: 128x128 PNG
- Cover image: 1920x960 PNG
- A clear description of what it does

### Project Setup

```bash
# Create a new plugin project
mkdir my-figma-plugin
cd my-figma-plugin
npm init -y
npm install -D typescript @figma/plugin-typings esbuild
```

**manifest.json** (Figma plugin manifest, not Chrome):

```json
{
  "name": "My Plugin",
  "id": "your-unique-id",
  "api": "1.0.0",
  "main": "dist/code.js",
  "ui": "dist/ui.html",
  "editorType": ["figma"]
}
```

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "typeRoots": ["./node_modules/@figma"]
  },
  "include": ["src/**/*.ts"]
}
```

### Plugin Structure

```
my-figma-plugin/
├── manifest.json
├── package.json
├── tsconfig.json
├── src/
│   ├── code.ts          # Plugin logic (runs in Figma sandbox)
│   └── ui.html          # Plugin UI (iframe)
├── dist/
│   ├── code.js          # Built plugin code
│   └── ui.html          # Built UI
```

### Basic Plugin Code

**src/code.ts:**

```typescript
// This runs in the Figma sandbox
figma.showUI(__html__, { width: 320, height: 480 });

figma.ui.onmessage = (msg: { type: string; data?: any }) => {
  if (msg.type === "create-rectangle") {
    const rect = figma.createRectangle();
    rect.resize(200, 100);
    rect.fills = [{ type: "SOLID", color: { r: 0.23, g: 0.51, b: 0.97 } }];
    figma.currentPage.appendChild(rect);
    figma.viewport.scrollAndZoomIntoView([rect]);
  }

  if (msg.type === "close") {
    figma.closePlugin();
  }
};
```

**src/ui.html:**

```html
<div id="app">
  <h2>My Plugin</h2>
  <button id="create">Create Rectangle</button>
</div>

<script>
  document.getElementById("create").addEventListener("click", () => {
    parent.postMessage({ pluginMessage: { type: "create-rectangle" } }, "*");
  });
</script>

<style>
  body { font-family: Inter, system-ui, sans-serif; padding: 16px; }
  button { padding: 8px 16px; cursor: pointer; }
</style>
```

### Build Script

Add to `package.json`:

```json
{
  "scripts": {
    "build": "esbuild src/code.ts --bundle --outfile=dist/code.js && cp src/ui.html dist/ui.html",
    "watch": "esbuild src/code.ts --bundle --outfile=dist/code.js --watch"
  }
}
```

### Testing Locally

1. Open Figma desktop app
2. Go to Plugins > Development > Import plugin from manifest
3. Select your `manifest.json`
4. Run the plugin from Plugins > Development > My Plugin
5. Make changes, rebuild, re-run

### Publishing Steps

1. In Figma desktop app, go to Plugins > Manage Plugins
2. Click "Publish new plugin"
3. Fill in:
   - Plugin name
   - Description
   - Icon (128x128)
   - Cover image (1920x960)
   - Category
   - Tags
4. Link your manifest.json
5. Click "Submit for review"

### Review Process

- Figma reviews for functionality, design quality, and policy compliance
- Typical review: a few days
- You will get an email when approved or if changes are needed
- Once approved, your plugin appears in the Figma Community

### Tips for Approval

- Test thoroughly across different file types and frame structures
- Handle errors gracefully (show user-friendly messages, not crashes)
- Make the UI match Figma's design patterns
- Use Figma's component library for UI elements when possible
- Keep the plugin focused on one clear use case
- Write a clear, honest description

### Updating Your Plugin

1. Make your changes
2. Bump the version (if applicable)
3. Build
4. In Figma: Plugins > Manage Plugins > Your Plugin > Update
5. Submit for review

---

## 17. Environment Variable Best Practices

### The .env File System

```
.env                  # Shared defaults (committed to git only if no secrets)
.env.local            # Local overrides (never commit)
.env.development      # Development-specific
.env.production       # Production-specific
.env.test             # Test-specific
```

### .gitignore Rules

```gitignore
# Always ignore these
.env.local
.env.*.local
.env.development.local
.env.production.local

# Only commit .env if it has NO secrets (just defaults/placeholders)
```

### Creating an .env.example

Always commit a `.env.example` with placeholder values so other developers know what variables are needed:

```bash
# .env.example
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
NEXTAUTH_SECRET=generate-a-random-string-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
REDIS_URL=redis://localhost:6379
```

### Generating Secrets

```bash
# Generate a random secret
openssl rand -base64 32

# Or use Node
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 18. Domain and DNS Quick Reference

### Common DNS Records

| Record | Used for | Example |
|--------|----------|---------|
| A | Points domain to IP address | `@` -> `76.76.21.21` |
| CNAME | Points subdomain to another domain | `www` -> `cname.vercel-dns.com` |
| MX | Email routing | `@` -> `mail.provider.com` |
| TXT | Verification, SPF, DKIM | `@` -> `v=spf1 include:...` |

### Common Domain Registrars

- Namecheap (affordable, good UI)
- Cloudflare (free DNS, good performance)
- Google Domains (now Squarespace)
- Porkbun (cheapest option)

### SSL/TLS

All three platforms (Vercel, Netlify, Railway) provide free SSL certificates automatically. You do not need to set up SSL manually. Just point your domain and wait for the certificate to be issued.

---

## 19. CI/CD Basics

### What CI/CD Does

**Continuous Integration (CI):** Automatically runs tests and checks on every push or pull request.

**Continuous Deployment (CD):** Automatically deploys your app when code is pushed to the main branch.

### Minimal GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test
```

### Adding Secrets to GitHub Actions

1. Go to your repo on GitHub
2. Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add name and value (e.g., `VERCEL_TOKEN`)

Use in workflows:

```yaml
env:
  MY_SECRET: ${{ secrets.MY_SECRET }}
```

### Branch Protection Rules

Set these up on GitHub to prevent broken code from reaching production:

1. Go to Settings > Branches > Add rule
2. Branch name pattern: `main`
3. Enable:
   - Require a pull request before merging
   - Require status checks to pass (select your CI workflow)
   - Require branches to be up to date before merging

This means: nobody can push directly to main, and all PRs must pass CI before merging.
