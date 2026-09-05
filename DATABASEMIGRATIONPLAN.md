# Vedhanth IT Solutions — Database Migration Plan (Firebase → Self-Hosted PostgreSQL + Prisma)

## Why this change

The site was originally scaffolded with Firebase (Firestore + Storage + Auth) for speed of setup.
Since Vedhanth IT Solutions has its own private server, the decision is to move the database and
image storage onto that server instead of relying on Firebase's managed services — while keeping
the rest of the Next.js codebase (pages, admin panel UI, design) unchanged.

This also fixes a secondary issue: with Firebase, product/category data was fetched client-side
(in the visitor's browser after the page loaded), which is weaker for SEO. Moving to a
self-hosted Postgres database lets Next.js query the database **directly on the server**, so
pages can be fully rendered with real content before they're ever sent to a visitor's browser or
a Google crawler — no extra Admin SDK complexity required, since it's just a local database call.

## What's changing

| Piece | Before (Firebase) | After (self-hosted) |
|---|---|---|
| Database | Firestore (NoSQL) | **PostgreSQL** (relational) |
| ORM / data access | Firebase client SDK | **Prisma** (type-safe queries + migrations) |
| Image storage | Firebase Storage | Files stored on the server's disk (`/public/uploads`), or a self-hosted MinIO bucket later if needed |
| Admin login | Firebase Auth (email/password) | **NextAuth.js** with a credentials login, checked against an `AdminUser` table (password hashed with bcrypt) |
| Product/category pages | Client-side fetch (`useEffect` + `getDocs`) | **Server components** — data fetched directly via Prisma at render time |
| Admin CRUD (add/edit/delete) | Firebase client SDK calls from the browser | **Next.js Server Actions** — mutations run on the server, not exposed to the browser |
| Public review submission | Firestore `addDoc` from the browser | Server Action inserting into the `Review` table (still `approved = false` by default) |

## Data model (Prisma schema)

```prisma
model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
}

model Product {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  images      String[]  // relative paths under /public/uploads
  category    Category  @relation(fields: [categoryId], references: [id])
  categoryId  String
  createdAt   DateTime  @default(now())
}

model Review {
  id        String   @id @default(cuid())
  name      String
  rating    Int
  comment   String
  approved  Boolean  @default(false)
  createdAt DateTime @default(now())
}

model AdminUser {
  id           String @id @default(cuid())
  email        String @unique
  passwordHash String
}
```

## Admin panel behavior (unchanged from the user's perspective)

- `/admin/login` — email + password, checked against `AdminUser` via NextAuth credentials provider
- `/admin/categories` — create / edit / delete
- `/admin/products` — create / edit / delete, category assignment, image upload (saved to server disk)
- `/admin/reviews` — approve / unapprove / delete; approved reviews show on the homepage
- Public `/contact` page keeps its review submission form — reviews land as pending until approved

## Deployment on the private server

1. Install PostgreSQL on the server (or use an existing instance)
2. Create a database and user for the site
3. Set `DATABASE_URL` in `.env` (e.g. `postgresql://user:pass@localhost:5432/vedhanth`)
4. `npx prisma migrate deploy` — creates the tables from the schema above
5. Seed one `AdminUser` row (script provided) so there's a login on day one
6. `npm run build && pm2 start server.js` — same deployment approach as before, just with a
   database connection instead of Firebase config

## What stays exactly the same

- All page layouts, styling (navy/cyan brand), and content structure built earlier
- The overall site map: Home, About, Services, Products, Product detail, Contact
- The admin panel's screens and workflow (Categories → Products → Reviews)
- The floating WhatsApp button, contact CTAs, and map embed

## Next step

This document is the plan — the actual code conversion (replacing Firebase calls with Prisma
queries and Server Actions throughout the existing project) is a separate step. Confirm this plan
and I'll proceed with the code changes.
