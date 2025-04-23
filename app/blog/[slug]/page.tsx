import Header from "@/components/header"
import Footer from "@/components/footer"
import { getPost } from "@/lib/sanity"
import { format } from "date-fns"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BorderButton } from "@/components/ui/border-button"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real implementation, this would fetch from Sanity
  // For now, we'll use placeholder data
  const post = await getPost(params.slug).catch(() => ({
    title: "Getting Started with Mobile App Development",
    publishedAt: new Date().toISOString(),
    author: { name: "John Doe" },
    categories: ["Mobile Development", "Tutorials"],
    body: `
      <h2>Introduction</h2>
      <p>Mobile app development is a rapidly growing field with endless opportunities for innovation. Whether you're building for iOS, Android, or both, understanding the fundamentals is crucial for success.</p>
      
      <h2>Choosing Your Platform</h2>
      <p>The first decision you'll need to make is which platform to target. iOS offers a more controlled environment and typically higher revenue per user, while Android provides greater market reach and flexibility.</p>
      
      <h2>Development Approaches</h2>
      <p>There are several approaches to mobile app development:</p>
      <ul>
        <li><strong>Native Development:</strong> Building specifically for iOS (Swift/Objective-C) or Android (Kotlin/Java)</li>
        <li><strong>Cross-Platform:</strong> Using frameworks like React Native or Flutter to build once and deploy to multiple platforms</li>
        <li><strong>Progressive Web Apps:</strong> Web applications that offer a mobile app-like experience</li>
      </ul>
      
      <h2>Essential Tools</h2>
      <p>Every mobile developer should be familiar with these tools:</p>
      <ul>
        <li>IDE: Xcode (iOS) or Android Studio</li>
        <li>Version Control: Git</li>
        <li>UI Design: Figma or Sketch</li>
        <li>Testing: XCTest, Espresso, or Detox</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Mobile app development is both challenging and rewarding. By understanding the basics outlined in this guide, you'll be well on your way to creating successful mobile applications.</p>
    `,
  }))

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-block mb-8">
            <BorderButton size="sm">
              <span className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to all posts
              </span>
            </BorderButton>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 font-geist">{post.title}</h1>

          <div className="flex items-center text-sm text-black/60 dark:text-white/60 mb-8">
            <span>{post.author.name}</span>
            <span className="mx-2">•</span>
            <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-geist">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category: string) => (
                <span
                  key={category}
                  className="text-sm bg-gray-100 dark:bg-gray-800 text-black/70 dark:text-white/70 px-3 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
