---
name: skill-improver-builder
version: 1.0.0
description: Meta-skill to improve builder skills (content-strategist, story-adapter, portfolio-copywriter, anonymizer, website-expert). Focuses on process, handoffs, user interaction.
argument-hint: "[skill-name] [feedback]"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# Skill Improver - Builder Skills

Meta-skill for improving builder-type skills based on feedback.

## Builder Skills

| Skill | Builds/Transforms |
|-------|-------------------|
| content-strategist | Routes content decisions, entry point |
| story-adapter | Work stories → portfolio content |
| portfolio-copywriter | Website copy (hero, about, contact) |
| anonymizer | Sensitive content → safe content |
| website-expert | Technical/design implementation |
| config | First-run setup, generates CLAUDE.md |
| update | Checks upstream for new/updated skills |

## Builder Skill Standards

### Clear Entry/Exit
Every builder skill should define:
- **When to invoke** - triggers, use cases
- **What it needs** - inputs, source material
- **What it produces** - outputs, deliverables
- **Where it hands off** - next skill in chain

### Process Steps
Steps should be:
- Numbered and sequential
- Action-oriented (verbs)
- Clear decision points
- Explicit about user interaction points

### User Interaction Points
Mark clearly when skill should:
- Ask user a question
- Wait for user approval
- Present options
- Request source material

### Handoff Protocol
Define:
- Which skills this one invokes
- Which skills invoke this one
- What information passes between

### Source Material Handling
If skill needs input content:
- **Check CLAUDE.md first** — look in the **Source Material** section for Resume, Notes, LinkedIn paths
- Only ask if CLAUDE.md has no path or "not provided"
- What formats accepted (resume, text, file)
- What to do if not provided

**CLAUDE.md is the source of truth.** Skills read from it, `/config` writes to it.

## When to Use This Skill

- Builder skill process unclear or incomplete
- Handoffs to other skills broken or confusing
- Missing user interaction at key decision points
- Skill assumes input that wasn't provided
- Output format doesn't match downstream needs

## Process

1. **Identify** which builder skill needs improvement
2. **Read** current skill: `.claude/skills/[skill-name]/skill.md`
3. **Check against standards:**
   - Entry/exit clear?
   - Process steps actionable?
   - User interaction points marked?
   - Handoffs defined?
   - Source material handling clear?
4. **Trace the flow** - walk through a real scenario
5. **Identify breakpoints** - where does it fail or confuse?
6. **Propose** specific changes
7. **Apply** after user approval

## Improvement Categories

### Process Issues
- Steps out of order
- Missing steps
- Steps too vague ("process the content")
- No decision criteria at branch points

### Handoff Issues
- Unclear which skill comes next
- Information lost between skills
- Circular dependencies
- Missing skills in chain

### User Interaction Issues
- Doesn't ask for needed input
- Asks too many questions
- Doesn't wait for approval at key points
- Options unclear or incomplete

### Source Material Issues
- Assumes content exists
- Doesn't say how to provide input
- Doesn't handle "I don't have this" case
- Format requirements unclear

### Output Issues
- Output format doesn't match next skill's input
- Missing key information downstream skills need
- Too verbose or too sparse

## Output Format

```
## Builder Skill Improvement

**Skill:** [skill-name]
**Feedback:** [what triggered this]

### Flow Analysis

**Entry:** [how skill is invoked]
**Expected input:** [what it needs]
**Process:** [current steps, numbered]
**Output:** [what it produces]
**Exit:** [where it hands off]

### Breakpoints Found

| Step | Issue | Impact |
|------|-------|--------|
| [step #] | [what's wrong] | [what breaks downstream] |

### Proposed Changes

**1. [Section]**
- Before: [current]
- After: [proposed]
- Why: [how this fixes the flow]

### Flow Verification

After applying, trace this scenario:
> [Realistic user scenario that exercises the skill]

Check:
- [ ] Entry conditions clear
- [ ] Each step actionable
- [ ] User interaction points appropriate
- [ ] Handoff to next skill smooth
- [ ] Output usable by downstream skills

Apply these changes? (yes/no)

### After Applying

**Always ask:** "Re-run `/[skill-name]` to test the improvements?"

This ensures changes are validated immediately.
```

## Builder Skills Registry

| Skill | File | Role in Flow |
|-------|------|--------------|
| config | `.claude/skills/config/skill.md` | First-run setup |
| content-strategist | `.claude/skills/content-strategist/skill.md` | Entry point, router |
| story-adapter | `.claude/skills/story-adapter/skill.md` | Work content transformer |
| anonymizer | `.claude/skills/anonymizer/skill.md` | Sensitive content handler |
| portfolio-copywriter | `.claude/skills/portfolio-copywriter/skill.md` | Copy writer |
| website-expert | `.claude/skills/website-expert/skill.md` | Technical implementation |
| update | `.claude/skills/update/skill.md` | Upstream skill updater |

## Skill Flow Map

```
/config (first-run)
    ↓
/content-strategist (entry point)
    ↓
    ├→ /story-adapter (work content)
    │       ↓
    │   /anonymizer (if needed)
    │       ↓
    │   /portfolio-copywriter (polish)
    │
    ├→ /portfolio-copywriter (website copy)
    │
    └→ /website-expert (technical)

    ↓ (all paths)
/voice-guardian (tone check)
    ↓
/quality-check (final gate)
/web-content-optimizer (if needed)
```

When improving a skill, consider its position in this flow.
