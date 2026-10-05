# Vedhanth IT Solutions — Public Website

Next.js (App Router) public site for Vedhanth IT Solutions. Server-rendered
straight from a shared backend API, so real product/category/review content
is in the HTML before it reaches a browser or a search crawler.

> This repo used to be a single app containing the public site, the admin
> panel, and the database layer together. It's since been split into three
> independently deployed apps, each in its own repo:
> - **This repo** — the public website only (no database access, no auth)
> - [`web_backend`](https://github.com/adilakshmi-info-tech/web_backend) — the
>   shared data API (Postgres + Prisma), used by this site and the admin panel
> - [`web_admin`](https://github.com/adilakshmi-info-tech/web_admin) — the
>   admin panel (product/category/review/enquiry management, platform
>   super-admin)
>
> `DATABASEMIGRATIONPLAN.md` in this repo is historical — it documents the
> original Firebase→Postgres migration from before this split and no longer
> describes this app's own architecture.

## Stack

- **Next.js 14** (App Router) — every public page is server-rendered on each
  request, fetching from `web_backend`'s API server-side (never from the
  browser), so content is already in the initial HTML
- **No database, no auth, no Prisma in this repo** — this app only ever
  talks to `web_backend` over HTTP (`BACKEND_URL`), and only to its public,
  unauthenticated endpoints (catalog, product detail, approved reviews,
  review/enquiry submission)
- **Tailwind CSS** — styling, matches the brand (navy `#001736` + green
  `#0D3D0E`)

## 1. Prerequisites

- Node.js 18.18+ (20 LTS recommended)
- A running `web_backend` instance reachable at `BACKEND_URL` — for local
  dev against real data, either run `web_backend` locally too (see its own
  README) or point `BACKEND_URL` at a deployed instance

## 2. Environment variables

```bash
cp .env.example .env
```

Only one variable:

| Variable | What it is |
|---|---|
| `BACKEND_URL` | Where `web_backend` lives. Local dev: `http://localhost:4000`. Production (Docker Compose on the VM): `http://al_backend:4000` — a container name, never a public address, since backend has no nginx route of its own |

## 3. Local development

```bash
npm install
npm run dev
# http://localhost:4002
```

Needs a reachable `web_backend` (see above) to show real content — without
one, pages render with empty/fallback content rather than erroring.

## 4. Production deploy — Docker on the shared WACRM VM

This is the deploy path actually used for `vedhanthitsolutions.in`. The VM
runs a shared `wacrm_nginx` reverse proxy for several sites and apps —
`vedhanth_frontend` (this repo), `al_backend`, and `al_admin` all join the
VM's existing `wacrm_wacrm_network`; nothing about WACRM's own stack or the
sibling repos' stacks is touched by this one.

```bash
# one-time: clone via the deploy key already set up for this repo
cd /opt/vedhanth
cp .env.example .env    # set BACKEND_URL=http://al_backend:4000
docker compose up -d --build
```

**Redeploying after a code change:**

```bash
cd /opt/vedhanth
git pull
docker compose up -d --build
```

`--build` is required even for a pure content change — `docker compose up
-d` alone won't pick up new source.

Nginx routes the domain root (`location /`) to `vedhanth_frontend` — see
`deploy/nginx/vedhanth.conf.example` for the full config (also covers
`/admin` and `/super`, which route to `al_admin` instead; that file is
shared reference documentation for the whole VM setup, not just this repo).

## 5. SEO notes

- `/products` and each `/products/[slug]` page are server-rendered from
  `web_backend` on every request — full content is in the initial HTML.
- `app/sitemap.js` and `app/robots.js` generate `/sitemap.xml` and
  `/robots.txt`.
- Each page exports its own `metadata` (title/description); product pages
  derive theirs from the product name and description.

## 6. Troubleshooting

- **Pages load but show no products/reviews** — `BACKEND_URL` is wrong or
  `web_backend` isn't reachable; check `docker exec vedhanth_frontend wget
  -qO- $BACKEND_URL/api/catalog` from the VM.
- **A submitted review/enquiry doesn't show up in the admin panel** —
  confirm `web_backend`'s `DATABASE_URL` points at the same Postgres this
  site's data actually lives in; frontend, backend, and admin all read/write
  that one shared database.
