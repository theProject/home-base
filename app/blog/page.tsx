"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import BackToTop from "@/components/back-to-top";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Search, UserCircle, Users } from "lucide-react";
import BorderButton from "@/components/ui/border-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogCard, type Post as PostSummary } from "@/components/BlogCard";
import { AuthorCard, type AuthorProfile } from "@/components/author-card";
import { Badge } from "@/components/ui/badge";
import { ArticlePipelineSection } from "@/components/article-pipeline-section";
import LiquidGlass from "@/components/LiquidGlass";

// Types (PostSummary is imported from BlogCard)
interface Category {
  id: string;
  name: string;
  slug: string;
}

const mockAuthors: AuthorProfile[] = [
  {
    id: "1",
    name: "Tristan Smith",
    title:
      "Software Engineer, Offensive Security Hacker (Ethically that is), Lover of Design, and the Chief Dreamer",
    avatarUrl: "/avatars/tristan-smith.png",
    bio: "Tristan is the founder of theProject - fueled with a relentless curiosity of black and white hats, software development, and designing the next best videogame.",
    tags: ["AI/ML", "Software Dev", "Hacking", "Cybersecurity", "Game Dev", "Leadership"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/tristanjsmith",
      twitter: "https://x.com/theProjectDev",
      website: "https://bytheproject.com",
    },
  },
];

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<PostSummary[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 9;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/posts?depth=2");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        const fetchedPosts: PostSummary[] = data.docs || [];
        setAllPosts(fetchedPosts);

        const unique: Record<string, Category> = {};
        fetchedPosts.forEach((p) =>
          p.categories?.forEach((c) => {
            unique[c.id] = c;
          }),
        );
        setCategories(Object.values(unique));
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const featuredPost = useMemo(
    () => allPosts.find((p) => p.featured) || allPosts[0] || null,
    [allPosts],
  );

  const nonFeaturedPosts = useMemo(
    () => allPosts.filter((p) => p.id !== featuredPost?.id),
    [allPosts, featuredPost],
  );

  const filteredPosts = useMemo(() => {
    return nonFeaturedPosts.filter((p) => {
      const byCategory = !selectedCategory || p.categories?.some((c) => c.slug === selectedCategory);
      const bySearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (p.authors?.some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);
      return byCategory && bySearch;
    });
  }, [nonFeaturedPosts, selectedCategory, searchQuery]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPosts.length / postsPerPage),
    [filteredPosts, postsPerPage],
  );

  const paginatedPosts = useMemo(
    () => filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage),
    [filteredPosts, currentPage, postsPerPage],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const formatDate = (dateString: string) => format(new Date(dateString), "MMMM d, yyyy");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-t-transparent border-magenta rounded-full animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Parallax Liquid Glass Hero */}
        <LiquidGlass
          title="Tech Insights & Innovations"
          subtitle="Deep dives into engineering, AI, offensive security, and game design — from the studio building it."
          badgeText={
            <>
              Project <span className="text-magenta">Relentless</span> — Blog
            </>
          }
          height="py-20 md:py-28"
        />

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

        {/* Writing Team Section */}
        <section className="py-16 md:py-24 bg-background border-b border-border dark:border-neutral-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground flex items-center justify-center">
              <Users className="w-10 h-10 mr-4 text-magenta" />
              Welcome To Our New Blog - Project <span className="text-magenta ml-2">Relentless.</span>
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              We are building a team of passionate technologists, researchers, and storytellers bringing you the latest insights. Actively seeking fellow hackers, game devs and deep learning experts - If you are looking for a spot on the team, contact us!
            </p>

            {/* Single author for now */}
            <div className="flex justify-center">
              <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
                <AuthorCard author={mockAuthors[0]} />
              </div>
            </div>
          </div>
        </section>

        {/* Article Pipeline Section */}
        <ArticlePipelineSection />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
