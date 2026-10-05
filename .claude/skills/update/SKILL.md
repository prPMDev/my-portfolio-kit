---
name: update
description: Check for and install new or updated skills from the upstream kit.
argument-hint: ""
allowed-tools: Bash, Read, Write
---

# Update

Check the upstream kit (https://github.com/prpmdev/my-portfolio-kit) for new or changed skills. You pick what to install. Raw base: `https://raw.githubusercontent.com/prpmdev/my-portfolio-kit/main/`

## Step 1: Compare

List remote skills (each `"type": "dir"` entry's `name` is a skill):

```bash
curl -s https://api.github.com/repos/prpmdev/my-portfolio-kit/contents/.claude/skills
```

If that fails or doesn't return a list: "Couldn't reach the upstream repo. Check your internet connection or try again later."

For each remote skill, compare its file to the local copy (ignoring line endings):

```bash
curl -fsS {raw_base}.claude/skills/[name]/SKILL.md -o /tmp/[name].md && diff -q --strip-trailing-cr /tmp/[name].md .claude/skills/[name]/SKILL.md
```

Status: **new** (no local file), **changed** (differs), **same**, or **skipped** (curl failed; never count it as changed). Local skills missing from the remote list are **not in upstream**.

## Step 2: Report and Ask

```
| Skill | Status |
|-------|--------|
| story-adapter | Changed |
| new-skill | New |
| some-skill | Couldn't fetch, skipped |
| old-skill | Not in upstream (removed upstream, or your own skill) |
```

If everything is the same: "All skills up to date. Nothing to do."

Ask: **All** (every new and changed skill) / **Pick** / **Skip**. Ask separately about each not-in-upstream skill; the default is keep.

## Step 3: Install

Before overwriting a changed skill, warn: "Your local `/[name]` differs from upstream. Any customizations will be overwritten." Offer to save the current file as `SKILL.md.backup` in the same directory.

```bash
mkdir -p .claude/skills/[name]
curl -fsS {raw_base}.claude/skills/[name]/SKILL.md -o .claude/skills/[name]/SKILL.md.new && mv .claude/skills/[name]/SKILL.md.new .claude/skills/[name]/SKILL.md
```

A failed fetch leaves the local file untouched; report it as skipped. Delete a not-in-upstream skill with `rm -r .claude/skills/[name]`.

End with a summary table: each skill and what happened (installed, updated, backup saved, skipped, kept, deleted).

## Never

- Force-update or auto-apply: install only what the user picked
- Overwrite a changed skill without the warning and the `SKILL.md.backup` offer
- Delete a skill without an explicit yes
- Touch CLAUDE.md (your config is yours), index.html, styles.css, or any content files
