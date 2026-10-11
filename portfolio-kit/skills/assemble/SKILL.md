---
name: assemble
description: Build the approved portfolio content into a one-page site (index.html and styles.css in site/), then show how to publish it free with no terminal. Use for "build my page", "rebuild my page", "assemble my portfolio", or once portfolio case studies are approved. Not for other websites, web apps, or code projects.
argument-hint: ""
allowed-tools: Read, Write, Edit, Glob
---

# Assemble

The finish line. Turn the approved content into a single, openable `index.html` the user can show or publish. Reuse the bundled template — do NOT design a new look. Differentiation lives in the content and voice, not the chrome.

## Before you start

Read `CLAUDE.md` (Owner, Role, Looking for, Contact, Privacy, Voice Profile, and `## Hero` / `## About` if saved) and any `source/` files it lists. If there's no `CLAUDE.md` profile yet, run `setup` first. Read every case study in `case-studies/` — if there are none, say so and run the `story-adapter` flow first. If `ANONYMIZATION-LEDGER.md` exists, read it — **nothing from a row whose Status isn't `Revealed` may appear on the page**, and never re-mask anything with a `Revealed` row.

## Process

### 1. Hero + about

Use `## Hero` and `## About` from `CLAUDE.md` if saved. Otherwise draft them here (the lean kit has no separate copywriter), in the captured voice from the Voice Profile:
- **Hero** — a one-line positioning (lead with outcome, not title) plus a short expansion.
- **About** — a short bio from identity + career arc (from the saved résumé, if any) + what they're looking for (only if **Looking for** is set — don't guess).

Screen both with story-adapter's sensitivity defaults (generalize clients; no colleague names, codenames, or company-tied absolute metrics) and **Never name**; keep anything under **OK to name**. Log anything you mask to `ANONYMIZATION-LEDGER.md` (Where: `CLAUDE.md ## Hero` / `## About`, Status `Masked`) — if it doesn't exist, create it with the title `# Anonymization Ledger — PRIVATE, never publish` and columns `| # | Original | In portfolio as | Where | Reason | Reveal when | Status |`. Show the hero, the about, and the work list (each case study's Title + Summary — say the full stories stay in `case-studies/`) for a quick confirm before rendering. Save the confirmed hero and about to `CLAUDE.md` as `## Hero` and `## About` so a rebuild keeps the same words.

### 2. Load the bundled template

Read `index.html` and `styles.css` at this plugin's root (three folders up from this skill's `portfolio-kit/skills/assemble/` folder). These are the page; you populate slots, you do not restyle.

### 3. Populate the slots

| Slot in template | Fill with |
|---|---|
| `<h1>Hi, I'm [Your Name]</h1>` | Owner name |
| `.positioning` paragraph | hero one-liner, then the expansion as a `<p>` right after it |
| `<title>` + `og:title` | "Owner — Role" |
| `<meta description>` + `og:description` | first ~160 chars of the hero |
| `#about` `<p>` | about text |
| `#work` | one `<div class="work-item"><h3>[title]</h3><p>[summary]</p></div>` per case study, using its Title and Summary (replace the example item) |
| `#contact` links | email / LinkedIn / Site/GitHub from CLAUDE.md Contact — label the third link "GitHub" for github.com URLs, else "Website"; drop any that say none |
| footer name | Owner |

Convert markdown to simple HTML (`<p>`, `<h3>`, `<strong>`). Keep it to plain, semantic tags — the bundled CSS already styles them.

### 4. Safety + completeness check (do not skip)

- **No placeholders remain.** Search the output for `[`, `Your Name`, `Your positioning`, `yourhandle`, `yourprofile`, `your@email`, `Project Title`, `Brief description`, `Add your`. If any survive, fix before writing.
- **No setup-banner.** Delete the template's whole `<div id="setup-banner">…</div>` (a first-run hint for repo cloners, not portfolio content) — confirm `setup-banner` appears nowhere in the output.
- **Ledger is law.** Cross-check against `ANONYMIZATION-LEDGER.md`: nothing from a row whose Status isn't `Revealed` appears anywhere on the page, even if it's sitting in your context.
- **Privacy holds.** Nothing under `CLAUDE.md` → Privacy → **Never name** appears anywhere on the page.

### 5. Write the files

Write the finished `index.html` and copy `styles.css` into a `site/` folder in the working folder — nothing else ever goes in it. Tell them to double-click `site/index.html` to see it.

### 6. Publish — the no-cliff path

Make going live trivial. No terminal, no GitHub:
> "Your whole site is the `site/` folder: `index.html` + `styles.css`. To put it online free in about two minutes, open **Netlify Drop** (app.netlify.com/drop) or **Cloudflare Pages**, and drag the **site** folder in. Never drag your main folder — it holds your private ledger and notes. Make a free account (or claim the site when Netlify asks) so it stays up and you can update it later."

Mention GitHub Pages only as a power-user option for people who already use git.

### 7. Hand off

> "Once it's up, that's your portfolio, live — paste the URL and I'll note it. Whenever you ship something new or change roles, run **refresh** — it updates the page, keeps it on-voice, flags likely-confidential details, and tells you when to re-upload `site/`."

If they share the URL, save it in `CLAUDE.md` as `**Live site:** [url] ([host])`.

## Rules

- Reuse the bundled template; never invent a new design here.
- The Voice Profile governs any hero/about you draft.
- The ledger is law: masked items never reach the page.
