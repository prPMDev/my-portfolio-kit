---
name: setup
description: First-run setup for a personal portfolio built with this kit. Gathers name, role, contact, and anything already written, then points to the next step. Use for "help me build my portfolio", "set up my portfolio", "start a new portfolio", or the first time using this kit. Not for setting up code projects, repos, or other tools.
argument-hint: ""
allowed-tools: Read, Write, Edit
---

# Setup

Get a new user started in under five minutes. Gather the minimum, store it, and hand off. Do NOT try to write content here — other skills do that.

## Goal

Create a `CLAUDE.md` profile in the user's working folder that every other skill reads as its source of truth, then route the user to `find-my-voice`.

## Process

### 1. Welcome + the map

Greet the user and lay out the whole path so they're never lost:
> "Welcome — I'll get you from raw material to a live portfolio, no coding. The path: **setup** (a few basics, now) → **find-my-voice** (so it sounds like you) → **story-adapter** (turn your work into case studies and flag what you may not be able to share) → build and publish the page (just say "build my page") → **refresh** (keep it current). I'll point you to each next step."

If the full kit is installed, also mention: **content-strategist** helps pick what to add, and **quality-check** is the final gate before publishing.

### 2. Gather identity and contact

The portfolio needs its own folder. If this one already has a `CLAUDE.md` that isn't a portfolio profile, or looks like a code project, don't write anything here — ask them to open a new empty folder and run setup there, then stop.

If `CLAUDE.md` is already a `# Portfolio Profile`, don't re-gather — say what's done, point to the first missing step (Voice Profile placeholder → **find-my-voice**; no `case-studies/` → **story-adapter**; otherwise "build my page" or **refresh**), and stop.

Ask conversationally (use AskUserQuestion where it helps, but keep it light):
- Name
- What they do / role
- Email
- LinkedIn URL
- GitHub or personal site (optional — skip if they don't have one; do not imply they should)
- What they're looking for next (optional — roles, clients, collaborators)

Never block on optional fields. If they volunteer that something must never be named — or that an employer or client is fine to name — record it under **Privacy**, not in Role.

### 3. Ask for raw material

Ask: "Do you have anything I can work from?" and accept any of:
- A résumé (file or paste)
- Things they've written (LinkedIn posts, a newsletter, talks, even emails) — flag these as **voice samples** for `find-my-voice`
- Rough notes on projects or wins

Save anything pasted to files so later sessions can use it — a later session can't see this chat: résumé → `source/resume.md`, writing → `source/writing-samples.md`, notes → `source/notes.md`. If they point to an existing file, record its path instead.

If they have nothing, that's fine — say so and move on.

### 4. Write the profile

Create `CLAUDE.md` in the working folder (if it's already a `# Portfolio Profile`, only fill empty fields — never overwrite Voice Profile, Hero, About, or Live site):

```
# Portfolio Profile

**Owner:** [name]
**Role:** [job title and employer only — no notes; it becomes the page title]
**Looking for:** [what's next, or "not specified"]
**Live site:** not yet

## Contact
- Email: [email]
- LinkedIn: [url or "none"]
- Site/GitHub: [url or "none"]

## Source Material
- Résumé: [file path or "none"]
- Writing samples: [file path or "none"]
- Notes: [file path or "none"]

## Privacy
- Never name: [real names the user asked to keep private — names only, no stand-in wording — or "none"]
- OK to name: [employers or clients the user said are fine to name, or "none"]

## Voice Profile
- (not captured yet — run find-my-voice)
```

### 4b. Protect private files

Create or update `.gitignore` in the working folder so private kit files are never committed:

```
# portfolio-kit private files — never publish
ANONYMIZATION-LEDGER.md
CLAUDE.md
source/
```

The ledger (created later by story-adapter) holds the real, unredacted originals; `CLAUDE.md` and `source/` hold raw material. `.gitignore` only protects git — the page is built into a separate `site/` folder, and only that folder ever goes online.

### 5. Hand off

If another skill started setup (e.g. find-my-voice), skip this and go straight back to that skill. Otherwise, point to the next step explicitly:
> "Setup done. Next: run **find-my-voice** so everything sounds like you — it hands you on to the next step from there. When you've got 2–3 case studies, say "build my page"."

## Rules

- Keep it short. This is config, not content.
- Don't ask about anonymization (that's built into `story-adapter` and `refresh`).
- Don't pick a voice from a menu here — `find-my-voice` does that properly by reading their writing.
