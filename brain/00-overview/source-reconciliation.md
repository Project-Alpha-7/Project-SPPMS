# Source Reconciliation: v1 (PDF) vs v2 (Blueprint)

The two source documents describe two versions of the same project. **v2 (the Blueprint) is the
source of truth.** v1 is still useful for its inventory examples, the machine-panel idea and the
hardware strategy.

| Topic | v1: PDF "Smart Printing Press Management & Monitoring System" | v2: Blueprint "QR-Based Online Printing Ordering & Management System" | Decision |
| --- | --- | --- | --- |
| Product focus | Press management and **monitoring** (orders, machines, inventory) | Customer **online ordering** plus production management | v2 |
| Who creates orders | Admin creates orders | Customer creates orders online (admin can too) | v2 |
| ID name | Job ID (example `PT-2026-001`) | Order ID, plus Job/Order ID on the job card | Use **Order ID** for customers. The job card shows the same ID as the Job ID. |
| QR | One QR **per job**, linking to `/track/<job-id>` | **Platform QR** first (homepage). The per-order QR is optional and uses an **unpredictable token**. | v2. Never put sequential IDs in tracking URLs. |
| Production stages | Design → Plate Making → Printing → Lamination → Cutting → Packing → Dispatch → Delivered | Pre-Press → Printing → Quality Check → Finishing → Packing → Ready for Delivery → Dispatch → Delivered | v2. Design and plate making are part of Pre-Press. Lamination and cutting are part of Finishing. |
| Stage statuses | Pending, In Progress, Completed, Issue | Same, plus **On Hold** | v2 |
| Order status vs stage | Single `status` | Order status, production-stage status and payment status kept **separate** | v2 |
| Artwork upload, pricing, payment | Not covered | Core features | v2 |
| Machine monitoring | Core module (status, temp, power, hours, speed, sheets) | Out of scope as real data | Optional admin panel with **manual or simulated values labelled "Demo data"**. |
| Maintenance | Running-hours threshold (e.g. 100 hrs → Maintenance Required) | Not mentioned | Optional, together with the machine panel. |
| Inventory | Core (paper + ink with thresholds) | Optional MVP module | Optional. Updated manually. |
| Hardware (ESP32) | Optional demo | Explicitly out of scope | Out of scope. Future only. |
| Roles | Admin, User | Customer, Admin, optional Production Staff | v2 |
| Demo flow | Admin creates the order | Customer orders by QR, then admin processes it | v2 |
| Build order | UI → Auth → DB → Orders → Production → QR → Inventory → Machine → Real-time → Reports → Test → Deploy | 13 stages (see development plan) | v2 |

## Kept from v1

- Inventory examples and the low-stock rule → [../03-features/inventory-and-machines.md](../03-features/inventory-and-machines.md)
- Machine data fields and maintenance logic, as an optional demo panel → same file
- Hardware strategy and future IoT architecture → [../07-future/future-scope.md](../07-future/future-scope.md)
- v1 testing rows for inventory and machines → [../06-delivery/testing-checklist.md](../06-delivery/testing-checklist.md)
