'use client';

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);
const CLIENT_SLUG = 'vedhanthitsolutions';

function hasAllowedExtension(file) {
  const extension = String(file?.name || '').split('.').pop()?.toLowerCase();
  return ALLOWED_EXTENSIONS.has(extension);
}

function requestUpload(files, folder, onProgress) {
  return new Promise((resolve, reject) => {
    const multiple = files.length > 1;
    const action = multiple ? 'multiple' : 'single';
    const body = new FormData();
    files.forEach((file) => body.append(multiple ? 'images[]' : 'image', file));
    if (folder) body.append('folder', folder);

    const request = new XMLHttpRequest();
    request.open('POST', `/api/image-upload/${action}`);
    request.withCredentials = true;
    request.timeout = 60_000;
    request.setRequestHeader('Accept', 'application/json');
    request.upload.onprogress = (event) => {
      if (event.lengthComputable && typeof onProgress === 'function') {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    request.onerror = () => reject(new Error('Could not reach the image upload service. Check your connection and retry.'));
    request.ontimeout = () => reject(new Error('Image upload timed out. Retry the upload.'));
    request.onabort = () => reject(new Error('Image upload was cancelled.'));
    request.onload = () => {
      let response;
      try { response = JSON.parse(request.responseText); } catch { response = null; }
      if (request.status < 200 || request.status >= 300 || !response?.result) {
        const failure = new Error(response?.message || 'Image upload failed. Check the file and retry.');
        const partialRows = Array.isArray(response?.data) ? response.data : response?.data ? [response.data] : [];
        failure.uploadedImages = partialRows.filter((item) => item?.path);
        reject(failure);
        return;
      }
      const uploaded = multiple ? response.data : [response.data];
      if (!Array.isArray(uploaded) || uploaded.length !== files.length || uploaded.some((item) => !item?.url || !item?.path)) {
        const failure = new Error('The image service returned incomplete upload details. Retry the upload.');
        const partialRows = Array.isArray(uploaded) ? uploaded : [];
        failure.uploadedImages = partialRows.filter((item) => item?.path);
        reject(failure);
        return;
      }
      resolve(uploaded);
    };
    request.send(body);
  });
}

export async function uploadImages(files, folder = 'products', onProgress) {
  const selected = Array.from(files || []);
  if (!selected.length) return [];
  for (const file of selected) {
    if (!hasAllowedExtension(file)) throw new Error(`${file.name}: choose a JPG, JPEG, PNG, GIF, WEBP, or SVG image.`);
    if (file.size <= 0 || file.size > MAX_BYTES) throw new Error(`${file.name}: images must be larger than 0 bytes and no larger than 10 MB.`);
  }
  return requestUpload(selected, folder, onProgress);
}

export async function uploadImage(file, folder = 'products', onProgress) {
  const uploaded = await uploadImages(file ? [file] : [], folder, onProgress);
  return uploaded[0] || null;
}

export async function deleteImage(filePath) {
  if (!filePath) return;
  const response = await fetch('/api/image-upload/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ file_path: filePath }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.result) throw new Error(data?.message || 'Image cleanup failed.');
}

// Product.images contains public storage URLs, while the API's delete route
// accepts the relative client path returned as data.path.
export function pathFromImageUrl(imageUrl) {
  if (!imageUrl) return null;
  try {
    const url = new URL(imageUrl);
    if (url.hostname !== 'storage.networkspecialist.in') return null;
    const marker = `/${CLIENT_SLUG}/`;
    const index = url.pathname.indexOf(marker);
    if (index < 0) return null;
    return `${CLIENT_SLUG}/${decodeURIComponent(url.pathname.slice(index + marker.length))}`;
  } catch {
    return null;
  }
}
