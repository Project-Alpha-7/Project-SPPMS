# SPPMS Brain

The project knowledge base for **SPPMS — QR-Based Online Printing Ordering & Management System**.
Read this folder before building, changing scope, or explaining the project.

## Source documents

| Source | Version | Status |
| --- | --- | --- |
| `SPPMS_Complete_Project_Blueprint.md` | v2: "QR-Based Online Printing Ordering & Management System" | **Source of truth** |
| `SPPMS_Project_Development_Structure.pdf` | v1: "Smart Printing Press Management & Monitoring System" | Earlier version. Use it only where v2 is silent. |

Where the two disagree, v2 wins. Each conflict and how it was settled is listed in
[00-overview/source-reconciliation.md](00-overview/source-reconciliation.md).

## Map

| Folder | What's inside |
| --- | --- |
| [00-overview](00-overview/) | Product definition, scope, the v1 vs v2 differences |
| [01-users-and-roles](01-users-and-roles/) | Customer, admin and staff roles, permission matrix |
| [02-workflows](02-workflows/) | Customer and admin journeys, order statuses, production stages, modification flow |
| [03-features](03-features/) | Customer platform, admin platform, pricing, payments, QR & tracking, inventory & machines |
| [04-architecture](04-architecture/) | Architecture, tech stack, real-time, data model, API operations, business rules, security |
| [05-design](05-design/) | UI/UX direction and the Stitch design system already imported |
| [06-delivery](06-delivery/) | Development stages, timeline, priorities, testing, deployment, demo, presentation |
| [07-future](07-future/) | Future scope |
| [08-tools](08-tools/) | Installed Claude skills and how to use them here ([skills-guide.md](08-tools/skills-guide.md)) |
| [decisions](decisions/) | Decision log and open questions for the press/mentor |

## One-line product definition

> SPPMS is a QR-accessible online printing platform. Customers configure and submit printing orders
> online, and the press reviews them, runs production stages, tracks payments and coordinates
> delivery from an Admin Dashboard.

**Guiding principle:** get the full order lifecycle working first. Add optional integrations only after that.

## Current repo state (as of 2026-11-24)

- **Git + hosting:** repo `github.com/Project-Alpha-7/Project-SPPMS` (`main`), deployed on **Vercel**
  (`vercel.json`, Vite preset, `cleanUrls`). Push to `main` = auto-deploy.
  See [06-delivery/deployment.md](06-delivery/deployment.md).
- **Working frontend prototype** (Vite multi-page, vanilla JS, Tailwind CDN):
  - Responsive customer website at `/` for PC, tablet and phone
  - Admin console at `/admin/`, linked from the footer
  - Light/dark theme across everything
  - The full order lifecycle works end to end: order → review → modification/confirm → production stages → live tracking
- **No backend yet.** A demo data layer in the browser (`src/js/store.js`, localStorage) stands in for the database,
  admin sign-in is a demo check, pricing uses demo rates, and press contact details are placeholders.
- 16 Stitch reference screens (8 desktop, 8 mobile) in `public/screens/`, browsable at `/design.html`.
  See [05-design/design-system.md](05-design/design-system.md).
- Next: backend (Stage 3–4: Supabase auth, DB, storage, realtime) replacing `store.js`.
  See [06-delivery/development-plan.md](06-delivery/development-plan.md).
