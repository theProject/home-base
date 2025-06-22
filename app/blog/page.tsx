'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { format } from 'date-fns'
import BackToTop from '@/components/back-to-top'
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Search } from 'lucide-react'
import { BorderButton } from '@/components/ui/border-button'
import { cn } from '@/lib/utils'
import { BlogCard } from '@/components/BlogCard'; // Ensure the path to BlogCard.tsx is correct..wow

// Types
interface Author { id: string; name: string; avatar?: { url: string; alt?: string } }
interface Category { id: string; name: string; slug: string }
interface PostSummary {
  id: string
  title: string
  slug: string
  publishedAt: string
  description?: string
  heroImage?: { url: string; alt?: string }
  authors?: Author[]
  categories?: Category[]
  featured?: boolean
  readTime?: number
}

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<PostSummary[]>([])
  const [featuredPost, setFeaturedPost] = useState<PostSummary | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [relatedPosts, setRelatedPosts] = useState<PostSummary[]>([])
  const postsPerPage = 6

  // Fetch via proxy
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/posts?depth=1')
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const data = await res.json()
        const all: PostSummary[] = data.docs || []

        setPosts(all)
        setFeaturedPost(all.find(p => p.featured) ?? all[0] ?? null)

        // Extract unique categories
        const uniq: Record<string, Category> = {}
        all.forEach(p => p.categories?.forEach(c => { uniq[c.id] = c }))
        setCategories(Object.values(uniq))

        setTotalPages(Math.ceil(all.length / postsPerPage))
        setRelatedPosts(all.slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filter + Paginate
  const filtered = posts.filter(p => {
    const byCat = !selectedCategory || p.categories?.some(c => c.slug === selectedCategory)
    const byText = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    return byCat && byText
  })
  const paginated = filtered.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  useEffect(() => {
    setTotalPages(Math.ceil(filtered.length / postsPerPage))
    setCurrentPage(1)
  }, [filtered.length, selectedCategory, searchQuery])

  const formatDate = (d: string) => format(new Date(d), 'MMM d, yyyy') // Updated format for consistency

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Loading */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 border-4 border-t-transparent border-magenta rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="mb-16">
                <h2 className="flex items-center text-2xl font-bold mb-6">
                  <span className="mr-2 w-1.5 h-6 bg-magenta rounded-full" />
                  Featured Post
                </h2>
                <Link href={`/blog/${featuredPost.slug}`} className="block group/featured">
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg h-[400px] md:h-[500px] bg-cover bg-center"
                    style={
                      featuredPost.heroImage
                        ? { backgroundImage: `url(/api/media/${featuredPost.heroImage.url.replace(/^\//, '')})` }
                        : undefined
                    }
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    <div className="absolute bottom-0 p-6 z-10 text-white">
                      <h3 className="text-3xl font-bold mb-2">{featuredPost.title}</h3>
                      <p className="text-sm mb-4">{featuredPost.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" />{formatDate(featuredPost.publishedAt)}</span>
                        {featuredPost.readTime && <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{featuredPost.readTime} min read</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Filters + Search */}
            <div className="mb-10 flex flex-wrap items-center gap-4">
              <BorderButton
                onClick={() => setSelectedCategory(null)}
                size="sm"
                className={!selectedCategory ? 'bg-magenta text-white' : ''}
              >
                All Posts
              </BorderButton>
              {categories.map(cat => (
                <BorderButton
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  size="sm"
                  className={selectedCategory === cat.slug ? 'bg-magenta text-white' : ''}
                >
                  {cat.name}
                </BorderButton>
              ))}
              <div className="relative ml-auto w-full md:w-64">
                <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white rounded-lg pl-10 py-2 text-sm focus:border-magenta"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

         {/* Grid of Blog Cards */}
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
  {paginated.map(post => (
    <BlogCard key={post.id} post={post} />
  ))}
  {paginated.length === 0 && (
    <div className="col-span-full py-20 text-center text-gray-500 dark:text-gray-400">No posts found</div>
  )}
</div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mb-16">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} aria-label="Previous page" className="p-2 rounded border border-neutral-800 disabled:opacity-50 hover:border-magenta transition">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`mx-1 w-8 h-8 rounded flex items-center justify-center transition ${currentPage === i + 1 ? 'bg-magenta text-white' : 'border border-neutral-800 hover:border-magenta'}`}>{i + 1}</button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} aria-label="Next page" className="p-2 rounded border border-neutral-800 disabled:opacity-50 hover:border-magenta transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Related Posts */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="p-4 bg-neutral-900 dark:bg-neutral-700 rounded-lg hover:bg-neutral-800 transition">
                      <h3 className="font-bold text-white mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">{post.description}</p>
                      <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
      <BackToTop />
      <Footer />
    </div>
  )
}