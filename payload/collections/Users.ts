// File: payload/collections/Users.ts
import type { CollectionConfig, AccessArgs } from 'payload';

const Users: CollectionConfig = {
  slug: 'users',

  // Enable Payload's built-in authentication routes
  auth: true,

  // Access control: only allow a user to see or change their own record
  access: {
    read: ({ req: { user } }: AccessArgs): boolean => {
      return Boolean(user);
    },
    update: ({ req: { user }, id }: AccessArgs): boolean => {
      if (!user) return false;
      return user.id === id;
    },
    delete: ({ req: { user }, id }: AccessArgs): boolean => {
      if (!user) return false;
      return user.id === id;
    },
    // Control who can see the Users list in the Admin UI
    admin: ({ req: { user } }: AccessArgs): boolean => {
      return Boolean(user);
    },
  },

  admin: {
    useAsTitle: 'email',
  },

  fields: [
    // `email` & `password` fields are injected by `auth: true`
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    // Add additional profile fields here
  ],
};

export default Users;
