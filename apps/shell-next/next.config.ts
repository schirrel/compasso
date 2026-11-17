import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  allowedDevOrigins: ['auth.compass.local']
};

export default nextConfig;
