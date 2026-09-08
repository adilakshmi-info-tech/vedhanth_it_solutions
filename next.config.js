/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // self-contained server for the PM2 deployment on the private server
  images: {
    remotePatterns: [
      {
        // Shared image-upload/storage service (see image-upload.md) —
        // product photos are hosted here, not on this app's own disk.
        protocol: 'https',
        hostname: 'store.adilakshmi.co',
      },
    ],
  },
};

module.exports = nextConfig;
