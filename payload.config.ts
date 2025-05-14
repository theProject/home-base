// payload.config.ts
import { buildConfig } from 'payload';
import path from 'path';
import Users from './payload/collections/Users';
import Posts from './payload/collections/Posts';
import Media from './payload/collections/Media';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { postgresAdapter } from '@payloadcms/db-postgres';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret = process.env.PAYLOAD_SECRET;
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is missing.');
}

export default buildConfig({
  secret: payloadSecret,

  admin: {
    // Hardcode the users collection slug
    user: 'users',
    meta: {
      titleSuffix: '- Blog Admin',
    },
  },

  collections: [
    Users,
    Posts,
    Media,
  ],

  editor: lexicalEditor({}),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },

  routes: {
    admin: '/cms',
    api: '/api/payload',
  },
});
