// File: payload/collections/Users.ts
import { CollectionConfig } from 'payload';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // This enables Payload's authentication for this collection
  admin: {
    useAsTitle: 'email', // In the admin UI, use the email as the title for user docs
  },
  fields: [
    // Email and password fields are added automatically by `auth: true`
    // You can add more fields here if needed, e.g.:
    // {
    //   name: 'name',
    //   type: 'text',
    // }
  ],
};

export default Users;