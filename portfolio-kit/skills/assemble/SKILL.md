---
name: assemble
description: Assemble the approved portfolio content into one clean, openable index.html, then show how to publish it free with no terminal. Use for "build my page", "assemble my portfolio", "put it together", "make the site", "I'm ready to see it", or after stories are written.
argument-hint: ""
allowed-tools: Read, Write, Edit, Glob
---

# Assemble

The finish line. Turn the approved content into a single, openable `index.html` the user can show or publish. Reuse the bundled template — do NOT design a new look. Differentiation lives in the content and voice, not the chrome.

## Before you start

Read `CLAUDE.md` (Owner, Role, Contact, Voice Profile). Gather the approved case studies produced by `story-adapter`. If `ANONYMIZATION-LEDGER.md` exists, read it — **nothing with status "Masked" may appear on the page.**

## Process

### 1. Draft hero + about (if not already written)

The lean kit has no separate copywriter, so draft these here, in the captured voice from the Voice Profile:
- **Hero** — a one-line positioning (lead with outcome, not title) plus a short expansion.
- **About** — a short bio from identity + career arc + what they're looking for.

Show both for a quick confirm before rendering. If the user already has hero/about copy, use theirs.

### 2. Load the bundled template

Read `template/index.html` and `template/styles.css` from this plugin. These are the page; you populate slots, you do not restyle.

### 3. Populate the slots

| Slot in template | Fill with |
|---|---|
| `<h1>Hi, I'm [Your Name]</h1>` | Owner name |
| `.positioning` paragraph | hero one-liner |
| `<title>` + `og:title` | "Owner — Role" |
| `<meta description>` + `og:description` | first ~160 chars of the hero |
| `#about` `<p>` | about text |
| `#work` | one `<div class="work-item"><h3>[title]</h3><p>[summary]</p></div>` per case study (replace the example item) |
| `#contact` links | email / LinkedIn / GitHub from CLAUDE.md Contact — drop any the user doesn't have |
| footer name | Owner |

Convert markdown to simple HTML (`<p>`, `<h3>`, `<strong>`). Keep it to plain, semantic tags — the bundled CSS already styles them.

### 4. Safety + completeness check (do not skip)

- **No placeholders remain.** Search the output for `[`, `Your Name`, `yourhandle`, `your@email`, `Project Title`, `[Your`. If any survive, fix before writing.
- **No setup-banner** (the bundled template has none — confirm).
- **Ledger is law.** Cross-check against `ANONYMIZATION-LEDGER.md`: nothing marked "Masked" appears anywhere on the page, even if it's sitting in your context.

### 5. Write the files

Write the finished `index.html` and copy `styles.css` into the user's working folder. Tell them to double-click `index.html` to see it.

### 6. Publish — the no-cliff path

Make going live trivial. No terminal, no GitHub account:
> "Your whole site is two files: `index.html` + `styles.css`. To put it online free in about two minutes, open **Netlify Drop** (app.netlify.com/drop) or **Cloudflare Pages**, and drag the folder in. You get a live URL on the spot."

Mention GitHub Pages only as a power-user option for people who already use git.

### 7. Hand off

> "That's your portfolio, live. Whenever you ship something new or change roles, run **refresh** — it updates the page and keeps it on-voice and PII-safe, then re-assembles."

## Rules

- Reuse the bundled template; never invent a new design here.
- The Voice Profile governs any hero/about you draft.
- The ledger is law: masked items never reach the page.
