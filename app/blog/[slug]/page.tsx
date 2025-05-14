// File: app/blog/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '../../../payload.config';
import type { Post } from '../../../payload-types';

export const revalidate = 60;

interface BlogPostPageProps {
  params: { slug: string };
}

async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug:   { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  });
  return docs[0] ?? null;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'posts',
    where:      { status: { equals: 'published' } },
    limit:     1000,
    depth:      0,    // just need slugs, depth doesn’t matter
  });
  return docs.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="prose max-w-none p-6 mx-auto">
      <h1>{post.title}</h1>

      {post.featuredImage &&
       typeof post.featuredImage !== 'number' &&   // ← narrows union to Media
       post.featuredImage.url && (
        <img
          src={post.featuredImage.url}
          alt={post.featuredImage.alt ?? ''}
          className="my-6 mx-auto rounded"
        />
      )}

      <div>
        {/* TODO: swap out this placeholder with your Lexical renderer */}
        <pre>{JSON.stringify(post.content, null, 2)}</pre>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
      </footer>
    </article>
  );
}
