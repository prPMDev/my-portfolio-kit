---
name: skill-improver-builder
version: 1.0.0
description: Improve builder skills based on usage patterns and feedback. Tracks what you override, reject, or redo — then proposes targeted edits.
argument-hint: "[skill-name or 'all']"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Skill Improver — Builder Skills

Improve builder skills by tracking what works, what you override, and what falls flat — then proposing targeted edits.

## Scope

Builder skills — the ones that CREATE content or implement changes:

| Skill | What It Builds |
|-------|---------------|
| `/portfolio-copywriter` | Website copy (hero, about, CTAs) |
| `/story-adapter` | Work stories, case studies |
| `/content-strategist` | Content routing decisions |
| `/website-expert` | Code, design, technical implementation |

## What You Improve

- **Process:** Steps that produce weak output
- **Handoffs:** Gaps between skills (e.g., copywriter → website-expert)
- **Output quality:** Templates, principles, or defaults that aren't working
- **Missing guidance:** Things the skill should know but doesn't

## Process

### 1. Collect Signals

Look for patterns across recent usage:

**From Learning Loops** (if skills have them):
- Phrases or outputs the user consistently overrides
- Steps the user skips or reorders
- Output formats the user always edits after generation

**From user feedback:**
Ask: "Any specific feedback on these skills, or should I work from what I've observed?"

Accept:
- Specific complaints ("copywriter keeps writing generic hooks")
- General observations ("the stories all sound the same")
- "Just check" — work from observed patterns only

### 2. Read Target Skill File(s)

Read the skill `.md` file(s) identified in step 1. Understand:
- Current process steps
- Principles and checklists
- Templates and output formats
- Known gaps or TODOs

### 3. Diagnose and Propose

For each gap found, propose ONE specific edit:

| Field | Value |
|-------|-------|
| **Skill** | Which skill file |
| **Section** | Which section to edit |
| **Gap type** | Missing guidance / weak principle / stale example / missing step / wrong priority |
| **Current text** | Exact quote from skill file |
| **Proposed text** | Replacement text |
| **Why** | What pattern or feedback this addresses |
| **Risk** | Low/Medium — what could go wrong |

Rules:
- One gap = one proposal. No bundling.
- Additive preferred over rewrites — add a principle, not rewrite a section.
- If a rewrite IS needed, show full before/after.
- Never remove existing guidance unless it's clearly wrong.

### 4. Get Approval

Present all proposals. User approves, rejects, or modifies each one individually.

Never apply without explicit approval.

### 5. Apply and Log

For each approved edit:
1. Apply the change to the skill file
2. Append to the skill's Change Log (create if missing):

| Date | Change | Source | Approved |
|------|--------|--------|----------|
| YYYY-MM-DD | Brief description | feedback/pattern | Yes |

## Principles

- **Minimal edits** — smallest change that addresses the gap
- **Your usage is ground truth** — what you override repeatedly is a signal, not a mistake
- **One edit, one reason** — every change maps to an observed pattern
- **Preserve voice** — edit the skill's process, not its personality
- **Additive over destructive** — add guidance, don't delete
- **User decides** — propose, never auto-apply
