import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPosts } from "@/lib/sanity"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default async function BlogPage() {
  // In a real implementation, this would fetch from Sanity
  // For now, we'll use placeholder data
  const posts = await getPosts().catch(() => [
    {
      _id: "1",
      title: "Getting Started with Mobile App Development",
      slug: { current: "getting-started-with-mobile-app-development" },
      publishedAt: new Date().toISOString(),
      excerpt: "Learn the fundamentals of building mobile applications with our comprehensive guide.",
      author: { name: "John Doe" },
      categories: ["Mobile Development", "Tutorials"],
    },
    {
      _id: "2",
      title: "The Future of Generative AI",
      slug: { current: "the-future-of-generative-ai" },
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      excerpt: "Explore how generative AI is transforming industries and what to expect in the coming years.",
      author: { name: "Jane Smith" },
      categories: ["AI", "Technology Trends"],
    },
    {
      _id: "3",
      title: "Video Game Development: From Concept to Launch",
      slug: { current: "video-game-development-from-concept-to-launch" },
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      excerpt: "A step-by-step guide to creating your own video game, covering all stages of development.",
      author: { name: "Mike Johnson" },
      categories: ["Game Development", "Project Management"],
    },
  ])

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-8 font-geist">
            Our <span className="text-magenta">Blog</span>
          </h1>
          <p className="text-lg text-black/80 dark:text-white/80 mb-12">
            Insights, tutorials, and updates from theProject team.
          </p>

          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/blog/${post.slug.current}`}>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-2 font-geist hover:text-magenta transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <div className="flex items-center text-sm text-black/60 dark:text-white/60 mb-4">
                  <span>{post.author.name}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
                </div>
                <p className="text-black/80 dark:text-white/80 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-black/70 dark:text-white/70 px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
