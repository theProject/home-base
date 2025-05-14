// File: app/blog/page.tsx
import React from 'react';
import Link from 'next/link';
import { getPayload } from 'payload';               // ↓ use getPayload instead of HMR
import config from '@payload-config';               // your path-alias to payload.config.ts
import type { Post } from 'payload-types';          // use the generated types via tsconfig paths

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

async function fetchBlogPosts(): Promise<Post[]> {
  // initialize Payload’s Local API
  const payload = await getPayload({ config });     // :contentReference[oaicite:0]{index=0}

  try {
    const result = await payload.find({
      collection: 'posts',                          // your Posts collection slug
      where: { status: { equals: 'published' } },
      sort: '-createdAt',                           // newest first
      limit: 10,
      depth: 1,                                     // populate any relations as needed
    });
    return result.docs;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-semibold mb-6">Our Blog</h1>

      {posts.length === 0 ? (
        <p>No blog posts have been published yet. Check back soon!</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-10">
              <Link
                href={`/blog/${post.slug}`}
                className="text-2xl hover:underline"
              >
                {post.title}
              </Link>

              {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url && (
                <div className="mt-3">
                  <img
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || ''}
                    className="max-w-xs rounded shadow"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
