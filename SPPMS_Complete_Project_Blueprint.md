# SPPMS

## QR-Based Online Printing Ordering & Management System

### Complete Product, Technical, Development, Testing and Demonstration Blueprint

**Project type:** Responsive web application\
**Primary users:** Customers, printing-press administrator and optional
production staff\
**Core promise:** Customers place printing orders online; the press
reviews, produces, tracks and delivers them through one connected
platform.\
**Hardware:** Not required for the core project.\
**Hosting:** Use the hosting provider's default domain initially.\
**Purpose:** This document is the single source of truth for project
scope, product structure, technical architecture, development stages,
team explanation, mentor explanation and final demonstration.

------------------------------------------------------------------------

# 1. Executive Summary

SPPMS is a QR-accessible online printing platform combined with a
printing-press order and production-management system.

A customer scans a QR code displayed by the printing press, opens the
hosted website, selects a printing product, configures its
specifications, uploads artwork, receives an estimated price, provides
delivery or pickup details and submits an order. The system generates a
unique Order ID.

The administrator receives the order in a protected Admin Dashboard. The
administrator reviews the specifications and artwork, then confirms the
order, requests modifications or rejects it. Once confirmed, the order
moves through:

**Pre-Press → Printing → Quality Check → Finishing → Packing → Ready for
Delivery → Dispatch → Delivered**

Customers can track permitted order milestones using their Order ID or a
secure tracking link. Important updates appear on the tracking page and
can optionally be sent as notifications.

The application has two main interfaces:

1.  **Customer Platform:** product catalogue, order configuration,
    artwork upload, estimate, checkout, order history and tracking.
2.  **Admin Platform:** order review, pricing control, production
    management, job cards, payments, inventory, delivery and reports.

The core deliverable is a reliable web application. ESP32, sensors and
physical machine integration are outside the required scope.

# 2. Product Vision and Objectives

## 2.1 Vision

Allow customers to order printing without visiting the press, while
giving the printing business a structured way to process every order
from enquiry to delivery.

## 2.2 Objectives

-   Provide QR-based access to the printing website.
-   Display products and configurable printing options.
-   Allow customers to upload print-ready artwork.
-   Calculate an estimate using administrator-configured pricing rules.
-   Capture customer, pickup and delivery information.
-   Record payment state safely.
-   Generate unique Order IDs and digital job cards.
-   Give administrators control over order review and production.
-   Show customers useful order milestones.
-   Maintain order history and basic operational reports.

## 2.3 Success criteria

The project is successful when this complete scenario works:

1.  Customer scans the QR code and opens the live website.
2.  Customer selects a product and its specifications.
3.  Customer uploads artwork.
4.  System calculates and displays an estimate.
5.  Customer submits the order and receives an Order ID.
6.  Admin logs in and reviews the order.
7.  Admin confirms it or requests a change.
8.  Admin advances the order through production stages.
9.  Customer tracking page reflects permitted updates.
10. Admin marks the order ready, dispatched and delivered.

# 3. Scope and Boundaries

## 3.1 Included in the core project

-   Responsive customer-facing website.
-   Customer registration/login or secure guest-order flow.
-   Admin login and role-based access.
-   Product catalogue.
-   Product specifications and options.
-   Artwork upload.
-   Configurable price estimation.
-   Order creation and unique Order ID.
-   Admin review: confirm, request modification or reject.
-   Production workflow and status history.
-   Digital job card.
-   QR code for website entry and/or individual order tracking.
-   Customer order tracking and order history.
-   Payment status management.
-   Basic in-app notifications.
-   Basic reports.
-   Deployment using a default hosting domain.

## 3.2 Optional enhancements

-   Payment gateway in test/sandbox mode.
-   Email notifications.
-   WhatsApp/SMS notifications.
-   Customer accounts and saved addresses.
-   Inventory records and low-stock alerts.
-   Downloadable invoice or job-card PDF.
-   Multiple staff roles.
-   Advanced analytics.

## 3.3 Explicitly out of scope for the student MVP

-   ESP32 and physical sensors.
-   Actual machine temperature/current measurement.
-   Automatic sheet counting from a real printing machine.
-   Automatic ink or paper-level detection.
-   Machine control or remote operation.
-   AI artwork correction or automatic pre-press approval.
-   Full accounting, tax filing or enterprise ERP.
-   Complex courier integrations.
-   Multi-branch support.

**Important:** Do not describe simulated machine values as real sensor
readings. The revised project is primarily an online ordering and
production-management platform.

# 4. Users, Roles and Permissions

## 4.1 Customer

A customer can: - Browse available products. - Configure product
specifications. - Upload artwork. - View the estimate and pricing
breakdown. - Enter contact and delivery/pickup details. - Submit an
order. - View their own orders. - Track their own order. - See payment
and production milestones. - Request a change before production begins,
subject to admin approval.

A customer must not be able to view another customer's private order,
uploaded artwork, address or payment details.

## 4.2 Administrator

An administrator can: - View all orders. - Review customer information
and uploaded artwork. - Verify specifications and price. - Confirm,
reject or request modifications. - Update payment state where
appropriate. - Create and update products and pricing rules. - Move
confirmed orders through production. - Generate and print job cards. -
Manage customers. - Manage basic inventory. - View alerts and reports. -
Manage staff accounts if included.

## 4.3 Production staff (optional)

Production staff can: - View assigned/confirmed job cards. - View job
specifications and approved artwork. - Update permitted production
stages. - Record quality-check results. - Add internal notes.

Production staff should not access payment configuration, user
administration or sensitive customer information unless explicitly
permitted.

## 4.4 Permission summary

  Capability                  Customer   Production Staff   Admin
  ------------------------ ----------- ------------------ -------
  Browse products                  Yes           Optional     Yes
  Create order                     Yes                 No     Yes
  View own order                   Yes      Assigned jobs     All
  View private artwork       Own order      Assigned jobs     All
  Confirm/reject order              No                 No     Yes
  Update production                 No    Assigned stages     Yes
  Manage prices/products            No                 No     Yes
  Manage payment state        View own                 No     Yes
  Manage users                      No                 No     Yes
  View reports                      No            Limited     Yes

# 5. End-to-End Business Workflow

## 5.1 Customer journey

**QR Scan → Website → Product Selection → Specifications → Artwork
Upload → Price Estimate → Delivery/Pickup Details → Payment Option →
Submit Order → Order ID**

The QR code can open the platform homepage. The customer can then create
an order.

## 5.2 Admin journey

**New Order → Review → Confirm / Request Modification / Reject →
Pre-Press → Printing → Quality Check → Finishing → Packing → Ready for
Delivery → Dispatch → Delivered**

## 5.3 Order status model

  Status                   Meaning
  ------------------------ --------------------------------------------
  Draft                    Customer has not submitted the order
  Submitted                Order has been sent to the press
  Under Review             Admin is checking details and artwork
  Modification Requested   Customer must correct or confirm something
  Confirmed                Admin has accepted the order
  Rejected                 Admin has declined the order
  In Production            Work has started
  Ready for Delivery       Production and packing are complete
  Dispatched               Order has left the press
  Delivered                Customer has received the order
  Cancelled                Order was cancelled under applicable rules

Keep order-level status separate from production-stage status. Payment
state should also be independent.

## 5.4 Production stages

1.  Pre-Press
2.  Printing
3.  Quality Check
4.  Finishing
5.  Packing
6.  Ready for Delivery
7.  Dispatch
8.  Delivered

Each stage can have: - Pending - In Progress - Completed - On Hold -
Issue

Store who changed the stage and when.

## 5.5 Modification and rejection flow

1.  Admin selects **Request Modification**.
2.  Admin enters a reason and instructions.
3.  Order status changes to Modification Requested.
4.  Customer sees the request.
5.  Customer uploads a corrected file or updates allowed details.
6.  Admin reviews the revised submission.
7.  Admin confirms or requests another change.

A rejection should include a reason. Do not silently delete rejected
orders.

# 6. Customer Platform: Pages and Features

## 6.1 Landing page

Purpose: explain the service and guide customers to start an order.

Suggested sections: - Brand/header and navigation. - Hero section with
"Start Your Printing Order". - Product categories. - How it works. -
Supported file formats. - Contact information. - Track an existing
order. - Footer with terms and privacy information.

## 6.2 Product catalogue

Initial product examples: - Visiting Card - Brochure - Flyer - Poster -
Invitation - Sticker - Banner - Custom Printing

Each product should have a description, sample image (optional),
available sizes, materials, finishing options and pricing configuration.

## 6.3 Product configuration

  -----------------------------------------------------------------------
  Field                               Example
  ----------------------------------- -----------------------------------
  Product                             Visiting Card

  Size                                90 × 54 mm

  Quantity                            500

  Material                            Art Card

  GSM                                 300

  Colour                              Full Colour

  Sides                               Single / Double

  Printing method                     Digital / Offset, if applicable

  Finish                              Matte / Gloss / None

  Additional finishing                Rounded corners, lamination,
                                      folding, binding, etc.
  -----------------------------------------------------------------------

Not every field applies to every product. Product-specific options must
be configurable.

## 6.4 Artwork upload

MVP requirements: - Accept PDF, JPG and PNG. - Enforce a configurable
file-size limit. - Validate extension and MIME type on the server. -
Show upload progress and clear errors. - Store files in private or
access-controlled storage. - Associate each file with the correct
order. - Allow admin to view/download artwork through a protected
link. - Allow replacement uploads when modification is requested.

Do not assume a file is print-ready simply because it uploaded
successfully. The admin performs the actual artwork/pre-press review.

Possible future checks: page dimensions, resolution, bleed, colour mode,
font embedding and PDF integrity. These are advanced checks and should
not be promised in the basic MVP.

## 6.5 Price estimate

Calculate an estimate from administrator-configured rules.

Possible price components: - Base product charge. - Quantity or
print-run charge. - Material/paper charge. - Printing charge. -
Finishing charge. - Design/pre-press charge, if applicable. - Delivery
charge. - Tax, if applicable.

Illustrative formula:

`Estimated Total = Base Charge + Material Charge + Printing Charge + Finishing Charge + Additional Charges + Delivery Charge`

Actual formulas vary by product and printing press. Do not invent
universal printing rates.

Important pricing behaviour: - Show the estimate before order
submission. - Store a snapshot of the calculated price with the order. -
Admin can review and adjust the final quote. - If the admin changes the
quote, record the reason and show the revised amount to the customer. -
Clearly label the amount as an estimate until the press confirms it.

## 6.6 Delivery and pickup

Capture: - Customer name. - Phone number. - Email (based on the chosen
notification method). - Delivery or pickup choice. - Address and PIN
code for delivery. - Preferred delivery date (a request, not a
guaranteed promise). - Customer notes.

## 6.7 Payment

For the student MVP, keep payment scope controlled.

Possible modes: 1. Pay at pickup. 2. Cash/manual payment recorded by
admin. 3. Advance payment. 4. Full online payment through a gateway.

If a real gateway is integrated: - Use the provider's test/sandbox
environment first. - Never store card numbers, CVV or banking
credentials. - Verify payment results on the backend using a trusted
gateway response/webhook. - Do not mark an order paid merely because the
browser returns to a success page. - Store transaction reference,
amount, currency and payment status. - Handle failed, pending,
successful and refunded states.

If gateway credentials or approval are unavailable, implement a clearly
labelled demo/manual payment flow. Do not claim that real online payment
is enabled.

# 7. QR Code and Order Tracking

## 7.1 Two possible QR uses

**Platform QR:** One general QR code printed by the press. It opens the
website homepage or order-start page.

**Order QR:** A unique QR code generated for a particular order. It
opens that order's tracking page.

Implement the platform QR first. The order-specific QR is an optional
enhancement.

## 7.2 Hosting domain

A purchased domain is not required for the student project.

Example:

`https://your-project-host.example/`

Platform QR:

`https://your-project-host.example/`

Order tracking:

`https://your-project-host.example/track/<secure-token>`

The QR code stores a URL, not the entire order record. The website uses
the URL to request permitted information.

The actual deployed hosting URL must be used when generating the final
QR. If the deployment URL changes, regenerate or update the QR.

## 7.3 Tracking security

-   Prefer an unpredictable tracking token over exposing sequential
    database IDs.
-   Do not show full address, phone number, payment identifiers or
    private artwork on a public tracking page.
-   Display only information needed to identify progress.
-   Allow tracking through login or a secure tracking link.
-   Do not expose admin routes through the QR.
-   Rate-limit repeated tracking requests where practical.

## 7.4 Customer tracking page

Display: - Order ID. - Product. - Quantity. - Order date. - Current
order status. - Production milestones. - Expected completion/delivery
date, if confirmed. - Payment status summary. - Admin message or
modification request, if applicable.

# 8. Admin Platform: Pages and Features

## 8.1 Admin dashboard

Suggested KPI cards: - New Orders - Under Review - Confirmed Orders - In
Production - Ready for Delivery - Dispatched - Pending Payments

Suggested sections: - Recent orders. - Orders requiring action. -
Production status summary. - Upcoming delivery dates. - Low-stock alerts
(if inventory is enabled). - Monthly order/revenue chart (only from
recorded data).

Dashboard numbers should come from the database or be clearly marked as
demo data.

## 8.2 Order management

Admin order list should support: - Search by Order ID/customer. - Filter
by status/date/product. - View order details. - View/download artwork
securely. - Review specifications. - Review estimated amount. - Confirm,
request modification or reject. - Add internal notes. - Update payment
state with an audit record. - View status history.

## 8.3 Order detail page

Recommended sections: 1. Order summary. 2. Customer and contact details.
3. Product specifications. 4. Uploaded artwork. 5. Price breakdown and
quote. 6. Payment information. 7. Production timeline. 8.
Delivery/pickup information. 9. Internal notes and activity history. 10.
Actions available to the current role.

## 8.4 Digital job card

Generate a printable job card after order confirmation.

Include: - Job/Order ID. - Customer name and contact (internal use). -
Product and quantity. - Size and material. - GSM. - Colour and side
selection. - Printing method. - Finishing requirements. - Approved
artwork reference. - Confirmed delivery date. - Payment/approval
state. - Production stage checklist. - Special instructions.

The job card is an operational document. Do not include unnecessary
sensitive payment data.

## 8.5 Production management

-   Show confirmed orders that need production.
-   Show current stage and stage owner (optional).
-   Allow authorised staff to update stages.
-   Record timestamps and user identity.
-   Allow issue/on-hold notes.
-   Prevent invalid stage transitions where practical.
-   Reflect permitted changes on customer tracking.

## 8.6 Inventory (optional MVP module)

Possible records: - Paper/material type. - Size. - GSM. - Quantity. -
Unit (ream, sheet, roll, piece, litre, etc.). - Minimum stock
threshold. - Last updated time.

Show low-stock warnings when quantity is below the configured threshold.

For the first version, stock can be updated manually. Automatic stock
deduction should only be implemented after the press defines reliable
consumption rules.

## 8.7 Reports

Useful basic reports: - Orders by day/month. - Orders by product. -
Orders by status. - Completed vs pending orders. - Total quoted
amount. - Recorded payments. - Outstanding balance. - Average order
completion time, if timestamps are captured.

Distinguish order value, paid amount and outstanding amount.

# 9. Recommended Technical Architecture

## 9.1 Logical architecture

``` text
CUSTOMER BROWSER                 ADMIN / STAFF BROWSER
       |                                  |
       +---------------+------------------+
                       |
                 WEB APPLICATION
                       |
                AUTHENTICATION
                       |
                  BACKEND/API
                       |
          +------------+-------------+
          |            |             |
       DATABASE    FILE STORAGE   REAL-TIME EVENTS
          |            |             |
          +------------+-------------+
                       |
              ORDER / PRODUCTION DATA
```

Customer and admin interfaces use the same backend and database, but
permissions determine what each role can read or change.

## 9.2 Suggested technology options

Choose one coherent stack. Avoid mixing tools without a reason.

**Option A: React + Supabase** - Frontend: React with Vite. - UI:
Tailwind CSS or another consistent component system. - Backend services:
Supabase Auth, Database and Storage. - Database: PostgreSQL. -
Real-time: Supabase Realtime. - Hosting: Vercel or Netlify for frontend;
Supabase for backend services.

**Option B: Next.js + Supabase** - Frontend and server routes:
Next.js. - UI: Tailwind CSS. - Authentication/database/storage/realtime:
Supabase. - Hosting: Vercel or another compatible platform.

**Option C: React + Node.js** - Frontend: React. - Backend: Node.js with
Express. - Database: PostgreSQL. - Real-time: Socket.IO or another
WebSocket service. - File storage: controlled object storage. - Hosting:
suitable frontend and backend hosting services.

For a short student project, **React + Supabase** is a practical option
because it reduces custom backend infrastructure. Authorization,
validation and secure data access still need to be implemented
correctly.

## 9.3 Real-time behaviour

Real-time means a meaningful update made by one authorised user appears
on another connected screen without requiring manual refresh.

Example:

`Admin updates Printing → Backend validates → Database saves → Real-time event is emitted → Customer tracking view updates`

Use real-time for: - Order status changes. - Production-stage changes. -
Admin order queue updates. - Modification requests.

Persist the update first, then notify connected clients. Do not rely
only on client-side state.

# 10. Data Model and Database Structure

A relational database is suitable.

## 10.1 Core entities

### users

-   id
-   full_name
-   email
-   phone
-   role
-   created_at

Authentication credentials should be handled by the authentication
provider, not stored as plain text in this table.

### products

-   id
-   name
-   description
-   category
-   active
-   image_reference
-   created_at

### product_options

-   id
-   product_id
-   option_name
-   option_value
-   active

Examples: size, material, GSM, colour, sides, printing method and
finishing.

### orders

-   id
-   order_number
-   customer_id (nullable for guest flow)
-   product_id
-   quantity
-   specifications (structured fields or validated JSON)
-   delivery_method
-   delivery_address
-   requested_delivery_date
-   order_status
-   estimated_total
-   confirmed_total
-   currency
-   tracking_token
-   created_at
-   updated_at

### order_files

-   id
-   order_id
-   storage_path
-   original_filename
-   mime_type
-   file_size
-   uploaded_by
-   created_at

### order_status_history

-   id
-   order_id
-   old_status
-   new_status
-   changed_by
-   note
-   created_at

### production_stages

-   id
-   order_id
-   stage_name
-   stage_status
-   sequence_number
-   assigned_to (optional)
-   started_at
-   completed_at
-   updated_by

### quotes

-   id
-   order_id
-   subtotal
-   additional_charges
-   delivery_charge
-   tax_amount (if applicable)
-   total
-   quote_status
-   created_by
-   created_at

### payments

-   id
-   order_id
-   provider
-   transaction_reference
-   amount
-   currency
-   payment_status
-   paid_at
-   created_at

Never store card data or CVV.

### inventory_items (optional)

-   id
-   item_name
-   category
-   quantity
-   unit
-   minimum_quantity
-   updated_at

### notifications

-   id
-   user_id
-   order_id
-   title
-   message
-   read_at
-   created_at

### audit_logs

-   id
-   actor_id
-   action
-   entity_type
-   entity_id
-   details
-   created_at

## 10.2 Data design principles

-   Use generated primary keys.
-   Enforce unique Order IDs.
-   Use foreign keys between related records.
-   Store timestamps consistently, preferably UTC.
-   Store money as integer minor units (such as paise) or
    fixed-precision decimal, not floating point.
-   Store a price snapshot with each order so later price changes do not
    rewrite old orders.
-   Keep status history.
-   Use private storage for customer artwork.
-   Index common search/filter fields such as order number, customer ID,
    status and created date.

# 11. Core Business Rules

1.  Every submitted order must receive a unique Order ID.
2.  A customer may view only their own orders unless using a secure,
    deliberately limited tracking link.
3.  An order is not confirmed until an authorised admin confirms it.
4.  The estimate is not a final quote until the press confirms it.
5.  Production should not begin before order confirmation and required
    artwork approval.
6.  Every important status change must be timestamped.
7.  A modification request must include a reason or instruction.
8.  Rejected and cancelled orders must remain in the record.
9.  Payment status must be independent of production status.
10. A payment is marked successful only after trusted server-side
    verification or authorised manual confirmation.
11. Customer tracking must not reveal internal notes or private
    information.
12. Only authorised roles can update production stages.
13. The deployed QR must point to the actual live hosting URL.
14. Demo/simulated data must be labelled as demo data.

# 12. API / Functional Service Outline

Exact endpoints depend on the selected framework. These are the required
operations.

## Customer operations

-   List active products.
-   Read product configuration.
-   Create an order.
-   Upload artwork.
-   Read own orders.
-   Read permitted tracking information.
-   Submit a modification response.
-   Read notifications.

## Admin operations

-   Read/filter all orders.
-   Read order detail and artwork.
-   Confirm an order.
-   Request modification.
-   Reject an order.
-   Create/update product and price configuration.
-   Update quote.
-   Update payment state where authorised.
-   Create/update production stages.
-   Generate job card.
-   Manage inventory.
-   Read reports.

## System operations

-   Generate unique Order ID.
-   Generate tracking token.
-   Calculate estimate.
-   Record status history.
-   Publish real-time update.
-   Verify payment gateway event, if integrated.
-   Enforce access control and validation.

All privileged operations must be authorised on the server/database
layer. Hiding a button in the UI is not security.

# 13. UI/UX Design Direction

## 13.1 Overall visual direction

Professional print-industry SaaS interface: clean, confident, functional
and easy to understand.

Suggested palette: - Deep navy for navigation and primary structure. -
White or light grey for content surfaces. - Cyan/blue accent for primary
actions and active states. - Green for completed/success. - Amber for
pending/attention. - Red for errors/rejected/critical issues.

## 13.2 Customer interface

Prioritise: - Simple step-by-step ordering. - Clear product cards. -
Easy-to-understand specification controls. - Upload feedback and file
information. - Visible price estimate. - Clear delivery/pickup
selection. - Strong order confirmation page. - Mobile-first tracking
page.

## 13.3 Admin interface

Prioritise: - Sidebar navigation. - Summary cards. -
Searchable/filterable order table. - Clear order detail view. -
Production timeline. - Artwork preview/download. - Job card action. -
Payment and delivery state. - Alerts and recent activity.

## 13.4 Responsive requirements

-   Customer ordering must work well on mobile.
-   QR landing and tracking pages must be mobile-friendly.
-   Admin dashboard should work on desktop and tablet.
-   Tables should adapt to smaller screens without hiding essential
    actions.
-   Forms must have clear labels, validation and error messages.

# 14. Development Plan: Build in Controlled Stages

## Stage 1 --- Confirm requirements

Tasks: - Confirm product list. - Confirm fields for each product. -
Confirm order statuses. - Confirm production stages. - Confirm
customer/admin permissions. - Confirm how the press calculates prices. -
Confirm payment mode. - Confirm whether guest ordering is allowed.

**Deliverable:** Approved MVP requirements.

## Stage 2 --- UX and screen design

Tasks: - Draw customer journey. - Draw admin journey. - Design landing
page. - Design product selection/configuration. - Design upload and
checkout screens. - Design customer tracking. - Design admin dashboard
and order detail. - Design production timeline and job card.

**Deliverable:** Approved screen layouts and navigation.

## Stage 3 --- Project foundation

Tasks: - Create repository and project. - Configure environment
variables. - Set up frontend and backend services. - Connect database. -
Configure authentication. - Create development and production
environments.

**Deliverable:** Running application foundation.

## Stage 4 --- Authentication and permissions

Tasks: - Implement admin login. - Implement customer account or guest
flow. - Add role checks. - Protect admin routes. - Add server/database
access policies.

**Deliverable:** Secure role-separated access.

## Stage 5 --- Product catalogue and configuration

Tasks: - Create product records. - Add product-specific options. - Build
product listing. - Build configuration form. - Validate required fields.

**Deliverable:** Customer can select and configure a product.

## Stage 6 --- Artwork upload

Tasks: - Configure storage. - Add accepted file types and size limits. -
Upload and associate files with an order. - Add progress/error
feedback. - Add protected admin access to artwork.

**Deliverable:** Secure artwork upload and review.

## Stage 7 --- Pricing and order creation

Tasks: - Implement configurable price rules. - Show price breakdown. -
Save estimate snapshot. - Capture delivery/pickup information. - Create
order. - Generate unique Order ID. - Show confirmation screen.

**Deliverable:** Customer can submit a complete order.

## Stage 8 --- Admin order management

Tasks: - Build order list and filters. - Build order detail page. - Show
customer, specifications, files and estimate. - Add confirm, request
modification and reject actions. - Record status history.

**Deliverable:** Admin can process incoming orders.

## Stage 9 --- Production and job card

Tasks: - Build production-stage workflow. - Add stage status updates. -
Record user and timestamps. - Generate printable job card. - Reflect
production milestones in order tracking.

**Deliverable:** Confirmed orders can be managed through production.

## Stage 10 --- QR and customer tracking

Tasks: - Deploy to a stable host URL. - Generate platform QR. -
Implement secure order tracking route. - Add tracking token if
order-specific tracking is used. - Test QR scanning on real phones. -
Ensure tracking page exposes only permitted fields.

**Deliverable:** QR opens the platform and customers can track orders.

## Stage 11 --- Payment and notifications

Tasks: - Implement selected payment mode. - Add sandbox gateway only if
credentials and time are available. - Verify payment server-side. - Add
in-app status notifications. - Add email/WhatsApp only if integration is
approved and configured.

**Deliverable:** Payment state and customer updates work reliably.

## Stage 12 --- Inventory and reports

Tasks: - Add inventory records and thresholds if in MVP. - Add low-stock
alerts. - Build order and production summaries. - Add basic charts.

**Deliverable:** Basic operational visibility for the admin.

## Stage 13 --- Testing, deployment and handover

Tasks: - Run functional tests. - Test roles and permissions. - Test
uploads. - Test price calculations. - Test QR and tracking. - Test
payment outcomes. - Test mobile layout. - Fix critical issues. - Deploy
final version. - Prepare demo data and presentation script.

**Deliverable:** Deployed, tested student project.

# 15. Practical Timeline

The 10--14 working-day estimate is achievable only if scope is
controlled, the developer works consistently, and payment/notification
integrations do not become blockers.

  Work area                              Indicative time
  ------------------------------------ -----------------
  Requirements and UI design                   1--2 days
  Setup, database and authentication           1--2 days
  Products and order configuration             1--2 days
  Artwork upload and pricing                   1--2 days
  Admin order review                               1 day
  Production workflow and job card             1--2 days
  QR and tracking                                  1 day
  Payment and notifications                    1--2 days
  Testing, fixes and deployment                   2 days

**Target:** 10--14 working days for a controlled student MVP.\
**Safer schedule:** 15--20 working days if pricing rules, payment
gateway or customer requirements are unclear.\
**Commercial-grade version:** Requires additional hardening, operational
validation, security review, backups, monitoring and real printing-press
testing.

Do not promise a fixed completion date until product options, pricing
rules, payment mode and hosting are confirmed.

# 16. Testing and Acceptance Checklist

## Customer ordering

-   [ ] Customer can open the website from the QR code.
-   [ ] Product catalogue loads.
-   [ ] Product-specific options are correct.
-   [ ] Required fields are validated.
-   [ ] Supported files upload successfully.
-   [ ] Invalid file types are rejected.
-   [ ] Price estimate is correct for agreed test cases.
-   [ ] Order submission creates one order only.
-   [ ] Unique Order ID is generated.
-   [ ] Confirmation page displays correct order information.

## Admin

-   [ ] Admin login works.
-   [ ] Customer cannot access admin pages.
-   [ ] New order appears in admin list.
-   [ ] Admin can inspect order specifications.
-   [ ] Admin can securely access uploaded artwork.
-   [ ] Confirm action works.
-   [ ] Modification request works and is visible to customer.
-   [ ] Rejection requires a reason.
-   [ ] Status history records changes.

## Production and tracking

-   [ ] Production stages appear in the correct order.
-   [ ] Only authorised roles can update stages.
-   [ ] Stage updates persist after refresh.
-   [ ] Customer sees permitted updates.
-   [ ] Internal notes remain private.
-   [ ] Tracking token cannot be easily guessed.
-   [ ] QR opens the correct route on a phone.

## Payment

-   [ ] Pending, successful and failed states are handled.
-   [ ] Browser redirect alone cannot mark payment successful.
-   [ ] Duplicate payment events do not create duplicate records.
-   [ ] Manual payments are clearly identified as manually verified.

## Deployment

-   [ ] Production environment variables are configured securely.
-   [ ] Database access policies are enabled.
-   [ ] Artwork storage is protected.
-   [ ] Application works on mobile and desktop.
-   [ ] QR uses the final deployed URL.
-   [ ] Error states are understandable.
-   [ ] Demo data is clearly labelled.

# 17. Security, Privacy and Reliability

Minimum safeguards: - Use a trusted authentication provider. - Enforce
role-based access in backend/database policies. - Validate all input on
the server. - Restrict file types and file sizes. - Store uploads in
private storage. - Use short-lived signed links for private artwork
where supported. - Never expose service-role keys or payment secrets in
frontend code. - Use environment variables for secrets. - Use
unpredictable tracking tokens. - Avoid exposing customer private
information in public tracking. - Record important admin actions. - Back
up the database before major changes. - Handle network errors and
duplicate submissions. - Use HTTPS in deployment. - Provide a privacy
notice and basic terms for real customer data.

This is a student prototype, not automatically a production-certified
payment or enterprise system. Real commercial use requires further
security, privacy, legal and operational review.

# 18. Deployment and Hosting

## 18.1 Student deployment

A typical low-cost setup: - Frontend hosted on a platform offering a
default subdomain. - Database/auth/storage hosted by the selected
backend provider. - Environment variables configured in the hosting
dashboard. - HTTPS enabled by the host. - QR generated from the final
hosted URL.

A custom domain is optional.

## 18.2 Deployment sequence

1.  Create production database/project.
2.  Apply database schema and access policies.
3.  Configure storage permissions.
4.  Configure production environment variables.
5.  Deploy frontend/backend.
6.  Create the initial admin account securely.
7.  Add product and pricing configuration.
8.  Create sample orders.
9.  Test customer and admin flows.
10. Generate the final platform QR.
11. Scan it from multiple phones.
12. Verify tracking and permissions.

# 19. Final Demonstration Script

Use one realistic order throughout the demonstration.

**Scenario:** A customer wants 500 visiting cards.

1.  Show the QR code.
2.  Scan it using a phone.
3.  Open the printing website.
4.  Select Visiting Card.
5.  Select size, quantity, paper, GSM, colour and finishing.
6.  Upload a sample PDF.
7.  Show the estimated price.
8.  Enter delivery/pickup details.
9.  Select the demo payment option or sandbox payment.
10. Submit the order.
11. Show the generated Order ID.
12. Log in to the Admin Dashboard.
13. Open the new order.
14. Review specifications and artwork.
15. Confirm the order.
16. Generate/open the digital job card.
17. Move the order to Pre-Press.
18. Update Printing, Quality Check and Finishing.
19. Show the customer tracking page updating.
20. Mark Packing and Ready for Delivery.
21. Mark Dispatched and Delivered.
22. Show the completed order in order history/reports.

Use test data only. Do not use a real customer's private file or payment
details during a public demonstration.

# 20. How to Explain the Project to the Mentor

> Our project is a QR-Based Online Printing Ordering and Management
> System. It allows customers to place printing orders online without
> visiting the printing press. Customers scan a QR code to open the
> website, select a printing product, enter specifications, upload their
> design, view an estimated price and submit the order.
>
> The system generates a unique Order ID. The administrator receives the
> order in a separate Admin Dashboard, where the order and artwork can
> be reviewed. The administrator can confirm the order, request
> modifications or reject it.
>
> Once confirmed, the order moves through Pre-Press, Printing, Quality
> Check, Finishing, Packing, Dispatch and Delivery. Customers can track
> important order milestones through the website.
>
> The system combines online ordering with digital production
> management. The QR code is simply a link to the hosted website or
> tracking page. A purchased domain and physical machine sensors are not
> required for the core project.

# 21. Simple Explanation for the Student

Think of the project as an online shop specifically for printing
services.

-   The customer uses the website to tell the printing press what they
    want.
-   The customer selects the product and specifications.
-   The customer uploads the design.
-   The system calculates an estimated price.
-   The press receives the order.
-   The administrator checks whether the order can be produced.
-   The production team completes the work stage by stage.
-   The customer checks progress online.
-   The press delivers the completed order.

**Customer side = Place and track an order.**\
**Admin side = Review, manage and produce the order.**\
**Database = Stores and connects the information.**\
**QR code = Opens the website or tracking page.**

# 22. Project Presentation / PPT Structure

Use one topic per slide. Keep slides visual and concise.

1.  Title: SPPMS.
2.  Problem: Manual printing orders and tracking.
3.  Proposed solution.
4.  Project objectives.
5.  Overall system architecture.
6.  Customer journey.
7.  Product selection and specifications.
8.  Artwork upload and price estimation.
9.  Admin dashboard.
10. Order review and approval.
11. Production workflow.
12. Digital job card.
13. QR code and order tracking.
14. Database and real-time updates.
15. Technology stack.
16. Development stages.
17. Testing and results.
18. Future scope.
19. Live demonstration.
20. Conclusion.

# 23. Future Scope

After the student MVP works reliably, the system can be extended with: -
Actual printing-press business onboarding. - More product-specific
pricing models. - Automated PDF pre-flight checks. - Advanced artwork
proof approval. - Customer email/WhatsApp notifications. - Online
invoices and receipts. - Courier integrations. - Stock consumption
rules. - Staff assignment and production scheduling. - Multi-branch
operations. - Machine/IoT integration if a real business requires it. -
Analytics for production efficiency and profitability.

These are future enhancements, not requirements for the first delivery.

# 24. Final Build Priorities

## Must work

1.  Customer website.
2.  Product selection and specifications.
3.  Artwork upload.
4.  Price estimate.
5.  Order creation and unique Order ID.
6.  Admin login and order management.
7.  Confirm / modification / reject flow.
8.  Production-stage management.
9.  Customer order tracking.
10. QR access using the deployed host URL.
11. Database persistence.
12. Basic security and deployment.

## Add if time permits

1.  Real payment gateway.
2.  Email notifications.
3.  Printable job card.
4.  Inventory and low-stock alerts.
5.  Reports and charts.
6.  Customer account and order history.

## Do not spend time on initially

1.  ESP32 and sensors.
2.  Machine automation.
3.  AI artwork correction.
4.  Advanced ERP/accounting.
5.  Multi-branch support.
6.  Complex courier integrations.

# 25. Final Product Definition

**SPPMS is a QR-accessible online printing platform that enables
customers to configure and submit printing orders digitally, while
allowing the printing press to review orders, manage production stages,
track payments and coordinate delivery through an Admin Dashboard.**

Its core flow is:

**Customer → QR Scan → Product Selection → Specifications → Artwork
Upload → Estimate → Order → Admin Review → Production → Quality Check →
Finishing → Packing → Dispatch → Delivery**

The project should be built software-first, with a clear customer
experience, a functional admin workflow, secure data handling and a
reliable end-to-end demonstration.

**Guiding development principle: Complete the full order lifecycle
first. Add optional integrations only after that lifecycle works
correctly.**
