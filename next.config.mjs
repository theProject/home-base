// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import withPayload
import { withPayload } from '@payloadcms/next/withPayload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); // This __dirname is relative to the next.config.mjs file.
                                      // For project root paths, process.cwd() is often more reliable.

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Consider if you want to optimize images from Payload
                      // If so, you'd set unoptimized: false and configure domains/remotePatterns
                      // e.g., domains: ['localhost', 'your-supabase-project-url-if-using-storage']
  },
  transpilePackages: ['framer-motion', 'payload', '@payloadcms/richtext-lexical'],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Alias "framer-motion" imports to the actual CJS file path
      'framer-motion$': path.resolve(
        __dirname, // This __dirname is for the next.config.mjs location
        'node_modules/framer-motion/dist/cjs/index.js'
      ),
    };

    // Add this for Payload CMS (already present, which is good)
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};

// Wrap your nextConfig with withPayload
export default withPayload(
  nextConfig, // Your existing Next.js configuration
  {
    // Path to your Payload config file.
    // Assuming payload.config.ts is in your project root:
    configPath: path.resolve(process.cwd(), './payload.config.ts'),
    // If your payload.config.ts is elsewhere, adjust the path accordingly.
    // For example, if it's in a 'src' directory:
    // configPath: path.resolve(process.cwd(), './src/payload.config.ts'),

    // Optional: Define the URL for Payload if it were hosted separately
    // (not applicable if embedding directly as you are).
    // payloadURL: process.env.PAYLOAD_PUBLIC_URL,

    // Optional: Define where Payload Admin assets are output during the build.
    // Default is usually fine.
    // outputDir: './.payload',
  }
);