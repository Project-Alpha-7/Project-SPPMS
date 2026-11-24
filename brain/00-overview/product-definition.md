# Product Definition

## What it is

A responsive web application with two connected interfaces:

1. **Customer Platform**: product catalogue, order configuration, artwork upload, estimate, checkout,
   order history and tracking.
2. **Admin Platform**: order review, pricing control, production management, job cards, payments,
   inventory, delivery and reports.

- **Primary users:** customers, the printing-press administrator, and optional production staff
- **Core promise:** customers place printing orders online, and the press reviews, produces, tracks
  and delivers them on one platform.
- **Hardware:** not required.
- **Hosting:** the hosting provider's default domain. A purchased domain is not needed.

## Core flow

**Customer → QR Scan → Product Selection → Specifications → Artwork Upload → Estimate → Order →
Admin Review → Pre-Press → Printing → Quality Check → Finishing → Packing → Ready for Delivery →
Dispatch → Delivered**

## Vision

Customers can order printing without visiting the press, and the press gets a structured way to handle
every order from enquiry to delivery.

## Objectives

- QR-based access to the printing website.
- Show products and their configurable printing options.
- Let customers upload print-ready artwork.
- Calculate an estimate from pricing rules the admin sets.
- Capture customer, pickup and delivery details.
- Record payment state safely.
- Generate unique Order IDs and digital job cards.
- Give admins control over order review and production.
- Show customers useful order milestones.
- Keep order history and basic operational reports.

## Success criteria: the end-to-end scenario that must work

1. The customer scans the QR code and the live website opens.
2. The customer selects a product and its specifications.
3. The customer uploads artwork.
4. The system calculates and shows an estimate.
5. The customer submits the order and gets an Order ID.
6. The admin logs in and reviews the order.
7. The admin confirms it or requests a change.
8. The admin moves the order through the production stages.
9. The customer tracking page shows the permitted updates.
10. The admin marks the order ready, dispatched and delivered.

## Mental model (plain-language explanation)

Think of it as an online shop for printing services.

- **Customer side:** place an order and track it.
- **Admin side:** review, manage and produce the order.
- **Database:** stores the information and links it together.
- **QR code:** opens the website or the tracking page.

## Explanation for the mentor

> Our project is a QR-Based Online Printing Ordering and Management System. Customers can place
> printing orders online without visiting the press. They scan a QR code to open the website, pick a
> printing product, enter specifications, upload their design, see an estimated price and submit the
> order. The system generates a unique Order ID. The administrator receives the order in a separate
> Admin Dashboard and reviews the order and artwork, then confirms it, requests changes or rejects it.
> A confirmed order moves through Pre-Press, Printing, Quality Check, Finishing, Packing, Dispatch and
> Delivery, and customers can follow the main milestones on the website. The QR code is only a link to
> the hosted website or tracking page. The core project needs no purchased domain and no machine sensors.

Related: [scope.md](scope.md), [../02-workflows/](../02-workflows/)
