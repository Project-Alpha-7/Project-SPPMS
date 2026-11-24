# Pricing and Estimates

## Components (configured by the admin)
Base product charge · quantity/print-run charge · material/paper charge · printing charge · finishing
charge · design/pre-press charge (if applicable) · delivery charge · tax (if applicable).

Example formula:

```text
Estimated Total = Base + Material + Printing + Finishing + Additional Charges + Delivery
```

Real formulas differ by product and by press. **Don't invent universal printing rates.** Get the
press's actual pricing method (see [../decisions/open-questions.md](../decisions/open-questions.md)).

## Behaviour
- Show the estimate **before** the order is submitted, with a breakdown.
- Store a **price snapshot** with the order, so later price changes don't rewrite old orders.
- The admin reviews and can adjust the final quote (`quotes` table).
- If the admin changes it, record the reason and show the revised amount to the customer.
- Label the amount **"Estimate"** until the press confirms it.

## Money handling
Store amounts as integer minor units (paise) or fixed-precision decimals, **never floats**. Keep a currency field.
