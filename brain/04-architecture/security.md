# Security, Privacy and Reliability

## Minimum safeguards
- Use a trusted authentication provider.
- Enforce role-based access in backend/database policies (RLS), not just in the UI.
- Validate all input on the server.
- Restrict file types (checking extension **and** MIME type) and file sizes.
- Store uploads in private storage, and use short-lived signed links for artwork.
- Never put service-role keys or payment secrets in frontend code. Use environment variables.
- Use unpredictable tracking tokens.
- Keep customer private data off the public tracking page.
- Keep machine, inventory and internal operational data admin-only.
- Record important admin actions (`audit_logs`).
- Back up the database before major changes.
- Handle network errors and **duplicate submissions** (one click = one order).
- Use HTTPS in deployment.
- Provide a privacy notice and basic terms if real customer data is used.

## Caveat
This is a student prototype. It is not a production-certified payment or enterprise system.
Commercial use needs further security, privacy, legal and operational review.
