# My Portfolio Kit

**Build a portfolio that stays alive.**

Building a portfolio got cheap. Keeping it current didn't. You ship something, switch jobs, and three months later your site is stale, off-voice, or quietly naming a client you weren't supposed to name. This Claude Code plugin turns your real work into case studies in *your* voice, flags what you may not be allowed to share, builds a simple one-page site, and keeps it current as things change.

For people with real work worth showing: PMs, marketers, consultants, and builders. No coding required. You talk; the skills do the work.

## Install

In Claude Code (not yet tested in claude.ai chat or Cowork):

```
/plugin marketplace add prPMDev/my-portfolio-kit
/plugin install portfolio-kit@portfolio-kit
```

When it asks where to install, pick **Install for you (user scope)**.

Then open Claude Code in a new, empty folder; that folder is your portfolio. The skills save everything there as files and pick up from them in later sessions. In the desktop app, choose the folder when you start a session. In a terminal: `mkdir my-portfolio && cd my-portfolio && claude`.

## Try it

Say these in order, in your own words. Each one starts the matching skill.

1. **"Help me build my portfolio."** Setup asks for your name, contact, and anything you've already written.
2. **"Find my voice. Here are two posts I wrote: …"** Captures how you actually write.
3. **"Turn this into a case study: at my last job, onboarding took six weeks, so I …"** Shapes the story, flags names and numbers you may not be able to share, and saves it.
4. **"Build my page."** Builds a one-page site in `site/` and shows you how to put it online free.
5. **Later: "I shipped something new: …"** or **"My title changed to …"** Updates the case studies and the page, then tells you to re-upload `site/`.

## What's inside

| Skill | What it does |
|-------|--------------|
| **setup** | Sets up your profile: name, role, contact, what you're looking for, and anything you've written. Start here. |
| **find-my-voice** | Extracts your writing voice from things you've already written, or from a short interview if you haven't written anything. Everything else is written to match it. |
| **story-adapter** | Turns raw work into on-voice case studies. Flags client names, colleagues, codenames, and confidential numbers, and suggests safer wording you can accept or change. |
| **assemble** | Builds your approved content into a plain `index.html` + `styles.css` you can open, then shows how to put it online free, no terminal. |
| **refresh** | Keeps it current when you ship, change roles, take something down, or something becomes public. |

## What it creates and what it sends

Everything stays in the folder you work in:

| File or folder | What's in it | Goes online? |
|----------------|--------------|--------------|
| `CLAUDE.md` | Your profile, voice profile, and privacy choices | No |
| `source/` | The résumé, writing samples, notes, and interview answers you share | No |
| `case-studies/` | Your approved case studies (the page shows each one's title and summary) | No |
| `ANONYMIZATION-LEDGER.md` | The real names and numbers behind anything hidden, so refresh can restore them later | No, never |
| `.gitignore` | Keeps `CLAUDE.md`, `source/`, and the ledger out of git | No |
| `site/` | `index.html` + `styles.css`: your page | Yes, when you upload it yourself |

The skills don't call outside services. They only open a web page if you give one a link (for example, a post for find-my-voice to read). Your material stays in this folder and in your conversation with Claude. Publishing is a step you take yourself: drag the `site/` folder to a free host. Never upload the whole folder.

The sensitivity check is a careful checklist, not legal review. Check your employer's and clients' confidentiality rules before you publish.

## Troubleshooting

- **Setup won't write anything.** It only works in an empty folder or one that already holds your portfolio. If the folder has a code project or another `CLAUDE.md`, open a new empty folder and say "help me build my portfolio" again.
- **A skill doesn't start from your words.** Name it ("run story-adapter"), or type `/portfolio-kit:story-adapter`.
- **"Build my page" asks for a story first.** It needs at least one approved case study in `case-studies/`.
- **The page shows something you wanted hidden.** Tell refresh what should be hidden or taken down. It fixes the case study and the page and logs the change in the ledger.
- **The live site didn't change.** The skills only update `site/` on your computer. Upload the `site/` folder to your host again.
- **New session, nothing remembered.** Open the same folder. Your profile, material, and case studies are saved there, and the skills pick up from them.

## Support

Questions, bugs, or ideas: [open an issue](https://github.com/prPMDev/my-portfolio-kit/issues).

## The full kit (clone the repo)

The plugin is the lean starter. This repo also holds a fuller kit with extra skills for copywriting, site building, SEO, and a final quality gate. The plugin doesn't load them; their files come along with it but stay unused. To use them, clone the repo. Two of them can run terminal commands: web-content-optimizer checks image sizes, and website-expert pushes your site to GitHub Pages when you ask it to deploy. The clone doesn't include assemble; there, `/website-expert` builds the page in the repo's own `index.html`.

```bash
git clone https://github.com/prpmdev/my-portfolio-kit.git my-portfolio
cd my-portfolio
claude
/setup
```

Or: **[Download ZIP](https://github.com/prpmdev/my-portfolio-kit/archive/refs/heads/main.zip)** | **[Fork](https://github.com/prpmdev/my-portfolio-kit/fork)**

| Type | Skills |
|------|--------|
| **Builder** | `/setup`, `/find-my-voice`, `/content-strategist`, `/story-adapter`, `/portfolio-copywriter`, `/anonymizer`, `/website-expert`, `/refresh` |
| **Evaluator** | `/voice-guardian`, `/web-content-optimizer`, `/quality-check` |
| **Meta** | `/skill-improver` |

To get the latest skills, run `git pull` in the folder. If you've edited a skill that also changed in the kit, git stops and tells you; keep your copy or take the new one.

## Philosophy

- Content first, design later
- B+ ships — don't wait for perfect
- Your skills, your control

## License

MIT

---

Built by [Prashant Rana](https://github.com/prPMDev)
