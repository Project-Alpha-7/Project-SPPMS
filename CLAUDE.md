# CLAUDE.md

## Project
SPPMS: a QR-based online printing ordering and management system (student MVP). Customers configure
and order printing online. The press reviews orders, runs production stages and tracks delivery from
an admin dashboard.

## Read the brain first
`brain/` is the project's knowledge base and the source of truth for scope and design decisions.
- Start with `brain/README.md` (the index and current repo state).
- Before building a feature, read its file in `brain/03-features/` plus `brain/04-architecture/business-rules.md`.
- Schema work: `brain/04-architecture/data-model.md`. Status logic: `brain/02-workflows/`.
- Unresolved items: `brain/decisions/open-questions.md`. Don't guess answers to these (especially pricing rates). Ask.

## Keep the brain current
- When a decision is made, add it to `brain/decisions/decision-log.md` and tick or remove the matching open question.
- When a development stage finishes, update the Progress section of `brain/06-delivery/development-plan.md`.
- Update the "Current repo state" section of `brain/README.md` when the repo meaningfully changes.

## Hard rules
- Blueprint v2 wins over the PDF v1 (see `brain/00-overview/source-reconciliation.md`).
- Complete the full order lifecycle before any optional module (payments gateway, inventory, machine panel).
- Keep order status, production-stage status and payment status as three separate fields.
- Authorise in the backend/database (RLS), never only in the UI.
- Tracking URLs use unguessable tokens, never sequential IDs.
- Store money as integer paise, never floats.
- Label any simulated or demo data as demo data. Never present machine values as real sensor readings.
- Don't promise automated preflight checks in the MVP.

## Skills
- Project-scoped third-party skills live in `.claude/skills/` (provenance: `SOURCES.md`). How to use them: `brain/08-tools/skills-guide.md`.
- Brain rules override skill advice (vanilla JS, theme tokens, no automated-preflight claims, respect reduced motion).
- Never install skills with `npx skills add`, `install.sh` or repo installers. Review new ones in a temp folder with `/skill-inspector` first.

## Repo
- Vite multi-page site (`npm run dev`, `npm run build`, `npm run validate`). Customer pages are at the root, admin pages in `admin/`.
- Page scripts are in `src/js/pages/` and `src/js/admin/`. Shared code: `layout.js` (header, footer, theme), `store.js` (demo data layer), `components.js`.
- Theme tokens: `public/js/tw-config.js` + `public/css/site.css`. Use the token classes (`bg-surface`, `text-primary`…), never raw hex, so dark mode keeps working.
- Customer pages must stay responsive web pages (PC/tablet/phone), not mobile-app layouts. Use `minmax(0,1fr)` / `grid-cols-1` so wide tables can't overflow.
- `public/screens/` holds the 16 unmodified Stitch reference screens (`/design.html`). Don't edit them. Build in the site pages instead.
- `store.js` is a browser-only stand-in for the backend. Keep its function names when swapping in Supabase.
