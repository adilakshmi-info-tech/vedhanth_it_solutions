// Seeds the initial real product catalog — photos were uploaded to the
// shared image API (store.adilakshmi.co) from vedhanth_it_solutions_images/
// and are referenced here by their returned URLs.
//
// Idempotent: categories/products are upserted by slug, so this is safe to
// re-run (e.g. to fix a description) without creating duplicates.
//
// Run on the server:  docker compose exec web node prisma/seed-catalog.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function slugify(text) {
  return String(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const CATALOG = [
  {
    name: 'CCTV & Security Cameras',
    description: 'Dome, bullet, PTZ and solar-powered cameras for homes, shops, offices and outdoor sites.',
    products: [
      {
        name: 'ApnaCam Solar PTZ Camera (3-Lens)',
        description: 'Fully solar-powered PTZ camera with three lenses for wide outdoor coverage — no wiring or mains power needed.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125231-am-1_1788876111.jpeg',
      },
      {
        name: 'Solar PTZ Camera with App Viewing',
        description: 'Dual-spotlight solar PTZ camera with live remote viewing on your phone — built for outdoor and perimeter monitoring.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125231-am-2_1788876111.jpeg',
      },
      {
        name: 'CP Plus 2.4MP IR Dome Camera',
        description: 'Indoor dome camera with color night vision and wide-angle coverage — ideal for shops, offices and home entrances.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125230-am_1788876110.jpeg',
      },
      {
        name: 'CP Plus PTZ Speed Dome Camera',
        description: 'Motorized pan-tilt-zoom dome camera with IR night vision for wide-area outdoor surveillance.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125231-am_1788876112.jpeg',
      },
      {
        name: 'PRAMA IR Dome Camera',
        description: 'Compact indoor dome camera with infrared night vision.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125240-am-1_1788876126.jpeg',
      },
      {
        name: 'PRAMA IR Bullet Camera',
        description: 'Weatherproof bullet camera with IR night vision for outdoor use.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125240-am-2_1788876126.jpeg',
      },
      {
        name: 'PRAMA Color Bullet Camera',
        description: 'Full-color night vision bullet camera for clear footage day or night.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125240-am_1788876127.jpeg',
      },
      {
        name: 'Hikvision Solar PTZ & Bullet Camera Combo',
        description: 'Pole-mounted solar-powered PTZ and bullet camera system for remote sites with no power access.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125241-am-1_1788876128.jpeg',
      },
      {
        name: 'Hikvision Turbo HD Bullet Camera',
        description: 'HDTVI weatherproof bullet camera with IR night vision — reliable coverage for entrances and perimeters.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125241-am_1788876128.jpeg',
      },
    ],
  },
  {
    name: 'Biometric & Access Control',
    description: 'Fingerprint attendance systems, electromagnetic locks and complete access-control kits.',
    products: [
      {
        name: 'eSSL Biometric Time & Attendance Device',
        description: 'Fingerprint and card-based attendance system with color display — tracks employee check-in/check-out.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125232-am_1788876138.jpeg',
      },
      {
        name: 'eSSL Electromagnetic Door Lock',
        description: 'Heavy-duty magnetic door lock for secure access-controlled entry points.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125233-am-1_1788876139.jpeg',
      },
      {
        name: 'eSSL Slim Biometric Access Control Device',
        description: 'Compact fingerprint device for door access control.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125233-am_1788876139.jpeg',
      },
      {
        name: 'Biometric Access Control Kit',
        description: 'Fingerprint reader, magnetic lock, exit button and power supply — a complete starter kit for one door.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125234-am_1788876140.jpeg',
      },
      {
        name: 'Complete Biometric Door Access Kit',
        description: 'Full kit: biometric device, exit button, magnetic lock with brackets, RFID cards and power supply.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125235-am_1788876141.jpeg',
      },
    ],
  },
  {
    name: 'Fire Alarm Systems',
    description: 'Fire alarm control panels, detectors and alarms — installed and commissioned on site.',
    products: [
      {
        name: 'Fire Alarm Panel Installation',
        description: 'Wall-mounted fire alarm control panel with smoke detector and sounder, wired and commissioned on site.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125238-am-2_1788876152.jpeg',
      },
    ],
  },
  {
    name: 'Video Door Phones',
    description: 'See and speak to visitors before opening the door.',
    products: [
      {
        name: 'Godrej Video Door Phone',
        description: 'Video door phone with indoor monitor and outdoor camera unit — see and speak to visitors before opening the door.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125238-am_1788876153.jpeg',
      },
    ],
  },
  {
    name: 'Intercom & EPABX Systems',
    description: 'EPABX and intercom systems for offices and larger buildings.',
    products: [
      {
        name: 'Galaxy 308 EPABX System',
        description: '8-line EPABX intercom system for offices and small businesses.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125239-am-1_1788876153.jpeg',
      },
      {
        name: 'Syntel Smart EPABX System',
        description: 'Compact EPABX unit for internal office calling and call management.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125239-am-2_1788876154.jpeg',
      },
      {
        name: 'Galaxy Eternia 128 EPABX System',
        description: '128-line EPABX system with handset — intercom solution for larger offices and buildings.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125239-am_1788876154.jpeg',
      },
    ],
  },
  {
    name: 'Electrical & LT Panels',
    description: 'New wiring, LT panel installation, and maintenance of panels, motors, transformers & UPS.',
    products: [
      {
        name: 'Electrical Panel Installation & Maintenance',
        description: 'LT panel and switchgear installation for industrial and commercial sites, wired, tested and commissioned.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125243-am-1_1788876155.jpeg',
      },
      {
        name: 'House Wiring & Distribution Boards',
        description: 'New house wiring and distribution board installation, with proper circuit protection and labeling.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125242-am-1_1788876155.jpeg',
      },
      {
        name: 'Panel Troubleshooting & AMC Service',
        description: 'On-site troubleshooting and scheduled maintenance for power and control panels, motors, transformers and UPS.',
        image: 'https://storage.networkspecialist.in/al-data/sjs-technology/products/whatsapp-image-2026-09-08-at-125244-am_1788876156.jpeg',
      },
    ],
  },
];

async function main() {
  for (const cat of CATALOG) {
    const categorySlug = slugify(cat.name);
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: { name: cat.name, description: cat.description },
      create: { name: cat.name, slug: categorySlug, description: cat.description },
    });

    for (const p of cat.products) {
      const slug = slugify(p.name);
      await prisma.product.upsert({
        where: { slug },
        update: { name: p.name, description: p.description, categoryId: category.id, images: [p.image] },
        create: { name: p.name, slug, description: p.description, categoryId: category.id, images: [p.image] },
      });
    }
    console.log(`Seeded category: ${cat.name} (${cat.products.length} products)`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
