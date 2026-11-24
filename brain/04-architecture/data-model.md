# Data Model

Relational (PostgreSQL if Supabase is used).

## Core tables

| Table | Fields |
| --- | --- |
| `users` | id, full_name, email, phone, role, created_at. Credentials live in the auth provider, never here. |
| `products` | id, name, description, category, active, image_reference, created_at |
| `product_options` | id, product_id, option_name, option_value, active (size, material, GSM, colour, sides, method, finishing) |
| `orders` | id, order_number (unique), customer_id (nullable for guests), product_id, quantity, specifications (structured / validated JSON), delivery_method, delivery_address, requested_delivery_date, order_status, estimated_total, confirmed_total, currency, tracking_token (unique, unguessable), created_at, updated_at |
| `order_files` | id, order_id, storage_path, original_filename, mime_type, file_size, uploaded_by, created_at |
| `order_status_history` | id, order_id, old_status, new_status, changed_by, note, created_at |
| `production_stages` | id, order_id, stage_name, stage_status, sequence_number, assigned_to (optional), started_at, completed_at, updated_by |
| `quotes` | id, order_id, subtotal, additional_charges, delivery_charge, tax_amount, total, quote_status, created_by, created_at |
| `payments` | id, order_id, provider, transaction_reference, amount, currency, payment_status, paid_at, created_at. **No card data or CVV.** |
| `notifications` | id, user_id, order_id, title, message, read_at, created_at |
| `audit_logs` | id, actor_id, action, entity_type, entity_id, details, created_at |

## Optional tables

| Table | Fields |
| --- | --- |
| `inventory_items` | id, item_name, category, quantity, unit, minimum_quantity, updated_at |
| `machines` (demo) | id, name, status, temperature, power, running_hours, speed, printed_sheets |
| `maintenance` (demo) | id, machine_id, running_hours, service_due, notes |

Reports are computed from operational data. They don't need a separate table at first.

## Design principles
- Generated primary keys. Unique order numbers.
- Foreign keys between related records.
- Timestamps in UTC.
- Money in integer minor units (paise) or fixed decimals, **not floats**.
- Store a price snapshot on each order.
- Keep the status history.
- Customer artwork goes in private storage.
- Index order_number, customer_id, order_status and created_at.

## Relationships

```text
users 1─* orders *─1 products 1─* product_options
orders 1─* order_files
orders 1─* order_status_history
orders 1─* production_stages
orders 1─* quotes
orders 1─* payments
orders 1─* notifications *─1 users
```
