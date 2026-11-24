# Deployment and Hosting

## Hosting choice (settled 2026-11-24): Vercel

- **Repo:** https://github.com/Project-Alpha-7/Project-SPPMS.git (branch `main`)
- **Preset:** Vite — build `vite build`, output `dist/`, declared in `vercel.json`
- **Node:** 22 (`.nvmrc`); `package.json` requires `>=20.11` (vite.config uses `import.meta.dirname`)
- **Multi-page:** root customer pages, `/admin/` console, `/design.html` gallery — all built by `vite.config.js`
- **`cleanUrls: true`** — extension-less URLs, good for the platform QR
- **No env vars yet** — the demo data layer is browser-only. Supabase env vars arrive with Stage 3–4
  (Vercel → Project → Settings → Environment Variables)
- Every push to `main` auto-deploys

### Deploy steps
1. Import the GitHub repo at vercel.com/new (Vite preset is picked up from `vercel.json`).
2. Deploy; note the generated `*.vercel.app` domain.
3. Open `/admin/`, demo sign-in, copy the platform QR from the dashboard —
   it renders from the deployed URL, so it must be generated **after** the first deploy.
4. When the backend lands: add env vars in Vercel, redeploy, re-test login and tracking.

## Student setup (low cost)
- Frontend on a platform with a default subdomain (e.g. Vercel/Netlify)
- Database, auth and storage on the chosen backend provider (e.g. Supabase)
- Env vars set in the hosting dashboard
- HTTPS provided by the host
- QR generated from the final hosted URL
- A custom domain is optional

## Deployment sequence
1. Create the production database/project.
2. Apply the schema and access policies.
3. Configure storage permissions.
4. Configure production environment variables.
5. Deploy the frontend and backend.
6. Create the first admin account securely.
7. Add product and pricing configuration.
8. Create sample orders.
9. Test the customer and admin flows.
10. Generate the final platform QR.
11. Scan it from several phones.
12. Check tracking and permissions.
