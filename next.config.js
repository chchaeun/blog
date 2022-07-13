/** @type {import('next').NextConfig} */

const debug = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    loader: "akamai",
    path: "",
    domains: [
      "velog.velcdn.com",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
    ],
  },
  assetPrefix: !debug ? `https://chchaeun.github.io/blog` : "",
};

module.exports = nextConfig;
