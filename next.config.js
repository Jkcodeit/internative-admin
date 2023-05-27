/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  trailingSlash: true,
  images: {
    loader: "custom",
    unoptimized: true,
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
