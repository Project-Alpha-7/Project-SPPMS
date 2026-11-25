# Design System (Google Stitch) and How the Site Uses It

Source: Google Stitch project `15747305669043123223` ("PressOS Print Management System").
Raw design notes (`design-system.md`, `theme.json`) were kept in `.stitch/import/`; that folder was
removed from the repo and working tree on 2026-11-24 — recover from git history (commit `4570964`)
if needed. The essentials are summarised below.

## Identity
- Brand in use: **PrintFlow** (customer site) / **PrintFlow OS** (admin console). Final naming is an open question.
- Style: Industrial Editorial Prepress
- CMYK accents: cyan `#219BC3`, magenta `#D9476B`, yellow `#F5D21B`, key black `#1B2427`
- Typography: Times New Roman in every type role
- 1px / 1.5px hairline borders, registration marks, CMYK strips, metric labels

## How the live site implements it
- `public/js/tw-config.js`: Tailwind config with every Stitch colour token mapped to `rgb(var(--c-<token>))`,
  plus the theme applied before first paint (saved choice, otherwise the OS preference).
- `public/css/site.css`: the token values for light (the Stitch originals) and `.dark` (Material 3 dark roles),
  plus shared `.btn`, `.field`, `.chip`, `.card`, `.cmyk-strip` and `.reg-mark` styles.
- The Stitch screens had a theme button that toggled a `dark` class with **no dark styles**, so it did nothing.
  The site's toggle now switches every token and remembers the choice (`localStorage` key `pf-theme`).
- **Customer pages are responsive web pages, not a mobile-app layout** (user decision, 2026-11-24): top header
  with full nav on desktop and a menu button below 1024px, full footer, max-width containers, and 1→2→3→4 column grids.

## Reference screens (16, unmodified, at `/design.html`)

| Desktop (1280) | Mobile (390) |
| --- | --- |
| Admin Dashboard Overview | Home |
| Production Workflow & Digital Job Cards | Product Catalogue |
| Print Specification, Preflight & Order Tracking | Product Configurator |
| Admin Login | Artwork Upload |
| Order Management | Checkout |
| Payments | Order Confirmation |
| Inventory | Order Tracking |
| Reports | Account & Order History |

The 10 screens after the first six were generated in Stitch on 2026-11-24 with the user's approval, then imported with
`scripts/import-stitch-screens.mjs`.

## Content in the Stitch screens that the site deliberately does NOT copy
- Prices in `$`. The site uses ₹ with GST.
- "Automated preflight checks", live machine telemetry, sensor readings, ISO/FOGRA claims, WhatsApp alerts. These conflict
  with scope (see `04-architecture/business-rules.md` rule 14 and `00-overview/scope.md`).
- Made-up KPIs. Dashboard numbers come from the data layer, and demo orders are labelled.

## Logo
The Stitch logo is served from an auth-gated URL (`lh3.googleusercontent.com/aida/...`), and the original importer noted it
is broken even in Stitch's own screenshots. `public/images/printflow-logo.svg` is a hand-made stand-in used by
the reference screens. The live site uses a simple icon mark (print icon with a CMYK underline) in `layout.js`.
A real logo is still needed (see open questions).
