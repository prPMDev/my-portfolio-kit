---
name: setup
version: 1.0.0
description: First-run setup wizard. Configures CLAUDE.md with identity and contact info.
argument-hint: ""
allowed-tools: Read, Write, Edit
---

# Setup

First-run setup wizard for the portfolio skill kit.

## When to Use

- First time setting up the skill kit
- Updating contact info
- After cloning the my-portfolio-kit repo

## What It Does

1. Asks about you (name, role, contact)
2. Creates personalized CLAUDE.md
3. Optionally updates the HTML template
4. Points to next steps

## Process

### Step 1: Gather Identity & Contact

**Identity**
- What's your name?
- What's your professional title/role?

**Contact**
- Email address
- LinkedIn URL
- GitHub URL (optional)

### Step 1b: Voice Profile

Ask: "How would you describe your professional voice? Some examples:"

| Style | Sounds Like |
|-------|-------------|
| **Builder** | "I ship things — code, products, systems" |
| **Strategist** | "I see the big picture — roadmaps, direction, bets" |
| **Technical** | "I go deep — architecture, systems, hard problems" |
| **Analytical** | "I dig into data — insights, patterns, decisions" |
| **Empathetic Leader** | "I bring people together — teams, alignment, growth" |
| **Or your own** | Describe it however feels right |

User can pick one, combine multiple, or describe in their own words.

Store in CLAUDE.md:
```
## Voice Profile
- Style: [whatever they said — builder / strategist / "analytical + builder" / "collaborative problem-solver" / etc.]
```

Keep it low-pressure:
> "This just helps me match the tone when writing your content. You can change it anytime."

### Step 2: Source Material (Optional)

Ask: "Do you have existing content I can work from?"

| Source Type | Question | Store In CLAUDE.md |
|-------------|----------|-------------------|
| **Resume** | "Path to resume file?" | `source.resume: [path]` |
| **Notes/stories** | "Folder with notes or stories?" | `source.notes: [path]` |
| **LinkedIn export** | "LinkedIn PDF or profile URL?" | `source.linkedin: [path/url]` |

If user says "no" or "skip" — that's fine. Skills will ask when needed.

If paths provided, add to CLAUDE.md:
```
## Source Material
- Resume: [path or "not provided"]
- Notes: [path or "not provided"]
- LinkedIn: [path or "not provided"]
```

### Step 3: Generate CLAUDE.md

Read `CLAUDE.md.template` and replace:

| Placeholder | Replace With |
|-------------|--------------|
| `{{NAME}}` | User's name |
| `{{TITLE}}` | Professional title |
| `{{EMAIL}}` | Email address |
| `{{LINKEDIN}}` | LinkedIn URL |
| `{{GITHUB}}` | GitHub URL |
| `{{RESUME_PATH}}` | Resume path or "not provided" |
| `{{NOTES_PATH}}` | Notes folder or "not provided" |
| `{{LINKEDIN_EXPORT}}` | LinkedIn export or "not provided" |
| `{{VOICE_PROFILE}}` | Selected style(s) or "not set" |

Write to `CLAUDE.md`.

### Step 4: Update Template (Optional)

Ask if user wants to update `index.html` (the portfolio starter):
- Replace `[Your Name]` with actual name
- Replace placeholder contact links
- Update meta tags

### Step 5: Auto-Seed (if sources provided)

If user provided source material, don't wait — start building:

**In parallel:**

| Source | Action | Skill |
|--------|--------|-------|
| Resume | Extract positioning, key achievements | `/portfolio-copywriter` |
| Notes/stories | Identify story candidates | `/story-adapter` |
| LinkedIn | Pull headline, summary | `/portfolio-copywriter` |
| Template | Populate with extracted info | `/website-expert` |

### Step 5b: Gap Analysis

After reading sources, report **what was found** (even partial) and **what's missing**:

```
## Auto-Seed Results

### What I Found

| Section | Status | Extracted |
|---------|--------|-----------|
| Positioning | Partial | "Senior Engineer" but no specialty/focus |
| About | Found | LinkedIn summary (3 sentences) |
| Achievements | Partial | 2 bullet points, task-focused not outcome-focused |
| Case studies | Partial | 1 story has Situation+Task+Action, missing Result |
| Contact | Found | Email + LinkedIn from sources |

### What I Need

| Gap | STAR Element Missing | Question |
|-----|---------------------|----------|
| Positioning | N/A | "Senior Engineer in what? What do you build?" |
| Achievements | Result | "That migration you did — what was the result?" |
| Case study #1 | Result | "The payment system redesign — what happened?" |

### Draft Preview (gaps marked)

**Hero:**
"I'm a Senior Engineer specializing in [NEED: focus area].
I build [NEED: what you build]."

**Case Study #1 (STAR):**
- Situation: [Extracted from source]
- Task: "Payment system couldn't scale past 1K TPS"
- Action: "Redesigned architecture, migrated to event sourcing"
- Result: [NEED: what was the result?]

---

Fill the gaps above, or say "draft anyway" to proceed with placeholders.
```

### Step 5c: Present Draft (if enough info)

```
## Draft Portfolio Ready

I've seeded your portfolio from:
- Resume: [what was extracted]
- Notes: [stories identified]
- LinkedIn: [headline/summary used]

**Draft sections:**
- Hero: [draft]
- About: [draft]
- Case studies: [list of candidates]

**Gaps filled by asking:** [list if any]

Review and refine? Next step: `/voice-guardian` for tone check, then `/quality-check`.
```

### Step 6: Suggest Sources (if none provided)

If user skipped all source material, don't just say "go figure it out." Suggest what to provide:

```
## Setup Complete!

**Your info:**
- Name: [name]
- Role: [role]
- Contact: [email, LinkedIn, GitHub]

**No source material yet.** That's OK — but I can build faster with something to work from.

### What would help most (pick any):

| Source | Why It Helps | How to Provide |
|--------|-------------|----------------|
| **Resume** (best start) | Extracts positioning, skills, achievements | Drop a PDF/DOC in your project: `docs/resume.pdf` |
| **LinkedIn About section** | Good positioning + summary text | Paste it here, or export profile as PDF |
| **Work stories** | Case study candidates (uses STAR format) | Write a few bullet points per story in `docs/stories/` |
| **Existing portfolio** | Baseline to improve | Share the URL or paste the text |

### Or just describe yourself:

Tell me in a few sentences:
1. What do you do?
2. What are you good at?
3. What kind of role are you looking for?

I'll draft from that.
```

## What This Skill Does NOT Do

- Ask about anonymization (that's `/anonymizer` per-content)
- Ask about positioning (that's `/content-strategist` or `/portfolio-copywriter`)
- Ask about personal touch (that's `/portfolio-copywriter` when writing About)

Keep config minimal. Skills gather context when they need it.

## Notes

- Run once at setup
- Can re-run to update contact info
- Does not overwrite content, only CLAUDE.md
