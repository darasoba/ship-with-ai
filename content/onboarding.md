---
title: "Onboarding"
slug: "onboarding"
---

# Ship With AI -- Student Onboarding Guide

Welcome to the program. This document has everything you need to get started.

---

## Welcome

You are about to spend 4 weeks building and shipping a real product using AI coding tools. By the end of this program, you will have a live, deployed project that you conceived, built, and shipped.

This is not a course where you watch videos and take notes. You will be building every single day. The AI tools do the heavy lifting with the code, and you direct, review, and make decisions. Think of it like being the architect while AI is your construction crew.

**The program is run by @darasoba.** If you have questions at any point, ask in the community channels or send a DM.

---

## Before You Start: Pre-Work Checklist

Complete everything on this list before the first live session. Budget 2-3 hours.

**Deadline: [DATE - to be filled in per cohort]**

### 1. Set Up Your Development Environment

- [ ] Install [VS Code](https://code.visualstudio.com/) or [Cursor](https://cursor.com/) (if Cursor is your primary tool, use that as your editor)
- [ ] Install [Node.js](https://nodejs.org/) (LTS version)
- [ ] Install [Git](https://git-scm.com/) and set up your identity:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your@email.com"
  ```
- [ ] Install [GitHub CLI](https://cli.github.com/) and log in: `gh auth login`
- [ ] Install [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code): run `npm install -g @anthropic-ai/claude-code`
- [ ] (Optional) Install [Docker](https://docker.com/) if you are building a backend-heavy project
- [ ] (Optional) Install [Figma](https://figma.com/) desktop app if you are on the designer track

### 2. Create Your Accounts

- [ ] [GitHub](https://github.com/) account (you will push all your code here)
- [ ] [Anthropic API key](https://console.anthropic.com/) (needed for Claude Code)
- [ ] [OpenAI account](https://platform.openai.com/) (needed for Codex)
- [ ] [Cursor account](https://cursor.com/) (free tier works)
- [ ] [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/) account (for deploying your project)
- [ ] [Supabase](https://supabase.com/) or [Firebase](https://firebase.google.com/) account (if your project needs a database)

### 3. Test That Everything Works

Open your terminal and run these commands. If they work, you are good to go:

```bash
node --version      # Should show v18 or higher
git --version       # Should show any version
claude --version    # Should show the Claude Code version
```

If Cursor is your primary tool, open it and verify you can start a new project and that the AI chat works (Cmd+L on Mac, Ctrl+L on Windows).

### 4. Do the Pre-Read

- [ ] Read: [What is Vibe Coding?](https://en.wikipedia.org/wiki/Vibe_coding) (5 min read)
- [ ] Watch: The intro videos for Claude Code, Cursor, and Codex (links are pinned in the community channel)
- [ ] Write: A 1-page project brief covering:
  - What you are building
  - Who it is for
  - What the MVP looks like (the smallest version that works)

Post your project brief in the **#show-your-work** channel before the first session.

---

## Communication Channels

We use [Slack/Discord] for all program communication. Here is how the channels work:

| Channel | What it is for |
|---|---|
| **#announcements** | Schedule updates, deadlines, and important info. Read-only. |
| **#general** | Open discussion, questions, and conversation |
| **#show-your-work** | Post your progress here. Screenshots, videos, deployed links. |
| **#help** | Stuck on something technical? Ask here. |
| **#resources** | Useful articles, tools, and tutorials shared by anyone |
| **#off-topic** | Non-program stuff. Memes welcome. |

**Join link:** [TO BE FILLED IN PER COHORT]

### How to Use the Channels

- **When you are stuck:** Post in #help. Include what you tried, what happened, and a screenshot or code snippet. The more context you give, the faster someone can help.
- **When you make progress:** Post in #show-your-work. Even small wins count. A screenshot of your first page rendering is worth sharing.
- **When you have a question about the program:** Post in #general or DM @darasoba.

---

## How to Get Help

You will get stuck. That is normal. Here is how to get unstuck:

### 1. Ask the AI First
Before posting in the help channel, try asking your AI tool to fix the issue. Paste the error message into Claude Code, Cursor, or Codex and ask "What is wrong and how do I fix it?"

AI tools solve 80% of coding problems faster than a human can.

### 2. Post in #help
If the AI cannot solve it, post in #help with:
- What you were trying to do
- The error message or screenshot
- What you already tried
- A link to your code (GitHub or code snippet)

### 3. Office Hours
Every Wednesday at [TIME] [TIMEZONE], there is a live drop-in session. Come with your questions. Screen-sharing and live debugging happen here. This is the fastest way to get unstuck on hard problems.

### 4. Peer Support
Your cohort members are building things too. Help each other. If you see a question in #help that you can answer, jump in. Teaching others is one of the best ways to learn.

### 5. Direct Message
If something is personal or you are struggling with the program in a way you do not want to discuss publicly, DM @darasoba directly.

---

## Expectations and Commitment

### What We Expect From You

- **Show up.** Attend live sessions or watch the recording within 24 hours. If you cannot make a session, let us know.
- **Build every day (or close to it).** You do not need to code for 8 hours, but consistent daily progress adds up fast. Even 30-60 minutes a day is enough if you are focused.
- **Share your work.** Post your progress in #show-your-work at least once a week. This keeps you accountable and helps others learn from your process.
- **Ask for help when you need it.** Do not struggle silently for days. Post in #help or come to office hours.
- **Finish and present.** On Demo Day (Week 4), you will present your project to the cohort. This is not optional. Your project does not need to be perfect. It needs to be real.

### What You Can Expect From Us

- Honest, specific feedback on your project every week
- Responses to questions within 24 hours (usually much faster)
- Live sessions that are practical and hands-on, not lectures
- A supportive cohort of builders who want to help each other

### Time Commitment

Plan for **8-12 hours per week** to get the most out of the program:

| Activity | Time per week |
|---|---|
| Live sessions (2 per week) | 2-3 hours |
| Office hours (optional but recommended) | 1 hour |
| Building your project | 4-6 hours |
| Watching recordings, reading resources | 1-2 hours |

If you can commit more time, great. If some weeks are lighter, that is fine too. The important thing is consistency.

---

## Your AI Tool Track

Based on your application, you have been matched with a primary AI tool:

- **Cursor** if you are a designer, visual builder, or prefer working in an IDE
- **Claude Code** if you are a developer or comfortable in the terminal
- **OpenAI Codex** if you are a product person or prefer a conversational, cloud-based approach

Your primary tool is your daily driver for the program. But you will learn all three tools during Week 1, and you are encouraged to use whichever combination works best for your project.

---

## Week-by-Week Overview

Here is what to expect each week so you can plan ahead.

### Pre-Work (Before Week 1)
- Set up your environment and accounts (this checklist)
- Write your project brief
- Join the community and introduce yourself
- Get familiar with your primary AI tool

### Week 1: Foundations
**Theme:** Learn the tools, start your project

What happens:
- Monday live session: Overview of all three AI tools with live demos
- Thursday workshop: Prompting for code (how to get AI to write good code)
- You set up your project repo and generate your initial scaffold
- By end of week: A GitHub repo with a running project scaffold

**Your deliverable:** A GitHub repo link and a screenshot of your project running locally.

### Week 2: Build
**Theme:** Build your core features

What happens:
- Monday live session: Design-to-code workflows
- Thursday workshop: Live code review of student projects
- You build your UI, set up your backend, and get core features working
- By end of week: 2-3 features functional with real data

**Your deliverable:** A 2-3 minute screen recording showing your working features.

### Week 3: Polish
**Theme:** Make it production-ready

What happens:
- Monday live session: UI/UX polish techniques using AI
- Thursday workshop: Testing and error handling
- You add responsive design, loading states, error handling, and visual polish
- By end of week: A polished, near-deployable product

**Your deliverable:** An updated screen recording of your polished product.

### Week 4: Ship
**Theme:** Deploy, document, and present

What happens:
- Monday live session: Deployment workshop (Vercel/Netlify)
- You deploy your project to a live URL
- You write documentation and prepare your Demo Day presentation
- **Day 28 (end of week): Demo Day**

**Your deliverable:** A live, deployed project. A 5-minute Demo Day presentation.

---

## Demo Day

Demo Day is the final event of the program. It happens on the last day of Week 4.

**Format:** Each student presents for 5 minutes. The structure is:
1. The Problem (30 sec): What you set out to build and why
2. The Product (2 min): Live demo of your working product
3. The Process (1.5 min): How you used AI tools to build it
4. The Lessons (1 min): What you learned

**Awards:**
- Best Product
- Best Design
- Best Use of AI
- Most Ambitious
- People's Choice (voted by the cohort)

You do not need to be a great presenter. You just need to show what you built and talk about how you built it. Everyone is supportive and this is a celebration of your work, not a competition.

---

## Quick Links

These will be updated per cohort:

| Resource | Link |
|---|---|
| Community (Slack/Discord) | [TO BE ADDED] |
| Live session Zoom link | [TO BE ADDED] |
| Curriculum document | [TO BE ADDED] |
| Session recordings | [TO BE ADDED] |
| Office hours booking | [TO BE ADDED] |
| Mentor DM | @darasoba |

---

## FAQ

**Q: What if I fall behind?**
A: It happens. Reach out to @darasoba. We will help you cut scope and focus on what matters. A smaller shipped project beats an unfinished ambitious one.

**Q: Can I change my project idea after starting?**
A: We strongly recommend sticking with your original idea. If you are really struggling with it, talk to the mentor before Week 2 and we can help you pivot.

**Q: Do I need to know how to code?**
A: No. The AI tools write the code. You need to be able to describe what you want, review what the AI produces, and make decisions. Some coding knowledge helps, but it is not required.

**Q: What happens after the program ends?**
A: The community channel stays open. Your project and GitHub repo are yours to keep building. We encourage you to share your work publicly and keep shipping.

**Q: How much does it cost?**
A: The program costs under $100. You will also need API keys for the AI tools, which have their own usage costs (most offer free tiers or credits that are enough for the program).

**Q: What if I miss a live session?**
A: All sessions are recorded. Watch the recording within 24 hours and post any questions in #help or #general.

---

Welcome to Ship With AI. Now go finish your pre-work and we will see you on Day 1.
