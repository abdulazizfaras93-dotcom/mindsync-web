/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    return new Date().getTime().toString()
  }
}
export default nextConfig
