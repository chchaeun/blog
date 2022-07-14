/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

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
  basePath: isProd ? "/blog" : "",
};

module.exports = nextConfig;
