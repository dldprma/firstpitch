import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Fast Refresh 로그 줄이기
  experimental: {
    // Fast Refresh 관련 로그 최소화
    optimizePackageImports: ["react-icons"],
  },
  // 개발 환경에서 로그 레벨 조정
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
