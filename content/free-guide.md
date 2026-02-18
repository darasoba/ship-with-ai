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

## What You'll Learn

- How to set up three powerful AI coding tools (Claude Code, Cursor, and Codex)
- How to talk to AI so it actually builds what you want
- How to go from an empty folder to a live website in a few hours
- The 10 prompting principles that make AI coding actually work

## What You'll Build

A personal portfolio website with:
- A hero section with your name and what you do
- An "About Me" section
- A project showcase grid
- A contact section
- Responsive design (looks good on phones too)
- Deployed live on the internet for free

Let's get into it.

---

## Part 1: The Three Tools You Need

There are a bunch of AI coding tools out there right now. These three are the ones worth learning first. They each work differently, and understanding all three will give you flexibility depending on what you're building.

### Claude Code

**What it is:** A terminal-based AI coding agent built by Anthropic. You type commands and talk to it right in your terminal. It can read your files, write code, run commands, and make changes across your whole project.

**Why it matters:** Claude Code doesn't just write code. It understands your entire project. It reads your file structure, knows what you've built so far, and can make coordinated changes across multiple files. It also has "Plan Mode" where it maps out exactly what it's going to do before doing it.

**Cost:** Requires a Claude Pro subscription ($20/month) or API access.

**Install it:**
```bash
npm install -g @anthropic-ai/claude-code
```

Then run `claude` in any project directory and sign in with your Anthropic account.

### Cursor

**What it is:** A code editor (looks and feels exactly like VS Code) with AI built right in. It has a chat panel, inline editing, and an agent called Composer that can create and modify multiple files at once.

**Why it matters:** If you've ever used VS Code, Cursor feels like home but with a really smart assistant sitting next to you. You can highlight code, ask questions, and use Cmd+K (or Ctrl+K on Windows) to edit code inline. The Composer feature is great for scaffolding new features or entire projects.

**Cost:** Free tier available. Pro is $20/month.

**Install it:** Download from [cursor.sh](https://cursor.sh) and install like any other app.

### OpenAI Codex CLI

**What it is:** OpenAI's terminal coding agent. Similar to Claude Code in that it runs in your terminal and can read, write, and execute code.

**Why it matters:** It's built on OpenAI's latest models and has tight integration with ChatGPT. If you already pay for ChatGPT Plus, you get Codex included. It also supports MCP (Model Context Protocol) for connecting to external tools.

**Cost:** Included with ChatGPT Plus ($20/month) or via API.

**Install it:**
```bash
npm install -g @openai/codex
```

Then run `codex` and sign in with your ChatGPT account.

> **Quick note on Node.js:** Both Claude Code and Codex install via npm, which means you need Node.js on your machine. If you don't have it, go to [nodejs.org](https://nodejs.org) and download the LTS version. Install it, restart your terminal, and you're good to go. You can verify with `node --version`.

---

## Part 2: Setup (30 Minutes)

Let's get everything ready. Follow these steps in order.

### Step 1: Install Node.js

If you don't already have it:
1. Go to [nodejs.org](https://nodejs.org)
2. Download the LTS version
3. Run the installer
4. Open a new terminal and verify:

```bash
node --version
npm --version
```

You should see version numbers. If you do, you're set.

### Step 2: Install Git and Set It Up

Git is your undo button. Every time the AI writes code that works, you save a snapshot. When something breaks (and it will), you go back to the last snapshot. Without Git, one bad AI response can destroy an hour of work. With Git, you're always one command away from a working version.

**Install Git:**

**Mac:** Open Terminal and type `git --version`. If it's not installed, your Mac will prompt you to install it.

**Windows:** Download from [git-scm.com](https://git-scm.com) and run the installer.

Verify:
```bash
git --version
```

**Set up your identity (one time only):**
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

**The 5 Git commands you need for this guide:**
```bash
git init                    # Start tracking a project
git add .                   # Stage all changes
git commit -m "message"     # Save a snapshot
git push                    # Upload to GitHub
git checkout .              # Undo all unsaved changes (your panic button)
```

That's it. We'll use these throughout the build. The rule is simple: every time something works, run `git add .` then `git commit -m "what you just did"`. This creates a save point you can always return to.

### Step 3: Create a GitHub Account

If you don't have one, go to [github.com](https://github.com) and sign up. It's free. You'll need this for deploying your site.

**Install the GitHub CLI (makes everything easier):**
```bash
# Mac
brew install gh

# Windows: download from https://cli.github.com/
```

Then log in:
```bash
gh auth login
# Choose GitHub.com, HTTPS, and authenticate via browser
```

### Step 4: Install Your AI Tools

Pick at least one (I recommend starting with Claude Code or Cursor):

**Claude Code:**
```bash
npm install -g @anthropic-ai/claude-code
claude
```
Sign in when prompted.

**Cursor:**
Download from [cursor.sh](https://cursor.sh). Open it. It'll walk you through setup.

**Codex:**
```bash
npm install -g @openai/codex
codex
```
Sign in when prompted.

### Step 5: Create Your Project Folder

```bash
mkdir my-portfolio
cd my-portfolio
```

### Step 6: Verify Everything Works

**For Claude Code:**
```bash
claude
```
You should see the Claude Code interface. Type "hello" and it should respond. Type `/exit` to leave.

**For Cursor:**
Open Cursor, then open the `my-portfolio` folder. Press Cmd+L (or Ctrl+L on Windows) to open the chat. Type "hello" and the AI should respond.

**For Codex:**
```bash
codex
```
You should see the Codex interface. Type "hello" and it should respond.

You're ready to build.

---

## Part 3: Your First Build (2-3 Hours)

We're going to build a portfolio website. I'll show you how to do it with each tool so you can compare. Pick whichever tool you set up, or try all three.

### Option A: Building with Claude Code

Open your terminal and navigate to your project folder:

```bash
cd my-portfolio
claude
```

**Prompt 1: Initialize the project**

```
Create a new Next.js project in this directory with TypeScript and Tailwind CSS.
Use the App Router. Don't include any example pages. Just give me a clean
starting point.
```

Claude Code will run the commands to scaffold your project. Let it do its thing. It'll install dependencies and set everything up.

**Prompt 2: Create the CLAUDE.md file**

This is important. A CLAUDE.md file tells Claude about your project so it gives better results in future prompts.

```
Run /init to create a CLAUDE.md file for this project.
```

Claude will analyze your project and create a CLAUDE.md that describes the tech stack, structure, and conventions. This acts as persistent memory for future sessions.

**Prompt 3: Plan the portfolio structure**

Use Plan Mode to think before coding:

```
I want to build a personal portfolio website. Before writing any code, let's
plan the structure. I need:

1. A hero section at the top with my name, a one-line description of what I
   do, and a call-to-action button
2. An "About Me" section with a short bio and a photo placeholder
3. A "Projects" section that shows 3-4 project cards in a grid. Each card
   should have a title, description, tech stack tags, and a link
4. A "Contact" section with links to email, GitHub, and Twitter/X
5. A footer with copyright info

The design should be clean and modern. Use a dark theme with accent colors.
Make it responsive.

Plan this out first. Show me the file structure and component breakdown before
writing code.
```

Claude will outline its plan. Review it, then tell it to proceed:

```
This looks good. Go ahead and build it.
```

**Prompt 4: Add real content**

```
Update the portfolio with this information:

Name: [YOUR NAME]
Title: [YOUR TITLE, e.g., "Software Developer" or "Product Designer"]
Bio: [A SHORT BIO ABOUT YOU]

Projects:
1. [PROJECT NAME] - [SHORT DESCRIPTION] - Built with [TECH]
2. [PROJECT NAME] - [SHORT DESCRIPTION] - Built with [TECH]
3. [PROJECT NAME] - [SHORT DESCRIPTION] - Built with [TECH]

Contact:
- Email: [YOUR EMAIL]
- GitHub: [YOUR GITHUB URL]
- Twitter/X: [YOUR X HANDLE]
```

**Prompt 5: Polish the design**

```
The layout is working but I want to improve the design:
- Add smooth scroll animations when sections come into view
- Add hover effects on the project cards (subtle scale and shadow)
- Make the navigation sticky at the top
- Add a subtle gradient background to the hero section
- Make sure the spacing between sections feels consistent
```

**Prompt 6: Make it responsive**

```
Check the responsive design. Make sure it looks great on:
- Mobile (375px width)
- Tablet (768px width)
- Desktop (1440px width)

Fix any layout issues. The project grid should be 1 column on mobile,
2 on tablet, and 3-4 on desktop.
```

**Prompt 7: Test it locally**

```
Start the development server so I can preview the site.
```

Open the URL it gives you (usually `http://localhost:3000`) in your browser.

### Option B: Building with Cursor

Open Cursor and open your `my-portfolio` folder.

**Step 1:** Press Cmd+L (or Ctrl+L) to open the chat panel.

**Step 2:** Use this prompt in chat:

```
Create a new Next.js 14 project with TypeScript and Tailwind CSS using the
App Router in this directory. Set it up with a clean starting point, no
example content.
```

Cursor will suggest terminal commands. Run them by clicking "Run" in the chat.

**Step 3:** Once the project is set up, use Cursor's Composer (Cmd+I or Ctrl+I) for the big build:

```
Build a personal portfolio website with:

1. A hero section with a name, job title, and CTA button
2. An "About" section with bio text and photo placeholder
3. A "Projects" grid showing 4 cards with title, description, tech tags,
   and links
4. A "Contact" section with email, GitHub, and X links
5. A footer

Use a dark theme. Clean, modern design. Fully responsive. Use Tailwind
for all styling. Create proper components in separate files.
```

Composer will create multiple files at once. Review the changes and click "Accept All" if they look good.

**Step 4:** Customize the content by opening specific files and using Cmd+K to edit inline. For example, highlight the placeholder name in the hero component and press Cmd+K:

```
Change this to "Sarah Chen" and the title to "Full-Stack Developer &
AI Enthusiast"
```

**Step 5:** Set up Cursor Rules for better results. Create a file at `.cursor/rules/portfolio.mdc`:

```
This is a Next.js portfolio website using TypeScript and Tailwind CSS.
- Use functional React components
- Keep components small and focused
- Use Tailwind utility classes, no custom CSS
- Follow mobile-first responsive design
- Use semantic HTML
```

### Option C: Building with Codex

Open your terminal:

```bash
cd my-portfolio
codex
```

**Prompt 1:**

```
Scaffold a Next.js project with TypeScript and Tailwind CSS in this
directory. Use the App Router. Clean starting point, no example content.
```

**Prompt 2:**

```
Build a personal portfolio website. I need a hero section, about section,
projects grid with 4 cards, contact section, and footer. Dark theme, clean
design, fully responsive. Generate all the components and pages.
```

Codex will generate files and you can review them before accepting.

**Prompt 3:** Customize and iterate just like with the other tools.

---

## Part 4: Deploy It to the World

Your site is running locally. Let's put it on the internet. We'll use Vercel because it's free and takes about 2 minutes.

### Step 1: Push Your Code to GitHub

In your terminal (or ask Claude Code / Codex to help):

```bash
cd my-portfolio
git init
git add .
git commit -m "Initial portfolio site"
```

Then create a new repository on GitHub:
1. Go to [github.com/new](https://github.com/new)
2. Name it `my-portfolio`
3. Don't initialize with README (you already have code)
4. Click "Create repository"
5. Follow the instructions to push existing code:

```bash
git remote add origin https://github.com/YOUR-USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click "Add New Project"
3. Import your `my-portfolio` repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

In about 60 seconds, your site will be live at `your-project.vercel.app`.

That's it. You just built and deployed a website using AI.

> **Alternative: Deploy on Netlify.** Go to [netlify.com](https://netlify.com), sign up with GitHub, click "Add new site" > "Import an existing project", select your repo, and click "Deploy". Same idea, different platform.

---

## Part 5: The 10 Prompting Principles

Here's the thing most people get wrong about AI coding: they treat it like a search engine. They type vague stuff and get vague results.

The key to getting AI to build what you actually want is learning how to prompt well. Here are the 10 principles I've found most useful.

### 1. Be Specific About What "Done" Looks Like

**Bad prompt:**
```
Make a nice landing page
```

**Good prompt:**
```
Create a landing page with a centered hero section containing a headline
("Build Faster With AI"), a subheadline (2 sentences about AI coding), and
a blue CTA button that says "Get Started". Below that, add a 3-column
feature grid. Dark background, white text.
```

The more specific you are, the less back-and-forth you need.

### 2. Give Context Before Asking for Code

Tell the AI what you're building and why before asking it to write code:

```
I'm building a personal portfolio site for a frontend developer. The
audience is recruiters and potential clients. The tone should be
professional but approachable. Now, create a hero section that...
```

### 3. Break Big Tasks Into Small Steps

Don't try to build your whole app in one prompt. Break it down:

1. First, scaffold the project
2. Then, build the layout structure
3. Then, add content to each section
4. Then, style it
5. Then, add animations and polish

Each step should be its own prompt. This gives you more control and better results.

### 4. Show Before and After

When you want changes, describe the current state and the desired state:

```
Right now the project cards are in a single column. Change them to a
3-column grid on desktop and 1 column on mobile. Add a subtle shadow
on hover.
```

### 5. Reference Files and Code Directly

In Claude Code, you can reference specific files:

```
Look at src/components/Hero.tsx and make the headline larger. Change
the font size to 4xl on mobile and 6xl on desktop.
```

In Cursor, highlight the code you want changed and use Cmd+K.

### 6. Use Plan Mode for Complex Changes

Before a big change, ask the AI to plan first:

```
I want to add a blog to my portfolio. Before writing any code, plan out
the file structure, data model, and components I'll need. Show me the
plan first.
```

### 7. Iterate in Small Steps

After the AI writes code, test it, then ask for specific changes:

```
The spacing between the hero section and the about section is too tight.
Add more padding. Also, the project card titles should be bolder.
```

### 8. When Something Breaks, Share the Error

If you get an error, paste the full error message:

```
I'm getting this error when I run the dev server:

Error: Cannot find module './components/ProjectCard'

Fix this.
```

### 9. Ask the AI to Explain

When you don't understand something the AI wrote, ask it:

```
Explain what the useEffect hook is doing in this component. Keep it simple.
```

This is how you learn while building.

### 10. Set Up Project Memory

Use CLAUDE.md (for Claude Code) or Cursor Rules (for Cursor) to store preferences so you don't repeat yourself:

**CLAUDE.md example:**
```markdown
# Project: My Portfolio
- Framework: Next.js 14, TypeScript, Tailwind CSS
- Style: Dark theme, minimal design
- Components: Always use functional components
- Naming: camelCase for variables, PascalCase for components
```

**Cursor Rules (.cursor/rules/style.mdc):**
```
Always use Tailwind utility classes. No custom CSS files.
Use TypeScript strict mode.
Prefer server components when possible.
```

---

## Part 6: Common Mistakes and How to Fix Them

### Mistake 1: Prompts That Are Too Vague

"Make it look better" gives the AI nothing to work with.

**Fix:** Be specific. "Increase the font size of the headline to 48px, add 24px of padding around the card, and change the background to #1a1a2e."

### Mistake 2: Trying to Build Everything at Once

Asking for an entire app in one prompt overwhelms the AI and you get mediocre results.

**Fix:** Build feature by feature. Get each piece working before moving on.

### Mistake 3: Not Reading What the AI Wrote

Andrej Karpathy coined "vibe coding" to mean accepting AI code without reading it. That's fine for throwaway projects, but if you want to learn and build real things, take a few minutes to read the code.

**Fix:** After each generation, scan the code. Ask the AI to explain parts you don't understand.

### Mistake 4: Ignoring the CLAUDE.md / Cursor Rules

Without project context, the AI starts fresh every session and forgets your preferences.

**Fix:** Set up CLAUDE.md or Cursor Rules at the start of every project. Update them as you go.

### Mistake 5: Not Using Version Control

If the AI breaks something and you didn't commit, you can't easily go back.

**Fix:** Commit after every working change:
```bash
git add .
git commit -m "Added project cards section"
```

---

## Bonus: The PRD Workflow (How Pros Start Every Project)

The portfolio site we just built was simple enough to start with a single prompt. But when you build something bigger (a SaaS app, a tool with a database, a Chrome extension), you need a different approach.

The best AI builders all do the same thing: they write a PRD (Product Requirements Document) before they write any code. Not a 50-page corporate document. A 1-3 page spec that tells the AI exactly what to build.

Here's the workflow in 4 steps:

### Step 1: Describe your idea in plain language

Open Claude Code or Cursor and just talk:

```
I have an idea for [your project]. Here's what I'm thinking:
[describe it in your own words, messy is fine].

Don't write code yet. Just tell me:
1. What do you think?
2. What questions would help make this more specific?
3. What similar tools already exist?
```

Go back and forth for a few rounds. Answer the AI's questions. Push back if it suggests things you don't want. Get clear on WHAT you're building.

### Step 2: Check if it's realistic

```
Based on what we discussed, is this realistic to build in [timeframe]
using AI coding tools? What should I cut? What's the minimum feature
set that makes this usable?
```

This is where you avoid the #1 beginner mistake: scoping a 6-month project into a 4-week timeline.

### Step 3: Generate the Product PRD

```
Write a Product PRD based on our conversation. Include: overview,
target user, core features with priorities, pages/screens, user
flows, and what's out of scope. Keep it under 3 pages. Don't add
features we didn't discuss.
```

Save this as `docs/PRD.md` in your project.

### Step 4: Generate the Technical PRD

This is the document the AI coding agent will actually build from:

```
Create a Technical PRD for the AI that will code this. Include:
tech stack with versions, folder structure, database schema with
actual SQL, API routes with request/response shapes, auth flow,
component hierarchy, environment variables, and implementation
order. Be extremely specific.
```

Save as `docs/TECHNICAL_PRD.md`. Then reference both PRDs in your CLAUDE.md or .cursor/rules/ and start building.

This whole process takes 30-60 minutes and saves you days of rework. In the Ship With AI mentorship, we go much deeper into this workflow with templates, real examples, and hands-on practice.

---

## Part 7: Where to Go From Here

You just built and shipped a real website. That's not nothing. Most people spend months "learning to code" before they ship anything. You did it in a weekend.

Here's what you can do next:

**Keep building.** The best way to get better at AI coding is to build more stuff. Try a blog. A small SaaS tool. A Chrome extension. Each project teaches you something new.

**Learn the basics.** AI coding is way more powerful when you understand fundamentals like HTML, CSS, JavaScript, and React. You don't need to be an expert, but knowing the basics lets you guide the AI much more precisely.

**Join the community.** Follow builders on X who are shipping with AI. Watch tutorials. Read blog posts. The space is moving fast and the community is incredibly generous with knowledge.

**Go deeper with the Ship With AI mentorship.** This guide gave you a taste of what's possible. The Ship With AI mentorship is where we go deep. Over several weeks, you'll:

- Build and ship a real product (not just a portfolio site)
- Learn advanced prompting techniques
- Master Claude Code, Cursor, and Codex
- Understand when to use which tool
- Learn MCP (Model Context Protocol) to connect AI to external services
- Get live support and code reviews from @darasoba
- Join a community of builders who are shipping real projects

If you found this guide valuable and want structured, hands-on mentorship to level up your AI coding skills, check out the Ship With AI program.

**Follow [@darasoba on X](https://x.com/darasoba) for more free tips and updates on the mentorship.**

---

## Resource Appendix: 30+ Curated Links to Level Up

Everything below is hand-picked. No filler. Each resource teaches you something specific and useful.

### Getting Started Guides

1. **[Claude Code Quickstart](https://code.claude.com/docs/en/quickstart)**
   The official getting started guide from Anthropic. Takes you from install to your first project in about 10 minutes.

2. **[Cursor Tutorial for Beginners from Cursor's Head of AI Education](https://creatoreconomy.so/p/cursor-tutorial-for-beginners-from-cursor-head-of-ai-education-lee-robinson)**
   Lee Robinson (Head of AI Education at Cursor) walks you through proper project setup with planning, test-driven development, and agent workflows.

3. **[OpenAI Codex CLI Quickstart](https://developers.openai.com/codex/quickstart/)**
   Official guide to installing and running Codex. Covers authentication, first commands, and basic workflows.

4. **[Claude Code Tutorial for Beginners (CodeWithMukesh)](https://codewithmukesh.com/blog/claude-code-for-beginners/)**
   A thorough written guide covering installation, CLAUDE.md setup, Plan Mode, and building your first feature.

5. **[Getting Started with Cursor AI (Niall McNulty)](https://medium.com/@niall.mcnulty/getting-started-with-cursor-ai-86c1add6d701)**
   A beginner-friendly walkthrough of Cursor's interface, shortcuts, and AI features.

### CLAUDE.md and Project Setup

6. **[The Complete Guide to CLAUDE.md (Builder.io)](https://www.builder.io/blog/claude-md-guide)**
   Everything you need to know about setting up CLAUDE.md files to give Claude persistent project context.

7. **[Writing a Good CLAUDE.md (HumanLayer)](https://www.humanlayer.dev/blog/writing-a-good-claude-md)**
   Practical tips for writing CLAUDE.md files that actually improve your results, with real examples.

8. **[Using CLAUDE.md Files (Official Anthropic Blog)](https://claude.com/blog/using-claude-md-files)**
   Anthropic's own guide to customizing Claude Code behavior with CLAUDE.md files.

9. **[Awesome CursorRules (GitHub)](https://github.com/PatrickJS/awesome-cursorrules)**
   A community collection of Cursor rule files for different frameworks and project types. Great starting point.

10. **[Cursor AI Complete Guide: Rules & Context Engineering (Medium)](https://medium.com/@hilalkara.dev/cursor-ai-complete-guide-2025-real-experiences-pro-tips-mcps-rules-context-engineering-6de1a776a8af)**
    Deep dive into Cursor rules, MCPs, context engineering, and tips from real project experience.

### Best Practices and Tips

11. **[Claude Code: Best Practices for Agentic Coding (Anthropic)](https://www.anthropic.com/engineering/claude-code-best-practices)**
    Anthropic's official best practices guide. Covers how their own engineering teams use Claude Code daily.

12. **[How I Use Claude Code + My Best Tips (Builder.io)](https://www.builder.io/blog/claude-code)**
    Practical day-to-day tips including prompt structure, context management, and workflow patterns.

13. **[45 Claude Code Tips (GitHub - ykdojo)](https://github.com/ykdojo/claude-code-tips)**
    A massive collection of tips from basics to advanced, including custom status lines and running Claude in containers.

14. **[How I Use Every Claude Code Feature (Shrivu Shankar)](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)**
    A walkthrough of every Claude Code feature with real usage examples and when to use each one.

15. **[Cursor AI: A Guide With 10 Practical Examples (DataCamp)](https://www.datacamp.com/tutorial/cursor-ai-code-editor)**
    Ten hands-on examples showing how to use Cursor for real development tasks.

16. **[Claude Code: A Guide With Practical Examples (DataCamp)](https://www.datacamp.com/tutorial/claude-code)**
    Similar practical approach but focused on Claude Code, with step-by-step examples.

### Video Tutorials

17. **[Claude Code Beginner's Tutorial: Build a Movie App in 15 Minutes (Peter Yang)](https://youtu.be/GepHGs_CZdk)**
    Excellent beginner video. Peter Yang shows the full workflow: CLAUDE.md setup, Plan Mode, building a watchlist feature.

18. **[Claude Code Tutorial: Build a YouTube Research Agent (Peter Yang)](https://creatoreconomy.so/p/claude-code-tutorial-build-a-youtube-research-agent-in-15-min)**
    Slightly more advanced. Shows how to build a research agent using Claude Code slash commands.

19. **[The Complete AI Coding Course: Cursor, Claude Code (Udemy)](https://www.classcentral.com/course/udemy-the-complete-ai-coding-course-2025-cursor-ai-v0-vercel-451590)**
    A full course covering coding basics plus how to use Cursor to build full-stack SaaS apps.

20. **[Cursor & Claude Code (Frontend Masters)](https://frontendmasters.com/courses/pro-ai/)**
    A professional-level course on using Cursor and Claude Code together for production development.

### Understanding Vibe Coding and AI Development

21. **[Andrej Karpathy's Original "Vibe Coding" Post](https://x.com/karpathy/status/1886192184808149383)**
    The post that started it all. Karpathy describes the concept of giving in to the vibes and letting AI write the code.

22. **[Not All AI-Assisted Programming is Vibe Coding (Simon Willison)](https://simonwillison.net/2025/Mar/19/vibe-coding/)**
    An important distinction between casual vibe coding and professional AI-assisted development. Worth reading.

23. **[Beyond Vibe Coding: A Guide to AI-Assisted Development (Addy Osmani)](https://beyond.addy.ie/)**
    A free online guide from Google's Addy Osmani on treating AI coding professionally with specs, rigor, and quality standards.

24. **[Vibe Coding Explained: Tools and Guides (Google Cloud)](https://cloud.google.com/discover/what-is-vibe-coding)**
    Google Cloud's overview of the vibe coding movement, tools involved, and how to approach it.

25. **[How I Use LLMs to Help Me Write Code (Simon Willison)](https://simonw.substack.com/p/how-i-use-llms-to-help-me-write-code)**
    Simon Willison (creator of Datasette) shares his practical approach to using LLMs for real development work.

### MCP (Model Context Protocol)

26. **[What is the Model Context Protocol? (Official Site)](https://modelcontextprotocol.io/)**
    The official MCP documentation. MCP lets AI tools connect to external services like databases, APIs, and more.

27. **[Introduction to Model Context Protocol (Anthropic Course)](https://anthropic.skilljar.com/introduction-to-model-context-protocol)**
    Anthropic's free course covering MCP's core concepts: tools, resources, and prompts.

28. **[MCP for Beginners (Microsoft GitHub)](https://github.com/microsoft/mcp-for-beginners)**
    Microsoft's open-source curriculum teaching MCP fundamentals with examples in multiple languages.

29. **[Model Context Protocol Tutorial: Build Your First MCP Server (Towards Data Science)](https://towardsdatascience.com/model-context-protocol-mcp-tutorial-build-your-first-mcp-server-in-6-steps/)**
    A step-by-step tutorial for building your first MCP server in six steps.

30. **[MCP Guide With Demo Project (DataCamp)](https://www.datacamp.com/tutorial/mcp-model-context-protocol)**
    Hands-on guide showing how to connect Claude with GitHub and Notion using MCP.

### Deployment

31. **[Vercel: Deploy Your Project](https://vercel.com/)**
    The easiest way to deploy Next.js projects. Free tier is generous for personal sites.

32. **[Netlify: Push Your Ideas to the Web](https://www.netlify.com/)**
    Great alternative to Vercel. Drag-and-drop deployment or connect to GitHub for auto-deploys.

33. **[How to Host Your Website for Free (GitHub Pages, Netlify, Vercel)](https://www.jobaajlearnings.com/blog/how-to-host-your-website-for-free-github-pages-netlify-vercel)**
    A comparison of three free hosting options with step-by-step instructions for each.

### Codex-Specific Resources

34. **[OpenAI Codex CLI Features](https://developers.openai.com/codex/cli/features/)**
    Official docs covering what Codex can do: file editing, command execution, screenshot analysis, and more.

35. **[OpenAI Codex CLI Tutorial (DataCamp)](https://www.datacamp.com/tutorial/open-ai-codex-cli-tutorial)**
    A practical walkthrough of using Codex CLI for real development tasks with examples.

36. **[Codex CLI GitHub Repository](https://github.com/openai/codex)**
    The open-source repo for Codex CLI. Good for understanding how it works and staying up to date.

### Community and Ongoing Learning

37. **[Claude Code Learning Path (Daniel Avila)](https://medium.com/@dan.avila7/claude-code-learning-path-a-practical-guide-to-getting-started-fcc601550476)**
    A structured learning path for going from beginner to proficient with Claude Code.

38. **[Cooking with Claude Code: The Complete Guide (Sid Bharath)](https://sidbharath.com/blog/claude-code-the-complete-guide/)**
    An in-depth guide covering advanced topics like multi-file editing, debugging, and workflow optimization.

39. **[10 Claude Code Productivity Workflows for 2026 (F22 Labs)](https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/)**
    Ten real productivity workflows for getting the most out of Claude Code in day-to-day development.

40. **[AI Tools for Software Engineers Without the Hype (Simon Willison on Pragmatic Engineer)](https://newsletter.pragmaticengineer.com/p/ai-tools-for-software-engineers-simon-willison)**
    A grounded, practical discussion about which AI tools actually work and which ones are just hype.

---

## One Last Thing

This guide is a free taste of what we cover in the **Ship With AI** mentorship. If building with AI felt exciting and you want to go way deeper (building real products, mastering advanced prompting, learning MCP, getting live code reviews, and joining a community of builders), the mentorship is where it all happens.

No pressure. Build something cool this weekend. And if you want more, you know where to find us.

**Follow [@darasoba on X](https://x.com/darasoba) for updates and to apply for the Ship With AI mentorship.**

Happy building.

---

*This guide is free to share. If it helped you, pass it along to someone who'd get value from it.*
