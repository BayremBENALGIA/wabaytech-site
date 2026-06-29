# dist-cyber/ — canonical WABAYTECH site (SOURCE OF TRUTH)

**This directory is the single source of truth for the live site `www.wabaytech.com`.**
It is a **hand-authored static site** — there is no build step. The files you see here
are exactly what is served. Edit `index.html` and `styles.css` **directly**; what you
commit is what ships.

## What this is

- A self-contained static site: `index.html` + `styles.css` + local assets, fonts via
  Google Fonts CDN. No bundler, no `npm`, no framework, no compile pass.
- Deployed on **Vercel project `vector-wabaytech`** (org `team_Dy5ONmm9SurVXQGEAUOp9ou9`,
  project `prj_9J35qKisb6jneJCWDJULEyZsYupT` — see `.vercel/project.json`, which is
  gitignored).
- `vercel.json` here pins a no-build deploy: `buildCommand "echo no-build"`,
  `installCommand "echo no-install"`, `outputDirectory "."`, `cleanUrls true`.
- Domain `wabaytech.com` (OVH DNS).

## How to edit

1. Edit `index.html` / `styles.css` in this directory directly.
2. All asset references are relative or root-relative and resolve to files **in this
   directory** (`styles.css`, `intro-bg.webm`, `assets/wab-logo-x.png`, `/favicon.ico`,
   `proxeco-wordmark-hd.png`, …). Keep new assets inside `dist-cyber/`.
3. Commit. No build is required or run on deploy.

## Brand (cyberpunk neon — do not drift)

- Background `#04060c` (near-black); panels `#0a0f1c` / `#0c1322`.
- Accents: cyan `#19e3ff`, magenta `#ff2bd0`, violet `#a45bff` (plus lime `#52ff9e`,
  amber `#ffb454`).
- Text `#e8f3fb` / muted `#9fb2c4`.
- Display font **Orbitron**; sans **Geist**; mono **JetBrains Mono**.
- Default theme dark (`data-theme="dark"`); a light variant exists.
- No emojis in the UI.

## Relationship to the repo root

The repo **root** (`../index.html`, `../styles.css`, `../*.jsx`, `../vercel.json`) is the
**original Claude Design handoff export** (see `../README.md`). Those root files are
**stale / not deployed** — they predate the live site by weeks and have diverged. See
`../DEPRECATED.md`. **Do not edit the root copies expecting them to ship — they do not.**
This directory is the live site.

## Render check

Verified: every local asset referenced by `index.html` exists in this directory; there
are no absolute `file://`, `localhost`, or Windows-path references. Served with this
directory as the web root, the site renders with all assets resolving.
