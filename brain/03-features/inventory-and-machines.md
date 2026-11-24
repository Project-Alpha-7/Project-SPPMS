# Inventory and Machine Panel (Optional Modules)

Both are **optional**. Build them only after the core order lifecycle works.

## Inventory
Fields: item name · category · size · GSM · quantity · unit (ream, sheet, roll, piece, litre, %) ·
minimum threshold · last updated.

Show a low-stock warning when quantity drops below the threshold. Update it **manually** in v1 of the build.
Deduct stock automatically only once the press defines reliable consumption rules.

Example data (from the v1 PDF):

| Item | Example | Alert rule |
| --- | --- | --- |
| A4 Paper | 120 Reams | Alert when below minimum |
| 13×19 Paper | 25 Reams | Alert when below minimum |
| Black Ink | 70% | Alert when below minimum |
| Cyan Ink | 18% | Low-stock warning |
| Magenta Ink | 52% | Normal |
| Yellow Ink | 60% | Normal |

## Machine panel (carried over from v1, demo only)
v2 puts real machine data out of scope. If this panel is built, its values must be **entered manually or
simulated and labelled "Demo data"**. Never present them as sensor readings.

| Data | Example | Purpose |
| --- | --- | --- |
| Status | Running | Current machine state |
| Temperature | 41°C | Operational monitoring |
| Running Hours | 97 hrs | Maintenance calculation |
| Power | 2.6 kWh | Energy information |
| Speed | 3200 sheets/hr | Production information |
| Printed Sheets | 18,230 | Production counter |

### Maintenance logic
When running hours reach the service threshold, show **Maintenance Required**
(e.g. 97 → 98 → 99 → 100 hrs → Maintenance Required).

Entities (v1): `machines` (id, name, status, temperature, power, running_hours, speed, printed_sheets),
`maintenance` (id, machine_id, running_hours, service_due, notes). Admin-only.
