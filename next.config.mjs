/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  // 让 /workspace 在 Vercel 部署中可访问根路径
  async redirects() {
    return [];
  },
};
export default nextConfig;
