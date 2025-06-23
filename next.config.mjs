import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    // existing customisations … (if any)

    // NEW -- let the bundler resolve "@/components/*"
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@/components": path.join(__dirname, "app/components"),
    }

    return config
  },
}

export default nextConfig
