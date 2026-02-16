---
title: "Troubleshooting"
slug: "troubleshooting"
---

# Troubleshooting Guide -- Ship With AI

Everything you need when something breaks, you're stuck, or you just need the fix.

This is three guides rolled into one. **Part 1** teaches you how to debug -- reading errors, using browser dev tools, and working with AI to fix things fast. **Part 2** is your playbook for when you've been going in circles and nothing seems to work. **Part 3** is a straight-up FAQ with 48 specific error messages and their fixes. Find your problem, get the answer, keep moving.

---

## Table of Contents

### Part 1: How to Debug
- [1. How to Read Error Messages](#1-how-to-read-error-messages)
- [2. Browser Dev Tools Basics](#2-browser-dev-tools-basics)
- [3. How to Ask AI to Fix Errors](#3-how-to-ask-ai-to-fix-errors)
- [4. Common Errors and What They Mean](#4-common-errors-and-what-they-mean)
- [5. The Debugging Workflow](#5-the-debugging-workflow)
- [6. Debugging with Each AI Tool](#6-debugging-with-each-ai-tool)
- [7. When It's Not a Code Error](#7-when-its-not-a-code-error)
- [Quick Reference: Error Lookup Table](#quick-reference-error-lookup-table)
- [The Golden Rules of Debugging](#the-golden-rules-of-debugging)

### Part 2: When You're Stuck
- [The 15-Minute Rule](#the-15-minute-rule)
- [The Unstuck Ladder](#the-unstuck-ladder)
- [Common "Stuck" Scenarios](#common-stuck-scenarios)
- [How to Ask for Help (in the Community Channel)](#how-to-ask-for-help-in-the-community-channel)
- [Mental Game](#mental-game)
- [Red Flags: When to Pivot](#red-flags-when-to-pivot)
- [Quick Reference: The 60-Second Version](#quick-reference-the-60-second-version)

### Part 3: Common Issues & Fixes
- [Terminal / Command Line Issues](#terminal--command-line-issues) (#1--#6)
- [Node.js / npm Issues](#nodejs--npm-issues) (#7--#12)
- [Next.js / React Issues](#nextjs--react-issues) (#13--#20)
- [Git / GitHub Issues](#git--github-issues) (#21--#26)
- [Supabase Issues](#supabase-issues) (#27--#30)
- [Claude Code Issues](#claude-code-issues) (#31--#35)
- [Cursor Issues](#cursor-issues) (#36--#39)
- [Deployment Issues](#deployment-issues) (#40--#44)
- [Browser / General Issues](#browser--general-issues) (#45--#48)
- [Quick Reference: "I Just Need the Command"](#quick-reference-i-just-need-the-command)

---

# Part 1: How to Debug

Bugs are not a sign that you're bad at coding. Bugs are *the job*. Professional developers spend 30-50% of their time debugging. The difference between someone who ships and someone who gets stuck is not that they never hit errors. It's that they know how to work through them.

This part teaches you how to read errors, find the problem, and use your AI tools to fix it fast.

---

## 1. How to Read Error Messages

Most people see a wall of red text and panic. Don't. The error message is almost always telling you exactly what's wrong. You just need to learn how to read it.

### Anatomy of an Error Message

Every error message has a few key parts:

```
Error: Cannot find module './components/HeroSection'
  at Object.<anonymous> (/Users/you/project/src/app/page.tsx:3:1)
  at Module._compile (node:internal/modules/cjs/loader:1469:14)
  at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
```

Here's what each part means:

| Part | What It Tells You |
|------|-------------------|
| **Error type** (`Error`, `TypeError`, `SyntaxError`) | The category of problem |
| **Error message** (`Cannot find module './components/HeroSection'`) | What actually went wrong, in plain English |
| **File path** (`/Users/you/project/src/app/page.tsx`) | Which file the error is in |
| **Line number** (`:3:1`) | The exact line (3) and column (1) where it broke |
| **Stack trace** (the indented lines below) | The chain of function calls that led to the error |

**The most important parts are the error message and the file path with line number.** The stack trace is useful for deeper debugging but you can often ignore most of it when starting out.

### Three Places Errors Show Up

Errors don't all appear in the same place. You need to check all three:

**Terminal errors** show up where you ran `npm run dev` or your build command. These are usually:
- Build failures (TypeScript errors, missing imports)
- Server-side errors (API routes, database connections)
- Package installation problems

**Browser console errors** show up in Chrome DevTools (more on this below). These are usually:
- Runtime JavaScript errors (something crashed while the page was running)
- Failed API calls
- React rendering errors

**Build errors** show up when you try to deploy or run `npm run build`. These are stricter than dev mode and will catch things your dev server let slide:
- TypeScript type errors that were warnings in dev mode
- Missing environment variables
- Unused imports (in some configurations)

### Real Error Examples (and What They Actually Mean)

**"Module not found: Can't resolve './components/HeroSection'"**
Translation: You're importing a file that doesn't exist at that path. Either you misspelled the filename, the file is in a different folder, or you forgot to create it.

**"TypeError: Cannot read properties of undefined (reading 'map')"**
Translation: You're trying to call `.map()` on a variable that is `undefined`. The data you expected isn't there yet. This usually means your API call hasn't finished, or the data shape is different from what you expected.

**"TypeError: Cannot read properties of null (reading 'useState')"**
Translation: You're calling a React hook outside of a React component, or you have two copies of React installed.

**Supabase: "new row violates row-level security policy for table 'posts'"**
Translation: Your Supabase RLS (Row Level Security) policy is blocking this database operation. Either you don't have a policy that allows this action, or the user isn't authenticated.

**TypeScript: "Type 'string' is not assignable to type 'number'"**
Translation: You're passing a string where TypeScript expects a number. Check the value you're passing and either convert it (`parseInt()`, `Number()`) or fix the type definition.

**Next.js: "Error: NEXT_NOT_FOUND" or "notFound() called"**
Translation: The page or route you're trying to access doesn't exist. Check your file structure in the `app/` directory and make sure the route matches what you're navigating to.

---

## 2. Browser Dev Tools Basics

Browser DevTools is your X-ray vision for what's happening in your app. Learn these four tabs and you can diagnose 80% of frontend issues.

### Opening DevTools

- **Mac:** `Cmd + Option + I`
- **Windows/Linux:** `F12` or `Ctrl + Shift + I`
- **Or:** Right-click anywhere on the page and select "Inspect"

### The Console Tab

This is where JavaScript errors appear at runtime. If your page loads but something isn't working, check here first.

What you'll see:
- **Red errors:** Something broke. Read the message.
- **Yellow warnings:** Something might be wrong but didn't crash anything. Still worth reading.
- **White/gray logs:** `console.log()` output from your code.

Pro tip: You can type JavaScript directly into the console to test things. Try typing `window.location.href` to see the current URL, or `document.querySelectorAll('button')` to see all buttons on the page.

### The Network Tab

This is where you see every HTTP request your app makes. This is critical for debugging API issues.

**How to use it:**
1. Open the Network tab
2. Reload the page (or trigger the action that's failing)
3. Look for requests highlighted in red -- those failed
4. Click on a failed request to see details

**What to look for:**
- **Status code:** `200` means success. `400` means you sent bad data. `401` means not authenticated. `403` means forbidden. `404` means the URL is wrong. `500` means the server crashed.
- **Response tab:** Click a request, then click "Response" to see what the server actually sent back. This often contains a specific error message that explains the problem.
- **Headers tab:** Check if your auth token is being sent. Look for `Authorization` in the request headers.

**Filtering tip:** Click "Fetch/XHR" at the top of the Network tab to show only API calls (hide images, CSS, etc.).

### The Elements Tab

This shows you the live HTML and CSS of the page. Useful for:
- Checking if an element exists but is hidden (maybe it has `display: none`)
- Seeing what CSS is applied to an element
- Temporarily changing styles to test ideas (changes are not saved)

**How to inspect a specific element:** Right-click on it and select "Inspect." DevTools will jump to that element in the Elements tab.

### Quick Debugging Recipe

If something on your page isn't working:
1. Open DevTools (`Cmd + Option + I`)
2. Check the Console tab for red errors
3. Check the Network tab for failed API calls (red rows, 400/500 status codes)
4. Click the failed request, go to the Response tab, read the error message
5. Now you know what's actually wrong

---

## 3. How to Ask AI to Fix Errors

Your AI coding tool can fix most errors for you, but only if you give it the right information. Garbage in, garbage out.

### The #1 Mistake

> "Hey, my app is broken. Can you fix it?"

This is like calling a mechanic and saying "my car is making a noise." They need way more information to help you.

### The Right Way

Copy the **full error message** and paste it into your AI tool. Not a screenshot. Not a summary. The full text.

### Debugging Prompt Template

Use this template every time you hit an error:

```
I'm getting this error:

[paste the FULL error message here, including the stack trace]

It happens when I [describe what you were doing -- clicking a button, loading the page, submitting a form].

The relevant file is [file path, e.g., src/app/dashboard/page.tsx].

Here's what I've already tried:
- [list anything you've attempted]
```

**Why this works:** It gives the AI the error itself, the context of when it happens, the location in your code, and what you've already ruled out. That's everything it needs to give you a targeted fix instead of guessing.

### Real Example

Bad prompt:
> "My dashboard page isn't loading"

Good prompt:
> "I'm getting this error in the terminal:
>
> Error: Cannot read properties of undefined (reading 'email')
> at UserProfile (/src/components/UserProfile.tsx:12:24)
>
> It happens when I navigate to /dashboard after logging in. The user data from Supabase seems to be undefined. The relevant file is src/components/UserProfile.tsx. I've tried adding a loading state but it still crashes."

### When to Give the AI the Full File

Give it the full file when:
- The error is about logic, not just a missing import
- You've given it the error message and its fix didn't work
- The bug involves how multiple parts of the file interact

### When to Start a Fresh Chat

Start a new chat session when:
- You've been going back and forth for more than 5-6 messages and the AI is going in circles
- The AI starts "hallucinating" solutions that don't make sense
- The AI keeps suggesting the same fix you already told it didn't work
- You've changed your approach and the old conversation context is confusing it

This is called **context pollution**. The AI is trying to reconcile all the previous messages and it gets confused. A fresh start with a clear prompt often solves the problem in one shot.

---

## 4. Common Errors and What They Mean

Here's your reference sheet. Bookmark this section.

### "Module not found: Can't resolve './components/Button'"

**Plain English:** You're trying to import a file that doesn't exist at the path you specified.

**Most common causes:**
- Typo in the file name or path (case sensitivity matters on Linux/Mac)
- The file is in a different folder than you think
- You forgot to create the file
- The file extension is wrong (`.tsx` vs `.ts` vs `.jsx`)

**Fix:** Check the exact file path. Open your file explorer and verify the file exists where you think it does. Check for case mismatches: `Button.tsx` is not the same as `button.tsx`.

---

### "TypeError: Cannot read properties of undefined (reading 'map')"

**Plain English:** You're trying to use `.map()` on something that is `undefined`. The variable you think holds an array is actually empty.

**Most common causes:**
- Your API call hasn't finished yet and you're trying to render the data before it arrives
- The API response has a different shape than you expected (maybe the array is nested: `response.data.items` not `response.items`)
- A typo in the variable name

**Fix:** Add a check before using `.map()`:

```tsx
// Before (crashes if posts is undefined)
{posts.map(post => <div>{post.title}</div>)}

// After (safe)
{posts?.map(post => <div>{post.title}</div>)}

// Or with a loading state
{posts ? posts.map(post => <div>{post.title}</div>) : <p>Loading...</p>}
```

Also check your API response in the Network tab to see the actual data shape.

---

### "EADDRINUSE: address already in use :::3000"

**Plain English:** Port 3000 is already taken by another process. Maybe you have another dev server running, or a previous one didn't shut down properly.

**Fix on Mac/Linux:**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill it (replace PID with the number from above)
kill -9 PID
```

**Fix on Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or just use a different port: `npm run dev -- --port 3001`

---

### "Hydration mismatch" (Next.js)

**Plain English:** The HTML that the server rendered doesn't match what the client (browser) rendered. React is confused because it expected them to be identical.

**Most common causes:**
- Using `Date.now()` or `Math.random()` during rendering (different on server vs client)
- Checking `window` or `localStorage` during the initial render (these don't exist on the server)
- Browser extensions injecting HTML into your page
- Invalid HTML nesting (like a `<p>` inside another `<p>`, or a `<div>` inside a `<p>`)

**Fix:** Wrap browser-only code in a `useEffect` or check for the window object:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null; // or a loading skeleton
```

---

### "new row violates row-level security policy" (Supabase)

**Plain English:** Supabase's Row Level Security is blocking your database operation. This is a security feature, not a bug. But it does mean your policy doesn't allow what you're trying to do.

**Most common causes:**
- You created a table but didn't add any RLS policies (default is to deny everything)
- The user isn't authenticated and your policy requires authentication
- Your policy is checking the wrong user ID column

**Fix:**
1. Go to your Supabase dashboard
2. Navigate to Authentication > Policies
3. Find the table in question
4. Add or update the policy. For basic "authenticated users can read/write their own data":

```sql
-- Allow users to read their own rows
CREATE POLICY "Users can read own data" ON posts
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own rows
CREATE POLICY "Users can insert own data" ON posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

### "CORS error: Access-Control-Allow-Origin"

**Plain English:** Your frontend (e.g., `localhost:3000`) is trying to call an API on a different domain (e.g., `api.example.com`), and that API hasn't given your domain permission to make requests.

**Most common cause:** Your API or backend doesn't include the right CORS headers.

**Fix (Next.js API routes):** This usually isn't a problem because your API routes are on the same domain. If you're calling an external API, use your own API route as a proxy:

```tsx
// src/app/api/proxy/route.ts
export async function GET() {
  const response = await fetch('https://external-api.com/data');
  const data = await response.json();
  return Response.json(data);
}
```

Then call `/api/proxy` from your frontend instead of the external API directly.

---

### "401 Unauthorized"

**Plain English:** The server doesn't know who you are. Your authentication token is missing, expired, or invalid.

**Most common causes:**
- You're not sending the auth token in the request headers
- The token has expired (user needs to log in again)
- You're using the wrong token (mixing up API keys)

**Fix:** Check the Network tab in DevTools. Click the failing request, go to Headers, and look for the `Authorization` header. If it's missing, your auth logic isn't attaching the token. If it's present but you're still getting 401, the token is probably expired.

---

### "500 Internal Server Error"

**Plain English:** Something crashed on the server. The error is not in your frontend code. It's in your API route, serverless function, or backend.

**Fix:** Check your terminal (where you ran `npm run dev`). The actual error message with the stack trace should be printed there. The browser only sees "500" but the terminal gets the real error. Copy that terminal error and work from there.

---

### "Type 'string' is not assignable to type 'number'" (TypeScript)

**Plain English:** TypeScript is telling you that you're using the wrong data type. You're passing a string where a number is expected (or vice versa).

**Most common causes:**
- Form inputs always return strings, even for number fields. You need to convert them: `Number(e.target.value)` or `parseInt(e.target.value)`
- An API response returns a string ID but your type definition says it should be a number
- Query parameters from the URL are always strings

**Fix:** Either convert the type or update the type definition to match reality:

```tsx
// Convert the value
const age = Number(formData.get('age'));

// Or update the type to accept what you're actually getting
interface User {
  id: string; // was 'number' but the API returns a string
}
```

---

### "Warning: Each child in a list should have a unique 'key' prop" (React)

**Plain English:** You're rendering a list of elements and React needs a unique `key` on each one to track them efficiently.

**Fix:** Add a `key` prop using a unique identifier (not the array index if the list can change):

```tsx
// Bad
{posts.map(post => <PostCard {...post} />)}

// Good
{posts.map(post => <PostCard key={post.id} {...post} />)}

// Acceptable if the list never changes order
{items.map((item, index) => <li key={index}>{item}</li>)}
```

---

## 5. The Debugging Workflow

When you hit an error, follow this process in order. Don't skip steps.

### Step 1: Read the Error Message Carefully

Don't skim. Don't panic. Read the whole thing. Identify:
- What type of error is it?
- What file is it in?
- What line number?
- What does the message say in plain English?

### Step 2: Find the File and Line Number

Open the file mentioned in the error. Go to the line number. Look at what's happening on that line and the lines around it. Often the problem is obvious once you're looking at the right place.

### Step 3: Check Both the Terminal AND the Browser Console

Errors show up in different places depending on where the code runs:
- Server-side code errors show in the terminal
- Client-side code errors show in the browser console
- Some errors show in both

Always check both. The real error might be in the place you're not looking.

### Step 4: Copy the Full Error and Ask Your AI Tool

Use the prompt template from Section 3. Paste the full error, describe when it happens, point to the file. Let the AI analyze it and suggest a fix.

### Step 5: If the AI Fix Doesn't Work, Give It More Context

Don't just say "that didn't work." Tell it:
- What happened after applying the fix (did you get a new error? The same error?)
- Paste the new error if there is one
- Share the full file so it can see the bigger picture
- Mention what you changed recently that might have caused this

### Step 6: If You're Still Stuck, Roll Back

If you've been fighting the same bug for 20+ minutes, consider rolling back to a working state:

```bash
# Save your current changes without committing
git stash

# Your app should now work like it did at your last commit
# If it does, the bug is in your recent changes
# Look at what you changed:
git stash show -p

# To get your changes back:
git stash pop
```

This narrows the problem down to exactly what you changed.

### Step 7: Ask the Community

If nothing else works, ask for help. But ask well:
- Share the full error message
- Share what you've already tried
- Share the relevant code (not your whole project)
- Mention what tools you're using (Next.js version, Supabase, etc.)

A good help request looks like: "I'm getting a hydration mismatch error in my Next.js 14 app when I try to render a date. Here's the error: [error]. Here's the component: [code]. I've tried wrapping it in useEffect but same error."

---

## 6. Debugging with Each AI Tool

### Claude Code

Claude Code can read your project files directly. This is its superpower for debugging.

**Best approach:**
- Paste the error message directly into the chat
- Claude Code will often find the relevant files on its own
- If it asks which file, tell it the path from the error message
- You can say "look at src/app/dashboard/page.tsx and fix the TypeError on line 24"

**Tip:** If Claude Code makes a fix that doesn't work, say "that didn't fix it, here's the new error:" and paste the updated error. Don't just say "still broken."

### Cursor

Cursor works best when you select the problematic code first.

**Best approach:**
1. Open the file with the error
2. Select the code around the line that's breaking
3. Press `Cmd + L` to open the AI chat
4. Paste the error message
5. Cursor will have the selected code as context and can suggest a targeted fix

**Tip:** Use `Cmd + K` for inline edits when the fix is small (like changing a type or adding a null check). Use `Cmd + L` for bigger problems where you need to discuss the approach.

### Codex

Codex works through a chat interface.

**Best approach:**
- Describe the error clearly in the chat
- Include the error message, the file path, and what you were doing
- If you're working with multiple files, mention which files are involved
- Codex can sometimes miss context, so be explicit about your setup (Next.js, Supabase, etc.)

---

## 7. When It's Not a Code Error

Sometimes your code is fine but something in your environment is wrong. These are the sneakiest bugs because the error messages can be misleading.

### Environment Variables Not Set

**Symptoms:** API calls fail, database connections fail, auth doesn't work, you see errors like "Invalid API key" or connections timing out.

**Check:**
- Is there a `.env.local` file in your project root?
- Are the variable names correct? (They're case-sensitive)
- Did you restart your dev server after adding new env vars? (You must restart -- the server reads them at startup)
- In Next.js, does the variable name start with `NEXT_PUBLIC_` if you're using it in the browser?

```bash
# Check if your env file exists and has content
cat .env.local
```

### Database Not Running

**Symptoms:** Connection refused errors, timeouts, "relation does not exist."

**Check:**
- Is your Supabase project active? (Free tier projects pause after inactivity)
- Is your database URL correct in `.env.local`?
- Go to the Supabase dashboard and check if your tables exist

### Wrong URL in Config

**Symptoms:** API calls go to the wrong place, CORS errors, 404s.

**Check:**
- Are you pointing to `localhost` in production or a production URL in development?
- Check your `.env.local` for any URL values and make sure they match your current environment

### Cached Old Version

**Symptoms:** You made changes but the page looks the same. Your fix should have worked but nothing changed.

**Fix:**
- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Clear the Next.js cache: delete the `.next` folder and restart
- Try incognito mode to rule out browser extensions and cached data

```bash
# Nuclear option: clear all caches
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

### Package Version Conflicts

**Symptoms:** Weird errors after installing a new package, "Cannot find module" errors for packages that are installed, duplicate React errors.

**Fix:**

```bash
# Delete node_modules and reinstall everything fresh
rm -rf node_modules
rm package-lock.json  # or yarn.lock
npm install
```

This solves dependency conflicts more often than you'd expect. It's the "turn it off and on again" of JavaScript development.

### Process Still Running in Background

**Symptoms:** Port already in use, stale data, changes not reflecting.

**Fix:**
```bash
# On Mac/Linux, find and kill the zombie process
lsof -i :3000
kill -9 <PID>

# Or kill all Node processes (use with caution)
killall node
```

---

## Quick Reference: Error Lookup Table

| Error Message | Where to Look | Likely Fix |
|--------------|---------------|------------|
| Module not found | File imports | Check file path and name |
| Cannot read properties of undefined | Data fetching | Add null/undefined check, verify API response |
| EADDRINUSE | Terminal | Kill the process using that port |
| Hydration mismatch | Browser console | Wrap browser-only code in useEffect |
| RLS policy violation | Supabase dashboard | Add or update RLS policies |
| CORS error | Network tab | Use an API proxy route |
| 401 Unauthorized | Network tab headers | Check auth token is being sent |
| 500 Internal Server Error | Terminal | Read the server-side error in terminal |
| Type not assignable | Editor/build output | Convert type or update type definition |
| Unique key prop | Browser console | Add unique `key` to list items |
| NEXT_PUBLIC_ undefined | Browser console | Add prefix and restart dev server |
| Connection refused | Terminal | Check database/service is running |

---

## The Golden Rules of Debugging

1. **Read the error before asking for help.** Most errors tell you exactly what's wrong.
2. **Check both places.** Terminal AND browser console.
3. **Give your AI the full error.** Not a summary. Not a screenshot. The full text.
4. **One fix at a time.** Don't change five things at once or you won't know what worked.
5. **When in doubt, restart.** Kill the dev server, delete `.next`, restart. It fixes more issues than you'd think.
6. **Git commit often.** If you can always roll back to a working version, you can never truly get stuck.
7. **20-minute rule.** If you've been stuck on the same error for 20 minutes, change your approach. Fresh AI chat, different search terms, ask a human.

---

# Part 2: When You're Stuck

**Ship With AI -- When you've been going in circles and want to throw your laptop out the window.**

You've been staring at the same error for 30 minutes. The AI keeps suggesting the same fix that doesn't work. You're starting to wonder if you should have just learned to code the hard way.

Stop. Breathe. Open this guide.

---

## The 15-Minute Rule

If you've been stuck on the same problem for 15 minutes without making any real progress, **STOP**. Right now.

Do not:
- Run the same prompt again hoping it magically works this time
- Let the AI try the same broken approach for the 6th time
- Keep adding more code on top of code that's already broken
- Google the same error message in slightly different ways

The AI will happily go in circles forever. It doesn't get frustrated. It doesn't realize it's tried the same thing 10 times. **You** have to be the one to break the loop.

When your 15 minutes are up, move to the Unstuck Ladder below.

---

## The Unstuck Ladder

Try these **in order**. Don't skip to Level 5 before you've tried Level 1. Most problems get solved in the first three levels.

### Level 1: Actually Read the Error Message

Not glance at it. **Read it.** Out loud if you have to.

Error messages usually tell you exactly what's wrong:
- `Cannot find module 'xyz'` -- you haven't installed a package
- `TypeError: x is not a function` -- you're calling something that doesn't exist
- `EADDRINUSE: port 3000` -- something else is already running on that port
- `401 Unauthorized` -- your API key is wrong or missing
- `CORS error` -- your frontend and backend are on different ports and you need to configure CORS

Copy the error. Paste it to the AI. Say: "What does this error mean and how do I fix it?"

That alone solves about 40% of problems.

### Level 2: Give the AI More Context

The AI is probably stuck because it doesn't have enough information. When you paste a snippet and say "this doesn't work," the AI is guessing at everything it can't see.

Give it:
- The **full file**, not just the broken line
- The **complete error message**, including the stack trace
- What you **changed** right before things broke
- What the code **should** do vs. what it **actually** does
- Your file structure if the issue involves imports or routing

Example of a bad prompt:
> "My login doesn't work"

Example of a good prompt:
> "My login form submits but the user doesn't get redirected to the dashboard. Here's my login component [paste full file]. Here's my auth handler [paste full file]. Here's the error in the browser console [paste error]. The login was working before I added the remember-me checkbox."

### Level 3: Start a Fresh Chat or Session

**Context pollution is real.** If you've been going back and forth with the AI for 20+ messages, it's probably stuck in a bad mental model from earlier in the conversation. It's trying to fix its earlier bad suggestion instead of thinking fresh.

What to do:
- In **Claude Code**: Start a new conversation. Don't continue the old thread.
- In **Cursor**: Open a new Composer session. Or close and reopen the AI panel.
- In **Codex**: Start a fresh task.

In your new session, describe the problem **from scratch**. Don't reference the old conversation. Just state what you're trying to do and what's going wrong.

This works way more often than you'd expect.

### Level 4: Try a Different AI Tool

Different tools think differently. They use different models, different context windows, different approaches.

- **Claude Code** stuck? Open Cursor, paste the problem there.
- **Cursor** stuck? Open Claude Code, describe the issue from scratch.
- **Both** stuck? Try pasting the problem into ChatGPT or Claude.ai directly.

Sometimes a tool that has zero context about your project will spot the issue immediately because it's not carrying any assumptions.

### Level 5: Go Back to the Last Working Version

This is the "nuclear option lite." Roll back to when things worked and try again with a different approach.

```bash
# See what changed since things worked
git diff

# Save your current changes (in case you want them later)
git stash

# Or throw away all changes and go back to the last commit
git checkout .
```

Then try a **completely different approach** to the feature. If you were trying to build a modal, try a separate page instead. If you were trying to use library X, try library Y. Don't walk the same path that led you into the swamp.

**Important:** This is why we told you to commit often. If your last commit was 3 hours ago, you're about to lose 3 hours of work. Commit after every feature that works. Even tiny ones.

### Level 6: Simplify

Can you build a **simpler version** of this feature?

- Instead of drag-and-drop reordering, use up/down buttons
- Instead of real-time updates, use a refresh button
- Instead of a fancy animated modal, use a plain page
- Instead of file upload with preview, just accept a URL
- Instead of multi-step forms, use one long form

Strip out the complexity. Get the basic version working first. You can always add polish later. A working simple feature beats a broken fancy one every time.

### Level 7: Ask in the Community Channel

You've tried the above and you're still stuck. Time to ask for help. But **how** you ask matters (see the "How to Ask for Help" section below).

Share:
1. What you're trying to do
2. What you've tried
3. The error or unexpected result

Don't just say "it's broken." Give people something to work with.

### Level 8: Skip It and Move On

Seriously. Skip it.

Move to a different feature. Work on something else for a few hours -- or a full day. Come back to this problem with fresh eyes and a clear head.

Sometimes your brain solves problems in the background while you're not thinking about them. And sometimes a feature just isn't worth the time. Ship without it.

---

## Common "Stuck" Scenarios

### "The AI keeps generating code that doesn't work"

**What's happening:** Your prompt is probably too vague, or you're asking the AI to do too much at once.

**What to do:**
1. Break the task into smaller steps. Instead of "build a user authentication system," try:
   - "Create a signup form with email and password fields"
   - "Add form validation -- email must be valid, password must be 8+ characters"
   - "Connect the form to Supabase auth signup"
   - "Redirect to the dashboard after successful signup"
2. Build one piece. Test it. Confirm it works. Then build the next piece.
3. If the AI generates something and it doesn't work on the first try, don't just say "that doesn't work." Tell it **how** it doesn't work.

---

### "I don't understand the code the AI wrote"

**What's happening:** The AI wrote something that works (or should work) but you have no idea what it does.

**What to do:**
- Ask: "Explain this code line by line in simple terms. Assume I'm new to this."
- Ask: "What does [specific function/line] do?"
- Ask: "Why did you use [this approach] instead of something simpler?"

If you still don't fully understand after the explanation, that's OK for now. Mark it with a comment like `// TODO: understand how this works` and keep moving. You can come back to it later. **Don't let confusion stop your momentum.**

---

### "The AI fixed one thing but broke another"

**What's happening:** This is the #1 frustration in AI-assisted coding. The AI doesn't always know what else your change will affect.

**What to do:**
1. Go back to the last working commit: `git checkout .`
2. This time, tell the AI what **not** to touch:
   - "Fix the login redirect error. Do NOT modify the Dashboard component, the CSS files, or any other existing functionality. Only change the auth handler."
3. After each fix, test the **whole flow**, not just the part you changed.
4. Commit the moment something works before asking the AI to change anything else.

---

### "My project feels too big -- I'm overwhelmed"

**What's happening:** You're looking at the whole mountain instead of the next step.

**What to do:**
- Stop thinking about the whole project.
- Ask yourself: **"What is the ONE next thing that needs to work?"**
- Build that. Just that. Nothing else.
- When it works, commit it. Then ask the question again.

Your project is just a stack of small things that each work. Build them one at a time.

---

### "I've been on the same feature for 2 days"

**What's happening:** This feature is eating your project alive.

**What to do:**
- Cut it. Ship without it.
- A working project missing one feature is **infinitely better** than a broken project that has everything half-built.
- If this feature is truly essential (like login for a social app), simplify it dramatically. Use the simplest possible version and move on.

---

### "The AI says it can't do what I want"

**What's happening:** Either the task is genuinely outside the AI's ability, or you're describing it in a way the AI can't work with.

**What to do:**
1. Rephrase the request. Describe the **outcome** you want, not the specific implementation.
2. Break it into smaller pieces. The AI might not be able to do the whole thing, but it can probably do parts of it.
3. Ask: "What's the closest thing you CAN do to [what I described]?"
4. Ask: "What are three different ways I could achieve [goal]?"

---

### "Everything was working and now nothing works"

**What's happening:** You (or the AI) changed something that broke a chain of dependencies.

**What to do:**
1. Run `git diff` to see everything that changed since the last commit.
2. Look at the diff. Can you spot what broke things?
3. If yes, revert just that change.
4. If no, run `git stash` to save your changes and go back to the last commit. Confirm things work again. Then re-apply changes one at a time with `git stash pop` and test after each one.
5. If you haven't been committing -- lesson learned. Start committing after every working change from now on.

---

### "I'm behind schedule"

**What's happening:** You've spent too much time on things that weren't in your plan, or your plan was too ambitious.

**What to do:**
1. Look at your feature list. Split it into "must have" and "nice to have."
2. Cut every "nice to have." Right now.
3. For your "must haves," ask: can I build a simpler version of each?
4. Focus only on getting a **working** project with the core features. Nothing else matters.
5. Read the Scope Cutting Guide if you haven't already.

---

## How to Ask for Help (in the Community Channel)

How you ask determines whether you get help in 5 minutes or get ignored.

### Bad
> "My app is broken, help"

Nobody can do anything with this. What app? What's broken? What have you tried?

### Good
> "I'm trying to add Google OAuth with Supabase. When I click the Google sign-in button, I get redirected to Google but then get a 'redirect_uri_mismatch' error when it comes back. I've set the redirect URL in Supabase to http://localhost:3000/auth/callback. Here's my auth config: [code]. Here's the error in the console: [error]."

This gives people everything they need to help you.

### The Help Request Template

Copy, fill in, paste:

```
**What I'm trying to do:**
[One sentence. What feature or behavior are you building?]

**What happens instead:**
[What actually occurs when you try? Be specific.]

**Error message (if any):**
[Paste the full error. Don't paraphrase it.]

**What I've already tried:**
- [Attempt 1]
- [Attempt 2]
- [Attempt 3]

**Relevant code:**
[Paste the key file or function -- not the whole project]

**Tool I'm using:**
[Claude Code / Cursor / Codex]
```

---

## Mental Game

Some real talk for when you're frustrated:

**Getting stuck is normal.** Every developer in the world gets stuck. AI doesn't eliminate this -- it just changes what you get stuck on. Instead of getting stuck on syntax, you get stuck on integration, configuration, and debugging. The problems are different. The frustration is the same.

**The difference between people who ship and people who quit is how fast they get unstuck.** That's it. That's the whole game. And that's what this playbook is for.

**If you're frustrated, step away.** Close the laptop. Walk around the block. Get water. Take 10 minutes. The code will still be there. And you'll see it differently when you come back. This isn't soft advice -- this is practical. Your brain literally processes problems differently after a break.

**Celebrate small wins.** Not sarcastically. For real.
- "The page loads without errors" -- that's a win.
- "The button does something when I click it" -- that's a win.
- "The data shows up on the screen" -- that's a win.
- "I deployed and it works on my phone" -- that's a huge win.

Each of these is a real step forward. Stack enough small wins and you have a shipped project.

**You don't need to understand everything.** You need to understand *enough* to keep moving. Nobody understands every line of code in their project -- not beginners, not seniors, not the people who built the frameworks you're using. If it works and you roughly know why, that's good enough for now.

---

## Red Flags: When to Pivot

Stop and seriously reconsider your approach if:

- **You've spent more than a full day on one feature with zero progress.** That feature is fighting you. Simplify it drastically or cut it entirely.

- **The AI keeps suggesting increasingly complex workarounds.** If the solution is getting more complicated with each attempt, the approach is wrong. Simpler is almost always better.

- **You're importing new libraries just to make one thing work.** If you need three new packages to build one feature, you're overengineering it. Find a simpler way.

- **The feature requires infrastructure you haven't set up.** If you're in week 3 and the feature needs a separate backend server, a queue system, or a service you've never configured -- cut it. You don't have time to learn and set up new infrastructure AND build your project.

- **Multiple people tried to help and nobody could figure it out.** If you've posted in the community channel and several experienced people couldn't solve it, this is a genuine hard problem. It's not you. Cut the feature or find a completely different approach.

When you hit these red flags, it's not failure -- it's smart project management. The goal is to **ship something that works**, not to solve every hard problem you encounter.

---

## Quick Reference: The 60-Second Version

Stuck for 15 minutes? Do this:

1. Read the error message (for real)
2. Give the AI more context
3. Start a fresh AI session
4. Try a different AI tool
5. Roll back to the last working commit
6. Build a simpler version
7. Ask the community (use the template)
8. Skip it and move on

**The goal is a shipped project, not a perfect project.**

---

# Part 3: Common Issues & Fixes

When something breaks, don't panic. Every developer hits these problems. Find your error message below, read the one-line explanation, and copy-paste the fix.

---

## Terminal / Command Line Issues

### 1. "command not found: node" or "command not found: npm"

**What you see:**
```
zsh: command not found: node
```
or
```
zsh: command not found: npm
```

**Why it happens:** Node.js isn't installed on your machine, or it's installed but your terminal doesn't know where to find it.

**Fix:**

Install Node.js from the official site (this also installs npm):
```bash
# Option A: Download the installer from https://nodejs.org (pick the LTS version)

# Option B: Install with Homebrew (macOS)
brew install node

# Option C: Install with nvm (recommended -- lets you switch versions later)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Close and reopen your terminal, then:
nvm install --lts
```

Verify it worked:
```bash
node --version
npm --version
```

---

### 2. "command not found: git"

**What you see:**
```
zsh: command not found: git
```

**Why it happens:** Git isn't installed yet.

**Fix:**

```bash
# macOS -- this will prompt you to install Xcode Command Line Tools
git --version
# Click "Install" on the popup that appears

# If that doesn't work:
xcode-select --install

# Or install with Homebrew:
brew install git

# Windows: Download from https://git-scm.com/download/win
# Linux:
sudo apt-get install git
```

---

### 3. "command not found: claude"

**What you see:**
```
zsh: command not found: claude
```

**Why it happens:** Claude Code CLI isn't installed, or npm's global bin folder isn't in your PATH.

**Fix:**
```bash
npm install -g @anthropic-ai/claude-code
```

If that gives a permission error, see issue #5 or #7 below. If the install succeeds but you still get "command not found," see issue #5.

---

### 4. "permission denied" when running npm install -g

**What you see:**
```
npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Why it happens:** npm is trying to write to a system folder your user account doesn't own.

**Fix:**

Do NOT use `sudo npm install -g`. That causes more problems. Instead, tell npm to use a folder you own:

```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
```

Then add this line to your shell config file (`~/.zshrc` on Mac, `~/.bashrc` on Linux):
```bash
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

Now retry your global install:
```bash
npm install -g @anthropic-ai/claude-code
```

---

### 5. "zsh: command not found" after installing something (PATH issue)

**What you see:**
```
zsh: command not found: <something-you-just-installed>
```

**Why it happens:** Your terminal doesn't know where the program was installed. The install put it in a folder that isn't listed in your PATH.

**Fix:**

Step 1 -- Find where it was installed. Look at the install output. It usually tells you the path.

Step 2 -- Add that path to your shell config:
```bash
# Open your shell config
nano ~/.zshrc    # macOS
nano ~/.bashrc   # Linux

# Add this line at the bottom (replace /path/to/bin with the actual path):
export PATH="/path/to/bin:$PATH"

# Save (Ctrl+O, Enter, Ctrl+X) and reload:
source ~/.zshrc
```

Common paths to add:
```bash
# npm global packages
export PATH="$HOME/.npm-global/bin:$PATH"

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Homebrew on Apple Silicon Macs
export PATH="/opt/homebrew/bin:$PATH"
```

---

### 6. Terminal commands work in one window but not another

**What you see:** You run `node --version` in one terminal tab and it works. You open a new tab and get "command not found."

**Why it happens:** You ran `source ~/.zshrc` or `export PATH=...` in one terminal session, but it didn't save permanently. The new tab doesn't have those changes.

**Fix:**

Make sure the PATH changes are saved in your config file, not just typed into the terminal:
```bash
# Check if the PATH line is in your config file
cat ~/.zshrc | grep PATH

# If it's missing, add it permanently:
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc

# Now every new terminal window will have it
# Close all terminals and open a fresh one to test
```

---

## Node.js / npm Issues

### 7. "npm ERR! EACCES: permission denied"

**What you see:**
```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
npm ERR! errno -13
```

**Why it happens:** Same as issue #4 -- npm needs to write somewhere it doesn't have permission.

**Fix:**

Same fix as issue #4. Or if you installed Node via nvm, this usually doesn't happen. Switch to nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Restart terminal
nvm install --lts
nvm use --lts
```

---

### 8. "npm ERR! could not resolve dependency" (version conflicts)

**What you see:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" from some-package@1.0.0
```

**Why it happens:** Two packages need different versions of the same dependency, and npm can't figure out which one to use.

**Fix:**
```bash
# Option A: Force npm to be less strict about peer dependencies
npm install --legacy-peer-deps

# Option B: Force it (more aggressive, use if Option A fails)
npm install --force

# Option C: Use bun instead (faster and handles this better)
# Install bun first: curl -fsSL https://bun.sh/install | bash
bun install
```

---

### 9. "node_modules is huge, should I commit it?"

**What you see:** `git status` shows thousands of files in `node_modules/`. Your git push takes forever or GitHub complains about file sizes.

**Why it happens:** `node_modules` contains every dependency your project uses. It can be hundreds of megabytes. You should never commit it.

**Fix:**

Create a `.gitignore` file in your project root:
```bash
# Create .gitignore if it doesn't exist
touch .gitignore
```

Add this to `.gitignore`:
```
node_modules/
.next/
.env
.env.local
```

If you already committed `node_modules`:
```bash
# Remove it from git tracking (keeps the actual files)
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

Anyone else working on the project just runs `npm install` to get the dependencies.

---

### 10. "npm install is taking forever"

**What you see:** `npm install` has been running for 5+ minutes with no end in sight.

**Why it happens:** npm can be slow, especially on first install of a project with many dependencies, or if your internet connection is spotty.

**Fix:**
```bash
# Option A: Try with legacy peer deps (skips some checks)
npm install --legacy-peer-deps

# Option B: Clear the npm cache and try again
npm cache clean --force
npm install

# Option C: Use bun (significantly faster)
curl -fsSL https://bun.sh/install | bash
# Restart terminal, then:
bun install

# Option D: Use pnpm (also faster than npm)
npm install -g pnpm
pnpm install
```

---

### 11. "Cannot find module X" after npm install

**What you see:**
```
Error: Cannot find module 'some-package'
```
or
```
Module not found: Can't resolve 'some-package'
```

**Why it happens:** Your dev server started before the package was installed, or the install didn't finish properly.

**Fix:**
```bash
# Step 1: Make sure the package is actually installed
npm install some-package

# Step 2: Stop the dev server (Ctrl+C in the terminal where it's running)

# Step 3: Restart the dev server
npm run dev
```

If it still doesn't work:
```bash
# Delete node_modules and reinstall everything
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### 12. Different Node.js version issues

**What you see:**
```
error This project requires Node.js >=18. You are running Node.js 16.x
```
or things just behave weirdly because you're on the wrong version.

**Why it happens:** The project needs a specific Node.js version and you have a different one.

**Fix:**

Install nvm (Node Version Manager) so you can switch versions easily:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Restart terminal

# Install and use a specific version
nvm install 20
nvm use 20

# Or install the latest LTS
nvm install --lts
nvm use --lts

# Check your current version
node --version
```

Pro tip: Create a `.nvmrc` file in your project root with just the version number (e.g., `20`) so you can run `nvm use` without specifying the version.

---

## Next.js / React Issues

### 13. "Port 3000 is already in use"

**What you see:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Why it happens:** Another process (probably a dev server you forgot to stop) is already using port 3000.

**Fix:**
```bash
# Option A: Kill whatever is using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Option B: Use a different port
npx next dev -p 3001
# or
PORT=3001 npm run dev
```

---

### 14. "Module not found: Can't resolve"

**What you see:**
```
Module not found: Can't resolve './components/Button'
```
or
```
Module not found: Can't resolve 'some-library'
```

**Why it happens:** Either you have a typo in the import path, the file doesn't exist where you think it does, or the npm package isn't installed.

**Fix:**

If it's a local file (starts with `./` or `../`):
```bash
# Check that the file actually exists at that path
ls src/components/Button.tsx    # or .jsx, .js, .ts

# Common mistakes:
# - Wrong capitalization (Button vs button)
# - Missing file extension in some setups
# - Wrong relative path (../ goes up one folder)
```

If it's an npm package:
```bash
npm install some-library
```

---

### 15. "Hydration failed because the initial UI does not match"

**What you see:**
```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

**Why it happens:** The HTML that the server rendered is different from what React tried to render in the browser. Common causes: using `Date.now()`, `Math.random()`, or checking `window` during render.

**Fix:**

Wrap browser-only code in a `useEffect` or check if you're on the client:
```jsx
"use client";
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // or a loading skeleton

  return <div>{window.innerWidth}</div>;
}
```

Other common causes:
- Nesting `<p>` inside `<p>`, or `<div>` inside `<p>` -- check your HTML structure
- Browser extensions injecting extra HTML -- try incognito mode

---

### 16. "You're importing a component that needs useState"

**What you see:**
```
You're importing a component that needs useState. It only works in a Client Component
but none of its parents are marked with "use client", so they're Server Components by default.
```

**Why it happens:** In Next.js 13+, components are server components by default. If you use React hooks like `useState`, `useEffect`, or event handlers like `onClick`, you need to tell Next.js it's a client component.

**Fix:**

Add `"use client"` as the very first line of the file:
```jsx
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

The `"use client"` directive must be at the top of the file, before any imports.

---

### 17. "'window' is not defined"

**What you see:**
```
ReferenceError: window is not defined
```

**Why it happens:** Your code is trying to use `window`, `document`, `localStorage`, or other browser-only APIs on the server. In Next.js, server components and server-side rendering don't have access to browser APIs.

**Fix:**

Option A -- Make it a client component and use `useEffect`:
```jsx
"use client";
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return <div>Window width: {width}</div>;
}
```

Option B -- Guard with a `typeof` check:
```jsx
if (typeof window !== 'undefined') {
  // safe to use window here
  const saved = localStorage.getItem('key');
}
```

---

### 18. "Unhandled Runtime Error: TypeError: Cannot read properties of undefined"

**What you see:**
```
TypeError: Cannot read properties of undefined (reading 'map')
```
or
```
TypeError: Cannot read properties of undefined (reading 'name')
```

**Why it happens:** You're trying to access a property on something that is `undefined`. Usually this means data hasn't loaded yet, an API returned something unexpected, or you have a typo in a property name.

**Fix:**

Use optional chaining and provide fallback values:
```jsx
// Before (crashes if data is undefined):
{data.items.map(item => <div>{item.name}</div>)}

// After (safe):
{data?.items?.map(item => <div>{item.name}</div>)}
```

Or add a loading check:
```jsx
if (!data) return <div>Loading...</div>;

return (
  <div>
    {data.items.map(item => <div key={item.id}>{item.name}</div>)}
  </div>
);
```

Also check: did your API actually return what you expected? Add a `console.log(data)` to see what you're working with.

---

### 19. Page shows old content after changes

**What you see:** You edited a file and saved it, but the browser still shows the old version.

**Why it happens:** Next.js caches aggressively. Sometimes the `.next` build cache gets stale.

**Fix:**
```bash
# Step 1: Hard refresh the browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Step 2: If that doesn't work, clear the Next.js cache
# Stop the dev server (Ctrl+C), then:
rm -rf .next
npm run dev

# Step 3: Nuclear option -- clear everything
rm -rf .next node_modules/.cache
npm run dev
```

---

### 20. Hot reload stopped working

**What you see:** You save files but the browser doesn't update anymore. You have to manually refresh or restart the server.

**Why it happens:** The file watcher lost track of your changes, or the WebSocket connection between the dev server and browser broke.

**Fix:**
```bash
# Stop the dev server (Ctrl+C) and restart it
npm run dev

# If it still doesn't work, clear the cache and restart
rm -rf .next
npm run dev
```

Also check:
- Is the file you're editing actually inside your project folder?
- Do you have a lot of files? Add `node_modules` to your `.gitignore` (the watcher might be choking on it)
- Are you editing in the right project? (Sounds silly, but it happens)

---

## Git / GitHub Issues

### 21. "fatal: not a git repository"

**What you see:**
```
fatal: not a git repository (or any of the parent directories): .git
```

**Why it happens:** You're running a git command in a folder that hasn't been initialized as a git repository yet.

**Fix:**
```bash
# Initialize git in your project folder
cd /path/to/your/project
git init

# Then make your first commit
git add .
git commit -m "Initial commit"
```

Or if you meant to be in a different folder, `cd` to the right one first.

---

### 22. "error: failed to push some refs"

**What you see:**
```
error: failed to push some refs to 'https://github.com/you/your-repo.git'
hint: Updates were rejected because the remote contains work that you do not have locally.
```

**Why it happens:** Someone (or you, on another machine, or GitHub's web editor) pushed changes that you don't have yet. Git won't let you overwrite them.

**Fix:**
```bash
# Pull the remote changes first, then push
git pull origin main --rebase
git push origin main

# If you get merge conflicts after pulling, see issue #25
```

If this is a brand new repo and you just created a README on GitHub:
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

---

### 23. "Please tell me who you are"

**What you see:**
```
Author identity unknown
*** Please tell me who you are.
Run
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
```

**Why it happens:** Git needs to know your name and email to label your commits. You haven't set this up yet.

**Fix:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Use the same email you used for your GitHub account so your commits get linked to your profile.

---

### 24. Accidentally committed node_modules or .env

**What you see:** You pushed and now your repo has thousands of files in `node_modules/`, or worse, your secret API keys are visible in `.env`.

**Why it happens:** You didn't have a `.gitignore` file, or it wasn't set up before you first committed.

**Fix:**

Step 1 -- Create or update `.gitignore`:
```bash
# Add these lines to .gitignore
node_modules/
.env
.env.local
.next/
```

Step 2 -- Remove the files from git tracking (keeps them on your disk):
```bash
git rm -r --cached node_modules
git rm --cached .env
git rm --cached .env.local
git commit -m "Remove tracked files that should be ignored"
git push
```

Step 3 -- If you pushed `.env` with real secrets: **Those secrets are now compromised.** Go to Supabase/Stripe/whatever dashboard and rotate (regenerate) your API keys immediately. Anyone who saw your repo could have copied them.

---

### 25. "merge conflict" -- what the <<<< markers mean

**What you see:**
```
<<<<<<< HEAD
const title = "My App";
=======
const title = "Our App";
>>>>>>> main
```

**Why it happens:** Two people (or two branches) changed the same line of code, and git doesn't know which version to keep. You have to decide.

**Fix:**

The markers mean:
- `<<<<<<< HEAD` = your version (what you have locally)
- `=======` = divider
- `>>>>>>> main` = the other version (what's on the remote)

Pick the version you want and delete the markers:
```javascript
// Keep one version, delete everything else including the markers:
const title = "Our App";
```

Then save the file and:
```bash
git add .
git commit -m "Resolve merge conflict"
git push
```

In VS Code: you'll see clickable buttons above the conflict -- "Accept Current Change," "Accept Incoming Change," or "Accept Both Changes." Click the one you want.

---

### 26. "git push" asks for password

**What you see:** Every time you push, git asks for your username and password. Or you enter your password and it says "Authentication failed."

**Why it happens:** You're using HTTPS to connect to GitHub, and GitHub no longer accepts passwords. You need a token or SSH key.

**Fix (easiest way -- use GitHub CLI):**
```bash
# Install GitHub CLI
brew install gh          # macOS
# or: sudo apt install gh  # Linux

# Log in (follow the prompts)
gh auth login

# Choose: GitHub.com > HTTPS > Login with a web browser
# Done. Git push will now work without asking for passwords.
```

**Fix (SSH key method):**
```bash
# Generate an SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Press Enter for default location, set a passphrase (or leave empty)

# Copy the public key
cat ~/.ssh/id_ed25519.pub
# Copy the output

# Go to GitHub > Settings > SSH and GPG keys > New SSH key
# Paste the key

# Switch your repo from HTTPS to SSH
git remote set-url origin git@github.com:yourusername/your-repo.git
```

---

## Supabase Issues

### 27. "Invalid API key" or "JWT expired"

**What you see:**
```
{"message":"Invalid API key","hint":"..."}
```
or
```
{"message":"JWT expired"}
```

**Why it happens:** Your Supabase API key is wrong, missing, or expired. This usually means your `.env.local` file has the wrong values, or you're using the wrong key type.

**Fix:**

Step 1 -- Go to your Supabase dashboard: `https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api`

Step 2 -- Copy the correct values into your `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...your-anon-key...
```

Step 3 -- Make sure you're using the **anon/public** key for client-side code, not the **service_role** key (that one is for server-side only and should never be exposed to the browser).

Step 4 -- Restart your dev server after changing `.env.local`:
```bash
# Ctrl+C to stop, then:
npm run dev
```

---

### 28. "new row violates row-level security policy"

**What you see:**
```
new row violates row-level security policy for table "your_table"
```

**Why it happens:** Row Level Security (RLS) is enabled on your table (which is the default), and you haven't created any policies that allow inserts/reads/updates.

**Fix:**

Option A -- Add a policy in the Supabase dashboard:
1. Go to Authentication > Policies in your Supabase dashboard
2. Find your table
3. Click "New Policy"
4. For testing, choose "Enable read access for all users" or "Enable insert for authenticated users"

Option B -- Add a policy with SQL:
```sql
-- Allow anyone to read
CREATE POLICY "Allow public read" ON your_table
  FOR SELECT USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON your_table
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own rows
CREATE POLICY "Allow users to update own rows" ON your_table
  FOR UPDATE USING (auth.uid() = user_id);
```

Option C -- Disable RLS for quick testing (NOT for production):
```sql
ALTER TABLE your_table DISABLE ROW LEVEL SECURITY;
```

---

### 29. "relation does not exist"

**What you see:**
```
relation "public.your_table" does not exist
```

**Why it happens:** The table you're trying to query hasn't been created yet, or you have a typo in the table name.

**Fix:**

Check if the table exists in the Supabase dashboard under Table Editor. If it doesn't:

Option A -- Create it in the dashboard:
1. Go to Table Editor > New Table
2. Add your columns
3. Click Save

Option B -- Create it with SQL in the SQL Editor:
```sql
CREATE TABLE your_table (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id)
);

-- Don't forget to enable RLS
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

If the table does exist, double-check the spelling. Table names are case-sensitive in queries.

---

### 30. Can't connect to Supabase from localhost

**What you see:** Your app loads but data doesn't come through. The console shows network errors to `supabase.co`.

**Why it happens:** Your Supabase URL or anon key is wrong, missing, or not being loaded by your app.

**Fix:**

Step 1 -- Check your `.env.local` file exists in the project root (not inside `src/`):
```bash
ls -la .env.local
```

Step 2 -- Verify the values:
```bash
# .env.local should look like this:
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Step 3 -- Make sure env variable names start with `NEXT_PUBLIC_` (otherwise Next.js won't expose them to the browser).

Step 4 -- Restart the dev server. Changes to `.env.local` are NOT picked up by hot reload:
```bash
# Ctrl+C, then:
npm run dev
```

Step 5 -- Verify the values are loading:
```javascript
// Add this temporarily to a component to debug:
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'loaded' : 'MISSING');
```

---

## Claude Code Issues

### 31. "Claude Code is not responding"

**What you see:** You type a message in Claude Code and nothing happens, or you get a connection error.

**Why it happens:** Your API key is missing/invalid, your internet is down, or the Anthropic API is having issues.

**Fix:**
```bash
# Check if your API key is set
echo $ANTHROPIC_API_KEY

# If empty, set it:
export ANTHROPIC_API_KEY="sk-ant-..."

# To make it permanent, add to your shell config:
echo 'export ANTHROPIC_API_KEY="sk-ant-your-key-here"' >> ~/.zshrc
source ~/.zshrc

# Test your internet connection
curl -s https://api.anthropic.com > /dev/null && echo "API reachable" || echo "Cannot reach API"
```

If the API key is set and internet works, check the [Anthropic Status Page](https://status.anthropic.com) for outages.

---

### 32. "Rate limit exceeded"

**What you see:**
```
Error: 429 Too Many Requests
Rate limit exceeded
```

**Why it happens:** You're sending too many requests too quickly. The API has limits on how fast you can make calls.

**Fix:**

Wait 30-60 seconds and try again. If you keep hitting this:
- Send fewer, longer messages instead of many short ones
- Be more specific in your prompts so Claude doesn't need multiple tries
- Check your Anthropic dashboard for your current usage and limits

---

### 33. Claude keeps making the same mistake in a loop

**What you see:** Claude tries to fix a bug, introduces a new one, tries to fix that, and goes back to the original bug. Back and forth forever.

**Why it happens:** The conversation context is getting cluttered with failed attempts, and Claude is losing track of what works and what doesn't.

**Fix:**
- Type `/clear` to reset the conversation
- Start a fresh session with a clearer description of what you want
- Before starting fresh, copy the relevant code and error message so you can paste it into the new session
- Be more specific: "Fix the login function in `src/auth.ts` -- it should return the user object, not a boolean"
- If Claude changed too many things, use `git diff` to see what changed and `git checkout -- filename` to undo specific files

---

### 34. Claude modified files I didn't want it to touch

**What you see:** You asked Claude to fix one thing and it changed five files you didn't ask about.

**Why it happens:** Claude sometimes takes initiative and "improves" code you didn't ask it to change, especially if it sees things it thinks are bugs.

**Fix:**

Undo the unwanted changes:
```bash
# See what files were changed
git diff --name-only

# Undo changes to a specific file
git checkout -- path/to/file-you-want-to-restore.tsx

# Undo ALL changes (careful -- this resets everything)
git checkout .
```

Prevent it next time:
- Be specific: "Only modify `src/components/Header.tsx`. Do not change any other files."
- Create a `.claudeignore` file in your project root to list files Claude should never touch:
```
# .claudeignore
src/lib/database.ts
src/config/*
.env*
```

---

### 35. Session got too long and Claude is confused

**What you see:** Claude's responses are getting less relevant, it's forgetting things you told it earlier, or it's contradicting itself.

**Why it happens:** There's a limit to how much conversation context Claude can hold. When the session gets too long, older messages get pushed out of the window.

**Fix:**
```
# Compact the conversation (keeps a summary, frees up context)
/compact

# Or start a completely fresh session
/clear
```

Best practices to avoid this:
- Start new sessions for new tasks
- Don't use one mega-session for your entire project
- One session = one feature or bug fix

---

## Cursor Issues

### 36. Cursor AI not responding

**What you see:** You press Cmd+K (or Ctrl+K) or ask something in Cursor's chat, and nothing happens.

**Why it happens:** Your Cursor subscription may have expired, your credits may be used up, or there's a connection issue.

**Fix:**
1. Check your subscription: Cursor > Settings > Account. Make sure your plan is active.
2. Check your usage: You might have hit your monthly request limit.
3. Restart Cursor: Cmd+Q (Mac) or close and reopen.
4. Update Cursor: Help > Check for Updates.
5. Check internet connection.

---

### 37. Agent mode not making changes

**What you see:** You ask Cursor's Agent to make changes, it describes what it would do, but the files don't actually change.

**Why it happens:** Cursor needs explicit permission to modify files. It might be waiting for you to click "Apply" or "Accept."

**Fix:**
1. Look for "Apply" or "Accept" buttons in the Cursor chat panel.
2. Click "Accept All" to apply all suggested changes.
3. If using Composer/Agent: make sure you're in Agent mode (not just Ask mode).
4. Check that the files aren't read-only.

---

### 38. Tab completion showing wrong suggestions

**What you see:** Cursor's autocomplete is suggesting code that doesn't fit what you're trying to do.

**Why it happens:** The AI doesn't have enough context about what you want, or it's picking up on the wrong patterns.

**Fix:**
1. Press `Escape` to dismiss the current suggestion.
2. Type a comment above your cursor explaining what you want, then start typing again.
3. If suggestions are consistently bad, try:
   - Opening related files so Cursor has more context
   - Writing a brief comment describing the function or block you're about to write
   - Using Cmd+K with a description instead of relying on tab completion

---

### 39. Cursor is slow or laggy

**What you see:** Cursor takes a long time to respond, typing feels sluggish, or the whole editor freezes.

**Why it happens:** Too many extensions, large project, too many open files, or your machine is running low on resources.

**Fix:**
1. Close files you're not actively editing.
2. Disable extensions you don't need: Cmd+Shift+X, then disable the ones you're not using.
3. Close other heavy apps (Chrome with 50 tabs, Slack, Docker, etc.).
4. If the project is large, try opening just the subfolder you're working in instead of the whole project.
5. Restart Cursor.
6. Check Activity Monitor (Mac) or Task Manager (Windows) for memory/CPU usage.

---

## Deployment Issues

### 40. "Build failed" on Vercel

**What you see:** Vercel shows a red "Build Failed" status. The build logs have errors.

**Why it happens:** Your code has errors that don't show up in development but break the production build. The most common cause is TypeScript errors, because `next dev` is lenient but `next build` is strict.

**Fix:**

Step 1 -- Run the build locally to see the same errors:
```bash
npm run build
```

Step 2 -- Fix whatever errors appear. Common ones:
```bash
# TypeScript: unused variables
# Fix: remove them, or prefix with underscore: _unusedVar

# TypeScript: missing types
# Fix: add proper types or use 'any' temporarily (not ideal)

# Import errors: module not found
# Fix: check the import path and capitalization
```

Step 3 -- Once `npm run build` succeeds locally, push and Vercel will rebuild.

---

### 41. "Environment variable not found" in production

**What you see:** Your app works locally but in production (Vercel), features that need API keys or database connections are broken.

**Why it happens:** `.env.local` is not committed to git (correctly!), so Vercel doesn't have your environment variables. You need to add them in the Vercel dashboard.

**Fix:**
1. Go to your project on [vercel.com](https://vercel.com)
2. Click Settings > Environment Variables
3. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
   - Any other env vars your app needs
4. Redeploy: Go to Deployments tab > click the three dots on the latest deploy > Redeploy

Important: Variables that start with `NEXT_PUBLIC_` are exposed to the browser. Variables without that prefix are server-only.

---

### 42. Site works locally but shows errors in production

**What you see:** Everything works on `localhost:3000` but the deployed version has missing features, broken pages, or error messages.

**Why it happens:** Development mode is more forgiving than production mode. Common differences: missing env vars, different API URLs, stricter TypeScript checking, and server vs. client rendering differences.

**Fix:**

Step 1 -- Test the production build locally:
```bash
npm run build
npm run start
# Visit http://localhost:3000 -- this simulates production
```

Step 2 -- Check the browser console (F12 > Console) on the deployed site for specific error messages.

Step 3 -- Common fixes:
```bash
# Missing env vars -- see issue #41
# API URL pointing to localhost -- update to production URL
# CORS errors -- your API needs to allow your Vercel domain
```

---

### 43. "404 Not Found" on a deployed page

**What you see:** A page works locally at `/dashboard` but shows 404 on the deployed site.

**Why it happens:** The page file doesn't exist in the right place, the route is dynamic and needs server configuration, or the build didn't include it.

**Fix:**

Check your file structure. In Next.js App Router:
```
app/
  page.tsx              -> /
  dashboard/
    page.tsx            -> /dashboard
  blog/
    [slug]/
      page.tsx          -> /blog/any-slug
```

Common mistakes:
- File is named `Dashboard.tsx` instead of `page.tsx`
- File is in `pages/` (Pages Router) but your project uses `app/` (App Router) or vice versa
- Dynamic route `[id]` needs brackets in the folder name

Verify locally:
```bash
npm run build
# Look for your route in the build output
# It should list all routes that were built
```

---

### 44. Images not loading in production

**What you see:** Images show up locally but are broken (missing image icon) on the deployed site.

**Why it happens:** The image path is wrong for production, or the images aren't in the right folder.

**Fix:**

Images should go in the `public/` folder at the project root:
```
your-project/
  public/
    images/
      logo.png        -> reference as /images/logo.png
      hero.jpg         -> reference as /images/hero.jpg
  src/
  ...
```

In your code:
```jsx
// Correct: starts with /  (relative to the public folder)
<img src="/images/logo.png" alt="Logo" />

// Also correct: using Next.js Image component
import Image from 'next/image';
<Image src="/images/logo.png" alt="Logo" width={200} height={100} />

// WRONG: these won't work in production
<img src="images/logo.png" />           // missing leading /
<img src="./public/images/logo.png" />  // don't include 'public' in the path
<img src="../images/logo.png" />        // relative paths break in production
```

For external images with `next/image`, add the domain to `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-image-host.com',
      },
    ],
  },
};
module.exports = nextConfig;
```

---

## Browser / General Issues

### 45. Changes not showing in browser

**What you see:** You saved the file and the terminal shows it compiled, but the browser still shows the old version.

**Why it happens:** The browser is caching the old version of the page.

**Fix:**
```
# Hard refresh (bypasses cache):
Mac:     Cmd + Shift + R
Windows: Ctrl + Shift + R

# If that doesn't work, clear the site data:
1. Open DevTools (F12 or Cmd+Option+I)
2. Right-click the refresh button in the browser
3. Click "Empty Cache and Hard Reload"

# Nuclear option:
1. Open DevTools > Application tab > Storage
2. Click "Clear site data"
3. Refresh the page
```

---

### 46. CORS error in console

**What you see:**
```
Access to fetch at 'https://api.example.com/data' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

**Why it happens:** Your frontend (running on `localhost:3000`) is trying to call an API on a different domain, and that API hasn't been configured to allow requests from your domain.

**Fix:**

If you control the API:
```javascript
// Add CORS headers to your API response
// In Next.js API routes (app/api/route.ts):
export async function GET() {
  return new Response(JSON.stringify({ data: 'hello' }), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
```

If you don't control the API:
```javascript
// Create a proxy API route in Next.js (app/api/proxy/route.ts):
export async function GET() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return Response.json(data);
}

// Then call /api/proxy from your frontend instead of the external API
```

Note: Supabase handles CORS automatically, so if you're seeing this with Supabase, double-check your Supabase URL.

---

### 47. "Mixed Content" warning

**What you see:**
```
Mixed Content: The page at 'https://yoursite.com' was loaded over HTTPS, but requested
an insecure resource 'http://api.example.com/data'. This request has been blocked.
```

**Why it happens:** Your deployed site uses HTTPS (secure), but it's trying to load something over HTTP (not secure). Browsers block this.

**Fix:**

Change the URL from `http://` to `https://`:
```javascript
// Before (blocked):
const res = await fetch('http://api.example.com/data');

// After (works):
const res = await fetch('https://api.example.com/data');
```

If the API doesn't support HTTPS, you'll need to proxy it through your own API route (see the proxy approach in issue #46).

Check your `.env` files for any URLs that start with `http://` and change them to `https://`.

---

### 48. Dev tools console full of warnings

**What you see:** Dozens of yellow and red messages in the browser console. Hard to tell what matters.

**Why it happens:** Some warnings are from your code, some from libraries, and some from browser extensions. Not all of them matter.

**What to worry about:**
```
# FIX THESE (red errors):
TypeError: Cannot read properties of undefined     -> See issue #18
Unhandled Promise Rejection                        -> An async function failed silently
Failed to fetch / NetworkError                     -> API call failing, check URL and server
404 (Not Found) for your own API routes            -> Route doesn't exist, check path

# INVESTIGATE THESE (yellow warnings):
React: Each child in a list should have a unique "key" prop
  -> Add a key prop to items in .map():
     {items.map(item => <div key={item.id}>{item.name}</div>)}

React: Cannot update a component while rendering a different component
  -> You're calling setState during render. Move it to useEffect.

# USUALLY SAFE TO IGNORE:
DevTools failed to load source map                  -> A library's source map is missing, harmless
Third-party cookie will be blocked                  -> Browser privacy feature, not your problem
[Violation] Added non-passive event listener        -> Performance suggestion, not urgent
Warnings from browser extensions                    -> Not from your code
```

To filter the noise:
1. Open DevTools (F12 > Console)
2. Click the filter icon
3. Type your app name or "Error" to focus on what matters
4. Uncheck "Verbose" to hide low-priority messages

---

## Quick Reference: "I Just Need the Command"

| Problem | Quick Fix |
|---------|-----------|
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| node_modules mess | `rm -rf node_modules package-lock.json && npm install` |
| Clear Next.js cache | `rm -rf .next && npm run dev` |
| Hard refresh browser | `Cmd + Shift + R` (Mac) / `Ctrl + Shift + R` (Windows) |
| Undo all git changes | `git checkout .` |
| See what git changed | `git diff` |
| Check Node version | `node --version` |
| Check npm version | `npm --version` |
| Set git identity | `git config --global user.name "Name" && git config --global user.email "email"` |
| Restart dev server | `Ctrl+C` then `npm run dev` |

---

## Still Stuck?

1. **Read the error message carefully.** It usually tells you exactly what's wrong and sometimes even suggests a fix.
2. **Copy the exact error message and paste it into Google or ChatGPT.** You're almost never the first person to hit this problem.
3. **Ask in the Ship With AI community.** Someone has probably solved it already.
4. **Undo and try again.** `git checkout .` resets all changes. Fresh start often works.
5. **Take a break.** Seriously. Five minutes away from the screen can clear your head.
