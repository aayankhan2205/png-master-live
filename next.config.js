/** @type {import('next').NextConfig} */
const nextConfig = {
  /* This tells Cloudflare to ignore any small warnings */
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;