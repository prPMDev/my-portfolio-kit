---
name: story-adapter
description: Turn raw work experience into anonymized, on-voice portfolio case studies. Built-in confidentiality and PII protection. Use for "add a project", "turn this into a case study", work stories, achievements, or any employment content.
argument-hint: "[work story or achievement]"
allowed-tools: Read, Write, Edit
---

# Story Adapter

Turn messy work experience into a portfolio-ready case study that shows impact WITHOUT leaking anything confidential — and that sounds like the user, not a résumé. Anonymization is built in, not a separate step.

## Before you start

Read `CLAUDE.md` for the **Voice Profile** and **Source Material**. If no voice profile exists, suggest running `find-my-voice` first — content without it will sound generic.

## Process

### 1. Get the story

Accept any format — paste, file, or memory. If thin, ask the four questions:
- What was the situation? (industry, company type, your role)
- What was the problem?
- What did *you* specifically do?
- What was the result?

### 2. Structure as STAR

Shape into **Situation → Task → Action → Result**. Keep the action focused on what the user actually did. Match the verbs to their voice profile (a marketer "reframed" and "launched"; a builder "shipped" — do not force "built" onto someone who doesn't build).

### 3. Sensitivity scan (built in)

Scan the structured story for anything risky and flag each with a recommendation and a reason:

| Looks like | Default move | Why |
|---|---|---|
| Employer name (on their LinkedIn) | Keep | Public employment is usually fine |
| Client name | Generalize ("a global retailer") | NDA risk unless public |
| Internal codename / unreleased product | Remove | Not public |
| Absolute metrics ($, users) tied to a named company | Convert to ratio ("4x", "exceeded target ~40%") | Protects confidential numbers |
| Colleague / manager / stakeholder names | Remove | Never publish people you didn't ask |
| Internal-only details, negative specifics (layoffs, politics) | Remove | Burns bridges, adds no credibility |

Present findings as **recommendations the user can accept wholesale** — "here's what I'd keep, generalize, and remove, and why; say 'apply all' or adjust any line." A non-expert should be able to accept the defaults and be safe without making a single call themselves. When in doubt, go safer — context can be added back later with approval.

**Never publish:** colleague names, NDA/unreleased info, proprietary methods, exact metrics tied to an identifiable company, client names without permission.

### 4. Apply voice + polish

Rewrite in the user's voice profile. Show the process (how they approached it), not just outcomes — process is often more credible than numbers, and safer. One clear takeaway per story.

### 4b. Log what you hid (anonymization ledger)

For every item you masked, removed, or generalized, append a row to `ANONYMIZATION-LEDGER.md` in the working folder. Create it with this header if missing:

```
# Anonymization Ledger — PRIVATE, never publish
> Holds the real, unredacted originals so `refresh` can restore them when they become public.
> Keep this gitignored and out of any deploy. Treat it like a password file.

| # | Original | In portfolio as | Where | Reason | Reveal when | Status |
|---|----------|-----------------|-------|--------|-------------|--------|
```

Record the real original, what it became, where it appears, why, and the condition under which it could later be revealed (e.g. "when publicly announced"). Confirm it is listed in `.gitignore`. Never include this file in published output — it is the one file that, if leaked, undoes all the protection above.

### 5. Output and loop

Deliver the finished case study. Then:
> "Story added. Add another, or move on? When you've got 2–3, your portfolio's in good shape. Run **refresh** anytime you ship something new."

## Tip

Impact without identification is the whole game. "Cut enterprise onboarding from 6 weeks to 3 days at a B2B SaaS company" is strong AND safe. You rarely need the logo to land the point.
