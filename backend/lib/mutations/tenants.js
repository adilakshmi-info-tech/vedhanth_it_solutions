import { prisma } from '@/lib/prisma';

function normalizeEmails(value) {
  if (Array.isArray(value)) return value.map((e) => String(e).trim().toLowerCase()).filter(Boolean);
  return String(value || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function validateTenant({ slug, name, logoUrl, colors, features, allowedEmails }) {
  const cleanSlug = String(slug || '').trim().toLowerCase();
  const cleanName = String(name || '').trim();
  if (!cleanSlug || !/^[a-z0-9-]+$/.test(cleanSlug)) throw new Error('Slug must be lowercase letters, numbers, and hyphens only.');
  if (!cleanName) throw new Error('Tenant name is required.');
  return {
    slug: cleanSlug,
    name: cleanName,
    logoUrl: logoUrl?.trim() || null,
    colors: colors && typeof colors === 'object' ? colors : null,
    features: features && typeof features === 'object' ? features : null,
    allowedEmails: normalizeEmails(allowedEmails),
  };
}

export async function createTenant(input) {
  const data = validateTenant(input);
  return prisma.tenant.create({ data });
}

export async function updateTenant(id, input) {
  const data = validateTenant(input);
  return prisma.tenant.update({ where: { id }, data });
}

export async function deleteTenant(id) {
  await prisma.tenant.delete({ where: { id } });
}
