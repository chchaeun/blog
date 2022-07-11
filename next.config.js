/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: [
      "velog.velcdn.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
