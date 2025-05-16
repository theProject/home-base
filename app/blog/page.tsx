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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/posts?depth=0`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) throw new Error('Failed to fetch posts')

  const { docs }: { docs: PostSummary[] } = await res.json()

  return (
    <main className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {docs.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-2xl text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </main>
  )
}
