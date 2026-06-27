import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
