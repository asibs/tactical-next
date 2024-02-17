/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    appVersion: process.env.npm_package_version || "",
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
