# The Ship With AI Starter Kit

## Build Your First Project With AI in a Weekend

*A free guide by [@darasoba](https://x.com/darasoba)*

---

You know that idea you've been sitting on? The portfolio site, the small tool, the side project you keep putting off because "I'm not a developer" or "I don't have time to learn all that"?

What if I told you that you could build and ship it this weekend? Not a toy. Not a tutorial demo. A real, working project that lives on the internet with your name on it.

That's what this guide is for.

I'm going to walk you through building a personal portfolio website from scratch using AI coding tools. We'll go step by step, and I'll give you the exact prompts to type. By the end, you'll have a live website and a clear understanding of how to use AI to build basically anything.

No prior coding experience required. Seriously.

---

## The Three Tools Worth Knowing

There are a bunch of AI coding tools out there. These three are the ones worth learning first.

### Claude Code

A terminal-based AI coding agent built by Anthropic. You type commands and talk to it right in your terminal. It can read your files, write code, run commands, and make changes across your whole project. It also has "Plan Mode" where it maps out exactly what it's going to do before doing it.

**Cost:** Requires a Claude Pro subscription ($20/month) or API access.

```bash
npm install -g @anthropic-ai/claude-code
```

### Cursor

A code editor (looks and feels exactly like VS Code) with AI built right in. It has a chat panel, inline editing, and an agent called Composer that can create and modify multiple files at once. If you've ever used VS Code, Cursor feels like home but with a really smart assistant sitting next to you.

**Cost:** Free tier available. Pro is $20/month.

Download from [cursor.sh](https://cursor.sh) and install like any other app.

### OpenAI Codex CLI

OpenAI's terminal coding agent. Similar to Claude Code — runs in your terminal, reads and writes code. If you already pay for ChatGPT Plus, you get Codex included.

**Cost:** Included with ChatGPT Plus ($20/month) or via API.

```bash
npm install -g @openai/codex
```

> **Quick note:** Claude Code and Codex install via npm, so you need [Node.js](https://nodejs.org) on your machine. Download the LTS version if you don't have it.

---

## Build a Portfolio Site With Claude Code

Pick a tool and let's build. I'll walk through Claude Code — the workflow is similar in Cursor and Codex.

Open your terminal:

```bash
mkdir my-portfolio
cd my-portfolio
claude
```

**Prompt 1: Initialize the project**

```
Create a new Next.js project in this directory with TypeScript and Tailwind CSS.
Use the App Router. Don't include any example pages. Just give me a clean
starting point.
```

Claude Code will scaffold your project, install dependencies, and set everything up.

**Prompt 2: Create the CLAUDE.md file**

This tells Claude about your project so it gives better results in future prompts.

```
Run /init to create a CLAUDE.md file for this project.
```

**Prompt 3: Plan and build the portfolio**

```
I want to build a personal portfolio website. I need:

1. A hero section with my name, a one-line description, and a CTA button
2. An "About Me" section with a short bio
3. A "Projects" section with 3-4 cards in a grid (title, description, tech tags, link)
4. A "Contact" section with email, GitHub, and X links
5. A footer

Clean, modern design. Dark theme with accent colors. Fully responsive.

Plan this out first, then build it.
```

Review the plan, then tell it to proceed.

**Prompt 4: Add your real content**

```
Update the portfolio with this information:

Name: [YOUR NAME]
Title: [YOUR TITLE]
Bio: [A SHORT BIO]

Projects:
1. [PROJECT NAME] - [DESCRIPTION] - Built with [TECH]
2. [PROJECT NAME] - [DESCRIPTION] - Built with [TECH]
3. [PROJECT NAME] - [DESCRIPTION] - Built with [TECH]

Contact:
- Email: [YOUR EMAIL]
- GitHub: [YOUR GITHUB URL]
- Twitter/X: [YOUR X HANDLE]
```

**Prompt 5: Polish**

```
Improve the design:
- Add smooth scroll animations when sections come into view
- Add hover effects on project cards (subtle scale and shadow)
- Make the navigation sticky at the top
- Make sure spacing between sections feels consistent
```

**Prompt 6: Test it**

```
Start the development server so I can preview the site.
```

Open `http://localhost:3000` in your browser. You should have a working portfolio.

---

## Deploy It (2 Minutes)

Your site is running locally. Let's put it on the internet.

### Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio site"
```

Create a new repo at [github.com/new](https://github.com/new), then push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

### Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New Project"
3. Import your repository
4. Click "Deploy"

In about 60 seconds, your site is live. That's it.

---

## 10 Prompting Principles That Actually Work

The key to getting AI to build what you want is learning how to prompt well.

### 1. Be Specific About What "Done" Looks Like

**Bad:** `Make a nice landing page`

**Good:** `Create a landing page with a centered hero section containing a headline ("Build Faster With AI"), a subheadline (2 sentences about AI coding), and a blue CTA button that says "Get Started". Below that, a 3-column feature grid. Dark background, white text.`

### 2. Give Context Before Asking for Code

```
I'm building a personal portfolio site for a frontend developer.
The audience is recruiters. The tone should be professional but
approachable. Now, create a hero section that...
```

### 3. Break Big Tasks Into Small Steps

Don't build your whole app in one prompt. Scaffold first, then layout, then content, then styling, then polish. Each step = its own prompt.

### 4. Show Before and After

```
Right now the project cards are in a single column. Change them to a
3-column grid on desktop and 1 column on mobile. Add a subtle shadow
on hover.
```

### 5. Reference Files Directly

```
Look at src/components/Hero.tsx and make the headline larger. Change
the font size to 4xl on mobile and 6xl on desktop.
```

### 6. Use Plan Mode for Complex Changes

```
I want to add a blog to my portfolio. Before writing any code, plan out
the file structure and components I'll need. Show me the plan first.
```

### 7. Iterate in Small Steps

```
The spacing between the hero and about section is too tight. Add more
padding. Also, make the project card titles bolder.
```

### 8. When Something Breaks, Share the Error

```
I'm getting this error:
Error: Cannot find module './components/ProjectCard'
Fix this.
```

### 9. Ask the AI to Explain

```
Explain what the useEffect hook is doing in this component. Keep it simple.
```

This is how you learn while building.

### 10. Set Up Project Memory

Use CLAUDE.md or Cursor Rules to store preferences:

```markdown
# Project: My Portfolio
- Framework: Next.js 14, TypeScript, Tailwind CSS
- Style: Dark theme, minimal design
- Components: Functional components only
```

---

## What's Next?

You just built and shipped a real website. Most people spend months "learning to code" before they ship anything. You did it in a weekend.

This guide is a taste. In the **Ship With AI** mentorship, we go way deeper:

- Build and ship a real product (not just a portfolio)
- Advanced prompting and debugging workflows
- Master Claude Code, Cursor, and Codex
- MCP (Model Context Protocol) to connect AI to external services
- Live sessions, code reviews, and 1-on-1 support
- A community of builders shipping real projects

**Follow [@darasoba on X](https://x.com/darasoba) for more free tips.**

---

*This guide is free to share. If it helped you, pass it along.*
