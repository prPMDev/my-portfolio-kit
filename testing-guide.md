# My Portfolio Kit — Testing Guide

Non-technical testing script for someone setting up the kit from scratch.

---

## Prerequisites

Before you start, you need:
- A computer (Mac, Windows, or Linux)
- A GitHub account (free at github.com)
- Claude Code access (requires Anthropic Pro plan, $20/month)

---

## Step 1: Get the Kit Files

**What to do:**
Go to https://github.com/prpmdev/my-portfolio-kit and pick one option:

| Option | How | Best for |
|--------|-----|----------|
| **Fork** | Click "Fork" button on GitHub | Want your own copy on GitHub right away |
| **Use Template** | Click "Use this template" | Starting fresh with a clean history |
| **Download ZIP** | Code → Download ZIP | Just want the files, no git yet |
| **Clone** | `git clone https://github.com/prpmdev/my-portfolio-kit.git my-portfolio` | Comfortable with terminal |

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| "Fork" button greyed out | Make sure you're signed into GitHub |
| ZIP won't extract | Try a different unzip tool (7-Zip on Windows) |
| `git clone` fails | Check internet connection; make sure git is installed (`git --version`) |
| Folder name confusing | Rename to whatever you want — `my-portfolio`, your name, etc. |

---

## Step 2: Open in Claude Code

**What to do:**
Open your terminal, navigate to the folder, and start Claude:

```bash
cd my-portfolio
claude
```

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| `claude: command not found` | Install Claude Code: `npm install -g @anthropic-ai/claude-code` |
| `npm: command not found` | Install Node.js first from https://nodejs.org |
| "Not authorized" or API error | Make sure you have Anthropic Pro ($20/month). Free plan doesn't include Claude Code |
| Wrong folder | Run `ls` — you should see `CLAUDE.md.template`, `index.html`, `skills.json` |

---

## Step 3: Run the Setup Wizard

**What to do:**
Inside Claude Code, type:

```
/setup
```

This walks you through setting up your portfolio — name, contact info, positioning.

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| `/setup` not recognized | Make sure you're inside the kit folder (should have `.claude/skills/` directory) |
| Wizard asks something you're unsure about | It's OK to skip or give a rough answer — you can re-run `/setup` anytime |
| CLAUDE.md wasn't created | Check that `CLAUDE.md.template` exists in the root folder |

---

## Step 4: Add Your First Content

**What to do:**
Tell Claude what you want to add:

```
/content-strategist
```

Then describe a work experience, project, or achievement. The strategist will route it to the right skill.

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| Not sure what to write | Start with your most recent project — what you built and why it mattered |
| Too much detail asked | Give rough bullet points; the skills will help you shape it |
| Anonymization questions | The kit will ask what to protect — company names, metrics, etc. Say yes to anything you're unsure about |

---

## Step 5: Review Your Content

**What to do:**
After content is drafted, run the voice check:

```
/voice-guardian
```

This catches corporate jargon and makes sure it sounds like you, not a press release.

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| Too many suggestions | Focus on the "must fix" items first, skip "nice to have" |
| Disagrees with your tone | You're the boss — override anything that doesn't sound like you |
| Wants to change facts | Voice guardian only fixes tone, not content. If it's changing meaning, reject it |

---

## Step 6: Preview Your Site Locally

**What to do:**
Open a new terminal (keep Claude running) and start a local server:

```bash
npx serve .
```

Then open http://localhost:3000 in your browser.

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| `npx` not found | Install Node.js from https://nodejs.org |
| Port already in use | Try `npx serve . -l 8080` and open http://localhost:8080 |
| Page is blank | Check browser console (F12) for errors. Make sure `index.html` is in root |
| Styles look wrong | Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac) |
| Images missing | Images go in the `images/` folder. Check file paths in your HTML |

---

## Step 7: Make Design Changes

**What to do:**
Ask the website expert for help:

```
/website-expert
```

Describe what you want changed — colors, layout, fonts, sections.

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| Change doesn't show | Hard refresh your browser (Ctrl+Shift+R) |
| Broke the layout | Tell Claude what happened — it can undo. Or use `git checkout index.html` to reset |
| Want something specific | Share a screenshot or URL of a design you like |

---

## Step 8: Run Quality Check

**What to do:**
Before publishing, run the final gate:

```
/quality-check
```

This checks anonymization, voice, technical issues, and accessibility.

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| Fails on anonymization | Review flagged items — decide what to anonymize or confirm it's OK to share |
| Fails on accessibility | Usually quick fixes — alt text on images, heading order, contrast |
| Too many warnings | Focus on errors first, warnings second. Some warnings are informational |

---

## Step 9: Publish to GitHub Pages

**What to do:**

1. Create a new repo on GitHub (github.com → New repository)
2. Push your code:

```bash
git init
git add .
git commit -m "My portfolio"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

3. Enable GitHub Pages: Repo → Settings → Pages → Source: main → Save

Your site will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| `git` not installed | Download from https://git-scm.com |
| Push rejected | Make sure the GitHub repo is empty (no README, no .gitignore) |
| Pages not showing | Wait 2-3 minutes. Check Settings → Pages for the URL |
| 404 after deploy | Make sure `index.html` is in the root of your repo, not in a subfolder |
| HTTPS not working | GitHub Pages enables HTTPS automatically — give it 10 minutes |

---

## Step 10: Keep It Updated

**What to do:**
When you want to add new content or check for skill updates:

```
/update
```

This checks if new skills or improvements are available from the upstream kit.

For new content, start back at Step 4 (`/content-strategist`).

**Potential challenges:**

| Problem | Fix |
|---------|-----|
| `/update` shows no changes | You're already up to date |
| Merge conflicts | Tell Claude — it can help resolve them |
| Want to add a new section | Start with `/content-strategist` — it decides where things go |

---

## What You'll Learn Along the Way

By the time you finish setting up and using the kit, you'll have picked up real skills — even if you came in with zero technical background.

### 1. Working With AI as a Collaborator
- You learn to **give AI structured instructions** (skills), not just open-ended prompts
- You see how AI works best with **constraints and guardrails** — not "do anything"
- You experience the difference between builder skills (create) and evaluator skills (review)
- **Takeaway:** AI isn't magic — it's a tool that works better when you define the job clearly

### 2. Git & Version Control Basics
- Cloning a repo, making commits, pushing changes
- Understanding branches (main vs gh-pages)
- What a `.gitignore` does and why it matters
- **Takeaway:** You can now contribute to any open source project or manage your own code

### 3. Command Line Comfort
- Navigating folders with `cd`, running commands
- Reading output, spotting errors, trying again
- **Takeaway:** The terminal stops being scary — it's just text-based clicking

### 4. How Websites Actually Work
- HTML = structure, CSS = styling, JS = behavior
- What "static site" means (no server, no database)
- How GitHub Pages turns a repo into a live website
- **Takeaway:** You understand what's under the hood of every website you visit

### 5. Data Separate From Design
- Content lives in JSON files (`work.json`, `books.json`)
- Templates pull from data — change the data, the site updates
- **Takeaway:** This is how every modern app works (databases + templates)

### 6. Content Strategy Thinking
- The kit forces you to think about **what to show, what to skip**
- Anonymization teaches you to convey impact without revealing specifics
- Builder voice teaches you to say "I shipped X" not "I managed stakeholders"
- **Takeaway:** You learn to write for an audience, not for yourself

### 7. Professional Brand as a System
- Portfolio as a hub that links to LinkedIn, GitHub, writing
- Each piece has a job — the portfolio isn't a resume dump
- **Takeaway:** You think about your professional presence as connected pieces, not one document

### 8. Shipping & Iterating
- B+ ships — you publish something real, then improve it
- `/quality-check` before publish, `/update` to pull improvements later
- **Takeaway:** You adopt a builder mindset — done is better than perfect, and v2 is always an option
