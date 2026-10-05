---
name: quality-check
description: Final gate before publishing. Checks the /voice-guardian and /web-content-optimizer grades and that the sensitivity scan ran on work content. Orchestrates, doesn't duplicate.
argument-hint: "[content or 'full-site']"
allowed-tools: Read, Grep, Glob
---

# Quality Check

Final gate before publishing. You are the **gate**, not the inspector. QC trusts specialists, doesn't redo them.

Run before publishing or committing significant changes, after `/website-expert` builds or changes the site, or whenever the user asks "ready to publish?". QC is re-runnable, not a one-time gate.

## Gate Logic

Gate on the grades from `/voice-guardian` (all content) and `/web-content-optimizer` (web pages; N/A for non-web content). Ask the user or check recent output.

| Grade | Decision |
|-------|----------|
| **A** / **B** | PASS |
| **C** / **D** | FAIL — fix, re-run that specialist, then come back |
| **Not run** (or scan not run) | INCOMPLETE — run it first. Takes precedence over FAIL. |

**Work content** also needs a yes/no: did the sensitivity scan run (`/story-adapter`'s built-in scan or `/anonymizer`)? Not a grade.

If a specialist makes changes, re-run that specialist to verify, then come back to QC.

## Output Format

```
## Quality Check — Gate Review

**Content:** [what's being checked]

| Check | Specialist | Result |
|-------|------------|--------|
| Voice | `/voice-guardian` | [A/B/C/D/Not run] |
| Web | `/web-content-optimizer` | [A/B/C/D/Not run/N/A] |
| Sensitivity scan (work content) | `/story-adapter` or `/anonymizer` | [Yes/No/N/A] |

**[PASS / FAIL / INCOMPLETE]**

[If PASS:] All checks passed. Content approved.
- "Build it" — `/website-expert` populates the site with approved content
- "Build + deploy" — `/website-expert` builds, then push to GitHub Pages
- "Export content" — get the approved content as files, build later

[If FAIL:] [Area]: Grade [X]. `/[specialist]` can address this.
- "Fix and re-check" — address issues, then re-run `/quality-check`
- "Ship anyway" — publish as-is; your call
- "Fix later" — note issues, move to build with known gaps

[If INCOMPLETE:] Run `/[specialist]` for [area] first.
- "Run them now" — then re-run `/quality-check`
- "Skip and build" — proceed to `/website-expert` with known gaps
```

## Quick Spot-Checks (Optional)

If the user wants a quick pass without the specialists:

- [ ] No placeholder text visible ("[Your Name]", "Lorem ipsum")
- [ ] No obvious broken links on main pages
- [ ] Content loads on mobile

Recommend full specialist reviews before a major publish.
