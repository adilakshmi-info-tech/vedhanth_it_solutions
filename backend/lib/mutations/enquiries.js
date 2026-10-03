import { prisma } from '@/lib/prisma';

const statuses = new Set(['new', 'in_progress', 'resolved', 'closed']);

export async function submitEnquiry(input) {
  const name = String(input?.name || '').trim();
  const phone = String(input?.phone || '').trim();
  const email = String(input?.email || '').trim();
  const message = String(input?.message || '').trim();
  if (!name || !phone || !message) throw new Error('Name, phone number, and message are required.');
  if (name.length > 120 || phone.length > 40 || email.length > 254 || message.length > 4000) throw new Error('One or more enquiry fields are too long.');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email address.');
  await prisma.enquiry.create({ data: { name, phone, email: email || null, message } });
}

export async function updateEnquiryStatus(id, status) {
  if (!statuses.has(status)) throw new Error('Choose a valid enquiry status.');
  await prisma.enquiry.update({ where: { id }, data: { status } });
}

export async function deleteEnquiry(id) {
  await prisma.enquiry.delete({ where: { id } });
}
