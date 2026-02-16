---
title: "Quick Wins"
slug: "quick-wins"
---

# Quick Wins: Small Changes That Make Your Project Look 10x More Professional

**Ship With AI Mentorship**

These are the small touches that separate "I built a thing" from "this looks like a real product." Each one takes 5-15 minutes with AI coding tools, and the cumulative effect is massive.

Pick any 3-5 of these and your project will immediately feel more polished than 90% of portfolio projects out there.

---

## Table of Contents

| # | Quick Win | Time | Impact |
|---|-----------|------|--------|
| 1 | [Favicon and Site Metadata](#1-favicon-and-site-metadata) | 5 min | First impression |
| 2 | [Open Graph Image](#2-open-graph-image) | 10 min | Social sharing |
| 3 | [Loading Skeletons](#3-loading-skeletons) | 10 min | Perceived speed |
| 4 | [Toast Notifications](#4-toast-notifications) | 10 min | User feedback |
| 5 | [Dark Mode Toggle](#5-dark-mode-toggle) | 15 min | User preference |
| 6 | [404 Page](#6-404-page) | 5 min | Error handling |
| 7 | [Responsive Navigation](#7-responsive-navigation) | 15 min | Mobile experience |
| 8 | [Empty States](#8-empty-states) | 10 min | UX polish |
| 9 | [Smooth Scroll and Page Transitions](#9-smooth-scroll-and-page-transitions) | 10 min | Visual polish |
| 10 | [Keyboard Shortcuts](#10-keyboard-shortcuts) | 10 min | Power users |
| 11 | [Error Boundary / Fallback UI](#11-error-boundary--fallback-ui) | 10 min | Crash recovery |
| 12 | [Copy to Clipboard](#12-copy-to-clipboard) | 5 min | Utility |
| 13 | [Relative Timestamps](#13-relative-timestamps) | 5 min | Readability |
| 14 | [Scroll to Top Button](#14-scroll-to-top-button) | 5 min | Navigation |
| 15 | [Responsive Images / Lazy Loading](#15-responsive-images--lazy-loading) | 5 min | Performance |
| 16 | [Focus States and Accessibility](#16-focus-states-and-accessibility) | 10 min | Accessibility |
| 17 | [README with Screenshots](#17-readme-with-screenshots) | 15 min | Documentation |
| 18 | [PWA Basics](#18-pwa-basics) | 15 min | Installability |

---

## 1. Favicon and Site Metadata

**Time: 5 minutes**

### What it is
The favicon is the tiny icon in your browser tab. Without one, your tab shows a generic globe or blank icon -- instant signal that the site is unfinished. Metadata (title, description) controls what shows up in Google search results and browser history.

### Why it matters
It's literally the first thing people see. A missing favicon screams "student project." A custom one says "someone actually cares about this."

### The Prompt

```
Add a favicon and proper metadata to this Next.js app.

1. Generate a simple SVG favicon that matches the app's purpose.
   Place it at app/favicon.ico and also add app/icon.svg.

2. Update the root layout metadata export to include:
   - A descriptive title (not just "Next App")
   - A description that explains what the app does in one sentence
   - Set the metadataBase URL to the production domain or localhost for now

3. Add an apple-touch-icon.png (180x180) for iOS home screen bookmarks.

Keep it simple. Use the app name and a relevant emoji or shape
for the favicon SVG.
```

---

## 2. Open Graph Image

**Time: 10 minutes**

### What it is
When someone shares your URL on X/Twitter, Slack, iMessage, Discord, or LinkedIn, the Open Graph image is the preview card that appears. Without one, your link shows up as a boring plain-text URL that nobody clicks.

### Why it matters
If you're sharing your project with anyone (recruiters, friends, on social media), the OG image is your first impression. A good one makes people actually click.

### The Prompt

```
Add an Open Graph image to this Next.js app.

Option A - Static OG image:
Create a visually appealing OG image component at
app/opengraph-image.tsx using Next.js ImageResponse (from
next/og). The image should be 1200x630 pixels and include:
- The app name in large bold text
- A one-line description underneath
- A simple gradient or colored background that matches the app's theme
- Clean, modern typography

Option B - Per-page dynamic OG images:
If the app has dynamic pages (like blog posts or profiles),
also create a opengraph-image.tsx in those route folders
that pulls the page title and description dynamically.

Add the proper Open Graph meta tags in the metadata export:
- og:title, og:description, og:image
- twitter:card set to "summary_large_image"
```

---

## 3. Loading Skeletons

**Time: 10 minutes**

### What it is
Skeleton loaders are those gray, pulsing placeholder shapes you see on sites like YouTube, Facebook, and LinkedIn while content loads. They mimic the layout of the actual content.

### Why it matters
A blank screen or a spinning circle tells the user "wait." A skeleton tells them "content is coming and here's roughly what it will look like." It makes your app feel faster even when it's not. Users perceive skeleton-loaded pages as 30-40% faster than spinner-loaded ones.

### The Prompt

```
Add loading skeleton components to this app.

1. Identify all places where data is fetched and there's a
   loading state (API calls, database queries, etc).

2. Create a reusable Skeleton component in components/ui/skeleton.tsx
   that renders a pulsing gray placeholder. It should accept
   className for sizing (width, height, rounded corners).

3. For each page that loads data, create a loading skeleton
   that matches the layout of the actual content:
   - Card skeletons for card grids
   - Text line skeletons for text content
   - Avatar circle skeletons for user profiles
   - Table row skeletons for data tables

4. Use Next.js loading.tsx files or conditional rendering
   to show skeletons while data loads.

5. Use Tailwind's animate-pulse for the animation. No extra
   libraries needed.

Make sure the skeletons match the actual content layout
so the page doesn't jump around when real content loads in.
```

---

## 4. Toast Notifications

**Time: 10 minutes**

### What it is
Toast notifications are those small popup messages that slide in from the corner of the screen -- "Saved successfully!" or "Something went wrong." They're the modern replacement for `alert()` dialogs and way better than hoping the user checks the console.

### Why it matters
Users need feedback when they do things. Did the form submit? Did the delete work? Without toasts, users click buttons and wonder if anything happened. With toasts, your app feels responsive and communicative.

### The Prompt

```
Add toast notifications to the app using the sonner library.

1. Install sonner.

2. Add the <Toaster /> component to the root layout
   (app/layout.tsx), positioned at the bottom-right.
   Use the richColors prop for better-looking success/error styles.

3. Find every place in the app where:
   - alert() is called -- replace with toast.success() or toast.error()
   - console.log is used for success messages -- replace with toast.success()
   - console.error is used for user-facing errors -- replace with toast.error()
   - Form submissions succeed -- add toast.success("Saved!")
   - API calls fail -- add toast.error("Something went wrong")
   - Items are deleted -- add toast.success("Deleted")
   - Items are copied -- add toast.success("Copied to clipboard")

4. Keep the default sonner styling. Don't over-customize.

Make sure each toast message is short and human-readable,
not technical error codes.
```

---

## 5. Dark Mode Toggle

**Time: 15 minutes**

### What it is
A toggle that lets users switch between light and dark color themes. The preference should stick around when they close and reopen the browser.

### Why it matters
Dark mode isn't just a preference anymore -- it's expected. It also shows you understand theming and state persistence. Plus, people who code at night (which is most of us) will love you for it.

### The Prompt

```
Add a dark mode toggle to this Next.js app with Tailwind CSS.

1. Install next-themes.

2. Add the ThemeProvider to the root layout, wrapping {children}.
   Set attribute="class" and defaultTheme="system" so it respects
   the user's OS preference on first visit.

3. Create a ThemeToggle component (components/theme-toggle.tsx)
   with a button that shows:
   - A sun icon in dark mode (click to switch to light)
   - A moon icon in light mode (click to switch to dark)
   Use lucide-react for the icons. Add proper aria-label text.

4. Place the toggle button in the header/navbar.

5. Make sure Tailwind's darkMode is set to "class" in
   tailwind.config.ts.

6. Go through all existing components and add dark: variants
   for backgrounds, text colors, and borders where needed.
   Key things to update:
   - Page backgrounds: bg-white dark:bg-gray-950
   - Card backgrounds: bg-gray-50 dark:bg-gray-900
   - Text: text-gray-900 dark:text-gray-100
   - Borders: border-gray-200 dark:border-gray-800
   - Inputs and form elements

7. Add suppressHydrationWarning to the <html> tag to
   prevent the flash-of-unstyled-content warning.

The preference should persist across sessions via localStorage
(next-themes handles this automatically).
```

---

## 6. 404 Page

**Time: 5 minutes**

### What it is
The page users see when they visit a URL that doesn't exist in your app. The default Next.js 404 is generic and boring.

### Why it matters
A custom 404 page is a chance to show personality and keep users on your site. Instead of a dead end, give them a way back. It's also the kind of detail that interviewers notice.

### The Prompt

```
Create a custom 404 page for this Next.js app.

1. Create app/not-found.tsx with:
   - A large "404" heading
   - A friendly message like "This page doesn't exist"
     or "Looks like you took a wrong turn"
   - A brief subtitle with a lighter color
   - A "Go back home" button/link that navigates to "/"
   - Center everything vertically and horizontally on the page

2. Keep the styling consistent with the rest of the app
   (same fonts, colors, spacing patterns).

3. Make sure it works with dark mode if dark mode is enabled.

4. Keep it minimal. No complex illustrations needed --
   clean typography is enough.
```

---

## 7. Responsive Navigation

**Time: 15 minutes**

### What it is
On desktop, your nav shows horizontal links across the top. On mobile, those links collapse into a hamburger menu icon that opens a slide-out drawer or dropdown.

### Why it matters
If your nav links overflow on mobile or get cut off, it looks broken. Responsive nav is table stakes for any real app. Recruiters and users will pull up your project on their phone -- make sure it works.

### The Prompt

```
Make the navigation fully responsive.

Desktop (md and above):
- Horizontal nav bar with logo/app name on the left
- Nav links displayed horizontally on the right
- Keep the current styling

Mobile (below md):
- Show a hamburger menu icon (three horizontal lines) on the right
- When tapped, open a slide-out drawer from the right side
  (or a full-width dropdown below the nav bar)
- Show all nav links vertically in the drawer
- Add a close button (X icon) in the drawer
- Close the drawer when a nav link is clicked
- Close the drawer when clicking outside of it (overlay backdrop)
- Add a smooth slide-in animation (200-300ms)

Use React state to manage open/close. No extra libraries needed.
Use lucide-react for the hamburger (Menu) and close (X) icons.
Make sure the drawer/dropdown has proper z-index so it sits
on top of page content.
```

---

## 8. Empty States

**Time: 10 minutes**

### What it is
When a list, table, or feed has zero items, you show a helpful message instead of a blank void. Something like "No projects yet. Create your first one!" with a button to take action.

### Why it matters
A blank page is confusing. Users wonder: "Is it loading? Is it broken? Am I in the right place?" Empty states answer those questions and guide users toward the next action. Every good app handles this.

### The Prompt

```
Add empty state components to all lists and data displays in the app.

1. Create a reusable EmptyState component (components/empty-state.tsx)
   that accepts:
   - icon (optional): a Lucide icon to display
   - title: the main message (e.g., "No projects yet")
   - description: a helpful subtitle (e.g., "Create your first
     project to get started")
   - actionLabel (optional): button text (e.g., "Create Project")
   - onAction (optional): callback or href for the button

2. Find every place in the app where a list or collection is
   rendered and add the empty state for when the array is empty.
   Common spots:
   - Project/item lists
   - Search results (with "No results found. Try a different search")
   - Dashboard data
   - Notification feeds
   - Table views

3. Style it centered with muted colors and generous spacing.
   The icon should be large and light gray. The action button
   should use the primary button style.

4. Make sure it looks good in both light and dark mode.
```

---

## 9. Smooth Scroll and Page Transitions

**Time: 10 minutes**

### What it is
Two things: (1) when users click anchor links, the page glides to the section instead of jumping, and (2) sections fade in as they scroll into view instead of just appearing.

### Why it matters
These micro-interactions make your app feel fluid and intentional. It's the difference between "functional" and "polished." Landing pages especially benefit -- it makes the whole experience feel smooth.

### The Prompt

```
Add smooth scrolling and scroll-triggered animations to the app.

1. Smooth scroll:
   - Add scroll-behavior: smooth to the html element
     (or use Tailwind's scroll-smooth class on <html>)
   - Make sure all anchor links (href="#section") scroll smoothly
   - If there's a navigation with section links, add a small
     scroll offset so content isn't hidden behind a fixed header

2. Fade-in animations on scroll:
   - Create a reusable FadeIn component (components/fade-in.tsx)
     that uses the Intersection Observer API
   - Elements start with opacity-0 and translate-y-4 (slightly below)
   - When they enter the viewport, animate to opacity-100 and
     translate-y-0
   - Use a CSS transition (duration 500-700ms, ease-out)
   - Only trigger the animation once (don't re-animate when
     scrolling back up)

3. Wrap major content sections (cards, feature blocks, text
   sections) in the FadeIn component.

4. Add staggered delays for items in a grid or list so they
   animate in sequence (e.g., 0ms, 100ms, 200ms).

Keep animations subtle. Nothing should take longer than 700ms
or move more than 16-20px. We want "elegant," not "PowerPoint."
```

---

## 10. Keyboard Shortcuts

**Time: 10 minutes**

### What it is
A command palette (Cmd+K / Ctrl+K) that lets users quickly search and navigate your app, or simple keyboard shortcuts for common actions.

### Why it matters
Power users expect this. It's in VS Code, Slack, Notion, Linear, Vercel -- basically every app that developers respect. Adding one instantly makes your project feel like it belongs in that category.

### The Prompt

```
Add a command palette (Cmd+K / Ctrl+K) to this app.

1. Install cmdk (the command menu library by pacocoursey).

2. Create a CommandPalette component (components/command-palette.tsx):
   - Opens when user presses Cmd+K (Mac) or Ctrl+K (Windows/Linux)
   - Shows a search input at the top with a search icon
   - Lists available actions/pages grouped by category
   - Keyboard navigable (arrow keys + Enter to select)
   - Closes on Escape or clicking the backdrop overlay
   - Appears as a centered modal dialog with a subtle backdrop

3. Add these commands to the palette:
   - Navigation items: link to each main page in the app
   - Actions: common actions like "Create new [item]", "Toggle dark mode"
   - Each item should have an icon and a label

4. Add the global keyboard event listener in the root layout
   or a providers component.

5. Show a small keyboard shortcut hint somewhere in the UI
   (like in the search bar placeholder or footer) so users
   discover it: "Press Cmd+K to search..."

6. Style it with a clean, minimal look. Rounded corners,
   subtle shadow, max-width of 640px.
```

---

## 11. Error Boundary / Fallback UI

**Time: 10 minutes**

### What it is
When a component crashes (throws an unhandled error), React normally shows a white screen of death. An error boundary catches that crash and shows a friendly fallback message instead.

### Why it matters
Crashes happen. APIs go down, data comes back in unexpected shapes, edge cases pop up. An error boundary means your app degrades gracefully instead of completely dying. It's the difference between "the app is broken" and "something went wrong, here's how to recover."

### The Prompt

```
Add error boundaries and fallback UI to this Next.js app.

1. Create a global error page at app/error.tsx:
   - Show a friendly message: "Something went wrong"
   - Add a subtitle: "Don't worry, it's not you. Try again."
   - Include a "Try again" button that calls the reset() function
   - Include a "Go home" link as a fallback
   - Center everything on the page
   - Log the error to console for debugging

2. Create app/global-error.tsx for root layout errors:
   - Similar design to error.tsx but includes its own <html>
     and <body> tags since the root layout itself failed

3. Create a reusable ErrorBoundary client component
   (components/error-boundary.tsx) for wrapping specific
   sections of the app:
   - Uses React's ErrorBoundary pattern (class component
     with getDerivedStateFromError)
   - Accepts a fallback prop for custom fallback UI
   - Has a default fallback with "Something went wrong" message
     and a retry button

4. Wrap any components that make API calls or handle dynamic
   data with the ErrorBoundary component.

5. Make sure the error UI matches the app's design and works
   in dark mode.
```

---

## 12. Copy to Clipboard

**Time: 5 minutes**

### What it is
A small copy button next to any text that users might want to copy -- share links, invite codes, API responses, code snippets, IDs. Click it, text gets copied, button shows "Copied!" for a second.

### Why it matters
Making users manually select text and Ctrl+C is clunky. A copy button is a small courtesy that makes a big difference in UX. It's expected anywhere there's a code snippet or shareable string.

### The Prompt

```
Add copy-to-clipboard functionality to the app.

1. Create a reusable CopyButton component (components/copy-button.tsx):
   - Accepts a "text" prop (the string to copy)
   - Shows a clipboard/copy icon (use lucide-react Copy icon)
   - On click, copies the text to clipboard using
     navigator.clipboard.writeText()
   - After copying, icon changes to a checkmark (Check icon)
     and shows "Copied!" for 2 seconds, then reverts back
   - Add a tooltip or aria-label "Copy to clipboard"

2. Find all places in the app where users might want to copy text:
   - URLs or share links
   - Invite codes or access codes
   - API keys or tokens (if displayed)
   - Code snippets
   - IDs or reference numbers

3. Add the CopyButton next to each of those elements.
   Position it inline or as a small icon button to the right
   of the text.

4. If using sonner for toasts, also trigger a toast.success("Copied!")
   when the text is copied.
```

---

## 13. Relative Timestamps

**Time: 5 minutes**

### What it is
Instead of showing raw dates like "2026-02-14T03:45:00Z", show human-friendly text like "2 hours ago", "yesterday", or "3 days ago."

### Why it matters
Nobody reads ISO timestamps. "2 hours ago" is instantly understood. It makes your app feel alive and current. Every social platform, chat app, and notification feed does this.

### The Prompt

```
Replace all raw date/timestamp displays with relative time strings.

1. Create a utility function at lib/time-ago.ts that converts
   a Date or ISO string to a relative time string:
   - Less than 1 minute: "just now"
   - Less than 1 hour: "X minutes ago"
   - Less than 24 hours: "X hours ago"
   - Less than 7 days: "X days ago"
   - Less than 30 days: "X weeks ago"
   - Older: show the formatted date (e.g., "Jan 15, 2026")

   Write this as a simple function with no dependencies.
   No need for a library.

2. Create a TimeAgo component (components/time-ago.tsx) that:
   - Accepts a date prop
   - Renders the relative time string
   - Shows the full date/time in a title attribute (tooltip on hover)
   - Optionally auto-updates every minute using setInterval

3. Find all places in the app where dates are displayed
   (created at, updated at, posted on, etc.) and replace
   them with the TimeAgo component.
```

---

## 14. Scroll to Top Button

**Time: 5 minutes**

### What it is
A floating button (usually in the bottom-right corner) that appears when the user scrolls down the page. Click it, and it smoothly scrolls back to the top.

### Why it matters
On long pages, scrolling back to the top is annoying. This is a tiny quality-of-life feature that costs almost nothing to add and shows you think about user convenience.

### The Prompt

```
Add a scroll-to-top button to the app.

1. Create a ScrollToTop component (components/scroll-to-top.tsx):
   - Fixed position, bottom-right corner (bottom-8 right-8)
   - Shows an up arrow icon (use lucide-react ArrowUp or ChevronUp)
   - Only visible when the user has scrolled down more than 300px
   - Fades in/out with a smooth opacity transition
   - On click, smooth-scrolls to the top of the page using
     window.scrollTo({ top: 0, behavior: "smooth" })
   - Styled as a circular button with a subtle shadow
   - Works in both light and dark mode

2. Add the component to the root layout so it appears on all pages.

3. Use a scroll event listener (with throttling) or Intersection
   Observer to detect scroll position. Clean up the listener
   on unmount.

4. Make sure it has proper z-index so it floats above content
   but below modals.
```

---

## 15. Responsive Images / Lazy Loading

**Time: 5 minutes**

### What it is
Images that load only when they're about to enter the viewport (lazy loading), are properly sized for the device (responsive), and don't cause layout shifts while loading.

### Why it matters
Images are usually the heaviest assets on any page. Unoptimized images slow everything down -- especially on mobile. Lazy loading means users don't download images they never scroll to. This directly impacts performance scores and user experience.

### The Prompt

```
Optimize all images in the app for performance.

1. Replace all <img> tags with Next.js <Image> from "next/image":
   - Add proper width and height props to prevent layout shift
   - Use the "sizes" prop for responsive sizing
   - Next.js Image handles lazy loading by default

2. For images that are above the fold (visible without scrolling),
   add priority={true} so they load immediately.

3. For background images or decorative images, add loading="lazy"
   if not using the Next.js Image component.

4. Add proper alt text to every image:
   - Descriptive for content images ("Dashboard showing weekly stats")
   - Empty alt="" for purely decorative images

5. If there are any large images (hero images, banners), make sure
   they use responsive sizes:
   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

6. Add a subtle blur placeholder using the "placeholder" prop
   where appropriate: placeholder="blur" with a blurDataURL.
```

---

## 16. Focus States and Accessibility

**Time: 10 minutes**

### What it is
Three things: (1) visible focus rings on all interactive elements so keyboard users can see where they are, (2) aria-labels on buttons that only have icons, and (3) a "skip to content" link for screen reader users.

### Why it matters
Accessibility isn't optional -- it's a sign of a thoughtful developer. If a recruiter tabs through your app and can't see where the focus is, that's a red flag. These three fixes cover the most common accessibility gaps and take very little effort.

### The Prompt

```
Improve accessibility across the entire app.

1. Focus states:
   - Add visible focus-visible rings to ALL interactive elements
     (buttons, links, inputs, selects, textareas)
   - Use Tailwind: focus-visible:ring-2 focus-visible:ring-blue-500
     focus-visible:ring-offset-2
   - Make sure focus rings work in both light and dark mode
   - Remove any outline-none that doesn't have a focus-visible
     replacement

2. Aria labels:
   - Find all icon-only buttons (buttons with just an icon and no text)
   - Add aria-label to each one describing what it does:
     aria-label="Close menu", aria-label="Toggle dark mode", etc.
   - Add aria-label to any icon links as well

3. Skip to content link:
   - Add a "Skip to main content" link as the first element in the body
   - It should be visually hidden until focused (shows when user
     presses Tab)
   - When clicked, it jumps to the main content area
   - Style: sr-only focus:not-sr-only focus:absolute focus:top-4
     focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white
     focus:text-black focus:rounded

4. Add id="main-content" to the main content wrapper element.

5. Make sure all form inputs have associated <label> elements
   or aria-label attributes.
```

---

## 17. README with Screenshots

**Time: 15 minutes**

### What it is
A proper GitHub README.md with a project description, screenshot, tech stack list, and setup instructions. Not the default "This is a Next.js project bootstrapped with create-next-app."

### Why it matters
Your README is your project's landing page on GitHub. Recruiters, hiring managers, and other developers see it first. A good README with a screenshot immediately communicates "this person ships real things." A default README communicates "this person followed a tutorial."

### The Prompt

```
Create a professional README.md for this project.

Structure it exactly like this:

1. Project title as an H1 with a one-line description underneath

2. A screenshot section:
   - Add a placeholder for a screenshot: ![App Screenshot](./screenshot.png)
   - Add a note: "TODO: Replace with actual screenshot"

3. "About" section (2-3 sentences):
   - What the app does
   - Who it's for
   - What problem it solves

4. "Tech Stack" section:
   - List the main technologies used (framework, database,
     auth, styling, deployment)
   - Use a simple bullet list

5. "Getting Started" section:
   - Prerequisites (Node.js version, etc.)
   - Clone the repo
   - Install dependencies: npm install
   - Set up environment variables: cp .env.example .env.local
   - Run the dev server: npm run dev
   - Open http://localhost:3000

6. "Environment Variables" section:
   - List all required env vars from .env.example
     (or .env.local.example) with descriptions
   - DON'T include actual values, just the variable names
     and what they're for

7. "Features" section:
   - Bullet list of the main features

Keep it concise. No filler text. Use clean markdown formatting.
```

---

## 18. PWA Basics

**Time: 15 minutes**

### What it is
PWA (Progressive Web App) basics mean adding a manifest file and service worker so your web app can be "installed" on a phone's home screen. It shows up as a standalone app with its own icon -- no browser chrome, no URL bar.

### Why it matters
When you demo your project and say "you can install it on your phone," people are impressed. It takes a web app and makes it feel like a native app. It's also a great talking point in interviews about web capabilities.

### The Prompt

```
Add basic PWA support to this Next.js app.

1. Install next-pwa or set up PWA manually.

2. Create a web manifest at public/manifest.json with:
   - name: full app name
   - short_name: abbreviated name (under 12 chars)
   - description: one-line description
   - start_url: "/"
   - display: "standalone"
   - background_color: match the app's background
   - theme_color: match the app's primary color
   - icons: array with 192x192 and 512x512 PNG icons
     (create simple ones or use placeholder paths)

3. Add the manifest link to the root layout <head>:
   <link rel="manifest" href="/manifest.json" />

4. Add the theme-color meta tag:
   <meta name="theme-color" content="#your-primary-color" />

5. Add apple-mobile-web-app meta tags:
   - apple-mobile-web-app-capable: yes
   - apple-mobile-web-app-status-bar-style: default
   - apple-mobile-web-app-title: app name

6. If using next-pwa, configure it in next.config.js to
   generate a service worker. If doing it manually, create
   a basic service worker at public/sw.js that caches the
   app shell.

7. Register the service worker in a client component that
   runs on mount.

Keep it simple. We just want the "install app" prompt to
appear and the app to open in standalone mode. Don't worry
about offline support for now.
```

---

## How to Pick Your Quick Wins

Not sure where to start? Here's a priority ranking:

### Must-Have (do these first)
1. **Favicon and Metadata** -- 5 minutes, huge first impression impact
2. **404 Page** -- 5 minutes, shows attention to detail
3. **Toast Notifications** -- 10 minutes, essential user feedback
4. **Empty States** -- 10 minutes, prevents confusion

### High Impact (do these next)
5. **Loading Skeletons** -- 10 minutes, makes app feel faster
6. **Responsive Navigation** -- 15 minutes, required for mobile
7. **Dark Mode Toggle** -- 15 minutes, expected by users
8. **Open Graph Image** -- 10 minutes, essential for sharing

### Nice to Have (polish layer)
9. **Copy to Clipboard** -- 5 minutes, small but appreciated
10. **Relative Timestamps** -- 5 minutes, instant readability boost
11. **Scroll to Top** -- 5 minutes, quick convenience add
12. **Smooth Scroll and Transitions** -- 10 minutes, visual polish
13. **Error Boundary** -- 10 minutes, prevents white screen crashes
14. **Focus States and Accessibility** -- 10 minutes, shows maturity

### Bonus Points (impressive extras)
15. **Keyboard Shortcuts** -- 10 minutes, power user feature
16. **README with Screenshots** -- 15 minutes, GitHub presence
17. **PWA Basics** -- 15 minutes, "install on your phone" wow factor
18. **Responsive Images** -- 5 minutes, performance improvement

---

## Pro Tips

**Stack them.** The more of these you add, the more professional your app feels. The jump from 0 to 5 quick wins is dramatic.

**Do the 5-minute ones first.** Favicon, 404 page, copy buttons, relative timestamps, scroll to top -- you can knock out all five in under 30 minutes and your app immediately looks more complete.

**Don't customize too much.** The default styling of libraries like sonner and cmdk is already great. Spend your time shipping features, not tweaking toast animation curves.

**Test on mobile.** Pull up your app on your actual phone after adding responsive nav and dark mode. Screenshots on mobile look great in portfolios.

**Screenshot everything.** After you add these, take before/after screenshots. They make excellent portfolio pieces and README images.

---

*Part of the Ship With AI mentorship materials. These quick wins work with any React/Next.js project and can be added with Claude Code, Cursor, or any AI coding tool.*
