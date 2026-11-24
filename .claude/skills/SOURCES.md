# Third-party skills: provenance lock

Installed 2026-11-24, **project-scoped only** (this folder). Nothing was installed globally and no repo script was run.

## How they were installed
1. Each repo was shallow-cloned into an isolated temp folder with git hooks, symlinks, submodules and LFS downloads disabled.
2. Every candidate file was inventoried and pattern-scanned (shell pipes, downloads, credentials, cookies, exfiltration, prompt
   injection, auto-installs, hooks), and the hits were read in context.
3. Only skills that are **pure Markdown** (no scripts, no binaries, no frontmatter `hooks`, no `allowed-tools`) were copied,
   byte-identical to the reviewed commit.

## Installed

| Skill folders | Source repo | Commit reviewed | License |
| --- | --- | --- | --- |
| animate, animation-performance, animation-vocabulary, apple-design, ask-emil, break-ui, choreograph, emil-design-eng, find-animation-opportunities, gestures, improve-animations, learn-taste, mobile-native, pick-ui-library, prototype, remove-animations, review-animations | github.com/emilkowalski/skills `skills/` | `64eb3deb9a5fbfa041faf783e0bc3fd635872e9c` | MIT (`_licenses/emilkowalski-skills-LICENSE`) |
| ponytail, ponytail-audit, ponytail-debt, ponytail-help, ponytail-review | github.com/DietrichGebert/ponytail `skills/` | `ebd8654c2c627f721eb8f9c0d1bd4090a29f9e10` | MIT (`_licenses/DietrichGebert-ponytail-LICENSE`) |
| skill-inspector | github.com/NVIDIA/SkillSpector `skills/skill-inspector` | `79686b1ab67f660eb124aa558c295d08f6057a31` | Apache-2.0 (`_licenses/NVIDIA-SkillSpector-LICENSE`) |

Skipped from these repos as irrelevant to this stack: `animate-expo`, `write-swift`, `ask-sonner` (emilkowalski) and
`ponytail-gain` (reads benchmark files that aren't shipped with the skill).

## Reviewed and NOT installed

| Repo | Commit | Reason |
| --- | --- | --- |
| Leonxlnx/taste-skill | `6c0b5c78f5d31776e2210305abaa210cdc0030bf` | Frontmatter `Stop` hook auto-runs `node scripts/gate.mjs` (600 s timeout), launches browsers and uses the network. Needs Node 22 + Chrome. 36 MB of JS/asset bundles. Its visual direction would also override the project's Stitch design system. |
| pbakaus/impeccable | `b49177d32788f2dc585c42831d845dacf1ebed2c` | `scripts/impeccable` launcher downloads and executes a native platform binary (checksum-verified, but still remote code). |
| vercel-labs/skills (`find-skills`) | `57217cf86ba38148a57af9e90d14a4c049558330` | Instructs the agent to install further skills from the internet with `npx skills add`, bypassing this review process. |
| Graphify-Labs/graphify | `013a6461c31da6e003c0dea191aca84c94cb8d47` | Skill auto-installs a Python package (`uv tool install` / `pip install … --break-system-packages`) and executes it. |
| Panniantong/Agent-Reach | `a8ab1e9a2475957d759eac2dbedfe91b0a1e1021` | Requires its own CLI and copies site login cookies from Chrome into a dedicated browser. Social/web reading is outside this project's scope. |

## Updating or adding skills
Never run `npx skills add`, `install.sh`, or a repo's installer. Repeat the process above for the new commit (or ask
Claude to run `/skill-inspector` on the folder first), copy only the reviewed files, and update this table.
