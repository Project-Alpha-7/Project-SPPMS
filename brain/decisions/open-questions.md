# Open Questions (Stage 1: confirm before building)

These need answers from the printing press or the mentor. Move each answer into
[decision-log.md](decision-log.md) once settled.

## Requirements (Blueprint Stage 1)
- [ ] Final product list. The prototype has all 8 (Visiting Card, Brochure, Flyer, Poster, Invitation, Sticker, Banner, Custom).
- [ ] Which configuration fields apply to each product, and what are the allowed values? (Prototype values in `src/js/store.js` `PRODUCTS` are placeholders.)
- [ ] Confirm the order statuses and production stages, or whether the press uses different names.
- [ ] Customer/admin/staff permissions. Is the production staff role in the MVP?
- [ ] **How does the press actually calculate prices?** The prototype uses clearly labelled **demo rates**, 18% GST and a ₹80 delivery charge. Replace them with the press's rules.
- [ ] Payment mode: pay at pickup, manual, advance or a sandbox gateway? (Prototype offers all three. Online is "demo mode".)
- [ ] Is guest ordering allowed, or are customer accounts required? (Prototype: guest checkout. "My orders" lists orders from this browser.)
- [ ] Notification method: in-app only, or email too? (Prototype requires email at checkout.)
- [x] Max artwork file size. 25 MB used in the prototype. Confirm with the press.
- [x] Currency: INR, stored in paise.

## Press details (placeholders in `SITE`, `src/js/layout.js`)
- [ ] Real phone, email, address, opening hours
- [ ] Real privacy notice and terms (`legal.html` holds draft placeholder text)

## Technical
- [ ] Confirm the backend: Supabase (auth, Postgres, storage, realtime) to replace `src/js/store.js`?
- [ ] Keep vanilla JS multi-page, or move the frontend to React? The current build works without React.
- [x] Hosting provider, which decides the default domain used for the platform QR (admin dashboard generates it from the current URL). **Settled 2026-11-24: Vercel** (see decision-log). Regenerate the QR after the first deploy.
- [ ] Are the inventory module and any machine demo panel in the MVP? (Inventory is built with manual updates. No machine panel.)

## Design
- [x] Visual identity: Stitch CMYK "Industrial Editorial Prepress" (Times New Roman). Implemented site-wide with light/dark themes.
- [ ] Brand name shown to customers: SPPMS or PrintFlow? (Site uses PrintFlow / PrintFlow OS.)
- [ ] A real logo. The current one is a stand-in (see 05-design/design-system.md).
- [x] Missing Stitch screens generated (10 on 2026-11-24) and imported as references.
