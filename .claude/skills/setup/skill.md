---
name: setup
description: First-run setup for the portfolio kit. Gathers identity and contact, then points to the next step. Use when starting a new portfolio, "set up my portfolio", "get started", or the first time using this kit.
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
> "Welcome — I'll get you from raw material to portfolio content, no coding. The path: **setup** (now) → **find-my-voice** (so it sounds like you) → **content-strategist** (what to add) → **story-adapter** / **portfolio-copywriter** (create it) → **voice-guardian** → **quality-check** → publish in whatever builder you like → **refresh** (keep it current). You don't run all of them every time — I'll point you to the next step."

### 2. Gather identity and contact

Ask conversationally (use AskUserQuestion where it helps, but keep it light):
- Name
- What they do / role
- Email
- LinkedIn URL
- GitHub or personal site (optional — skip if they don't have one; do not imply they should)

Never block on optional fields.

### 3. Ask for raw material

Ask: "Do you have anything I can work from?" and accept any of:
- A résumé (file or paste)
- Things they've written (LinkedIn posts, a newsletter, talks, even emails) — flag these as **voice samples** for `find-my-voice`
- Rough notes on projects or wins

If they have nothing, that's fine — say so and move on.

### 4. Write the profile

Create or update `CLAUDE.md` in the working folder:

```
# Portfolio Profile

**Owner:** [name]
**Role:** [role]

## Contact
- Email: [email]
- LinkedIn: [url]
- Site/GitHub: [url or "none"]

## Source Material
- Résumé: [path/pasted/none]
- Writing samples: [list/none]
- Notes: [path/none]

## Voice Profile
- (not captured yet — run find-my-voice)
```

### 4b. Protect private files

Create or update `.gitignore` in the working folder so sensitive kit files are never committed or published:

```
# portfolio-kit private files — never publish
ANONYMIZATION-LEDGER.md
```

The ledger (created later by story-adapter) holds the real, unredacted originals. Treat it like a password file — if a publish/deploy step is ever added, it must exclude this file too.

### 5. Hand off

Point to the next step explicitly:
> "Setup done. Next: run **find-my-voice** so everything sounds like you. Then **content-strategist** helps decide what to add, **story-adapter** / **portfolio-copywriter** create it, and the rest of the kit polishes it — with **refresh** keeping it current."

## Rules

- Keep it short. This is config, not content.
- Don't ask about anonymization (that's built into `story-adapter` and `refresh`).
- Don't pick a voice from a menu here — `find-my-voice` does that properly by reading their writing.
