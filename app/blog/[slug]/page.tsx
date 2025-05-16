// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import LexicalRenderer from '../../components/LexicalRenderer'

type Params = { slug: string }

export const metadata: Metadata = {
  title: 'Blog Post',
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/posts?depth=0`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return []
  const { docs }: { docs: { slug: string }[] } = await res.json()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>
}) {
  // ⚠️ Must await params in Next.js 15+ ─ otherwise you get the "params should be awaited" error :contentReference[oaicite:0]{index=0}
  const { slug } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/api/posts?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) notFound()

  const { docs }: { docs: any[] } = await res.json()
  const post = docs[0]
  if (!post) notFound()

  return (
    <article className="prose lg:prose-xl mx-auto py-12">
      <h1>{post.title}</h1>
      <p className="text-gray-500">
        {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <LexicalRenderer data={post.content} />
    </article>
  )
}
