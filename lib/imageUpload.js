// Client-side upload straight from the admin's browser to the shared
// image-upload API, authenticated with the admin's own live Firebase
// session — the server never touches image bytes at all. See
// image-upload.md for the API this wraps.
'use client';
import { auth } from '@/lib/firebase';

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL || 'https://store.adilakshmi.co/api/v2';
const APP_SLUG = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_APP_SLUG || 'sjs-technology';
const MAX_BYTES = 2 * 1024 * 1024; // 2MB, enforced by the upload API itself

async function authHeaders() {
  if (!auth.currentUser) throw new Error('Not signed in.');
  const token = await auth.currentUser.getIdToken();
  return { Authorization: `Bearer ${token}`, 'X-App-Slug': APP_SLUG };
}

// Uploads a File. Returns { url, path, original_name, size }.
export async function uploadImage(file, folder = 'products') {
  if (!file) return null;
  if (file.size > MAX_BYTES) throw new Error('Image is larger than 2MB.');

  const formData = new FormData();
  formData.append('image', file);
  if (folder) formData.append('folder', folder);

  const res = await fetch(`${BASE_URL}/image-upload/single`, {
    method: 'POST',
    headers: await authHeaders(), // no Content-Type — fetch sets the multipart boundary itself
    body: formData,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.result) {
    throw new Error(data?.message || 'Image upload failed.');
  }
  return data.data;
}

// Deletes a previously uploaded file by its stored `path` (not the full URL).
export async function deleteImage(filePath) {
  if (!filePath) return;
  const res = await fetch(`${BASE_URL}/image-upload/delete`, {
    method: 'POST',
    headers: { ...(await authHeaders()), 'Content-Type': 'application/json' },
    body: JSON.stringify({ file_path: filePath }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.result) {
    // Best-effort cleanup — don't block the caller's own flow on this.
    console.error('Image delete failed:', data?.message);
  }
}

// The DB only stores the full URL (see prisma/schema.prisma Product.images);
// derive the API's `path` back out of it when we need to delete a file.
// url shape: https://store.adilakshmi.co/uploads/products/photo.jpg
//                                        ^-- path starts here
export function pathFromImageUrl(url) {
  if (!url) return null;
  const marker = '/uploads/';
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}
