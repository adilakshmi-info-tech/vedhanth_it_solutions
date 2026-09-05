// Seeds one AdminUser so there's a login on day one.
//
//   ADMIN_EMAIL=admin@vedhanthitsolutions.com ADMIN_PASSWORD='a-strong-password' npm run db:seed
//
// Re-running with the same email updates that user's password (upsert).
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';

  if (!email || !password) {
    throw new Error(
      'Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables before seeding.\n' +
        "Example: ADMIN_EMAIL=admin@vedhanthitsolutions.com ADMIN_PASSWORD='...' npm run db:seed"
    );
  }
  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters.');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Admin user ready: ${user.email}`);
}

main()
  .catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
