# Admin Platform

## Dashboard
KPI cards: New Orders · Under Review · Confirmed · In Production · Ready for Delivery · Dispatched ·
Pending Payments.

Sections: recent orders · orders that need action · production status summary · upcoming delivery
dates · low-stock alerts (if inventory is enabled) · monthly order/revenue chart (**only from recorded data**).

Dashboard numbers come from the database or are clearly marked as **demo data**.

## Order management (list)
- Search by Order ID or customer
- Filter by status, date and product
- Open order details
- View and download artwork securely
- Confirm / request modification / reject
- Internal notes
- Update payment state, with an audit record
- Status history

## Order detail page (sections)
1. Order summary
2. Customer and contact details
3. Product specifications
4. Uploaded artwork
5. Price breakdown and quote
6. Payment information
7. Production timeline
8. Delivery/pickup information
9. Internal notes and activity history
10. Actions available to the current role

## Digital job card
Generated after the order is confirmed. Printable (PDF download is optional). Includes:
Job/Order ID · customer name and contact (internal) · product and quantity · size and material · GSM ·
colour and sides · printing method · finishing · approved artwork reference · confirmed delivery date ·
payment/approval state · production stage checklist · special instructions.
It's an operational document, so leave out unnecessary sensitive payment data.

## Production management
See [../02-workflows/production-stages.md](../02-workflows/production-stages.md). Shows confirmed orders
that need production, their current stage and an optional stage owner. Authorised updates are recorded
with a timestamp and user, there are issue and on-hold notes, invalid transitions are blocked, and
permitted changes show up on customer tracking.

## Inventory (optional)
See [inventory-and-machines.md](inventory-and-machines.md).

## Reports
- Orders by day/month, by product, by status
- Completed vs pending
- Total quoted amount · recorded payments · outstanding balance
- Average completion time (if timestamps are captured)

Keep **order value, paid amount and outstanding amount** separate.
Reports can be generated from operational data. They don't need a separate table at first.

## UX priorities
Sidebar nav · summary cards · searchable and filterable table · clear detail view · production timeline ·
artwork preview · job card action · payment and delivery state · alerts and recent activity.
Works on desktop and tablet.
