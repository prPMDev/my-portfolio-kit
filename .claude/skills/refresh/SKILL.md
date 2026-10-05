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

Read `CLAUDE.md` for **Voice Profile**, **Contact**, and **Source Material**. Read the current portfolio content so you know what already exists before changing anything. Also read `ANONYMIZATION-LEDGER.md` (if present) so you know exactly what was masked, where, and the original values — never rely on memory for this.

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

- **New work** → run it through the `story-adapter` flow (STAR + built-in sensitivity scan), then place it.
- **Changed fact** → find every place it appears (titles, intro, metrics) and update consistently. Grep for the old value so nothing stale is left behind.
- **Became public** → the one people forget: *loosen* the anonymization. Look the item up in `ANONYMIZATION-LEDGER.md` — it records the original value and exactly where it was hidden. Restore the original at that location, note the public source as proof it's safe, and mark the ledger row **Revealed** with the date. This is the entire reason the ledger exists: reversal you can trust instead of reversal you half-remember.
- **Take down** → remove cleanly and check nothing else references it.

### 4. Keep it on-voice and safe

Anything new or rewritten gets checked against the **Voice Profile** (sound like them) and run through the sensitivity rules (no colleague names, NDA details, exact confidential metrics, unreleased products). Both checks are built in — never skip them just because it's "only an update." Use the same confident defaults as story-adapter — keep public employers, generalize clients, ratios for metrics, remove unreleased/colleague/NDA — presented as recommendations the user can accept wholesale, not expert calls they must make. Anything you newly mask here gets its own row in the ledger, exactly as story-adapter does.

### 5. Show the diff

Summarize exactly what changed:
> "Updated: added [project] to Work, changed title to [new], restored [client] name (now public per [source]). Voice: matched. PII: clean."

### 6. Set the cadence

Close by reinforcing the habit:
> "Re-run **refresh** whenever you ship, change roles, or something goes public. That's what keeps this from going stale like every other portfolio."

## Why this matters

A static copy of a portfolio is a depreciating asset — it's wrong within months. A maintained one compounds. This skill is the difference, and it's the thing a copied template can never give someone.
