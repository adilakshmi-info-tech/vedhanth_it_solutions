import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/firebaseVerify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const API_BASE = 'https://store.adilakshmi.co/api/v2/image-upload';
const CLIENT_SLUG = 'vedhanthitsolutions';
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']);
const UPLOAD_ERROR_MESSAGES = {
  401: 'Invalid or inactive API key.',
  403: 'The requested file path is outside the vedhanthitsolutions folder.',
  413: 'Image exceeds the 10 MB per-image limit.',
  422: 'Invalid file type or missing image. Use JPG, JPEG, PNG, GIF, WEBP, or SVG.',
  429: 'Image upload rate limit reached. Wait a moment and retry.',
  500: 'The image upload service encountered an error. Retry later.',
};

function jsonError(message, status) {
  return NextResponse.json({ result: false, message }, { status });
}

function getApiKey() {
  const raw = process.env.IMAGE_UPLOAD_API_KEY || '';
  // Trim accidental whitespace/outer quotes without ever logging or returning
  // the secret. dotenv normally removes quotes, but deployment systems vary.
  return raw.trim().replace(/^(["'])(.*)\1$/, '$2').trim();
}

function isImageFile(value) {
  if (!value || typeof value.arrayBuffer !== 'function' || typeof value.name !== 'string') return false;
  const extension = value.name.split('.').pop()?.toLowerCase();
  return ALLOWED_EXTENSIONS.has(extension);
}

function safeDeletePath(value) {
  if (typeof value !== 'string') return false;
  const parts = value.split('/');
  return parts.length >= 3
    && parts[0] === CLIENT_SLUG
    && parts.every((part) => part && part !== '.' && part !== '..');
}

async function getAdminSession(request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return { error: jsonError('Cross-origin upload requests are not allowed.', 403) };
  }
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) return { error: jsonError('Administrator session is missing or expired. Sign in again.', 401) };
  return { email };
}

async function forward(action, apiKey, body, isJson = false) {
  try {
    const response = await fetch(`${API_BASE}/${action}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-App-Key': apiKey,
        ...(isJson ? { 'Content-Type': 'application/json' } : {}),
      },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(60_000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      const message = UPLOAD_ERROR_MESSAGES[response.status]
        || (response.status >= 500
          ? 'The image upload service is temporarily unavailable. Retry later.'
          : 'Image upload failed. Retry the request.');
      // If the multiple endpoint reports partial successes, forward only their
      // returned paths so the product form can attempt best-effort cleanup.
      const partialRows = Array.isArray(result?.data) ? result.data : result?.data ? [result.data] : [];
      const partial = partialRows
        .filter((item) => item && typeof item.path === 'string' && safeDeletePath(item.path))
        .map(({ path }) => ({ path }));
      return NextResponse.json({ result: false, message, ...(partial?.length ? { data: partial } : {}) }, { status: response.status });
    }
    if (!result || result.result !== true || (action !== 'delete' && !result.data)) {
      return jsonError('The image upload service returned an invalid response.', 502);
    }
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
      return jsonError('Image upload timed out. Retry the upload.', 504);
    }
    // Browser requests are same-origin to this route, so an external CORS
    // policy cannot surface here; this is a server-to-server network failure.
    return jsonError('Could not reach the image upload service. Check the server connection and retry.', 502);
  }
}

export async function POST(request, { params }) {
  const action = params.action;
  if (!['single', 'multiple', 'delete'].includes(action)) return jsonError('Unsupported image action.', 404);

  const session = await getAdminSession(request);
  if (session.error) return session.error;

  const apiKey = getApiKey();
  if (!apiKey) return jsonError('Image upload service is not configured. Add IMAGE_UPLOAD_API_KEY to the server environment.', 503);

  if (action === 'single' || action === 'multiple') {
    let incoming;
    try { incoming = await request.formData(); }
    catch { return jsonError('Choose an image file and retry.', 422); }

    const files = action === 'single' ? [incoming.get('image')] : incoming.getAll('images[]');
    if (!files.length || files.some((file) => !isImageFile(file))) {
      return jsonError('Invalid file type or missing image. Use JPG, JPEG, PNG, GIF, WEBP, or SVG.', 422);
    }
    if (action === 'single' && files.length !== 1) return jsonError('Upload one image using the single-image endpoint.', 422);
    if (action === 'multiple' && (files.length < 1 || files.length > 20)) return jsonError('The multiple-image endpoint accepts 1 to 20 images.', 422);
    if (files.some((file) => file.size <= 0)) return jsonError('The selected image is empty.', 422);
    if (files.some((file) => file.size > MAX_IMAGE_BYTES)) return jsonError('Image exceeds the 10 MB per-image limit.', 413);

    const outgoing = new FormData();
    files.forEach((file) => outgoing.append(action === 'single' ? 'image' : 'images[]', file, file.name));
    outgoing.append('folder', 'products');
    return forward(action, apiKey, outgoing);
  }

  let requestData;
  try { requestData = await request.json(); }
  catch { return jsonError('Invalid image cleanup request.', 422); }
  const filePath = requestData?.file_path;
  if (!safeDeletePath(filePath)) return jsonError('A valid vedhanthitsolutions file path is required.', 422);
  return forward('delete', apiKey, JSON.stringify({ file_path: filePath }), true);
}
