# Vedhanth IT Solutions — Website + Admin Panel

Next.js (App Router) site with a Firebase-backed admin panel for managing Categories, Products,
and Reviews. Built for deployment on your own server (not Vercel).

## Stack

- **Next.js 14** (App Router) — SSR/SSG public pages for fast loading & SEO
- **Firebase Firestore** — categories, products, reviews data
- **Firebase Storage** — product images
- **Firebase Auth** (email/password) — protects `/admin/*`
- **Tailwind CSS** — styling, matches the brand (navy + cyan)

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com) → Create a new project.
2. **Firestore Database** → Create database → Start in **production mode**.
3. **Storage** → Get started → default bucket.
4. **Authentication** → Sign-in method → enable **Email/Password**.
5. Under Authentication → Users → **Add user** manually — this is your admin login
   (e.g. `admin@vedhanthitsolutions.com` + a strong password). There's no public signup page;
   only accounts you create here can log into `/admin`.
6. Project Settings → General → scroll to "Your apps" → Add a **Web app** → copy the config values.
7. Deploy the security rules included in this project:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore storage   # point to firestore.rules and storage.rules in this repo
   firebase deploy --only firestore:rules,storage:rules
   ```

## 2. Local Setup

```bash
cp .env.local.example .env.local
# paste your Firebase config values into .env.local

npm install
npm run dev
# visit http://localhost:3000 and http://localhost:3000/admin/login
```

## 3. Using the Admin Panel

- Log in at `/admin/login` with the user you created in Firebase Authentication.
- **Categories** — add categories first (e.g. "CCTV & Security Solutions").
- **Products** — add products, assign to a category, upload an image (stored in Firebase Storage).
- **Reviews** — customers submit reviews via the form on the Contact page; they stay hidden
  until you click **Approve** here. Approved reviews then show on the homepage automatically.

## 4. Building for Production (custom server)

```bash
npm run build
```

Because `next.config.js` sets `output: 'standalone'`, the build produces a self-contained server at
`.next/standalone/`. Deploy like this:

```bash
# On your server:
npm run build
cp -r .next/standalone ./deploy
cp -r .next/static ./deploy/.next/static
cp -r public ./deploy/public
cd deploy
node server.js   # runs on port 3000 by default
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
    server_name vedhanthitsolutions.com www.vedhanthitsolutions.com;

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
sudo certbot --nginx -d vedhanthitsolutions.com -d www.vedhanthitsolutions.com
```

## 5. SEO Notes

- `app/sitemap.js` and `app/robots.js` auto-generate `/sitemap.xml` and `/robots.txt` —
  **update the domain inside both files, plus `app/layout.js`'s `metadataBase`**, once the
  real domain is live.
- Each page exports its own `metadata` (title/description) — edit these per page as needed.
- Product listing/detail pages currently fetch data client-side for simplicity. For maximum SEO
  on product pages specifically, this can later be upgraded to server-side fetching with the
  Firebase Admin SDK + `generateStaticParams` — flag this to your developer if product pages
  need to rank individually in search.

## 6. What's Included vs. What's Left To Do

**Included:** Home, About, Services, Products (category + product listing from Firestore),
Product detail, Contact (with map embed + public review form), full admin panel
(Categories/Products/Reviews CRUD), Firebase Auth-gated admin, Firestore + Storage security rules.

**Still to do before going live:**
- [ ] Add real categories/products via the admin panel
- [ ] Create the actual admin login user in Firebase Auth
- [ ] Replace the placeholder domain in `layout.js`, `sitemap.js`, `robots.js`
- [ ] Point your real domain at the server and set up SSL
- [ ] Swap the logo in `/public/logo.png` if you get an uncropped version
