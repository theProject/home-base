// components/BlogCard.tsx
"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { format } from "date-fns"
import Image from "next/image"
import { CalendarDays, Clock, UserCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Author {
  id: string
  name: string
  avatar?: { url: string; alt?: string }
}
interface Category {
  id: string
  name: string
  slug: string
}
export interface Post {
  // Exporting Post interface
  id: string
  title: string
  slug: string
  publishedAt: string
  description?: string
  heroImage?: { url: string; alt?: string }
  authors?: Author[]
  categories?: Category[]
  readTime?: number
  featured?: boolean // Added featured flag
}

interface BlogCardProps {
  post: Post
  className?: string
  orientation?: "vertical" | "horizontal"
}

export function BlogCard({ post, className, orientation = "vertical" }: BlogCardProps) {
  const author = post.authors?.[0]
  const category = post.categories?.[0]

  const ImageComponent = (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        orientation === "vertical" ? "aspect-video" : "aspect-square sm:aspect-video w-full sm:w-1/3 flex-shrink-0",
      )}
    >
      {post.heroImage?.url ? (
        <Image
          src={`/api/media/${post.heroImage.url.replace(/^\//, "")}`}
          alt={post.heroImage.alt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center">
          <span className="text-lg text-neutral-500 dark:text-neutral-400">{post.title.substring(0, 1)}</span>
        </div>
      )}
      {category && (
        <Badge variant="default" className="absolute top-3 right-3 bg-magenta text-white text-xs">
          {category.name}
        </Badge>
      )}
    </div>
  )

  const ContentComponent = (
    <div className={cn("p-4 flex flex-col", orientation === "vertical" ? "bg-card" : "bg-card flex-grow")}>
      <h3
        className={cn(
          "font-semibold text-foreground group-hover/card:text-magenta transition-colors",
          orientation === "vertical" ? "text-lg line-clamp-2 mb-2" : "text-xl line-clamp-2 mb-3",
        )}
      >
        {post.title}
      </h3>
      {post.description && (
        <p
          className={cn(
            "text-sm text-muted-foreground mb-3",
            orientation === "vertical" ? "line-clamp-3 flex-grow" : "line-clamp-2",
          )}
        >
          {post.description}
        </p>
      )}
      <div className="mt-auto">
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          {author?.avatar?.url ? (
            <Image
              src={`/api/media/${author.avatar.url.replace(/^\//, "")}`}
              alt={author.name || "Author"}
              width={20}
              height={20}
              className="rounded-full mr-2 object-cover"
            />
          ) : (
            <UserCircle className="w-5 h-5 mr-2" />
          )}
          <span>{author?.name || "Anonymous"}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center">
            <CalendarDays className="w-3.5 h-3.5 mr-1" />
            {format(new Date(post.publishedAt), "MMM d, yyyy")}
          </span>
          {post.readTime && (
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {post.readTime} min read
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group/card block rounded-lg overflow-hidden shadow-sm border border-border transition-all hover:shadow-lg hover:border-magenta/30 dark:border-neutral-700 dark:hover:border-magenta/50",
        orientation === "horizontal" ? "flex flex-col sm:flex-row" : "",
        className,
      )}
    >
      {ImageComponent}
      {ContentComponent}
    </Link>
  )
}
