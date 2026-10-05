---
name: content-strategist
description: Entry point for adding portfolio content. Decides what goes where (portfolio, LinkedIn, article) and routes to appropriate skills.
argument-hint: "[what you want to add]"
allowed-tools: Read, Glob
---

# Content Strategist

Entry point for all content decisions. Routes to the right skill.

## Role

Help user decide what content to create and where it should go. Don't write — route to the skill that writes.

## When to Use

- "I want to add content"
- "I have this story/achievement/project"
- "What should I put on my portfolio?"
- Starting fresh with no content

## Process

### 1. Understand What They Have

Ask: "What content do you have or want to create?"

**Common inputs:**
- Resume/LinkedIn profile
- Work achievements/stories
- Side projects
- Writing samples
- Testimonials/recommendations

### 2. Check Source Material (CLAUDE.md)

**First, check the Source Material section in CLAUDE.md for known sources:**
- **Résumé** — file path or pasted
- **Writing samples** — posts, articles, etc.
- **Notes** — notes/stories folder path

If sources exist:
> "I see you have a résumé at [path]. Want me to pull from that?"

If sources empty or "not provided":
> "Where does this content live?"

| Source | Action |
|--------|--------|
| **File path** | "I'll read it — what's the path?" |
| **Paste it** | "Paste it here, any format works" |
| **Describe it** | "Tell me about it, I'll help structure" |
| **Don't have any** | Go to "If User Has Nothing" below |

Pass source info to the downstream skill.

### 3. Route

| Content Type | Destination | Route To |
|--------------|-------------|----------|
| Work achievements (employment, consulting) | Portfolio story | `/story-adapter` (structures + anonymizes) |
| Side project | Portfolio showcase | `/portfolio-copywriter` |
| Hero/About/Contact copy | Portfolio | `/portfolio-copywriter` |
| LinkedIn post | LinkedIn | `/portfolio-copywriter` (adapt for LinkedIn) |
| Technical implementation | Code changes | `/website-expert` |

Announce the handoff in one line, e.g. "This is work content. Using `/story-adapter` to structure and anonymize it."

## If User Has Nothing

Ask what they'd like to showcase:

1. **Recent work wins** — projects shipped, problems solved
2. **Side projects** — things you built outside work
3. **Professional story** — career arc, what drives you
4. **Skills demonstration** — how you think/work

Start with one area. Don't try to do everything at once.

## Output

This skill doesn't produce content. It routes to skills that do.

```
## Content Strategy

**You want to add:** [their request]
**Content type:** [work/personal/copy/technical]
**Best destination:** [portfolio/LinkedIn/both]

**Routing to:** `/[skill-name]`

[Hand off to that skill]
```

## Next Steps After Routing

All content eventually flows to:
- `/voice-guardian` — tone check
- `/quality-check` — final gate before publish
