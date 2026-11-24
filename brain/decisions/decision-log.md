# Decision Log

Add new decisions at the top. Format: date · decision · why · source.

| Date | Decision | Why | Source |
| --- | --- | --- | --- |
| 2026-11-24 | Hosting: **Vercel** static hosting for the Vite build; code in GitHub at `github.com/Project-Alpha-7/Project-SPPMS` (`main` branch, auto-deploy on push). | Free student tier, HTTPS, git integration, default `*.vercel.app` domain for the platform QR. Settles the hosting open question. | User request (chat) |
| 2026-11-24 | Customer side is a **responsive website** (PC, tablet, phone), not a mobile-app layout. Professional shared header and footer. Admin reachable at `/admin/` and linked from the footer. | User request | User, in chat |
| 2026-11-24 | Frontend built as a Vite multi-page site with vanilla JS modules and Tailwind (CDN), reusing the Stitch tokens. No React yet. | Fastest way to a working, responsive prototype on top of the Stitch HTML/Tailwind output. Moving to React is optional (see open questions). | Implementation choice |
| 2026-11-24 | Browser-only demo data layer (`src/js/store.js`) until the backend exists. Seed orders labelled demo, demo pricing rates, demo admin sign-in. | Makes the full lifecycle demonstrable now. It is designed to be swapped for Supabase calls. | Blueprint §11 rule 14 (label demo data) |
| 2026-11-24 | Order IDs look like `SP-YYYY-XXXXX` (random, unambiguous characters). Tracking links use a separate random 24-character token. | Unique and not sequential. The token is unguessable. | Blueprint §7.3, §11 |
| 2026-11-24 | Blueprint v2 is the source of truth over the PDF v1 | v2 is the later, revised scope (customer online ordering) | Blueprint §3.3 note |
| 2026-11-24 | Machine monitoring is an optional demo panel only, labelled as demo data | v2 puts real sensor data out of scope and forbids presenting simulated values as real | Blueprint §3.3, §11 rule 14 |
| 2026-11-24 | Use v2's production stages (Pre-Press … Delivered). v1's Design/Plate Making/Lamination/Cutting are folded into them. | One consistent stage model | See source-reconciliation |
| 2026-11-24 | Tracking URLs use unguessable tokens, not sequential Job IDs | Tracking security | Blueprint §7.3 |
| 2026-11-24 | Frontend tooling: Vite (already in repo). The recommended stack is React + Supabase (Option A). | Least custom backend for a short project | Blueprint §9.2; **stack not yet formally confirmed** |
