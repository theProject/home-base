// File: payload/collections/Posts.ts
import { CollectionConfig } from 'payload';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title', // Use the 'title' field as the identifier in the admin UI
    defaultColumns: ['title', 'status', 'updatedAt'], // Columns to show in list view
  },
  versions: { // Optional: enable drafts and version history
    drafts: true,
  },
  fields: [
    {
      name: 'title', // Field for the blog post title
      type: 'text',
      required: true,
    },
    {
      name: 'slug', // Field for the URL-friendly slug
      type: 'text',
      required: true,
      unique: true, // Ensure slugs are unique
      admin: {
        position: 'sidebar', // Show this field in the admin UI sidebar
      },
      // Consider adding a hook here to auto-generate the slug from the title
    },
    {
      name: 'content', // Field for the main blog post content
      type: 'richText', // Uses the Lexical editor you configured
      required: true,
    },
    {
      name: 'status', // Field to manage publish status (draft/published)
        type: 'select',
options: [
{ value: 'draft', label: 'Draft' },
{ value: 'published', label: 'Published' },
],
defaultValue: 'draft',
admin: {
position: 'sidebar',
},
},
{
name: 'featuredImage', // Optional: if you want a featured image for posts
type: 'upload',
relationTo: 'media', // Links to your 'Media' collection
},
// You can add more fields like 'author', 'categories', 'tags', 'excerpt', etc.
],
};   

    export default Posts;