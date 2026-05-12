import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: `${process.env.AI_PROXY_TARGET}/:path*`, 
      },
    ]
  },
};

export default nextConfig;
