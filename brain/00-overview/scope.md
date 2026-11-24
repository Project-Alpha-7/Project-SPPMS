# Scope and Boundaries

## Included in the core project (MVP)

- Responsive customer-facing website
- Customer registration/login **or** a secure guest-order flow
- Admin login and role-based access
- Product catalogue, with specifications and options for each product
- Artwork upload
- Configurable price estimation
- Order creation with a unique Order ID
- Admin review: confirm, request modification or reject
- Production workflow and status history
- Digital job card
- QR code for website entry and/or tracking individual orders
- Customer order tracking and order history
- Payment status management
- Basic in-app notifications
- Basic reports
- Deployment on a default hosting domain

## Optional enhancements

- Payment gateway in test/sandbox mode
- Email notifications
- WhatsApp/SMS notifications
- Customer accounts and saved addresses
- Inventory records and low-stock alerts
- Downloadable invoice or job-card PDF
- Multiple staff roles
- Advanced analytics
- Machine-information panel with **simulated or manual** values, clearly labelled as demo data
  (carried over from v1; see [source-reconciliation.md](source-reconciliation.md))

## Out of scope for the student MVP

- ESP32 and physical sensors
- Real machine temperature or current measurement
- Automatic sheet counting from a real printing machine
- Automatic ink or paper-level detection
- Machine control or remote operation
- AI artwork correction or automatic pre-press approval
- Full accounting, tax filing or enterprise ERP
- Complex courier integrations
- Multi-branch support

> **Important:** never present simulated machine values as real sensor readings. This project is
> mainly an online ordering and production-management platform.

## Build priorities

### Must work
1. Customer website
2. Product selection and specifications
3. Artwork upload
4. Price estimate
5. Order creation and unique Order ID
6. Admin login and order management
7. Confirm / modification / reject flow
8. Production-stage management
9. Customer order tracking
10. QR access using the deployed host URL
11. Database persistence
12. Basic security and deployment

### Add if time permits
1. Real payment gateway
2. Email notifications
3. Printable job card
4. Inventory and low-stock alerts
5. Reports and charts
6. Customer accounts and order history

### Don't spend time on these at first
ESP32 and sensors, machine automation, AI artwork correction, advanced ERP/accounting, multi-branch
support, complex courier integrations.
