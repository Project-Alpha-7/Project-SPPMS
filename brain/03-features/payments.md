# Payments

Keep payment scope tight for the student MVP.

## Possible modes
1. Pay at pickup
2. Cash/manual payment recorded by the admin
3. Advance payment
4. Full online payment through a gateway (optional, **sandbox first**)

## If a real gateway is used
- Use the provider's test/sandbox environment first.
- **Never** store card numbers, CVV or banking credentials.
- Verify the payment result on the **backend** through a trusted gateway response or webhook.
- A browser redirect to a success page **does not** mark an order paid.
- Store the transaction reference, amount, currency and status.
- Handle the pending, successful, failed and refunded states.
- Duplicate webhook events must not create duplicate records (idempotency).

## If gateway credentials or approval aren't available
Build a clearly labelled **demo/manual payment flow**. Don't claim real online payment is enabled.
Manual payments are marked as manually verified by an admin.

## Rules
- Payment status is independent of order and production status.
- A payment counts as successful only after trusted server-side verification or authorised manual confirmation.
- Payment state changes get an audit record.
