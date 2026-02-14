---
name: skill-improver-evaluator
version: 1.0.0
description: Meta-skill to improve evaluator skills (quality-check, voice-guardian, web-content-optimizer). Focuses on grading, output format, criteria consistency.
argument-hint: "[skill-name] [feedback]"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Skill Improver - Evaluator Skills

Meta-skill for improving evaluator-type skills based on feedback.

## Evaluator Skills

| Skill | Evaluates |
|-------|-----------|
| quality-check | Overall readiness, voice, technical, accessibility |
| voice-guardian | Tone, authenticity, corporate speak |
| web-content-optimizer | SEO, readability, images, mobile, performance |
| anonymizer | Sensitivity per area (employer/client/project/metrics) |

## Evaluator Skill Standards

All evaluator skills should follow this consistent pattern:

### Output Format
```
## [Evaluation Type] Report

**Grade: [A/B/C/D]**

| What Works | Why |
|------------|-----|
| [Strength] | [How it supports goal] |

| What Doesn't | Why It Matters | Fix |
|--------------|----------------|-----|
| [Issue] | [Impact] | [Action] |

**Passed:** [areas with no issues]

**Recommendations:**
- **P0:** [Blockers - must fix]
- **P1:** [Visible issues affecting professionalism]
- **P2:** [Minor, nice-to-haves]
```

### Grading Criteria
- **A** - Ready to publish. No blockers, minor issues at most.
- **B** - Publishable with notes. Some issues but nothing embarrassing.
- **C** - Fix before publishing. Visible problems that hurt credibility.
- **D** - Do not publish. Blockers present.

### Priority Criteria
- **P0** - Blockers. Must fix before publish.
- **P1** - Visible to typical visitor on main pages.
- **P2** - Edge cases, optimization, nice-to-haves.

### Grounding Requirement
Every evaluation must be grounded in PURPOSE, not generic best practices.
- "This hurts credibility because..." not "Best practice says..."
- "Visitors will notice X when..." not "SEO guidelines recommend..."

### CLAUDE.md as Source of Truth
Evaluators should check CLAUDE.md for context:
- **Owner** / **Role** — who this portfolio represents (top of CLAUDE.md)
- **Source Material** section — where raw content lives (Resume, Notes, LinkedIn paths)
- Identity informs what "authentic voice" means for this person

## When to Use This Skill

- Evaluator skill gave inconsistent output format
- Grading criteria unclear or too strict/lenient
- Missing important evaluation category
- Output too verbose or too terse
- Evaluation not grounded in purpose

## Process

1. **Identify** which evaluator skill needs improvement
2. **Read** current skill: `.claude/skills/[skill-name]/skill.md`
3. **Compare** against evaluator standards above
4. **Identify gaps:**
   - Output format matches template?
   - Grading criteria clear and calibrated?
   - Priority definitions consistent?
   - Evaluations grounded in purpose?
5. **Propose** specific changes
6. **Apply** after user approval

## Improvement Categories

### Output Format Issues
- Missing grade
- Missing tables (What Works / What Doesn't)
- Missing P0/P1/P2 structure
- Tables too sparse or too detailed
- Jargon not explained inline

### Grading Calibration
- Too strict (B for minor issues)
- Too lenient (A with real problems)
- Criteria vague or subjective
- Not tied to core user journey

### Evaluation Coverage
- Missing important checks
- Redundant checks
- Checks that belong in different skill
- Checks not relevant to portfolio purpose

### Grounding Issues
- Generic advice not tied to purpose
- "Best practices" without explaining why
- Missing "Why It Matters" context

## Output Format

```
## Evaluator Skill Improvement

**Skill:** [skill-name]
**Feedback:** [what triggered this]

### Standards Check

| Standard | Current | Issue |
|----------|---------|-------|
| Output format | [matches/differs] | [if differs, how] |
| Grade criteria | [clear/unclear] | [if unclear, why] |
| P0/P1/P2 | [present/missing] | [if missing/wrong] |
| Grounding | [grounded/generic] | [if generic, examples] |

### Proposed Changes

**1. [Section]**
- Before: [current]
- After: [proposed]
- Why: [how this aligns with standards]

### Cross-Check

After applying, verify:
- [ ] Output format matches evaluator template
- [ ] Grading criteria calibrated to peer evaluators
- [ ] P0/P1/P2 definitions consistent
- [ ] All evaluations grounded in portfolio purpose

Apply these changes? (yes/no)

### After Applying

**Always ask:** "Re-run `/[skill-name]` to test the improvements?"

This ensures changes are validated immediately.
```

## Evaluator Skills Registry

| Skill | File | Evaluates |
|-------|------|-----------|
| quality-check | `.claude/skills/quality-check/skill.md` | Overall readiness |
| voice-guardian | `.claude/skills/voice-guardian/skill.md` | Tone, authenticity |
| web-content-optimizer | `.claude/skills/web-content-optimizer/skill.md` | SEO, performance |
| anonymizer | `.claude/skills/anonymizer/skill.md` | Sensitivity per area |

## Cross-Evaluator Consistency

When improving one evaluator, check if changes should propagate:
- If changing grading criteria → check other evaluators use same scale
- If changing P0/P1/P2 definitions → align across all
- If changing output format → all should match

This ensures evaluator skills feel like one coherent system.

## Anonymization Nuance Check

When reviewing `/quality-check` or any skill that touches anonymization:

**Ensure granular handling, not broad levels:**

| Check | Bad | Good |
|-------|-----|------|
| Employer handling | "anonymize all companies" | "check CLAUDE.md: employers yes/some/no" |
| Client handling | lumped with employer | separate check for clients |
| Project handling | lumped with employer | separate check for project names |
| Metrics handling | "no specific numbers" | "ratios OK, absolutes need approval" |

**Questions to ask:**
- Does the skill distinguish between employer, client, project, and metrics?
- Does it reference CLAUDE.md settings or assume one-size-fits-all?
- Can user have different rules for each category?

**If skill uses only light/medium/heavy:**
- Flag as improvement opportunity
- Suggest adding granular category checks
- Reference `/anonymizer` granular approach

This prevents over-anonymizing (removing all context) or under-anonymizing (missing client names when employer is OK).
