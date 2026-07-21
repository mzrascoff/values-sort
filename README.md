# values-sort

A quick, anonymous card sort of personal values. People swipe or tap 104 values into five
importance tiers and get a shareable themed "values map." No login. Each submission is stored
under a random ID and lives at a stable, unlisted link (`/r/{id}`).

Built with Next.js (App Router) and Upstash Redis (Vercel KV), designed to deploy on Vercel.

## Stack

- Next.js 14, React 18
- `@upstash/redis` for storage (Vercel KV via the Upstash Marketplace integration)
- No database schema, no auth

## Local development

```bash
npm install
cp .env.example .env.local   # fill in KV_REST_API_URL and KV_REST_API_TOKEN from Upstash
npm run dev
```

Open http://localhost:3000. Without KV env vars the app runs, but submitting shows a
"storage not configured" message.

## Deploy to Vercel

1. Push this repo to GitHub (see `push.sh`).
2. On Vercel, **Add New → Project** and import the `values-sort` repo. Framework preset: Next.js. Deploy.
3. In the project, go to **Storage → Create Database → Upstash for Redis** (Marketplace) and connect it
   to this project. Vercel injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
   (Native `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` are also accepted.)
4. Redeploy so the new env vars take effect.

## Routes

- `/` — intro and start
- `/sort` — the swipe/tap survey
- `/api/submit` — POST answers, returns a new `{ id }`
- `/r/{id}` — the saved, shareable results map

## Editing the value list

Everything lives in `lib/values.js`: the values, their definitions, and the nine themes.
Add or remove entries there; the survey and the map update automatically.

## Privacy

Submissions are anonymous. No names, no accounts. Results pages are unlisted and marked
`noindex`, so only someone with the link can open a given map.
