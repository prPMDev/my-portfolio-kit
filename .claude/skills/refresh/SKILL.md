---
name: refresh
description: Keep an existing portfolio current. Add newly shipped work, update a changed role or fact, and re-check that everything stays on-voice and PII-safe. Use for "I shipped something new", "update my portfolio", "I changed jobs", "keep it current", or "refresh".
argument-hint: "[what's new or what changed]"
allowed-tools: Read, Write, Edit, Grep
---

# Refresh

The reason this kit exists. Portfolios are cheap to build and expensive to keep true — people build one, host it, and let it rot. This skill keeps it alive: every time the user ships something, changes roles, or a fact moves, it folds the change in correctly, on-voice, and PII-safe.

Use it as a recurring habit, not a one-time task.

## Before you start

Read `CLAUDE.md` for **Voice Profile**, **Contact**, **Source Material**, and **Privacy**. Read the current portfolio content — the page (`site/index.html`) and the case studies (`case-studies/`) — so you know what already exists before changing anything. Also read `ANONYMIZATION-LEDGER.md` (if present) so you know exactly what was masked, where, and the original values — never rely on memory for this.

## Process

### 1. Find out what changed

Ask what's new. Common cases:
- **Shipped something** — a new project, launch, talk, article, release
- **Role/fact changed** — new title, new company, updated numbers
- **Something became public** — a client or project that was previously hidden is now in a press release, case study, or announcement
- **Something should come down** — outdated, no longer representative

### 2. Locate where it lands

Read the existing portfolio and find the affected section. Don't append blindly — decide whether this is a new entry, an edit to an existing one, or a replacement.

### 3. Apply the right move

- **New work** → run it through the `story-adapter` flow (STAR + built-in sensitivity scan, saved to `case-studies/`), then add it to the page.
- **Changed fact** → find every place it appears (`CLAUDE.md`, `case-studies/`, `site/index.html` including its title and meta tags) and update consistently. Grep for the old value so nothing stale is left behind.
- **Became public** → the one people forget: *loosen* the anonymization. Look the item up in `ANONYMIZATION-LEDGER.md` — it records the original value and exactly where it was hidden. Restore the original at that location, then search `CLAUDE.md` (`## Hero`, `## About`), `site/index.html` and `case-studies/` for its exact "In portfolio as" text — the page carries copies of the stand-in. Restore the hits in that story's case study and its work item; show any other hit to the user before changing it (the stand-in may be generic wording used elsewhere). Note the public source as proof it's safe, and mark the ledger row **Revealed** with the date. If the item is listed under `CLAUDE.md` → Privacy → **Never name**, remove it there and add it under **OK to name** (confirm first; leave "Never name: none" if the list empties) — otherwise assemble and story-adapter will mask it again. This is the entire reason the ledger exists: reversal you can trust instead of reversal you half-remember.
- **Take down** → remove its work item from `site/index.html` and delete its `case-studies/` file (ask first — no other copy is kept). Grep `CLAUDE.md` (`## Hero`, `## About`), `site/index.html` (title and meta included) and `case-studies/` for its title and key facts, and fix every hit. In `source/` files, don't delete the user's raw words — mark the passage "(retired [date] — don't reuse)". Set its ledger rows' Status to `Retired` (still never shown). Voice Profile sample lines can stay — they show how the user writes and are never published.

### 4. Keep it on-voice and safe

Anything new or rewritten gets checked against the **Voice Profile** (sound like them) and run through the sensitivity rules (no colleague names, NDA details, exact confidential metrics, unreleased products). Both checks are built in — never skip them just because it's "only an update." Use the same confident defaults as story-adapter — keep public employers, generalize clients, ratios for metrics, remove unreleased/colleague/NDA — presented as recommendations the user can accept wholesale, not expert calls they must make. Anything you newly mask here gets its own row in the ledger with Status `Masked` — if the ledger doesn't exist, create it with the title `# Anonymization Ledger — PRIVATE, never publish` and columns `| # | Original | In portfolio as | Where | Reason | Reveal when | Status |`.

### 5. Show the diff

Summarize exactly what changed:
> "Updated: added [project] to Work, changed title to [new], restored [client] name (now public per [source]). Voice: matched. PII: clean."

If the page changed and `CLAUDE.md` lists a **Live site**, add: "Re-upload the `site/` folder to [host] so the live page matches — on Netlify, use your site's Deploys tab so the URL stays the same." If it says "not yet", say the page in `site/` is ready to publish whenever they are — and if they've already put it online themselves, to re-upload `site/` so it matches (and share the URL so it's noted).

### 6. Set the cadence

Close by reinforcing the habit:
> "Re-run **refresh** whenever you ship, change roles, or something goes public. That's what keeps this from going stale like every other portfolio."

## Why this matters

A static copy of a portfolio is a depreciating asset — it's wrong within months. A maintained one compounds. This skill is the difference, and it's the thing a copied template can never give someone.
