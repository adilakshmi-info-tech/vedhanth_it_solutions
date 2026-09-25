# Vedhanth IT Solutions — Website + Admin Panel

Next.js (App Router) site with an admin panel for managing Categories, Products, and Reviews.
Built for deployment on your own server (not Vercel), backed by a self-hosted PostgreSQL database.

> Originally migrated off Firebase to Postgres + NextAuth — see
> [`DATABASEMIGRATIONPLAN.md`](./DATABASEMIGRATIONPLAN.md) for that history. Admin **auth** has
> since moved back to Firebase (see below) so it can share the `sjs-technology` project used by
> `store.adilakshmi.co`'s image-upload API — the **data** (categories/products/reviews) stayed on
> Postgres throughout.

## Stack

- **Next.js 14** (App Router) — public pages are **server-rendered** straight from the database, so
  real product/category content is in the HTML before it reaches a browser or a search crawler
- **PostgreSQL** — categories, products, reviews (no user/auth tables — see below)
- **Prisma** — type-safe queries + schema migrations
- **Firebase Auth** (shared `sjs-technology` project) — protects `/admin/*`. Admin identity lives
  entirely in Firebase; this app never stores a password. Access is additionally restricted to an
  email allowlist (`ADMIN_ALLOWED_EMAILS`), since the Firebase project is shared across other apps
- **Server Actions** — all admin create/edit/delete and the public review form run on the server;
  each one independently re-verifies the caller's Firebase session server-side
- **Shared image-upload API** (`store.adilakshmi.co`) — product photos upload directly from the
  admin's browser (authenticated with their own Firebase session) to that S3-backed service; this
  app's own disk never holds product images
- **Tailwind CSS** — styling, matches the brand (navy + cyan)

## 1. Prerequisites

- Node.js 18.18+ (20 LTS recommended)
- PostgreSQL 14+ running and reachable from the app
- A Firebase user in the `sjs-technology` project for whoever will administer this site (create one
  under Firebase Console → Authentication → Users), and their email added to `ADMIN_ALLOWED_EMAILS`

## 2. Database setup

On the server (or locally for development):

```sql
CREATE DATABASE vedhanth;
CREATE USER vedhanth WITH PASSWORD 'a-strong-password';
GRANT ALL PRIVILEGES ON DATABASE vedhanth TO vedhanth;
```

## 3. Environment variables

```bash
cp .env.example .env
```

Then edit `.env`:

| Variable | What it is |
|---|---|
| `DATABASE_URL` | `postgresql://vedhanth:PASSWORD@localhost:5432/vedhanth?schema=public` |
| `NEXT_PUBLIC_FIREBASE_*` | The `sjs-technology` Firebase project's web config — not secret, safe in git (Firebase web API keys aren't privileged credentials; see [Firebase's own docs](https://firebase.google.com/docs/projects/api-keys)) |
| `ADMIN_ALLOWED_EMAILS` | Comma-separated allowlist — only these Firebase-authenticated emails can pass `requireAdmin()` / middleware, since the project is shared with other apps |
| `NEXT_PUBLIC_IMAGE_UPLOAD_*` | Base URL + app slug for the shared image-upload API |

There is deliberately no admin password anywhere in this app's config — Firebase owns that entirely.

**⚠️ `NEXT_PUBLIC_*` values are inlined at build time, not read at container runtime.** If you change
any of them, you must rebuild (`docker compose up -d --build`, not just restart) — see §6.

## 4. Local development

```bash
npm install
npx prisma migrate dev --name init      # creates the tables
npm run dev
# http://localhost:3000  and  http://localhost:3000/admin/login
```

Log in with the Firebase user's email/password directly — there's no seed step for admin identity.

## 5. Using the admin panel

- Log in at `/admin/login` with a Firebase account whose email is in `ADMIN_ALLOWED_EMAILS`.
- **Categories** — add categories first (e.g. "CCTV & Security Solutions").
  A category can't be deleted while it still has products.
- **Products** — add products, assign a category, upload an image. The browser uploads the file
  directly to the shared image API using your own Firebase session — this app's server never
  touches the image bytes. Editing without choosing a new image keeps the existing one; replacing
  or deleting a product's image also deletes the old file from the shared storage.
- **Reviews** — customers submit reviews via the form on the Contact page; they stay hidden until
  you click **Approve**. Approved reviews then show on the homepage automatically.

To add another admin later: create their user in the `sjs-technology` Firebase project, then add
their email to `ADMIN_ALLOWED_EMAILS` and redeploy (it's read at request time, not build time, so a
plain restart is enough for this one).

## 6. Production deploy — Docker on the shared WACRM VM

This is the deploy path actually used for `vedhanthitsolutions.in`: the VM already runs a shared
`wacrm_nginx` reverse proxy for several sites (see `Deploy_New_Website_on_WACRM_VM.md` for the full
runbook). Vedhanth gets its **own** app + Postgres containers in `/opt/vedhanth`, on the VM's
existing `wacrm_wacrm_network` — nothing about WACRM's own stack is touched.

```bash
# one-time: clone via the deploy key, per the runbook
git clone github-vedhanth:adilakshmi-info-tech/vedhanth_it_solutions.git /opt/vedhanth
cd /opt/vedhanth
cp .env.example .env    # fill in POSTGRES_*, DATABASE_URL (host: vedhanth_db), Firebase, admin allowlist

docker compose up -d --build
docker compose exec web npx prisma migrate deploy
```

Then add `/opt/nginx-extra/conf.d/vedhanth.conf` (template in `deploy/nginx/vedhanth.conf.example`)
and recreate `wacrm_nginx` so it picks up the new bind — full steps in the runbook.

**Redeploying after a code change:**

```bash
cd /opt/vedhanth
git pull
docker compose up -d --build
docker compose exec web npx prisma migrate deploy   # only if the schema changed
```

`--build` is required even for a pure content/copy change — `docker compose up -d` alone won't pick
up new source, and if any `NEXT_PUBLIC_*` value changed, a plain container restart won't re-inline
it either.

Postgres data lives under `/opt/vedhanth/data/pgdata/` (bind-mounted, outside the container) — back
that up. There's no uploads directory to worry about; product images live entirely on the shared
image-upload service.

## 6b. Alternative: bare-metal / PM2 (no Docker)

Because `next.config.js` sets `output: 'standalone'`, the build also produces a self-contained
server that runs directly under PM2 on any Linux host with its own Postgres — useful if a future
deploy target doesn't have Docker.

```bash
# On the server, with .env in place (including NEXT_PUBLIC_* — see the warning in §3) and Postgres
# reachable:
npm ci
npm run prisma:deploy          # applies migrations (prisma migrate deploy)
npm run build

# assemble the standalone bundle
cp -r .next/standalone ./deploy
cp -r .next/static ./deploy/.next/static
cp -r public ./deploy/public
cp .env ./deploy/.env

cd deploy
node server.js                 # listens on port 3000
```

Run it under **PM2** so it survives restarts:

```bash
pm2 start server.js --name vedhanth-website
pm2 save
```

### Nginx reverse proxy (sample)

```nginx
server {
    listen 80;
    server_name vedhanthitsolutions.in www.vedhanthitsolutions.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then add HTTPS with **Certbot** (Let's Encrypt):

```bash
sudo certbot --nginx -d vedhanthitsolutions.in -d www.vedhanthitsolutions.in
```

## 7. Database migrations

When the Prisma schema in `prisma/schema.prisma` changes:

```bash
npx prisma migrate dev --name describe_the_change   # development
npm run prisma:deploy                                # production
```

## 8. SEO notes

- `/products` and each `/products/[slug]` page are server-rendered from the database on every
  request — full content is in the initial HTML.
- `app/sitemap.js` and `app/robots.js` generate `/sitemap.xml` and `/robots.txt`.
- Each page exports its own `metadata` (title/description); product pages derive theirs from the
  product name and description.

## 9. What's left to do before going live

- [ ] Provision PostgreSQL on the server and set `DATABASE_URL`
- [ ] Confirm the admin's Firebase user exists in `sjs-technology` and is in `ADMIN_ALLOWED_EMAILS`
- [ ] Confirm `store.adilakshmi.co` has authorized the `sjs-technology` slug for this admin account
      (ask whoever runs that backend if uploads get rejected)
- [ ] Run `prisma migrate deploy`
- [ ] Add real categories/products via the admin panel
- [ ] Point the real domain at the server and set up SSL (WAF-side — see conversation notes /
      whoever manages `106.51.29.16`)
- [ ] Swap the logo in `/public/logo.png` if you get an uncropped version
