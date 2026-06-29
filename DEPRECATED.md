# DEPRECATED — repo-root site files are NOT the live site

**The live `www.wabaytech.com` is served from [`dist-cyber/`](./dist-cyber/), which is the
single source of truth. See [`dist-cyber/README.md`](./dist-cyber/README.md).**

The following **root** files are the original **Claude Design handoff export** (see
`README.md` — "handoff bundle from claude.ai/design"). They are **stale and not
deployed**, and they have **drifted** from the live site by weeks:

| Root file (stale)        | Live equivalent                | Status                                   |
| ------------------------ | ------------------------------ | ---------------------------------------- |
| `index.html`             | `dist-cyber/index.html`        | Stale (Jun 1). Different content & size. |
| `styles.css`             | `dist-cyber/styles.css`        | Stale (Jun 1). ~12 KB smaller, diverged. |
| `vercel.json`            | `dist-cyber/vercel.json`       | Generic; the real deploy config is in `dist-cyber/`. |
| `app.jsx`, `sections.jsx`, `logo-icons.jsx`, `tweaks-panel.jsx` | — | Design-tool prototype artifacts, never deployed. |
| `_build.py`              | —                              | One-shot Python HTML generator; not run on deploy. |

## Why they were kept (not deleted)

Evidence that the live deploy uses `dist-cyber/` and not these root files:

- The Vercel link (`.vercel/project.json` → project `vector-wabaytech`) lives **inside
  `dist-cyber/`**. The repo root has **no `.vercel/` link**.
- `dist-cyber/vercel.json` is the real no-build deploy config (`cleanUrls`, explicit
  no-build/no-install commands); the root `vercel.json` is the generic default.
- `README.md` documents the root as a Claude Design **prototype handoff bundle** (designs
  to recreate), not production source.
- Commit `ceed8ed` brought `dist-cyber/` under version control with the note: *"the live
  www.wabaytech.com had no source of truth in git."*

These root copies were **left in place rather than deleted** because the Vercel
dashboard's *Root Directory* setting cannot be read from the repository — it is the one
piece of proof not in git. If that setting points at `dist-cyber/` (which all repo
evidence indicates), the root files are safe to remove entirely.

## To finish the cleanup (owner action)

1. In the Vercel dashboard for project `vector-wabaytech`, confirm **Root Directory =
   `dist-cyber`** (or that the CLI deploys from inside `dist-cyber/`).
2. Once confirmed, the root `index.html`, `styles.css`, `vercel.json`, `*.jsx`, and
   `_build.py` can be deleted. Until then they remain as marked-deprecated history.

All future edits to the live site go in `dist-cyber/`.
