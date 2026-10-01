import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/firebaseVerify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

function jsonError(message, status) {
  return NextResponse.json({ result: false, message }, { status });
}

function getUploadConfig() {
  const base = process.env.IMAGE_UPLOAD_BASE_URL
    || process.env.NEXT_PUBLIC_IMAGE_UPLOAD_BASE_URL
    || 'https://store.adilakshmi.co/api/v2';
  const appSlug = process.env.IMAGE_UPLOAD_APP_SLUG
    || process.env.NEXT_PUBLIC_IMAGE_UPLOAD_APP_SLUG
    || 'sjs-technology';
  let url;
  try { url = new URL(base); } catch { throw new Error('Image upload service URL is invalid.'); }
  const isLocalHttp = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
  if (url.protocol !== 'https:' && !isLocalHttp) throw new Error('Image upload service must use HTTPS.');
  return { base: url.toString().replace(/\/$/, ''), appSlug };
}

async function getAdminToken(request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return { error: jsonError('Cross-origin upload requests are not allowed.', 403) };
  const token = cookies().get('fb_token')?.value;
  const email = await verifyAdminToken(token);
  if (!email) return { error: jsonError('Administrator session is missing or expired. Sign in again.', 401) };
  return { token };
}

async function forward(action, token, body, contentType) {
  let config;
  try { config = getUploadConfig(); }
  catch (error) { return jsonError(error.message, 500); }

  try {
    const response = await fetch(`${config.base}/image-upload/${action}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-App-Slug': config.appSlug,
        ...(contentType ? { 'Content-Type': contentType } : {}),
      },
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(60_000),
    });
    const data = await response.json().catch(() => null);
    if (data && typeof data === 'object') return NextResponse.json(data, { status: response.status });
    return jsonError('The image service returned an unreadable response.', response.ok ? 502 : response.status);
  } catch (error) {
    const timedOut = error?.name === 'TimeoutError';
    return jsonError(timedOut ? 'Image service timed out. Retry the upload.' : 'Could not reach the image service. Retry the upload.', 502);
  }
}

export async function POST(request, { params }) {
  const action = params.action;
  if (action !== 'single' && action !== 'delete') return jsonError('Unsupported image action.', 404);

  const auth = await getAdminToken(request);
  if (auth.error) return auth.error;

  if (action === 'single') {
    let incoming;
    try { incoming = await request.formData(); }
    catch { return jsonError('Choose an image file and retry.', 400); }
    const image = incoming.get('image');
    if (!image || typeof image.arrayBuffer !== 'function' || !image.type?.startsWith('image/')) {
      return jsonError('Choose a valid image file.', 400);
    }
    if (image.size <= 0 || image.size > MAX_IMAGE_BYTES) return jsonError('Images must be larger than 0 bytes and no larger than 2MB.', 413);

    const outgoing = new FormData();
    outgoing.append('image', image, image.name || 'upload');
    const folder = incoming.get('folder');
    if (typeof folder === 'string' && folder.length <= 80) outgoing.append('folder', folder);
    return forward('single', auth.token, outgoing);
  }

  let data;
  try { data = await request.json(); }
  catch { return jsonError('Invalid image cleanup request.', 400); }
  const filePath = typeof data?.file_path === 'string' ? data.file_path.trim() : '';
  if (!filePath || filePath.length > 1024 || filePath.startsWith('/') || filePath.includes('..')) {
    return jsonError('A valid image path is required.', 400);
  }
  return forward('delete', auth.token, JSON.stringify({ file_path: filePath }), 'application/json');
}
