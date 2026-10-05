/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // self-contained server for deployment alongside backend/frontend
  // In production this app is reverse-proxied at /admin and /super on the
  // same domain as the public frontend (vedhanth_web), which has its own
  // unrelated pages also serving root-relative /_next/static/* assets.
  // Without this, the browser can't tell which app's assets it's asking
  // for — requests fall through nginx's catch-all to vedhanth_web and
  // 404, leaving the page unstyled. assetPrefix moves only the asset
  // URLs (not page routes) under a path unique to this app; see
  // deploy notes / nginx config for the matching proxy rule.
  assetPrefix: process.env.ASSET_PREFIX || undefined,
};

module.exports = nextConfig;
