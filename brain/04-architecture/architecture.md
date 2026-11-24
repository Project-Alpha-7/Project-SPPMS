# Technical Architecture

## Logical architecture

```text
CUSTOMER BROWSER                 ADMIN / STAFF BROWSER
       |                                  |
       +---------------+------------------+
                       |
                 WEB APPLICATION
                       |
                AUTHENTICATION
                       |
                  BACKEND/API
                       |
          +------------+-------------+
          |            |             |
       DATABASE    FILE STORAGE   REAL-TIME EVENTS
          |            |             |
          +------------+-------------+
                       |
              ORDER / PRODUCTION DATA
```

The customer and admin interfaces share one backend and database (one source of truth). Permissions
decide what each role can read or change.

## Stack options (pick one coherent stack)

| Option | Frontend | Backend services | Hosting |
| --- | --- | --- | --- |
| **A. React + Supabase** (recommended for a short student project) | React + Vite, Tailwind | Supabase Auth, Postgres, Storage, Realtime | Vercel/Netlify + Supabase |
| B. Next.js + Supabase | Next.js + Tailwind (server routes) | Supabase | Vercel |
| C. React + Node.js | React | Express, PostgreSQL, Socket.IO, object storage | Separate FE/BE hosts |

Option A cuts down on custom backend work. Authorization, validation and secure data access (RLS
policies, Edge Functions for privileged logic such as payment verification) still have to be done
properly. The repo already uses **Vite**, which fits Option A. Stack choice is recorded in
[../decisions/decision-log.md](../decisions/decision-log.md).

## Real-time behaviour
Real-time means that a meaningful update by one authorised user shows up on another connected screen
without a manual refresh.

Use it for: order status changes · production-stage changes · the admin order queue · modification requests.

**Save first, then notify.** Never rely only on client-side state. Don't try to make every screen live.
Focus on the operational updates that matter.

## Optional future IoT layer (not in MVP)
Sensors → ESP32 → Wi-Fi/API → Backend → Database → Admin Dashboard.
