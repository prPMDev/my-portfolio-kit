---
name: skill-improver-evaluator
version: 1.0.0
description: Improve evaluator skills based on usage patterns, overrides, and feedback. Recalibrates grading criteria when your judgment and the skill's diverge.
argument-hint: "[skill-name or 'all']"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Skill Improver — Evaluator Skills

Improve evaluator skills by tracking where your judgment diverges from the skill's — then recalibrating.

## Scope

Evaluator skills — the ones that JUDGE content or gate publishing:

| Skill | What It Evaluates |
|-------|------------------|
| `/quality-check` | Final gate — orchestrates specialists |
| `/voice-guardian` | Tone, authenticity, corporate speak |
| `/web-content-optimizer` | SEO, readability, performance, mobile |
| `/anonymizer` | Sensitivity, confidentiality |

## What You Improve

- **Grading criteria:** Thresholds that are too strict, too lenient, or missing
- **Checklists:** Items that should exist but don't
- **Priority definitions:** P0/P1/P2 calibration
- **Gate logic:** What blocks publishing vs. what's a note
- **Over-strict flags:** Things the evaluator flags that you consistently override

## Process

### 1. Collect Signals

**From Learning Loops** (strongest signal for evaluators):
- Phrases or grades the user overrides — evaluator was wrong, not the user
- Gate overrides — user shipped despite a "Fail" grade
- Grade disagreements — "that should have been a B, not a C"

**From user feedback:**
Ask: "Any specific feedback on these skills, or should I work from what I've observed?"

Accept:
- Calibration complaints ("voice-guardian flags too many things")
- Missing checks ("quality-check doesn't catch X")
- Grade disagreements
- "Just check" — work from observed patterns only

### 2. Read Target Skill File(s)

Read the skill `.md` file(s). Focus on:
- Grading criteria (A/B/C/D definitions)
- Checklist items
- Priority definitions (P0/P1/P2)
- Gate logic (pass/fail thresholds)

### 3. Diagnose Gap Type

Classify each finding:

| Gap Type | Description | Example |
|----------|-------------|---------|
| **Missing check** | Something the evaluator should catch but doesn't | QC doesn't check CTA strength |
| **Weak criteria** | Check exists but threshold is vague | "Good CTA" without defining good |
| **Wrong priority** | Issue flagged at wrong severity | Broken mobile = P2 should be P0 |
| **Over-strict** | Evaluator flags things user consistently overrides | Voice guardian rejecting your preferred phrases |
| **Under-strict** | Evaluator passes things that don't hold up | Quality check missing obvious issues |

### 4. Propose Edits

For each gap, propose ONE specific edit:

| Field | Value |
|-------|-------|
| **Skill** | Which skill file |
| **Section** | Which section to edit |
| **Gap type** | From table above |
| **Confidence** | High/Medium — based on signal strength |
| **Current text** | Exact quote from skill file |
| **Proposed text** | Replacement text |
| **Why** | Pattern or feedback + reasoning |
| **Risk** | What could go wrong (e.g., "might flag too aggressively at first") |

Rules:
- One gap = one proposal.
- For grading criteria changes, show the full grade definition before/after.
- For checklist additions, show where in the list it goes.

### 5. Get Approval

Present all proposals. User approves, rejects, or modifies each individually.

Never apply without explicit approval.

### 6. Apply and Log

For each approved edit:
1. Apply the change to the skill file
2. Append to the skill's Change Log (create if missing):

| Date | Change | Source | Approved |
|------|--------|--------|----------|
| YYYY-MM-DD | Brief description | feedback/pattern/learning-loop | Yes |

## Calibration Principles

1. **False positives erode trust** — An evaluator that flags too much gets ignored. Fewer, higher-confidence flags > many weak flags.

2. **Your overrides are data** — When you consistently keep something the evaluator flags, the evaluator needs recalibration, not you.

3. **Evaluators should agree** — If voice-guardian says A and quality-check implies C, something is miscalibrated.

4. **Grade inflation awareness** — If everything gets A, the grading is too lenient. If real-world results don't match the grades, someone should have caught it.

5. **Evaluators flag, don't fix** — Evaluators identify problems. Builder skills fix them. If an evaluator is prescribing solutions, that's scope creep.

6. **User decides** — Propose, never auto-apply.
