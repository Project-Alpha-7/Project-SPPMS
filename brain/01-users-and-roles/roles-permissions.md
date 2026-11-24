# Users, Roles and Permissions

## Customer
Can:
- Browse available products
- Configure product specifications
- Upload artwork
- See the estimate and its price breakdown
- Enter contact and delivery/pickup details
- Submit an order
- See and track their **own** orders
- See payment and production milestones
- Request a change before production begins (the admin must approve it)

**Must not** see another customer's private order, uploaded artwork, address or payment details.

## Administrator
Can:
- See all orders, customer information and uploaded artwork
- Check specifications and price
- Confirm, reject or request modifications
- Update payment state where appropriate
- Create and update products and pricing rules
- Move confirmed orders through production
- Generate and print job cards
- Manage customers, basic inventory, alerts and reports
- Manage staff accounts (if included)

## Production staff (optional)
Can:
- See assigned or confirmed job cards
- See job specifications and approved artwork
- Update the production stages they are allowed to change
- Record quality-check results
- Add internal notes

Should **not** access payment configuration, user administration or sensitive customer information
unless explicitly permitted.

## Permission matrix

| Capability | Customer | Production Staff | Admin |
| --- | --- | --- | --- |
| Browse products | Yes | Optional | Yes |
| Create order | Yes | No | Yes |
| View order | Own | Assigned jobs | All |
| View private artwork | Own order | Assigned jobs | All |
| Confirm/reject order | No | No | Yes |
| Update production | No | Assigned stages | Yes |
| Manage prices/products | No | No | Yes |
| Manage payment state | View own | No | Yes |
| Manage users | No | No | Yes |
| View reports | No | Limited | Yes |
| Machine / inventory data (optional modules) | No | Optional | Yes |

> Enforce permissions in the backend/database (e.g. row-level security). Hiding a button in the UI is
> **not** security.
