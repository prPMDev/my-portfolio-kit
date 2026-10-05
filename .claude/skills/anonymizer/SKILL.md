---
name: anonymizer
description: Anonymize work content. Scans for sensitive elements (employer/client/project/metrics/people/internal details) and recommends keep/generalize/remove per item using story-adapter's sensitivity defaults; user applies all or adjusts.
argument-hint: "[content or file path]"
allowed-tools: Read, Edit, Write
---

# Anonymizer

A standalone sensitivity pass for content you're unsure about. `/story-adapter` and `/refresh` already run this check on stories; use this for anything else (hero/about copy, testimonials, existing pages).

**Not needed for:** personal side projects you own, public open-source work, freelance work shared with client permission, or generic skills not tied to an employer.

## Context Classification

Only flag items in real portfolio content. Classify each finding first:

| Context | Example | Action |
|---------|---------|--------|
| **Example** | `"Led the 12-person Pulse team"` inside a before/after demo | Skip |
| **Path/Config** | `docs/reference/stories/`, `https://example.github.io/` | Skip |
| **Skill Definition** | Text inside a skill's .md file | Skip |
| **Portfolio Content** | Company name in `index.html` hero, client in `data/work.json`, metric in case study copy | Evaluate |
| **Personal Project** | User's own side project name | Note — usually OK to keep |

## Process

1. **Scan** portfolio content and classify each finding (above).
2. **Recommend** using the sensitivity table in story-adapter step 3 (`.claude/skills/story-adapter/SKILL.md`): keep public employer, generalize client, remove codename, ratios for metrics, remove colleague names, remove internal negatives. Every item gets a reason ("Anonymize — client name in user-facing copy, NDA risk").
3. **Ask** — present the assessment below. The user accepts wholesale ("apply all") or adjusts any line. Never auto-apply; the user decides. When in doubt, recommend the safer option.
4. **Transform** per the confirmed choices. Preserve the "so what": if removing context guts the point, find a safe generalization.
5. **Verify** nothing identifiable remains.
6. **Log** every masked, removed, or generalized item to `ANONYMIZATION-LEDGER.md` exactly as in story-adapter step 4b (same header, private, gitignored, never published).

**Never publish:** colleague names, NDA/unreleased info, proprietary methods, exact metrics tied to an identifiable company, client names without permission.

**Note:** Testimonial attribution (recommender names) is OK — those are public LinkedIn recommendations where the person chose to be identified.

## Output

**Assessment:**

```
## Anonymization Assessment
**Content scanned:** [files]
### Verdict: CLEAN | NEEDS REVIEW

| Area | Found | Where | Recommendation (reason) |
|------|-------|-------|-------------------------|
| Employers / Clients / Projects / Metrics / People / Internal details | [item] | [file] | [Keep/Generalize/Ratio/Remove — why] |

**Skipped:** [count] items (examples, paths, config)
Say "apply all" or adjust any line, e.g. "Clients: keep, Metrics: remove".
```

CLEAN = nothing to flag; report and move on.

**After confirmation:**

```
## Anonymization Report
| Original | Anonymized | Reason |
|----------|------------|--------|
**Preserved:** [safe elements kept because they add value]
**Logged:** [n] rows to ANONYMIZATION-LEDGER.md
**Result:** Ready to publish / Needs user review on X
```

Then hand off to `/voice-guardian` for tone and `/quality-check` before publishing.
