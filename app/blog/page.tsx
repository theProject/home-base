// app/blog/page.tsx
import Link from 'next/link'
import { Metadata } from 'next'

type PostSummary = {
  id: string
  title: string
  slug: string
  publishedAt: string
}

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL
  if (!baseUrl) {
    throw new Error(
      'Missing NEXT_PUBLIC_PAYLOAD_API_URL – make sure .env.local is set and you restarted the server'
    )
  }

  const res = await fetch(
    `${baseUrl}/api/posts?depth=0`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch posts')

  const { docs }: { docs: PostSummary[] } = await res.json()

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 prose lg:prose-xl dark:prose-invert">
      <h1>Blog</h1>
      <ul className="list-none space-y-6 p-0">
        {docs.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-pink-700 hover:underline"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
