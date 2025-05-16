// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@/components/RichText/RichText'

type Params = { slug: string }

export const metadata: Metadata = {
  title: 'Blog Post',
}

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL
  if (!baseUrl) return []
  try {
    const res = await fetch(
      `${baseUrl}/api/posts?depth=0`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return []
    const { docs }: { docs: { slug: string }[] } = await res.json()
    return docs.map((doc) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = params
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL
  if (!baseUrl) notFound()

  const res = await fetch(
    `${baseUrl}/api/posts?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) notFound()

  const { docs }: { docs: any[] } = await res.json()
  const post = docs[0]
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>

      {/* Hero Image & Caption */}
      {post.heroImage?.url && (
        <figure className="mb-8">
          <img
            src={`${baseUrl}${post.heroImage.url}`}
            alt={post.heroImage.alt || ''}
            width={post.heroImage.width}
            height={post.heroImage.height}
            className="w-full rounded"
          />
          {post.heroImage.caption && (
            <RichText
              data={post.heroImage.caption}
              className="prose text-sm text-gray-500 mt-2"
            />
          )}
        </figure>
      )}

      {/* Main Content */}
      <RichText
        data={post.content}
        className="prose lg:prose-xl dark:prose-invert"
      />
    </article>
  )
}
