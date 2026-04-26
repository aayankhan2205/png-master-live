/** @type {import('next').NextConfig} */
const nextConfig = {
  // We remove the keys that caused warnings
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;