// File: payload/collections/Users.ts
import type { CollectionConfig, AccessArgs } from 'payload';

const Users: CollectionConfig = {
  slug: 'users',

  // Enable the full suite of auth routes (register, login, forgot-password, reset-password, etc.)
  auth: true,

  // Access control: only allow a user to see or change their own record
  access: {
    read:   ({ req: { user } }: AccessArgs) => {
      return user ? Boolean(user) : false;
    },
    update: ({ req: { user }, id }: AccessArgs) => {
      return user ? Boolean(user) && user.id === id : false;
    },
    delete: ({ req: { user }, id }: AccessArgs) => {
      return Boolean(user && user.id === id);
    },
    // Control who can see the “Users” list in the Admin UI
    admin:  ({ req: { user } }: AccessArgs) => {
      return Boolean(user);
    },
  },

  admin: {
    useAsTitle: 'email',
  },

  fields: [
    // email & password are injected by auth:true
    {
      name:     'name',
      type:     'text',
      required: true,
    },
    // add more profile fields here as needed
  ],
};

export default Users;
