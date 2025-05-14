// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { withPayload } from '@payloadcms/next/withPayload';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

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

  transpilePackages: [
    'framer-motion',
    'payload',
    '@payloadcms/richtext-lexical',
  ],

  webpack(config, { webpack }) {
    // Ignore pg-native and cloudflare:sockets imports
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      })
    );

    // Your existing alias and experiment settings
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion$': path.resolve(
        __dirname,
        'node_modules/framer-motion/dist/cjs/index.js'
      ),
    };
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/api/payload/:path*',
      },
    ];
  },
};

export default withPayload(
  nextConfig,
  {
    configPath: path.resolve(process.cwd(), './payload.config.ts'),
  }
);
