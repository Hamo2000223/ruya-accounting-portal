import type { NextConfig } from "next";

const legacyPaths = [
  "/executive",
  "/ruya",
  "/cashflow",
  "/ratios",
  "/budget",
  "/projects",
  "/compliance",
  "/forecast",
  "/playground",
  "/visuals",
];

const nextConfig: NextConfig = {
  async redirects() {
    return legacyPaths.map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
