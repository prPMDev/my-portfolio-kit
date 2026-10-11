---
name: story-adapter
description: Turn raw work experience into anonymized, on-voice portfolio case studies. Built-in confidentiality and PII protection. Use for "add a project", "turn this into a case study", work stories, achievements, or any employment content.
argument-hint: "[work story or achievement]"
allowed-tools: Read, Write, Edit
---

# Story Adapter

Turn messy work experience into a portfolio-ready case study that shows impact WITHOUT leaking anything confidential — and that sounds like the user, not a résumé. Anonymization is built in, not a separate step.

## Before you start

If `CLAUDE.md` has no `# Portfolio Profile`, run `setup` first. Read `CLAUDE.md` for the **Voice Profile**, **Source Material** (read any saved files it lists, e.g. `source/resume.md`), and **Privacy** — anything under **Never name** is always removed or generalized. Read `ANONYMIZATION-LEDGER.md` if present: never mask anything that has a `Revealed` row. If no voice profile exists, suggest running `find-my-voice` first — content without it will sound generic.

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
| Employer name (on their LinkedIn or under **OK to name**, and not under **Never name**) | Keep | Public employment is usually fine |
| Client name | Generalize ("a global retailer") | NDA risk unless public |
| Internal codename / unreleased product | Remove | Not public |
| Absolute metrics ($, users) tied to a named company or client | Convert to ratio ("4x", "exceeded target ~40%"); with no baseline, remove it and lead with the before/after result — never a dollar range ("seven figures") | Protects confidential numbers |
| Colleague / manager / stakeholder names | Remove | Never publish people you didn't ask |
| Internal-only details, negative specifics (layoffs, politics) | Remove | Burns bridges, adds no credibility |

Present findings as **recommendations the user can accept wholesale** — "here's what I'd keep, generalize, and remove, and why; say 'apply all' or adjust any line." A non-expert should be able to accept the defaults and be safe without making a single call themselves. When in doubt, go safer — context can be added back later with approval.

**Never publish:** colleague names, NDA/unreleased info, proprietary methods, exact metrics tied to an identifiable company, client names without permission.

If the user keeps something the defaults would hide ("keep the client, they're public"), log it in the ledger with Status `Revealed` and Reason "user approved" — so no later skill masks it again.

### 4. Apply voice + polish

Rewrite in the user's voice profile. Show the process (how they approached it), not just outcomes — process is often more credible than numbers, and safer. One clear takeaway per story.

Use only facts, numbers, and claims the user gave — never invent. If the process is missing, ask one question ("How did you go about it?"); if there's still nothing, keep the story short and say it can be expanded later.

### 4b. Log what you hid (anonymization ledger)

For every item you masked, removed, or generalized, append a row to `ANONYMIZATION-LEDGER.md` in the working folder. Create it with this header the first time, even if nothing was masked:

```
# Anonymization Ledger — PRIVATE, never publish
> Holds the real, unredacted originals so `refresh` can restore them when they become public.
> Keep this gitignored and out of any deploy. Treat it like a password file.

| # | Original | In portfolio as | Where | Reason | Reveal when | Status |
|---|----------|-----------------|-------|--------|-------------|--------|
```

Record the real original, what it became, where it appears (the case-study file and section, e.g. `case-studies/checkout-redesign.md — Result`), why, and the condition under which it could later be revealed (e.g. "when publicly announced"). Set **Status** to `Masked`. Confirm it is listed in `.gitignore`. Never include this file in published output — it is the one file that, if leaked, undoes all the protection above.

### 5. Save and loop

Re-check the final draft — title and summary included — against the step-3 decisions, then show it for a quick confirm. Once the user approves, save it to `case-studies/<slug>.md` in the working folder — take the slug from the anonymized title, never from a client name or codename — in this shape:

```
# [Title — the result, in their voice]
**Summary:** [1–2 sentences for the portfolio page]

[Body — the STAR story]
```

Then:
> "Saved to `case-studies/<slug>.md`. Add another, or move on? Say **"build my page"** whenever you're ready — 2–3 stories is the sweet spot."

When running inside `refresh`, skip that closing line — refresh places the story itself.

## Tip

Impact without identification is the whole game. "Cut enterprise onboarding from 6 weeks to 3 days at a B2B SaaS company" is strong AND safe. You rarely need the logo to land the point.
