---
name: update
version: 1.0.0
description: Check for and install new or updated skills from the upstream kit.
argument-hint: ""
allowed-tools: Bash, Read, Write
---

# Update

Check for new or updated skills from the My Portfolio Kit upstream.

## When to Use

- Periodically to check if new skills are available
- When announced that new skills have been released
- To get bug fixes in existing skills

## Process

### Step 1: Fetch Remote Manifest

Fetch `skills.json` from the upstream repository:

```bash
curl -s https://raw.githubusercontent.com/prpmdev/my-portfolio-kit/main/skills.json
```

If the fetch fails, inform user:
> "Couldn't reach the upstream repo. Check your internet connection or try again later."

### Step 2: Read Local Skills

For each skill directory in `.claude/skills/`:
1. Read `skill.md`
2. Parse the `version` field from frontmatter
3. If no version field, treat as `0.0.0` (pre-versioning)

### Step 3: Compare Versions

For each skill in the remote manifest:
1. Check if skill exists locally in `.claude/skills/[name]/skill.md`
2. Compare `version` field (remote vs local)
3. Categorize: **new** | **update available** | **up to date**

### Step 4: Report

```
## Skill Update Check

**Remote:** github.com/prpmdev/my-portfolio-kit
**Local skills:** [count]

| Skill | Local | Remote | Status |
|-------|-------|--------|--------|
| config | 1.0.0 | 1.1.0 | Update available |
| story-adapter | 1.0.0 | 1.0.0 | Up to date |
| new-skill | — | 1.0.0 | New |

[N] updates available, [M] new skills.
```

If everything is up to date:
> "All skills up to date. Nothing to do."

### Step 5: User Selects

Ask which skills to update/install:
- "Update all" — apply all updates and new skills
- "Pick" — let user select specific ones
- "Skip" — do nothing

**Never force-update. Never auto-apply.**

### Step 6: Install Selected

For each selected skill:

```bash
curl -s https://raw.githubusercontent.com/prpmdev/my-portfolio-kit/main/.claude/skills/[name]/skill.md \
  -o .claude/skills/[name]/skill.md
```

Create directory if new skill:
```bash
mkdir -p .claude/skills/[name]
```

After each install, confirm:
> "Updated `/[name]` from [old] to [new]"

### Step 7: Summary

```
## Update Complete

| Skill | Action | Version |
|-------|--------|---------|
| config | Updated | 1.0.0 → 1.1.0 |
| new-skill | Installed | 1.0.0 |

[N] skills updated, [M] new skills installed.

Tip: Run `/setup` if the update added new configuration options.
```

## What This Skill Does NOT Do

- Overwrite CLAUDE.md (your config is yours)
- Touch index.html, styles.css, or any content files
- Update without explicit user approval
- Modify user-customized skills without warning
- Change generate-skills.js or skills.json (those are maintainer tools)

## Notes

- The `/update` skill itself can be updated — it will show up in the update list like any other skill
- If you've customized a skill locally, the update will overwrite your changes — back up first if needed
- Version follows semver: patch (1.0.1) = bug fix, minor (1.1.0) = new feature, major (2.0.0) = breaking change
