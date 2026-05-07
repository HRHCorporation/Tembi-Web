import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    turbo: undefined,
  },

  allowedDevOrigins: [
    "10.241.20.214",
    "127.0.0.1"
  ],
};

export default nextConfig;