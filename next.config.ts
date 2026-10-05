import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "car-scroll-hero";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : "" },
};

export default nextConfig;
