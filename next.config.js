/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    minimumCacheTTL: 60,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
