"use client"

import { useState, useEffect, useMemo } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import BackToTop from "@/components/back-to-top"
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Search, UserCircle, Rss, Users, Newspaper } from "lucide-react"
import BorderButton from "@/components/ui/border-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BlogCard, type Post as PostSummary } from "@/components/BlogCard"
import { AuthorCard, type AuthorProfile } from "@/components/author-card"
import { Badge } from "@/components/ui/badge"
import { TechNewsCard, type TechNewsCardProps } from "@/components/tech-news-card"
import { ArticlePipelineSection } from "@/components/article-pipeline-section"

// Types (PostSummary is imported from BlogCard)
interface Category {
  id: string
  name: string
  slug: string
}

const mockAuthors: AuthorProfile[] = [
  {
    id: "1",
    name: "Tristan Smith",
    title: "Software Engineer, Offensive Security Hacker (Ethically that is), Lover of Design, and the Chief Dreamer",
    avatarUrl: "/avatars/tristan-smith.png",
    bio: "Tristan is the founder of theProject - a platform that shrugs off conventional boundaries, embracing innovation and creativity. He is a passionate offensive security researcher, software developer, and designer with a knack for turning complex ideas into engaging stories. If you're lucky, you'll hear his bellowing shriek of HACK THE PLANET on just the right days.",
    tags: ["AI/ML", "Software Dev", "Black Hat Research", "Cybersecurity", "Game Dev", "Leadership"],
    socialLinks: { linkedin: "https://www.linkedin.com/in/tristanjsmith", twitter: "https://x.com/theProjectDev", website: "https://bytheproject.com" },
  },
  {
    id: "2",
    name: "Maria Editor",
    title: "Lead Editor & Content Strategist",
    avatarUrl: "/avatars/maria-editor.png",
    bio: "Maria ensures every piece of content is polished, engaging, and valuable, shaping the voice of our publication.",
    tags: ["Content Strategy", "Editing", "UX Writing"],
    socialLinks: { linkedin: "#", twitter: "#" },
  },
  {
    id: "3",
    name: "David Analyst",
    title: "Emerging Tech Specialist",
    avatarUrl: "/avatars/david-analyst.png",
    bio: "David explores the cutting edge, from quantum computing to Web3, breaking down complex topics for our readers.",
    tags: ["Quantum", "Web3", "Futurism"],
    socialLinks: { linkedin: "#", website: "#" },
  },
  {
    id: "4",
    name: "Chloe Strategist",
    title: "Community & Growth Manager",
    avatarUrl: "/avatars/chloe-strategist.png",
    bio: "Chloe connects with our audience, fostering a vibrant community and ensuring our content reaches those who need it most.",
    tags: ["Community", "Marketing", "Growth Hacking"],
    socialLinks: { linkedin: "#", twitter: "#" },
  },
]

const techNewsData: TechNewsCardProps[] = [
  {
    sourceName: "TechCrunch",
    logoUrl: "/logos/news/techcrunch-logo.png",
    feedUrl: "https://techcrunch.com/feed/",
    description: "Startup and technology news, reviews, and analysis.",
  },
  {
    sourceName: "The Verge",
    logoUrl: "/logos/news/theverge-logo.png",
    feedUrl: "https://www.theverge.com/rss/index.xml",
    description: "Covering the intersection of technology, science, art, and culture.",
  },
  {
    sourceName: "Ars Technica",
    logoUrl: "/logos/news/arstechnica-logo.png",
    feedUrl: "https://arstechnica.com/feed/",
    description: "In-depth technology news, analysis, and reviews for IT professionals and enthusiasts.",
  },
  {
    sourceName: "Wired",
    logoUrl: "/logos/news/wired-logo.png",
    feedUrl: "https://www.wired.com/feed/rss",
    description: "How technology is changing every aspect of our lives—from culture to business.",
  },
]

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [allPosts, setAllPosts] = useState<PostSummary[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const postsPerPage = 9

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await fetch("/api/posts?depth=2")
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const data = await res.json()
        const fetchedPosts: PostSummary[] = data.docs || []
        setAllPosts(fetchedPosts)
        const uniqueCategories: Record<string, Category> = {}
        fetchedPosts.forEach((p) =>
          p.categories?.forEach((c) => {
            uniqueCategories[c.id] = c
          }),
        )
        setCategories(Object.values(uniqueCategories))
      } catch (err) {
        console.error("Error fetching blog posts:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const featuredPost = useMemo(() => allPosts.find((p) => p.featured) || allPosts[0] || null, [allPosts])
  const nonFeaturedPosts = useMemo(() => allPosts.filter((p) => p.id !== featuredPost?.id), [allPosts, featuredPost])

  const filteredPosts = useMemo(() => {
    return nonFeaturedPosts.filter((p) => {
      const byCategory = !selectedCategory || p.categories?.some((c) => c.slug === selectedCategory)
      const bySearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (p.authors?.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? false)
      return byCategory && bySearch
    })
  }, [nonFeaturedPosts, selectedCategory, searchQuery])

  const totalPages = useMemo(() => Math.ceil(filteredPosts.length / postsPerPage), [filteredPosts, postsPerPage])
  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
  }, [filteredPosts, currentPage, postsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  const formatDate = (dateString: string) => format(new Date(dateString), "MMMM d, yyyy")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-t-transparent border-magenta rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Blog Intro */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-neutral-50 dark:from-neutral-900 dark:to-neutral-800/70 border-b border-border dark:border-neutral-800">
          <div className="container mx-auto px-4 text-center">
            <Rss className="w-16 h-16 text-magenta mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Tech Insights & Innovations</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your premier source for deep dives into technology, software development, and the future of digital.
            </p>
          </div>
        </section>

        {/* Featured Post Section */}
        {featuredPost && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center md:text-left flex items-center justify-center md:justify-start">
                <span className="mr-3 w-2 h-8 bg-magenta rounded-full" />
                Spotlight Article
              </h2>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="block group/featured-card rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-magenta/20 transition-all duration-300 border border-border dark:border-neutral-700 hover:border-magenta/50"
              >
                <div className="md:flex">
                  {featuredPost.heroImage?.url && (
                    <div className="md:w-1/2 lg:w-3/5 relative aspect-video md:aspect-auto">
                      <Image
                        src={`/api/media/${featuredPost.heroImage.url.replace(/^\//, "")}`}
                        alt={featuredPost.heroImage.alt || featuredPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-300 group-hover/featured-card:scale-105"
                      />
                    </div>
                  )}
                  <div className="md:w-1/2 lg:w-2/5 p-6 md:p-8 flex flex-col justify-center bg-card">
                    {featuredPost.categories?.[0] && (
                      <Badge
                        variant="outline"
                        className="mb-3 self-start border-magenta text-magenta hover:bg-magenta/10 transition-colors"
                      >
                        {featuredPost.categories[0].name}
                      </Badge>
                    )}
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground group-hover/featured-card:text-magenta transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{featuredPost.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      {featuredPost.authors?.[0]?.avatar?.url ? (
                        <Image
                          src={`/api/media/${featuredPost.authors[0].avatar.url.replace(/^\//, "")}`}
                          alt={featuredPost.authors[0].name}
                          width={24}
                          height={24}
                          className="rounded-full mr-2 object-cover"
                        />
                      ) : (
                        <UserCircle className="w-6 h-6 mr-2" />
                      )}
                      <span>{featuredPost.authors?.[0]?.name || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-1.5" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                      {featuredPost.readTime && (
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5" />
                          {featuredPost.readTime} min read
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Main Content: Filters, Search, and Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg shadow-sm border border-border dark:border-neutral-700/50">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-sm mr-2 text-muted-foreground">Categories:</span>
                  <BorderButton
                    onClick={() => setSelectedCategory(null)}
                    size="sm"
                    className={cn(
                      "transition-all",
                      !selectedCategory
                        ? "bg-magenta text-white border-magenta hover:bg-magenta/90"
                        : "border-border hover:border-magenta hover:text-magenta dark:hover:border-magenta dark:hover:text-magenta",
                    )}
                  >
                    All
                  </BorderButton>
                  {categories.map((cat) => (
                    <BorderButton
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      size="sm"
                      className={cn(
                        "transition-all",
                        selectedCategory === cat.slug
                          ? "bg-magenta text-white border-magenta hover:bg-magenta/90"
                          : "border-border hover:border-magenta hover:text-magenta dark:hover:border-magenta dark:hover:text-magenta",
                      )}
                    >
                      {cat.name}
                    </BorderButton>
                  ))}
                </div>
                <div className="relative w-full md:w-auto md:ml-auto md:max-w-xs">
                  <Search className="absolute top-1/2 left-3 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    className="w-full bg-background border border-border dark:border-neutral-700 text-foreground rounded-md pl-10 pr-3 py-2 text-sm focus:border-magenta focus:ring-1 focus:ring-magenta placeholder:text-muted-foreground"
                    placeholder="Search articles, authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {paginatedPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                <Search className="w-16 h-16 mx-auto mb-4 text-neutral-400 dark:text-neutral-500" />
                <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
                <p>Try adjusting your search or category filters.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="hover:border-magenta hover:text-magenta dark:hover:border-magenta dark:hover:text-magenta transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      currentPage === i + 1
                        ? "bg-magenta text-white hover:bg-magenta/90"
                        : "hover:border-magenta hover:text-magenta dark:hover:border-magenta dark:hover:text-magenta transition-colors",
                    )}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="hover:border-magenta hover:text-magenta dark:hover:border-magenta dark:hover:text-magenta transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Tech News Feeds Section */}
        <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-900/70 border-t border-b border-border dark:border-neutral-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground flex items-center justify-center">
              <Newspaper className="w-10 h-10 mr-4 text-magenta" />
              Latest <span className="text-magenta ml-2">Tech News</span> Feeds
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Stay updated with headlines from leading technology news sources.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {techNewsData.map((newsItem) => (
                <TechNewsCard key={newsItem.sourceName} {...newsItem} />
              ))}
            </div>
          </div>
        </section>

        {/* Writing Team Section */}
        <section className="py-16 md:py-24 bg-background border-b border-border dark:border-neutral-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground flex items-center justify-center">
              <Users className="w-10 h-10 mr-4 text-magenta" />
              The Start of our new blog - <span className="text-magenta ml-2">Relentless.</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We started building a team of passionate technologists, researchers, and storytellers bringing you the latest insights. If you are looking for a spot on our team, contact us!
            </p>

            {(() => {
              const VISIBLE_AUTHORS = 1; // 👈 change this later when we sign more authors
              const visible = mockAuthors.slice(0, VISIBLE_AUTHORS)

              if (visible.length === 1) {
                return (
                  <div className="flex justify-center">
                    <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
                      <AuthorCard author={visible[0]} />
                    </div>
                  </div>
                )
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {visible.map((author) => (
                    <AuthorCard key={author.id} author={author} />
                  ))}
                </div>
              )
            })()}
          </div>
        </section>

        {/* Article Pipeline Section */}
        <ArticlePipelineSection />
      </main>
      <BackToTop />
      <Footer />
    </div>
  )
}
