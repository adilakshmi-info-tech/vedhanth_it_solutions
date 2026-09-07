# Vedhanth IT Solutions — Website + Admin Panel

Next.js (App Router) site with an admin panel for managing Categories, Products, and Reviews.
Built for deployment on your own server (not Vercel), backed by a self-hosted PostgreSQL database.

> Migrated off Firebase — see [`DATABASEMIGRATIONPLAN.md`](./DATABASEMIGRATIONPLAN.md) for the rationale.

## Stack

- **Next.js 14** (App Router) — public pages are **server-rendered** straight from the database, so
  real product/category content is in the HTML before it reaches a browser or a search crawler
- **PostgreSQL** — categories, products, reviews, admin users
- **Prisma** — type-safe queries + schema migrations
- **NextAuth.js** (credentials) — protects `/admin/*`, passwords hashed with bcrypt in an `AdminUser` table
- **Server Actions** — all admin create/edit/delete and the public review form run on the server
- **Local disk storage** — product images are saved to `public/uploads/` and served as static files
- **Tailwind CSS** — styling, matches the brand (navy + cyan)

## 1. Prerequisites

- Node.js 18.18+ (20 LTS recommended)
- PostgreSQL 14+ running and reachable from the app

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
| `NEXTAUTH_URL` | The public URL of the site (`https://vedhanthitsolutions.in` in production) |
| `NEXTAUTH_SECRET` | Random string — generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Only read by the seed script to create the first admin login |

## 4. Local development

```bash
npm install
npx prisma migrate dev --name init      # creates the tables
npm run db:seed                          # creates the admin user from ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev
# http://localhost:3000  and  http://localhost:3000/admin/login
```

## 5. Using the admin panel

- Log in at `/admin/login` with the seeded admin credentials.
- **Categories** — add categories first (e.g. "CCTV & Security Solutions").
  A category can't be deleted while it still has products.
- **Products** — add products, assign a category, upload an image (saved to `public/uploads/`).
  Editing without choosing a new image keeps the existing one.
- **Reviews** — customers submit reviews via the form on the Contact page; they stay hidden until
  you click **Approve**. Approved reviews then show on the homepage automatically.

To add another admin later, re-run the seed with different `ADMIN_EMAIL` / `ADMIN_PASSWORD`
(existing emails have their password updated rather than duplicated).

## 6. Production deploy — Docker on the shared WACRM VM

This is the deploy path actually used for `vedhanthitsolutions.in`: the VM already runs a shared
`wacrm_nginx` reverse proxy for several sites (see `Deploy_New_Website_on_WACRM_VM.md` for the full
runbook). Vedhanth gets its **own** app + Postgres containers in `/opt/vedhanth`, on the VM's
existing `wacrm_wacrm_network` — nothing about WACRM's own stack is touched.

```bash
# one-time: clone via the deploy key, per the runbook
git clone github-vedhanth:adilakshmi-info-tech/vedhanth_it_solutions.git /opt/vedhanth
cd /opt/vedhanth
cp .env.example .env    # fill in POSTGRES_*, DATABASE_URL (host: vedhanth_db), NEXTAUTH_*, ADMIN_*

docker compose up -d --build
docker compose exec web npx prisma migrate deploy
docker compose exec web npm run db:seed
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

Postgres data and uploaded product images live under `/opt/vedhanth/data/` (bind-mounted, outside
the containers) — back that directory up.

## 6b. Alternative: bare-metal / PM2 (no Docker)

Because `next.config.js` sets `output: 'standalone'`, the build also produces a self-contained
server that runs directly under PM2 on any Linux host with its own Postgres — useful if a future
deploy target doesn't have Docker.

```bash
# On the server, with .env in place and Postgres reachable:
npm ci
npm run prisma:deploy          # applies migrations (prisma migrate deploy)
npm run db:seed                # first deploy only, to create the admin login
npm run build

# assemble the standalone bundle
cp -r .next/standalone ./deploy
cp -r .next/static ./deploy/.next/static
cp -r public ./deploy/public   # includes public/uploads
cp .env ./deploy/.env

cd deploy
node server.js                 # listens on port 3000
```

Run it under **PM2** so it survives restarts:

```bash
pm2 start server.js --name vedhanth-website
pm2 save
```

**Product image uploads** are written to `public/uploads/` at runtime. That directory lives inside
the running `deploy/` folder, so it persists across restarts but is **replaced on every redeploy** —
before copying a fresh `public/`, sync the live uploads back:

```bash
rsync -a /path/to/deploy/public/uploads/  ./public/uploads/
```

(Or point `public/uploads` at a directory outside the deploy folder with a symlink / bind mount.)

### Nginx reverse proxy (sample)

```nginx
server {
    listen 80;
    server_name vedhanthitsolutions.in www.vedhanthitsolutions.in;
    client_max_body_size 6M;   # product image uploads

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
- `app/sitemap.js` and `app/robots.js` generate `/sitemap.xml` and `/robots.txt`. **Update the
  domain** in `app/sitemap.js`, `app/robots.js`, and `app/layout.js`'s `metadataBase` once the
  real domain is live. `app/sitemap.js` currently lists the static routes; extend it to include
  product URLs from the database if you want individual products in the sitemap.
- Each page exports its own `metadata` (title/description); product pages derive theirs from the
  product name and description.

## 9. What's left to do before going live

- [ ] Provision PostgreSQL on the server and set `DATABASE_URL`
- [ ] Set a real `NEXTAUTH_SECRET` and the production `NEXTAUTH_URL`
- [ ] Run `prisma migrate deploy` + `db:seed` to create the admin login
- [ ] Add real categories/products via the admin panel
- [ ] Replace the placeholder domain in `layout.js`, `sitemap.js`, `robots.js`
- [ ] Point the real domain at the server and set up SSL
- [ ] Decide on a persistent location / backup for `public/uploads`
- [ ] Swap the logo in `/public/logo.png` if you get an uncropped version
