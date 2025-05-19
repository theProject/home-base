// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { RichText } from '@/components/RichText'
import Header from '@/components/header'
import BackToTop from '@/components/back-to-top'
import Footer from '@/components/footer'

// Define types for your post data
interface Author { id: string; name: string }
interface MediaImage { url: string; alt?: string; width?: number; height?: number; caption?: any }
interface RelatedPost { id: string; title: string; slug: string }
interface Post { title: string; publishedAt: string; heroImage?: MediaImage; content: any; authors?: Author[]; relatedPosts?: RelatedPost[] }

type Params = { slug: string }

export const metadata: Metadata = { title: 'Blog Post' }

export async function generateStaticParams(): Promise<Params[]> {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL
  if (!baseUrl) return []
  try {
    const res = await fetch(`${baseUrl}/api/posts?depth=0`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const { docs }: { docs: { slug: string }[] } = await res.json()
    return docs.map(doc => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_API_URL
  if (!baseUrl) notFound()

  // Fetch the post JSON from Payload
  const response = await fetch(
    `${baseUrl}/api/posts?where[slug][equals]=${slug}&depth=2`,
    { next: { revalidate: 60 } }
  )
  if (!response.ok) notFound()

  // Parse JSON
  const { docs }: { docs: Post[] } = await response.json()
  const post = docs[0]
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-12 bg-white text-black dark:bg-black dark:text-white">
        {/* Header with title, authors, date */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2 dark:text-white text-black">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm dark:text-gray-300 text-gray-600">
            {post.authors && <span>By {post.authors.map(a => a.name).join(', ')}</span>}
            <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </div>
        </header>

        {/* Hero Image & Caption */}
        {post.heroImage && (
          <figure className="mb-8">
            <img
              src={`${baseUrl}${post.heroImage.url}`}
              alt={post.heroImage.alt || ''}
              width={post.heroImage.width}
              height={post.heroImage.height}
              className="w-full rounded"
            />
            {post.heroImage.caption && (
              <RichText data={post.heroImage.caption} className="prose prose-sm dark:prose-invert" />
            )}
          </figure>
        )}

        {/* Main Rich-Text Content (with inline media blocks) */}
        <RichText data={post.content} className="prose lg:prose-xl dark:prose-invert" />

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white text-black">Related Posts</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {post.relatedPosts.map(rp => (
                <li key={rp.id}>
                  <Link href={`/blog/${rp.slug}`} className="block hover:underline dark:text-white text-black">
                    {rp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <BackToTop />
      <Footer />
    </div>
  )
}
