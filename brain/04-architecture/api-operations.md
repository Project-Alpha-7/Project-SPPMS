# API / Service Operations

The exact endpoints depend on the framework. These are the operations that must exist.

## Customer
- List active products
- Read a product's configuration
- Create an order
- Upload artwork
- Read their own orders
- Read permitted tracking information (by token)
- Submit a response to a modification request
- Read notifications

## Admin
- Read and filter all orders
- Read order detail and artwork
- Confirm an order / request modification / reject
- Create and update products and price configuration
- Update the quote
- Update payment state (authorised)
- Create and update production stages
- Generate a job card
- Manage inventory
- Read reports

## System
- Generate a unique Order ID
- Generate a tracking token
- Calculate the estimate
- Record status history
- Publish real-time updates
- Verify payment gateway events (if integrated)
- Enforce access control and validation

> Every privileged operation must be authorised at the server or database layer.
