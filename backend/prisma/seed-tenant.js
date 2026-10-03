// Seeds the one real tenant row that exists today (Vedhanth), using the
// same values already hardcoded elsewhere (tailwind.config.js's navy/green
// tokens, today's ADMIN_ALLOWED_EMAILS). Idempotent: upserted by slug, so
// safe to re-run.
//
// Run on the server: node prisma/seed-tenant.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const VEDHANTH_TENANT = {
  slug: 'vedhanthitsolutions',
  name: 'Vedhanth IT Solutions',
  logoUrl: '/logo-full.svg',
  colors: {
    navy: '#001736',
    green: '#0D3D0E',
  },
  features: {
    reviews: true,
    enquiries: true,
    products: true,
    categories: true,
  },
  allowedEmails: ['admin@vedhanthitsolutions.com', 'yatheesh@vedhanthitsolutions.in'],
};

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: VEDHANTH_TENANT.slug },
    create: VEDHANTH_TENANT,
    update: VEDHANTH_TENANT,
  });
  console.log(`Seeded tenant: ${tenant.name} (${tenant.slug})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
