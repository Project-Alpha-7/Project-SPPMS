# PrintFlow (SPPMS)

QR-based online printing ordering and management system. It has a responsive customer website (PC, tablet
and phone) and an admin console for the press. The project knowledge base is in [`brain/`](brain/README.md).

## Deployment (Vercel)

Source: [github.com/Project-Alpha-7/Project-SPPMS](https://github.com/Project-Alpha-7/Project-SPPMS) (`main`).
Vercel picks up `vercel.json` (Vite, build `vite build`, output `dist/`, `cleanUrls`). Pushing to `main`
redeploys. Node 22 (`.nvmrc`). Generate the admin platform QR **after** the first deploy — it encodes the
live URL. Details: [`brain/06-delivery/deployment.md`](brain/06-delivery/deployment.md).

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run validate  # structure, asset and design-token checks
```

| Where | URL |
| --- | --- |
| Customer website | `http://localhost:5173/` |
| Admin console | `http://localhost:5173/admin/`, also linked from the site footer ("Staff & admin login") |
| Stitch design reference | `http://localhost:5173/design.html` |

**Demo admin sign-in:** `admin@printflow.example` / `demo1234`. This is a demo only, with no real authentication yet.

## What works (prototype)

Customer site:
- Home, product catalogue, configurator with a live estimate (INR incl. GST), artwork upload (PDF/JPG/PNG, 25 MB, type checks)
- Checkout with validation, confirmation with Order ID and a tracking QR code
- Tracking page that updates live, and "My orders"
- Shared header (with a menu button on small screens), professional footer, and a light/dark theme toggle remembered per browser

Admin console:
- Sign-in, then a dashboard with KPIs, action queue, low-stock alerts and the platform QR
- Order list with search, filters and status tabs
- Order detail: confirm, request modification, reject, cancel, adjust quote, record payment, internal notes, history,
  production stage updates and a printable job card
- Production board, payments (value / paid / outstanding), inventory with manual adjustments, reports with CSV export

## Important: demo data layer

There is **no backend yet**. Orders, inventory and sessions are stored in the browser (`localStorage` /
`sessionStorage`), so data is per-browser and per-device. Live updates work between tabs of the same browser.
Seven seeded orders are marked **demo**, and admin has a **Reset demo data** button. Pricing uses **demo rates**
(`src/js/store.js`), and press contact details are placeholders (`SITE` in `src/js/layout.js`). The real backend
(Supabase auth, database, storage and realtime) is the next stage. See `brain/06-delivery/development-plan.md`.

## Project layout

```text
├── index.html, products.html, configure.html, upload.html, checkout.html,
│   confirmation.html, track.html, account.html, legal.html   # customer pages
├── admin/                       # admin console pages (index.html = sign-in)
├── design.html                  # gallery of the Stitch reference screens
├── src/js/
│   ├── layout.js                # header, footer, admin shell, theme toggle, helpers
│   ├── store.js                 # demo data layer: products, pricing, orders, inventory
│   ├── components.js, draft.js  # shared UI pieces, in-progress order
│   ├── pages/                   # one script per customer page
│   └── admin/                   # one script per admin page
├── public/
│   ├── js/tw-config.js          # Tailwind config + theme bootstrap (CSS-variable tokens)
│   ├── css/site.css             # light/dark design tokens, components
│   ├── screens/ screenshots/    # 16 Stitch reference screens (8 desktop, 8 mobile), unmodified
│   └── images/                  # Stitch images (manifest.json maps their original URLs)
├── scripts/validate.mjs, scripts/import-stitch-screens.mjs
├── .stitch/import/              # raw Stitch metadata + design system
└── vite.config.js               # multi-page build (all root and admin/ pages)
```

## Design system

"Industrial Editorial Prepress" from Google Stitch project `15747305669043123223`: Times New Roman, CMYK accents
(cyan `#219BC3`, magenta `#D9476B`, yellow `#F5D21B`, key `#1B2427`), 1px/1.5px hairlines and registration marks.
The site maps every Stitch colour token to CSS variables (`public/css/site.css`), so the light and dark themes
switch the whole UI.

To import more Stitch screens, run `node scripts/import-stitch-screens.mjs <list.json>`. It never overwrites existing files without `--force`.
