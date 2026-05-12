import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: `${process.env.AI_PROXY_TARGET || 'https://ribeiro-labs-ai-server-750835853020.europe-west1.run.app'}/:path*`, 
      },
    ]
  },
};

export default nextConfig;
