# Order Status Model

There are three **independent** state dimensions. Don't merge them into one field:

1. **Order status**: where the order is in its business lifecycle (below)
2. **Production stage status**: per stage, see [production-stages.md](production-stages.md)
3. **Payment status**: see [../03-features/payments.md](../03-features/payments.md)

## Order statuses

| Status | Meaning |
| --- | --- |
| Draft | The customer hasn't submitted the order yet |
| Submitted | The order has been sent to the press |
| Under Review | The admin is checking details and artwork |
| Modification Requested | The customer must correct or confirm something |
| Confirmed | The admin has accepted the order |
| Rejected | The admin has declined the order (a reason is required) |
| In Production | Work has started |
| Ready for Delivery | Production and packing are complete |
| Dispatched | The order has left the press |
| Delivered | The customer has received the order |
| Cancelled | The order was cancelled under the applicable rules |

## Transitions (derived)

```text
Draft → Submitted → Under Review ─┬─► Confirmed → In Production → Ready for Delivery → Dispatched → Delivered
                                  ├─► Modification Requested → (customer resubmits) → Under Review
                                  └─► Rejected (terminal, kept in records)
Any pre-delivery state → Cancelled (terminal, kept in records, only under the applicable rules)
```

Rules:
- Every important status change gets a timestamp and a row in `order_status_history` (who, when, old → new, note).
- Rejected and cancelled orders are **never deleted**.
- Production can't start before confirmation and approval of the required artwork.
