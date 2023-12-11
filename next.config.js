/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    appVersion: process.env.npm_package_version || "",
  },
};

module.exports = nextConfig;
