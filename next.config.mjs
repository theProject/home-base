/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    // Enable React 19 features
    react: {
      version: 19,
    },
    // Enable Next.js 15 features
    serverActions: {
      allowedOrigins: ['localhost:3000', 'theproject.com'],
    },
  },
}

export default nextConfig
