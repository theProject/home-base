// next.config.mjs
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
  transpilePackages: ['framer-motion'],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Alias "framer-motion" imports to the actual CJS file path
      'framer-motion$': path.resolve(
        __dirname,
        'node_modules/framer-motion/dist/cjs/index.js'
      ),
    }
    return config
  },
}

export default nextConfig
