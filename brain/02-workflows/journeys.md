# End-to-End Journeys

## Customer journey

**QR Scan → Website → Product Selection → Specifications → Artwork Upload → Price Estimate →
Delivery/Pickup Details → Payment Option → Submit Order → Order ID**

The platform QR opens the homepage, and the customer starts an order from there.
After submitting, the customer tracks the order by Order ID, through a secure tracking link, or from
their order history once logged in.

## Admin journey

**New Order → Review → Confirm / Request Modification / Reject → Pre-Press → Printing → Quality
Check → Finishing → Packing → Ready for Delivery → Dispatch → Delivered**

## Real-time update chain

**Admin updates a stage → Backend validates → Database saves → Real-time event is sent → Customer
tracking view updates**

Example: the admin changes Printing from In Progress to Completed. The backend stores it, and the
open tracking page shows Printing as completed without a refresh.

See also: [order-status-model.md](order-status-model.md), [production-stages.md](production-stages.md),
[modification-and-rejection.md](modification-and-rejection.md)
