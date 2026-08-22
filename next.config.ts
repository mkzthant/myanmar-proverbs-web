import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    cpus: 4,
  },
};

export default nextConfig;
