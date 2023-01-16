/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tours-api.onrender.com", "localhost", "images.pexels.com"],
  },
};

module.exports = nextConfig;
