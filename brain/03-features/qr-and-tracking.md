# QR Codes and Order Tracking

## Two kinds of QR
- **Platform QR** (build first): one general QR printed by the press. It opens the homepage or the order-start page.
- **Order QR** (optional): a unique QR for each order. It opens that order's tracking page.

A QR stores a **URL**, not the order data.

```text
Platform QR:  https://<host-default-domain>/
Order QR:     https://<host-default-domain>/track/<secure-token>
```

- Use the hosting provider's default domain. No purchased domain is needed, and a custom domain can be added later.
- Generate the final QR from the **actual deployed URL**. If the URL changes, regenerate it.
- Test scans on real phones.

## Tracking security
- Use an **unpredictable tracking token**, not sequential database IDs. (v1's `/track/PT-2026-001` is
  only an example and should not be implemented that way.)
- Never show the full address, phone number, payment identifiers or private artwork on the public tracking page.
- Show only what's needed to follow progress.
- Allow tracking through login or a secure tracking link.
- Don't expose admin routes through the QR.
- Rate-limit repeated tracking requests where practical.

## Tracking page shows
Order ID · product · quantity · order date · current order status · production milestones · expected
completion/delivery date (if confirmed) · payment status summary · admin message or modification
request (if any).

Mobile-first. Updates in real time when the admin changes a stage.
