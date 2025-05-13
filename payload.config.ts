// payload.config.ts
import { buildConfig } from 'payload'; // Using the import that works for you
import path from 'path';
import Users from './payload/collections/Users'; // Assuming this path is correct for your project
import Posts from './payload/collections/Posts'; // Assuming this path is correct for your project
import Media from './payload/collections/Media'; // Assuming this path is correct for your project
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { postgresAdapter } from '@payloadcms/db-postgres';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// --- Option 2: Runtime check for PAYLOAD_SECRET ---
const payloadSecret = process.env.PAYLOAD_SECRET;
if (!payloadSecret) {
  // This error will be thrown when the config is loaded if PAYLOAD_SECRET is not set
  throw new Error('PAYLOAD_SECRET environment variable is missing, empty, or not defined. Please set it in your .env file.');
}
// --- End of Option 2 ---

export default buildConfig({
  // Use the validated payloadSecret constant here
  secret: payloadSecret,

  // Admin Panel Configuration
  admin: {
    user: Users.slug, // Collection slug for admin users
    meta: {
      titleSuffix: '- Blog Admin',
    },
  },

  // Collections
  collections: [
    Users,
    Posts,
    Media,
    // Add more collections as needed
  ],

  // Editor
  editor: lexicalEditor({}),

  // Database Adapter
  db: postgresAdapter({
    pool: {
      // Your Supabase (or other PostgreSQL) connection string
      // will be read from the DATABASE_URL environment variable.
      connectionString: process.env.DATABASE_URL,
    },
  }),

  // Sharp for image processing
  sharp,

  // Paths
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },

  // Define custom root paths for Payload's services
  routes: {
    admin: '/manage-blog', // THIS IS KEY for your admin panel URL
    api: '/api/payload',   // Optional: if you want to prefix Payload's API
  },
});