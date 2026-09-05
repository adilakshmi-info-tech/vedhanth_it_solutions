/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // self-contained server for the PM2 deployment on the private server
  // Product images are served as local static files from /public/uploads,
  // so next/image needs no remotePatterns.
};

module.exports = nextConfig;
