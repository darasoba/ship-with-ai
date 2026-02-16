---
title: "Student Handbook"
slug: "student-handbook"
---

# Student Handbook -- Ship With AI

How to manage yourself, your time, and your scope through the 4-week program. Daily check-ins, accountability, milestones, and what to do when you're running behind.

This handbook is your single reference for staying on track. Part 1 covers the day-to-day system -- standups, weekly reviews, buddy check-ins, and the milestones you should be hitting each week. Part 2 covers what to do when things get tight -- how to cut scope, what to keep, and how to make sure you still ship something real by Demo Day. Read both. Use both. Come back to this whenever you feel lost.

---

## Table of Contents

### Part 1: Daily Check-ins & Accountability
- [1. Why Check-ins Matter](#1-why-check-ins-matter)
- [2. Daily Standup Format](#2-daily-standup-format)
- [3. Weekly Progress Review (Every Sunday)](#3-weekly-progress-review-every-sunday)
- [4. CLAUDE.md / Cursor Rules Session Updates](#4-claudemd--cursor-rules-session-updates)
- [5. Week-by-Week Milestones](#5-week-by-week-milestones)
- [6. Buddy System](#6-buddy-system)
- [7. Progress Tracking](#7-progress-tracking)
- [8. What Happens If You Fall Behind](#8-what-happens-if-you-fall-behind)
- [Quick Reference: What to Post and When](#quick-reference-what-to-post-and-when)

### Part 2: Scope Cutting & Shipping
- [9. Why You Will Need to Cut (And That's OK)](#9-why-you-will-need-to-cut-and-thats-ok)
- [10. The Week 2 Reality Check](#10-the-week-2-reality-check)
- [11. What to Cut vs What to Keep](#11-what-to-cut-vs-what-to-keep)
- [12. The "One Thing" Framework](#12-the-one-thing-framework)
- [13. How to Cut Without Starting Over](#13-how-to-cut-without-starting-over)
- [14. Scope Cutting by Project Type](#14-scope-cutting-by-project-type)
- [15. The "Ship It" Checklist (Minimum for Demo Day)](#15-the-ship-it-checklist-minimum-for-demo-day)
- [16. Conversations to Have With Your Mentor](#16-conversations-to-have-with-your-mentor)
- [The Bottom Line](#the-bottom-line)

---

# Part 1: Daily Check-ins & Accountability

---

## 1. Why Check-ins Matter

Accountability is the single biggest predictor of whether you finish your project or abandon it at 60%.

Here's the truth: motivation fades. Excitement about your idea peaks in week 1 and drops off a cliff by week 3. What keeps you going is the habit of showing up, writing down what you did, and knowing that other people are watching.

Daily check-ins take 2 minutes. That's it. But those 2 minutes do a lot of heavy lifting:

- **They keep you honest.** Writing "I did nothing today" feels bad enough that you'll do *something* before posting.
- **They create momentum.** Even small wins stack up. "Built the login page" on Monday makes "Connected the database" on Tuesday feel natural.
- **Public commitment works.** Posting your progress where others can see it makes you roughly 3x more likely to follow through. This isn't motivational fluff -- it's backed by research.
- **Mentors can spot trouble early.** If your check-ins say "stuck" three days in a row, your mentor will reach out before that blocker turns into a week of lost progress.

Skip the check-in and you're building alone in the dark. Post the check-in and you've got a team behind you.

---

## 2. Daily Standup Format

Post this in the **#daily-standups** channel every morning or evening. Pick a time and stick with it.

### Template (Copy-Paste This)

```
Day [X] / Week [X]

Done today:
- [What you built/fixed/shipped today]

Doing tomorrow:
- [What you plan to work on next]

Blocked by:
- [Anything stopping you, or "Nothing, all good"]

Mood: [emoji]
```

### Mood Key

| Emoji | Meaning |
|-------|---------|
| :fire: | On fire, shipping fast |
| :rocket: | Good progress, feeling solid |
| :construction: | Building but it's slow going |
| :sos: | Stuck, need help |

### Rules

- Keep it short. 3-5 bullet points max across all sections.
- **"Done today" must be specific.** Write "Built the login page with email/password auth" not "Worked on auth." Write "Fixed the sidebar not collapsing on mobile" not "CSS stuff."
- If you didn't code today, that's fine. Write what you did: "Researched payment APIs" or "Rewrote the PRD after feedback" still counts.
- If you did nothing, post anyway. Write "Life happened, back at it tomorrow." The streak matters more than the content.

### Good Example

```
Day 7 / Week 2

Done today:
- Built the task creation form with title, description, and due date fields
- Connected form to Supabase -- tasks save to the database
- Added form validation (required fields, date can't be in the past)

Doing tomorrow:
- Task list view with filtering by status
- Delete task functionality

Blocked by:
- Nothing, all good

Mood: :rocket:
```

### Bad Example

```
Day 7 / Week 2

Done today:
- Worked on stuff
- Fixed some bugs

Doing tomorrow:
- More features

Blocked by:
- Nothing

Mood: :rocket:
```

This tells your mentor and your buddy absolutely nothing. Be specific.

---

## 3. Weekly Progress Review (Every Sunday)

Every Sunday, take 15 minutes to zoom out. This is where you check if you're actually on track to ship by week 4.

### Template (Copy-Paste This)

```
WEEK [X] REVIEW

What I shipped this week:
- [Feature/page/component 1]
- [Feature/page/component 2]
- [Feature/page/component 3]

What's working well:
- [Tool, technique, or workflow that clicked]

What I struggled with:
- [Honest assessment of what was hard]

Plan for next week:
- [Priority 1]
- [Priority 2]
- [Priority 3]

Am I on track to ship by week 4? [Yes / Behind but recoverable / Need to cut scope]

Screenshot/recording: [link or image of current state]
```

### Tips

- The screenshot is not optional. Post a screenshot or a short Loom recording of where your app is right now. Seeing your own progress is motivating. Letting others see it creates positive pressure.
- Be honest in "What I struggled with." If Supabase RLS policies ate 6 hours of your life, say that. Someone else probably hit the same wall, and your mentor can help.
- The "Am I on track?" question forces you to confront reality. If the answer is "Need to cut scope," read Part 2 of this handbook and make decisions now -- not in week 4.

### Good Example

```
WEEK 2 REVIEW

What I shipped this week:
- Task CRUD (create, read, update, delete) fully working
- Dashboard with task counts and status breakdown
- Drag-and-drop kanban board for task status changes

What's working well:
- Using Claude to generate Supabase queries is saving me tons of time
- The PRD keeps me focused -- I check it before starting any new feature

What I struggled with:
- Drag-and-drop was way harder than expected. Spent 2 days on it.
- Real-time updates aren't working yet -- have to refresh to see changes

Plan for next week:
- Real-time subscriptions for task updates
- User settings page
- Polish the UI -- loading states, empty states, error messages

Am I on track to ship by week 4? Behind but recoverable

Screenshot: [link to current dashboard screenshot]
```

---

## 4. CLAUDE.md / Cursor Rules Session Updates

This one is for you AND for the AI.

After every work session, update the "Current Status" section in your CLAUDE.md (or equivalent rules file for Cursor/Windsurf). This takes 2 minutes and saves you 15 minutes at the start of your next session.

Why? Because when you start a new chat with Claude or open a new Cursor session, the AI reads CLAUDE.md first. If your status section is up to date, the AI knows exactly what's done, what's in progress, and what's broken. No need to re-explain your entire project every time.

### Template for the Status Section (Add This to Your CLAUDE.md)

```
## Current Status
Last updated: [date]

Completed:
- Auth system (email + Google OAuth)
- Dashboard layout with sidebar
- Project CRUD (create, read, update)

In progress:
- Time tracking feature (timer UI done, need to connect to database)

Up next:
- Invoice generation
- Deployment to Vercel

Known issues:
- Google OAuth redirect fails on mobile Safari
- Dark mode toggle doesn't persist on refresh
```

### Rules

- Update this at the END of every session, not the beginning. You'll forget details if you wait until tomorrow.
- "In progress" should say exactly where you left off. "Timer UI done, need to connect to database" is perfect. "Working on time tracking" is not.
- "Known issues" is critical. If you don't write down bugs, you'll rediscover them two days later and waste time debugging the same thing twice.
- Keep items in "Completed" short. This list grows fast -- you don't need full descriptions, just enough for the AI (and future you) to know what exists.

---

## 5. Week-by-Week Milestones

Use these as a gut check. You don't have to hit every single item, but if you're missing more than one or two by the end of each week, you're falling behind.

### End of Week 1

- [ ] PRD written (both Product and Technical sections)
- [ ] Repo created on GitHub
- [ ] Project scaffolded and running locally
- [ ] CLAUDE.md or .cursor/rules file set up with project context
- [ ] Auth working (if your app needs it)
- [ ] Basic layout and navigation in place

**What "done" looks like:** You can open your app in the browser, click around the basic layout, and log in. Nothing works yet beyond that, and that's fine.

### End of Week 2

- [ ] Core feature #1 working
- [ ] Core feature #2 working (or in progress)
- [ ] Database connected with real data
- [ ] Frontend showing real data (not hardcoded dummy data)
- [ ] Can demo the core workflow end-to-end

**What "done" looks like:** You can show someone the main thing your app does. It's ugly, it's rough, but the core loop works. A user could accomplish the primary task your app was built for.

### End of Week 3

- [ ] All core features working
- [ ] UI polished (responsive, loading states, error handling)
- [ ] At least one "wow" detail (animation, AI-powered feature, nice UX touch)
- [ ] No major bugs
- [ ] Tested on mobile

**What "done" looks like:** You'd feel comfortable showing this to a friend. It doesn't crash, it looks decent, and it does what it's supposed to do.

### End of Week 4

- [ ] Deployed to a live URL
- [ ] Demo video recorded (2-3 minutes)
- [ ] README with screenshots on GitHub
- [ ] Can demo for 3 minutes without it crashing
- [ ] Demo Day presentation ready

**What "done" looks like:** You can text someone a link, they open it on their phone, and your app works. You have a video that shows what it does. You're ready for Demo Day.

---

## 6. Buddy System

You'll be paired with an accountability buddy at the start of the cohort. This person is your partner for 4 weeks.

### What Your Buddy Does

- Check in with each other at least **3 times per week** (DM, voice chat, or async message)
- Ask two questions: **"Did you ship today?"** and **"What's blocking you?"**
- If your buddy is stuck, you don't need to fix their code. Just help them think through the problem out loud. Rubber ducking with a human beats rubber ducking alone.

### What Your Buddy Does NOT Do

- They're not your debugger. Don't send them your codebase and say "fix this."
- They're not your therapist. Keep it focused on the project.
- They're not your boss. No guilt trips. Just honest check-ins.

### How to Be a Good Buddy

- Respond within a few hours, not days.
- If your buddy goes quiet for 2+ days, ping them. "Hey, haven't seen you post. Everything good?" goes a long way.
- Celebrate their wins. "Nice, the drag-and-drop looks sick" takes 5 seconds and keeps morale up.
- If they're behind, help them cut scope instead of just saying "you got this." Encouragement without a plan is useless.

### Suggested Buddy Check-in Format

```
Hey [name], quick check-in:

1. What did you ship since we last talked?
2. What are you working on next?
3. Anything blocking you that I can help with?
```

---

## 7. Progress Tracking

Keep a simple running log. One line per day. No fancy tool needed -- a section at the bottom of your CLAUDE.md, a note in your phone, or a pinned message to yourself all work.

### Template

```
PROJECT LOG

Day 1: Set up repo, installed tools, wrote PRD
Day 2: Scaffolded project with Next.js, auth working with Supabase
Day 3: Built dashboard layout, sidebar navigation
Day 4: STUCK on Supabase RLS policies, asked in #help channel
Day 5: RLS fixed (shoutout to @mentor), started on task CRUD
Day 6: Task creation and listing done
Day 7: Week 1 review, ahead of schedule
Day 8: Started drag-and-drop kanban board
Day 9: Drag-and-drop mostly working, weird bug on mobile
Day 10: Fixed mobile bug, added task editing
...
```

### Why This Matters

This log is for you. Not for your mentor, not for your buddy, not for grading.

On the days when you feel like you're not making progress (and those days will come), scroll back through this log. You'll see that three days ago you didn't even have a database connected, and now you have a working kanban board. That perspective is powerful.

Mark the stuck days too. "STUCK on X" is useful data. If you see yourself getting stuck every 3-4 days, that's normal. If you're stuck 3 days in a row, that's a signal to ask for help.

---

## 8. What Happens If You Fall Behind

First: falling behind is normal. Most people in every cohort fall behind at some point. What matters is what you do about it.

### Week 1-2: You Have Time

You're early enough that a solid weekend can get you caught up. Block out 4-6 hours on Saturday, put your phone in another room, and grind. Use the #help channel aggressively. Don't sit stuck for more than 30 minutes without asking someone.

### Week 3: Time to Cut Scope

If you're behind in week 3, you do not have time to build everything you originally planned. That's okay.

Here's what to do:

1. Open your PRD.
2. Pick your top 2 features -- the ones that make your app actually useful.
3. Cut everything else. Move it to a "V2 / Post-Cohort" section.
4. Focus all your remaining time on making those 2 features work well and deploying.

Read Part 2 of this handbook for detailed help on this.

A focused app with 2 great features beats a broken app with 6 half-finished ones.

### Week 4: Ship What You Have

It's Demo Day week. Whatever you have right now -- that's your app. Stop adding features. Focus on:

1. Fix any crashing bugs
2. Deploy to a live URL
3. Record your demo video
4. Write your README

A working v0.1 that you can demo is infinitely better than an unfinished v1.0 sitting on localhost.

### Talk to Your Mentor

Seriously. Your mentor has helped people ship from worse positions than yours. They've seen people go from "I have nothing" on Day 20 to a working demo on Day 28. But they can only help if you tell them where you are.

Send them a DM. Be honest. Say "I'm behind, here's where I am, what should I cut?" They'll help you make a plan.

The only way to truly fail this cohort is to go silent.

---

## Quick Reference: What to Post and When

| When | What | Where |
|------|------|-------|
| Every day | Daily standup | #daily-standups |
| Every Sunday | Weekly review | #weekly-reviews |
| After every work session | Status update | Your CLAUDE.md file |
| 3x per week minimum | Buddy check-in | DM with your buddy |
| When stuck for 30+ min | Help request | #help channel |
| End of each week | Milestone checklist | Self-assessment |

---

## Remember

The people who ship are not the most talented. They're the ones who showed up every day, posted their check-in, asked for help when they were stuck, and kept moving forward even when it was hard.

Two minutes a day. Post your standup. Update your CLAUDE.md. Check in with your buddy.

That's the system. Trust it.

---

# Part 2: Scope Cutting & Shipping

## How to Ship When You're Running Out of Time

You're in Week 2 or 3 of Ship With AI. Things are taking longer than you thought. Features you figured would take a day are taking three. You're starting to panic.

Take a breath. This is normal. This guide will help you figure out what to cut, what to keep, and how to still ship something you're proud of.

---

## 9. Why You Will Need to Cut (And That's OK)

Here's a truth that every professional developer knows: **every project runs over scope.** Every single one. The devs at Google, Apple, Stripe -- they all cut features before shipping. It's not a sign that something went wrong. It's just how building software works.

Things take longer than you think. Bugs appear. That "simple" feature turns out to require three other things you didn't plan for. An API you were counting on doesn't work the way the docs said it would.

This is the game. And the skill isn't avoiding scope creep -- it's knowing what to cut when it happens.

Here's what matters:

- **A shipped MVP beats an unfinished "complete" product every time.** Nobody cares about the 12 features you almost built. They care about the 3 features that actually work.
- **Cutting features is not failure.** It's the single most important skill in product development. Product managers at top companies get paid six figures to decide what NOT to build.
- **The goal of this mentorship is to ship something real.** Not something perfect. Not something that does everything. Something real, that works, that you can show people and put on your portfolio.

A live app with one killer feature is worth more than a local dev server with ten half-finished ones.

---

## 10. The Week 2 Reality Check

By the end of Week 2, here's where you should be:

### The Checklist

- [ ] Auth is working (login, signup, logout) -- if your app needs it
- [ ] Database is connected and you can read/write data
- [ ] 1-2 core features are functional (not polished, but working)
- [ ] You've deployed at least once (even if it's rough)
- [ ] You can click through the main flow of your app without hitting a dead end

### If You're Missing More Than 2 of These...

You need to cut scope **right now**. Not next week. Not "after I finish this one thing." Now.

The most common mistake students make is thinking they'll "catch up" in Week 3. You won't. Week 3 is for polishing, fixing bugs, and getting ready to demo. If your core features aren't working by end of Week 2, you don't have a Week 3 problem -- you have a scope problem.

### How to Assess Where You Are

Ask yourself these questions:

1. Can someone who isn't me use this app right now and get value from it?
2. If I had to demo this tomorrow, could I show it for 3 minutes without it crashing?
3. Am I still building infrastructure, or am I building features?

If the answer to #3 is "still infrastructure" -- you're behind. Cut now.

---

## 11. What to Cut vs What to Keep

This is the hard part. You've been thinking about all these features for weeks. They all feel important. But they're not all equal.

### Always Keep (The "Ship" Features)

These are non-negotiable. If you cut these, you don't have a product:

- **The ONE core feature that defines your product.** The thing it does that nothing else does. The reason it exists. If you can't name this in one sentence, stop and figure it out before you write another line of code.
- **Basic auth (login/signup)** -- if your app needs user accounts.
- **A clean landing/home page.** First impressions matter. This doesn't need to be fancy, but it needs to look intentional, not broken.
- **Working deployment.** It has to be live. On a real URL. That someone else can visit. A project that only runs on localhost doesn't count.
- **Mobile responsiveness.** Most people who look at your project will see it on their phone first -- whether that's a recruiter, a friend you share it with, or a demo day audience member checking it out on their phone while you present.

### Cut First (These Are Nice-to-Have)

These features feel important but they're not. Cut them and don't look back:

- **Admin dashboards** -- You don't need an admin panel for a demo. You have database access.
- **Email notifications** -- Nobody needs email from your MVP. Put a note that says "notifications coming soon."
- **Payment/billing** -- Use a "coming soon" badge or just make everything free. Stripe integration is a rabbit hole.
- **Dark mode** -- Unless your entire brand identity is dark-themed, skip it. Light mode is fine.
- **Social features** -- Comments, sharing, following, likes. These are entire products in themselves. Cut them.
- **Analytics and reporting** -- Charts and dashboards look cool but they eat time. Your users don't need them yet because they don't have data yet.
- **Multiple user roles** -- Admin vs. regular user vs. moderator? Pick one. Everyone is the same role for now.
- **File uploads** -- If uploading files isn't the core of what your app does, cut it. It's surprisingly complex.
- **Settings pages with lots of options** -- Users don't need 15 toggles. Pick sensible defaults and ship those.
- **Search** -- Unless search IS your product, skip it. Users can scroll.

### Simplify Instead of Cutting

Sometimes you don't need to remove a feature entirely -- you just need to make it simpler:

| Instead of... | Do this... |
|---|---|
| Real-time updates (WebSockets) | Manual refresh button -- "Click to refresh" |
| File upload | URL input -- let users paste a link instead |
| Full CRUD (Create, Read, Update, Delete) | Create and Read only. No editing, no deleting. |
| Custom design system | Use shadcn/ui or Tailwind defaults as-is |
| Multiple pages | One page with tabs or sections |
| Complex filtering with multiple dropdowns | A single search box |
| User profile with avatar upload and bio | Just a name and email display |
| Fancy onboarding flow | A single "get started" page |

The simplified version often turns out to be the better UX anyway.

---

## 12. The "One Thing" Framework

When you're overwhelmed and don't know what to cut, ask yourself this:

> **"If my app could only do ONE thing, what would it be?"**

Build that one thing really well. Make it smooth. Make it reliable. Make it look good. Everything else is gravy.

### Example

Say your app is a **time tracker for freelancers**.

**The ONE thing:** Start a timer, stop a timer, see your logged time.

That's it. That's the entire product. If that works well, you have a shippable app.

Everything else is secondary:

- Invoicing? Post-MVP.
- Client management? Post-MVP.
- Weekly/monthly reports? Post-MVP.
- Team features? Way post-MVP.
- Export to CSV? Nice to have. Not now.

### More Examples

| Project | The ONE Thing |
|---|---|
| Recipe app | Save a recipe and view it later |
| Habit tracker | Check off today's habits, see your streak |
| Job application tracker | Add a job, update its status |
| AI writing tool | Paste text, get AI suggestions back |
| Bookmark manager | Save a URL, find it later |
| Budget app | Log an expense, see your total spending |

Notice how simple these are. That's the point. The ONE thing should be explainable in under 10 words.

---

## 13. How to Cut Without Starting Over

Cutting a feature doesn't mean deleting code and rebuilding. Here's the process:

### Step 1: Comment Out, Don't Delete

```javascript
// TODO: Post-MVP - Invoice generation
// function generateInvoice(timeEntries) {
//   ...
// }
```

Keep the code. You might come back to it. You might not. But don't throw it away.

### Step 2: Remove the Entry Point

If there's a nav link, button, or menu item that leads to the unfinished feature -- remove it. Users should never be able to stumble into a broken page.

```jsx
// Before
<nav>
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/invoices">Invoices</Link>  {/* Remove this */}
  <Link to="/settings">Settings</Link>  {/* Remove this too */}
</nav>

// After
<nav>
  <Link to="/dashboard">Dashboard</Link>
</nav>
```

### Step 3: Add a "Coming Soon" (Optional)

If removing the feature makes the app feel too empty, replace it with a placeholder:

```jsx
<div className="text-center py-12 text-gray-500">
  <p className="text-lg font-medium">Invoicing -- Coming Soon</p>
  <p className="text-sm">We're working on this. Stay tuned.</p>
</div>
```

This is a product decision, not a hack. Real companies do this all the time.

### Step 4: Update Your Planning Docs

- **PRD:** Move the feature from "Core" to "Post-MVP" or "Future"
- **CLAUDE.md:** Remove it from the current scope so the AI stops trying to build it
- **Task list:** Cross it off. It's not happening this sprint.

### Step 5: Tell the AI

Give your AI coding tool a clear instruction:

> "We're removing the invoicing feature from the current scope. Remove all references to it from the navigation, sidebar, and any routes. Comment out any incomplete invoice-related code but don't delete it."

Be explicit. The AI will try to be helpful and add it back if you're not clear that it's been cut.

---

## 14. Scope Cutting by Project Type

Different types of projects have different cut-vs-keep priorities.

### Website / Landing Page

**Cut:**
- Animations and scroll effects
- Blog section
- CMS integration
- Newsletter signup (just collect emails in a form for now)
- Multiple page variants

**Keep:**
- Hero section with a clear value proposition
- Core content -- what the product/service is
- Call-to-action (CTA) -- what you want visitors to do
- Responsive design
- Live deployment

### SaaS App

**Cut:**
- Billing and subscription management
- Admin panel
- Email notifications
- Multiple user roles
- Onboarding flows
- Team/organization features

**Keep:**
- Authentication (login/signup)
- The core feature -- the thing your app does
- Clean, usable UI
- Data persistence (stuff saves when you refresh)
- Live deployment

### Chrome Extension

**Cut:**
- Settings/options page
- Sync across devices
- Complex popup UI with multiple views
- Keyboard shortcuts
- Context menu integrations

**Keep:**
- The core functionality -- what happens when you click the extension
- A clean, simple popup
- Chrome Web Store listing (even if basic)
- Works reliably on the sites it's supposed to work on

### Mobile App (React Native / Expo)

**Cut:**
- Push notifications
- Offline mode
- Camera/photo integration (unless core)
- Complex gestures
- Both platforms at once

**Keep:**
- Core screens (2-3 max)
- Navigation between screens
- Auth (if needed)
- One platform only -- pick iOS OR Android, not both
- Works without crashing for a demo

---

## 15. The "Ship It" Checklist (Minimum for Demo Day)

This is your bare minimum. If you can check all of these, you're ready to demo:

- [ ] **Core feature works.** Someone can use the main thing your app does.
- [ ] **No console errors visible to users.** Open DevTools, check the console. Fix the red stuff.
- [ ] **Responsive on mobile.** Pull it up on your phone. Does it look OK? Can you tap the buttons?
- [ ] **Deployed to a live URL.** Vercel, Netlify, Railway -- doesn't matter. It's live.
- [ ] **Landing/home page looks clean.** Not fancy. Clean. Intentional spacing. Readable text. No placeholder text like "Lorem ipsum."
- [ ] **Auth works (if applicable).** You can sign up, log in, and log out without errors.
- [ ] **README on GitHub.** What is this project? How do you run it? What tech does it use? A screenshot helps.
- [ ] **Can demo it for 3 minutes without crashing.** Practice the demo flow. Click through it 5 times. If it crashes on the third try, fix that before adding anything else.

That's it. That's the bar. Clear it, and you've shipped something real.

---

## 16. Conversations to Have With Your Mentor

Your mentor has seen dozens (maybe hundreds) of students go through exactly what you're going through right now. They're not going to judge you for being behind. They're going to help you figure out what to do about it.

### Things You Should Say

- **"I'm behind schedule. Here's where I am. What should I cut?"** -- This is the most productive conversation you can have. Come with a list of what's done, what's in progress, and what's not started.

- **"Is this feature worth the time it'll take?"** -- Sometimes you're spending 8 hours on something that adds 5% to the user experience. Your mentor can help you see that.

- **"Can I simplify X to make it work in one day?"** -- Mentors are great at finding the simpler version of what you're trying to build. They've done this before.

- **"I want to cut Y. Is that OK for the final demo?"** -- Get confirmation. It'll make you feel better and your mentor might suggest an even smarter cut.

### Things You Should Not Do

- **Don't hide that you're behind.** Everyone can see it anyway. The sooner you say it, the sooner you get help.
- **Don't wait until Week 4 to ask for help.** By then it's too late to course-correct. Week 2 is the time.
- **Don't be embarrassed.** Scope cutting isn't a sign of weakness. It's literally why mentors are here. Professional developers do this every single sprint.

---

## The Bottom Line

Shipping beats perfection. Every time.

An app with one feature that works is better than an app with ten features that don't. A live URL with a simple design is better than a localhost project with a beautiful UI nobody can see.

Cut early. Cut often. Ship something real.

You've got this.
