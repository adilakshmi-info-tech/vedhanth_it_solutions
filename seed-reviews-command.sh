docker exec -i al_backend node - <<'EOF'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const TENANT_SLUG = process.env.TENANT_SLUG || 'vedhanthitsolutions';
const DRY_RUN = process.env.DRY_RUN === '1';

const REVIEWS = [
  { name: "Rajesh Kumar", role: "Business Owner", date: "2026-09-18", rating: 5, comment: "Vedhanth completed our CCTV and networking installation professionally. The team understood our requirements, finished the work on time, and provided excellent support." },
  { name: "Priya Nair", role: "Operations Manager", date: "2026-09-10", rating: 5, comment: "The electrical and security solutions provided for our office were reliable and neatly installed. The team was responsive from the first discussion to the final setup." },
  { name: "Sneha Rao", role: "Office Administrator", date: "2026-08-28", rating: 5, comment: "Vedhanth delivered a complete CCTV and networking setup for our business. Their technical knowledge and attention to detail made the entire process simple and dependable." },
  { name: "Arjun Mehta", role: "Facility Manager", date: "2026-08-16", rating: 5, comment: "The biometric access-control system was installed correctly and explained clearly. Everything has been working reliably, and the support team was very helpful." },
  { name: "Vikram Shah", role: "IT Coordinator", date: "2026-08-04", rating: 5, comment: "Our office network became faster and more organized after Vedhanth completed the installation. The cabling was clean, and the team handled the project with great professionalism." },
  { name: "Ananya Iyer", role: "School Administrator", date: "2026-07-22", rating: 5, comment: "The fire-alarm system was installed safely and completed within the agreed timeline. Vedhanth explained the maintenance process clearly and answered all our questions." },
  { name: "Karthik Reddy", role: "Retail Store Owner", date: "2026-07-08", rating: 5, comment: "We received quick and reliable AMC support whenever we needed assistance. The team diagnosed the issue quickly and restored our systems without unnecessary delays." },
  { name: "Meera Thomas", role: "Startup Founder", date: "2026-06-25", rating: 5, comment: "Vedhanth handled our laptop, desktop, and networking requirements efficiently. The service was transparent, professional, and delivered exactly as promised." },
  { name: "Sanjay Menon", role: "Project Manager", date: "2026-06-12", rating: 5, comment: "The EPABX and intercom installation improved communication across our office. The setup was clean, dependable, and completed with minimal disruption." },
  { name: "Divya Sharma", role: "Homeowner", date: "2026-05-30", rating: 5, comment: "The CCTV installation was neat, properly configured, and easy to use. The team patiently explained every feature and provided excellent after-installation support." },
  { name: "Anil Reddy", role: "Facility Manager", date: "2026-05-20", rating: 4, comment: "From electrical panel work to CCTV, Vedhanth delivered quality solutions on time and within budget." },
  { name: "Rajesh Kumar", role: "Operations Manager", date: "2026-05-15", rating: 4, comment: "Vedhanth handled our CCTV and networking installation professionally. The team was responsive and completed the work as planned." },
  { name: "Priya Sharma", role: "Office Administrator", date: "2026-05-10", rating: 4, comment: "Excellent biometric and fire alarm installation. Their AMC support has been reliable and timely." },
];

async function main() {
  const tenant = await prisma.tenant.findUnique({ where: { slug: TENANT_SLUG } });
  if (!tenant) throw new Error(`Tenant "${TENANT_SLUG}" not found. Run prisma/seed-tenant.js first.`);

  let created = 0;
  let skipped = 0;
  for (const r of REVIEWS) {
    const existing = await prisma.review.findFirst({
      where: { tenantId: tenant.id, name: r.name, comment: r.comment },
      select: { id: true },
    });
    if (existing) {
      skipped++;
      continue;
    }
    if (!DRY_RUN) {
      const createdAt = new Date(`${r.date}T12:00:00.000Z`);
      await prisma.review.create({
        data: {
          tenantId: tenant.id,
          name: r.name,
          rating: r.rating,
          comment: r.comment,
          approved: true,
          createdAt,
          workflow: {
            create: { tenantId: tenant.id, reviewType: 'company', status: 'approved', approvedAt: createdAt },
          },
        },
      });
    }
    created++;
  }
  console.log(`${DRY_RUN ? '[dry run] would create' : 'Created'} ${created} review(s), skipped ${skipped} already present.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
EOF
