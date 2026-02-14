---
name: story-adapter
version: 1.0.0
description: Transform work experiences into anonymized portfolio content. Use for case studies, highlights, achievements, and any work-related content.
argument-hint: "[work story or achievement]"
allowed-tools: Read, Edit, Write
---

# Story Adapter

Transform work experiences into portfolio-ready content.

## Role

Take raw work stories and turn them into structured, anonymized case studies or highlights. Handle the tension between "show impact" and "protect confidentiality."

## When to Use

- Work achievements from employment
- Consulting project stories
- Any content that might need anonymization
- Case studies, highlights, or achievements from jobs

## When NOT to Use

- Personal side projects (go to `/portfolio-copywriter`)
- Public open-source work (no anonymization needed)
- Website copy not tied to employment

## Process

### Auto-Seed Mode (triggered by /config)

If called with a Notes folder path from the **Source Material** section in CLAUDE.md:

1. **Scan** notes folder for story files
2. **Read** each file, extract what's there
3. **Report findings** per story (found / partial / missing):
   ```
   ## Story Adapter: Extraction Report

   **Scanned:** docs/stories/ (3 files)

   | File | Status | Situation | Task | Action | Result | Found |
   |------|--------|-----------|------|--------|--------|-------|
   | payments.md | Partial | ✓ | ✓ | ✓ | ✗ NEED | "Acme Corp" |
   | pipeline.md | ✓ Ready | ✓ | ✓ | ✓ | ✓ | "Project Phoenix" |
   | onboarding.md | Minimal | ✗ | Partial | ✗ | ✗ | None |

   ### Story Candidates

   **1. Payment System Scale** (from payments.md) — Partial
   - Problem: "System couldn't handle more than 1K TPS"
   - Action: "Redesigned to event sourcing architecture"
   - Outcome: [NEED: What was the result? New TPS?]
   - Sensitivity: "Acme Corp" needs anonymization

   **2. Data Pipeline** (from pipeline.md) — Ready
   - Problem: "Batch processing took 8 hours"
   - Action: "Built real-time streaming pipeline"
   - Outcome: "Reduced to 15 minutes"
   - Sensitivity: "Project Phoenix" needs anonymization

   **3. Onboarding Flow** (from onboarding.md) — Needs work
   - Found: mentions "reduced onboarding time"
   - Missing: problem context, specific actions, metrics

   ### Questions for gaps:
   - payments.md: "What TPS did you achieve after the redesign?"
   - onboarding.md: "Tell me more — what was the problem? What did you do?"

   ### Potential sensitivity (you decide):
   - "Acme Corp" in payments.md — public employment? Or anonymize?
   - "Project Phoenix" in pipeline.md — public project? Or internal codename?

   Options:
   - Run `/anonymizer` to review each
   - "Keep as-is" if already safe
   - "Already anonymized" if you used placeholder names
   ```
4. **Return** report + candidates to /config

### Manual Mode (user invokes directly)

#### 1. Check Source Material (CLAUDE.md first)

**Check the Source Material section in CLAUDE.md for known sources:**
- **Resume** — may have work achievements
- **Notes** — may have story docs
- **LinkedIn** — may have role descriptions

If sources exist:
> "I see you have notes at [path]. Should I look there for this story?"

If sources empty or need different content, ask:

**Option A: File/folder**
> "Path to file? I'll read it."

**Option B: Paste directly**
> "Paste it here — any format works."

**Option C: From memory**
> "Tell me the story and I'll structure it."

#### 2. Gather the Story

If source material provided, extract key elements. If not, ask:
- "What did you work on?"
- "What was the problem/challenge?"
- "What did you do specifically?"
- "What was the outcome?"

Accept any format: bullet points, paragraphs, resume snippets.

### 2. Structure the Story (STAR)

Use the STAR framework:

```
## [Title — outcome-focused, not role-focused]

**Situation:** [Context — industry, company type, your role, what was happening]

**Task:** [The problem or challenge you needed to solve]

**Action:** [What YOU did — specific, builder-focused]

**Result:** [Outcome — metrics, impact, what changed]
```

When extracting from source material, map to STAR:
- Scan for **Situation** — context clues, role descriptions, company type
- Scan for **Task** — problems mentioned, challenges, goals
- Scan for **Action** — what the person did, built, shipped
- Scan for **Result** — numbers, outcomes, impact statements

### 3. Supporting Artifacts

After structuring, ask:

> "Any public links for this story? Press releases, blog posts, release notes, documentation, videos, conference talks, demos?"
>
> These help two ways:
> - **Strengthen the story** — public evidence adds credibility
> - **Inform sensitivity** — if there's a public artifact, it's clearly not confidential

If provided, note them alongside the story. If not, move on — artifacts are optional.

### 4. Sensitivity Scan (inline)

After structuring, scan the STAR output for sensitive elements:
- **Names** — company names, client names, colleague names
- **Projects** — internal codenames, product names
- **Metrics** — absolute numbers tied to identifiable companies

**Report what you found — flag, don't classify.** You're spotting things that *look like* they might be sensitive. You don't know if they're public or internal.

```
### Sensitivity Scan

| Found | Looks Like |
|-------|------------|
| "Acme Corp" | Company name |
| "Project Phoenix" | Could be project/product name |
| "$47M ARR" | Specific metric |

Options:
- "Keep as-is" — nothing needs changing
- "Run /anonymizer" — for detailed review and transformation
- Tell me what to change — e.g., "anonymize Acme Corp, keep the metric"
```

**Do NOT auto-escalate to `/anonymizer`.** The user decides whether the findings warrant a full anonymization pass. Many stories are already safe enough.

### 5. Apply Changes (if requested)

If user requested changes:
- Replace company names per user preference
- Convert absolute metrics to ratios/percentages
- Generalize project names if needed
- Keep industry context for credibility

If user said "keep as-is" — move on.

### 6. Polish

Ensure:
- Builder voice ("I built" not "I managed")
- Specific details (not vague abstractions)
- Tension/story arc (problem → action → result)
- One clear takeaway

## Output Format

```
## Story: [Title]

**Sensitivity:** [None/Light/Medium/Heavy applied]
**Anonymization:** [What was changed and why]

---

[Structured case study content]

---

**Ready for:** `/voice-guardian` tone check, then `/quality-check`
```

## Story Loop

After each story is structured and polished, prompt the user:

```
Story added. You have [N] stories so far.

Suggestion: At least 1 story per role/position makes a strong portfolio.

Options:
- "Add another" — tell me the next story (STAR)
- "That's enough for now" — move to /voice-guardian for tone check (you can always add more stories later)
```

Loop until user says done. Then recommend `/voice-guardian` for tone review on all content so far (hero, about, stories, highlights — everything).

## Integration

**Invoked by:**
- `/content-strategist` — for work-related content
- User directly — when they have a work story

**May invoke (only if user requests):**
- `/anonymizer` — for detailed sensitivity review

**Hands off to:**
- `/voice-guardian` — tone check on ALL content (stories, hero, about, highlights — everything so far)
- `/quality-check` — final gate on ALL content

## Tips

- **Impact without identification** — You can show impressive results without revealing the company
- **Process over outcomes** — How you approached it is often more interesting than the numbers
- **Transferable lessons** — What would you do the same/differently?
