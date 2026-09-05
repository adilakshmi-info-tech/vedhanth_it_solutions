// Saves uploaded product images to the server's disk under /public/uploads,
// so they're served as ordinary static files at /uploads/<name>.
import 'server-only';
import { randomUUID } from 'crypto';
import { mkdir, writeFile, unlink } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const EXT_BY_TYPE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

// Accepts a File (from FormData). Returns the public path, e.g. "/uploads/ab12.jpg".
export async function saveProductImage(file) {
  if (!file || typeof file.arrayBuffer !== 'function' || file.size === 0) return null;

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) throw new Error('Unsupported image type. Use JPG, PNG, WebP or GIF.');
  if (file.size > MAX_BYTES) throw new Error('Image is larger than 5 MB.');

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

// Best-effort cleanup when a product image is replaced or the product is deleted.
export async function deleteUpload(publicPath) {
  if (!publicPath || !publicPath.startsWith('/uploads/')) return;
  const filename = path.basename(publicPath);
  try {
    await unlink(path.join(UPLOAD_DIR, filename));
  } catch {
    // already gone — nothing to do
  }
}
