import { fileURLToPath } from "url";
import path from "path";

/** Fix for __dirname in ESM */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // Allow "@/components/*" imports
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@/components": path.join(__dirname, "app/components"),
    };

    return config;
  },
};

export default nextConfig;
