# Development Plan

Build in controlled stages. Each stage has a deliverable.

| # | Stage | Tasks | Deliverable |
| --- | --- | --- | --- |
| 1 | Confirm requirements | Product list, fields per product, order statuses, production stages, permissions, the press's pricing method, payment mode, guest ordering yes/no | Approved MVP requirements |
| 2 | UX and screen design | Customer and admin journeys, landing, configuration, upload/checkout, tracking, admin dashboard/detail, production timeline, job card | Approved layouts and navigation (partly done via Stitch) |
| 3 | Project foundation | Repo, env vars, frontend + backend services, database, auth config, dev + prod environments | Running foundation |
| 4 | Auth and permissions | Admin login, customer account or guest flow, role checks, protected admin routes, DB access policies | Secure role-separated access |
| 5 | Catalogue and configuration | Product records, options for each product, listing, config form, validation | Customer can configure a product |
| 6 | Artwork upload | Storage config, file types and size limits, link files to orders, progress/errors, protected admin access | Secure upload and review |
| 7 | Pricing and order creation | Price rules, breakdown, estimate snapshot, delivery/pickup capture, create order, unique Order ID, confirmation screen | Customer can submit a complete order |
| 8 | Admin order management | List + filters, detail page, confirm/modify/reject, status history | Admin processes incoming orders |
| 9 | Production and job card | Stage workflow, stage updates, user + timestamps, printable job card, milestones on tracking | Orders managed through production |
| 10 | QR and tracking | Deploy to a stable URL, platform QR, secure tracking route, token, phone scan tests, field exposure check | QR opens platform, customers can track |
| 11 | Payment and notifications | Chosen payment mode, sandbox gateway if possible, server-side verification, in-app notifications, email/WhatsApp only if approved | Payment state and updates work |
| 12 | Inventory and reports | Inventory + thresholds (if in MVP), low-stock alerts, summaries, basic charts | Operational visibility |
| 13 | Testing, deployment, handover | Functional, role, upload, pricing, QR, payment and mobile tests; fixes; final deploy; demo data + script | Deployed, tested project |

## Timeline

| Work area | Days |
| --- | --- |
| Requirements and UI design | 1–2 |
| Setup, database, auth | 1–2 |
| Products and order configuration | 1–2 |
| Artwork upload and pricing | 1–2 |
| Admin order review | 1 |
| Production workflow and job card | 1–2 |
| QR and tracking | 1 |
| Payment and notifications | 1–2 |
| Testing, fixes, deployment | 2 |

- **Target:** 10–14 working days for a controlled MVP.
- **Safer:** 15–20 days if pricing, payment or customer requirements are unclear.
- **Commercial grade:** needs hardening, security review, backups, monitoring and real press testing on top.

Don't promise a fixed date until product options, pricing rules and payment mode are confirmed
(hosting is settled: Vercel, see [deployment.md](deployment.md)).

## Progress
- [ ] Stage 1: requirements sign-off (see [../decisions/open-questions.md](../decisions/open-questions.md))
- [x] Stage 2: screen design. 16 Stitch reference screens, plus the responsive site implementing them.
- [x] **Frontend prototype (2026-11-24)**: every customer and admin screen for Stages 5–9 and 11–12 is built and
  works end to end on a browser-only demo data layer (`src/js/store.js`). This covers:
  - Catalogue and configurator with live estimate
  - Upload validation
  - Checkout, Order ID, tracking QR and live tracking
  - Admin confirm / modify / reject / cancel, quote changes, manual payments, production stages, job card, inventory and reports
  - Platform QR generator on the dashboard
- [x] **Repo + hosting foundation (2026-11-24)**: code pushed to
  `github.com/Project-Alpha-7/Project-SPPMS` (`main`, 195 files, blueprint + PDF preserved);
  `vercel.json` + `.nvmrc` added, `npm run build` and `npm run validate` green.
  Still pending: import the repo at vercel.com/new and complete the first deploy (unblocks Stage 10's QR step).
- [ ] Stage 3: project foundation for the backend (Supabase project, env vars in Vercel, dev/prod)
- [ ] Stage 4: real auth and roles (replaces the demo admin sign-in) and RLS policies
- [ ] Stages 5–9, 11–12 backend wiring: swap `store.js` functions for database/storage/realtime calls (the UI stays)
- [ ] Stage 6: private artwork storage with signed links (the prototype keeps only file metadata)
- [ ] Stage 10: deploy, generate the final platform QR from the live URL, scan-test on phones
- [ ] Stage 13: testing against `testing-checklist.md` on the real backend
