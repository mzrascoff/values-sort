# values-sort

A quick, anonymous card sort of personal values. People swipe or tap 104 values into five
importance tiers and get a shareable themed "values map." No login. Each submission is stored
under a random ID and lives at a stable, unlisted link (`/r/{id}`).

Several people can also sort together. One of them starts a group, shares the invite link, and
everyone's maps land on a single page (`/g/{code}`) showing the themes side by side plus the
shared core, the shared periphery, and the widest splits.

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

- `/` — intro, start, and the control for starting or opening a group
- `/sort` — the swipe/tap survey; `/sort?g={code}` joins a group and asks for a name first
- `/api/submit` — POST `{ answers, group?, label? }`, returns `{ id, group }`
- `/api/group` — POST `{ title? }`, returns a new `{ code }`
- `/r/{id}` — the saved, shareable results map
- `/g/{code}` — the group comparison

## Groups

A group is a short code plus a Redis list of the sorts filed under it. Members are appended to
`group:{code}:members` rather than rewritten into the group object, so two people finishing at the
same moment cannot overwrite each other. A group holds up to `GROUP_LIMIT` (12) sorts.

The comparison only reads values that *every* member sorted, so a partial sort narrows the
comparison instead of breaking it. `buildGroupModel` in `lib/values.js` produces the theme table
and the three lists; `components/GroupCompare.jsx` renders them.

Inside a group, the name a person types is shown next to their map — that is the one place the app
attaches a label to a sort. Everything else stays anonymous.

## Editing the value list

Everything lives in `lib/values.js`: the values, their definitions, and the nine themes.
Add or remove entries there; the survey and the map update automatically.

## Privacy

Submissions are anonymous. No accounts. Results and group pages are unlisted and marked
`noindex`, so only someone with the link can open a given map.

The one exception is a group: members type a first name or nickname so the comparison can label
the columns, and anyone holding the group code can add a sort to it and read the comparison. Treat
a group code like the link it is.
