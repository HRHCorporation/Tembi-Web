import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {
    middlewareClientMaxBodySize: 300 * 1024 * 1024,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "tembihistoricalhome.com",
        port: "",
        pathname: "/**",
	},
	{
        protocol: 'http',
        hostname: '10.241.20.214',
        port: '3000',
        pathname: '/**',
	origin/dev-aldy
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'staging-compro.tembihistoricalhome.com',
        port: '3000',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
