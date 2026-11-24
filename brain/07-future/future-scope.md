# Future Scope

These are **not** requirements for the first delivery. Consider them only after the MVP works reliably.

## Business and product
- Onboarding a real printing-press business
- More product-specific pricing models
- Automated PDF pre-flight checks (dimensions, resolution, bleed, colour mode, fonts)
- Advanced artwork proof approval
- Email/WhatsApp/SMS customer notifications
- Online payment, invoices and receipts
- Courier integrations
- Stock consumption rules (automatic deduction)
- Staff assignment and production scheduling
- Multi-branch operations
- Analytics for production efficiency and profitability

## Hardware / IoT (from v1, if a real business needs it)
- ESP32 sensor integration
- Automatic paper and ink-level sensors
- Machine-specific IoT integrations
- Predictive maintenance

| Component | Demonstration |
| --- | --- |
| ESP32 | Wi-Fi-connected controller |
| IR sensor | Sheet counter |
| Temperature sensor | Machine temperature |
| Current sensor | Power/energy measurement |

Future architecture: **Sensors → ESP32 → Wi-Fi/API → Backend → Database → Admin Dashboard**

Hardware must never block the software project.
