/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";
const name = "blog";

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
  assetPrefix: !debug ? `https://chcheun.github.io/blog` : "",
};

module.exports = nextConfig;
