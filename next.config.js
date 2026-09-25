/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // self-contained server for the PM2 deployment on the private server
  images: {
    remotePatterns: [
      {
        // Shared image-upload/storage service (see image-upload.md). The
        // API is called at store.adilakshmi.co, but the returned image
        // URLs are actually served from this separate storage host —
        // both need listing since next/image checks the real asset host.
        protocol: 'https',
        hostname: 'store.adilakshmi.co',
      },
      {
        protocol: 'https',
        hostname: 'storage.networkspecialist.in',
      },
    ],
  },
};

module.exports = nextConfig;
