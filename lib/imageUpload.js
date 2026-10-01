'use client';

const MAX_BYTES = 2 * 1024 * 1024;

function requestUpload(file, folder, onProgress) {
  return new Promise((resolve, reject) => {
    const body = new FormData();
    body.append('image', file);
    if (folder) body.append('folder', folder);

    const request = new XMLHttpRequest();
    request.open('POST', '/api/image-upload/single');
    request.withCredentials = true;
    request.upload.onprogress = (event) => {
      if (event.lengthComputable && typeof onProgress === 'function') {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    request.onerror = () => reject(new Error('Image upload failed. Check your connection and retry.'));
    request.onabort = () => reject(new Error('Image upload was cancelled.'));
    request.onload = () => {
      let response;
      try { response = JSON.parse(request.responseText); } catch { response = null; }
      if (request.status < 200 || request.status >= 300 || !response?.result || !response?.data?.url) {
        reject(new Error(response?.message || 'Image upload failed. Check the file and retry.'));
        return;
      }
      resolve(response.data);
    };
    request.send(body);
  });
}

// Uploads go to a same-origin route. The server authenticates from the admin
// session cookie and forwards the file/token to the existing storage service.
export async function uploadImage(file, folder = 'products', onProgress) {
  if (!file) return null;
  if (!file.type.startsWith('image/')) throw new Error('Choose an image file.');
  if (file.size > MAX_BYTES) throw new Error('Image is larger than 2MB.');
  return requestUpload(file, folder, onProgress);
}

export async function deleteImage(filePath) {
  if (!filePath) return;
  const response = await fetch('/api/image-upload/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ file_path: filePath }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.result) {
    throw new Error(data?.message || 'Image cleanup failed.');
  }
}

// Product.images stores complete external URLs; the storage API deletes by path.
export function pathFromImageUrl(url) {
  if (!url) return null;
  const marker = '/uploads/';
  const index = url.indexOf(marker);
  return index === -1 ? null : url.slice(index + marker.length);
}
