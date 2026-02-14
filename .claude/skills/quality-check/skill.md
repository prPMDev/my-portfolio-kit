---
name: quality-check
version: 1.0.0
description: Final gate before publishing. Verifies all specialist skills have run and passed. Orchestrates, doesn't duplicate.
argument-hint: "[content or 'full-site']"
allowed-tools: Read, Grep, Glob
---

# Quality Check

Final gate before publishing. Orchestrates specialist skills, verifies they passed.

## Role

You are the **gate**, not the inspector. Specialist skills do the detailed work:
- `/voice-guardian` — tone, authenticity
- `/web-content-optimizer` — SEO, readability, performance
- `/website-expert` — code quality, technical
- `/anonymizer` — sensitivity (for work content)

Your job: verify they ran and passed.

## When to Use

- Before publishing any content
- After `/website-expert` builds or changes the site (re-run to verify implementation)
- Before committing significant changes
- Anytime — QC is re-runnable, not a one-time gate
- User asks for "final check" or "ready to publish?"

## Gate Logic

### Pass Threshold: B or better

| Specialist Grade | QC Decision |
|------------------|-------------|
| **A** | Pass |
| **B** | Pass (with notes) |
| **C** | Fail — must fix |
| **D** | Fail — must fix |
| **Not run** | Delegate first |

### If Specialist Makes Changes

Don't re-run QC. Re-run the specialist that made changes to verify fix, then come back to QC.

## Process

### 1. Check Prerequisites

**For work-related content:**
> "Has `/anonymizer` been run? If not, run that first."

**For all content:**
> "Has `/voice-guardian` reviewed this?"

**For web pages:**
> "Has `/web-content-optimizer` audited this?"

**For code changes:**
> "Has `/website-expert` reviewed this?"

### 2. Collect Grades

Ask user or check recent output:

| Area | Specialist | Grade | Status |
|------|------------|-------|--------|
| Anonymization | `/anonymizer` | [?] | [Pass/Fail/Not run] |
| Voice & Tone | `/voice-guardian` | [?] | [Pass/Fail/Not run] |
| Web Optimization | `/web-content-optimizer` | [?] | [Pass/Fail/Not run] |
| Technical | `/website-expert` | [?] | [Pass/Fail/Not run] |

### 3. Gate Decision

**If any "Not run":**
> "Run these specialists first, then come back: [list]"

**If any "Fail" (C or D):**
> "Fix these issues first: [list areas]. Re-run the specialist after fixing, then come back."

**If all "Pass" (A or B):**
> "All checks passed. Ready to publish."

## Output Format

```
## Quality Check — Gate Review

**Content:** [what's being checked]

### Specialist Status

| Area | Specialist | Grade | Status |
|------|------------|-------|--------|
| Anonymization | `/anonymizer` | [A/B/C/D/—] | [Pass/Fail/Not run] |
| Voice | `/voice-guardian` | [A/B/C/D/—] | [Pass/Fail/Not run] |
| Web | `/web-content-optimizer` | [A/B/C/D/—] | [Pass/Fail/Not run] |
| Technical | `/website-expert` | [A/B/C/D/—] | [Pass/Fail/Not run] |

### Gate Decision

**[PASS / FAIL / INCOMPLETE]**

[If PASS:]
All specialists passed (B or better). Content approved.

Options:
- "Build it" — `/website-expert` populates the site with approved content
- "Build + deploy" — `/website-expert` builds, then push to GitHub Pages
- "Export content" — get the approved content as files, build later

[If FAIL:]
These areas need fixes:
- [Area]: Grade [X]. `/[specialist]` can address this.

Options:
- "Fix and re-check" — address issues, then re-run `/quality-check`
- "Ship anyway" — publish as-is if grade is B or above
- "Fix later" — note issues, move to build with known gaps

[If INCOMPLETE:]
Run these specialists first:
- `/[specialist]` for [area]

Options:
- "Run them now" — then re-run `/quality-check`
- "Skip and build" — proceed to `/website-expert` with known gaps
```

## What QC Does NOT Do

- Detailed tone review (that's `/voice-guardian`)
- SEO audit (that's `/web-content-optimizer`)
- Code review (that's `/website-expert`)
- Anonymization assessment (that's `/anonymizer`)

QC trusts specialists. QC orchestrates and gates.

## Quick Spot-Checks (Optional)

If user asks for a quick pass without running all specialists, QC can do lightweight checks:

- [ ] No obvious broken links on main pages
- [ ] No console errors
- [ ] Content loads on mobile
- [ ] No placeholder text visible ("[Your Name]", "Lorem ipsum")

But recommend full specialist reviews before major publish.
