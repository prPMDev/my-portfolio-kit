---
name: skill-improver
description: Improve the kit's skills based on usage patterns and feedback. Looks at what you override, reject, or redo — then proposes targeted edits. Builder skills get process, output, and handoff fixes; evaluator skills get recalibrated grading when your judgment and the skill's diverge. Use when you keep overriding or redoing a skill's output, or an evaluator's grade feels too strict or too lenient.
argument-hint: "[skill-name or 'all']"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Skill Improver

Improve skills by tracking what works, what you override, and what falls flat — then proposing targeted edits.

## Scope

**Builder skills** — CREATE content or implement changes:

| Skill | What It Builds |
|-------|---------------|
| `/portfolio-copywriter` | Website copy (hero, about, CTAs) |
| `/story-adapter` | Work stories, case studies |
| `/content-strategist` | Content routing decisions |
| `/website-expert` | Code, design, technical implementation |
| `/find-my-voice` | Voice profile |
| `/refresh` | Updates to an existing portfolio |
| `/setup` | First-run identity and contact |

Improve: **process** (steps that produce weak output), **handoffs** (gaps between skills, e.g. copywriter → website-expert), **output quality** (templates, principles, defaults that aren't working), **missing guidance**.

**Evaluator skills** — JUDGE content or gate publishing:

| Skill | What It Evaluates |
|-------|------------------|
| `/quality-check` | Final gate — orchestrates specialists |
| `/voice-guardian` | Tone, authenticity, corporate speak |
| `/web-content-optimizer` | SEO, readability, performance, mobile |
| `/anonymizer` | Sensitivity, confidentiality |

Improve: **grading criteria** (A-D thresholds too strict, too lenient, or missing), **checklists**, **priority definitions** (P0/P1/P2), **gate logic** (what blocks publishing vs. what's a note).

## Process

### 1. Collect Signals

Ask: "Any specific feedback on these skills, or should I work from what I've observed?"

Accept:
- **Explicit feedback** — complaints ("copywriter keeps writing generic hooks", "voice-guardian flags too many things"), missing checks ("web-content-optimizer doesn't catch X"), grade disagreements ("that should have been a B, not a C")
- **Overrides observed in the conversation** — output the user rewrote or always edits, steps skipped or reordered, flags the user kept anyway, shipping despite a failing grade. For evaluators this is the strongest signal: the evaluator was wrong, not the user.
- **"Just check"** — work from observed patterns only

### 2. Read Target Skill File(s)

Read `.claude/skills/<name>/SKILL.md` for each target. Note process steps, principles, templates, and output formats. For evaluators, focus on grade definitions, checklist items, priority definitions, and pass/fail thresholds.

### 3. Diagnose and Propose

Classify each gap.

Builder gap types: missing guidance, weak principle, stale example, missing step, wrong priority.

Evaluator gap types:

| Gap Type | Description | Example |
|----------|-------------|---------|
| **Missing check** | Something the evaluator should catch but doesn't | web-content-optimizer doesn't check CTA strength |
| **Weak criteria** | Check exists but threshold is vague | "Good CTA" without defining good |
| **Wrong priority** | Issue flagged at wrong severity | Broken mobile = P2 should be P0 |
| **Over-strict** | Evaluator flags things user consistently overrides | Voice guardian rejecting your preferred phrases |
| **Under-strict** | Evaluator passes things that don't hold up | Voice guardian passing resume-speak |

For each gap, propose ONE specific edit:

| Field | Value |
|-------|-------|
| **Skill** | Which skill file |
| **Section** | Which section to edit |
| **Gap type** | From above |
| **Confidence** | High/Medium — based on signal strength |
| **Current text** | Exact quote from skill file |
| **Proposed text** | Replacement text |
| **Why** | What pattern or feedback this addresses |
| **Risk** | What could go wrong (e.g., "might flag too aggressively at first") |

Rules:
- One gap = one proposal. No bundling.
- Additive preferred over rewrites — add a principle, don't rewrite a section. Never remove existing guidance unless it's clearly wrong.
- If a rewrite IS needed, show full before/after. For grading criteria, show the full grade definition before/after. For checklist additions, show where in the list it goes.

### 4. Get Approval

Present all proposals. User approves, rejects, or modifies each one individually. Never apply without explicit approval.

### 5. Apply and Log

For each approved edit:
1. Apply the change to the skill file
2. Append to the skill's Change Log (create if missing):

| Date | Change | Source | Approved |
|------|--------|--------|----------|
| YYYY-MM-DD | Brief description | feedback/pattern | Yes |

## Principles

- **Minimal edits** — smallest change that addresses the gap
- **Your overrides are data** — when you consistently keep or redo something, the skill needs recalibration, not you
- **One edit, one reason** — every change maps to an observed pattern
- **Preserve voice** — edit the skill's process, not its personality
- **User decides** — propose, never auto-apply

**Evaluator calibration:**
- **False positives erode trust** — an evaluator that flags too much gets ignored. Fewer, higher-confidence flags > many weak flags.
- **Evaluators should agree** — if voice-guardian gives an A to copy the user keeps rewriting, something is miscalibrated.
- **Grade inflation awareness** — if everything gets A, the grading is too lenient. If real-world results don't match the grades, someone should have caught it.
- **Evaluators flag, don't fix** — evaluators identify problems; builder skills fix them. An evaluator prescribing solutions is scope creep.
