/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // produces a self-contained server for your custom server / PM2 deployment
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

module.exports = nextConfig;
