# Customer Platform

## Landing page
Purpose: explain the service and get customers started on an order.
Sections: brand header and nav · hero with **"Start Your Printing Order"** · product categories · how it
works · supported file formats · contact info · **Track an existing order** · footer with terms and privacy.

## Product catalogue
Starting products: Visiting Card · Brochure · Flyer · Poster · Invitation · Sticker · Banner · Custom Printing.
Each product has a description, an optional sample image, available sizes, materials, finishing options and
a pricing configuration.

## Product configuration

| Field | Example |
| --- | --- |
| Product | Visiting Card |
| Size | 90 × 54 mm |
| Quantity | 500 |
| Material | Art Card |
| GSM | 300 |
| Colour | Full Colour |
| Sides | Single / Double |
| Printing method | Digital / Offset, if applicable |
| Finish | Matte / Gloss / None |
| Additional finishing | Rounded corners, lamination, folding, binding, etc. |

Not every field applies to every product, so the options for each product must be configurable.
Validate required fields.

## Artwork upload (MVP)
- Accept **PDF, JPG, PNG**.
- Enforce a configurable file-size limit.
- Check the extension **and** MIME type on the server.
- Show upload progress and clear errors.
- Store files in private, access-controlled storage, linked to the right order.
- The admin views and downloads files through a protected (short-lived signed) link.
- Allow replacement uploads when a modification is requested.

An uploaded file is **not** automatically print-ready. The admin does the actual pre-press review.
Checks to **not** promise in the MVP: page dimensions, resolution, bleed, colour mode, font embedding,
PDF integrity.

## Price estimate
See [pricing.md](pricing.md). Show it before submission and label it as an **estimate**.

## Delivery and pickup
Capture: name · phone · email (depending on the notification method) · delivery or pickup · address and
PIN code (for delivery) · preferred delivery date (a request, not a promise) · customer notes.

## Payment option
See [payments.md](payments.md).

## Confirmation page
Shows the Order ID, a summary of the order, the estimate and how to track it.

## Tracking and order history
See [qr-and-tracking.md](qr-and-tracking.md).

## UX priorities
Simple step-by-step ordering · clear product cards · easy spec controls · upload feedback · visible
estimate · clear delivery/pickup choice · strong confirmation page · mobile-first tracking.
