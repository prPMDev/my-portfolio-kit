---
name: anonymizer
version: 1.0.0
description: Anonymize work content. Scans for sensitive elements per area (employer/client/project/metrics) and asks user preference for each.
argument-hint: "[content or file path]"
allowed-tools: Read, Edit, Write
---

# Anonymizer

Protect sensitive information in portfolio content while preserving the story's impact.

## When to Use

- Content references specific employers, clients, or projects
- Case studies from employment (not personal projects)
- Testimonials that might identify workplace
- Any content that could trigger NDA concerns

## When NOT Needed

- Personal side projects you own
- Public open-source work
- Freelance work (with client permission)
- Generic skills/approaches not tied to employers

## Process

1. **Scan** - Read content, identify potentially sensitive elements, classify each by context
   - Skip examples, paths, skill definitions
   - Only flag items in actual portfolio content
2. **Categorize** - Group findings by area (employer/client/project/metrics)
3. **Recommend** - For each finding, provide recommendation WITH reason
4. **Ask per-area** - Present findings + recommendations, user confirms or adjusts
5. **Transform** - Apply anonymization per user's confirmed preferences
6. **Verify** - Check nothing identifiable remains
7. **Learn** - Note user's per-area patterns, inform `/skill-improver-evaluator` if useful

## Context Classification

Before flagging, classify each finding:

| Context | Description | Action |
|---------|-------------|--------|
| **Example** | Inside a before/after demonstration | Skip — not real content |
| **Path/Config** | File paths, URLs, repo references | Skip — infrastructure, not content |
| **Skill Definition** | Within a skill's .md file | Skip — meta content, not portfolio |
| **Portfolio Content** | Actual user-facing content (HTML, JSON, copy) | Evaluate — this is what matters |
| **Personal Project** | User's own side project name | Note — usually OK to keep |

**Only flag items in "Portfolio Content" context.**

Examples of what to SKIP:
- `docs/reference/stories/` — path reference
- `"Led the 12-person Pulse team"` inside a skill's example section — example
- `https://example.github.io/` — config/infrastructure

Examples of what to FLAG:
- Company name in `index.html` hero text — portfolio content
- Client name in `data/work.json` — portfolio content
- Metric in case study copy — portfolio content

## Auto-Assessment

Scan content and count:

| Signal | Points Toward |
|--------|---------------|
| Public company names (verifiable on LinkedIn) | Light or None |
| Links to public press releases/docs | Light or None |
| Public testimonials with attribution | Light or None |
| Internal project codenames | Medium |
| Specific team sizes | Medium |
| Absolute metrics (revenue, users) | Medium |
| Internal system/tool names | Medium → Heavy |
| Stakeholder names | Heavy |
| Proprietary processes | Heavy |
| NDA-sensitive details | Heavy |

**Recommendation logic:**
- All public, no internal details → **No changes needed** (report and move on)
- Some internal references, typical work content → **Medium**
- Recognizable company + sensitive details → **Heavy**

## Output Format (Assessment Phase)

### When CLEAN (nothing found)

```
## Anonymization Assessment

**Content scanned:** [files/content reviewed]

### Verdict: CLEAN

No sensitive content found in portfolio files. All areas clear:
- Employers: none found
- Clients: none found
- Projects: none found
- Metrics: none found

**Skipped:** [count] items (examples, paths, config — not portfolio content)

**Result:** Ready to proceed
```

### When NEEDS REVIEW (findings exist)

```
## Anonymization Assessment

**Content scanned:** [files/content reviewed]

### Verdict: NEEDS REVIEW

| Area | Found | Context | My Recommendation |
|------|-------|---------|-------------------|
| **Employers** | [name] | [where found] | Keep — public employment on LinkedIn |
| **Clients** | [name] | [where found] | Anonymize — not public, NDA risk |
| **Projects** | [name] | [where found] | Keep — public press release exists |
| **Metrics** | [number] | [where found] | Ratios — tied to identifiable company |

**Skipped:** [count] items (examples, paths, config — not portfolio content)

**Confirm recommendations or adjust?**
- Say "looks good" to proceed
- Or specify changes: "Clients: keep, Metrics: remove"
```

## Output Format (After Confirmation)

```
## Anonymization Report

**Level applied:** [Light/Medium/Heavy]
**Content type:** [Case study/Testimonial/Achievement/etc.]

### Changes Made
| Original | Anonymized | Reason |
|----------|------------|--------|
| [text] | [text] | [what it protects] |

### Preserved
- [Elements kept because they're safe and add value]

### Verification
- [ ] No company names remain (or all are publicly known employment)
- [ ] No colleague/stakeholder names
- [ ] No identifiable metrics
- [ ] No proprietary terms
- [ ] Story impact preserved

**Result:** [Ready to publish / Needs user review on X]
```

## Anonymization Approach

### Per-Content Assessment (Always)

Don't assume global settings. Ask about THIS specific content:

**For each piece of content, ask:**

| Category | Question |
|----------|----------|
| **Employers** | "Can I mention [company name] or should I anonymize?" |
| **Clients** | "This mentions [client] — OK to include or anonymize?" |
| **Projects** | "Can I name this project or describe generically?" |
| **Metrics** | "These numbers — OK as-is, ratios only, or remove?" |

**User responds per-content:**
- "[Employer] is fine, but anonymize the client name"
- "That project was public (press release), keep it"
- "Use ratios for metrics, not absolute numbers"

This is more accurate than global settings because:
- Some employers are OK to mention, others aren't
- Some projects are public, others are internal
- Context matters

### Shorthand Levels (User Can Request)

### Light
**Use when:** Content references public employment, just needs minor polish.

| Remove/Change | Keep |
|---------------|------|
| Exact company names → "a [industry] company" (if desired) | Industry context |
| Product names → "the platform" or "our product" | General product type |
| Specific dates → "in 2022" or "over 6 months" | Timeframes |

**Example:**
- Before: "At Acme Corp's DataFlow product..."
- After: "At a B2B SaaS company's data integration platform..."

### Medium
**Use when:** Standard work content, typical NDA concerns.

| Remove/Change | Keep |
|---------------|------|
| Everything in Light, plus: | |
| Team sizes → "small team" / "large org" | Team dynamics |
| Revenue/user numbers → "significant growth" | Directional outcomes |
| Feature names → functional descriptions | What it does |
| Internal tool names → generic descriptions | Tool category |

**Example:**
- Before: "Led the 12-person Pulse team, grew DAU from 50K to 200K"
- After: "Led a mid-sized product team, grew daily active users 4x"

### Heavy
**Use when:** Strict NDA, recognizable company, sensitive work.

| Remove/Change | Keep |
|---------------|------|
| Everything in Medium, plus: | |
| Industry specifics → broad categories | General domain |
| Unique processes → common frameworks | Transferable approach |
| Any identifying context | Core skills demonstrated |
| Colleague descriptions → role titles only | Team collaboration |

**Example:**
- Before: "Built the first AI-powered fraud detection for [Major Bank]'s wire transfer system"
- After: "Built fraud detection capabilities for a financial services platform processing high-value transactions"

## Never Include (Any Level)

- Colleague/manager/stakeholder names in content you author
- Internal system names that identify employer
- Proprietary methodologies or trade secrets
- Unreleased product information
- Exact metrics tied to identifiable company
- Client names without explicit permission

**Note:** Testimonial attribution (recommender names) are OK — they're public LinkedIn recommendations where the person chose to be identified.

## Integration

**Invoked by:**
- `/story-adapter` - automatically for work content
- `/quality-check` - if potential violations found
- User directly - when preparing sensitive content

**Invokes:**
- Nothing - this is a transformation skill

**Handoff to:**
- `/voice-guardian` - after anonymization, check tone
- `/quality-check` - final verification

## Learning Loop

After user provides per-area preferences:

1. **Note the pattern:**
   - User's choices for this content (employers: X, clients: Y, etc.)
   - Any consistent patterns across multiple uses

2. **Inform `/skill-improver-evaluator`** if patterns emerge:
   - "User typically keeps employer names but anonymizes clients"
   - "User prefers ratios over absolute metrics"
   - This helps improve default suggestions over time

3. **Next invocation** can mention patterns (but always ask):
   - "Based on previous content, suggesting: employers=keep, clients=heavy. Adjust?"
   - Never auto-apply — always confirm per-content

## Tips

- **Always explain WHY** - Every recommendation needs a reason:
  - "Keep — public side project you own"
  - "Keep — path reference, not visible to visitors"
  - "Anonymize — client name in user-facing copy, NDA risk"
  - "Skip — example within skill definition, not real content"
- **Preserve the "so what"** - Anonymization shouldn't gut the story. If removing context destroys the point, find a safe generalization.
- **Ratios over absolutes** - "4x growth" is safer than "grew to 200K users"
- **Actions over outcomes** - "I built X" is safer than "X generated $Y revenue"
- **When in doubt, go heavier** - You can always add context back with user approval
- **Public employment is usually OK** - If it's on your LinkedIn, company names are fine
- **Context matters most** - Same name in different contexts = different treatment
