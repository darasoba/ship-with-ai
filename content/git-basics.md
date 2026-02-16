---
title: "Git Basics"
slug: "git-basics"
---

# Git & GitHub for Beginners -- Ship With AI

You don't need to become a Git expert. You need to know enough to not lose your work, push code to GitHub, and collaborate without breaking things. This guide covers exactly that -- nothing more.

If you've never used Git before, start at the top and work through it. If you already know the basics, skip to the section you need.

---

## Table of Contents

1. [What Is Git and Why Should You Care](#1-what-is-git-and-why-should-you-care)
2. [What Is GitHub](#2-what-is-github)
3. [Installing Git](#3-installing-git)
4. [First-Time Setup](#4-first-time-setup)
5. [The Four Commands You'll Use Every Day](#5-the-four-commands-youll-use-every-day)
6. [Your First Repo -- Step by Step](#6-your-first-repo----step-by-step)
7. [Cloning a Repo](#7-cloning-a-repo)
8. [Branches -- Working Without Breaking Things](#8-branches----working-without-breaking-things)
9. [Pulling Changes and Staying in Sync](#9-pulling-changes-and-staying-in-sync)
10. [Undoing Mistakes](#10-undoing-mistakes)
11. [.gitignore -- Keeping Files Out of Git](#11-gitignore----keeping-files-out-of-git)
12. [GitHub Features You Should Know](#12-github-features-you-should-know)
13. [Git With AI Coding Tools](#13-git-with-ai-coding-tools)
14. [Git Worktrees -- Running Multiple AI Agents at Once](#14-git-worktrees----running-multiple-ai-agents-at-once)
15. [Common Mistakes and Fixes](#15-common-mistakes-and-fixes)
16. [Quick Reference Card](#16-quick-reference-card)

---

## 1. What Is Git and Why Should You Care

Git is version control for your code. Think of it like Google Docs version history, but for an entire project folder.

Every time you "commit" (save a snapshot), Git remembers exactly what every file looked like at that moment. You can always go back. You can try risky changes without fear. If everything breaks, you roll back to the last working version.

**Why this matters for you:**

- **You won't lose work.** Ever made a change that broke everything, and you couldn't remember what it looked like before? Git solves that.
- **AI tools generate a lot of code fast.** Claude Code, Cursor, and Codex can change dozens of files in one shot. If the AI makes a mess, you need a way to undo it. Git is that way.
- **Deployment requires it.** Vercel, Netlify, Railway, Cloudflare -- they all pull your code from GitHub. No GitHub repo, no deployment.
- **It's on every job listing.** If you're a designer or PM learning to code, knowing Git basics puts you ahead of 90% of people in your position.

---

## 2. What Is GitHub

Git is the tool that runs on your computer. GitHub is the website where your code lives online.

Think of it this way:
- **Git** = the save system on your computer
- **GitHub** = the cloud backup where other people (and deployment platforms) can access your code

You can use Git without GitHub (just local saves), but you can't use GitHub without Git.

**Other options:** GitLab and Bitbucket do the same thing as GitHub. We use GitHub because it's what most tools integrate with and what most employers expect.

---

## 3. Installing Git

### Mac

Git comes pre-installed on most Macs. Open Terminal and type:

```bash
git --version
```

If you see a version number (like `git version 2.39.0`), you're good. If not, install it:

```bash
# Option 1: Install Xcode Command Line Tools (includes Git)
xcode-select --install

# Option 2: Install via Homebrew (if you have Homebrew)
brew install git
```

### Windows

Download Git from [git-scm.com](https://git-scm.com/download/win). Run the installer and accept the defaults. This installs Git and Git Bash (a terminal you can use for Git commands).

### Linux

```bash
# Ubuntu/Debian
sudo apt install git

# Fedora
sudo dnf install git
```

### Verify It Worked

```bash
git --version
```

You should see something like `git version 2.43.0`. The exact number doesn't matter.

---

## 4. First-Time Setup

You only do this once, ever. Git needs to know your name and email so it can label your commits.

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use the same email you'll use for GitHub. This isn't creating an account -- it's just setting a label for your commits.

### Create a GitHub Account

Go to [github.com](https://github.com) and sign up. Free tier is all you need.

### Connect Git to GitHub (SSH Key)

This lets your computer talk to GitHub without typing your password every time.

```bash
# Generate an SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"
# Press Enter for the default file location
# Press Enter twice for no passphrase (or set one if you want)

# Copy the public key to your clipboard
# Mac:
cat ~/.ssh/id_ed25519.pub | pbcopy
# Windows (Git Bash):
cat ~/.ssh/id_ed25519.pub | clip
# Linux:
cat ~/.ssh/id_ed25519.pub
# (then manually copy the output)
```

Now add it to GitHub:

1. Go to github.com > click your avatar > **Settings**
2. Click **SSH and GPG keys** in the left sidebar
3. Click **New SSH key**
4. Title: anything (e.g., "My Laptop")
5. Paste the key you copied
6. Click **Add SSH key**

Test it:

```bash
ssh -T git@github.com
```

You should see: "Hi username! You've successfully authenticated."

If SSH feels like too much right now, skip it. GitHub also works with HTTPS (you'll just need to enter a personal access token instead of a password when pushing). You can set up SSH later.

---

## 5. The Four Commands You'll Use Every Day

Seriously -- these four commands cover 90% of what you'll do with Git:

```bash
git add .          # Stage all your changes (prepare them to be saved)
git commit -m "what you did"   # Save a snapshot with a message
git push           # Upload your commits to GitHub
git pull           # Download the latest changes from GitHub
```

That's it. The rest of this guide explains what these do and how to use them in context.

### What "Stage" Means

Git has a two-step save process:

1. **Stage** (`git add`) -- You pick which changes to include in the next snapshot. Think of it as putting items in a box.
2. **Commit** (`git commit`) -- You seal the box and label it. The snapshot is saved.

Why two steps? Because sometimes you changed 10 files but only want to save 3 of them right now. Staging lets you be selective.

In practice, most of the time you'll just do `git add .` (stage everything) followed by `git commit`. Don't overthink it.

---

## 6. Your First Repo -- Step by Step

A "repo" (repository) is just a project folder that Git is tracking.

### Option A: Start a New Project Locally

```bash
# Create a project folder
mkdir my-project
cd my-project

# Initialize Git (tells Git to start tracking this folder)
git init

# Create a file
echo "# My Project" > README.md

# Stage the file
git add README.md

# Commit (save the snapshot)
git commit -m "Initial commit"
```

Now connect it to GitHub:

1. Go to github.com and click the **+** button > **New repository**
2. Name it `my-project`
3. Do NOT check "Add a README" (you already have one)
4. Click **Create repository**
5. GitHub shows you commands to connect your local repo. Run the ones under "push an existing repository":

```bash
git remote add origin git@github.com:YOUR-USERNAME/my-project.git
git branch -M main
git push -u origin main
```

Refresh the GitHub page. Your files are there.

### Option B: Create on GitHub First (Easier for Beginners)

1. Go to github.com > **+** > **New repository**
2. Name it, check "Add a README file"
3. Click **Create repository**
4. Click the green **Code** button > copy the SSH URL
5. In your terminal:

```bash
git clone git@github.com:YOUR-USERNAME/my-project.git
cd my-project
```

Now you have a local copy connected to GitHub. Start building.

---

## 7. Cloning a Repo

"Cloning" means downloading someone else's repo (or your own from another computer) to your machine.

```bash
git clone git@github.com:username/repo-name.git
```

This creates a folder called `repo-name` with all the code and Git history inside. You're ready to work.

If you're cloning a project that has a `package.json` (most web projects), install dependencies right after cloning:

```bash
cd repo-name
npm install
```

---

## 8. Branches -- Working Without Breaking Things

A branch is a parallel copy of your code where you can make changes without affecting the main version.

**Why branches matter:** Say your app is working perfectly. You want to add a new feature. If you code it directly on `main` and it breaks everything, your working app is now broken. With a branch, you build the feature separately. When it works, you merge it into `main`. If it doesn't work, you delete the branch. `main` never broke.

### Create a Branch

```bash
# Create a new branch and switch to it
git checkout -b my-new-feature
```

You're now on a branch called `my-new-feature`. Any commits you make here don't affect `main`.

### Switch Between Branches

```bash
# Go back to main
git checkout main

# Go to your feature branch
git checkout my-new-feature
```

### See All Your Branches

```bash
git branch
# The one with the * is where you are
```

### Merge a Branch Into Main

When your feature works and you want to add it to the main codebase:

```bash
# Switch to main first
git checkout main

# Merge your feature branch into main
git merge my-new-feature
```

### Delete a Branch You're Done With

```bash
git branch -d my-new-feature
```

### When to Use Branches

For this cohort, you can honestly build everything on `main` and be fine. But branches are useful when:

- You want to try something risky and might need to throw it away
- The AI is about to make a big change and you want a safety net
- You're working on two features at the same time

If branches feel confusing right now, skip them. Come back when you need them.

---

## 9. Pulling Changes and Staying in Sync

If you work from multiple computers, or if you edit files directly on GitHub, you need to pull the latest changes before you start working:

```bash
git pull
```

This downloads any new commits from GitHub and merges them into your local copy.

**Rule of thumb:** Always `git pull` before you start working for the day.

### What If Pull Fails (Merge Conflicts)

A merge conflict happens when you changed a file locally AND the same file was changed on GitHub, and Git can't figure out which version to keep.

Git will mark the conflict in your file like this:

```
<<<<<<< HEAD
Your local version of this line
=======
The version from GitHub
>>>>>>> origin/main
```

To fix it:

1. Open the file
2. Decide which version you want (or combine them)
3. Delete the `<<<<<<<`, `=======`, and `>>>>>>>` markers
4. Save the file
5. Stage and commit:

```bash
git add .
git commit -m "Resolve merge conflict"
```

For beginners, the easiest way to avoid merge conflicts is to work from one computer and always push your changes when you're done.

---

## 10. Undoing Mistakes

Everyone makes mistakes with Git. Here's how to fix the common ones.

### "I want to undo changes I haven't committed yet"

```bash
# Undo changes to a specific file (back to last commit)
git checkout -- filename.txt

# Undo ALL uncommitted changes (nuclear option)
git checkout .
```

Warning: This permanently deletes uncommitted changes. Make sure you actually want to throw them away.

### "I committed something I didn't mean to"

```bash
# Undo the last commit but keep the changes in your files
git reset --soft HEAD~1
```

Your files stay the same -- the commit is just removed. You can fix things and commit again.

### "I committed a secret (API key, password)"

This is serious. Even if you delete the file and commit again, the secret is still in Git history.

1. **Rotate the secret immediately.** Go to the service (Supabase, Stripe, etc.) and generate a new key. The old one is compromised.
2. Remove the file from Git tracking:

```bash
git rm --cached .env.local
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "Remove env file from tracking"
```

3. If you already pushed to GitHub, the secret is in your public history. Rotating the key is the only real fix.

### "I want to see what I changed"

```bash
# See uncommitted changes
git diff

# See what's staged (ready to commit)
git diff --staged

# See the last few commits
git log --oneline -5
```

---

## 11. .gitignore -- Keeping Files Out of Git

The `.gitignore` file tells Git which files and folders to skip. Put it in your project root.

### The Standard .gitignore for Next.js Projects

```gitignore
# Dependencies
node_modules/

# Environment variables (NEVER commit these)
.env
.env.local
.env.production
.env*.local

# Build output
.next/
out/
dist/
build/

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Debug logs
npm-debug.log*
yarn-error.log*

# Vercel
.vercel
```

### Common Mistakes

**Forgetting to add `.gitignore` before the first commit.** If you commit `node_modules/` or `.env.local` once, Git remembers them forever -- even after you add `.gitignore`. To fix this:

```bash
# Remove node_modules from Git's tracking (keeps the folder on your machine)
git rm -r --cached node_modules
git commit -m "Remove node_modules from tracking"
```

**Not including `.env.local`.** This is the most important line in your `.gitignore`. Your API keys, database passwords, and secrets live in this file. If it gets pushed to GitHub, bots will find your keys within minutes.

---

## 12. GitHub Features You Should Know

### README.md

The file that shows up on your repo's front page. Write it in Markdown. At minimum, include:

- What the project is
- How to run it locally
- What tech you used
- A screenshot

The curriculum (Day 23) walks through writing a great README.

### Issues

Use GitHub Issues to track bugs and feature ideas. Click the "Issues" tab on your repo to create one. This is useful for keeping a to-do list that's tied to your code.

### Pull Requests (PRs)

A PR is how you propose merging one branch into another. When you push a branch to GitHub, it shows a prompt to create a PR. PRs are mostly useful for team projects -- if you're working solo, you can just merge locally.

### GitHub Pages (Free Hosting for Static Sites)

If your project is a static site (HTML/CSS/JS, no server), you can host it for free:

1. Go to your repo > **Settings** > **Pages**
2. Source: Deploy from a branch
3. Branch: `main`, folder: `/ (root)` or `/docs`
4. Click Save
5. Your site is live at `https://your-username.github.io/repo-name`

This only works for static sites -- no Next.js server rendering, no API routes, no database. For those, use Vercel or the other platforms in SETUP_AND_DEPLOY.md.

---

## 13. Git With AI Coding Tools

AI coding tools generate and change a lot of files fast. Here's how to use Git as a safety net.

### Before Asking the AI to Make Big Changes

```bash
# Save your current state
git add .
git commit -m "Working state before AI changes"
```

Now if the AI breaks everything, you can roll back:

```bash
git checkout .
```

### Claude Code

Claude Code has built-in Git support. It can commit, create branches, and push for you. But it will always ask before doing anything destructive.

Useful commands to give Claude Code:

- "Commit my current changes with a descriptive message"
- "Create a new branch called feature-dashboard and switch to it"
- "Show me what files changed since the last commit"
- "Undo the last commit"

### Cursor

Cursor doesn't manage Git directly, but it has a Source Control panel (the branch icon in the left sidebar). You can stage, commit, and push from there without touching the terminal.

You can also open Cursor's built-in terminal (`Ctrl + backtick` or `Cmd + backtick`) and run Git commands normally.

### Codex

Codex (CLI) works similarly to Claude Code. You can ask it to handle Git operations:

- "Commit everything with the message 'Add task creation form'"
- "Push to GitHub"

### The Commit-Often Rule

When working with AI tools, commit more often than you think you need to. A good rhythm:

1. AI generates something that works -- **commit**
2. You're about to ask the AI for a big change -- **commit first**
3. End of a work session -- **commit and push**
4. Something breaks and you can't figure out why -- **look at the last commit that worked**

Small, frequent commits are way better than one giant commit at the end of the day. If something goes wrong, you only lose a few minutes of work instead of a few hours.

---

## 14. Git Worktrees -- Running Multiple AI Agents at Once

This is one of the most powerful Git features for AI-assisted development, and almost nobody talks about it.

### The Problem

You're building a dashboard feature. You ask Claude Code to build the task list component. While it's working, you realize you also need to fix the login page. But you can't -- the AI is in the middle of changing files. You either wait for it to finish, or you interrupt it and lose progress.

Branches alone don't solve this. Even with branches, you can only have one branch checked out at a time in a single folder. Switching branches while the AI is mid-edit is a recipe for conflicts.

### What Worktrees Do

A worktree is a second (or third, or fourth) copy of your repo that shares the same Git history but lives in a separate folder. Each worktree can have a different branch checked out at the same time.

Think of it like this: instead of one folder with your project, you have multiple folders -- each on a different branch, all connected to the same repo. Changes you commit in one worktree show up in the others once you merge.

### Why This Matters for AI Coding

With worktrees, you can:

- **Run two AI agents in parallel.** Claude Code builds a feature in one worktree while Cursor fixes bugs in another.
- **Keep a stable version running.** Your `main` branch stays untouched in the original folder while the AI experiments in a worktree. If it makes a mess, your working app is still there.
- **Review AI output without switching branches.** The AI finishes in the worktree, you open that folder, check the code, and merge if it looks good.
- **Work on your app while the AI works on a feature.** You're manually tweaking CSS in the main folder while Claude Code builds an entire new page in a worktree.

### Setting Up Worktrees

```bash
# You're in your project folder (on the main branch)
cd my-project

# Create a worktree for a new feature branch
git worktree add ../my-project-feature feature-branch
```

This creates a new folder called `my-project-feature` next door to your project. It's on the `feature-branch` branch. Your original folder stays on `main`.

If the branch doesn't exist yet, create it in one step:

```bash
git worktree add -b new-feature ../my-project-new-feature
```

### The Folder Structure

After creating a worktree, your file system looks like this:

```
Projects/
├── my-project/                  # Original repo, on main
│   ├── src/
│   ├── package.json
│   └── ...
└── my-project-new-feature/      # Worktree, on new-feature branch
    ├── src/
    ├── package.json
    └── ...
```

Both folders are fully functional. You can run `npm run dev` in both simultaneously (just use different ports).

### Practical AI Workflow

Here's a real workflow using worktrees with AI tools:

**Step 1: Commit your current work on main**

```bash
cd my-project
git add .
git commit -m "Stable state before AI work"
```

**Step 2: Create a worktree for the AI task**

```bash
git worktree add -b ai-dashboard ../my-project-dashboard
```

**Step 3: Install dependencies in the worktree**

```bash
cd ../my-project-dashboard
npm install
```

**Step 4: Point your AI tool at the worktree folder**

```bash
# Open Claude Code in the worktree
cd ../my-project-dashboard
claude

# Or open the worktree folder in Cursor
# File > Open Folder > my-project-dashboard
```

**Step 5: Let the AI work while you do your thing**

The AI builds in `my-project-dashboard`. You keep working (or just watch) in `my-project`. No conflicts.

**Step 6: Review and merge when the AI is done**

```bash
# Go back to your main project
cd ../my-project

# Merge the AI's work
git merge ai-dashboard

# Clean up the worktree
git worktree remove ../my-project-dashboard
```

### Managing Worktrees

```bash
# List all worktrees
git worktree list

# Remove a worktree (when you're done with it)
git worktree remove ../my-project-feature

# Force remove (if the branch has unmerged changes)
git worktree remove --force ../my-project-feature
```

### Important Notes

- **Each worktree must be on a different branch.** You can't have two worktrees on `main`.
- **Install dependencies separately.** Each worktree has its own `node_modules`. Run `npm install` in each one.
- **Different ports for dev servers.** If you run `npm run dev` in two worktrees, the second one will fail because port 3000 is taken. Use a different port:

```bash
# In the worktree
PORT=3001 npm run dev
# or
npx next dev -p 3001
```

- **Don't create worktrees inside your project folder.** Put them next to it (use `../` prefix). If you put a worktree inside your repo, Git gets confused.
- **Worktrees share Git history.** When you commit in a worktree, it's the same repo. You can see those commits from your main folder with `git log --all`.

### When to Use Worktrees vs. Just Branches

| Situation | Use |
|---|---|
| One task at a time | Regular branches are fine |
| AI working on a feature while you do something else | Worktree |
| Two AI agents working on different features simultaneously | Two worktrees |
| Quick bugfix while a big feature is in progress | Worktree for the bugfix |
| You want to compare two different approaches side by side | Two worktrees |

For most students, you won't need worktrees in Week 1. But by Week 2-3, when you're juggling multiple features and asking the AI to do bigger tasks, worktrees become a game changer.

---

## 15. Common Mistakes and Fixes

### "fatal: not a git repository"

You're not inside a Git-tracked folder. Either `cd` into your project folder, or run `git init` to start tracking it.

```bash
cd my-project
git status  # should work now
```

### "error: failed to push some refs to..."

Someone else pushed changes (or you edited on GitHub) and your local copy is behind. Pull first, then push:

```bash
git pull
git push
```

If `git pull` gives you a merge conflict, see Section 9.

### "Your branch is ahead of 'origin/main' by X commits"

You have local commits that haven't been pushed to GitHub yet. Just push:

```bash
git push
```

### "Changes not staged for commit"

You changed files but didn't `git add` them yet. Git sees the changes but won't include them in a commit until you stage them:

```bash
git add .
git commit -m "Your message"
```

### "node_modules is huge and Git is slow"

You accidentally started tracking `node_modules`. Fix it:

```bash
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules
git commit -m "Stop tracking node_modules"
```

### "I pushed to the wrong branch"

If you pushed to `main` but meant to push to a feature branch:

```bash
# Create the branch from where you are now
git checkout -b correct-branch

# Go back to main and reset it to before your commits
git checkout main
git reset --hard HEAD~1   # undo the last 1 commit on main

# Push the correct branch
git push -u origin correct-branch
```

Be careful with `git reset --hard` -- it permanently deletes commits from that branch.

### "I have no idea what state my repo is in"

When confused, start with:

```bash
git status
```

This tells you:
- Which branch you're on
- What files changed
- What's staged
- Whether you're ahead/behind GitHub

It's the "what's going on?" command. Use it constantly.

---

## 16. Quick Reference Card

### Daily Workflow

```bash
git pull                          # Get latest changes
# ... do your work ...
git add .                         # Stage everything
git commit -m "What you did"      # Save snapshot
git push                          # Upload to GitHub
```

### Starting a New Project

```bash
mkdir my-project && cd my-project
git init
# ... create files ...
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin git@github.com:USER/REPO.git
git branch -M main
git push -u origin main
```

### Branching

```bash
git checkout -b feature-name      # Create and switch to branch
git checkout main                 # Switch back to main
git merge feature-name            # Merge branch into main
git branch -d feature-name        # Delete branch
```

### Checking Status

```bash
git status                        # What's changed?
git log --oneline -5              # Last 5 commits
git diff                          # See uncommitted changes
```

### Undoing Things

```bash
git checkout -- file.txt          # Undo changes to one file
git checkout .                    # Undo ALL uncommitted changes
git reset --soft HEAD~1           # Undo last commit, keep changes
```

### Emergency

```bash
# Everything is broken and you want to go back to the last commit
git checkout .

# Go back to a specific commit (find it with git log first)
git checkout abc1234

# Get back to the latest
git checkout main
```

---

## Remember

Git feels confusing at first. That's normal. You don't need to understand how it works internally. You need four commands (`add`, `commit`, `push`, `pull`), the habit of committing often, and the knowledge that you can always undo things.

The best way to learn Git is to use it every day during this cohort. By Week 2, it'll feel automatic.
