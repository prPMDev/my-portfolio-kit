---
name: find-my-voice
description: Discover and capture the user's authentic writing voice by extracting it from their actual writing — not picking from a menu. Use for "find my voice", "what's my voice", "make it sound like me", setting up a voice profile, or before writing any portfolio content.
argument-hint: "[writing samples or 'I have nothing written']"
allowed-tools: Read, Write, Edit
---

# Find My Voice

Capture a rich, specific voice profile by analyzing what the user has actually written. A real voice cannot be picked from a list of five archetypes — it has to be observed. This profile becomes the target every other skill writes toward.

## Core principle

**Extract, don't ask.** If you ask someone "what's your voice?", they answer in generic LinkedIn-speak ("clear, strategic, a little warm") — the exact thing this kit exists to kill. People can't describe their voice; they can only demonstrate it. So work from samples.

## Process

### 1. Get samples (the default path)

Ask for 2–3 things the user has written: LinkedIn posts, a newsletter, a talk transcript, a blog, even a few real emails. Read whatever they give (file, paste, or link).

If they truly have nothing written, use the **fallback** below.

### 2. Analyze for a specific fingerprint

Read the samples and extract concrete, observable patterns — not adjectives:
- **Openings** — how do they start? (hook, question, blunt statement, story)
- **Sentence rhythm** — short and punchy? long and winding? mixed?
- **Signature vocabulary** — words and phrases they reach for repeatedly
- **Tone markers** — where they go warm, dry, funny, direct, contrarian
- **Structure habits** — lists, one-liners, build-ups, how they land a point
- **What they avoid** — jargon? adjectives? hedging? exclamation marks?

### 3. Reflect it back, specifically

Show the user their own fingerprint with evidence, e.g.:
> "Here's how you actually write: you open with a contrarian one-liner, keep sentences short, lean on 'the real story is' and 'basically', and you almost never use adjectives. Dry, confident, a little blunt. Sound right?"

Quote real patterns from their samples. Let them confirm or nudge.

### 4. Adjust for register

Name the one real gap: their casual voice (newsletter, posts) may not be their *portfolio* voice. Ask if they want it tuned up a notch (more polished) or kept exactly as-is. Capture the raw voice, then note the target register.

### 5. Store a rich profile

Write a detailed `## Voice Profile` into `CLAUDE.md` — not one word, a usable spec:

```
## Voice Profile

**One-line:** [e.g. "Dry, blunt, confident — short sentences, no fluff"]
**Register:** [casual / polished-casual / formal]
**Opens with:** [pattern]
**Sentence style:** [pattern]
**Signature phrases:** [list]
**Leans into:** [warm / dry / contrarian / etc.]
**Avoids:** [jargon / adjectives / hedging / etc.]
**Sample lines (real):**
- "[a real sentence they wrote]"
- "[another]"
```

This rich profile is what `story-adapter`, `refresh`, and any content step check against — and what keeps the output from sounding like everyone else.

## Fallback (no writing samples)

First run a short **voice interview** — extract from how they *speak*, since spoken answers reveal voice just as well. Ask 3–4 questions and let them talk freely:
- "Tell me about a project you're proud of — what was broken, and what did you do?"
- "How would you explain what you do to someone at a dinner party?"
- "What's a take in your field you'd defend when others push back?"
- "What kind of writing makes you cringe?" (reveals what they avoid)

Extract the same specific fingerprint from their answers — openings, rhythm, signature phrases, tone, what they avoid — reflect it back, and write the rich profile.

Use the archetypes below only as a last-resort nudge if they freeze, never as the answer:
- **Builder** — "I noticed X was broken, so I built Y"
- **Strategist** — "I saw the gap between X and Y, so I reframed it"
- **Operator** — "The process was a mess; I redesigned it and we shipped"
- **Narrator / Marketer** — "Here's why this matters and who it's for"
- **Technical** — "The system couldn't handle X, so I changed the architecture"

Even if you use an archetype as a nudge, still extract the real fingerprint from how they talk — never leave them as just a label.

## Handoff

> "Voice captured. From here, everything I write — case studies, updates — gets checked against this so it stays unmistakably you. Next: **story-adapter** to turn your work into case studies."
